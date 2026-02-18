'use client';

import { useMemo } from 'react';

type Language = 'python' | 'node' | 'java' | 'javascript' | 'c' | 'csharp' | 'go' | 'rust' | 'ruby' | 'php' | 'typescript' | 'bash';

interface ComplexityResult {
    time: string;
    space: string;
    timeReason: string;
    spaceReason: string;
    timeColor: string;
    spaceColor: string;
    tips: string[];
}

function analyzeComplexity(code: string, language: Language): ComplexityResult {
    const lines = code.split('\n');
    const joined = code.toLowerCase();

    // --- Time Complexity ---
    let time = 'O(1)';
    let timeReason = 'No loops or recursive calls detected.';
    let timeColor = 'text-green-400';

    // Count loop nesting depth
    let maxNesting = 0;
    let currentNesting = 0;
    const loopPatterns = [
        /\bfor\b/, /\bwhile\b/, /\bforeach\b/, /\.foreach\b/, /\.map\b/, /\.filter\b/, /\.reduce\b/,
    ];
    for (const line of lines) {
        const trimmed = line.trim();
        if (loopPatterns.some(p => p.test(trimmed))) {
            currentNesting++;
            maxNesting = Math.max(maxNesting, currentNesting);
        }
        // Rough dedent detection
        if (/^[}\])]/.test(trimmed) && currentNesting > 0) {
            currentNesting = Math.max(0, currentNesting - 1);
        }
    }

    const hasRecursion = (() => {
        // Look for function definitions followed by a call to the same name
        const fnMatch = code.match(/def (\w+)|function (\w+)|(\w+)\s*\(.*\)\s*{/);
        if (!fnMatch) return false;
        const fnName = fnMatch[1] || fnMatch[2] || fnMatch[3];
        if (!fnName) return false;
        const callCount = (code.match(new RegExp(`\\b${fnName}\\s*\\(`, 'g')) || []).length;
        return callCount >= 2; // defined + called at least once inside
    })();

    const hasSort = /\.sort\b|arrays\.sort|sorted\(|std::sort|\.orderby/i.test(code);
    const hasBinarySearch = /binary.?search|bisect|log.*n|n.*log/i.test(code);
    const hasDivideConquer = /mid\s*=|left.*right|\/\s*2/i.test(code) && hasRecursion;

    if (maxNesting >= 3) {
        time = 'O(n³)';
        timeReason = 'Triple-nested loops detected — cubic time complexity.';
        timeColor = 'text-red-500';
    } else if (maxNesting === 2) {
        time = 'O(n²)';
        timeReason = 'Double-nested loops detected — quadratic time complexity.';
        timeColor = 'text-orange-400';
    } else if (hasSort) {
        time = 'O(n log n)';
        timeReason = 'Sorting operation detected — typical comparison-based sort.';
        timeColor = 'text-yellow-400';
    } else if (hasDivideConquer) {
        time = 'O(log n)';
        timeReason = 'Divide-and-conquer recursion detected (e.g. binary search / merge sort).';
        timeColor = 'text-blue-400';
    } else if (hasBinarySearch) {
        time = 'O(log n)';
        timeReason = 'Binary search or logarithmic pattern detected.';
        timeColor = 'text-blue-400';
    } else if (maxNesting === 1 || hasRecursion) {
        time = 'O(n)';
        timeReason = hasRecursion
            ? 'Recursive function detected — linear recursion depth assumed.'
            : 'Single loop detected — linear time complexity.';
        timeColor = 'text-yellow-300';
    }

    // --- Space Complexity ---
    let space = 'O(1)';
    let spaceReason = 'No significant data structures allocated.';
    let spaceColor = 'text-green-400';

    const has2DArray = /\[\s*\[|\bnew\b.*\[.*\[|list.*list|array.*array/i.test(code);
    const hasArray = /\[\s*\]|\bnew\b.*\[|\blist\b|\barray\b|\bvector\b|\bdict\b|\bmap\b|\bset\b|\bhashmap\b/i.test(code);
    const hasArrayInLoop = hasArray && maxNesting >= 1;

    if (has2DArray) {
        space = 'O(n²)';
        spaceReason = '2D array or matrix structure detected.';
        spaceColor = 'text-orange-400';
    } else if (hasRecursion) {
        space = 'O(n)';
        spaceReason = 'Recursive calls use O(n) call stack space.';
        spaceColor = 'text-yellow-300';
    } else if (hasArrayInLoop) {
        space = 'O(n)';
        spaceReason = 'Data structure allocated inside a loop — grows with input.';
        spaceColor = 'text-yellow-300';
    } else if (hasArray) {
        space = 'O(n)';
        spaceReason = 'Array or collection detected — space grows with input size.';
        spaceColor = 'text-yellow-300';
    }

    // --- Tips ---
    const tips: string[] = [];
    if (maxNesting >= 2) tips.push('Consider reducing nested loops with hash maps for O(n) lookups.');
    if (hasRecursion && !hasDivideConquer) tips.push('Recursive solutions can often be converted to iterative to save stack space.');
    if (hasSort && maxNesting >= 1) tips.push('Sorting inside a loop makes this O(n² log n) — sort once outside if possible.');
    if (time === 'O(1)' && space === 'O(1)') tips.push('Great! This code has optimal constant complexity.');

    return { time, space, timeReason, spaceReason, timeColor, spaceColor, tips };
}

const COMPLEXITY_ORDER = ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)', 'O(n²)', 'O(n³)', 'O(2ⁿ)'];

function ComplexityBar({ label, value, color }: { label: string; value: string; color: string }) {
    const idx = COMPLEXITY_ORDER.indexOf(value);
    const pct = idx === -1 ? 10 : Math.round(((idx + 1) / COMPLEXITY_ORDER.length) * 100);
    const barColor = color.replace('text-', 'bg-').replace('-400', '-500').replace('-300', '-400').replace('-500', '-500');

    return (
        <div className="mb-4">
            <div className="flex justify-between items-center mb-1">
                <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">{label}</span>
                <span className={`text-lg font-bold font-mono ${color}`}>{value}</span>
            </div>
            <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                <div
                    className={`h-full rounded-full transition-all duration-700 ${barColor}`}
                    style={{ width: `${pct}%` }}
                />
            </div>
        </div>
    );
}

interface Props {
    code: string;
    language: Language;
}

export default function ComplexityPanel({ code, language }: Props) {
    const result = useMemo(() => analyzeComplexity(code, language), [code, language]);

    return (
        <div className="h-full flex flex-col bg-gray-900 overflow-auto p-4 gap-4">
            {/* Header */}
            <div className="flex items-center gap-2">
                <span className="text-lg">🧠</span>
                <h3 className="text-sm font-semibold text-gray-200">Complexity Analysis</h3>
                <span className="text-xs text-gray-500 ml-auto">Static analysis</span>
            </div>

            {/* Bars */}
            <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
                <ComplexityBar label="Time Complexity" value={result.time} color={result.timeColor} />
                <ComplexityBar label="Space Complexity" value={result.space} color={result.spaceColor} />
            </div>

            {/* Explanations */}
            <div className="bg-gray-800 rounded-xl p-4 border border-gray-700 space-y-3">
                <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Time — Why?</p>
                    <p className="text-sm text-gray-300">{result.timeReason}</p>
                </div>
                <div className="border-t border-gray-700 pt-3">
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Space — Why?</p>
                    <p className="text-sm text-gray-300">{result.spaceReason}</p>
                </div>
            </div>

            {/* Tips */}
            {result.tips.length > 0 && (
                <div className="bg-blue-950/40 rounded-xl p-4 border border-blue-800/40">
                    <p className="text-xs text-blue-400 uppercase tracking-wider mb-2 font-semibold">💡 Optimization Tips</p>
                    <ul className="space-y-2">
                        {result.tips.map((tip, i) => (
                            <li key={i} className="text-sm text-blue-200 flex gap-2">
                                <span className="text-blue-500 mt-0.5">→</span>
                                <span>{tip}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Big-O Reference */}
            <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50">
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-3 font-semibold">Big-O Reference</p>
                <div className="grid grid-cols-2 gap-1 text-xs font-mono">
                    {[
                        { n: 'O(1)', desc: 'Constant', c: 'text-green-400' },
                        { n: 'O(log n)', desc: 'Logarithmic', c: 'text-blue-400' },
                        { n: 'O(n)', desc: 'Linear', c: 'text-yellow-300' },
                        { n: 'O(n log n)', desc: 'Linearithmic', c: 'text-yellow-400' },
                        { n: 'O(n²)', desc: 'Quadratic', c: 'text-orange-400' },
                        { n: 'O(n³)', desc: 'Cubic', c: 'text-red-500' },
                    ].map(({ n, desc, c }) => (
                        <div key={n} className={`flex gap-1 items-center ${result.time === n ? 'opacity-100' : 'opacity-40'}`}>
                            <span className={`font-bold ${c}`}>{n}</span>
                            <span className="text-gray-500">— {desc}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
