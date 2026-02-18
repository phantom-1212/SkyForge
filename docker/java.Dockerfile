FROM eclipse-temurin:21-jdk-alpine

# Alpine uses adduser differently
RUN addgroup -g 1000 coderunner && \
    adduser -u 1000 -G coderunner -h /home/coderunner -s /bin/sh -D coderunner

# Create workspace directory
RUN mkdir /workspace && chown coderunner:coderunner /workspace

# Set working directory
WORKDIR /workspace

# Switch to non-root user
USER coderunner

# Default command
CMD ["java", "--version"]
