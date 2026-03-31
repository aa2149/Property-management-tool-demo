import { useState } from 'react'
import { collection, addDoc, serverTimestamp, query, orderBy, limit, getDocs } from 'firebase/firestore'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { db, storage } from '../firebase'
import FileDropzone   from '../shared/components/FileDropzone'
import UploadProgress from '../shared/components/UploadProgress'
import { Link } from 'react-router-dom'

const PROPERTIES = [
  'Palm View Villa',
  'Marina Bay Suite',
  'Downtown Loft 4B',
  'Sunset Heights 12',
  'Garden Terrace A',
]
const CATEGORIES = ['Plumbing', 'Electrical', 'AC/HVAC', 'Furniture', 'Cleaning', 'Other']
const URGENCIES  = ['Low', 'Medium', 'High']

const URGENCY_CONFIG = {
  Low:    { ring: 'ring-emerald-400 bg-emerald-50 text-emerald-700', dot: 'bg-emerald-400' },
  Medium: { ring: 'ring-amber-400 bg-amber-50 text-amber-700',       dot: 'bg-amber-400'   },
  High:   { ring: 'ring-red-400 bg-red-50 text-red-600',             dot: 'bg-red-500'     },
}

const ALLOWED_IMG = ['image/jpeg', 'image/png', 'image/webp']

async function generateTicket() {
  const q    = query(collection(db, 'maintenanceIssues'), orderBy('ticketNumber', 'desc'), limit(1))
  const snap = await getDocs(q)
  if (snap.empty) return 'MNT-0001'
  const last = snap.docs[0].data().ticketNumber
  const num  = parseInt(last.split('-')[1], 10)
  return `MNT-${String(num + 1).padStart(4, '0')}`
}

