import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';
import { calculateSystemMetrixService } from './services/CalculateSystemMetrixService.js';


dotenv.config();

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Socket.io connection handling
io.on('connection', async (socket) => {
  console.log(`Client connected: ${socket.id}`);
  
  // Send initial data
  socket.emit('data', await generateResponseData());
  
  // Handle client disconnection
  socket.on('disconnect', () => {
    console.log(`Client disconnected: ${socket.id}`);
  });
  
  // Handle client requests for data
  socket.on('requestData', async () => {
    socket.emit('data', await generateResponseData());
  });
});

// Mock data generator for live dashboard
async function generateResponseData() {
  const systemMetrics = await calculateSystemMetrixService.getSystemMetrics();

  const data = {
    timestamp: new Date().toISOString(),
    metrics: systemMetrics,
    // todo: fix it
    users: Math.floor(Math.random() * 1000) + 100,
  };
  
  return data;
}

// Start periodic data emission
setInterval(async () => {
  const data = await generateResponseData();
  io.emit('data', data);
}, 2000); // Emit data every 2 seconds

const PORT = 3001;

server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 WebSocket server ready for connections`);
  console.log(`🔗 Health check: http://localhost:${PORT}/health`);
}); 