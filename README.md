# 🏢 PropManage — Property Management Portal

A full-stack web application for property management operations. Built with React and Firebase, it provides guest-facing and internal tools for managing bookings, refunds, and maintenance issues — all from a single deployed URL.

**🔗 Live Demo → [https://vibe-coder-assessment.web.app](https://vibe-coder-assessment.web.app)**

---

## ✨ Features

### 💳 Guest Refund Request
- Guests submit refund requests with full booking details
- Smart 90-day refund window detection with a conditional warning banner
- Optional file upload for supporting evidence (photos, invoices)
- Instant success screen showing a full summary of the submitted data
- All submissions persisted to Firestore + files stored in Firebase Storage

### 🔧 Maintenance Issue Logger
- Staff log property issues with urgency classification
- Auto-generated unique ticket numbers (`MNT-0001`, `MNT-0002`…)
- Optional photo upload for issue documentation
- Ticket confirmation screen with full submission summary

### 📊 Maintenance Dashboard
- Real-time issue tracker powered by Firestore live sync
- Color-coded urgency levels — 🟢 Low / 🟡 Medium / 🔴 High
- Inline status management — update from `Open` → `In Progress` → `Resolved`
- Filter issues by property and urgency
- At-a-glance stats: Total, Open, In Progress, Resolved
- Fully responsive — desktop table + mobile card layout

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18 + Vite |
| Styling | Tailwind CSS + Plus Jakarta Sans |
| Database | Firebase Firestore |
| File Storage | Firebase Storage |
| Hosting | Firebase Hosting |
| Routing | React Router v6 |

---

## 📁 Project Structure

```
src/
├── Q4-RefundForm/
│   └── RefundForm.jsx              # Guest refund request form
│
├── Q5-MaintenanceLogger/
│   ├── MaintenanceSubmit.jsx       # Submit a maintenance issue
│   └── MaintenanceDashboard.jsx    # Real-time issue tracker dashboard
│
├── shared/
│   └── components/
│       ├── Navbar.jsx              # Top navigation bar
│       ├── Watermark.jsx           # Author badge
│       ├── FileDropzone.jsx        # Reusable drag/click file uploader
│       └── UploadProgress.jsx      # Upload progress bar
│
├── pages/
│   └── Home.jsx                    # Landing page
│
├── firebase.js                     # Firebase initialization
├── App.jsx                         # App routes
└── main.jsx                        # Entry point
```

---
## 👩‍💻 Author

**Areej Ahmed** · [github.com/aa2149](https://github.com/aa2149?tab=repositories)
# Property-management-tool-demo
