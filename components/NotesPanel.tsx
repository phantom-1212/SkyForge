'use client';

import { useState, useEffect, useCallback } from 'react';

type Language = 'python' | 'node' | 'java' | 'javascript' | 'c' | 'csharp' | 'go' | 'rust' | 'ruby' | 'php' | 'typescript' | 'bash';

interface Props {
    language: Language;
}

function getStorageKey(lang: Language) {
    return `wolfforge-notes-${lang}`;
}

export default function NotesPanel({ language }: Props) {
    const [notes, setNotes] = useState('');
    const [lastSaved, setLastSaved] = useState<Date | null>(null);
    const [copied, setCopied] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const [typingTimer, setTypingTimer] = useState<ReturnType<typeof setTimeout> | null>(null);

    // Load notes for this language
    useEffect(() => {
        const saved = localStorage.getItem(getStorageKey(language));
        setNotes(saved || '');
        setLastSaved(null);
    }, [language]);

    // Auto-save with debounce
    const saveNotes = useCallback((value: string) => {
        localStorage.setItem(getStorageKey(language), value);
        setLastSaved(new Date());
        setIsTyping(false);
    }, [language]);

    const handleChange = (value: string) => {
        setNotes(value);
        setIsTyping(true);
        if (typingTimer) clearTimeout(typingTimer);
        const t = setTimeout(() => saveNotes(value), 800);
        setTypingTimer(t);
    };

    const handleCopy = async () => {
        await navigator.clipboard.writeText(notes);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleClear = () => {
        setNotes('');
        saveNotes('');
    };

    const formatTime = (d: Date) => d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

    const lineCount = notes ? notes.split('\n').length : 0;
    const wordCount = notes.trim() ? notes.trim().split(/\s+/).length : 0;

    return (
        <div className="h-full flex flex-col bg-gray-900">
            {/* Toolbar */}
            <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
                <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold text-gray-200">📝 Notes</span>
                    <span className="text-xs text-gray-500 bg-gray-700 px-2 py-0.5 rounded-full">
                        {language}
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    {notes && (
                        <button
                            onClick={handleClear}
                            className="text-xs text-gray-500 hover:text-red-400 transition-colors px-2 py-1 rounded hover:bg-gray-700"
                        >
                            Clear
                        </button>
                    )}
                    <button
                        onClick={handleCopy}
                        disabled={!notes}
                        className={`text-xs px-3 py-1 rounded-lg transition-all font-medium ${copied
                            ? 'bg-green-600 text-white'
                            : 'bg-gray-700 text-gray-300 hover:bg-gray-600 disabled:opacity-40'
                            }`}
                    >
                        {copied ? '✓ Copied!' : '📋 Copy'}
                    </button>
                </div>
            </div>

            {/* Textarea */}
            <div className={`flex-1 relative transition-all duration-300 ${isTyping ? 'ring-1 ring-inset ring-purple-500/40' : ''}`}>
                <textarea
                    value={notes}
                    onChange={(e) => handleChange(e.target.value)}
                    placeholder={`Write your ${language} notes here...\n\nIdeas, algorithms, edge cases, links — anything goes.\nNotes are saved automatically per language. 💾`}
                    className="w-full h-full bg-gray-900 text-gray-200 text-sm font-mono resize-none p-4 outline-none placeholder-gray-600 leading-relaxed"
                    spellCheck={false}
                />
            </div>

            {/* Footer stats */}
            <div className="flex items-center justify-between px-4 py-2 bg-gray-800/80 border-t border-gray-700 text-xs text-gray-500">
                <div className="flex gap-3">
                    <span>{notes.length} chars</span>
                    <span>·</span>
                    <span>{wordCount} words</span>
                    <span>·</span>
                    <span>{lineCount} lines</span>
                </div>
                <div className="flex items-center gap-1">
                    {isTyping ? (
                        <span className="text-purple-400 animate-pulse">● saving...</span>
                    ) : lastSaved ? (
                        <span className="text-green-500">✓ Saved {formatTime(lastSaved)}</span>
                    ) : notes ? (
                        <span className="text-gray-600">✓ Loaded from storage</span>
                    ) : null}
                </div>
            </div>
        </div>
    );
}
