# 🎸 Collaborative Songbook Backend

This backend is part of a full-stack app designed to let musicians share and view song lyrics and chords in real time. This is the backend implementation — built using **Node.js, Express, MongoDB**, and includes **JWT-based authentication**.

---

## ✅ Features Implemented

### Authentication

- `POST /signup`: User signup route
- `POST /admin-signup`: Admin signup route
- `POST /login`: Login with JWT token generation
- All validations are handled with **Zod**

### Songs

- `GET /song`: Returns a list of songs from static `.json` files
  - Requires the requester to be **admin**
  - Output format is consistent with the JSON file structure provided

### Middleware

- JWT Authentication middleware
  - Checks for Bearer token
  - Attaches decoded user data (`userId`, `admin`, etc.) to `req`

---

## 🛠️ Project Setup

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Create a `.env` file**

   ```env
   PORT=5000
   JWT_SECRET=your_super_secret_key
   ```

3. **Run the server**
   ```bash
   npm run dev
   ```

---

## 🔐 JWT Auth Flow

- On login, the server responds with a JWT token and basic user info
- The frontend should store this token (e.g. in localStorage)
- Protected routes require the token in the `Authorization` header:
  ```
  Authorization: Bearer <token>
  ```

---

## 📁 File Structure Overview

```
src/
├── controllers/
│   ├── auth.controller.ts
│   └── song.controller.ts
├── data/
│   ├── hey_jude.json
│   └── veech_shelo.json
├── middleware/
│   └── auth.middleware.ts
├── models/
│   └── user.ts
├── routes/
│   └── index.ts
├── types/
│   └── song.ts
│   └── (AuthRequest interface lives in the middleware)
```

---

## ⚠️ Missing / Optional Features

### Still to implement (if needed):

- **Socket.io** (for real-time collaboration / "multiplayer" features)
- **Crawler** for importing new songs (bonus)
- **Admin interface** for uploading songs
- **Full frontend integration** (this is just the backend)

---

## 👨‍💻 What "C)" Needs To Do

1. **Build the frontend**:

   - Login/signup forms
   - Song display with proper layout for chords + lyrics
   - Admin-only access to `/song`
   - Main Page admin
   - Main page player
   - Result page admin

2. **Use the provided API routes** and JWT token properly

3. **Optional**: If multiplayer is a priority, implement **socket support**

Let me know if you need a Postman collection or example frontend hooks!
