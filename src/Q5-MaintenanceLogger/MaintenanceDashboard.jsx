// import { useState, useEffect } from 'react'
// import { collection, query, orderBy, onSnapshot, doc, updateDoc } from 'firebase/firestore'
// import { db } from '../firebase'
// import { Link } from 'react-router-dom'

// const PROPERTIES = ['All Properties', 'Palm View Villa', 'Marina Bay Suite', 'Downtown Loft 4B', 'Sunset Heights 12', 'Garden Terrace A']
// const URGENCIES  = ['All Urgencies', 'Low', 'Medium', 'High']
// const STATUSES   = ['Open', 'In Progress', 'Resolved']

// const URGENCY_CONFIG = {
//   Low:    { badge: 'bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200', dot: 'bg-emerald-400' },
//   Medium: { badge: 'bg-amber-100 text-amber-700 ring-1 ring-amber-200',       dot: 'bg-amber-400'   },
//   High:   { badge: 'bg-red-100 text-red-600 ring-1 ring-red-200',             dot: 'bg-red-500'     },
// }

// const STATUS_CONFIG = {
//   'Open':        { select: 'bg-blue-50 text-blue-700 border-blue-200',    dot: 'bg-blue-500'    },
//   'In Progress': { select: 'bg-amber-50 text-amber-700 border-amber-200', dot: 'bg-amber-400'   },
//   'Resolved':    { select: 'bg-emerald-50 text-emerald-700 border-emerald-200', dot: 'bg-emerald-500' },
// }

// function formatDate(ts) {
//   if (!ts) return '—'
//   const d = ts.toDate ? ts.toDate() : new Date(ts)
//   return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
// }

// export default function MaintenanceDashboard() {
//   const [issues, setIssues]           = useState([])
//   const [loading, setLoading]         = useState(true)
//   const [filterProp, setFilterProp]   = useState('All Properties')
//   const [filterUrg, setFilterUrg]     = useState('All Urgencies')
//   const [updatingId, setUpdatingId]   = useState(null)

//   useEffect(() => {
//     const q = query(collection(db, 'maintenanceIssues'), orderBy('submittedAt', 'desc'))
//     return onSnapshot(q, snap => {
//       setIssues(snap.docs.map(d => ({ id: d.id, ...d.data() })))
//       setLoading(false)
//     })
//   }, [])

//   const handleStatus = async (id, status) => {
//     setUpdatingId(id)
//     try { await updateDoc(doc(db, 'maintenanceIssues', id), { status }) }
//     catch (e) { console.error(e); alert('Failed to update status.') }
//     finally   { setUpdatingId(null) }
//   }

//   const filtered = issues.filter(i =>
//     (filterProp === 'All Properties' || i.property === filterProp) &&
//     (filterUrg  === 'All Urgencies'  || i.urgency  === filterUrg)
//   )

//   const stats = {
//     total:      issues.length,
//     open:       issues.filter(i => i.status === 'Open').length,
//     inProgress: issues.filter(i => i.status === 'In Progress').length,
//     resolved:   issues.filter(i => i.status === 'Resolved').length,
//   }

//   const clearFilters = () => { setFilterProp('All Properties'); setFilterUrg('All Urgencies') }
//   const hasFilters   = filterProp !== 'All Properties' || filterUrg !== 'All Urgencies'

//   return (
//     <div>
//       {/* Header */}
//       <div className="flex flex-wrap items-start justify-between gap-4 mb-8 animate-fade-up">
//         <div>
//           <div className="page-eyebrow">
//             <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
//               <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
//             </svg>
//             Q5 — Maintenance Dashboard
//           </div>
//           <h1 className="page-title">Issue Tracker</h1>
//           <p className="page-subtitle">
//             {loading ? 'Loading…' : `${issues.length} total issue${issues.length !== 1 ? 's' : ''} · Live updates`}
//           </p>
//         </div>
//         <Link to="/q5-maintenance" className="btn-primary">
//           <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
//             <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
//           </svg>
//           Log Issue
//         </Link>
//       </div>

