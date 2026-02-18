'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import CodeEditor from '@/components/CodeEditor';
import RightPanel from '@/components/RightPanel';
import axios from 'axios';

export type Language =
    | 'python' | 'node' | 'javascript' | 'java' | 'c' | 'csharp'
    | 'go' | 'rust' | 'ruby' | 'php' | 'typescript' | 'bash';

const SAMPLE_CODE: Record<Language, string> = {
    python: `# Welcome to SkyForge!
print("Hello, World!")

for i in range(5):
    print(f"Count: {i}")`,

    node: `// Node.js
console.log("Hello, World!");

for (let i = 0; i < 5; i++) {
  console.log(\`Count: \${i}\`);
}`,

    javascript: `// JavaScript
console.log("Hello, World!");

const nums = [1, 2, 3, 4, 5];
nums.forEach(n => console.log("Number:", n));`,

    typescript: `// TypeScript
const greet = (name: string): string => {
    return \`Hello, \${name}!\`;
};

console.log(greet("SkyForge"));

const nums: number[] = [1, 2, 3, 4, 5];
nums.forEach((n: number) => console.log("Number:", n));`,

    java: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");

        for (int i = 0; i < 5; i++) {
            System.out.println("Count: " + i);
        }
    }
}`,

    c: `#include <stdio.h>

int main() {
    printf("Hello, World!\\n");

    for (int i = 0; i < 5; i++) {
        printf("Count: %d\\n", i);
    }
    return 0;
}`,

    csharp: `using System;

class Program {
    static void Main(string[] args) {
        Console.WriteLine("Hello, World!");

        for (int i = 0; i < 5; i++) {
            Console.WriteLine("Count: " + i);
        }
    }
}`,

    go: `package main

import "fmt"

func main() {
    fmt.Println("Hello, World!")

    for i := 0; i < 5; i++ {
        fmt.Printf("Count: %d\\n", i)
    }
}`,

    rust: `fn main() {
    println!("Hello, World!");

    for i in 0..5 {
        println!("Count: {}", i);
    }
}`,

    ruby: `# Ruby
puts "Hello, World!"

5.times do |i|
  puts "Count: #{i}"
end`,

    php: `<?php
echo "Hello, World!\\n";

for ($i = 0; $i < 5; $i++) {
    echo "Count: $i\\n";
}`,

    bash: `#!/bin/sh
echo "Hello, World!"

for i in 1 2 3 4 5; do
    echo "Count: $i"
