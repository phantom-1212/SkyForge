@echo off
echo Building WolfForge Docker images...
echo.

echo Building Python execution image...
docker build -f python.Dockerfile -t wolfforge-python:latest .

echo.
echo Building Node.js execution image...
docker build -f node.Dockerfile -t wolfforge-node:latest .

echo.
echo Building Java execution image...
docker build -f java.Dockerfile -t wolfforge-java:latest .

echo.
echo Building JavaScript execution image...
docker build -f javascript.Dockerfile -t wolfforge-javascript:latest .

echo.
echo Building C execution image...
docker build -f c.Dockerfile -t wolfforge-c:latest .

echo.
echo Building C# execution image...
docker build -f csharp.Dockerfile -t wolfforge-csharp:latest .

echo.
echo Building Go execution image...
docker build -f go.Dockerfile -t wolfforge-go:latest .

echo.
echo Building Rust execution image...
docker build -f rust.Dockerfile -t wolfforge-rust:latest .

echo.
echo Building Ruby execution image...
docker build -f ruby.Dockerfile -t wolfforge-ruby:latest .

echo.
echo Building PHP execution image...
docker build -f php.Dockerfile -t wolfforge-php:latest .

echo.
echo Building TypeScript execution image...
docker build -f typescript.Dockerfile -t wolfforge-typescript:latest .

echo.
echo Building Bash execution image...
docker build -f bash.Dockerfile -t wolfforge-bash:latest .

echo.
echo All Docker images built successfully!
echo.
echo Available images:
docker images | findstr wolfforge

