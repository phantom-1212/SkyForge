#!/bin/bash

echo "🐳 Building WolfForge Docker images..."

# Build Python image
echo "Building Python execution image..."
docker build -f python.Dockerfile -t wolfforge-python:latest .

# Build Node.js image
echo "Building Node.js execution image..."
docker build -f node.Dockerfile -t wolfforge-node:latest .

# Build Java image
echo "Building Java execution image..."
docker build -f java.Dockerfile -t wolfforge-java:latest .

# Build JavaScript image
echo "Building JavaScript execution image..."
docker build -f javascript.Dockerfile -t wolfforge-javascript:latest .

# Build C image
echo "Building C execution image..."
docker build -f c.Dockerfile -t wolfforge-c:latest .

# Build C# image
echo "Building C# execution image..."
docker build -f csharp.Dockerfile -t wolfforge-csharp:latest .

# Build Go image
echo "Building Go execution image..."
docker build -f go.Dockerfile -t wolfforge-go:latest .

# Build Rust image
echo "Building Rust execution image..."
docker build -f rust.Dockerfile -t wolfforge-rust:latest .

# Build Ruby image
echo "Building Ruby execution image..."
docker build -f ruby.Dockerfile -t wolfforge-ruby:latest .

# Build PHP image
echo "Building PHP execution image..."
docker build -f php.Dockerfile -t wolfforge-php:latest .

# Build TypeScript image
echo "Building TypeScript execution image..."
docker build -f typescript.Dockerfile -t wolfforge-typescript:latest .

# Build Bash image
echo "Building Bash execution image..."
docker build -f bash.Dockerfile -t wolfforge-bash:latest .

echo "✅ All Docker images built successfully!"
echo ""
echo "Available images:"
docker images | grep wolfforge

