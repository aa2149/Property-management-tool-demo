import { useState } from 'react'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { db, storage } from '../firebase'
import FileDropzone   from '../shared/components/FileDropzone'
import UploadProgress from '../shared/components/UploadProgress'
import { Link } from 'react-router-dom'

const REFUND_REASONS = ['Property Issue', 'Booking Error', 'Personal Reasons', 'Other']

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf']
const MAX_SIZE      = 10 * 1024 * 1024

function isOlderThan90Days(dateStr) {
  if (!dateStr) return false
  const diff = new Date().setHours(0,0,0,0) - new Date(dateStr + 'T00:00:00')
  return Math.floor(diff / 86400000) > 90
}

function formatDate(dateStr) {
  if (!dateStr) return '—'
  return new Date(dateStr + 'T00:00:00').toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  })
}

const FIELDS = [
  { name: 'fullName',         label: 'Full Name',         type: 'text',  placeholder: 'Jane Smith' },
  { name: 'email',            label: 'Email Address',     type: 'email', placeholder: 'jane@example.com' },
  { name: 'bookingReference', label: 'Booking Reference', type: 'text',  placeholder: 'e.g. BK-20241234' },
]

export default function RefundForm() {
  const [form, setForm] = useState({
    fullName: '', email: '', bookingReference: '',
    bookingDate: '', refundReason: '', additionalDetails: '',
  })
  const [file, setFile]             = useState(null)
  const [fileError, setFileError]   = useState('')
  const [errors, setErrors]         = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [progress, setProgress]     = useState(0)
  const [submitted, setSubmitted]   = useState(false)
  const [snapshot, setSnapshot]     = useState(null)

  const showWarning = isOlderThan90Days(form.bookingDate)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(p => ({ ...p, [name]: value }))
    if (errors[name]) setErrors(p => ({ ...p, [name]: '' }))
  }

  const handleFile = (selected) => {
    if (!ALLOWED_TYPES.includes(selected.type)) {
      setFileError('Only JPG, PNG, WEBP, or PDF files are allowed.')
      return
    }
    if (selected.size > MAX_SIZE) {
      setFileError('File must be under 10MB.')
      return
    }
    setFile(selected)
    setFileError('')
  }

  const validate = () => {
    const e = {}
    if (!form.fullName.trim())         e.fullName         = 'Full name is required.'
    if (!form.email.trim())            e.email            = 'Email is required.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email.'
    if (!form.bookingReference.trim()) e.bookingReference = 'Booking reference is required.'
    if (!form.bookingDate)             e.bookingDate      = 'Booking date is required.'
    if (!form.refundReason)            e.refundReason     = 'Please select a reason.'
    return e
  }

  const uploadFile = (f) => new Promise((resolve, reject) => {
    const task = uploadBytesResumable(ref(storage, `refunds/${Date.now()}_${f.name}`), f)
    task.on('state_changed',
      s => setProgress(Math.round(s.bytesTransferred / s.totalBytes * 100)),
      reject,
      async () => resolve({ url: await getDownloadURL(task.snapshot.ref), name: f.name })
    )
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) {
      setErrors(errs)
      document.querySelector('[data-error="true"]')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      return
    }
    setSubmitting(true)
    try {
      const fileInfo = file ? await uploadFile(file) : null
      const payload  = {
        ...form,
        fileUrl:              fileInfo?.url  ?? null,
        fileName:             fileInfo?.name ?? null,
        outsideRefundWindow:  showWarning,
        submittedAt:          serverTimestamp(),
        _author:              'Areej Ahmed',
        _github:              'https://github.com/aa2149',
        _task:                'Q4 — Guest Refund Request Form',
      }
      await addDoc(collection(db, 'refundRequests'), payload)
      setSnapshot({ ...form, fileName: file?.name ?? null, outsideRefundWindow: showWarning })
      setSubmitted(true)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (err) {
      console.error(err)
      alert('Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
      setProgress(0)
    }
  }

  const reset = () => {
    setForm({ fullName: '', email: '', bookingReference: '', bookingDate: '', refundReason: '', additionalDetails: '' })
    setFile(null); setFileError(''); setErrors({})
    setSubmitted(false); setSnapshot(null)
  }

  /* ── Success ── */
  if (submitted && snapshot) {
    return (
      <div className="max-w-2xl mx-auto animate-fade-up">
        <div className="card">
          {/* Top accent bar */}
          <div className="-mx-6 -mt-6 md:-mx-8 md:-mt-8 mb-7 h-1.5 rounded-t-2xl bg-gradient-to-r from-violet-500 to-brand-500" />

          <div className="flex items-start gap-4 mb-6">
            <div className="h-12 w-12 rounded-2xl bg-emerald-100 flex items-center justify-center shrink-0">
              <svg className="h-6 w-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-800 text-brand-900">Request Submitted</h1>
              <p className="text-sm text-slate-500 mt-0.5">We've received your request and will be in touch shortly.</p>
            </div>
          </div>

          {/* 90-day warning */}
          {snapshot.outsideRefundWindow && (
            <div className="mb-5 flex gap-3 rounded-xl bg-amber-50 border border-amber-200 px-4 py-3.5">
              <svg className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
              </svg>
              <p className="text-sm text-amber-700 font-600">
                Your booking is outside the standard refund window. Your request will be reviewed on a case-by-case basis.
              </p>
            </div>
          )}

          {/* Summary */}
          <div className="card-section mb-6">
            <div className="px-4 py-3 border-b border-slate-100">
              <p className="text-[10px] font-700 uppercase tracking-widest text-slate-400">Submission Summary</p>
            </div>
            {[
              ['Full Name',          snapshot.fullName],
              ['Email',              snapshot.email],
              ['Booking Reference',  snapshot.bookingReference],
              ['Booking Date',       formatDate(snapshot.bookingDate)],
              ['Refund Reason',      snapshot.refundReason],
              ['Additional Details', snapshot.additionalDetails || '—'],
              ['Attached File',      snapshot.fileName || 'None'],
            ].map(([label, value]) => (
              <div key={label} className="flex items-start justify-between gap-4 px-4 py-3 border-b border-slate-50 last:border-0">
                <span className="text-xs font-600 text-slate-400 w-36 shrink-0">{label}</span>
                <span className="text-sm font-500 text-brand-900 text-right break-all">{value}</span>
              </div>
            ))}
          </div>

          <div className="flex gap-3">
            <button onClick={reset} className="btn-ghost flex-1">Submit Another</button>
            <Link to="/" className="btn-primary flex-1">Back to Portal</Link>
          </div>
        </div>
      </div>
    )
  }

  /* ── Form ── */
  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="page-header animate-fade-up">
        <div className="page-eyebrow">
          <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
          </svg>
          Q4 — Guest Refund Request
        </div>
        <h1 className="page-title">Request a Refund</h1>
        <p className="page-subtitle">
          Fill in your booking details below and we'll review your refund request as soon as possible.
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate className="card animate-fade-up" style={{ animationDelay: '80ms' }}>
        {/* Top accent */}
        <div className="-mx-6 -mt-6 md:-mx-8 md:-mt-8 mb-7 h-1.5 rounded-t-2xl bg-gradient-to-r from-violet-500 to-brand-500" />

        <div className="space-y-5">
          {/* Text fields */}
          {FIELDS.map(({ name, label, type, placeholder }) => (
            <div key={name}>
              <label className="field-label" htmlFor={name}>
                {label} <span className="text-red-400 normal-case tracking-normal">*</span>
              </label>
              <input
                id={name} name={name} type={type}
                value={form[name]} onChange={handleChange}
                placeholder={placeholder}
                data-error={!!errors[name]}
                className={`field-input ${errors[name] ? 'field-input-error' : ''}`}
              />
              {errors[name] && (
                <p className="field-error">
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01" />
                  </svg>
                  {errors[name]}
                </p>
              )}
            </div>
          ))}

          {/* Booking Date */}
          <div>
            <label className="field-label" htmlFor="bookingDate">
              Booking Date <span className="text-red-400 normal-case tracking-normal">*</span>
            </label>
            <input
              id="bookingDate" name="bookingDate" type="date"
              value={form.bookingDate} onChange={handleChange}
              max={new Date().toISOString().split('T')[0]}
              data-error={!!errors.bookingDate}
              className={`field-input ${errors.bookingDate ? 'field-input-error' : ''}`}
            />
            {errors.bookingDate && (
              <p className="field-error">
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01" />
                </svg>
                {errors.bookingDate}
              </p>
            )}
          </div>

          {/* 90-day warning banner */}
          {showWarning && (
            <div className="flex gap-3 rounded-xl bg-amber-50 border border-amber-200 px-4 py-3.5 animate-fade-in">
              <svg className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
              </svg>
              <p className="text-sm text-amber-700 font-600">
                <strong>Outside standard refund window.</strong> Your booking is older than 90 days.
                Your request will be reviewed on a case-by-case basis.
              </p>
            </div>
          )}

          {/* Refund Reason */}
          <div>
            <label className="field-label" htmlFor="refundReason">
              Refund Reason <span className="text-red-400 normal-case tracking-normal">*</span>
            </label>
            <select
              id="refundReason" name="refundReason"
              value={form.refundReason} onChange={handleChange}
              data-error={!!errors.refundReason}
              className={`field-input ${errors.refundReason ? 'field-input-error' : ''} ${!form.refundReason ? 'text-slate-400' : ''}`}
            >
              <option value="" disabled>Select a reason…</option>
              {REFUND_REASONS.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
            {errors.refundReason && (
              <p className="field-error">
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01" />
                </svg>
                {errors.refundReason}
              </p>
            )}
          </div>

          {/* Additional Details */}
          <div>
            <label className="field-label" htmlFor="additionalDetails">
              Additional Details
              <span className="ml-1 text-slate-400 normal-case font-500 tracking-normal">(optional)</span>
            </label>
            <textarea
              id="additionalDetails" name="additionalDetails"
              value={form.additionalDetails} onChange={handleChange}
              rows={4} placeholder="Describe what happened or provide any context that may help us process your request…"
              className="field-input resize-none"
            />
          </div>

          {/* File upload */}
          <div>
            <label className="field-label">
              Supporting Documents
              <span className="ml-1 text-slate-400 normal-case font-500 tracking-normal">(optional)</span>
            </label>
            <FileDropzone
              file={file}
              onFile={handleFile}
              onRemove={() => setFile(null)}
              error={fileError}
            />
          </div>

          {/* Upload progress */}
          <UploadProgress progress={progress} />

          {/* Submit */}
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
                Submit Refund Request
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </>
            )}
          </button>
          <p className="text-xs text-center text-slate-400 mt-2">
            Fields marked <span className="text-red-400">*</span> are required
          </p>
        </div>
      </form>
    </div>
  )
}
