'use client';

import { useState } from 'react';

interface Snippet {
    name: string;
    description: string;
    language: string;
    code: string;
}

interface Category {
    name: string;
    icon: string;
    snippets: Snippet[];
}

const CATEGORIES: Category[] = [
    {
        name: 'Algorithms',
        icon: '⚡',
        snippets: [
            {
                name: 'Binary Search',
                description: 'O(log n) search in sorted array',
                language: 'python',
                code: `def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1`,
            },
            {
                name: 'Merge Sort',
                description: 'O(n log n) stable sort',
                language: 'python',
                code: `def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    return merge(left, right)

def merge(left, right):
    result = []
    i = j = 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i]); i += 1
        else:
            result.append(right[j]); j += 1
    return result + left[i:] + right[j:]`,
            },
            {
                name: 'BFS Graph',
                description: 'Breadth-first search traversal',
                language: 'python',
                code: `from collections import deque

def bfs(graph, start):
    visited = set()
    queue = deque([start])
    visited.add(start)
    order = []
    while queue:
        node = queue.popleft()
        order.append(node)
        for neighbor in graph.get(node, []):
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)
    return order`,
            },
            {
                name: 'DFS Graph',
                description: 'Depth-first search traversal',
                language: 'python',
                code: `def dfs(graph, start, visited=None):
    if visited is None:
        visited = set()
    visited.add(start)
    result = [start]
    for neighbor in graph.get(start, []):
        if neighbor not in visited:
            result.extend(dfs(graph, neighbor, visited))
    return result`,
            },
        ],
    },
    {
        name: 'Data Structures',
        icon: '🗂️',
        snippets: [
            {
                name: 'Linked List',
                description: 'Singly linked list with append/delete',
                language: 'python',
                code: `class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

class LinkedList:
    def __init__(self):
        self.head = None

    def append(self, data):
        new_node = Node(data)
        if not self.head:
            self.head = new_node
            return
        cur = self.head
        while cur.next:
            cur = cur.next
        cur.next = new_node

    def delete(self, data):
        if not self.head:
            return
        if self.head.data == data:
            self.head = self.head.next
            return
        cur = self.head
        while cur.next:
            if cur.next.data == data:
                cur.next = cur.next.next
                return
            cur = cur.next

    def to_list(self):
        result, cur = [], self.head
        while cur:
            result.append(cur.data)
            cur = cur.next
        return result`,
            },
            {
                name: 'Stack',
                description: 'LIFO stack with push/pop/peek',
                language: 'python',
                code: `class Stack:
    def __init__(self):
        self._data = []

    def push(self, item):
        self._data.append(item)

    def pop(self):
        if self.is_empty():
            raise IndexError("Stack is empty")
        return self._data.pop()

    def peek(self):
        if self.is_empty():
            raise IndexError("Stack is empty")
        return self._data[-1]

    def is_empty(self):
        return len(self._data) == 0

    def size(self):
        return len(self._data)`,
            },
            {
                name: 'Min Heap',
                description: 'Min-heap with insert and extract-min',
                language: 'python',
                code: `class MinHeap:
    def __init__(self):
        self.heap = []

    def push(self, val):
        self.heap.append(val)
        self._sift_up(len(self.heap) - 1)

    def pop(self):
        if not self.heap:
            return None
        self.heap[0], self.heap[-1] = self.heap[-1], self.heap[0]
        val = self.heap.pop()
        self._sift_down(0)
        return val

    def _sift_up(self, i):
        while i > 0:
            parent = (i - 1) // 2
            if self.heap[parent] > self.heap[i]:
                self.heap[parent], self.heap[i] = self.heap[i], self.heap[parent]
                i = parent
            else:
                break

    def _sift_down(self, i):
        n = len(self.heap)
        while True:
            smallest = i
            for child in [2*i+1, 2*i+2]:
                if child < n and self.heap[child] < self.heap[smallest]:
                    smallest = child
            if smallest == i:
                break
            self.heap[i], self.heap[smallest] = self.heap[smallest], self.heap[i]
            i = smallest`,
            },
            {
                name: 'LRU Cache',
                description: 'O(1) LRU cache with OrderedDict',
                language: 'python',
                code: `from collections import OrderedDict

class LRUCache:
    def __init__(self, capacity: int):
        self.capacity = capacity
        self.cache = OrderedDict()

    def get(self, key: int) -> int:
        if key not in self.cache:
            return -1
        self.cache.move_to_end(key)
        return self.cache[key]

    def put(self, key: int, value: int) -> None:
        if key in self.cache:
            self.cache.move_to_end(key)
        self.cache[key] = value
        if len(self.cache) > self.capacity:
            self.cache.popitem(last=False)`,
            },
        ],
    },
    {
        name: 'Patterns',
        icon: '🏗️',
        snippets: [
            {
                name: 'Singleton',
                description: 'Singleton pattern with thread safety',
                language: 'python',
                code: `class Singleton:
    _instance = None

    def __new__(cls, *args, **kwargs):
        if not cls._instance:
            cls._instance = super().__new__(cls)
        return cls._instance

    def __init__(self, value=None):
        if not hasattr(self, '_initialized'):
            self.value = value
            self._initialized = True`,
            },
            {
                name: 'Observer',
                description: 'Pub/sub observer pattern',
                language: 'python',
                code: `class EventEmitter:
    def __init__(self):
        self._listeners = {}

    def on(self, event, callback):
        self._listeners.setdefault(event, []).append(callback)
        return self

    def off(self, event, callback):
        if event in self._listeners:
            self._listeners[event].remove(callback)

    def emit(self, event, *args, **kwargs):
        for cb in self._listeners.get(event, []):
            cb(*args, **kwargs)`,
            },
            {
                name: 'Decorator',
                description: 'Function decorator with wraps',
                language: 'python',
                code: `import functools
import time

def timer(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        start = time.perf_counter()
        result = func(*args, **kwargs)
        elapsed = time.perf_counter() - start
        print(f"{func.__name__} took {elapsed:.4f}s")
        return result
    return wrapper

def retry(max_attempts=3, delay=1.0):
    def decorator(func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            for attempt in range(max_attempts):
                try:
                    return func(*args, **kwargs)
                except Exception as e:
                    if attempt == max_attempts - 1:
                        raise
                    time.sleep(delay)
        return wrapper
    return decorator`,
            },
            {
                name: 'Factory',
                description: 'Factory method pattern',
                language: 'python',
                code: `from abc import ABC, abstractmethod

class Animal(ABC):
    @abstractmethod
    def speak(self) -> str:
        pass

class Dog(Animal):
    def speak(self): return "Woof!"

class Cat(Animal):
    def speak(self): return "Meow!"

class Bird(Animal):
    def speak(self): return "Tweet!"

class AnimalFactory:
    _registry = {'dog': Dog, 'cat': Cat, 'bird': Bird}

    @classmethod
    def create(cls, animal_type: str) -> Animal:
        klass = cls._registry.get(animal_type.lower())
        if not klass:
            raise ValueError(f"Unknown animal: {animal_type}")
        return klass()

    @classmethod
    def register(cls, name: str, klass):
        cls._registry[name] = klass`,
            },
        ],
    },
    {
        name: 'Utilities',
        icon: '🔧',
        snippets: [
            {
                name: 'Retry with Backoff',
                description: 'Exponential backoff retry logic',
                language: 'python',
                code: `import time
import random

def retry_with_backoff(func, max_retries=5, base_delay=1.0, jitter=True):
    for attempt in range(max_retries):
        try:
            return func()
        except Exception as e:
            if attempt == max_retries - 1:
                raise
            delay = base_delay * (2 ** attempt)
            if jitter:
                delay *= (0.5 + random.random())
            print(f"Attempt {attempt+1} failed: {e}. Retrying in {delay:.2f}s...")
            time.sleep(delay)`,
            },
            {
                name: 'Chunked Iterator',
                description: 'Split iterable into fixed-size chunks',
                language: 'python',
                code: `def chunks(iterable, size):
    """Split iterable into chunks of given size."""
    it = iter(iterable)
    while True:
        chunk = []
        try:
            for _ in range(size):
                chunk.append(next(it))
            yield chunk
        except StopIteration:
            if chunk:
                yield chunk
            break

# Usage:
# for batch in chunks(range(100), 10):
#     process(batch)`,
            },
            {
                name: 'Memoize',
                description: 'Generic memoization decorator',
                language: 'python',
                code: `import functools

def memoize(func):
    cache = {}
    @functools.wraps(func)
    def wrapper(*args):
        if args not in cache:
            cache[args] = func(*args)
        return cache[args]
    wrapper.cache = cache
    wrapper.clear = cache.clear
    return wrapper

@memoize
def fib(n):
    if n < 2: return n
    return fib(n-1) + fib(n-2)`,
            },
            {
                name: 'Rate Limiter',
                description: 'Token bucket rate limiter',
                language: 'python',
                code: `import time

class RateLimiter:
    def __init__(self, rate: float, capacity: float):
        self.rate = rate          # tokens per second
        self.capacity = capacity  # max tokens
        self.tokens = capacity
        self.last_refill = time.monotonic()

    def _refill(self):
        now = time.monotonic()
        elapsed = now - self.last_refill
        self.tokens = min(self.capacity, self.tokens + elapsed * self.rate)
        self.last_refill = now

    def acquire(self, tokens=1) -> bool:
        self._refill()
        if self.tokens >= tokens:
            self.tokens -= tokens
            return True
        return False

    def wait(self, tokens=1):
        while not self.acquire(tokens):
            time.sleep(0.01)`,
            },
        ],
    },
];

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onInsert: (code: string) => void;
}

