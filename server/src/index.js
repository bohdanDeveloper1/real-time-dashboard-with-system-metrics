import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';
import { calculateSystemMetrixService } from './services/CalculateSystemMetrixService.js';


dotenv.config();

// step 1: create express app
const app = express();
const server = createServer(app);

// step 2: configure socket.io server 
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});


app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

const activeUserIds = [];

// step 3: Socket.io connection handling (Listens for new client connections) 
io.on('connection', async (socket) => {
  activeUserIds.push(socket.id);
  
  // Send initial data for connected client
  socket.emit('data', await generateResponseData());
  
  // Handle client disconnection
  socket.on('disconnect', () => {
    activeUserIds.splice(activeUserIds.indexOf(socket.id), 1);
  });
  
  // Handle client requests for data
  socket.on('requestData', async () => {
    socket.emit('data', await generateResponseData());
  });
});

async function generateResponseData() {
  const systemMetrics = await calculateSystemMetrixService.getSystemMetrics();

  const data = {
    timestamp: new Date().toISOString(),
    metrics: systemMetrics,
    users: activeUserIds.length,
  };
  
  return data;
}

// step 4: Start periodic data emission (Emits data to all connected clients every 2 seconds)
setInterval(async () => {
  const data = await generateResponseData();
  io.emit('data', data);
}, 2000);

const PORT = 3001;

server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 WebSocket server ready for connections`);
  console.log(`🔗 Health check: http://localhost:${PORT}/health`);
}); 