import { configuration } from "./configuration";
import { Logger, validateName } from "./utils";
import { 
  ClientToServerEvents, 
  ServerToClientEvents, 
  InterServerEvents, 
  SocketData, 
  Message} from './interfaces'; 
import { Server } from 'socket.io';
import { createServer } from "http";
import express from "express";
import cors from "cors";

const chatRoomName = "main_room";

const MAX_LATEST_MESSAGES = 10;

const latestMessages: Message[] = []

const app = express();
app.use(cors())
const httpsServer = createServer(app);

const io = new Server<
  ClientToServerEvents, 
  ServerToClientEvents, 
  InterServerEvents, 
  SocketData
>(httpsServer, {
  cors: {
    origin: '*',
  }
});

io.on('connection', async (socket) => {
  const { name } = socket.handshake.query;
  if (validateName(name as string | undefined)) {
    socket.data.name = name as string;
    Logger.info(`client ${socket.data.name} (${socket.id}) connected.`);

    const sockets = await io.fetchSockets();
    const nameList = sockets.map((socket) => socket.data.name);
    
    socket.join(chatRoomName);

    socket.emit('initMessages', latestMessages);
    io.to(chatRoomName).emit('clientNameList', nameList);
  } else {
    Logger.warn(`Declined connection from ${socket.id}. Improper name`);
    socket.disconnect();
  }

  socket.on('message', (message) => {
    Logger.info(`Message from ${socket.id}:`, message);
    if (socket.data.name === undefined) {
      socket.disconnect();
      Logger.warn(`Message from un-named client: ${socket.id}. Disconnecting the client.`)
      return;
    }
    if (message.trim() === '') return;
    const newMessage: Message = {
      sender: socket.data.name,
      message,
      timestamp: new Date().toISOString(),
    }
    latestMessages.push(newMessage);
    if (latestMessages.length > MAX_LATEST_MESSAGES) {
      latestMessages.shift();
    }
    io.to(chatRoomName).emit('message', newMessage);
  })

  socket.on('disconnect', async () => {
    Logger.warn(`Disconnect from ${socket.id}`);
    if (socket.data.name === undefined) return;

    const sockets = await io.fetchSockets();
    const nameList = sockets.map((socket) => socket.data.name);
    io.to(chatRoomName).emit('clientNameList', nameList);
    
    Logger.info(`client ${socket.id} disconnected`);
  })

});

httpsServer.listen(configuration.port, () => {
  Logger.info(`App listening to port: ${configuration.port}`);
});
