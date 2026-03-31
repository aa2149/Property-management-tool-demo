import { Link } from 'react-router-dom'

const TOOLS = [
  {
    to: '/q4-refund',
    tag: 'Q4',
    tagColor: 'bg-violet-100 text-violet-600',
    accentBg: 'bg-violet-600',
    icon: (
      <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
      </svg>
    ),
    title: 'Guest Refund Request',
    desc: 'Submit a booking refund with supporting documentation. Includes 90-day window logic and full submission summary.',
    features: ['File upload', '90-day warning', 'Persistent storage'],
  },
  {
    to: '/q5-maintenance',
    tag: 'Q5',
    tagColor: 'bg-brand-100 text-brand-600',
    accentBg: 'bg-brand-600',
    icon: (
      <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    ),
    title: 'Log Maintenance Issue',
    desc: 'Report a property problem and receive an auto-generated ticket number (MNT-XXXX) for tracking.',
    features: ['Auto ticket number', 'Photo upload', 'Urgency levels'],
  },
  {
    to: '/q5-dashboard',
    tag: 'Q5',
    tagColor: 'bg-brand-100 text-brand-600',
    accentBg: 'bg-emerald-600',
    icon: (
      <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    title: 'Maintenance Dashboard',
    desc: 'View all tickets, update statuses in real-time, filter by property or urgency with live Firestore sync.',
    features: ['Real-time updates', 'Status management', 'Filter & search'],
  },
]

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto">

      {/* Hero */}
      <div className="text-center mb-14 animate-fade-up">
        <div className="inline-flex items-center gap-2 rounded-full bg-brand-50 border border-brand-100
                        px-4 py-1.5 text-xs font-700 uppercase tracking-widest text-brand-600 mb-6">
          <span className="h-1.5 w-1.5 rounded-full bg-brand-600 animate-pulse" />
          AI Systems Developer (Vibe Coder) - Assessment for Deluxe Holiday Homes
        </div>
        <h1 className="text-5xl font-800 text-brand-900 leading-tight mb-4">
          Property Management<br />
          <span className="text-brand-600">Portal</span>
        </h1>
        {/* <p className="text-slate-500 text-base font-500 max-w-lg mx-auto">
          A full-stack React + Firebase app built for the Vibe Coder take-home assessment.
          Two tasks, one deployment.
        </p> */}
      </div>

      {/* Task cards */}
      <div className="grid md:grid-cols-3 gap-5">
        {TOOLS.map(({ to, tag, tagColor, accentBg, icon, title, desc, features }, i) => (
          <Link
            key={to}
            to={to}
            className="card group hover:shadow-elevated hover:-translate-y-0.5 transition-all duration-200
                       flex flex-col animate-fade-up"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`h-12 w-12 rounded-xl ${accentBg} flex items-center justify-center shadow-elevated
                              group-hover:scale-110 transition-transform duration-200`}>
                {icon}
              </div>
              <span className={`badge ${tagColor}`}>{tag}</span>
            </div>

            <h2 className="text-base font-700 text-brand-900 mb-2 group-hover:text-brand-600 transition-colors">
              {title}
            </h2>
            <p className="text-sm text-slate-500 font-500 mb-4 flex-1">{desc}</p>

            <ul className="space-y-1.5">
              {features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-xs font-600 text-slate-500">
                  <svg className="h-3.5 w-3.5 text-emerald-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  {f}
                </li>
              ))}
            </ul>

            <div className="mt-5 flex items-center text-xs font-700 text-brand-600 group-hover:gap-2 gap-1 transition-all">
              Open
              <svg className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
        ))}
      </div>

      {/* Stack badge */}
      <div className="mt-12 flex flex-wrap items-center justify-center gap-3 animate-fade-in" style={{ animationDelay: '400ms' }}>
        {['React 18', 'Firebase Firestore', 'Firebase Storage', 'Firebase Hosting', 'Tailwind CSS', 'Vite'].map((t) => (
          <span key={t} className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-600 text-slate-500 shadow-card">
            {t}
          </span>
        ))}
      </div>
    </div>
  )
}
