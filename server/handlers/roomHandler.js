import { v4 as UUIDV4 } from "uuid";

const rooms = {};

const roomHandler = (socket) => {
  const createRoom = () => {
    const roomId = UUIDV4();
    socket.join(roomId);
    rooms[roomId] = [];
    socket.emit("room-created", { roomId });
  };

  const joinRoom = ({ roomId, peerId }) => {
    if (rooms[roomId]) {
      if (peerId) {
        rooms[roomId].push(peerId);
        socket.join(roomId);
      }
    }
    socket.on("ready", () => {
      socket.to(roomId).emit("user-joined", { peerId });
    });
  };

  socket.on("create-room", createRoom);
  socket.on("join-room", joinRoom);
};

export default roomHandler;
