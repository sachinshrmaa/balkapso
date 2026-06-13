# Balkapso Constructions

A premium, state-of-the-art web platform built for **Balkapso Constructions** using Next.js, TypeScript, and Tailwind/Vanilla CSS. The site features rich visual animations, responsive scroll-linked events, interactive custom carousels, animated stat counters, dynamic case studies, and a functional Firebase administration panel.

---

## 🌟 Key Features

- **Dynamic Homepage**: High-end modern landing containing clean, harmonic HSL palettes, glassmorphism, responsive visual layers, services showcase, and inquiry forms.
- **Scroll-Linked Horizontal Timeline**: A full-bleed, responsive history timeline on the About page that translates horizontally relative to the user's vertical scroll, aligning under the fixed header with custom `requestAnimationFrame` updates.
- **Animated Counters & Reveals**: Subtle micro-animations and state-driven counter effects on page load/reveal.
- **Firebase Firestore Integration**: Captures visitor quote inquiries and consultation scopes dynamically in a secure cloud database.
- **Admin Panel**: An integrated administration console for managing database records, reviewing user inquiries, and monitoring incoming scopes.
- **Projects Showcase**: Interactive portfolio displaying diverse commercial, residential, and infrastructure architectural case-studies.

---

## 🛠️ Tech Stack

- **Core**: Next.js 16 (App Router, Turbopack), TypeScript, React 19
- **Database**: Google Firebase (Firestore Database Integration)
- **Styling**: Modern Vanilla CSS, responsive grid/flex systems, custom variables
- **Icons**: Lucide React

---

## 📂 Project Structure

```text
Balkapso/
├── app/
│   ├── about/            # About Us & Scroll-linked Timeline Page
│   ├── admin/            # Secure Inquiries Administration Page
│   ├── projects/         # Case Studies Showcase & Portfolios
│   ├── components/       # Reusable components (Counters, Reveal, Header, Footer)
│   ├── lib/              # Firebase Initialization & Db Helpers
│   ├── globals.css       # Global design system & theme variables
│   ├── page.tsx          # Main Landing Page
│   └── layout.tsx        # Base Document & Styling layout
├── public/               # Static Assets & Architecture Renders
└── package.json          # Project Scripts & Dependencies
```

---

## 🚀 Getting Started

### 1. Configure Environment Variables
Create a `.env.local` file in the root directory and add your Firebase credentials:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### 2. Run the Development Server
Install dependencies and spin up the developer build:
```bash
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) inside your browser.

### 3. Build for Production
Generate the optimized build bundle:
```bash
npm run build
npm run start
```
