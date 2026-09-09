# Realtime Chat Application

A full-stack, production-ready realtime chat platform built with modern web technologies. This application enables users to communicate instantly with real-time message delivery, media sharing, online presence tracking, and a responsive user interface.

## 📋 Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Installation & Setup](#installation--setup)
- [Environment Configuration](#environment-configuration)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Database Schema](#database-schema)
- [Real-time Features](#real-time-features)
- [Authentication & Security](#authentication--security)
- [Media Management](#media-management)
- [Deployment](#deployment)
- [Development Workflow](#development-workflow)

---

## 🎯 Overview

This realtime chat application is engineered for performance and scalability, combining a robust Express.js backend with a modern React frontend. The architecture supports:

- **Bi-directional Communication**: WebSocket-based real-time messaging via Socket.io
- **User Presence Tracking**: Live online/offline status updates
- **Media Sharing**: Image and video upload capabilities with ImageKit CDN integration
- **Secure Authentication**: JWT-based auth via Clerk, with server-side verification
- **Persistent Data Layer**: MongoDB with optimized aggregation queries
- **Responsive Design**: Mobile-first UI with TailwindCSS and HeroUI component library
- **Container Ready**: Docker multi-stage build for production deployment

---

## ✨ Key Features

### Core Messaging Features
- **Real-time Messages**: Instant message delivery using WebSocket connections
- **Conversation Threading**: Maintain message history between user pairs
- **Bi-directional Communication**: Send and receive messages in real-time
- **Read Receipts**: Timestamps on all messages for context

### User Management
- **Authentication**: Secure sign-up/sign-in via Clerk (passwordless)
- **User Profiles**: Profile pictures, full names, and email storage
- **Online Presence**: See which users are currently online
- **User Discovery**: Browse all users and initiate conversations

### Media Features
- **Image Sharing**: Upload and share images in conversations
- **Video Sharing**: Share video content inline
- **CDN Integration**: ImageKit handles media storage, transformation, and delivery
- **Upload Validation**: File type and size restrictions

### UI/UX
- **Theme Customization**: Dark/light mode toggle with persistent preferences
- **Wallpaper Selection**: Customizable chat background themes
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Real-time Typing Indicators**: See when someone is typing (foundation in place)
- **Keyboard Shortcuts**: Sound notifications for new messages

### Developer Experience
- **Hot Module Reloading**: Instant feedback during development (Vite)
- **ESM Modules**: Modern JavaScript module system
- **API Health Checks**: Liveness probe endpoint for orchestration platforms
- **Structured Logging**: Console logging for debugging

---

## 🛠 Tech Stack

### Backend
| Layer | Technology | Version | Purpose |
|-------|-----------|---------|---------|
| **Runtime** | Node.js | 22 LTS | JavaScript execution |
| **Framework** | Express.js | ^5.2.1 | HTTP server & REST API |
| **Real-time** | Socket.io | ^4.8.3 | WebSocket management |
| **Database** | MongoDB | 9.7.1+ | Document store |
| **ODM** | Mongoose | ^9.7.1 | Schema validation & querying |
| **Auth** | Clerk Express | ^2.1.31 | Authentication service |
| **Media** | ImageKit SDK | ^7.10.0 | Image/video hosting & CDN |
| **File Upload** | Multer | ^2.2.0 | Multipart form handling |
| **CORS** | cors | ^2.8.6 | Cross-origin requests |
| **Scheduling** | cron | ^4.4.0 | Background jobs (production) |
| **Config** | dotenv | ^17.4.2 | Environment management |
| **Dev Tools** | Nodemon | ^3.1.14 | Auto-reload on file changes |

### Frontend
| Layer | Technology | Version | Purpose |
|-------|-----------|---------|---------|
| **Runtime** | React | ^19.2.6 | UI framework |
| **Build Tool** | Vite | ^8.0.12 | Fast bundler & dev server |
| **Styling** | TailwindCSS | ^4.3.3 | Utility-first CSS |
| **Components** | HeroUI | ^3.2.4 | Pre-built React components |
| **Routing** | React Router | ^7.18.2 | Client-side routing |
| **State Mgmt** | Zustand | ^5.0.15 | Lightweight state store |
| **WebSocket** | Socket.io Client | ^4.8.3 | Real-time communication |
| **HTTP Client** | Axios | ^1.20.0 | Promise-based HTTP |
| **Auth** | Clerk React | ^6.11.1 | Authentication UI & hooks |
| **Icons** | Lucide React | ^1.34.0 | Icon library |
| **Notifications** | React Hot Toast | ^2.6.0 | Toast notifications |
| **Compiler** | Babel | ^7.29.0 | React compiler plugin |
| **Linting** | ESLint | ^10.3.0 | Code quality |

### Infrastructure
- **Containerization**: Docker with multi-stage builds
- **Base Image**: `node:22-bookworm-slim` (security-focused, minimal)

---

## 🏗 Architecture

### System Design

```
┌─────────────────────────────────────────────────────────────┐
│                     Browser / Client                         │
│  ┌──────────────────────────────────────────────────────┐   │
│  │      React App (Vite SPA)                            │   │
│  │  ┌──────────────────────────────────────────────┐   │   │
│  │  │ Components (Auth, Chat, Settings)            │   │   │
│  │  │ Zustand Stores (Auth, Chat state)            │   │   │
│  │  └──────────────────────────────────────────────┘   │   │
│  └──────────────────────────────────────────────────────┘   │
│              │                          │                    │
│              │ HTTP/REST API            │ WebSocket          │
│              ↓                          ↓                    │
└─────────────────────────────────────────────────────────────┘
          │                          │
          ↓                          ↓
┌────────────────────────────────────────────────────────────┐
│              Express.js Server                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ Routes                                               │  │
│  │ ├─ /api/auth (Clerk validation)                      │  │
│  │ ├─ /api/messages (message CRUD)                      │  │
│  │ └─ /health (liveness probe)                          │  │
│  └──────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ Socket.io Server                                     │  │
│  │ ├─ User connection tracking                          │  │
│  │ ├─ Online status broadcasting                        │  │
│  │ ├─ Real-time message delivery                        │  │
│  │ └─ Disconnect handling                               │  │
│  └──────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ Middleware & Libraries                               │  │
│  │ ├─ Clerk Auth (token validation)                     │  │
│  │ ├─ CORS (origin restriction)                         │  │
│  │ ├─ Multer (file uploads)                             │  │
│  │ ├─ ImageKit (media CDN)                              │  │
│  │ ├─ Mongoose (DB queries)                             │  │
│  │ └─ Cron Jobs (production cleanup)                    │  │
│  └──────────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────┘
          │                              │
          ↓                              ↓
┌──────────────────────┐      ┌─────────────────────────┐
│   MongoDB Atlas      │      │  ImageKit CDN           │
│ - Users             │      │ - Image Storage         │
│ - Messages          │      │ - Video Storage         │
│ - Message History   │      │ - CDN Delivery          │
│ - Online Presence   │      │ - URL Transformation    │
└──────────────────────┘      └─────────────────────────┘
          │
          ↓
┌─────────────────────────────────────────────────────────┐
│              Clerk Auth Service                          │
│ - Token Validation                                       │
│ - User Management                                        │
└─────────────────────────────────────────────────────────┘
```

### Data Flow - Message Sending

```
1. User Types Message in Frontend
   ↓
2. React Component captures input
   ↓
3. Axios POST to /api/messages/:receiverId
   (includes image/video file if attached)
   ↓
4. Express Route Handler receives request
   ↓
5. Auth Middleware validates Clerk token
   ↓
6. Multer processes file upload (if present)
   ↓
7. ImageKit SDK uploads media (if present)
   ↓
8. Message saved to MongoDB with:
   - senderId, receiverId
   - text content
   - media URLs
   - timestamps
   ↓
9. Socket.io broadcasts message to receiver
   (if connected)
   ↓
10. Receiver's Socket connection receives event
    ↓
11. Zustand store updates with new message
    ↓
12. React re-renders message in UI
```

---

## 📁 Project Structure

```
Realtime Chat Application/
├── Dockerfile                  # Multi-stage production build
├── README.md                   # This file
│
├── backend/                    # Express.js API Server
│   ├── package.json           # Backend dependencies
│   ├── src/
│   │   ├── index.js           # Server entry point
│   │   ├── controllers/       # Request handlers
│   │   │   ├── auth.controller.js      # Auth check endpoint
│   │   │   └── message.controller.js   # Message CRUD operations
│   │   ├── routes/            # API route definitions
│   │   │   ├── auth.route.js          # /api/auth routes
│   │   │   └── message.route.js       # /api/messages routes
│   │   ├── models/            # Mongoose schemas
│   │   │   ├── user.model.js          # User document schema
│   │   │   └── message.model.js       # Message document schema
│   │   ├── middleware/        # Express middleware
│   │   │   ├── auth.middleware.js     # Clerk token validation
│   │   │   └── upload.middleware.js   # File upload config
│   │   ├── lib/               # Utility libraries
│   │   │   ├── db.js                  # MongoDB connection
│   │   │   ├── socket.js              # Socket.io setup & handlers
│   │   │   ├── imagekit.js            # ImageKit SDK wrapper
│   │   │   └── cron.js                # Background jobs
│   │   ├── seeds/             # Data seeding scripts
│   │   │   └── user.seed.js           # Sample user data
│   │   └── webhooks/          # External service integrations
│   │       └── clerk.webhook.js       # Clerk user sync
│   └── dist/                  # Compiled output (build target)
│
├── frontend/                  # React + Vite SPA
│   ├── package.json          # Frontend dependencies
│   ├── index.html            # HTML entry point
│   ├── vite.config.js        # Vite bundler config
│   ├── eslint.config.js      # ESLint rules
│   ├── public/               # Static assets
│   │   ├── sounds/           # Notification sounds
│   │   └── wallpapers/       # Chat background images
│   ├── src/
│   │   ├── index.css         # Global styles
│   │   ├── main.jsx          # React entry point
│   │   ├── App.jsx           # Root component & routing
│   │   ├── components/       # Reusable components
│   │   │   ├── AppLogo.jsx           # Branding
│   │   │   ├── PageLoader.jsx        # Loading state
│   │   │   ├── ThemeToggle.jsx       # Dark/light mode
│   │   │   ├── ThemePresetPicker.jsx # Color themes
│   │   │   ├── WallpaperPicker.jsx   # Background selector
│   │   │   └── auth/                 # Auth page components
│   │   │   │   ├── AuthActionPanel.jsx
│   │   │   │   ├── AuthCardShell.jsx
│   │   │   │   ├── AuthHeader.jsx
│   │   │   │   ├── AuthHeroPanel.jsx
│   │   │   │   └── AuthHeroPattern.jsx
│   │   │   └── chat/                 # Chat page components
│   │   │       ├── AvatarWithOnlineIndicator.jsx
│   │   │       ├── ChatComposer.jsx         # Message input
│   │   │       ├── ChatHeader.jsx           # Chat toolbar
│   │   │       ├── ChatSidebar.jsx          # Conversation list
│   │   │       ├── ConversationRow.jsx      # Conversation item
│   │   │       ├── MessageBubble.jsx        # Message display
│   │   │       ├── MessageList.jsx          # Message container
│   │   │       ├── MessageVideo.jsx         # Video player
│   │   │       └── NoConversationPlaceholder.jsx
│   │   ├── context/          # React Context API
│   │   │   ├── theme.js               # Theme config
│   │   │   ├── ThemeContext.jsx       # Theme provider
│   │   │   ├── wallpaper.js           # Wallpaper config
│   │   │   └── WallpaperContext.jsx   # Wallpaper provider
│   │   ├── pages/            # Page-level components
│   │   │   ├── AuthPage.jsx           # Sign in/up
│   │   │   └── ChatPage.jsx           # Main chat interface
│   │   ├── store/            # Zustand state management
│   │   │   ├── useAuthStore.js        # Auth & socket state
│   │   │   └── useChatStore.js        # Chat/message state
│   │   ├── lib/              # Utility libraries
│   │   │   ├── axios.js               # HTTP client config
│   │   │   ├── imagekit.js            # ImageKit SDK
│   │   │   └── utils.js               # Helper functions
│   │   ├── hooks/            # Custom React hooks
│   │   │   ├── useKeyboardSound.js    # Sound notifications
│   │   │   ├── useMediaQuery.js       # Responsive design
│   │   │   ├── useScrollToBottom.js   # Auto-scroll messages
│   │   │   └── useSelectedConversation.js
│   │   ├── data/             # Static data
│   │   │   ├── herouiThemePresets.js  # Theme colors
│   │   │   └── wallpapers.js          # Wallpaper list
│   │   └── styles/           # CSS modules & themes
│   │       └── heroui-theme-presets.css
│   └── dist/                 # Built SPA (build target)
```

---

## 🚀 Installation & Setup

### Prerequisites

- **Node.js**: 22.x LTS or higher
- **npm**: 10.x or higher
- **MongoDB**: Local instance or Atlas connection string
- **Git**: For version control
- **Clerk Account**: For authentication (free tier available)
- **ImageKit Account**: For media hosting (optional but recommended)

### Step 1: Clone Repository

```bash
git clone https://github.com/PranavbalajiGit/Realtime-Chat-Application.git
cd Realtime-Chat-Application
```

### Step 2: Install Backend Dependencies

```bash
cd backend
npm install
```

### Step 3: Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

### Step 4: Environment Configuration

Create `.env` files in both backend and frontend directories (see [Environment Configuration](#environment-configuration) section below).

### Step 5: Database Setup (Optional - Seed Users)

```bash
cd backend
npm run db:seed
```

This populates MongoDB with sample user data for testing.

---

## 🔧 Environment Configuration

### Backend Environment Variables

Create `backend/.env`:

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Database
MONGO_URI=mongodb://localhost:27017/realtime-chat
# OR for MongoDB Atlas:
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/realtime-chat?retryWrites=true&w=majority

# Frontend Origin (CORS)
FRONTEND_URL=http://localhost:5173

# Clerk Authentication
CLERK_SECRET_KEY=your_clerk_secret_key_here

# ImageKit (Optional - for media uploads)
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/yourusername
```

### Frontend Environment Variables

Create `frontend/.env`:

```env
# API Configuration
VITE_API_URL=http://localhost:3000
# In production, leave empty to use same origin:
# VITE_API_URL=

# Clerk Public Key (embed in client JS)
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key_here
```

**Important Security Notes:**
- Never commit `.env` files to version control
- Use `.env.example` as a template for developers
- Clerk provides different keys for development and production
- ImageKit URLs should not expose private keys in frontend code

---

## ▶️ Running the Application

### Development Mode

#### Terminal 1 - Backend (Port 3000)

```bash
cd backend
npm run dev
```

Starts Express server with hot-reload via Nodemon.

#### Terminal 2 - Frontend (Port 5173)

```bash
cd frontend
npm run dev
```

Starts Vite dev server with HMR enabled.

#### Access the Application

- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:3000/api`
- WebSocket endpoint: `ws://localhost:3000` (auto-managed by Socket.io)

### Production Mode

#### Build Frontend

```bash
cd frontend
npm run build
# Output: dist/
```

#### Build Backend

```bash
cd backend
npm run build
# Output: dist/
```

#### Build Docker Image

```bash
docker build \
  --build-arg VITE_CLERK_PUBLISHABLE_KEY=your_key \
  -t realtime-chat-app:latest .
```

#### Run Docker Container

```bash
docker run \
  -p 3001:3001 \
  -e MONGO_URI=mongodb+srv://... \
  -e CLERK_SECRET_KEY=... \
  -e FRONTEND_URL=https://yourdomain.com \
  -e NODE_ENV=production \
  realtime-chat-app:latest
```

---

## 📡 API Documentation

### Authentication

All protected endpoints require a valid Clerk token in the `Authorization` header.

```
Authorization: Bearer <clerk_jwt_token>
```

### Endpoints

#### Auth Routes

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| **GET** | `/api/auth/check` | ✅ Required | Verify user is authenticated |
| **GET** | `/health` | ❌ Public | Health check for load balancers |

**GET /api/auth/check**

Returns the authenticated user object.

```bash
curl -H "Authorization: Bearer <token>" http://localhost:3000/api/auth/check
```

Response:
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "clerkId": "user_abc123",
  "email": "user@example.com",
  "fullName": "John Doe",
  "profilePic": "https://ik.imagekit.io/...",
  "createdAt": "2024-01-15T10:00:00Z",
  "updatedAt": "2024-01-15T10:00:00Z"
}
```

#### Message Routes

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| **GET** | `/api/messages/users` | ✅ | Get all users for sidebar |
| **GET** | `/api/messages/conversations` | ✅ | Get user's recent conversations |
| **GET** | `/api/messages/:userId` | ✅ | Get message history with user |
| **POST** | `/api/messages/:receiverId` | ✅ | Send message (with optional media) |

**GET /api/messages/users**

Retrieves all users except the logged-in user.

```bash
curl -H "Authorization: Bearer <token>" http://localhost:3000/api/messages/users
```

Response:
```json
[
  {
    "_id": "507f1f77bcf86cd799439012",
    "email": "alice@example.com",
    "fullName": "Alice Smith",
    "profilePic": "https://ik.imagekit.io/..."
  },
  {
    "_id": "507f1f77bcf86cd799439013",
    "email": "bob@example.com",
    "fullName": "Bob Johnson",
    "profilePic": ""
  }
]
```

**GET /api/messages/conversations**

Returns recent conversations sorted by latest message time, with efficient MongoDB aggregation:

```bash
curl -H "Authorization: Bearer <token>" http://localhost:3000/api/messages/conversations
```

Response:
```json
[
  {
    "_id": "507f1f77bcf86cd799439012",
    "email": "alice@example.com",
    "fullName": "Alice Smith",
    "profilePic": "https://ik.imagekit.io/..."
  }
]
```

**GET /api/messages/:userId**

Retrieves message history between logged-in user and specified user (bidirectional).

```bash
curl -H "Authorization: Bearer <token>" http://localhost:3000/api/messages/507f1f77bcf86cd799439012
```

Response:
```json
[
  {
    "_id": "60d5ec49f1b2c72b8c8e4a1a",
    "senderId": "507f1f77bcf86cd799439011",
    "receiverId": "507f1f77bcf86cd799439012",
    "text": "Hey, how are you?",
    "image": null,
    "video": null,
    "createdAt": "2024-01-15T10:05:00Z",
    "updatedAt": "2024-01-15T10:05:00Z"
  }
]
```

**POST /api/messages/:receiverId**

Sends a message. Accepts text, image, or video via multipart/form-data.

```bash
# Text message
curl -X POST \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"text":"Hello!"}' \
  http://localhost:3000/api/messages/507f1f77bcf86cd799439012

# With image
curl -X POST \
  -H "Authorization: Bearer <token>" \
  -F "text=Check this out!" \
  -F "file=@/path/to/image.jpg" \
  http://localhost:3000/api/messages/507f1f77bcf86cd799439012
```

Response:
```json
{
  "_id": "60d5ec49f1b2c72b8c8e4a2a",
  "senderId": "507f1f77bcf86cd799439011",
  "receiverId": "507f1f77bcf86cd799439012",
  "text": "Check this out!",
  "image": "https://ik.imagekit.io/...",
  "video": null,
  "createdAt": "2024-01-15T10:10:00Z"
}
```

---

## 💾 Database Schema

### User Model

```javascript
{
  clerkId: String,          // Clerk's unique identifier (indexed)
  email: String,            // User email (indexed, unique)
  fullName: String,         // Display name
  profilePic: String,       // ImageKit URL or empty
  createdAt: Date,          // Auto-managed by Mongoose
  updatedAt: Date           // Auto-managed by Mongoose
}
```

**Indexes:**
- `clerkId` (unique)
- `email` (unique)

### Message Model

```javascript
{
  senderId: ObjectId,       // Reference to User._id
  receiverId: ObjectId,     // Reference to User._id
  text: String,             // Message body (optional)
  image: String,            // ImageKit URL (optional)
  video: String,            // ImageKit URL (optional)
  createdAt: Date,          // Auto-set to current time
  updatedAt: Date           // Auto-managed by Mongoose
}
```

**Relationships:**
- `senderId` → User (one-to-many)
- `receiverId` → User (one-to-many)

**Indexes (recommended):**
- Compound: `{senderId, receiverId, createdAt}`
- Single: `{createdAt}` (for sorting)

---

## 🔌 Real-time Features

### Socket.io Architecture

#### Connection Flow

1. **Frontend Initiates Connection**
   ```javascript
   // src/store/useAuthStore.js
   const socket = io(BASE_URL, { 
     query: { userId: user._id } 
   });
   ```

2. **Backend Accepts Connection**
   ```javascript
   // backend/src/lib/socket.js
   io.on("connection", (socket) => {
     const userId = socket.handshake.query.userId;
     userSocketMap[userId] = socket.id;
     io.emit("getOnlineUsers", Object.keys(userSocketMap));
   });
   ```

3. **Broadcasting Online Status**
   - When a user connects, server broadcasts all online user IDs
   - Frontend stores list in Zustand: `onlineUsers`
   - UI displays online indicator next to user avatars

#### Events Specification

| Event | Direction | Payload | Purpose |
|-------|-----------|---------|---------|
| `getOnlineUsers` | Server → Client | `Array<userId>` | Broadcast all online users |
| `disconnect` | Server event | N/A | Handle user disconnect |

#### Message Delivery Flow

```
Frontend (Sender)
  ↓
POST /api/messages/:receiverId
  ↓
Backend validates & saves to MongoDB
  ↓
Backend checks: getReceiverSocketId(receiverId)
  ↓
If receiver is online:
  └→ Socket.io broadcasts message to receiver
       ↓
       Receiver's frontend receives via Socket
       ↓
       Zustand store updates messages array
       ↓
       React re-renders MessageList
  
If receiver is offline:
  └→ Message saved in DB, delivered when they reconnect
```

### Implementation Details

**Connections per User:**
- Frontend maintains a single Socket connection
- Multiple Socket connections are avoided (performance)
- Same connection used for all real-time events

**User Socket Mapping:**
```javascript
// In-memory map: userId → socketId
userSocketMap = {
  "507f1f77bcf86cd799439011": "sK7b2m9x1P",
  "507f1f77bcf86cd799439012": "aL3jQ8rT2w",
}
```

**Disconnect Handling:**
```javascript
socket.on("disconnect", () => {
  if (userId) delete userSocketMap[userId];
  io.emit("getOnlineUsers", Object.keys(userSocketMap));
});
```

---

## 🔐 Authentication & Security

### Clerk Integration

**Setup:**
1. Create Clerk account at [clerk.com](https://clerk.com)
2. Create an application
3. Obtain public key (for frontend) and secret key (for backend)

**Frontend Flow:**
- Clerk UI handles sign-up, sign-in, and session management
- Token is automatically included in requests via Axios interceptor
- On successful auth, `checkAuth()` is called to sync with backend

**Backend Validation:**
```javascript
// middleware/auth.middleware.js
export async function protectRoute(req, res, next) {
  const { userId } = getAuth(req); // Validates Clerk JWT
  const user = await User.findOne({ clerkId: userId });
  req.user = user; // Attach user to request
  next();
}
```

### Security Measures

| Layer | Measure | Implementation |
|-------|---------|-----------------|
| **Transport** | HTTPS/WSS | Use in production |
| **Auth** | JWT + Clerk | All protected routes validated |
| **CORS** | Origin whitelist | `FRONTEND_URL` env var |
| **Cookies** | Secure/HttpOnly | Handled by Clerk |
| **Webhooks** | Raw body validation | Clerk signature verification |
| **File Upload** | Type checking | Multer config validation |
| **Database** | MongoDB queries | No string concatenation |

### Webhook Security (Clerk)

```javascript
// backend/src/webhooks/clerk.webhook.js
// Clerk signs all webhooks - must validate raw request body
app.use("/api/webhooks/clerk", 
  express.raw({ type: "application/json" }), 
  clerkWebhook
);
```

---

## 📸 Media Management

### ImageKit Integration

ImageKit provides:
- **Cloud Storage**: No need to manage files on server
- **CDN Delivery**: Global content delivery network
- **Transformations**: Resize, crop, compress on-the-fly
- **Security**: Signed URLs, access control

### Upload Flow

```
Client selects image/video
  ↓
Multer middleware processes multipart
  ↓
ImageKit.upload() sends to CDN
  ↓
ImageKit returns public URL
  ↓
URL stored in MongoDB Message document
  ↓
Frontend displays via <img> or <video> tag
```

### Backend Implementation

```javascript
// backend/src/lib/imagekit.js
export async function uploadChatMedia(file) {
  const fileBuffer = file.buffer;
  const fileName = `${Date.now()}_${file.originalname}`;
  
  const result = await imagekit.upload({
    file: fileBuffer,
    fileName: fileName,
    folder: "/chat-media"
  });
  
  return result.url; // Public ImageKit URL
}
```

### File Restrictions

```javascript
// backend/src/middleware/upload.middleware.js
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (req, file, cb) => {
    const allowed = /image|video/;
    if (allowed.test(file.mimetype)) cb(null, true);
    else cb(new Error('Invalid file type'));
  }
});
```

---

## 🐳 Deployment

### Docker Build

The Dockerfile uses a 3-stage build process:

**Stage 1: Frontend Build**
- Installs dependencies
- Builds React app with Vite
- Produces static files in `frontend/dist`

**Stage 2: Backend Build**
- Installs dependencies
- Copies source code
- Runs `npm run build` (ESM compilation)

**Stage 3: Runtime**
- Uses slim base image (`node:22-bookworm-slim`)
- Only includes production dependencies
- Copies built artifacts from previous stages
- Runs Express server on port 3001

### Build Command

```bash
docker build \
  --build-arg VITE_CLERK_PUBLISHABLE_KEY=pk_live_... \
  -t realtime-chat-app:v1.0.0 .
```

### Run Command

```bash
docker run -d \
  --name chat-app \
  -p 3001:3001 \
  -e NODE_ENV=production \
  -e PORT=3001 \
  -e MONGO_URI=mongodb+srv://... \
  -e CLERK_SECRET_KEY=sk_live_... \
  -e FRONTEND_URL=https://yourdomain.com \
  -e IMAGEKIT_PRIVATE_KEY=... \
  -e IMAGEKIT_PUBLIC_KEY=... \
  -e IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/... \
  realtime-chat-app:v1.0.0
```

### Docker Compose (for development)

Create `docker-compose.yml`:

```yaml
version: '3.8'

services:
  mongo:
    image: mongo:7
    ports:
      - "27017:27017"
    environment:
      MONGO_INITDB_DATABASE: realtime-chat
    volumes:
      - mongo-data:/data/db

  app:
    build: .
    ports:
      - "3001:3001"
    environment:
      NODE_ENV: development
      MONGO_URI: mongodb://mongo:27017/realtime-chat
      FRONTEND_URL: http://localhost:3001
      CLERK_SECRET_KEY: ${CLERK_SECRET_KEY}
    depends_on:
      - mongo

volumes:
  mongo-data:
```

Run with:
```bash
docker-compose up
```

### Kubernetes Deployment

Create `k8s/deployment.yaml`:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: realtime-chat-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: realtime-chat
  template:
    metadata:
      labels:
        app: realtime-chat
    spec:
      containers:
      - name: app
        image: your-registry/realtime-chat-app:v1.0.0
        ports:
        - containerPort: 3001
        env:
        - name: NODE_ENV
          value: "production"
        - name: MONGO_URI
          valueFrom:
            secretKeyRef:
              name: app-secrets
              key: mongo-uri
        - name: CLERK_SECRET_KEY
          valueFrom:
            secretKeyRef:
              name: app-secrets
              key: clerk-secret
        livenessProbe:
          httpGet:
            path: /health
            port: 3001
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /health
            port: 3001
          initialDelaySeconds: 10
          periodSeconds: 5
---
apiVersion: v1
kind: Service
metadata:
  name: realtime-chat-service
spec:
  type: LoadBalancer
  ports:
  - port: 80
    targetPort: 3001
  selector:
    app: realtime-chat
```

---

## 🔄 Development Workflow

### Git Workflow

```bash
# Create feature branch
git checkout -b feat/message-search

# Make changes
npm run lint         # Check code quality
npm run dev         # Test locally

# Commit with conventional commits
git add .
git commit -m "feat: add message search functionality"

# Push and create pull request
git push origin feat/message-search
```

### Code Quality

**Linting Frontend:**
```bash
cd frontend
npm run lint
npm run lint -- --fix  # Auto-fix
```

**No backend linting configured** (add ESLint if needed)

### Testing (Optional - Can be Added)

Create test files using Jest:
```bash
npm install --save-dev jest @testing-library/react
npm test
```

### Performance Optimization

#### Frontend
- **Code Splitting**: Vite automatically chunks routes
- **Lazy Loading**: Import components on-demand
- **Minification**: Production build optimization
- **Asset Compression**: Images compressed by ImageKit

#### Backend
- **Aggregation Pipeline**: MongoDB queries optimized
- **Indexing**: Add indexes on frequently queried fields
- **Connection Pooling**: Mongoose manages connection pool
- **Caching**: Add Redis for session/presence caching (future)

### Debugging

**Backend Debugging:**
```bash
# Run with Node debugger
node --inspect dist/index.js

# Use Chrome DevTools: chrome://inspect
```

**Frontend Debugging:**
- Vite dev server includes source maps
- React DevTools browser extension
- Network tab for API monitoring
- Socket.io client debugger

---

## 🌐 Environment Variables Reference

### Complete Backend `.env`

```env
# Application
PORT=3000
NODE_ENV=development

# Database
MONGO_URI=mongodb://localhost:27017/realtime-chat

# Client Origin
FRONTEND_URL=http://localhost:5173

# Authentication
CLERK_SECRET_KEY=sk_test_xxx

# Media (Optional)
IMAGEKIT_PRIVATE_KEY=private_key_xxx
IMAGEKIT_PUBLIC_KEY=public_key_xxx
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/yourname
```

### Complete Frontend `.env`

```env
VITE_API_URL=http://localhost:3000
VITE_CLERK_PUBLISHABLE_KEY=pk_test_xxx
```

---

## 📊 Complexity Analysis

### Time Complexity

| Operation | Complexity | Notes |
|-----------|-----------|-------|
| Send Message | O(1) | Direct insert + socket emit |
| Get Conversations | O(n log n) | n = message count, sorting |
| Get Users | O(u) | u = total users |
| Get Messages | O(m) | m = messages between users |
| Check Online | O(1) | In-memory map lookup |

### Space Complexity

| Component | Complexity | Scaling Notes |
|-----------|-----------|-------|
| User Socket Map | O(u) | u = concurrent users |
| Message Collection | O(m) | m = total messages |
| User Collection | O(u) | u = total users |

### Scalability Considerations

**Current Bottlenecks:**
1. In-memory user socket map (won't survive process restart)
2. Single-process Express server
3. Unbounded message query results

**For Production Scale (1M+ users):**
1. Use Redis for distributed socket mapping
2. Implement horizontal scaling with Socket.io adapter
3. Add pagination/cursor-based message queries
4. Implement caching layer (Redis)
5. Database read replicas for reporting
6. Consider message archival strategy

---

## 🐛 Known Limitations & Future Improvements

### Current Limitations
- [ ] No message search functionality
- [ ] No typing indicators
- [ ] No read receipts / message status
- [ ] No group chats (1-to-1 only)
- [ ] No voice/video calls
- [ ] No end-to-end encryption
- [ ] Limited offline message persistence
- [ ] No message editing/deletion

### Planned Features
- [ ] Full-text message search
- [ ] Typing indicators ("User is typing...")
- [ ] Message reactions (emoji)
- [ ] User presence history
- [ ] Conversation archiving
- [ ] Two-factor authentication
- [ ] Notification preferences
- [ ] Message export/backup

---

## 🤝 Contributing

### Code Standards

1. **Naming Conventions:**
   - Components: `PascalCase`
   - Functions/variables: `camelCase`
   - Constants: `UPPER_SNAKE_CASE`
   - Database fields: `camelCase`

2. **Commit Messages:** Follow Conventional Commits
   ```
   feat: add new feature
   fix: resolve bug
   docs: update documentation
   style: formatting changes
   refactor: code restructuring
   test: add tests
   ```

3. **Code Review Checklist:**
   - [ ] Passes lint checks
   - [ ] No console.log statements (use proper logging)
   - [ ] Environment variables documented
   - [ ] Error handling included
   - [ ] Database queries optimized

---

## 📞 Support & Contact

For issues, questions, or contributions:
- GitHub Issues: [Create an issue](https://github.com/PranavbalajiGit/Realtime-Chat-Application/issues)
- LinkedIN : https://www.linkedin.com/in/pranavbalajitechie/ 

---

## 📄 License

This project is licensed under the ISC License - see LICENSE file for details.

---

**Last Updated:** September 2026  
**Version:** 1.0.0  
**Maintained by:** PRANAV BALAJI P MA 