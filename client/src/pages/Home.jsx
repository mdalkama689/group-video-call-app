import React, { useContext, useState } from "react";
import HomeLayout from "../components/HomeLayout";
import { SocketContext } from "../context/SocketContext";

const Home = () => {
  const { socket } = useContext(SocketContext);

  const initializeRoom = () => {
    socket.emit("create-room");
  };

  return (
    <HomeLayout>
      <div className="bg-gradient-to-r from-gray-800 via-gray-900 to-black h-screen w-full flex flex-col items-center justify-center">
        <h1 className="text-white text-3xl mb-8">Welcome to Zoom-like App</h1>
        <div className="flex flex-col space-y-4">
          <button
            onClick={initializeRoom}
            className="bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Start a New Meeting
          </button>
        </div>
      </div>
    </HomeLayout>
  );
};

export default Home;