export default function MaintenanceSubmit() {
  const [form, setForm] = useState({ property: '', category: '', urgency: '', description: '' })
  const [photo, setPhoto]           = useState(null)
  const [photoError, setPhotoError] = useState('')
  const [errors, setErrors]         = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [progress, setProgress]     = useState(0)
  const [ticket, setTicket]         = useState(null)
  const [submitted, setSubmitted]   = useState(null) // full snapshot

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(p => ({ ...p, [name]: value }))
    if (errors[name]) setErrors(p => ({ ...p, [name]: '' }))
  }

  const handlePhoto = (selected) => {
    if (!ALLOWED_IMG.includes(selected.type)) { setPhotoError('Only JPG, PNG, or WEBP images are allowed.'); return }
    if (selected.size > 10 * 1024 * 1024)    { setPhotoError('Image must be under 10MB.'); return }
    setPhoto(selected); setPhotoError('')
  }

  const validate = () => {
    const e = {}
    if (!form.property)               e.property    = 'Please select a property.'
    if (!form.category)               e.category    = 'Please select a category.'
    if (!form.urgency)                e.urgency     = 'Please select urgency.'
    if (!form.description.trim())     e.description = 'Description is required.'
    else if (form.description.trim().length < 10) e.description = 'Please provide more detail (min. 10 characters).'
    return e
  }

  const uploadPhoto = (f) => new Promise((resolve, reject) => {
    const task = uploadBytesResumable(ref(storage, `maintenance/${Date.now()}_${f.name}`), f)
    task.on('state_changed',
      s => setProgress(Math.round(s.bytesTransferred / s.totalBytes * 100)),
      reject,
      async () => resolve({ url: await getDownloadURL(task.snapshot.ref), name: f.name })
    )
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setSubmitting(true)
    try {
      const ticketNumber = await generateTicket()
      const photoInfo    = photo ? await uploadPhoto(photo) : null
      await addDoc(collection(db, 'maintenanceIssues'), {
        ticketNumber,
        ...form,
        photoUrl:    photoInfo?.url  ?? null,
        photoName:   photoInfo?.name ?? null,
        status:      'Open',
        submittedAt: serverTimestamp(),
        _author:     'Areej Ahmed',
        _github:     'https://github.com/aa2149',
        _task:       'Q5 — Maintenance Issue Logger',
      })
      setTicket(ticketNumber)
      setSubmitted({ ...form, photoName: photo?.name ?? null })
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (err) {
      console.error(err)
      alert('Something went wrong. Please try again.')
    } finally {
      setSubmitting(false); setProgress(0)
    }
  }

  const reset = () => {
    setForm({ property: '', category: '', urgency: '', description: '' })
    setPhoto(null); setPhotoError(''); setErrors({})
    setTicket(null); setSubmitted(null)
  }

  /* ── Success ── */
  if (ticket && submitted) {
    return (
      <div className="max-w-xl mx-auto animate-fade-up">
        <div className="card text-center">
          <div className="-mx-6 -mt-6 md:-mx-8 md:-mt-8 mb-7 h-1.5 rounded-t-2xl bg-gradient-to-r from-brand-500 to-emerald-500" />

          <div className="h-16 w-16 rounded-2xl bg-emerald-100 flex items-center justify-center mx-auto mb-5">
            <svg className="h-8 w-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h1 className="text-xl font-800 text-brand-900 mb-1">Issue Logged</h1>
          <p className="text-sm text-slate-500 mb-6">Your maintenance request has been submitted successfully.</p>

          {/* Ticket number */}
          <div className="rounded-2xl bg-brand-50 border border-brand-100 px-6 py-5 mb-6">
            <p className="text-[10px] font-700 uppercase tracking-widest text-brand-400 mb-1">Your Ticket Number</p>
            <p className="text-5xl font-800 text-brand-600 tracking-widest">{ticket}</p>
            <p className="text-xs text-slate-400 mt-2">Use this to track your issue on the dashboard</p>
          </div>

          {/* Summary */}
          <div className="card-section text-left mb-6">
            {[
              ['Property',    submitted.property],
              ['Category',    submitted.category],
              ['Description', submitted.description],
              ['Photo',       submitted.photoName || 'None'],
            ].map(([label, value]) => (
              <div key={label} className="flex items-start justify-between gap-4 px-4 py-3 border-b border-slate-50 last:border-0">
                <span className="text-xs font-600 text-slate-400 w-24 shrink-0">{label}</span>
                <span className="text-sm font-500 text-brand-900 text-right">{value}</span>
              </div>
            ))}
            <div className="flex items-center justify-between gap-4 px-4 py-3">
              <span className="text-xs font-600 text-slate-400 w-24 shrink-0">Urgency</span>
              <span className={`badge ring-1 ${URGENCY_CONFIG[submitted.urgency].ring}`}>
                <span className={`h-1.5 w-1.5 rounded-full ${URGENCY_CONFIG[submitted.urgency].dot}`} />
                {submitted.urgency}
              </span>
            </div>
          </div>

          <div className="flex gap-3">
            <button onClick={reset} className="btn-ghost flex-1">Log Another</button>
            <Link to="/q5-dashboard" className="btn-primary flex-1">View Dashboard</Link>
          </div>
        </div>
      </div>
    )
  }

  /* ── Form ── */
  return (
    <div className="max-w-2xl mx-auto">
      <div className="page-header animate-fade-up">
        <div className="page-eyebrow">
          <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          Q5 — Maintenance Logger
        </div>
        <h1 className="page-title">Log a Maintenance Issue</h1>
        <p className="page-subtitle">Report a problem at one of our properties. You'll receive a unique ticket number on submission.</p>
      </div>

      <form onSubmit={handleSubmit} noValidate className="card animate-fade-up" style={{ animationDelay: '80ms' }}>
        <div className="-mx-6 -mt-6 md:-mx-8 md:-mt-8 mb-7 h-1.5 rounded-t-2xl bg-gradient-to-r from-brand-500 to-emerald-500" />

        <div className="space-y-5">
          {/* Property */}
          <div>
            <label className="field-label" htmlFor="property">
              Property <span className="text-red-400 normal-case tracking-normal">*</span>
            </label>
            <select id="property" name="property" value={form.property} onChange={handleChange}
              className={`field-input ${errors.property ? 'field-input-error' : ''} ${!form.property ? 'text-slate-400' : ''}`}>
              <option value="" disabled>Select a property…</option>
              {PROPERTIES.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
            {errors.property && <p className="field-error">{errors.property}</p>}
          </div>

          {/* Category */}
          <div>
            <label className="field-label" htmlFor="category">
              Issue Category <span className="text-red-400 normal-case tracking-normal">*</span>
            </label>
            <select id="category" name="category" value={form.category} onChange={handleChange}
              className={`field-input ${errors.category ? 'field-input-error' : ''} ${!form.category ? 'text-slate-400' : ''}`}>
              <option value="" disabled>Select a category…</option>
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            {errors.category && <p className="field-error">{errors.category}</p>}
          </div>

          {/* Urgency */}
          <div>
            <label className="field-label">
              Urgency <span className="text-red-400 normal-case tracking-normal">*</span>
            </label>
            <div className="grid grid-cols-3 gap-3">
              {URGENCIES.map(u => {
                const cfg     = URGENCY_CONFIG[u]
                const checked = form.urgency === u
                return (
                  <label key={u}
                    className={`cursor-pointer rounded-xl border-2 py-3 text-center text-sm font-700 transition-all duration-150
                      ${checked ? `ring-2 ${cfg.ring} border-transparent` : 'border-slate-200 text-slate-600 hover:border-slate-300 bg-white'}`}
                  >
                    <input type="radio" name="urgency" value={u} checked={checked} onChange={handleChange} className="sr-only" />
                    <div className="flex items-center justify-center gap-2">
                      <span className={`h-2 w-2 rounded-full ${checked ? cfg.dot : 'bg-slate-300'}`} />
                      {u}
                    </div>
                  </label>
                )
              })}
            </div>
            {errors.urgency && <p className="field-error mt-1.5">{errors.urgency}</p>}
          </div>

          {/* Description */}
          <div>
            <label className="field-label" htmlFor="description">
              Description <span className="text-red-400 normal-case tracking-normal">*</span>
            </label>
            <textarea id="description" name="description" value={form.description} onChange={handleChange}
              rows={4} placeholder="Describe the issue in detail — what's broken, where it is, how long it's been happening…"
              className={`field-input resize-none ${errors.description ? 'field-input-error' : ''}`} />
            {errors.description && <p className="field-error">{errors.description}</p>}
          </div>

          {/* Photo */}
          <div>
            <label className="field-label">
              Photo <span className="ml-1 text-slate-400 normal-case font-500 tracking-normal">(optional)</span>
            </label>
            <FileDropzone
              file={photo}
              onFile={handlePhoto}
              onRemove={() => setPhoto(null)}
              accept=".jpg,.jpeg,.png,.webp"
              hint="JPG, PNG, WEBP · Max 10MB"
              error={photoError}
            />
          </div>

          <UploadProgress progress={progress} label="Uploading photo…" />

          <button type="submit" className="btn-primary w-full mt-2" disabled={submitting}>
            {submitting ? (
              <>
                <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
                Submitting…
              </>
            ) : (
              <>
                Submit Issue
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}
