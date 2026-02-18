'use client';

import Link from 'next/link';

const DEVICON = 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons';

interface Template {
    id: string;
    name: string;
    description: string;
    language: string;
    iconUrl: string;
    tags: string[];
    color: string;
    code?: string;
}

const TEMPLATES: Template[] = [
    {
        id: 'express-api',
        name: 'REST API',
        description: 'Node.js HTTP server with GET/POST routes, JSON responses, and request routing — no npm packages needed.',
        language: 'node',
        iconUrl: `${DEVICON}/nodejs/nodejs-original.svg`,
        tags: ['API', 'Server', 'HTTP'],
        color: '#339933',
    },
    {
        id: 'python-cli',
        name: 'CLI Tool',
        description: 'Python command-line tool with argument parsing, colored output, and subcommands.',
        language: 'python',
        iconUrl: `${DEVICON}/python/python-original.svg`,
        tags: ['CLI', 'Tool', 'Utility'],
        color: '#3776AB',
        code: `import argparse
import sys

def greet(name, uppercase=False):
    msg = f"Hello, {name}! Welcome to SkyForge CLI."
    print(msg.upper() if uppercase else msg)

def calculate(a, b, op):
    ops = {'+': a + b, '-': a - b, '*': a * b, '/': a / b if b != 0 else 'Error: division by zero'}
    result = ops.get(op, 'Unknown operator')
    print(f"{a} {op} {b} = {result}")

def main():
    parser = argparse.ArgumentParser(description='SkyForge CLI Tool')
    subparsers = parser.add_subparsers(dest='command')

    # greet subcommand
    greet_p = subparsers.add_parser('greet', help='Greet a user')
    greet_p.add_argument('name', help='Name to greet')
    greet_p.add_argument('--upper', action='store_true', help='Uppercase output')

    # calc subcommand
    calc_p = subparsers.add_parser('calc', help='Simple calculator')
    calc_p.add_argument('a', type=float)
    calc_p.add_argument('op', choices=['+', '-', '*', '/'])
    calc_p.add_argument('b', type=float)

    args = parser.parse_args()

    if args.command == 'greet':
        greet(args.name, args.upper)
    elif args.command == 'calc':
        calculate(args.a, args.b, args.op)
    else:
        # Demo mode when run without args
        print("=== SkyForge CLI Demo ===")
        greet("Developer")
        calculate(42, 8, '+')
        calculate(100, 7, '/')
        print("Run with --help to see all commands.")

if __name__ == '__main__':
    main()
`,
    },
    {
        id: 'python-scraper',
        name: 'Web Scraper',
        description: 'Python data scraper that parses structured text and extracts information.',
        language: 'python',
        iconUrl: `${DEVICON}/python/python-original.svg`,
        tags: ['Data', 'Scraper', 'Parser'],
        color: '#3776AB',
        code: `import re
from datetime import datetime

# Simulated HTML content (no network needed in sandbox)
SAMPLE_HTML = """
<html>
<body>
  <article class="post">
    <h2>SkyForge Launches Multi-Language Support</h2>
    <span class="date">2024-02-18</span>
    <p>SkyForge now supports 12 programming languages...</p>
    <span class="author">Jane Doe</span>
  </article>
  <article class="post">
    <h2>Docker Sandboxing: How It Works</h2>
    <span class="date">2024-02-15</span>
    <p>Every code execution runs in an isolated container...</p>
    <span class="author">John Smith</span>
  </article>
  <article class="post">
    <h2>Monaco Editor Integration Guide</h2>
    <span class="date">2024-02-10</span>
    <p>Integrating Monaco Editor with Next.js requires...</p>
    <span class="author">Alice Johnson</span>
  </article>
</html>
"""

def scrape_articles(html):
    articles = []
    blocks = re.findall(r'<article[^>]*>(.*?)</article>', html, re.DOTALL)
    for block in blocks:
        title = re.search(r'<h2>(.*?)</h2>', block)
        date  = re.search(r'<span class="date">(.*?)</span>', block)
        author = re.search(r'<span class="author">(.*?)</span>', block)
        excerpt = re.search(r'<p>(.*?)</p>', block)
        if title:
            articles.append({
                'title':   title.group(1).strip(),
                'date':    date.group(1).strip() if date else 'Unknown',
                'author':  author.group(1).strip() if author else 'Unknown',
                'excerpt': excerpt.group(1).strip()[:60] + '...' if excerpt else '',
            })
    return articles

def display(articles):
    print(f"Found {len(articles)} articles\\n{'='*50}")
    for i, a in enumerate(articles, 1):
        print(f"[{i}] {a['title']}")
        print(f"    By {a['author']} on {a['date']}")
        print(f"    {a['excerpt']}")
        print()

articles = scrape_articles(SAMPLE_HTML)
display(articles)
print(f"Scraped at: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
`,
    },
    {
        id: 'data-pipeline',
        name: 'Data Pipeline',
        description: 'Python ETL pipeline: extract raw data, transform it, and output a report.',
        language: 'python',
        iconUrl: `${DEVICON}/python/python-original.svg`,
        tags: ['Data', 'ETL', 'Analytics'],
        color: '#3776AB',
        code: `from statistics import mean, median, stdev

# --- EXTRACT ---
RAW_DATA = [
    {"name": "Alice",   "dept": "Engineering", "salary": 95000, "years": 5},
    {"name": "Bob",     "dept": "Marketing",   "salary": 72000, "years": 3},
    {"name": "Charlie", "dept": "Engineering", "salary": 110000,"years": 8},
    {"name": "Diana",   "dept": "Design",      "salary": 85000, "years": 4},
    {"name": "Eve",     "dept": "Engineering", "salary": 98000, "years": 6},
    {"name": "Frank",   "dept": "Marketing",   "salary": 68000, "years": 2},
    {"name": "Grace",   "dept": "Design",      "salary": 92000, "years": 7},
    {"name": "Henry",   "dept": "Engineering", "salary": 105000,"years": 9},
]

# --- TRANSFORM ---
def transform(records):
    for r in records:
        r['annual_bonus'] = round(r['salary'] * (0.05 + r['years'] * 0.01), 2)
        r['total_comp']   = r['salary'] + r['annual_bonus']
        r['seniority']    = 'Senior' if r['years'] >= 5 else 'Junior'
    return records

def group_by_dept(records):
    groups = {}
    for r in records:
        groups.setdefault(r['dept'], []).append(r)
    return groups

# --- LOAD / REPORT ---
def report(data):
    transformed = transform(data)
    groups = group_by_dept(transformed)
    salaries = [r['salary'] for r in transformed]

    print("=" * 55)
    print("  EMPLOYEE COMPENSATION REPORT")
    print("=" * 55)
    print(f"  Total employees : {len(transformed)}")
    print(f"  Avg salary      : \${mean(salaries):,.0f}")
    print(f"  Median salary   : \${median(salaries):,.0f}")
    print(f"  Std deviation   : \${stdev(salaries):,.0f}")
    print()

    for dept, members in sorted(groups.items()):
        dept_salaries = [m['salary'] for m in members]
        print(f"  [{dept}]  ({len(members)} employees, avg \${mean(dept_salaries):,.0f})")
        for m in sorted(members, key=lambda x: -x['total_comp']):
            print(f"    {m['name']:<10} {m['seniority']:<7} \${m['salary']:>7,}  +bonus \${m['annual_bonus']:>7,.0f}")
        print()

report(RAW_DATA)
`,
    },
    {
        id: 'go-http',
        name: 'HTTP Server',
        description: 'Go net/http server with JSON API, middleware, and structured routing.',
        language: 'go',
        iconUrl: `${DEVICON}/go/go-original.svg`,
        tags: ['API', 'Server', 'Go'],
        color: '#00ADD8',
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
	Role  string \`json:"role"\`
}

func toJSON(v interface{}) string {
	b, _ := json.MarshalIndent(v, "", "  ")
	return string(b)
}

func main() {
	users := []User{
		{1, "Alice Johnson", "alice@SkyForge.dev", "admin"},
		{2, "Bob Smith",     "bob@SkyForge.dev",   "developer"},
		{3, "Carol White",   "carol@SkyForge.dev",  "designer"},
	}

	// Simulate GET /users
	fmt.Println("GET /users")
	fmt.Println(toJSON(Response{
		Success: true,
		Data:    users,
		Time:    time.Now().Format(time.RFC3339),
	}))

	fmt.Println()

	// Simulate GET /users/1
	fmt.Println("GET /users/1")
	fmt.Println(toJSON(Response{
		Success: true,
		Data:    users[0],
		Time:    time.Now().Format(time.RFC3339),
	}))

	fmt.Println()

	// Simulate search
	query := "alice"
	fmt.Printf("GET /users?search=%s\\n", query)
	var results []User
	for _, u := range users {
		if strings.Contains(strings.ToLower(u.Name), query) {
			results = append(results, u)
		}
	}
	fmt.Println(toJSON(Response{
		Success: true,
		Data:    results,
		Time:    time.Now().Format(time.RFC3339),
	}))
}
`,
    },
    {
        id: 'rust-fibonacci',
        name: 'Fibonacci CLI',
        description: 'Rust program computing Fibonacci with memoization, benchmarking, and formatted output.',
        language: 'rust',
        iconUrl: `${DEVICON}/rust/rust-original.svg`,
        tags: ['Algorithm', 'CLI', 'Performance'],
        color: '#CE422B',
        code: `use std::collections::HashMap;
use std::time::Instant;

fn fib_memo(n: u64, memo: &mut HashMap<u64, u64>) -> u64 {
    if n <= 1 { return n; }
    if let Some(&v) = memo.get(&n) { return v; }
    let result = fib_memo(n - 1, memo) + fib_memo(n - 2, memo);
    memo.insert(n, result);
    result
}

fn fib_iterative(n: u64) -> u64 {
    if n <= 1 { return n; }
    let (mut a, mut b) = (0u64, 1u64);
    for _ in 2..=n {
        let c = a.saturating_add(b);
        a = b;
        b = c;
    }
    b
}

fn benchmark<F: Fn() -> u64>(label: &str, f: F) -> u64 {
    let start = Instant::now();
    let result = f();
    let elapsed = start.elapsed();
    println!("  {:<20} = {:>20}  ({:.2?})", label, result, elapsed);
    result
}

fn main() {
    println!("╔══════════════════════════════════════╗");
    println!("║     Fibonacci Benchmark — Rust       ║");
    println!("╚══════════════════════════════════════╝");
    println!();

    let targets = [10u64, 20, 30, 40, 50, 70, 90];

    for &n in &targets {
        println!("  fib({n}):");
        let mut memo = HashMap::new();
        benchmark("  memoized", || fib_memo(n, &mut memo));
        benchmark("  iterative", || fib_iterative(n));
        println!();
    }

    println!("First 15 Fibonacci numbers:");
    let seq: Vec<u64> = (0..15).map(fib_iterative).collect();
    println!("  {:?}", seq);
}
`,
    },
    {
        id: 'typescript-todo',
        name: 'Todo App',
        description: 'TypeScript class-based todo manager with generics, interfaces, and type safety.',
        language: 'typescript',
        iconUrl: `${DEVICON}/typescript/typescript-original.svg`,
        tags: ['TypeScript', 'OOP', 'Types'],
        color: '#3178C6',
        code: `interface Todo {
    id: number;
    text: string;
    done: boolean;
    priority: 'low' | 'medium' | 'high';
    createdAt: Date;
}

class TodoManager {
    private todos: Todo[] = [];
    private nextId = 1;

    add(text: string, priority: Todo['priority'] = 'medium'): Todo {
        const todo: Todo = {
            id: this.nextId++,
            text,
            done: false,
            priority,
            createdAt: new Date(),
        };
        this.todos.push(todo);
        return todo;
    }

    toggle(id: number): boolean {
        const todo = this.todos.find(t => t.id === id);
        if (!todo) return false;
        todo.done = !todo.done;
        return true;
    }

    remove(id: number): boolean {
        const idx = this.todos.findIndex(t => t.id === id);
        if (idx === -1) return false;
        this.todos.splice(idx, 1);
        return true;
    }

    filter(predicate: (t: Todo) => boolean): Todo[] {
        return this.todos.filter(predicate);
    }

    stats() {
        const total = this.todos.length;
        const done  = this.todos.filter(t => t.done).length;
        return { total, done, pending: total - done, pct: total ? Math.round(done / total * 100) : 0 };
    }

    print(): void {
        const icons = { low: '🟢', medium: '🟡', high: '🔴' };
        console.log('\\n=== Todo List ===');
        for (const t of this.todos) {
            const status = t.done ? '✓' : '○';
            console.log(\`  [\${status}] \${icons[t.priority]} #\${t.id} \${t.text}\`);
        }
        const s = this.stats();
        console.log(\`\\nProgress: \${s.done}/\${s.total} (\${s.pct}% complete)\\n\`);
    }
}

// Demo
const mgr = new TodoManager();
mgr.add('Set up SkyForge project', 'high');
mgr.add('Write TypeScript interfaces', 'high');
mgr.add('Add unit tests', 'medium');
mgr.add('Write documentation', 'low');
mgr.add('Deploy to production', 'high');

mgr.toggle(1);
mgr.toggle(2);
mgr.print();

console.log('High priority pending:');
mgr.filter(t => t.priority === 'high' && !t.done)
   .forEach(t => console.log(\`  → \${t.text}\`));
`,
    },
    {
        id: 'ruby-parser',
        name: 'File Parser',
        description: 'Ruby script that parses CSV-like data, transforms it, and generates a report.',
        language: 'ruby',
        iconUrl: `${DEVICON}/ruby/ruby-original.svg`,
        tags: ['Data', 'Parser', 'Report'],
        color: '#CC342D',
        code: `# Ruby Data Parser & Report Generator

RAW_CSV = <<~CSV
  name,department,salary,years
  Alice Johnson,Engineering,95000,5
  Bob Smith,Marketing,72000,3
  Charlie Brown,Engineering,110000,8
  Diana Prince,Design,85000,4
  Eve Wilson,Engineering,98000,6
  Frank Castle,Marketing,68000,2
CSV

# Parse
rows = RAW_CSV.strip.split("\\n").map { |l| l.split(",").map(&:strip) }
headers = rows.shift
records = rows.map { |r| headers.zip(r).to_h }

# Transform
records.each do |r|
  r['salary']  = r['salary'].to_i
  r['years']   = r['years'].to_i
  r['bonus']   = (r['salary'] * (0.05 + r['years'] * 0.01)).round(2)
  r['total']   = r['salary'] + r['bonus']
  r['level']   = r['years'] >= 5 ? 'Senior' : 'Junior'
end

# Group
by_dept = records.group_by { |r| r['department'] }

# Report
puts "=" * 55
puts "  RUBY PAYROLL REPORT"
puts "=" * 55
puts "  Employees : #{records.size}"
avg = records.sum { |r| r['salary'] } / records.size
puts "  Avg salary: $#{avg.to_s.reverse.gsub(/\\d{3}(?=\\d)/, '\\\\0,').reverse}"
puts

by_dept.sort.each do |dept, members|
  dept_avg = members.sum { |m| m['salary'] } / members.size
  puts "  [#{dept}]  #{members.size} employees, avg $#{dept_avg}"
  members.sort_by { |m| -m['total'] }.each do |m|
    puts "    #{m['name'].ljust(16)} #{m['level'].ljust(7)} $#{m['salary']}  +$#{m['bonus']}"
  end
  puts
end
`,
    },
];