//       {/* Stats */}
//       <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6 animate-fade-up" style={{ animationDelay: '60ms' }}>
//         {[
//           { label: 'Total Issues',  value: stats.total,      color: 'text-brand-900',    bg: 'bg-white' },
//           { label: 'Open',          value: stats.open,       color: 'text-blue-600',     bg: 'bg-blue-50' },
//           { label: 'In Progress',   value: stats.inProgress, color: 'text-amber-600',    bg: 'bg-amber-50' },
//           { label: 'Resolved',      value: stats.resolved,   color: 'text-emerald-600',  bg: 'bg-emerald-50' },
//         ].map(({ label, value, color, bg }) => (
//           <div key={label} className={`rounded-2xl border border-slate-100 ${bg} shadow-card px-5 py-4`}>
//             <p className={`text-3xl font-800 ${color}`}>{value}</p>
//             <p className="text-xs font-600 text-slate-500 mt-1">{label}</p>
//           </div>
//         ))}
//       </div>

//       {/* Filters */}
//       <div className="card py-4 mb-4 animate-fade-up" style={{ animationDelay: '120ms' }}>
//         <div className="flex flex-wrap items-center gap-3">
//           <div className="flex items-center gap-2 text-xs font-700 uppercase tracking-wider text-slate-400">
//             <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
//               <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707l-6.414 6.414A1 1 0 0014 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 018 21v-7.586a1 1 0 00-.293-.707L1.293 6.707A1 1 0 011 6V4z" />
//             </svg>
//             Filter
//           </div>
//           <select value={filterProp} onChange={e => setFilterProp(e.target.value)}
//             className="field-input !py-2 !w-auto text-sm font-500">
//             {PROPERTIES.map(p => <option key={p} value={p}>{p}</option>)}
//           </select>
//           <select value={filterUrg} onChange={e => setFilterUrg(e.target.value)}
//             className="field-input !py-2 !w-auto text-sm font-500">
//             {URGENCIES.map(u => <option key={u} value={u}>{u}</option>)}
//           </select>
//           {hasFilters && (
//             <button onClick={clearFilters}
//               className="text-xs font-600 text-brand-600 hover:text-brand-800 transition underline">
//               Clear filters
//             </button>
//           )}
//           {hasFilters && (
//             <span className="ml-auto text-xs text-slate-400 font-500">
//               Showing {filtered.length} of {issues.length}
//             </span>
//           )}
//         </div>
//       </div>

