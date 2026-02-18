# WolfForge 🐺

A browser-based development platform that enables developers to create, run, and ship applications directly from the cloud.

## Features

✨ **Instant Setup** - No installation required, start coding immediately  
🔒 **Secure Execution** - Code runs in isolated Docker containers  
🚀 **Multi-Language Support** - Python 3.11 and Node.js 20  
⚡ **Real-Time Output** - See results instantly in the console  
🎨 **Modern UI** - Beautiful interface powered by Monaco Editor (VS Code engine)

## Prerequisites

- **Docker Desktop** - Required for code execution sandboxing
- **Node.js 18+** - For running the development servers
- **npm** - Package manager

## Quick Start

### 1. Build Docker Images

First, build the execution environment images:

```bash
# Windows
cd docker
.\build.bat

# Linux/Mac
cd docker
chmod +x build.sh
./build.sh
```

This creates two Docker images:
- `wolfforge-python:latest` - Python 3.11 execution environment
- `wolfforge-node:latest` - Node.js 20 execution environment

### 2. Start Backend Server

```bash
cd server
npm install
cp .env.example .env
npm run dev
```

Backend will run on `http://localhost:3001`

### 3. Start Frontend

```bash
# From project root
npm install
npm run dev
```

Frontend will run on `http://localhost:3000`

### 4. Start Coding!

1. Open `http://localhost:3000` in your browser
2. Click "Launch Editor"
3. Choose Python or Node.js
4. Write your code
5. Click "Run Code" to execute

## Architecture

```
Browser → Next.js Frontend → Express Backend → Docker Containers → Output
                                    ↓
                            PostgreSQL (future)
```

### Tech Stack

**Frontend:**
- Next.js 14 with App Router
- TypeScript
- Monaco Editor (VS Code engine)
- Tailwind CSS
- Axios for API calls

**Backend:**
- Node.js with Express
- TypeScript
- Docker SDK (dockerode)
- WebSocket support (Socket.io)
- PostgreSQL (for future auth)

**Infrastructure:**
- Docker for sandboxed execution
- Resource limits: 256MB RAM, 0.5 CPU, 10s timeout
- Network disabled in containers
- Non-root user execution

## Security Features

🔐 **Container Isolation** - Each execution runs in a fresh container  
⏱️ **Timeout Protection** - 10-second execution limit  
💾 **Memory Limits** - 256MB RAM per execution  
🚫 **Network Disabled** - No external network access  
👤 **Non-Root User** - Containers run as UID 1000  
🛡️ **Rate Limiting** - 10 executions per minute per IP

## API Endpoints

### POST `/api/code/run`
Execute code in a sandboxed container.

**Request:**
```json
{
  "language": "python",
  "code": "print('Hello, World!')"
}
```

**Response:**
```json
{
  "success": true,
  "output": "Hello, World!",
  "error": "",
  "exitCode": 0,
  "executionTime": 234
}
```

### GET `/api/code/status`
Check if Docker images are ready.

**Response:**
```json
{
  "ready": true,
  "images": {
    "python": true,
    "node": true
  }
}
```

## Project Structure

```
wolfforge/
├── app/                    # Next.js app directory
│   ├── page.tsx           # Landing page
│   └── editor/
│       └── page.tsx       # Main IDE interface
├── components/            # React components
│   ├── CodeEditor.tsx    # Monaco editor wrapper
│   └── OutputConsole.tsx # Output display
├── server/               # Backend server
│   ├── src/
│   │   ├── index.ts     # Express server
│   │   ├── routes/      # API routes
│   │   └── services/    # Business logic
│   │       └── DockerExecutor.ts
│   └── package.json
├── docker/              # Docker images
│   ├── python.Dockerfile
│   ├── node.Dockerfile
│   └── build.bat
└── docker-compose.yml   # Full stack setup
```

## Development

### Running Tests
```bash
cd server
npm test
```

### Building for Production
```bash
# Frontend
npm run build
npm start

# Backend
cd server
npm run build
npm start
```

## Roadmap

- [x] Python and Node.js support
- [x] Monaco Editor integration
- [x] Docker sandboxing
- [x] Resource limits
- [ ] User authentication
- [ ] Project persistence
- [ ] File management
- [ ] Real-time collaboration
- [ ] Additional languages (Go, Rust, Java)
- [ ] Terminal access
- [ ] Git integration
- [ ] Deployment pipelines

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this project for learning or building your own IDE!

## Acknowledgments

- Monaco Editor by Microsoft
- Docker for containerization
- Next.js team for the amazing framework

---

**Built with ❤️ for developers who want to code anywhere, anytime.**
