FROM ruby:3.3-slim

RUN apt-get update && apt-get install -y --no-install-recommends passwd && \
    useradd -m -u 1000 -s /bin/sh coderunner && \
    rm -rf /var/lib/apt/lists/*

RUN mkdir /workspace && chown coderunner:coderunner /workspace

WORKDIR /workspace
USER coderunner

CMD ["ruby", "--version"]
