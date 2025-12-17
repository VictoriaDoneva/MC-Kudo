import express from 'express';
import http from 'http';
import cors from 'cors';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);

// ✅ Allow CORS (required for Netlify / frontend)
app.use(cors());

// ✅ Simple health check (VERY IMPORTANT)
app.get('/', (_req, res) => {
  res.send('✅ Socket.IO backend is running');
});

// ✅ Create Socket.IO server
const io = new Server(server, {
  cors: {
    origin: '*', // you can restrict later
    methods: ['GET', 'POST']
  }
});

// ✅ Handle socket connections
io.on('connection', (socket) => {
  console.log('✅ New client connected:', socket.id);

  socket.on('disconnect', () => {
    console.log('❌ Client disconnected:', socket.id);
  });

  // (Later you can add add-wish, update-wish, etc.)
});

// ✅ IMPORTANT: Render provides the PORT
const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