done`,
};

const DEVICON = 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons';

interface LangMeta {
    label: string;
    iconUrl: string;
    version: string;
    monacoLang: string;
    filename: string;
    color: string;
}

const LANGUAGE_META: Record<Language, LangMeta> = {
    python: { label: 'Python', iconUrl: `${DEVICON}/python/python-original.svg`, version: 'Python 3.11', monacoLang: 'python', filename: 'main.py', color: '#3776AB' },
    node: { label: 'Node.js', iconUrl: `${DEVICON}/nodejs/nodejs-original.svg`, version: 'Node.js 20', monacoLang: 'javascript', filename: 'index.js', color: '#339933' },
    javascript: { label: 'JavaScript', iconUrl: `${DEVICON}/javascript/javascript-original.svg`, version: 'JavaScript ES6', monacoLang: 'javascript', filename: 'index.js', color: '#F7DF1E' },
    typescript: { label: 'TypeScript', iconUrl: `${DEVICON}/typescript/typescript-original.svg`, version: 'TypeScript 5', monacoLang: 'typescript', filename: 'index.ts', color: '#3178C6' },
    java: { label: 'Java', iconUrl: `${DEVICON}/java/java-original.svg`, version: 'Java 21', monacoLang: 'java', filename: 'Main.java', color: '#ED8B00' },
    c: { label: 'C', iconUrl: `${DEVICON}/c/c-original.svg`, version: 'GCC 13', monacoLang: 'c', filename: 'main.c', color: '#A8B9CC' },
    csharp: { label: 'C#', iconUrl: `${DEVICON}/csharp/csharp-original.svg`, version: 'C# (Mono)', monacoLang: 'csharp', filename: 'Main.cs', color: '#239120' },
    go: { label: 'Go', iconUrl: `${DEVICON}/go/go-original.svg`, version: 'Go 1.22', monacoLang: 'go', filename: 'main.go', color: '#00ADD8' },
    rust: { label: 'Rust', iconUrl: `${DEVICON}/rust/rust-original.svg`, version: 'Rust 1.76', monacoLang: 'rust', filename: 'main.rs', color: '#CE422B' },
    ruby: { label: 'Ruby', iconUrl: `${DEVICON}/ruby/ruby-original.svg`, version: 'Ruby 3.3', monacoLang: 'ruby', filename: 'main.rb', color: '#CC342D' },
    php: { label: 'PHP', iconUrl: `${DEVICON}/php/php-original.svg`, version: 'PHP 8.3', monacoLang: 'php', filename: 'main.php', color: '#777BB4' },
    bash: { label: 'Bash', iconUrl: `${DEVICON}/bash/bash-original.svg`, version: 'Bash / sh', monacoLang: 'shell', filename: 'script.sh', color: '#4EAA25' },
};

export default function EditorPage() {
    const [language, setLanguage] = useState<Language>('python');
    const [code, setCode] = useState(SAMPLE_CODE.python);
    const [output, setOutput] = useState('');
    const [error, setError] = useState('');
    const [isRunning, setIsRunning] = useState(false);
    const [executionTime, setExecutionTime] = useState<number | null>(null);

    const handleLanguageChange = (newLang: Language) => {
        setLanguage(newLang);
        setCode(SAMPLE_CODE[newLang]);
        setOutput('');
        setError('');
        setExecutionTime(null);
    };

    const runCode = async () => {
        setIsRunning(true);
        setOutput('');
        setError('');
        setExecutionTime(null);

        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/api/code/run`, { language, code });
            if (response.data.success) {
                setOutput(response.data.output || '(No output)');
            } else {
                setError(response.data.error || 'Execution failed');
            }
            setExecutionTime(response.data.executionTime);
        } catch (err: any) {
            setError(err.response?.data?.error || err.message || 'Failed to execute code');
        } finally {
            setIsRunning(false);
        }
    };

    const stats = useMemo(() => ({
        lines: code.split('\n').length,
        chars: code.length,
        words: code.trim() ? code.trim().split(/\s+/).length : 0,
    }), [code]);

    const meta = LANGUAGE_META[language];

    return (
        <div className="h-screen flex flex-col bg-gray-900 text-white">
            {/* Header — slim, no language selector */}
            <header className="bg-gradient-to-r from-purple-600 to-blue-600 px-5 py-2.5 shadow-lg flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Link href="/" className="text-xl font-bold hover:opacity-80 transition-opacity">
                        SkyForge
                    </Link>
                    <span className="text-xs text-purple-200 hidden sm:block">Browser IDE</span>
                </div>

                <button
                    onClick={runCode}
                    disabled={isRunning}
                    className={`px-5 py-1.5 rounded-lg font-semibold text-sm transition-all shadow-lg ${isRunning
                        ? 'bg-gray-500 cursor-not-allowed'
                        : 'bg-green-500 hover:bg-green-400 hover:shadow-xl transform hover:scale-105'
                        }`}
                >
                    {isRunning ? 'Running...' : '▶ Run'}
                </button>
            </header>

            {/* Main Content */}
            <div className="flex-1 flex overflow-hidden">

                {/* Code Editor */}
                <div className="flex-1 border-r border-gray-700 overflow-hidden">
                    <CodeEditor
                        value={code}
                        onChange={setCode}
                        language={language}
                        filename={meta.filename}
                        monacoLang={meta.monacoLang}
                        iconUrl={meta.iconUrl}
                    />
                </div>

                {/* Vertical Language Sidebar — between editor and right panel */}
                <div className="w-14 flex flex-col items-center bg-gray-850 border-x border-gray-700 py-2 gap-1 overflow-y-auto"
                    style={{ backgroundColor: '#111827' }}>
                    {(Object.keys(LANGUAGE_META) as Language[]).map((lang) => {
                        const m = LANGUAGE_META[lang];
                        const isActive = language === lang;
                        return (
                            <button
                                key={lang}
                                onClick={() => handleLanguageChange(lang)}
                                title={m.version}
                                className={`w-10 h-10 flex items-center justify-center rounded-lg transition-all duration-150 ${isActive
                                    ? 'bg-white/15 ring-1 ring-white/30 shadow-lg'
                                    : 'hover:bg-white/8 opacity-50 hover:opacity-100'
                                    }`}
                                style={isActive ? { boxShadow: `0 0 10px ${m.color}55` } : {}}
                            >
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={m.iconUrl}
                                    alt={m.label}
                                    width={22}
                                    height={22}
                                    className="w-5.5 h-5.5 object-contain"
                                    onError={(e) => {
                                        const el = e.target as HTMLImageElement;
                                        el.style.display = 'none';
                                        el.parentElement!.textContent = m.label[0];
                                    }}
                                />
                            </button>
                        );
                    })}
                </div>

                {/* Right Panel (Console / Complexity / Notes) */}
                <div className="w-[38%]">
                    <RightPanel
                        output={output}
                        error={error}
                        isRunning={isRunning}
                        executionTime={executionTime}
                        code={code}
                        language={language}
                    />
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-gray-800 px-4 py-1.5 border-t border-gray-700 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3 text-gray-400">
                    <span className="flex items-center gap-1.5">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={meta.iconUrl} alt="" width={12} height={12} className="w-3 h-3 object-contain" />
                        <span className="text-white font-medium">{meta.version}</span>
                    </span>
                    <span className="text-gray-600">|</span>
                    <span>{stats.lines}L · {stats.chars}C · {stats.words}W</span>
                    {executionTime !== null && (
                        <>
                            <span className="text-gray-600">|</span>
                            <span className="text-green-400 font-medium">{executionTime}ms</span>
                        </>
                    )}
                </div>
                <div className="text-gray-600">Docker Sandbox</div>
            </footer>
        </div>
    );
}
