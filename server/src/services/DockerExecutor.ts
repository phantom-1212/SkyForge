import Docker from 'dockerode';
import { PassThrough } from 'stream';

const docker = new Docker();

interface ExecutionResult {
    output: string;
    error: string;
    exitCode: number;
    executionTime: number;
    method: 'docker' | 'piston';
}

export type Language =
    | 'python' | 'node' | 'java' | 'javascript' | 'c' | 'csharp'
    | 'go' | 'rust' | 'ruby' | 'php' | 'typescript' | 'bash';

interface ExecutionConfig {
    language: Language;
    code: string;
    timeout?: number;
}

export class DockerExecutor {
    private static readonly RESOURCE_LIMITS = {
        Memory: 256 * 1024 * 1024,
        NanoCpus: 500000000,
        Timeout: 20000,
    };

    private static readonly IMAGE_MAP: Record<Language, string> = {
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

    async execute(config: ExecutionConfig): Promise<ExecutionResult> {
        try {
            return await this.executeDocker(config);
        } catch (err: any) {
            // Fallback to Piston API if Docker isn't available (e.g. on Render free tier)
            if (err.message.includes('ENOENT') || err.message.includes('connect') || err.message.includes('socket')) {
                console.log('⚠️ Local Docker unavailable. Falling back to Cloud Execution...');
                const result = await this.executePiston(config);

                // If Piston also failed, prepend a helpful message about Docker
                if (result.error) {
                    result.error = `Local Docker is not running (please start Docker Desktop).\n\nCloud Fallback Error: ${result.error}`;
                }
                return result;
            }
            // Return error if it's not a connection issue
            return {
                output: '',
                error: `Execution Logic Error: ${err.message}`,
                exitCode: 1,
                executionTime: 0,
                method: 'docker'
            };
        }
    }

    private async executeDocker(config: ExecutionConfig): Promise<ExecutionResult> {
        const startTime = Date.now();
        const timeout = config.timeout || DockerExecutor.RESOURCE_LIMITS.Timeout;
        const imageName = DockerExecutor.IMAGE_MAP[config.language];

        let output = '';
        let error = '';
        let exitCode = 0;
        let container: any = null;

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

            const stdoutStream = new PassThrough();
            const stderrStream = new PassThrough();
            stdoutStream.on('data', (chunk: Buffer) => { output += chunk.toString(); });
            stderrStream.on('data', (chunk: Buffer) => { error += chunk.toString(); });
            docker.modem.demuxStream(stream, stdoutStream, stderrStream);

            await container.start();

            const timeoutHandle = setTimeout(async () => {
                try { await container.kill(); error += '\nExecution timeout exceeded (20 seconds)'; }
                catch (_) { }
            }, timeout);

            const waitResult = await container.wait();
            exitCode = waitResult.StatusCode;
            clearTimeout(timeoutHandle);
            stream.destroy();
            await new Promise<void>((resolve) => setTimeout(resolve, 100));
            await container.remove({ force: true });

        } catch (err: any) {
            if (container) {
                try { await container.remove({ force: true }); } catch (_) { }
            }
            throw err; // Re-throw to trigger fallback
        }

        return {
            output: output.trim(),
            error: error.trim(),
            exitCode,
            executionTime: Date.now() - startTime,
            method: 'docker',
        };
    }

    private async executePiston(config: ExecutionConfig): Promise<ExecutionResult> {
        const startTime = Date.now();

        // Map SkyForge languages to Piston runtimes
        const langMap: Record<string, string> = {
            python: 'python',
            node: 'node',
            javascript: 'node',
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
            const headers: Record<string, string> = {
                'Content-Type': 'application/json',
                'User-Agent': 'SkyForge-Browser-IDE/1.0',
                'Accept': 'application/json'
            };

            const apiKey = process.env.PISTON_API_KEY;
            if (apiKey) {
                headers['Authorization'] = apiKey;
            }

            const response = await fetch('https://emkc.org/api/v2/piston/execute', {
                method: 'POST',
                headers,
                body: JSON.stringify({
                    language,
                    version,
                    files: [{ content: config.code }]
                })
            });

            if (!response.ok) {
                const errorText = await response.text();
                if (response.status === 401 || response.status === 403) {
                    console.log('⚠️ Piston API is restricted. Trying Judge0...');
                    return await this.executeJudge0(config);
                }
                throw new Error(`Piston API Error ${response.status}: ${response.statusText} - ${errorText}`);
            }

            const data = await response.json() as any;

            return {
                output: data.run.stdout || '',
                error: data.run.stderr || '',
                exitCode: data.run.code,
                executionTime: Date.now() - startTime,
                method: 'piston'
            };
        } catch (err: any) {
            // If Piston failed (and wasn't handled by 401 redirect), try Judge0 as final attempt
            console.log(`⚠️ Piston Fallback Failed: ${err.message}. Final attempt via Judge0...`);
            return await this.executeJudge0(config);
        }
    }

