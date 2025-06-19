# 🎸 JaMoveo - Collaborative Live Music Sessions

A real-time collaborative music application for bands and musicians. Features admin-controlled song sessions with synchronized scrolling, role-based content visibility, and multi-language support (Hebrew & English). Perfect for live rehearsals and performances.

## ✨ Key Features

### 🔐 **Authentication & User Management**

- User signup/login with JWT authentication
- Role-based access (Band Leader/Admin vs Musicians/Users)
- Instrument-specific user profiles
- Secure session management

### 🎵 **Live Music Sessions**

- **Real-time song synchronization** across all connected users
- **Admin-controlled scrolling** with automatic line revelation
- **Role-based content display:**
  - Vocals: See lyrics only
  - Other instruments: See chords + lyrics with proper alignment
- **Multi-language support** with RTL/LTR text direction (Hebrew/English)

### 🎛️ **Admin Controls**

- Song search and selection from library
- Real-time session control (play/pause/reset)
- Song switching during live sessions
- Session management (start/end sessions)

### 📱 **Modern UI/UX**

- Fully responsive design (mobile to desktop)
- Beautiful glass-morphism UI with gradient backgrounds
- Smooth animations and transitions
- Touch-friendly controls for mobile devices

### 🌐 **Real-time Communication**

- WebSocket-powered live updates using Socket.io
- Automatic reconnection handling
- Low-latency synchronization between admin and users

---

## 🛠️ Tech Stack

### **Frontend:**

- ⚛️ React 19 + TypeScript + Vite
- 🎨 Tailwind CSS + ShadCN UI components
- 🧭 React Router for navigation
- 🔌 Socket.IO client for real-time features
- 📡 Axios for API communication
- ✅ Zod for validation

### **Backend:**

- 🟢 Node.js + Express + TypeScript
- 🗄️ MongoDB + Mongoose
- 🔌 Socket.IO server for real-time communication
- 🔐 JWT authentication with bcrypt
- ✅ Zod validation schemas
- 🌐 CORS enabled

---

## 📁 Project Structure

```
/client      # Frontend (Vite + React + Tailwind + ShadCN UI)
/server      # Backend (Node.js + Express + MongoDB + Socket.IO)

JaMoveo/
├── Frontend/ # React + TypeScript client
│ ├── src/
│ │ ├── components/ # Reusable UI components
│ │ ├── pages/ # Page components
│ │ ├── hooks/ # Custom React hooks
│ │ ├── sockets/ # Socket.io client logic
│ │ ├── types/ # TypeScript definitions
│ │ └── validations/ # Zod schemas
│ └── package.json
├── Backend/ # Node.js + Express server
│ ├── src/
│ │ ├── controllers/ # Route handlers
│ │ ├── middleware/ # Auth & validation middleware
│ │ ├── models/ # MongoDB schemas
│ │ ├── routes/ # API routes
│ │ ├── sockets/ # Socket.io server logic
│ │ └── data/ # Song library (JSON files)
│ └── package.json

```

---

## 🚀 Quick Start

### Prerequisites

- Node.js (v18+)
- MongoDB database
- Git

### 1. Clone & Setup

```bash
git clone <repository-url>
cd JaMoveo
```

### 2. Backend Setup

```bash
cd Backend
npm install

# Create .env file
echo "PORT=3001
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key
FRONTEND_URL=http://localhost:5173" > .env

npm run dev
```

### 3. Frontend Setup

```bash
cd ../Frontend
npm install

# Create .env file
echo "VITE_API_BASE_URL=http://localhost:3001/api
VITE_SOCKET_URL=http://localhost:3001" > .env

npm run dev
```

### 4. Access the App

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:3001/api

---

## 👥 User Workflows

### **For Band Leaders (Admins):**

1. Sign up as admin → Search songs → Select song → Start session
2. Control scrolling with play/pause button
3. Switch songs or end session anytime

### **For Musicians (Users):**

1. Sign up with instrument → Wait in lobby → Join when admin selects song
2. View content based on role (vocals see lyrics only)
3. Auto-follow admin's scrolling

---

## 🔌 WebSocket Events

| Event                  | Direction       | Description                     |
| ---------------------- | --------------- | ------------------------------- |
| `join-session`         | Client → Server | User joins rehearsal room       |
| `select-song`          | Client → Server | Admin broadcasts song selection |
| `song-selected`        | Server → Client | Song data sent to all users     |
| `update-visible-lines` | Client → Server | Admin reveals new lines         |
| `lines-updated`        | Server → Client | Line count update to users      |
| `song-changing`        | Server → Client | Admin switching songs           |
| `quit-session`         | Client → Server | Admin ends session              |
| `session-ended`        | Server → Client | Session terminated notification |

---

## 🌍 Multi-Language Support

- **Hebrew:** Right-to-left text rendering with proper font support
- **English:** Left-to-right standard layout
- Automatic detection based on song language property
- Proper word spacing and alignment for both languages

---

## 📱 Responsive Design

- **Mobile (< 640px):** Compact layout, touch-friendly controls
- **Tablet (640px - 1024px):** Medium layout with good readability
- **Desktop (> 1024px):** Full layout with large text for stage visibility

---

## 🏗️ Architecture Highlights

- **Custom React Hooks:** Clean separation of concerns (useUserRole, useScrolling, useLivePageSocket)
- **Component-based UI:** Reusable ShadCN components with consistent theming
- **Real-time State Management:** Synchronized state across all connected clients
- **Error Handling:** Graceful reconnection and error recovery
- **TypeScript:** Full type safety across frontend and backend

---

## 🎯 Future Enhancements

- [ ] Song upload functionality for admins
- [ ] Playlist/queue management
- [ ] Recording session history
- [ ] Advanced search filters (genre, key, tempo)
- [ ] User preferences and settings
- [ ] Export session data
- [ ] Integration with music streaming services

---
