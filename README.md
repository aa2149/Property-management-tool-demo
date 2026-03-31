# 🏢 PropManage — Property Management Portal

A full-stack web application for property management operations. Built with React and Firebase, it provides guest-facing and internal tools for managing bookings, refunds, and maintenance issues — all from a single deployed URL.

**🔗 Live Demo → [YOUR_PROJECT_ID.web.app](https://YOUR_PROJECT_ID.web.app)**

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

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- A Firebase project ([create one free](https://console.firebase.google.com))

### 1. Clone the repo

```bash
git clone https://github.com/aa2149/propmanage.git
cd propmanage
npm install
```

### 2. Set up Firebase

In your Firebase console:

1. **Firestore** → Build → Firestore Database → Create → Start in test mode
2. **Storage** → Build → Storage → Get started → Start in test mode
3. **Project Settings** → Your Apps → Add Web App → copy the config object

### 3. Configure environment variables

```bash
cp .env.example .env
```

Open `.env` and paste in your Firebase values:

```env
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
```

### 4. Run locally

```bash
npm run dev
```

Visit `http://localhost:5173`

---

## ☁️ Deploying to Firebase Hosting

### Install Firebase CLI (first time only)

```bash
npm install -g firebase-tools
firebase login
```

### Update `.firebaserc`

Open `.firebaserc` and replace `YOUR_FIREBASE_PROJECT_ID` with your actual project ID.

### Build and deploy

```bash
npm run build
firebase deploy
```

You'll get one hosted URL covering all routes:

```
✔  Deploy complete!
Hosting URL: https://YOUR_PROJECT_ID.web.app
```

| Route | Page |
|---|---|
| `/` | Home |
| `/q4-refund` | Guest Refund Request |
| `/q5-maintenance` | Log Maintenance Issue |
| `/q5-dashboard` | Issue Tracker Dashboard |

---

## 🔒 Firebase Security Rules

These open rules are suitable for internal tools and development. Lock them down before going to production.

**Firestore** — paste into your Firestore Rules tab:
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

**Storage** — paste into your Storage Rules tab:
```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write: if true;
    }
  }
}
```

---

## 👩‍💻 Author

**Areej Ahmed** · [github.com/aa2149](https://github.com/aa2149?tab=repositories)
# Property-management-Internal-tool-demo
