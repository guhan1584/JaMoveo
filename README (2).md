# 🎵 Live Session Music App

A real-time collaborative music lyrics + chords viewer for bands. Built to help band members follow songs during live sessions with role-based visibility (e.g., vocals only see lyrics, others see chords + lyrics). Supports admin-controlled scrolling and song transitions.

## 🚀 Features

- 🔒 Authentication (Signup/Login)
- 🎹 Role-based session access (Admin, User)
- 📜 Real-time lyrics and chord rendering
- 🧠 Admin controls song flow & scrolling
- 📡 WebSocket communication using Socket.IO
- 📱 Mobile-responsive design with beautiful UI
- 🧑‍🎤 Vocals see lyrics only; others see full song content
- 🌐 Deployed frontend + backend ready

---

## 📁 Project Structure

```
/client      # Frontend (Vite + React + Tailwind + ShadCN UI)
/server      # Backend (Node.js + Express + MongoDB + Socket.IO)
```

---

## 🛠️ Tech Stack

### Frontend:
- Vite + React + TypeScript
- Tailwind CSS + ShadCN UI
- React Router
- Socket.IO client

### Backend:
- Node.js + Express
- MongoDB + Mongoose
- Socket.IO server
- JWT Auth

---

## 🧪 Live Demo (Optional)

> Add link here if deployed on Netlify/Vercel + Railway/Render

---

## 📷 Screenshots

> Include 2-3 screenshots of:
- Entry Page
- Admin view during session
- User view with scrolling content

---

## 🧾 Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/live-session-app.git
cd live-session-app
```

### 2. Install server dependencies
```bash
cd server
npm install
```

### 3. Install client dependencies
```bash
cd ../client
npm install
```

### 4. Create `.env` files

#### For `/server/.env`
```env
PORT=3001
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

#### For `/client/.env`
```env
VITE_API_BASE_URL=http://localhost:3001
```

### 5. Run both servers

#### In one terminal tab:
```bash
cd server
npm run dev
```

#### In another tab:
```bash
cd client
npm run dev
```

---

## 👥 User Roles

- **Admin (Band Leader):**
  - Selects and changes songs
  - Starts/stops auto-scroll
  - Reveals more lines in real-time
  - Ends session

- **User (Band Member):**
  - Auto-follows lines revealed by admin
  - View is adjusted by instrument (e.g., vocals see lyrics only)

---

## 📡 WebSocket Events

| Event             | Direction        | Description                             |
|------------------|------------------|-----------------------------------------|
| `join-session`    | Client → Server  | User joins the session                  |
| `song-selected`   | Server → Client  | Song loaded                             |
| `lines-updated`   | Server → Client  | Reveal new lines to all users           |
| `song-changing`   | Server → Client  | Notify users song is changing           |
| `session-ended`   | Server → Client  | Admin ends the session                  |

---

## ✅ TODO / Future Features

- Add song upload from admin
- Search and filter songs
- User profile page
- Full dark mode toggle
- Admin music queue / playlist

---

## 👨‍💻 Author

Guy Gochansky  
Feel free to reach out via [LinkedIn](https://www.linkedin.com) or check out my portfolio!

---

## 📄 License

MIT – feel free to fork and modify.
