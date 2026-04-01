import { Link } from 'react-router-dom'

const TOOLS = [
  {
    to: '/q4-refund',
    tag: 'Guest Portal',
    tagColor: 'bg-violet-100 text-violet-700',
    accentBg: 'bg-[#1A2D6E]',
    accentBar: 'from-violet-500 to-[#00B3D7]',
    icon: (
      <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
      </svg>
    ),
    title: 'Guest Refund Request',
    desc: 'Submit a refund request for your booking with supporting documentation. Includes 90-day refund window detection.',
    features: ['File upload support', '90-day window logic', 'Full submission summary'],
  },
  {
    to: '/q5-maintenance',
    tag: 'Staff Tool',
    tagColor: 'bg-[#E8F7FC] text-[#00B3D7]',
    accentBg: 'bg-[#00B3D7]',
    accentBar: 'from-[#00B3D7] to-[#1A2D6E]',
    icon: (
      <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    ),
    title: 'Log Maintenance Issue',
    desc: 'Report a property problem and receive a unique ticket number (MNT-XXXX) for tracking and follow-up.',
    features: ['Auto ticket number', 'Photo upload', 'Urgency classification'],
  },
  {
    to: '/q5-dashboard',
    tag: 'Staff Tool',
    tagColor: 'bg-[#E8F7FC] text-[#00B3D7]',
    accentBg: 'bg-emerald-600',
    accentBar: 'from-[#1A2D6E] to-emerald-500',
    icon: (
      <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    title: 'Maintenance Dashboard',
    desc: 'Live issue tracker with real-time Firestore sync, status management, urgency color-coding, and filters.',
    features: ['Real-time updates', 'Status management', 'Filter & export CSV'],
  },
]

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto">

      {/* Hero */}
      <div className="text-center mb-14 animate-fade-up">
        {/* Logo wordmark */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="relative h-14 w-14">
            <svg viewBox="0 0 56 56" fill="none" className="h-14 w-14">
              <rect width="56" height="56" rx="12" fill="#1A2D6E"/>
              <path d="M10 40 Q28 10 46 40" stroke="#00B3D7" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
            </svg>
          </div>
          <div className="text-left">
            <p className="text-3xl font-extrabold text-[#1A2D6E] tracking-wider leading-none">DELUXE</p>
            <p className="text-sm font-bold tracking-[0.25em] text-[#00B3D7] uppercase mt-1">HOLIDAY HOMES</p>
          </div>
        </div>

        <div className="inline-flex items-center gap-2 rounded-full bg-[#E8F7FC] border border-[#00B3D7]/20
                        px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#00B3D7] mb-5">
          <span className="h-1.5 w-1.5 rounded-full bg-[#00B3D7] animate-pulse" />
          Staff & Guest Portal
        </div>

        <h1 className="text-4xl font-extrabold text-[#1A2D6E] leading-tight mb-3">
          Property Management<br />
          <span className="text-[#00B3D7]">Operations Portal</span>
        </h1>
        <p className="text-slate-500 text-base font-medium max-w-lg mx-auto">
          Centralised tools for guest refund requests and internal maintenance tracking
          across Deluxe Holiday Homes properties.
        </p>
      </div>

      {/* Tool cards */}
      <div className="grid md:grid-cols-3 gap-5">
        {TOOLS.map(({ to, tag, tagColor, accentBg, accentBar, icon, title, desc, features }, i) => (
          <Link
            key={to}
            to={to}
            className="card group hover:shadow-elevated hover:-translate-y-0.5 transition-all duration-200
                       flex flex-col animate-fade-up overflow-hidden !p-0"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            {/* Accent bar */}
            <div className={`h-1 w-full bg-gradient-to-r ${accentBar}`} />
            <div className="p-6 flex flex-col flex-1">
              <div className="flex items-start justify-between mb-4">
                <div className={`h-12 w-12 rounded-xl ${accentBg} flex items-center justify-center shadow-elevated
                                group-hover:scale-110 transition-transform duration-200`}>
                  {icon}
                </div>
                <span className={`badge ${tagColor}`}>{tag}</span>
              </div>
              <h2 className="text-base font-bold text-[#1A2D6E] mb-2 group-hover:text-[#00B3D7] transition-colors">
                {title}
              </h2>
              <p className="text-sm text-slate-500 font-medium mb-4 flex-1">{desc}</p>
              <ul className="space-y-1.5">
                {features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                    <svg className="h-3.5 w-3.5 text-[#00B3D7] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex items-center text-xs font-bold text-[#1A2D6E] group-hover:gap-2 gap-1 transition-all">
                Open
                <svg className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Stack pills */}
      <div className="mt-12 flex flex-wrap items-center justify-center gap-3 animate-fade-in" style={{ animationDelay: '400ms' }}>
        {['React 18', 'Firebase Firestore', 'Firebase Storage', 'Firebase Hosting', 'Tailwind CSS'].map((t) => (
          <span key={t} className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-500 shadow-card">
            {t}
          </span>
        ))}
      </div>

      {/* Footer */}
      <p className="text-center text-xs text-slate-400 mt-8">
        © {new Date().getFullYear()} Deluxe Holiday Homes™ Rental LLC. All Rights Reserved.
      </p>
    </div>
  )
}