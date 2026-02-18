FROM golang:1.22-alpine

RUN addgroup -g 1000 coderunner && \
    adduser -u 1000 -G coderunner -h /home/coderunner -s /bin/sh -D coderunner

RUN mkdir /workspace && chown coderunner:coderunner /workspace

WORKDIR /workspace

# Pre-warm the Go stdlib build cache so user runs are fast
COPY test_go.go /tmp/warmup.go
RUN GOPROXY=off go build -o /tmp/warmup /tmp/warmup.go && \
    rm /tmp/warmup.go /tmp/warmup

# Disable module proxy and checksum DB (stdlib only, no network needed)
ENV GOPROXY=off \
    GONOSUMCHECK=* \
    GONOSUMDB=* \
    GOPATH=/home/coderunner/go \
    HOME=/home/coderunner

USER coderunner

CMD ["go", "version"]