//       {/* Table */}
//       {loading ? (
//         <div className="card text-center py-20 animate-fade-in">
//           <svg className="h-8 w-8 text-brand-200 animate-spin mx-auto mb-3" fill="none" viewBox="0 0 24 24">
//             <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
//             <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
//           </svg>
//           <p className="text-sm text-slate-400 font-500">Loading issues…</p>
//         </div>
//       ) : filtered.length === 0 ? (
//         <div className="card text-center py-20 animate-fade-in">
//           <div className="h-14 w-14 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-4">
//             <svg className="h-7 w-7 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
//             </svg>
//           </div>
//           <p className="text-base font-700 text-slate-600 mb-1">No issues found</p>
//           <p className="text-sm text-slate-400">
//             {issues.length === 0 ? 'No maintenance issues logged yet.' : 'Try adjusting your filters.'}
//           </p>
//           {issues.length === 0 && (
//             <Link to="/q5-maintenance" className="btn-primary mt-5 inline-flex">Log First Issue</Link>
//           )}
//         </div>
//       ) : (
//         <>
//           {/* Desktop table */}
//           <div className="hidden md:block card overflow-hidden !p-0 animate-fade-up" style={{ animationDelay: '160ms' }}>
//             <table className="w-full text-sm">
//               <thead>
//                 <tr className="border-b border-slate-100 bg-slate-50/80">
//                   {['Ticket #', 'Property', 'Category', 'Urgency', 'Date Submitted', 'Status'].map(h => (
//                     <th key={h} className="px-5 py-3.5 text-left text-[10px] font-700 uppercase tracking-widest text-slate-400">
//                       {h}
//                     </th>
//                   ))}
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-slate-50">
//                 {filtered.map(issue => (
//                   <tr key={issue.id} className="hover:bg-slate-50/60 transition-colors">
//                     {/* Ticket */}
//                     <td className="px-5 py-4">
//                       <span className="font-mono text-xs font-700 text-brand-600 bg-brand-50 rounded-lg px-2 py-1">
//                         {issue.ticketNumber}
//                       </span>
//                     </td>
//                     {/* Property */}
//                     <td className="px-5 py-4 max-w-[160px]">
//                       <span className="block truncate text-slate-700 font-500">{issue.property}</span>
//                     </td>
//                     {/* Category */}
//                     <td className="px-5 py-4 text-slate-600 font-500">{issue.category}</td>
//                     {/* Urgency */}
//                     <td className="px-5 py-4">
//                       <span className={`badge ${URGENCY_CONFIG[issue.urgency]?.badge}`}>
//                         <span className={`h-1.5 w-1.5 rounded-full ${URGENCY_CONFIG[issue.urgency]?.dot}`} />
//                         {issue.urgency}
//                       </span>
//                     </td>
//                     {/* Date */}
//                     <td className="px-5 py-4 text-slate-500 font-500 whitespace-nowrap text-xs">
//                       {formatDate(issue.submittedAt)}
//                     </td>
//                     {/* Status */}
//                     <td className="px-5 py-4">
//                       <div className="flex items-center gap-2">
//                         <select
//                           value={issue.status}
//                           onChange={e => handleStatus(issue.id, e.target.value)}
//                           disabled={updatingId === issue.id}
//                           className={`rounded-xl border px-3 py-1.5 text-xs font-700 cursor-pointer
//                             focus:outline-none focus:ring-2 focus:ring-brand-200
//                             disabled:opacity-50 transition-all
//                             ${STATUS_CONFIG[issue.status]?.select}`}
//                         >
//                           {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
//                         </select>
//                         {updatingId === issue.id && (
//                           <svg className="h-3.5 w-3.5 text-slate-300 animate-spin" fill="none" viewBox="0 0 24 24">
//                             <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
//                             <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
//                           </svg>
//                         )}
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           {/* Mobile cards */}
//           <div className="md:hidden space-y-3 animate-fade-up">
//             {filtered.map(issue => (
//               <div key={issue.id} className="card">
//                 <div className="flex items-start justify-between mb-3">
//                   <span className="font-mono text-sm font-700 text-brand-600 bg-brand-50 rounded-lg px-2 py-1">
//                     {issue.ticketNumber}
//                   </span>
//                   <span className={`badge ${URGENCY_CONFIG[issue.urgency]?.badge}`}>
//                     <span className={`h-1.5 w-1.5 rounded-full ${URGENCY_CONFIG[issue.urgency]?.dot}`} />
//                     {issue.urgency}
//                   </span>
//                 </div>
//                 <div className="space-y-2 mb-4">
//                   {[
//                     ['Property',  issue.property],
//                     ['Category',  issue.category],
//                     ['Submitted', formatDate(issue.submittedAt)],
//                     ['Issue',     issue.description],
//                   ].map(([label, value]) => (
//                     <div key={label} className="flex gap-3 text-xs">
//                       <span className="text-slate-400 font-600 w-20 shrink-0">{label}</span>
//                       <span className="text-slate-700 font-500 line-clamp-2">{value}</span>
//                     </div>
//                   ))}
//                 </div>
//                 <div className="flex items-center gap-2 pt-3 border-t border-slate-100">
//                   <span className="text-xs font-600 text-slate-400">Status</span>
//                   <select
//                     value={issue.status}
//                     onChange={e => handleStatus(issue.id, e.target.value)}
//                     disabled={updatingId === issue.id}
//                     className={`rounded-xl border px-3 py-1.5 text-xs font-700 cursor-pointer
//                       focus:outline-none disabled:opacity-50 ${STATUS_CONFIG[issue.status]?.select}`}
//                   >
//                     {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
//                   </select>
//                   {updatingId === issue.id && (
//                     <svg className="h-3.5 w-3.5 text-slate-300 animate-spin" fill="none" viewBox="0 0 24 24">
//                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
//                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
//                     </svg>
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </>
//       )}
//     </div>
//   )
// }
import { useState, useEffect } from 'react'
import { collection, query, orderBy, onSnapshot, doc, updateDoc } from 'firebase/firestore'
import { db } from '../firebase'
import { Link } from 'react-router-dom'
import { seedDemoData } from '../utils/seedData'

