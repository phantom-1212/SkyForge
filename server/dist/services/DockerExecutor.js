"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DockerExecutor = void 0;
const dockerode_1 = __importDefault(require("dockerode"));
const stream_1 = require("stream");
const docker = new dockerode_1.default();
class DockerExecutor {
    async execute(config) {
        try {
            return await this.executeDocker(config);
        }
        catch (err) {
            // Fallback to Piston API if Docker isn't available (e.g. on Render free tier)
            if (err.message.includes('ENOENT') || err.message.includes('connect') || err.message.includes('socket')) {
                console.log('⚠️ Docker unavailable. Falling back to Piston API...');
                return await this.executePiston(config);
            }
            // Return error if it's not a connection issue
            return {
                output: '',
                error: `Execution Logic Error: ${err.message}`,
                exitCode: 1,
                executionTime: 0
            };
        }
    }
    async executeDocker(config) {
        const startTime = Date.now();
        const timeout = config.timeout || DockerExecutor.RESOURCE_LIMITS.Timeout;
        const imageName = DockerExecutor.IMAGE_MAP[config.language];
        let output = '';
        let error = '';
        let exitCode = 0;
        let container = null;
        try {
            container = await docker.createContainer({
                Image: imageName,
                Cmd: this.getCommand(config.language, config.code),
                Env: config.language === 'go' ? [
                    'GOPROXY=off',
                    'GONOSUMCHECK=*',
                    'GONOSUMDB=*',
                    'HOME=/home/coderunner',
                    'GOPATH=/home/coderunner/go',
                    'GOMODCACHE=/home/coderunner/go/pkg/mod',
                ] : [],
                HostConfig: {
                    Memory: DockerExecutor.RESOURCE_LIMITS.Memory,
                    NanoCpus: DockerExecutor.RESOURCE_LIMITS.NanoCpus,
                    NetworkMode: 'none',
                    ReadonlyRootfs: false,
                    CapDrop: ['ALL'],
                    SecurityOpt: ['no-new-privileges'],
                },
                User: '1000:1000',
                WorkingDir: '/workspace',
                AttachStdout: true,
                AttachStderr: true,
            });
            // Attach BEFORE start to avoid race condition
            const stream = await container.attach({
                stream: true,
                stdout: true,
                stderr: true,
            });
            const stdoutStream = new stream_1.PassThrough();
            const stderrStream = new stream_1.PassThrough();
            stdoutStream.on('data', (chunk) => { output += chunk.toString(); });
            stderrStream.on('data', (chunk) => { error += chunk.toString(); });
            docker.modem.demuxStream(stream, stdoutStream, stderrStream);
            await container.start();
            const timeoutHandle = setTimeout(async () => {
                try {
                    await container.kill();
                    error += '\nExecution timeout exceeded (20 seconds)';
                }
                catch (_) { }
            }, timeout);
            const waitResult = await container.wait();
            exitCode = waitResult.StatusCode;
            clearTimeout(timeoutHandle);
            stream.destroy();
            await new Promise((resolve) => setTimeout(resolve, 100));
            await container.remove({ force: true });
        }
        catch (err) {
            if (container) {
                try {
                    await container.remove({ force: true });
                }
                catch (_) { }
            }
            throw err; // Re-throw to trigger fallback
        }
        return {
            output: output.trim(),
            error: error.trim(),
            exitCode,
            executionTime: Date.now() - startTime,
        };
    }
    async executePiston(config) {
        const startTime = Date.now();
        // Map SkyForge languages to Piston runtimes
        const langMap = {
            python: 'python',
            node: 'javascript',
            javascript: 'javascript',
            typescript: 'typescript',
            java: 'java',
            c: 'c',
            csharp: 'csharp',
            go: 'go',
            rust: 'rust',
            ruby: 'ruby',
            php: 'php',
            bash: 'bash'
        };
        const language = langMap[config.language] || config.language;
        const version = '*'; // Use latest available
        try {
            const response = await fetch('https://emkc.org/api/v2/piston/execute', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    language,
                    version,
                    files: [{ content: config.code }]
                })
            });
            if (!response.ok) {
                throw new Error(`Piston API Error: ${response.statusText}`);
            }
            const data = await response.json();
            return {
                output: data.run.stdout || '',
                error: data.run.stderr || '',
                exitCode: data.run.code,
                executionTime: Date.now() - startTime
            };
        }
        catch (err) {
            return {
                output: '',
                error: `Cloud Execution Failed: ${err.message}`,
                exitCode: 1,
                executionTime: Date.now() - startTime
            };
        }
    }
    getCommand(language, code) {
        const escaped = code.replace(/'/g, `'\\''`);
        switch (language) {
            case 'python':
                return ['python', '-c', code];
            case 'node':
            case 'javascript':
                return ['node', '-e', code];
            case 'typescript':
                return ['sh', '-c', `printf '%s' '${escaped}' > main.ts && ts-node --transpile-only --compiler-options '{"module":"commonjs"}' main.ts`];
            case 'java':
                return ['sh', '-c', `printf '%s' '${escaped}' > Main.java && javac Main.java && java Main`];
            case 'c':
                return ['sh', '-c', `printf '%s' '${escaped}' > main.c && gcc -o main main.c && ./main`];
            case 'csharp':
                return ['sh', '-c', `printf '%s' '${escaped}' > Main.cs && mcs Main.cs -out:Main.exe && mono Main.exe`];
            case 'go':
                // Create go.mod so Go module mode works without network
                return ['sh', '-c', `printf '%s' '${escaped}' > main.go && printf 'module sandbox\n\ngo 1.22\n' > go.mod && go run main.go`];
            case 'rust':
                return ['sh', '-c', `printf '%s' '${escaped}' > main.rs && rustc main.rs -o main && ./main`];
            case 'ruby':
                return ['sh', '-c', `printf '%s' '${escaped}' > main.rb && ruby main.rb`];
            case 'php':
                return ['sh', '-c', `printf '%s' '${escaped}' > main.php && php main.php`];
            case 'bash':
                return ['sh', '-c', code];
            default:
                throw new Error(`Unsupported language: ${language}`);
        }
    }
    async checkImages() {
        try {
            const images = await docker.listImages();
            const imageNames = images.flatMap((img) => img.RepoTags || []);
            const langs = ['python', 'node', 'javascript', 'java', 'c', 'csharp', 'go', 'rust', 'ruby', 'php', 'typescript', 'bash'];
            return Object.fromEntries(langs.map(lang => [lang, imageNames.includes(DockerExecutor.IMAGE_MAP[lang])]));
        }
        catch (err) {
            // Return all false if docker is down, but true if we are using Piston implicitly? 
            // Better to show false so user knows local docker is down, but execution will still work via fallback.
            return {
                python: false, node: false, javascript: false, java: false,
                c: false, csharp: false, go: false, rust: false,
                ruby: false, php: false, typescript: false, bash: false,
            };
        }
    }
}
exports.DockerExecutor = DockerExecutor;
DockerExecutor.RESOURCE_LIMITS = {
    Memory: 256 * 1024 * 1024,
    NanoCpus: 500000000,
    Timeout: 20000,
};
DockerExecutor.IMAGE_MAP = {
    python: 'wolfforge-python:latest',
    node: 'wolfforge-node:latest',
    javascript: 'wolfforge-javascript:latest',
    java: 'wolfforge-java:latest',
    c: 'wolfforge-c:latest',
    csharp: 'wolfforge-csharp:latest',
    go: 'wolfforge-go:latest',
    rust: 'wolfforge-rust:latest',
    ruby: 'wolfforge-ruby:latest',
    php: 'wolfforge-php:latest',
    typescript: 'wolfforge-typescript:latest',
    bash: 'wolfforge-bash:latest',
};
