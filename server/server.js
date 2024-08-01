import app from "./app.js";
import { Server } from "socket.io";
import http from "http";
import { config } from "dotenv";
import roomHandler from "./handlers/roomHandler.js";
config();

const PORT = process.env.PORT || 8000;
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:3000";
const httpServer = http.createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: CLIENT_URL,
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("new user connected with user id : ", socket.id);
  roomHandler(socket);
  socket.on("disconnect", () => {
    console.log("user disconnected with user id : ", socket.id);
  });
});

httpServer.listen(PORT, () => {
  console.log(`backend is running at http://localhost${PORT}`);
});