const PROPERTIES = ['All Properties', 'Palm View Villa', 'Marina Bay Suite', 'Downtown Loft 4B', 'Sunset Heights 12', 'Garden Terrace A']
const URGENCIES  = ['All Urgencies', 'Low', 'Medium', 'High']
const STATUSES   = ['Open', 'In Progress', 'Resolved']

const URGENCY_CONFIG = {
  Low:    { badge: 'bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200', dot: 'bg-emerald-400' },
  Medium: { badge: 'bg-amber-100 text-amber-700 ring-1 ring-amber-200',       dot: 'bg-amber-400'   },
  High:   { badge: 'bg-red-100 text-red-600 ring-1 ring-red-200',             dot: 'bg-red-500'     },
}

const STATUS_CONFIG = {
  'Open':        { select: 'bg-blue-50 text-blue-700 border-blue-200'         },
  'In Progress': { select: 'bg-amber-50 text-amber-700 border-amber-200'      },
  'Resolved':    { select: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
}

function formatDate(ts) {
  if (!ts) return '—'
  const d = ts.toDate ? ts.toDate() : new Date(ts)
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

function exportCSV(data) {
  const headers = ['Ticket #', 'Property', 'Category', 'Urgency', 'Description', 'Date Submitted', 'Status']
  const rows = data.map(i => [
    i.ticketNumber,
    i.property,
    i.category,
    i.urgency,
    `"${(i.description || '').replace(/"/g, '""')}"`,
    formatDate(i.submittedAt),
    i.status,
  ])
  const csv = [headers, ...rows].map(r => r.join(',')).join('\n')
  const blob = new Blob([csv], { type: 'text/csv' })
  const url  = URL.createObjectURL(blob)
  const a    = document.createElement('a')
  a.href     = url
  a.download = `maintenance-issues-${new Date().toISOString().split('T')[0]}.csv`
  a.click()
  URL.revokeObjectURL(url)
}

export default function MaintenanceDashboard() {
  const [issues, setIssues]         = useState([])
  const [loading, setLoading]       = useState(true)
  const [filterProp, setFilterProp] = useState('All Properties')
  const [filterUrg, setFilterUrg]   = useState('All Urgencies')
  const [updatingId, setUpdatingId] = useState(null)
  const [seeding, setSeeding]       = useState(false)

  useEffect(() => {
    const q = query(collection(db, 'maintenanceIssues'), orderBy('submittedAt', 'desc'))
    return onSnapshot(q, snap => {
      setIssues(snap.docs.map(d => ({ id: d.id, ...d.data() })))
      setLoading(false)
    })
  }, [])

  const handleStatus = async (id, status) => {
    setUpdatingId(id)
    try { await updateDoc(doc(db, 'maintenanceIssues', id), { status }) }
    catch (e) { console.error(e); alert('Failed to update status.') }
    finally   { setUpdatingId(null) }
  }

  const handleSeed = async () => {
    setSeeding(true)
    try {
      const result = await seedDemoData()
      if (result.alreadySeeded) alert('Demo data already loaded!')
    } catch (e) {
      console.error(e)
      alert('Failed to load demo data.')
    } finally {
      setSeeding(false)
    }
  }

  const filtered = issues.filter(i =>
    (filterProp === 'All Properties' || i.property === filterProp) &&
    (filterUrg  === 'All Urgencies'  || i.urgency  === filterUrg)
  )

  const stats = {
    total:      issues.length,
    open:       issues.filter(i => i.status === 'Open').length,
    inProgress: issues.filter(i => i.status === 'In Progress').length,
    resolved:   issues.filter(i => i.status === 'Resolved').length,
  }

  const hasFilters = filterProp !== 'All Properties' || filterUrg !== 'All Urgencies'

  return (
    <div>
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4 mb-8 animate-fade-up">
        <div>
          <div className="page-eyebrow">
            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            Q5 — Maintenance Dashboard
          </div>
          <h1 className="page-title">Issue Tracker</h1>
          <p className="page-subtitle">
            {loading ? 'Loading…' : `${issues.length} total issue${issues.length !== 1 ? 's' : ''} · Live updates`}
          </p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {/* CSV Export */}
          {filtered.length > 0 && (
            <button
              onClick={() => exportCSV(filtered)}
              className="btn-ghost text-sm"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Export CSV
            </button>
          )}
          <Link to="/q5-maintenance" className="btn-primary">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Log Issue
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6 animate-fade-up" style={{ animationDelay: '60ms' }}>
        {[
          { label: 'Total Issues',  value: stats.total,      color: 'text-[#1A2D6E]',   bg: 'bg-white'        },
          { label: 'Open',          value: stats.open,       color: 'text-blue-600',    bg: 'bg-blue-50'      },
          { label: 'In Progress',   value: stats.inProgress, color: 'text-amber-600',   bg: 'bg-amber-50'     },
          { label: 'Resolved',      value: stats.resolved,   color: 'text-emerald-600', bg: 'bg-emerald-50'   },
        ].map(({ label, value, color, bg }) => (
          <div key={label} className={`rounded-2xl border border-slate-100 ${bg} shadow-card px-5 py-4`}>
            <p className={`text-3xl font-extrabold ${color}`}>{value}</p>
            <p className="text-xs font-semibold text-slate-500 mt-1">{label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="card py-4 mb-4 animate-fade-up" style={{ animationDelay: '120ms' }}>
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707l-6.414 6.414A1 1 0 0014 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 018 21v-7.586a1 1 0 00-.293-.707L1.293 6.707A1 1 0 011 6V4z" />
            </svg>
            Filter
          </div>
          <select value={filterProp} onChange={e => setFilterProp(e.target.value)}
            className="field-input !py-2 !w-auto text-sm">
            {PROPERTIES.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
          <select value={filterUrg} onChange={e => setFilterUrg(e.target.value)}
            className="field-input !py-2 !w-auto text-sm">
            {URGENCIES.map(u => <option key={u} value={u}>{u}</option>)}
          </select>
          {hasFilters && (
            <button
              onClick={() => { setFilterProp('All Properties'); setFilterUrg('All Urgencies') }}
              className="text-xs font-semibold text-[#00B3D7] hover:text-[#1A2D6E] transition underline"
            >
              Clear filters
            </button>
          )}
          {hasFilters && (
            <span className="ml-auto text-xs text-slate-400">
              Showing {filtered.length} of {issues.length}
            </span>
          )}
        </div>
      </div>

      {/* Table / Empty state */}
      {loading ? (
        <div className="card text-center py-20">
          <svg className="h-8 w-8 text-[#00B3D7]/30 animate-spin mx-auto mb-3" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
          </svg>
          <p className="text-sm text-slate-400">Loading issues…</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="card text-center py-20">
          <div className="h-14 w-14 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-4">
            <svg className="h-7 w-7 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <p className="text-base font-bold text-slate-600 mb-1">No issues found</p>
          <p className="text-sm text-slate-400 mb-6">
            {issues.length === 0 ? 'No maintenance issues logged yet.' : 'Try adjusting your filters.'}
          </p>
          {issues.length === 0 && (
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={handleSeed}
                disabled={seeding}
                className="btn-cyan"
              >
                {seeding ? (
                  <>
                    <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    Loading demo data…
                  </>
                ) : (
                  <>
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 7v10c0 2 1 3 3 3h10c2 0 3-1 3-3V7M4 7c0-2 1-3 3-3h10c2 0 3 1 3 3M4 7h16M10 11v6M14 11v6" />
                    </svg>
                    Load Demo Data (10 issues)
                  </>
                )}
              </button>
              <Link to="/q5-maintenance" className="btn-primary">Log First Issue</Link>
            </div>
          )}
        </div>
      ) : (
        <>
          {/* Desktop table */}
          <div className="hidden md:block card overflow-hidden !p-0 animate-fade-up" style={{ animationDelay: '160ms' }}>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/80">
                  {['Ticket #', 'Property', 'Category', 'Urgency', 'Date Submitted', 'Status'].map(h => (
                    <th key={h} className="px-5 py-3.5 text-left text-[10px] font-bold uppercase tracking-widest text-slate-400">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filtered.map(issue => (
                  <tr key={issue.id} className="hover:bg-[#E8F7FC]/30 transition-colors">
                    <td className="px-5 py-4">
                      <span className="font-mono text-xs font-bold text-[#1A2D6E] bg-[#E8F7FC] rounded-lg px-2 py-1">
                        {issue.ticketNumber}
                      </span>
                    </td>
                    <td className="px-5 py-4 max-w-[160px]">
                      <span className="block truncate text-slate-700 font-medium">{issue.property}</span>
                    </td>
                    <td className="px-5 py-4 text-slate-600 font-medium">{issue.category}</td>
                    <td className="px-5 py-4">
                      <span className={`badge ${URGENCY_CONFIG[issue.urgency]?.badge}`}>
                        <span className={`h-1.5 w-1.5 rounded-full ${URGENCY_CONFIG[issue.urgency]?.dot}`} />
                        {issue.urgency}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-slate-500 font-medium whitespace-nowrap text-xs">
                      {formatDate(issue.submittedAt)}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <select
                          value={issue.status}
                          onChange={e => handleStatus(issue.id, e.target.value)}
                          disabled={updatingId === issue.id}
                          className={`rounded-xl border px-3 py-1.5 text-xs font-bold cursor-pointer
                            focus:outline-none focus:ring-2 focus:ring-[#00B3D7]/30
                            disabled:opacity-50 transition-all
                            ${STATUS_CONFIG[issue.status]?.select}`}
                        >
                          {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                        {updatingId === issue.id && (
                          <svg className="h-3.5 w-3.5 text-slate-300 animate-spin" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                          </svg>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="md:hidden space-y-3 animate-fade-up">
            {filtered.map(issue => (
              <div key={issue.id} className="card">
                <div className="flex items-start justify-between mb-3">
                  <span className="font-mono text-sm font-bold text-[#1A2D6E] bg-[#E8F7FC] rounded-lg px-2 py-1">
                    {issue.ticketNumber}
                  </span>
                  <span className={`badge ${URGENCY_CONFIG[issue.urgency]?.badge}`}>
                    <span className={`h-1.5 w-1.5 rounded-full ${URGENCY_CONFIG[issue.urgency]?.dot}`} />
                    {issue.urgency}
                  </span>
                </div>
                <div className="space-y-2 mb-4">
                  {[
                    ['Property',  issue.property],
                    ['Category',  issue.category],
                    ['Submitted', formatDate(issue.submittedAt)],
                    ['Issue',     issue.description],
                  ].map(([label, value]) => (
                    <div key={label} className="flex gap-3 text-xs">
                      <span className="text-slate-400 font-semibold w-20 shrink-0">{label}</span>
                      <span className="text-slate-700 font-medium line-clamp-2">{value}</span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-2 pt-3 border-t border-slate-100">
                  <span className="text-xs font-semibold text-slate-400">Status</span>
                  <select
                    value={issue.status}
                    onChange={e => handleStatus(issue.id, e.target.value)}
                    disabled={updatingId === issue.id}
                    className={`rounded-xl border px-3 py-1.5 text-xs font-bold cursor-pointer
                      focus:outline-none disabled:opacity-50 ${STATUS_CONFIG[issue.status]?.select}`}
                  >
                    {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                  {updatingId === issue.id && (
                    <svg className="h-3.5 w-3.5 text-slate-300 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
