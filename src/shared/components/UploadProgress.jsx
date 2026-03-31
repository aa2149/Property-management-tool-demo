export default function UploadProgress({ progress, label = 'Uploading file…' }) {
  if (!progress || progress <= 0 || progress >= 100) return null
  return (
    <div className="rounded-xl bg-brand-50 border border-brand-100 px-4 py-3">
      <div className="flex justify-between text-xs font-600 text-brand-700 mb-2">
        <span>{label}</span>
        <span>{progress}%</span>
      </div>
      <div className="h-1.5 rounded-full bg-brand-100 overflow-hidden">
        <div
          className="h-full bg-brand-600 rounded-full transition-all duration-200"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )
}
