import express from 'express';
import http from 'http';
import cors from 'cors';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);

// ✅ Allow all origins for now
app.use(cors());

// ✅ Create Socket.IO server
const io = new Server(server, {
  cors: {
    origin: '*', // Or restrict to your Netlify domain later
    methods: ['GET', 'POST']
  }
});

// ✅ Handle connections
io.on('connection', (socket) => {
  console.log('✅ New client connected');

  socket.on('disconnect', () => {
    console.log('❌ Client disconnected');
  });

  // Optional: handle wish events here
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
