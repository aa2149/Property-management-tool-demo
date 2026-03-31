export default function Watermark() {
  return (
    <div className="fixed bottom-5 right-5 z-50 animate-fade-in" style={{ animationDelay: '0.5s' }}>
      <a
        href="https://github.com/aa2149?tab=repositories"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 rounded-2xl bg-brand-900 pl-3 pr-4 py-2.5
                   shadow-elevated ring-1 ring-white/10
                   hover:bg-brand-800 hover:scale-105 active:scale-100
                   transition-all duration-200 group"
      >
        {/* GitHub icon */}
        <div className="h-7 w-7 rounded-lg bg-white/10 flex items-center justify-center shrink-0
                        group-hover:bg-white/20 transition">
          <svg className="h-4 w-4 text-white" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
          </svg>
        </div>

        <div className="leading-tight">
          <p className="text-xs font-700 text-white tracking-wide">Areej Ahmed</p>
          <p className="text-[10px] text-slate-400 font-500">github.com/aa2149</p>
        </div>

        {/* Arrow */}
        <svg className="h-3.5 w-3.5 text-slate-500 group-hover:text-slate-300 group-hover:translate-x-0.5 transition-all ml-1"
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </a>
    </div>
  )
}