const TAG_COLORS: Record<string, string> = {
    API: 'bg-blue-500/20 text-blue-300',
    Server: 'bg-blue-500/20 text-blue-300',
    HTTP: 'bg-blue-500/20 text-blue-300',
    CLI: 'bg-green-500/20 text-green-300',
    Tool: 'bg-green-500/20 text-green-300',
    Utility: 'bg-green-500/20 text-green-300',
    Data: 'bg-yellow-500/20 text-yellow-300',
    ETL: 'bg-yellow-500/20 text-yellow-300',
    Analytics: 'bg-yellow-500/20 text-yellow-300',
    Scraper: 'bg-orange-500/20 text-orange-300',
    Parser: 'bg-orange-500/20 text-orange-300',
    Report: 'bg-orange-500/20 text-orange-300',
    Algorithm: 'bg-purple-500/20 text-purple-300',
    Performance: 'bg-purple-500/20 text-purple-300',
    TypeScript: 'bg-sky-500/20 text-sky-300',
    OOP: 'bg-sky-500/20 text-sky-300',
    Types: 'bg-sky-500/20 text-sky-300',
    Go: 'bg-cyan-500/20 text-cyan-300',
};

export default function TemplatesPage() {
    return (
        <div className="min-h-screen bg-gray-950 text-white">
            {/* Header */}
            <div className="bg-gray-900 border-b border-gray-800 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/" className="text-gray-400 hover:text-white transition-colors text-sm">← Home</Link>
                    <span className="text-gray-700">|</span>
                    <h1 className="text-lg font-bold text-white">Project Templates</h1>
                </div>
                <Link href="/studio" className="text-sm px-4 py-1.5 bg-purple-600 hover:bg-purple-500 rounded-lg transition-colors">
                    Open Studio →
                </Link>
            </div>

            <div className="max-w-6xl mx-auto px-6 py-10">
                <div className="mb-8">
                    <p className="text-gray-400">Start with a real-world template. Click any card to open it in the Studio editor.</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {TEMPLATES.map((t) => (
                        <Link
                            key={t.id}
                            href={`/studio?template=${t.id}`}
                            className="group bg-gray-900 border border-gray-800 rounded-xl p-5 hover:border-gray-600 hover:bg-gray-800/80 transition-all duration-200 flex flex-col gap-3"
                        >
                            {/* Icon + Language */}
                            <div className="flex items-center gap-3">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={t.iconUrl}
                                    alt={t.language}
                                    width={32}
                                    height={32}
                                    className="w-8 h-8 object-contain"
                                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                                />
                                <div>
                                    <div className="font-semibold text-white group-hover:text-purple-300 transition-colors">{t.name}</div>
                                    <div className="text-xs text-gray-500 capitalize">{t.language}</div>
                                </div>
                            </div>

                            {/* Description */}
                            <p className="text-sm text-gray-400 leading-relaxed flex-1">{t.description}</p>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-1.5">
                                {t.tags.map(tag => (
                                    <span key={tag} className={`text-xs px-2 py-0.5 rounded-full font-medium ${TAG_COLORS[tag] || 'bg-gray-700 text-gray-300'}`}>
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            {/* CTA */}
                            <div className="text-xs text-purple-400 group-hover:text-purple-300 font-medium transition-colors">
                                Open in Studio →
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
