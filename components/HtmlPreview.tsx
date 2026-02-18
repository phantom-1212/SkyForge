'use client';

import { useEffect, useRef, useState } from 'react';

interface Props {
    html: string;
}

export default function HtmlPreview({ html }: Props) {
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const [debouncedHtml, setDebouncedHtml] = useState(html);
    const [isRefreshing, setIsRefreshing] = useState(false);

    // Debounce updates by 500ms
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsRefreshing(true);
            setDebouncedHtml(html);
            setTimeout(() => setIsRefreshing(false), 200);
        }, 500);
        return () => clearTimeout(timer);
    }, [html]);

    return (
        <div className="h-full flex flex-col bg-gray-900">
            {/* Preview toolbar */}
            <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
                <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-gray-300">Live Preview</span>
                    {isRefreshing && (
                        <span className="text-xs text-blue-400 animate-pulse">Refreshing...</span>
                    )}
                </div>
                <div className="flex items-center gap-2">
                    {/* Fake browser chrome */}
                    <div className="flex items-center gap-1 bg-gray-700 rounded px-3 py-1 text-xs text-gray-400 font-mono">
                        <span>🌐</span>
                        <span>preview://sandbox</span>
                    </div>
                </div>
            </div>

            {/* iframe */}
            <div className="flex-1 relative bg-white">
                <iframe
                    ref={iframeRef}
                    srcDoc={debouncedHtml}
                    sandbox="allow-scripts"
                    className="w-full h-full border-0"
                    title="HTML Preview"
                />
            </div>
        </div>
    );
}
