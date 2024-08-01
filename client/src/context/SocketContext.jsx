import { createContext, useEffect, useState } from "react";
import SocketIoClient from "socket.io-client";
import { useNavigate } from "react-router-dom";
import { v4 as UUIDV4 } from "uuid";
import Peer from "peerjs";

const SocketContext = createContext(null);

const BACKEND_URL = "http://localhost:8000"

const socket = SocketIoClient(BACKEND_URL, {
  withCredentials: true,
  transports: ["polling", "websocket"],
});

const SocketProvider = ({ children }) => {
  const [stream, setStream] = useState(null);
  const [user, setUser] = useState(null);
  const [peers, setPeers] = useState({});

  const navigate = useNavigate();

  const navigateToRoom = ({ roomId }) => {
    navigate(`/room/${roomId}`);
  };

  const fetchMediaStream = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    setStream(stream);
  };

  useEffect(() => {
    const userId = UUIDV4();
    const newPeer = new Peer(userId, {
      host: "localhost",
      port: 9000,
      path: "/myapp",
    });
    setUser(newPeer);
    fetchMediaStream();
  }, []);

  useEffect(() => {
   
    if (!user || !stream) return;

    socket.emit("ready");
    socket.on("user-joined", ({ peerId }) => {
      const call = user.call(peerId, stream);
      call.on("stream", () => {
        setPeers((prevPeers) => ({
          ...prevPeers,
          [peerId]: { stream },
        }));
      });
    });

    user.on("call", (call) => {
      call.answer(stream);
      call.on("stream", () => {
        setPeers((prevPeers) => ({
          ...prevPeers,
          [call.peer]: { stream },
        }));
      });
    });
  }, [stream, user]);




  socket.on("room-created", navigateToRoom);

  return (
    <SocketContext.Provider value={{ socket, user, stream, peers, setUser, setStream }}>
      {children}
    </SocketContext.Provider>
  );
};

export { SocketContext, SocketProvider };

