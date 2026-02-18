#!/bin/sh
# Simulate exactly what DockerExecutor sends
printf '%s' 'package main

import "fmt"

func main() {
    fmt.Println("Hello, World!")
    for i := 0; i < 5; i++ {
        fmt.Printf("Count: %d\n", i)
    }
}' > main.go

printf 'module sandbox\n\ngo 1.22\n' > go.mod

go run main.go
