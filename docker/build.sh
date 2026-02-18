#!/bin/bash

echo "🐳 Building WolfForge Docker images..."

# Build Python image
echo "Building Python execution image..."
docker build -f docker/python.Dockerfile -t wolfforge-python:latest docker/

# Build Node.js image
echo "Building Node.js execution image..."
docker build -f docker/node.Dockerfile -t wolfforge-node:latest docker/

echo "✅ Docker images built successfully!"
echo ""
echo "Available images:"
docker images | grep wolfforge