export default function SnippetsDrawer({ isOpen, onClose, onInsert }: Props) {
    const [activeCategory, setActiveCategory] = useState(0);
    const [search, setSearch] = useState('');
    const [copied, setCopied] = useState<string | null>(null);

    const filtered = CATEGORIES[activeCategory].snippets.filter(s =>
        !search || s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.description.toLowerCase().includes(search.toLowerCase())
    );

    const handleInsert = (snippet: Snippet) => {
        onInsert(snippet.code);
        setCopied(snippet.name);
        setTimeout(() => setCopied(null), 1500);
    };

    return (
        <>
            {/* Backdrop */}
            {isOpen && (
                <div className="fixed inset-0 bg-black/40 z-40" onClick={onClose} />
            )}

            {/* Drawer */}
            <div className={`fixed left-0 top-0 h-full w-80 bg-gray-900 border-r border-gray-700 z-50 flex flex-col transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                {/* Header */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-gray-700">
                    <h2 className="font-semibold text-white text-sm">Code Snippets</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white text-lg leading-none">✕</button>
                </div>

                {/* Search */}
                <div className="px-3 py-2 border-b border-gray-800">
                    <input
                        type="text"
                        placeholder="Search snippets..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="w-full bg-gray-800 text-sm text-white px-3 py-1.5 rounded-lg border border-gray-700 focus:outline-none focus:border-purple-500 placeholder-gray-500"
                    />
                </div>

                {/* Category tabs */}
                <div className="flex border-b border-gray-800 overflow-x-auto">
                    {CATEGORIES.map((cat, i) => (
                        <button
                            key={cat.name}
                            onClick={() => { setActiveCategory(i); setSearch(''); }}
                            className={`flex items-center gap-1 px-3 py-2 text-xs font-medium whitespace-nowrap transition-colors ${activeCategory === i ? 'text-white border-b-2 border-purple-500' : 'text-gray-500 hover:text-gray-300'}`}
                        >
                            <span>{cat.icon}</span>
                            <span>{cat.name}</span>
                        </button>
                    ))}
                </div>

                {/* Snippets list */}
                <div className="flex-1 overflow-y-auto p-3 space-y-2">
                    {filtered.map((snippet) => (
                        <div key={snippet.name} className="bg-gray-800 rounded-lg p-3 border border-gray-700 hover:border-gray-600 transition-colors">
                            <div className="flex items-start justify-between gap-2 mb-1">
                                <div>
                                    <div className="text-sm font-medium text-white">{snippet.name}</div>
                                    <div className="text-xs text-gray-400 mt-0.5">{snippet.description}</div>
                                </div>
                            </div>
                            {/* Code preview */}
                            <pre className="text-xs text-gray-500 bg-gray-900 rounded p-2 mt-2 overflow-hidden max-h-20 font-mono leading-relaxed">
                                {snippet.code.split('\n').slice(0, 4).join('\n')}
                                {snippet.code.split('\n').length > 4 ? '\n...' : ''}
                            </pre>
                            <button
                                onClick={() => handleInsert(snippet)}
                                className={`mt-2 w-full text-xs py-1.5 rounded-md font-medium transition-all ${copied === snippet.name ? 'bg-green-600 text-white' : 'bg-purple-600/30 text-purple-300 hover:bg-purple-600 hover:text-white'}`}
                            >
                                {copied === snippet.name ? '✓ Inserted!' : '+ Insert at cursor'}
                            </button>
                        </div>
                    ))}
                    {filtered.length === 0 && (
                        <div className="text-center text-gray-600 text-sm py-8">No snippets match your search</div>
                    )}
                </div>
            </div>
        </>
    );
}
