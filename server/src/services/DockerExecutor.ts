import Docker from 'dockerode';
import { PassThrough } from 'stream';

const docker = new Docker();

interface ExecutionResult {
    output: string;
    error: string;
    exitCode: number;
    executionTime: number;
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
            error = `Execution error: ${err.message}`;
            exitCode = 1;
            if (container) {
                try { await container.remove({ force: true }); } catch (_) { }
            }
        }

        return {
            output: output.trim(),
            error: error.trim(),
            exitCode,
            executionTime: Date.now() - startTime,
        };
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
            return {
                python: false, node: false, javascript: false, java: false,
                c: false, csharp: false, go: false, rust: false,
                ruby: false, php: false, typescript: false, bash: false,
            };
        }
    }
}
