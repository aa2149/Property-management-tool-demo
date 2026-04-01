import { Link, useLocation } from 'react-router-dom'

const NAV_LINKS = [
  {
    to: '/q4-refund',
    label: 'Refund Request',
    tag: 'Q4',
    icon: (
      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
      </svg>
    ),
  },
  {
    to: '/q5-maintenance',
    label: 'Log Issue',
    tag: 'Q5',
    icon: (
      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
      </svg>
    ),
  },
  {
    to: '/q5-dashboard',
    label: 'Dashboard',
    tag: 'Q5',
    icon: (
      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
]

export default function Navbar() {
  const { pathname } = useLocation()

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 sm:px-6 h-16">

        {/* Logo — Deluxe Holiday Homes */}
        <Link to="/" className="flex items-center gap-3 group shrink-0">
          {/* DHH Arc Logo mark */}
          <div className="relative h-9 w-9 shrink-0">
            <svg viewBox="0 0 36 36" fill="none" className="h-9 w-9">
              <rect width="36" height="36" rx="8" fill="#1A2D6E"/>
              {/* Arc */}
              <path d="M7 26 Q18 6 29 26" stroke="#00B3D7" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
              {/* D letter */}
              <text x="11" y="28" fontFamily="Arial" fontWeight="800" fontSize="13" fill="white">D</text>
            </svg>
          </div>
          <div className="hidden sm:block leading-tight">
            <p className="text-sm font-extrabold text-[#1A2D6E] tracking-wide leading-none">DELUXE</p>
            <p className="text-[9px] font-bold tracking-[0.2em] text-[#00B3D7] uppercase mt-0.5">Holiday Homes</p>
          </div>
        </Link>

        {/* Nav links */}
        <nav className="flex items-center gap-1">
          {NAV_LINKS.map(({ to, label, tag, icon }) => {
            const active = pathname === to
            return (
              <Link
                key={to}
                to={to}
                className={`flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold transition-all duration-150
                  ${active
                    ? 'bg-[#1A2D6E] text-white shadow-elevated'
                    : 'text-slate-600 hover:bg-[#E8F7FC] hover:text-[#1A2D6E]'
                  }`}
              >
                {icon}
                <span className="hidden sm:inline">{label}</span>
                <span className={`hidden md:inline rounded-md px-1.5 py-0.5 text-[10px] font-bold
                  ${active
                    ? 'bg-white/20 text-white'
                    : 'bg-[#E8F7FC] text-[#00B3D7]'
                  }`}
                >
                  {tag}
                </span>
              </Link>
            )
          })}
        </nav>
      </div>
    </header>
  )
}