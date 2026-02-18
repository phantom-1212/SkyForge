'use client';

import Editor from '@monaco-editor/react';
import { useState } from 'react';

interface CodeEditorProps {
    value: string;
    onChange: (value: string) => void;
    language: string;
    filename: string;
    monacoLang: string;
    iconUrl: string;
}

export default function CodeEditor({ value, onChange, filename, monacoLang, iconUrl }: CodeEditorProps) {
    const [theme, setTheme] = useState<'vs-dark' | 'light'>('vs-dark');

    return (
        <div className="h-full w-full flex flex-col">
            {/* Tab bar */}
            <div className="bg-gray-800 px-4 py-2 flex items-center justify-between border-b border-gray-700">
                <div className="flex items-center gap-2">
                    {/* macOS traffic lights */}
                    <div className="flex items-center gap-1.5 group">
                        <button
                            onClick={() => window.history.length > 1 ? window.history.back() : window.close()}
                            title="Close"
                            className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 flex items-center justify-center transition-colors"
                        >
                            <span className="text-red-900 text-[8px] font-bold opacity-0 group-hover:opacity-100 leading-none">✕</span>
                        </button>
                        <button
                            onClick={() => (window as any).resizeTo?.(window.outerWidth, 1)}
                            title="Minimize"
                            className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-400 flex items-center justify-center transition-colors"
                        >
                            <span className="text-yellow-900 text-[8px] font-bold opacity-0 group-hover:opacity-100 leading-none">−</span>
                        </button>
                        <button
                            onClick={() => {
                                if (!document.fullscreenElement) {
                                    document.documentElement.requestFullscreen();
                                } else {
                                    document.exitFullscreen();
                                }
                            }}
                            title="Fullscreen"
                            className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-400 flex items-center justify-center transition-colors"
                        >
                            <span className="text-green-900 text-[8px] font-bold opacity-0 group-hover:opacity-100 leading-none">⤢</span>
                        </button>
                    </div>

                    {/* File tab with language icon */}
                    <div className="ml-3 flex items-center gap-1.5 bg-gray-700/60 px-3 py-1 rounded-md">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={iconUrl}
                            alt=""
                            width={14}
                            height={14}
                            className="w-3.5 h-3.5 object-contain"
                            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                        />
                        <span className="text-sm text-gray-300">{filename}</span>
                    </div>
                </div>

                <button
                    onClick={() => setTheme(theme === 'vs-dark' ? 'light' : 'vs-dark')}
                    className="text-xs px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-gray-400 transition-colors"
                >
                    {theme === 'vs-dark' ? '☀️ Light' : '🌙 Dark'}
                </button>
            </div>

            {/* Monaco Editor */}
            <div className="flex-1">
                <Editor
                    height="100%"
                    language={monacoLang}
                    value={value}
                    onChange={(newValue) => onChange(newValue || '')}
                    theme={theme}
                    options={{
                        minimap: { enabled: false },
                        fontSize: 14,
                        lineNumbers: 'on',
                        roundedSelection: false,
                        scrollBeyondLastLine: false,
                        automaticLayout: true,
                        tabSize: 4,
                    }}
                />
            </div>
        </div>
    );
}
