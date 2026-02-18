'use client';

import { useEffect, useRef } from 'react';

interface OutputConsoleProps {
    output: string;
    error: string;
    isRunning: boolean;
}

export default function OutputConsole({ output, error, isRunning }: OutputConsoleProps) {
    const consoleRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (consoleRef.current) {
            consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
        }
    }, [output, error]);

    return (
        <div className="h-full flex flex-col bg-gray-900">
            <div className="bg-gray-800 px-4 py-2 border-b border-gray-700">
                <h3 className="text-sm font-semibold text-gray-300 flex items-center gap-2">
                    <span>Console Output</span>
                    {isRunning && (
                        <span className="flex items-center gap-1 text-xs text-blue-400">
                            <span className="animate-pulse">●</span>
                            Running...
                        </span>
                    )}
                </h3>
            </div>
            <div
                ref={consoleRef}
                className="flex-1 overflow-auto p-4 font-mono text-sm"
            >
                {!output && !error && !isRunning && (
                    <div className="text-gray-500 italic">
                        Click "Run Code" to see output here...
                    </div>
                )}

                {output && (
                    <div className="text-green-400 whitespace-pre-wrap mb-2">
                        {output}
                    </div>
                )}

                {error && (
                    <div className="text-red-400 whitespace-pre-wrap">
                        <span className="font-bold">Error:</span>
                        {'\n'}
                        {error}
                    </div>
                )}
            </div>
        </div>
    );
}
