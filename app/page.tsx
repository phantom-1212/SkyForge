import Link from 'next/link';

// Real SVG icon components using inline SVGs (no emoji)
function IconBolt() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
    </svg>
  );
}

function IconDocker() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
      <path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.185.185.186m-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.185.185.186m-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.887c0 .102.084.185.186.186m5.893 2.715h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.184-.186h-2.12a.186.186 0 00-.186.185v1.888c0 .102.084.185.186.185m-2.92 0h2.12a.186.186 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185M23.763 9.89c-.065-.051-.672-.51-1.954-.51-.338.001-.676.03-1.01.087-.248-1.7-1.653-2.53-1.716-2.566l-.344-.199-.226.327c-.284.438-.49.922-.612 1.43-.23.97-.09 1.882.403 2.661-.595.332-1.55.413-1.744.42H.751a.751.751 0 00-.75.748 11.376 11.376 0 00.692 4.062c.545 1.428 1.355 2.48 2.41 3.124 1.18.723 3.1 1.137 5.275 1.137.983.003 1.963-.086 2.93-.266a12.248 12.248 0 003.823-1.389c.98-.567 1.86-1.288 2.61-2.136 1.252-1.418 1.998-2.997 2.553-4.4h.221c1.372 0 2.215-.549 2.68-1.009.309-.293.55-.65.707-1.046l.098-.288z" />
    </svg>
  );
}

function IconCode() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
    </svg>
  );
}

function IconLayers() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3" />
    </svg>
  );
}

function IconShield() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
    </svg>
  );
}

function IconGlobe() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
    </svg>
  );
}

function IconBook() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
    </svg>
  );
}

function IconRocket() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
    </svg>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 text-white">
      <div className="container mx-auto px-6 py-20">
        {/* Hero */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            {/* SkyForge wordmark */}
            <svg viewBox="0 0 40 40" fill="none" className="w-14 h-14" xmlns="http://www.w3.org/2000/svg">
              <rect width="40" height="40" rx="10" fill="url(#sf-grad)" />
              <path d="M8 28L14 12L20 24L26 12L32 28" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              <defs>
                <linearGradient id="sf-grad" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#a855f7" />
                  <stop offset="1" stopColor="#3b82f6" />
                </linearGradient>
              </defs>
            </svg>
            <h1 className="text-7xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              SkyForge
            </h1>
          </div>
          <p className="text-2xl text-gray-300 mb-4">Browser-Based Development Platform</p>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Create, run, and ship applications directly from the cloud. No downloads, no configuration, just instant productivity.
          </p>
        </div>

        {/* Mode Cards */}
        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-16">
          {/* Code Editor */}
          <Link href="/editor" className="group bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:border-purple-400 transition-all hover:shadow-2xl hover:shadow-purple-500/50 block">
            <div className="text-purple-400 mb-4 group-hover:text-purple-300 transition-colors">
              <IconCode />
            </div>
            <h3 className="text-xl font-bold mb-2 group-hover:text-purple-300 transition-colors">Code Editor</h3>
            <p className="text-gray-300 text-sm mb-4">
              Run scripts instantly in 12 languages. Python, Go, Rust, TypeScript, Java, C, C#, Ruby, PHP, Bash and more.
            </p>
            <span className="text-purple-400 text-sm font-medium group-hover:text-purple-300">Open Editor →</span>
          </Link>

          {/* Studio */}
          <Link href="/studio" className="group bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:border-blue-400 transition-all hover:shadow-2xl hover:shadow-blue-500/50 block">
            <div className="text-blue-400 mb-4 group-hover:text-blue-300 transition-colors">
              <IconLayers />
            </div>
            <h3 className="text-xl font-bold mb-2 group-hover:text-blue-300 transition-colors">
              Studio
              <span className="text-xs bg-blue-500/30 text-blue-300 px-2 py-0.5 rounded-full ml-2">NEW</span>
            </h3>
            <p className="text-gray-300 text-sm mb-4">
              Build modern apps with multi-file tabs, live HTML preview, and a code snippets library.
            </p>
            <span className="text-blue-400 text-sm font-medium group-hover:text-blue-300">Open Studio →</span>
          </Link>
        </div>

        {/* Templates strip */}
        <div className="max-w-3xl mx-auto mb-16">
          <Link href="/templates" className="group bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-green-400 transition-all hover:shadow-2xl hover:shadow-green-500/30 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="text-green-400 group-hover:text-green-300 transition-colors">
                <IconRocket />
              </div>
              <div>
                <h3 className="text-lg font-bold group-hover:text-green-300 transition-colors">
                  Project Templates
                  <span className="text-xs bg-green-500/30 text-green-300 px-2 py-0.5 rounded-full ml-2">NEW</span>
                </h3>
                <p className="text-gray-400 text-sm">Start from 8 real-world templates: REST API, CLI tools, data pipelines, and more.</p>
              </div>
            </div>
            <span className="text-green-400 text-sm font-medium group-hover:text-green-300 flex-shrink-0">Browse →</span>
          </Link>
        </div>

        {/* Feature highlights */}
        <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto mb-16">
          <div className="bg-white/5 rounded-xl p-5 border border-white/10 text-center">
            <div className="flex justify-center mb-3 text-yellow-400"><IconBolt /></div>
            <h4 className="font-semibold mb-1 text-sm">Instant Setup</h4>
            <p className="text-gray-400 text-xs">No installation, no environment setup, no dependencies to manage.</p>
          </div>
          <div className="bg-white/5 rounded-xl p-5 border border-white/10 text-center">
            <div className="flex justify-center mb-3 text-cyan-400"><IconShield /></div>
            <h4 className="font-semibold mb-1 text-sm">Secure Execution</h4>
            <p className="text-gray-400 text-xs">Isolated Docker containers with strict resource limits.</p>
          </div>
          <div className="bg-white/5 rounded-xl p-5 border border-white/10 text-center">
            <div className="flex justify-center mb-3 text-pink-400"><IconBook /></div>
            <h4 className="font-semibold mb-1 text-sm">Snippets Library</h4>
            <p className="text-gray-400 text-xs">16 ready-to-use snippets: algorithms, patterns, utilities.</p>
          </div>
        </div>

        {/* Tech Stack */}
        <div className="text-center">
          <p className="text-gray-500 text-sm mb-4">Powered by</p>
          <div className="flex justify-center gap-8 text-gray-400 text-sm">
            <span>Next.js</span><span>•</span>
            <span>Monaco Editor</span><span>•</span>
            <span className="flex items-center gap-1">
              <IconDocker />
              Docker
            </span>
            <span>•</span>
            <span>Express</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center py-6 border-t border-white/10">
        <p className="text-gray-500 text-sm">
          Made with <span className="text-red-400">♥</span> by <span className="text-white font-medium">Ronit Das</span>
        </p>
      </div>
    </div>
  );
}
