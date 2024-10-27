import { NextApiRequest, NextApiResponse } from 'next';
import { Server as NetServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';

type NextApiResponseWithSocket = NextApiResponse & {
  socket: {
    server: NetServer & {
      io: SocketIOServer;
    };
  };
};

export default function handler(req: NextApiRequest, res: NextApiResponseWithSocket) {
  if (!res.socket.server.io) {
    console.log('Setting up Socket.io');
    const io = new SocketIOServer(res.socket.server);

    io.on('connection', (socket) => {
      console.log('User connected', socket.id);

      socket.on('createRoom', (roomName: string, callback: (msg: string) => void) => {
        socket.join(roomName);
        console.log(`Room ${roomName} created by user ${socket.id}`);
        callback(`Room ${roomName} created successfully`);
      });

      socket.on('joinRoom', (roomName: string) => {
        socket.join(roomName);
        console.log(`User ${socket.id} joined room: ${roomName}`);
      });

      socket.on('leaveRoom', (roomName: string) => {
        socket.leave(roomName);
        console.log(`User ${socket.id} left room: ${roomName}`);
      });

      socket.on('disconnect', () => {
        console.log(`User ${socket.id} disconnected`);
      });
    });

    res.socket.server.io = io;
  } else {
    console.log('Socket.io already running');
  }

  res.end();
}
