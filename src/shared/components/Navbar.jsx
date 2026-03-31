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

const TAG_COLORS = {
  Q4: 'bg-violet-100 text-violet-600',
  Q5: 'bg-brand-100 text-brand-600',
}

export default function Navbar() {
  const { pathname } = useLocation()

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 sm:px-6 h-16">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="h-9 w-9 rounded-xl bg-brand-600 flex items-center justify-center shadow-elevated group-hover:bg-brand-700 transition">
            <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-700 text-brand-900 leading-none">PropManage</p>
            <p className="text-[10px] text-slate-400 font-500 mt-0.5">Property Portal</p>
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
                className={`flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-600 transition-all duration-150
                  ${active
                    ? 'bg-brand-600 text-white shadow-elevated'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-brand-900'
                  }`}
              >
                {icon}
                <span className="hidden sm:inline">{label}</span>
                <span className={`hidden md:inline rounded-md px-1.5 py-0.5 text-[10px] font-700
                  ${active ? 'bg-white/20 text-white' : TAG_COLORS[tag]}`}>
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
