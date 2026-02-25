# CombatMERN

CombatMERN is a full-stack MERN application focused on defense-themed content, weapons catalog flows, admin/user dashboards, and supporting intelligence-style sections.

## Tech Stack

- **Frontend:** React + Vite + Tailwind CSS + Redux Toolkit
- **Backend:** Node.js + Express
- **Database:** MongoDB
- **Auth/Utilities:** JWT, email/OTP utilities, role-based routing

## Project Structure

- `client/` — React frontend
- `server/` — Express API and backend services

## Prerequisites

- Node.js (v18+ recommended)
- npm
- MongoDB connection string

## Environment Setup

Create/update environment variables in `server/config/config.env` (example values):

- `PORT=4000`
- `MONGO_URI=<your_mongodb_connection_string>`
- `JWT_SECRET=<your_secret>`
- `JWT_EXPIRE=<token_expiry>`
- `COOKIE_EXPIRE=<cookie_days>`
- Email credentials used by mail utilities (if enabled)

## Run Locally

### 1) Start Backend

```bash
cd server
npm install
npm run dev
```

### 2) Start Frontend

```bash
cd client
npm install
npm run dev
```

Frontend will run on Vite dev server (usually `http://localhost:5173`) and backend on your configured server port.

## Available Scripts

### Client

- `npm run dev` — start frontend dev server
- `npm run build` — production build
- `npm run preview` — preview production build

### Server

- `npm run dev` — start backend in development mode
- `npm start` — start backend in production mode

## Highlighted UI Sections

- Home dashboard with defense-focused content sections
- Weapons module
- Document and headline sections
- Legacy/idea section
- VigilaxAI section with external/live link integration

## Deployment Notes

- Ensure CORS and API base URLs are configured correctly for production.
- Keep secrets in environment variables only.
- Verify frontend build output and backend process manager setup before deployment.

---

If you want, I can also add badges, screenshots, and API endpoint documentation in this README.
