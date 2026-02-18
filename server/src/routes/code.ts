import express, { Request, Response } from 'express';
import { DockerExecutor } from '../services/DockerExecutor';

const router = express.Router();
const executor = new DockerExecutor();

const SUPPORTED_LANGUAGES = [
    'python', 'node', 'javascript', 'java', 'c', 'csharp',
    'go', 'rust', 'ruby', 'php', 'typescript', 'bash',
];

// Rate limiting (simple in-memory)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string): boolean {
    const now = Date.now();
    const limit = rateLimitMap.get(ip);
    if (!limit || now > limit.resetTime) {
        rateLimitMap.set(ip, { count: 1, resetTime: now + 60000 });
        return true;
    }
    if (limit.count >= 10) return false;
    limit.count++;
    return true;
}

// POST /api/code/run
router.post('/run', async (req: Request, res: Response) => {
    const ip = req.ip || 'unknown';

    if (!checkRateLimit(ip)) {
        return res.status(429).json({ success: false, error: 'Rate limit exceeded. Max 10 runs per minute.' });
    }

    const { language, code } = req.body;

    if (!language || !SUPPORTED_LANGUAGES.includes(language)) {
        return res.status(400).json({ success: false, error: `Unsupported language. Supported: ${SUPPORTED_LANGUAGES.join(', ')}` });
    }

    if (!code || typeof code !== 'string') {
        return res.status(400).json({ success: false, error: 'Code is required.' });
    }

    if (code.length > 50000) {
        return res.status(400).json({ success: false, error: 'Code too large (max 50KB).' });
    }

    try {
        const result = await executor.execute({ language, code });
        return res.json({
            success: result.exitCode === 0,
            output: result.output,
            error: result.error,
            exitCode: result.exitCode,
            executionTime: result.executionTime,
        });
    } catch (err: any) {
        return res.status(500).json({ success: false, error: err.message });
    }
});

// GET /api/code/status
router.get('/status', async (_req: Request, res: Response) => {
    try {
        const images = await executor.checkImages();
        const allReady = Object.values(images).every(Boolean);
        return res.json({ ready: allReady, images });
    } catch (err: any) {
        return res.status(500).json({ ready: false, error: err.message });
    }
});

export default router;
