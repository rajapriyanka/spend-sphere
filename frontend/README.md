# Finance Records Frontend (Vite + React)

Quickstart:
1. Copy `.env.example` to `.env` and set `VITE_API_BASE` and `VITE_GOOGLE_CLIENT_ID`.
2. Install: `npm install`
3. Run: `npm run dev` (default port 3000)

This is a minimal starter with:
- Google sign-in hook (Google Identity Services)
- Axios instance with token auto-attach
- Protected routes using context-based auth
- Pages for Dashboard, Records, Categories, Transaction Types, Reports, Excel Viewer

You'll need a backend running on `VITE_API_BASE` that exposes the API routes you provided earlier.
