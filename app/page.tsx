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

function IconTerminal() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  );
}

function IconCpu() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m21-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
    </svg>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a041a] text-white relative overflow-hidden bg-grid-pattern overflow-y-auto">
      {/* Centered Atmospheric Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-purple-900/30 to-indigo-900/30 rounded-full blur-[120px] pointer-events-none"></div>
      {/* Animated Background Blobs */}
      <div className="absolute top-0 -left-4 w-96 h-96 bg-purple-900 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute top-0 -right-4 w-96 h-96 bg-indigo-900 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-96 h-96 bg-violet-900 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

      <div className="container mx-auto px-6 py-12 relative z-10">
        <div className="flex flex-col xl:flex-row gap-12 items-start justify-center">

          {/* LEFT SIDEBAR - Tech & Stats (Visible on XL+) */}
          <aside className="hidden xl:flex flex-col gap-6 w-80 sticky top-20">
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10">
              <h4 className="text-sm font-bold text-gray-400 mb-4 uppercase tracking-widest">Platform Stats</h4>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300 text-sm">Scripts Executed</span>
                  <span className="text-purple-400 font-mono font-bold">1.2M+</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300 text-sm">Active Envs</span>
                  <span className="text-blue-400 font-mono font-bold">150k</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300 text-sm">Avg Load Time</span>
                  <span className="text-green-400 font-mono font-bold">42ms</span>
                </div>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10">
              <h4 className="text-sm font-bold text-gray-400 mb-4 uppercase tracking-widest">Ecosystem</h4>
              <div className="grid grid-cols-4 gap-3">
                {['JS', 'PY', 'RS', 'GO', 'TS', 'JV', 'CPP', 'RB'].map((lang) => (
                  <div key={lang} className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-[10px] font-bold hover:bg-purple-500/50 transition-colors cursor-default border border-white/10">
                    {lang}
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-2xl border border-dashed border-white/20 opacity-50">
              <p className="text-xs text-center text-gray-400 italic">"The future of development is serverless and instant."</p>
            </div>
          </aside>

          {/* MAIN CONTENT */}
          <main className="flex-1 max-w-3xl">
            {/* Hero */}
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-3 mb-6 animate-pulse">
                {/* SkyForge wordmark */}
                <svg viewBox="0 0 40 40" fill="none" className="w-16 h-16" xmlns="http://www.w3.org/2000/svg">
                  <rect width="40" height="40" rx="10" fill="url(#sf-grad)" />
                  <path d="M8 28L14 12L20 24L26 12L32 28" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  <defs>
                    <linearGradient id="sf-grad" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#a855f7" />
                      <stop offset="1" stopColor="#3b82f6" />
                    </linearGradient>
                  </defs>
                </svg>
                <h1 className="text-7xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                  SkyForge
                </h1>
              </div>
              <p className="text-2xl text-white font-medium mb-4">Browser-Based Development Platform</p>
              <p className="text-lg text-gray-400 leading-relaxed">
                Create, run, and ship applications directly from the cloud. No downloads, no configuration, just Instant productivity.
              </p>
            </div>

            {/* Mode Cards */}
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              {/* Code Editor */}
              <Link href="/editor" className="group relative bg-[#13131a] rounded-3xl p-8 border border-white/10 hover:border-purple-500/50 transition-all hover:-translate-y-2 block overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 blur-2xl group-hover:bg-purple-500/20 transition-all"></div>
                <div className="text-purple-400 mb-6 group-hover:scale-110 transition-transform">
                  <IconCode />
                </div>
                <h3 className="text-2xl font-bold mb-3 group-hover:text-purple-300">Code Editor</h3>
                <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                  Run scripts instantly in 12 languages. Python, Go, Rust, TypeScript, Java, C, C#, Ruby, PHP, Bash and more.
                </p>
                <div className="flex items-center text-purple-400 font-bold group-hover:gap-2 transition-all">
                  Launch Environment <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                </div>
              </Link>

              {/* Studio */}
              <Link href="/studio" className="group relative bg-[#13131a] rounded-3xl p-8 border border-white/10 hover:border-blue-500/50 transition-all hover:-translate-y-2 block overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-2xl group-hover:bg-blue-500/20 transition-all"></div>
                <div className="text-blue-400 mb-6 group-hover:scale-110 transition-transform">
                  <IconLayers />
                </div>
                <h3 className="text-2xl font-bold mb-3 group-hover:text-blue-300">
                  Studio <span className="text-[10px] bg-blue-500 text-white px-2 py-0.5 rounded-full ml-2 align-middle">NEW</span>
                </h3>
                <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                  Build modern apps with multi-file tabs, live HTML preview, and a code snippets library.
                </p>
                <div className="flex items-center text-blue-400 font-bold group-hover:gap-2 transition-all">
                  Enter Studio <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                </div>
              </Link>
            </div>

            {/* Templates strip */}
            <div className="mb-16">
              <Link href="/templates" className="group relative bg-gradient-to-r from-green-900/40 to-emerald-900/20 backdrop-blur-sm rounded-3xl p-8 border border-green-500/20 hover:border-green-400/50 transition-all block overflow-hidden">
                <div className="flex items-center gap-6">
                  <div className="bg-green-500/20 p-4 rounded-2xl text-green-400 group-hover:scale-110 transition-transform">
                    <IconRocket />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-1">Project Templates <span className="text-[10px] bg-green-500 text-white px-2 py-0.5 rounded-full ml-2 align-middle">NEW</span></h3>
                    <p className="text-green-400/80 text-sm font-medium">Start from 8 real-world templates: REST API, CLI tools, data pipelines, and more.</p>
                  </div>
                  <span className="text-green-400 font-bold group-hover:gap-2 transition-all">Browse →</span>
                </div>
              </Link>
            </div>

            {/* Feature highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-20">
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10 hover:bg-white/[0.08] transition-colors text-center">
                <div className="text-yellow-400 mb-4 flex justify-center"><IconBolt /></div>
                <h4 className="font-bold mb-2">Instant Setup</h4>
                <p className="text-gray-500 text-[10px] uppercase tracking-wider leading-tight">No installation, no environment setup, no dependencies to manage</p>
              </div>
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10 hover:bg-white/[0.08] transition-colors text-center">
                <div className="text-blue-400 mb-4 flex justify-center"><IconShield /></div>
                <h4 className="font-bold mb-2">Secure Execution</h4>
                <p className="text-gray-500 text-[10px] uppercase tracking-wider leading-tight">Isolated Docker containers with strict resource limits</p>
              </div>
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10 hover:bg-white/[0.08] transition-colors text-center">
                <div className="text-pink-400 mb-4 flex justify-center"><IconBook /></div>
                <h4 className="font-bold mb-2">Snippets Library</h4>
                <p className="text-gray-500 text-[10px] uppercase tracking-wider leading-tight">16 ready-to-use snippets: algorithms, patterns, utilities</p>
              </div>
            </div>
          </main>

          {/* RIGHT SIDEBAR - Activity & News (Visible on XL+) */}
          <aside className="hidden xl:flex flex-col gap-6 w-80 sticky top-20">
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10">
              <h4 className="text-sm font-bold text-gray-400 mb-4 uppercase tracking-widest">Live Activity</h4>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-2 h-2 rounded-full bg-green-500 mt-1.5 animate-pulse shrink-0"></div>
                  <div>
                    <p className="text-xs text-gray-300 italic">"Just deployed a React-Vite boilerplate to production."</p>
                    <span className="text-[10px] text-gray-500 mt-1 block">@dev_alpha • 2m ago</span>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 shrink-0"></div>
                  <div>
                    <p className="text-xs text-gray-300 italic">"Running a heavy Rust build for WASM target..."</p>
                    <span className="text-[10px] text-gray-500 mt-1 block">@rustacean • 15m ago</span>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-2 h-2 rounded-full bg-purple-500 mt-1.5 shrink-0"></div>
                  <div>
                    <p className="text-xs text-gray-300 italic">"Piston engine upgraded to v3.12 for Python."</p>
                    <span className="text-[10px] text-gray-500 mt-1 block">SYSTEM • 1h ago</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-2xl p-6 border border-white/10 relative overflow-hidden group">
              <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform">
                <IconZap />
              </div>
              <h4 className="font-bold text-white mb-2">SkyForge Premium</h4>
              <p className="text-xs text-gray-400 mb-4">Unlock unlimited builds, private repos, and GPU acceleration.</p>
              <button className="w-full bg-white text-black text-xs font-bold py-2 rounded-lg hover:bg-gray-200 transition-colors">
                Upgrade Now
              </button>
            </div>

            <div className="flex items-center justify-between px-2">
              <span className="text-xs text-gray-500">Service Status</span>
              <span className="flex items-center gap-1.5 text-[10px] text-green-400 font-bold uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400"></span>
                Operational
              </span>
            </div>
          </aside>

        </div>

        {/* Tech Stack Footer */}
        <div className="mt-8 pt-12 border-t border-white/5 text-center">
          <p className="text-gray-500 text-sm mb-6">Built with the world's most robust technologies</p>
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-6 text-gray-400 text-sm opacity-60">
            <span className="hover:text-white transition-colors cursor-default">Next.js 15</span>
            <span className="hover:text-white transition-colors cursor-default">TypeScript</span>
            <span className="hover:text-white transition-colors cursor-default flex items-center gap-2">
              <IconDocker /> Docker
            </span>
            <span className="hover:text-white transition-colors cursor-default">Judge0</span>
            <span className="hover:text-white transition-colors cursor-default">TailwindCSS</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center py-10 border-t border-white/5 relative z-10 mt-20">
        <p className="text-gray-500 text-sm mb-2">
          Made with <span className="text-red-500 animate-pulse">♥</span> by <span className="text-white font-semibold">Ronit Das</span>
        </p>
        <p className="text-[10px] text-gray-600 uppercase tracking-[0.2em]">© 2026 SkyForge Industries • All Rights Reserved</p>
      </footer>
    </div>
  );
}

function IconZap() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-16 h-16">
      <path d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442a.562.562 0 01.308.976l-4.137 3.597a.562.562 0 00-.19.585l1.1 5.341a.562.562 0 01-.832.605l-4.708-2.825a.562.562 0 00-.563 0l-4.708 2.825a.562.562 0 01-.832-.605l1.1-5.341a.562.562 0 00-.19-.585L1.516 10.42a.562.562 0 01.308-.976l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
    </svg>
  );
}