    private async executeJudge0(config: ExecutionConfig): Promise<ExecutionResult> {
        const startTime = Date.now();
        const judge0Host = process.env.JUDGE0_HOST || 'https://judge0-ce.p.rapidapi.com';
        const judge0Key = process.env.JUDGE0_API_KEY;

        if (!judge0Key && !process.env.JUDGE0_URL) {
            return {
                output: '',
                error: `Cloud Execution Failed: Piston is restricted and Judge0 is not configured. Please start Docker Desktop for a better experience, or configure JUDGE0_API_KEY for the cloud version.`,
                exitCode: 1,
                executionTime: Date.now() - startTime,
                method: 'piston' // Using piston method name to indicate cloud failure
            };
        }

        // Map SkyForge languages to Judge0 IDs
        const judge0LangMap: Record<string, number> = {
            python: 71, node: 63, javascript: 63, typescript: 74,
            java: 62, c: 50, csharp: 51, go: 60, rust: 75,
            ruby: 72, php: 68, bash: 46
        };

        const languageId = judge0LangMap[config.language];
        if (!languageId) {
            return {
                output: '',
                error: `Judge0 doesn't support language: ${config.language}`,
                exitCode: 1,
                executionTime: Date.now() - startTime,
                method: 'piston'
            };
        }

        try {
            const response = await fetch(`${judge0Host}/submissions?base64_encoded=true&wait=true`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-RapidAPI-Key': judge0Key || '',
                    'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
                },
                body: JSON.stringify({
                    language_id: languageId,
                    source_code: Buffer.from(config.code).toString('base64'),
                })
            });

            if (!response.ok) {
                const text = await response.text();
                throw new Error(`Judge0 API Error ${response.status}: ${text}`);
            }

            const data = await response.json() as any;
            const stdout = data.stdout ? Buffer.from(data.stdout, 'base64').toString() : '';
            const stderr = data.stderr ? Buffer.from(data.stderr, 'base64').toString() : '';
            const compileOutput = data.compile_output ? Buffer.from(data.compile_output, 'base64').toString() : '';

            return {
                output: stdout.trim(),
                error: (stderr + '\n' + compileOutput).trim(),
                exitCode: data.status?.id === 3 ? 0 : 1, // 3 is "Accepted"
                executionTime: Date.now() - startTime,
                method: 'piston' // Re-using method name for cloud fallback
            };
        } catch (err: any) {
            return {
                output: '',
                error: `All Cloud Execution fallbacks failed.\n1. Piston (Whitelist required)\n2. Judge0 (${err.message}).\n\nPRO TIP: Run code on localhost by starting Docker Desktop!`,
                exitCode: 1,
                executionTime: Date.now() - startTime,
                method: 'piston'
            };
        }
    }

    private getCommand(language: Language, code: string): string[] {
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

    async checkImages(): Promise<Record<Language, boolean>> {
        try {
            const images = await docker.listImages();
            const imageNames = images.flatMap((img: any) => img.RepoTags || []);
            const langs: Language[] = ['python', 'node', 'javascript', 'java', 'c', 'csharp', 'go', 'rust', 'ruby', 'php', 'typescript', 'bash'];
            return Object.fromEntries(
                langs.map(lang => [lang, imageNames.includes(DockerExecutor.IMAGE_MAP[lang])])
            ) as Record<Language, boolean>;
        } catch (err) {
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
