# Real-time Dashboard with WebSocket
A dashboard application that displays live system metrics (CPU, Memory, Disk usage) and active users count using WebSocket connections and systeminformation library. Built with React, Node.js, Express, Socket.io, and Tailwind CSS.

## ✨ Features
- 🚀 **Real-time Data**: Live system metrics via WebSocket
- 📊 **Interactive Charts**: SVG-based charts with historical data
- 🎨 **Modern UI**: Clean, responsive design with Tailwind CSS
- 🔄 **Auto-reconnection**: Robust WebSocket connection with automatic reconnection
- 📱 **Responsive**: Works on desktop and mobile devices
- ⚡ **Fast**: Built with Vite for lightning-fast development
- 🎯 **Type-safe**: Modern JavaScript with proper error handling
- 🌐 **Live Status**: Real-time connection status indicator

## 🛠️ Tech Stack
### Frontend
- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **Zustand** - State management
- **Socket.io Client** - WebSocket communication

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **Socket.io** - WebSocket server
- **CORS** - Cross-origin resource sharing

## 🚀 Quick Start and Instalation
### Prerequisites
- Node.js 18+ 
- npm or yarn

**Backend:**
```bash
cd server
npm install
npm run dev
```

**Frontend:**
```bash
cd client
npm install
npm run dev
```

## 📊 Dashboard Features
### 1. Connection Status
- Green pulsing dot for connected status
- Real-time connection monitoring
- Automatic reconnection logic

### 2. Metrics Cards
- CPU, Memory, Disk usage
- Active users count
- Color-coded trend indicators (High/Medium/Low)

### 3. Interactive Charts
- SVG-based line charts with historical data
- Real-time updates every 2 seconds
- Multiple metrics visualization

### 4. Live Events Table
- Color-coded event types (info, warning, error)
- Real-time event streaming
- Timestamp formatting