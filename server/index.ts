import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
app.use(cors());

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

let wishes: any[] = [];

io.on('connection', (socket) => {
  console.log('User connected');

  socket.emit('wishes-updated', wishes);

  socket.on('add-wish', (wish) => {
    const newWish = {
      ...wish,
      id: Date.now().toString(),
      timestamp: Date.now(),
    };
    wishes.push(newWish);
    io.emit('wishes-updated', wishes);
  });

  socket.on('add-reaction', (data) => {
    io.emit('reactions-updated', data);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

const PORT = process.env.PORT || 3001;
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
