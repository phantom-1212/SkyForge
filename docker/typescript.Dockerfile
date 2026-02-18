FROM node:20-slim

# Install TypeScript and ts-node globally
RUN npm install -g typescript ts-node 2>/dev/null

RUN mkdir /workspace && chown node:node /workspace

WORKDIR /workspace
USER node

CMD ["ts-node", "--version"]
