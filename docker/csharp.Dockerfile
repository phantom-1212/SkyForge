FROM mono:latest

# Create non-root user
RUN useradd -m -u 1000 -s /bin/bash coderunner

# Create workspace directory
RUN mkdir /workspace && chown coderunner:coderunner /workspace

# Set working directory
WORKDIR /workspace

# Switch to non-root user
USER coderunner

# Default command
CMD ["mono", "--version"]
