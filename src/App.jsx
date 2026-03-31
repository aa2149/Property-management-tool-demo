import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar    from './shared/components/Navbar'
import Watermark from './shared/components/Watermark'
import Home      from './pages/Home'

// Q4
import RefundForm from './Q4-RefundForm/RefundForm'

// Q5
import MaintenanceSubmit    from './Q5-MaintenanceLogger/MaintenanceSubmit'
import MaintenanceDashboard from './Q5-MaintenanceLogger/MaintenanceDashboard'

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 sm:px-6 py-10">
        <Routes>
          <Route path="/"              element={<Home />} />
          <Route path="/q4-refund"     element={<RefundForm />} />
          <Route path="/q5-maintenance" element={<MaintenanceSubmit />} />
          <Route path="/q5-dashboard"  element={<MaintenanceDashboard />} />
          <Route path="*"              element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Watermark />
    </div>
  )
}
