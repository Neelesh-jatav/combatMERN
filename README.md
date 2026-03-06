# CombatMERN 🛡️

A full-stack MERN project for combat/defense inventory and purchase management, including user authentication, OTP verification, admin controls, and weapon catalog operations.

## Table Of Contents 📚

- [Overview](#overview-)
- [Features](#features-)
- [Tech Stack](#tech-stack-)
- [Project Structure](#project-structure-)
- [Getting Started](#getting-started-)
- [Environment Variables](#environment-variables-)
- [Run The Project](#run-the-project-)
- [API Base And Endpoints](#api-base-and-endpoints-)
- [Frontend Routes](#frontend-routes-)
- [Scripts](#scripts-)
- [Security Notes](#security-notes-)
- [Troubleshooting](#troubleshooting-)
- [Future Improvements](#future-improvements-)
- [Author](#author-)

## Overview 🎯

CombatMERN is designed as a role-based application where:

- Users can register, verify account access using OTP, log in, and manage profile workflows.
- Admins can add/delete weapons, view all users, register other admins, and review purchase history.
- Authenticated users can browse weapon data and view their own purchase records.

The app uses a React + Vite frontend and an Express + MongoDB backend with JWT cookie authentication.

## Features ✨

- 🔐 Authentication with register/login/logout and current-user (`/me`) support
- 📩 OTP verification flow for account activation
- 🔁 Password recovery and password reset flow via token
- 🧑‍💼 Admin-only user management (`get all users`, `add new admin`)
- 🧾 Weapon purchase recording and personal purchase history
- 🛠️ Weapon CRUD subset (add/delete by Admin, fetch all for everyone)
- ☁️ Cloudinary image upload integration for weapons and admin avatars
- 🧠 Redux Toolkit state management on frontend
- 🍪 Cookie-based auth with CORS credentials enabled

## Tech Stack 🧰

### Frontend

- ⚛️ React 18
- ⚡ Vite 6
- 🎨 Tailwind CSS
- 🧠 Redux Toolkit + React Redux
- 🔀 React Router DOM
- 🔔 React Toastify
- 📈 Chart.js + react-chartjs-2

### Backend

- 🟢 Node.js (ESM)
- 🚂 Express 5
- 🍃 MongoDB + Mongoose
- 🔑 JSON Web Token (`jsonwebtoken`)
- 🔒 Bcrypt password hashing
- 📧 Nodemailer for email flows
- ☁️ Cloudinary for image hosting
- 📦 Express File Upload
- ⏰ node-cron background jobs/services

## Project Structure 🗂️

```text
CombatMERN/
	client/
		src/
			components/
			layout/
			pages/
			popups/
			store/
	server/
		config/
		controllers/
		database/
		middlewares/
		models/
		routes/
		services/
		utils/
```

## Getting Started 🚀

### Prerequisites

- Node.js 18+
- npm
- MongoDB (local or cloud instance)
- Cloudinary account (for image uploads)
- SMTP email account (for OTP/password reset mail)

## Environment Variables 🔧

Create and configure `server/config/config.env`.

Use this template:

```env
PORT=4000
FRONTEND_URL=http://localhost:5173
MONGO_URI=mongodb://127.0.0.1:27017/CombatMERN

SMTP_HOST=smtp.gmail.com
SMTP_SERVICE=gmail
SMTP_PORT=465
SMTP_MAIL=your-email@example.com
SMTP_PASSWORD=your-app-password

JWT_SECRET_KEY=your-super-secret-key
JWT_EXPIRE=3d
COOKIE_EXPIRE=3

CLOUDINARY_CLIENT_NAME=your-cloudinary-cloud-name
CLOUDINARY_CLIENT_API=your-cloudinary-api-key
CLOUDINARY_CLIENT_SECRET=your-cloudinary-api-secret
```

## Run The Project ▶️

Open two terminals.

### 1. Start backend server

```bash
cd server
npm install
npm run dev
```

Expected default URL: `http://localhost:4000`

### 2. Start frontend app

```bash
cd client
npm install
npm run dev
```

Expected default URL: `http://localhost:5173`

## API Base And Endpoints 🌐

Base URL:

```text
http://localhost:4000/api/v1
```

### Auth Routes (`/auth`)

- `POST /register`
- `POST /verify-otp`
- `POST /login`
- `GET /logout` (auth required)
- `GET /me` (auth required)
- `POST /password/forgot`
- `PUT /password/reset/:token`
- `PUT /password/update` (auth required)

### User Routes (`/user`)

- `GET /all` (Admin only)
- `POST /add/new-admin` (Admin only)

### Weapon Routes (`/weapon`)

- `GET /all`
- `POST /admin/add` (Admin only)
- `DELETE /admin/delete/:id` (Admin only)

### Purchase Routes (`/purchase`)

- `POST /record/:id` (Admin or User)
- `GET /all` (Admin only)
- `GET /my` (auth required)

## Frontend Routes 🧭

- `/`
- `/login`
- `/register`
- `/password/forgot`
- `/otp-verification/:email`
- `/password/reset/:token`
- `/weapon`
- `/profile`
- `/adminprofile`
- `/authmodal`
- `/AddWeapons`
- `/DeleteWeapon`

## Scripts 📜

### Client scripts (`client/package.json`)

- `npm run dev` -> Start Vite dev server
- `npm run build` -> Build production assets
- `npm run preview` -> Preview production build
- `npm run lint` -> Run ESLint

### Server scripts (`server/package.json`)

- `npm run dev` -> Start backend with nodemon
- `npm start` -> Start backend with node

## Security Notes 🔒

- Never commit real credentials to GitHub.
- Move all secrets to local environment variables and rotate exposed keys immediately.
- Add `server/config/config.env` to `.gitignore` if not already ignored.
- Use strong JWT secrets and secure cookie settings in production.

## Troubleshooting 🩺

- If frontend cannot call backend, verify `FRONTEND_URL` and CORS origin settings.
- If login fails unexpectedly, confirm cookies are enabled and sent with credentials.
- If image upload fails, verify Cloudinary credentials and allowed file formats (`jpeg/jpg/png`).
- If OTP/password emails do not send, confirm SMTP settings and app password.
- If Mongo connection fails, re-check `MONGO_URI` and MongoDB service status.

## Future Improvements 🧪

- Add automated tests (unit + integration) for controllers and reducers
- Add refresh token strategy and token revocation
- Add pagination/filtering for weapon and user lists
- Add API docs with Swagger/OpenAPI
- Add Docker support for one-command local setup

## Author 👨‍💻

- GitHub: `https://github.com/Neelesh-jatav`
- Repository: `https://github.com/Neelesh-jatav/combatMERN`

---

If you want, I can also add a polished `API.md` with request/response examples for every endpoint. 📘
