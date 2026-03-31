import { useRef } from 'react'

export default function FileDropzone({ file, onFile, onRemove, accept = '.jpg,.jpeg,.png,.webp,.pdf', hint = 'JPG, PNG, WEBP, PDF · Max 10MB', error }) {
  const inputRef = useRef()

  const handleFile = (e) => {
    const selected = e.target.files[0]
    if (selected) onFile(selected)
  }

  return (
    <div>
      <div
        onClick={() => inputRef.current?.click()}
        className={`cursor-pointer rounded-xl border-2 border-dashed px-4 py-6 text-center transition-all duration-150
          ${error
            ? 'border-red-300 bg-red-50'
            : file
              ? 'border-brand-300 bg-brand-50'
              : 'border-slate-200 hover:border-brand-300 hover:bg-brand-50/40'
          }`}
      >
        <input ref={inputRef} type="file" accept={accept} onChange={handleFile} className="hidden" />

        {file ? (
          <div className="flex items-center justify-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-brand-100 flex items-center justify-center shrink-0">
              <svg className="h-5 w-5 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
              </svg>
            </div>
            <div className="text-left">
              <p className="text-sm font-600 text-brand-700">{file.name}</p>
              <p className="text-xs text-slate-400">{(file.size / 1024).toFixed(0)} KB</p>
            </div>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); onRemove() }}
              className="ml-auto rounded-lg p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-400 transition"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ) : (
          <div>
            <div className="h-10 w-10 rounded-xl bg-slate-100 flex items-center justify-center mx-auto mb-3">
              <svg className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
              </svg>
            </div>
            <p className="text-sm font-600 text-slate-600">Click to upload</p>
            <p className="text-xs text-slate-400 mt-1">{hint}</p>
          </div>
        )}
      </div>
      {error && (
        <p className="field-error">
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
          </svg>
          {error}
        </p>
      )}
    </div>
  )
}
