import { configuration } from "./configuration";
import { Logger } from "./utils";
import { Server } from 'socket.io';
import { readFileSync } from "fs";
import { createServer, ServerOptions } from "https";
import express from "express";
import cors from "cors";

const options: ServerOptions = {
  key: readFileSync("/path/to/my/key.pem"),
  cert: readFileSync("/path/to/my/cert.pem")
}

const app = express();
app.use(cors())
const httpsServer = createServer(options, app);

const io = new Server(httpsServer, {});

io.on('connection', (socket) => {
  console.log(socket);
});

httpsServer.listen(configuration.port);
