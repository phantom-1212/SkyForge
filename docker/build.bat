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
echo All Docker images built successfully!
echo.
echo Available images:
docker images | findstr wolfforge
