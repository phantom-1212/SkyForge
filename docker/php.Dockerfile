FROM php:8.3-cli-alpine

RUN addgroup -g 1000 coderunner && \
    adduser -u 1000 -G coderunner -h /home/coderunner -s /bin/sh -D coderunner

RUN mkdir /workspace && chown coderunner:coderunner /workspace

WORKDIR /workspace
USER coderunner

CMD ["php", "--version"]
