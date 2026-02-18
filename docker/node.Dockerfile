FROM node:20-slim

# The official node image already has a 'node' user (uid 1000)
# Create workspace directory owned by that user
RUN mkdir /workspace && chown node:node /workspace

# Set working directory
WORKDIR /workspace

# Switch to non-root user
USER node

# Default command
CMD ["node", "--version"]
