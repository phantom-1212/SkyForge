'use client';

import { useState, useEffect, useRef } from 'react';
import ComplexityPanel from './ComplexityPanel';
import NotesPanel from './NotesPanel';

type Language = 'python' | 'node' | 'java' | 'javascript' | 'c' | 'csharp' | 'go' | 'rust' | 'ruby' | 'php' | 'typescript' | 'bash';
type Tab = 'console' | 'complexity' | 'notes';

interface RightPanelProps {
    output: string;
    error: string;
    isRunning: boolean;
    executionTime: number | null;
    code: string;
    language: Language;
}

const TABS: { id: Tab; label: string }[] = [
    { id: 'console', label: 'Console' },
    { id: 'complexity', label: 'Complexity' },
    { id: 'notes', label: 'Notes' },
];

export default function RightPanel({
    output, error, isRunning, executionTime, code, language
}: RightPanelProps) {
    const [activeTab, setActiveTab] = useState<Tab>('console');
    const consoleRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isRunning) setActiveTab('console');
    }, [isRunning]);

    useEffect(() => {
        if (consoleRef.current) {
            consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
        }
    }, [output, error]);

    return (
        <div className="h-full flex flex-col bg-[#0a041a]">
            {/* Tab Bar — no emojis */}
            <div className="flex bg-[#110826] border-b border-white/10">
                {TABS.map((tab) => {
                    const isActive = activeTab === tab.id;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`relative flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium transition-all duration-200 ${isActive ? 'text-white' : 'text-gray-500 hover:text-gray-300'
                                }`}
                        >
                            {tab.label}

                            {tab.id === 'console' && isRunning && (
                                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                            )}

                            {isActive && (
                                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-500 rounded-t-full" />
                            )}
                        </button>
                    );
                })}
            </div>

            {/* Tab Content */}
            <div className="flex-1 overflow-hidden">
                {activeTab === 'console' && (
                    <div ref={consoleRef} className="h-full overflow-auto p-4 font-mono text-sm">
                        {!output && !error && !isRunning && (
                            <div className="flex flex-col items-center justify-center h-full gap-3 text-gray-600">
                                <span className="text-4xl">▶</span>
                                <p className="text-sm">Click <span className="text-gray-400 font-semibold">Run</span> to see output</p>
                            </div>
                        )}

                        {isRunning && (
                            <div className="flex items-center gap-2 text-blue-400 text-sm">
                                <span className="animate-spin">⟳</span>
                                <span>Executing in Docker sandbox...</span>
                            </div>
                        )}

                        {output && (
                            <div>
                                <div className="flex items-center gap-2 mb-2 text-xs text-gray-500 uppercase tracking-wider">
                                    <span className="text-green-500">●</span> stdout
                                    {executionTime !== null && (
                                        <span className="ml-auto text-gray-600">{executionTime}ms</span>
                                    )}
                                </div>
                                <pre className="text-green-400 whitespace-pre-wrap leading-relaxed">{output}</pre>
                            </div>
                        )}

                        {error && (
                            <div className={output ? 'mt-4' : ''}>
                                <div className="flex items-center gap-2 mb-2 text-xs text-gray-500 uppercase tracking-wider">
                                    <span className="text-red-500">●</span> stderr
                                </div>
                                <pre className="text-red-400 whitespace-pre-wrap leading-relaxed">{error}</pre>
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'complexity' && (
                    <ComplexityPanel code={code} language={language} />
                )}

                {activeTab === 'notes' && (
                    <NotesPanel language={language} />
                )}
            </div>
        </div>
    );
}
