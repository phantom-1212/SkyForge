'use client';

import { useState, useCallback, useRef, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import axios from 'axios';
import SnippetsDrawer from '@/components/SnippetsDrawer';
import HtmlPreview from '@/components/HtmlPreview';
import RightPanel from '@/components/RightPanel';

const MonacoEditor = dynamic(() => import('@monaco-editor/react'), { ssr: false });

// ─── Types ────────────────────────────────────────────────────────────────────
type Language =
    | 'python' | 'node' | 'javascript' | 'java' | 'c' | 'csharp'
    | 'go' | 'rust' | 'ruby' | 'php' | 'typescript' | 'bash' | 'html';

interface FileTab {
    id: string;
    filename: string;
    language: Language;
    code: string;
    dirty: boolean;
}

// ─── Language metadata ─────────────────────────────────────────────────────────
const DEVICON = 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons';

const LANG_META: Record<Language, { label: string; iconUrl: string; monacoLang: string; ext: string }> = {
    python: { label: 'Python', iconUrl: `${DEVICON}/python/python-original.svg`, monacoLang: 'python', ext: 'py' },
    node: { label: 'Node.js', iconUrl: `${DEVICON}/nodejs/nodejs-original.svg`, monacoLang: 'javascript', ext: 'js' },
    javascript: { label: 'JavaScript', iconUrl: `${DEVICON}/javascript/javascript-original.svg`, monacoLang: 'javascript', ext: 'js' },
    typescript: { label: 'TypeScript', iconUrl: `${DEVICON}/typescript/typescript-original.svg`, monacoLang: 'typescript', ext: 'ts' },
    java: { label: 'Java', iconUrl: `${DEVICON}/java/java-original.svg`, monacoLang: 'java', ext: 'java' },
    c: { label: 'C', iconUrl: `${DEVICON}/c/c-original.svg`, monacoLang: 'c', ext: 'c' },
    csharp: { label: 'C#', iconUrl: `${DEVICON}/csharp/csharp-original.svg`, monacoLang: 'csharp', ext: 'cs' },
    go: { label: 'Go', iconUrl: `${DEVICON}/go/go-original.svg`, monacoLang: 'go', ext: 'go' },
    rust: { label: 'Rust', iconUrl: `${DEVICON}/rust/rust-original.svg`, monacoLang: 'rust', ext: 'rs' },
    ruby: { label: 'Ruby', iconUrl: `${DEVICON}/ruby/ruby-original.svg`, monacoLang: 'ruby', ext: 'rb' },
    php: { label: 'PHP', iconUrl: `${DEVICON}/php/php-original.svg`, monacoLang: 'php', ext: 'php' },
    bash: { label: 'Bash', iconUrl: `${DEVICON}/bash/bash-original.svg`, monacoLang: 'shell', ext: 'sh' },
    html: { label: 'HTML', iconUrl: `${DEVICON}/html5/html5-original.svg`, monacoLang: 'html', ext: 'html' },
};

// ─── Template code (imported from templates page data) ────────────────────────
const TEMPLATE_CODE: Record<string, { language: Language; filename: string; code: string }> = {
    'express-api': {
        language: 'node', filename: 'server.js',
        code: `// REST API demo — Node.js built-in http module only (no npm needed)
const http = require('http');

let todos = [
  { id: 1, text: 'Learn SkyForge', done: false },
  { id: 2, text: 'Build something awesome', done: false },
];
let nextId = 3;

function respond(res, status, body) {
  res.writeHead(status, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(body, null, 2));
}

// Parse /todos/:id without regex to avoid shell escaping issues
function getTodoId(path) {
  const parts = path.split('/');
  if (parts.length === 3 && parts[1] === 'todos') {
    const id = parseInt(parts[2]);
    return isNaN(id) ? null : id;
  }
  return null;
}

const server = http.createServer((req, res) => {
  const path = req.url.split('?')[0];
  const todoId = getTodoId(path);

  if (req.method === 'GET' && path === '/todos') {
    return respond(res, 200, { success: true, data: todos });
  }

  if (req.method === 'GET' && todoId !== null) {
    const todo = todos.find(t => t.id === todoId);
    return todo
      ? respond(res, 200, { success: true, data: todo })
      : respond(res, 404, { error: 'Not found' });
  }

  if (req.method === 'POST' && path === '/todos') {
    let body = '';
    req.on('data', chunk => (body += chunk));
    req.on('end', () => {
      const parsed = JSON.parse(body || '{}');
      const todo = { id: nextId++, text: parsed.text || 'New todo', done: false };
      todos.push(todo);
      respond(res, 201, { success: true, data: todo });
    });
    return;
  }

  respond(res, 404, { error: 'Route not found' });
});

// Simulate HTTP requests (no real network needed in sandbox)
function sim(method, path, body) {
  const label = method + ' ' + path;
  console.log('');
  console.log(label);
  const req = { method, url: path, headers: {} };
  const res = {
    writeHead: (s) => process.stdout.write('Status: ' + s + '\\n'),
    end: (data) => console.log(data),
  };
  if (body) {
    req.on = (ev, cb) => { if (ev === 'data') cb(JSON.stringify(body)); if (ev === 'end') cb(); };
  } else {
    req.on = () => {};
  }
  server.emit('request', req, res);
}

console.log('=== SkyForge REST API Demo ===');
sim('GET',  '/todos');
sim('GET',  '/todos/1');
sim('POST', '/todos', { text: 'Deploy to production' });
sim('GET',  '/todos');
sim('GET',  '/todos/99');
`,
    },
    'python-cli': {
        language: 'python', filename: 'cli.py',
        code: `import argparse

def greet(name, uppercase=False):
    msg = f"Hello, {name}! Welcome to SkyForge CLI."
    print(msg.upper() if uppercase else msg)

def calculate(a, b, op):
    ops = {'+': a+b, '-': a-b, '*': a*b, '/': a/b if b!=0 else 'Error'}
    print(f"{a} {op} {b} = {ops.get(op, '?')}")

# Demo mode
print("=== SkyForge CLI Demo ===")
greet("Developer")
calculate(42, 8, '+')
calculate(100, 7, '/')
`,
    },
    'python-scraper': {
        language: 'python', filename: 'scraper.py',
        code: `import re
from datetime import datetime

SAMPLE_HTML = """
<article><h2>SkyForge Launches</h2><span class="date">2024-02-18</span><p>New features...</p><span class="author">Jane</span></article>
<article><h2>Docker Sandboxing</h2><span class="date">2024-02-15</span><p>Isolated containers...</p><span class="author">John</span></article>
"""

def scrape(html):
    articles = []
    for block in re.findall(r'<article>(.*?)</article>', html, re.DOTALL):
        title  = re.search(r'<h2>(.*?)</h2>', block)
        date   = re.search(r'class="date">(.*?)</span>', block)
        author = re.search(r'class="author">(.*?)</span>', block)
        if title:
            articles.append({'title': title.group(1), 'date': date.group(1) if date else '?', 'author': author.group(1) if author else '?'})
    return articles

for a in scrape(SAMPLE_HTML):
    print(f"[{a['date']}] {a['title']} — by {a['author']}")
print(f"Scraped at {datetime.now():%Y-%m-%d %H:%M:%S}")
`,
    },
    'data-pipeline': {
        language: 'python', filename: 'pipeline.py',
        code: `from statistics import mean, median

DATA = [
    {"name": "Alice",   "dept": "Engineering", "salary": 95000, "years": 5},
    {"name": "Bob",     "dept": "Marketing",   "salary": 72000, "years": 3},
    {"name": "Charlie", "dept": "Engineering", "salary": 110000,"years": 8},
    {"name": "Diana",   "dept": "Design",      "salary": 85000, "years": 4},
]

# Transform
for r in DATA:
    r['bonus'] = round(r['salary'] * (0.05 + r['years'] * 0.01), 2)
    r['total'] = r['salary'] + r['bonus']
    r['level'] = 'Senior' if r['years'] >= 5 else 'Junior'

# Report
salaries = [r['salary'] for r in DATA]
print(f"Employees: {len(DATA)}  |  Avg: \${mean(salaries):,.0f}  |  Median: \${median(salaries):,.0f}")
print()
for r in sorted(DATA, key=lambda x: -x['total']):
    print(f"  {r['name']:<10} {r['level']:<7} \${r['salary']:>7,}  +bonus \${r['bonus']:>7,.0f}")
`,
    },
    'go-http': {
        language: 'go', filename: 'main.go',
        code: `package main

import (
	"encoding/json"
	"fmt"
	"strings"
	"time"
)

type Response struct {
	Success bool        \`json:"success"\`
	Data    interface{} \`json:"data"\`
	Time    string      \`json:"timestamp"\`
}

type User struct {
	ID    int    \`json:"id"\`
	Name  string \`json:"name"\`
	Email string \`json:"email"\`
}

func toJSON(v interface{}) string {
	b, _ := json.MarshalIndent(v, "", "  ")
	return string(b)
}

func main() {
	users := []User{
		{1, "Alice Johnson", "alice@SkyForge.dev"},
		{2, "Bob Smith",     "bob@SkyForge.dev"},
	}

	fmt.Println("GET /users")
	fmt.Println(toJSON(Response{true, users, time.Now().Format(time.RFC3339)}))
	fmt.Println()

	query := "alice"
	var results []User
	for _, u := range users {
		if strings.Contains(strings.ToLower(u.Name), query) {
			results = append(results, u)
		}
	}
	fmt.Printf("GET /users?search=%s\\n", query)
	fmt.Println(toJSON(Response{true, results, time.Now().Format(time.RFC3339)}))
}
`,
    },
    'rust-fibonacci': {
        language: 'rust', filename: 'main.rs',
        code: `use std::collections::HashMap;
use std::time::Instant;

fn fib_memo(n: u64, memo: &mut HashMap<u64, u64>) -> u64 {
    if n <= 1 { return n; }
    if let Some(&v) = memo.get(&n) { return v; }
    let result = fib_memo(n-1, memo) + fib_memo(n-2, memo);
    memo.insert(n, result);
    result
}

fn fib_iter(n: u64) -> u64 {
    if n <= 1 { return n; }
    let (mut a, mut b) = (0u64, 1u64);
    for _ in 2..=n { let c = a.saturating_add(b); a = b; b = c; }
    b
}

fn main() {
    println!("Fibonacci Benchmark");
    println!("{}", "=".repeat(40));
    for &n in &[10u64, 20, 30, 40, 50] {
        let start = Instant::now();
        let mut memo = HashMap::new();
        let result = fib_memo(n, &mut memo);
        println!("  fib({:>2}) = {:>15}  ({:.2?})", n, result, start.elapsed());
    }
    let seq: Vec<u64> = (0..10).map(fib_iter).collect();
    println!("\\nFirst 10: {:?}", seq);
}
`,
    },
    'typescript-todo': {
        language: 'typescript', filename: 'todo.ts',
        code: `interface Todo {
    id: number;
    text: string;
    done: boolean;
    priority: 'low' | 'medium' | 'high';
}

class TodoManager {
    private todos: Todo[] = [];
    private nextId = 1;

    add(text: string, priority: Todo['priority'] = 'medium'): Todo {
        const todo = { id: this.nextId++, text, done: false, priority };
        this.todos.push(todo);
        return todo;
    }

    toggle(id: number) {
        const t = this.todos.find(t => t.id === id);
        if (t) t.done = !t.done;
    }

    print() {
        const icons = { low: '🟢', medium: '🟡', high: '🔴' };
        console.log('\\n=== Todo List ===');
        this.todos.forEach(t => {
            console.log(\`  [\${t.done ? '✓' : '○'}] \${icons[t.priority]} \${t.text}\`);
        });
        const done = this.todos.filter(t => t.done).length;
        console.log(\`\\nProgress: \${done}/\${this.todos.length}\`);
    }
}

const mgr = new TodoManager();
mgr.add('Set up SkyForge', 'high');
mgr.add('Write TypeScript code', 'high');
mgr.add('Add tests', 'medium');
mgr.add('Deploy', 'low');
mgr.toggle(1);
mgr.toggle(2);
mgr.print();
`,
    },
    'ruby-parser': {
        language: 'ruby', filename: 'parser.rb',
        code: `data = [
  { name: 'Alice',   dept: 'Engineering', salary: 95000, years: 5 },
  { name: 'Bob',     dept: 'Marketing',   salary: 72000, years: 3 },
  { name: 'Charlie', dept: 'Engineering', salary: 110000,years: 8 },
  { name: 'Diana',   dept: 'Design',      salary: 85000, years: 4 },
]

data.each do |r|
  r[:bonus] = (r[:salary] * (0.05 + r[:years] * 0.01)).round(2)
  r[:level] = r[:years] >= 5 ? 'Senior' : 'Junior'
end

avg = data.sum { |r| r[:salary] } / data.size
puts "Employees: #{data.size}  |  Avg salary: $#{avg}"
puts

data.group_by { |r| r[:dept] }.sort.each do |dept, members|
  puts "[#{dept}]"
  members.sort_by { |m| -m[:salary] }.each do |m|
    puts "  #{m[:name].ljust(10)} #{m[:level].ljust(7)} $#{m[:salary]}  +$#{m[:bonus]}"
  end
  puts
end
`,
    },
};

const DEFAULT_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My App</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Segoe UI', sans-serif;
      background: linear-gradient(135deg, #1a1a2e, #16213e);
      color: white;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .card {
      background: rgba(255,255,255,0.1);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255,255,255,0.2);
      border-radius: 16px;
      padding: 40px;
      text-align: center;
      max-width: 400px;
    }
    h1 { font-size: 2rem; margin-bottom: 12px; background: linear-gradient(to right, #a855f7, #3b82f6); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
    p { color: rgba(255,255,255,0.7); margin-bottom: 24px; }
    button {
      background: linear-gradient(to right, #a855f7, #3b82f6);
      color: white;
      border: none;
      padding: 12px 28px;
      border-radius: 8px;
      font-size: 1rem;
      cursor: pointer;
      transition: transform 0.2s, opacity 0.2s;
    }
    button:hover { transform: scale(1.05); opacity: 0.9; }
    #counter { font-size: 3rem; font-weight: bold; margin: 16px 0; color: #a855f7; }
  </style>
</head>
<body>
  <div class="card">
    <h1>SkyForge App</h1>
    <p>Edit this HTML to build your app. Preview updates live!</p>
    <div id="counter">0</div>
    <button onclick="document.getElementById('counter').textContent = +document.getElementById('counter').textContent + 1">
      Click Me!
    </button>
  </div>
</body>
</html>`;

const DEFAULT_PYTHON = `# Welcome to SkyForge Studio
print("Hello, World!")

for i in range(5):
    print(f"Count: {i}")
`;

// ─── New file dialog ───────────────────────────────────────────────────────────
function NewFileDialog({ onConfirm, onCancel }: { onConfirm: (name: string, lang: Language) => void; onCancel: () => void }) {
    const [name, setName] = useState('');
    const [lang, setLang] = useState<Language>('python');
    const meta = LANG_META[lang];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) return;
        const filename = name.includes('.') ? name : `${name}.${meta.ext}`;
        onConfirm(filename, lang);
    };

    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
            <form onSubmit={handleSubmit} className="bg-gray-800 border border-gray-700 rounded-xl p-6 w-80 shadow-2xl">
                <h3 className="text-white font-semibold mb-4">New File</h3>
                <div className="mb-3">
                    <label className="text-xs text-gray-400 mb-1 block">Filename</label>
                    <input
                        autoFocus
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder={`main.${meta.ext}`}
                        className="w-full bg-gray-900 text-white text-sm px-3 py-2 rounded-lg border border-gray-600 focus:outline-none focus:border-purple-500"
                    />
                </div>
                <div className="mb-4">
                    <label className="text-xs text-gray-400 mb-1 block">Language</label>
                    <select
                        value={lang}
                        onChange={e => setLang(e.target.value as Language)}
                        className="w-full bg-gray-900 text-white text-sm px-3 py-2 rounded-lg border border-gray-600 focus:outline-none focus:border-purple-500"
                    >
                        {(Object.keys(LANG_META) as Language[]).map(l => (
                            <option key={l} value={l}>{LANG_META[l].label}</option>
                        ))}
                    </select>
                </div>
                <div className="flex gap-2">
                    <button type="button" onClick={onCancel} className="flex-1 py-2 text-sm text-gray-400 hover:text-white bg-gray-700 rounded-lg transition-colors">Cancel</button>
                    <button type="submit" className="flex-1 py-2 text-sm text-white bg-purple-600 hover:bg-purple-500 rounded-lg transition-colors">Create</button>
                </div>
            </form>
        </div>
    );
}

// ─── Main Studio ───────────────────────────────────────────────────────────────
function StudioInner() {
    const searchParams = useSearchParams();
    const editorRef = useRef<any>(null);

    const makeTab = (id: string, filename: string, language: Language, code: string): FileTab =>
        ({ id, filename, language, code, dirty: false });

    const [tabs, setTabs] = useState<FileTab[]>([
        makeTab('tab-1', 'main.py', 'python', DEFAULT_PYTHON),
        makeTab('tab-2', 'index.html', 'html', DEFAULT_HTML),
    ]);
    const [activeTabId, setActiveTabId] = useState('tab-1');
    const [showNewFile, setShowNewFile] = useState(false);
    const [snippetsOpen, setSnippetsOpen] = useState(false);
    const [output, setOutput] = useState('');
    const [error, setError] = useState('');
    const [isRunning, setIsRunning] = useState(false);
    const [executionTime, setExecutionTime] = useState<number | null>(null);
    const [theme, setTheme] = useState<'vs-dark' | 'light'>('vs-dark');

    const templateLoadedRef = useRef(false);

    // Load template from URL param — guard against React Strict Mode double-invoke
    useEffect(() => {
        if (templateLoadedRef.current) return;
        const templateId = searchParams.get('template');
        if (templateId && TEMPLATE_CODE[templateId]) {
            templateLoadedRef.current = true;
            const t = TEMPLATE_CODE[templateId];
            const newTab = makeTab(`tab-template-${templateId}`, t.filename, t.language, t.code);
            setTabs(prev => {
                // Also guard against the tab already existing
                if (prev.some(tab => tab.id === newTab.id)) return prev;
                return [newTab, ...prev];
            });
            setActiveTabId(newTab.id);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const activeTab = tabs.find(t => t.id === activeTabId) ?? tabs[0];
    const isHtml = activeTab?.language === 'html';

    const updateCode = useCallback((code: string) => {
        setTabs(prev => prev.map(t => t.id === activeTabId ? { ...t, code, dirty: true } : t));
    }, [activeTabId]);

    const closeTab = (id: string) => {
        if (tabs.length === 1) return;
        const idx = tabs.findIndex(t => t.id === id);
        const newTabs = tabs.filter(t => t.id !== id);
        setTabs(newTabs);
        if (activeTabId === id) {
            setActiveTabId(newTabs[Math.max(0, idx - 1)].id);
        }
    };

    const createTab = (filename: string, language: Language) => {
        const defaultCode = language === 'html' ? DEFAULT_HTML : `# ${filename}\n`;
        const newTab = makeTab(`tab-${Date.now()}`, filename, language, defaultCode);
        setTabs(prev => [...prev, newTab]);
        setActiveTabId(newTab.id);
        setShowNewFile(false);
    };

    const insertSnippet = useCallback((code: string) => {
        if (editorRef.current) {
            const editor = editorRef.current;
            const selection = editor.getSelection();
            editor.executeEdits('snippet', [{
                range: selection,
                text: code,
                forceMoveMarkers: true,
            }]);
            editor.focus();
        }
    }, []);

    const runCode = async () => {
        if (isHtml) return;
        setIsRunning(true);
        setOutput('');
        setError('');
        setExecutionTime(null);
        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/api/code/run`, {
                language: activeTab.language,
                code: activeTab.code,
            });
            if (res.data.success) {
                setOutput(res.data.output || '(No output)');
            } else {
                setError(res.data.error || 'Execution failed');
            }
            setExecutionTime(res.data.executionTime);
        } catch (err: any) {
            setError(err.response?.data?.error || err.message || 'Failed to connect to server');
        } finally {
            setIsRunning(false);
        }
    };

    const stats = useMemo(() => {
        const code = activeTab?.code ?? '';
        return { lines: code.split('\n').length, chars: code.length };
    }, [activeTab]);

    const meta = LANG_META[activeTab?.language ?? 'python'];

    return (
        <div className="h-screen flex flex-col bg-gray-950 text-white overflow-hidden">
            {/* ── Header ── */}
            <header className="bg-gray-900 border-b border-gray-800 px-4 py-2 flex items-center justify-between flex-shrink-0">
                <div className="flex items-center gap-3">
                    <Link href="/" className="text-gray-400 hover:text-white text-sm transition-colors">← Home</Link>
                    <span className="text-gray-700">|</span>
                    <span className="font-bold text-white">Studio</span>
                    <Link href="/templates" className="text-xs text-gray-500 hover:text-purple-400 transition-colors">Templates</Link>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setSnippetsOpen(true)}
                        className="text-xs px-3 py-1.5 bg-gray-700 hover:bg-gray-600 rounded-lg text-gray-300 transition-colors"
                    >
                        Snippets
                    </button>
                    <button
                        onClick={() => setTheme(t => t === 'vs-dark' ? 'light' : 'vs-dark')}
                        className="text-xs px-3 py-1.5 bg-gray-700 hover:bg-gray-600 rounded-lg text-gray-300 transition-colors"
                    >
                        {theme === 'vs-dark' ? 'Light' : 'Dark'}
                    </button>
                    {!isHtml && (
                        <button
                            onClick={runCode}
                            disabled={isRunning}
                            className={`px-4 py-1.5 rounded-lg font-semibold text-sm transition-all ${isRunning ? 'bg-gray-600 cursor-not-allowed' : 'bg-green-600 hover:bg-green-500'}`}
                        >
                            {isRunning ? 'Running...' : '▶ Run'}
                        </button>
                    )}
                </div>
            </header>

            {/* ── File Tabs ── */}
            <div className="bg-gray-900 border-b border-gray-800 flex items-center overflow-x-auto flex-shrink-0">
                {tabs.map(tab => {
                    const m = LANG_META[tab.language];
                    const isActive = tab.id === activeTabId;
                    return (
                        <div
                            key={tab.id}
                            onClick={() => setActiveTabId(tab.id)}
                            className={`group flex items-center gap-1.5 px-3 py-2 cursor-pointer border-r border-gray-800 text-sm whitespace-nowrap transition-colors flex-shrink-0 ${isActive ? 'bg-gray-800 text-white' : 'text-gray-500 hover:text-gray-300 hover:bg-gray-800/50'}`}
                        >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={m.iconUrl} alt="" width={14} height={14} className="w-3.5 h-3.5 object-contain flex-shrink-0" onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                            <span>{tab.filename}</span>
                            {tab.dirty && <span className="text-purple-400 text-xs">•</span>}
                            {isActive && (
                                <button
                                    onClick={e => { e.stopPropagation(); closeTab(tab.id); }}
                                    className="ml-1 text-gray-600 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100 leading-none"
                                >
                                    ✕
                                </button>
                            )}
                        </div>
                    );
                })}
                {/* New file button */}
                <button
                    onClick={() => setShowNewFile(true)}
                    className="px-3 py-2 text-gray-600 hover:text-white hover:bg-gray-800 transition-colors text-lg leading-none flex-shrink-0"
                    title="New file"
                >
                    +
                </button>
            </div>

            {/* ── Main Area ── */}
            <div className="flex-1 flex overflow-hidden">
                {/* Editor */}
                <div className="flex-1 overflow-hidden">
                    <MonacoEditor
                        height="100%"
                        language={meta.monacoLang}
                        value={activeTab?.code ?? ''}
                        onChange={v => updateCode(v ?? '')}
                        theme={theme}
                        onMount={editor => { editorRef.current = editor; }}
                        options={{
                            minimap: { enabled: false },
                            fontSize: 14,
                            lineNumbers: 'on',
                            scrollBeyondLastLine: false,
                            automaticLayout: true,
                            tabSize: 4,
                            wordWrap: 'on',
                        }}
                    />
                </div>

                {/* Right panel: HTML preview or Console/Complexity/Notes */}
                <div className="w-[42%] border-l border-gray-800 overflow-hidden">
                    {isHtml ? (
                        <HtmlPreview html={activeTab?.code ?? ''} />
                    ) : (
                        <RightPanel
                            output={output}
                            error={error}
                            isRunning={isRunning}
                            executionTime={executionTime}
                            code={activeTab?.code ?? ''}
                            language={activeTab?.language as any ?? 'python'}
                        />
                    )}
                </div>
            </div>

            {/* ── Footer ── */}
            <footer className="bg-gray-900 border-t border-gray-800 px-4 py-1 flex items-center justify-between text-xs text-gray-500 flex-shrink-0">
                <div className="flex items-center gap-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={meta.iconUrl} alt="" width={12} height={12} className="w-3 h-3 object-contain" />
                    <span className="text-gray-400">{meta.label}</span>
                    <span>·</span>
                    <span>{stats.lines}L · {stats.chars}C</span>
                    {executionTime !== null && <span className="text-green-400">{executionTime}ms</span>}
                </div>
                <div className="flex items-center gap-2">
                    <span>{tabs.length} file{tabs.length !== 1 ? 's' : ''} open</span>
                    {isHtml && <span className="text-blue-400">Live Preview</span>}
                </div>
            </footer>

            {/* ── Modals / Drawers ── */}
            {showNewFile && <NewFileDialog onConfirm={createTab} onCancel={() => setShowNewFile(false)} />}
            <SnippetsDrawer isOpen={snippetsOpen} onClose={() => setSnippetsOpen(false)} onInsert={insertSnippet} />
        </div>
    );
}

export default function StudioPage() {
    return (
        <Suspense fallback={<div className="h-screen bg-gray-950 flex items-center justify-center text-white">Loading Studio...</div>}>
            <StudioInner />
        </Suspense>
    );
}
