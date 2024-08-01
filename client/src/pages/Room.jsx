import React, { useContext, useEffect, useState } from "react";
import HomeLayout from "../components/HomeLayout";
import { useParams } from "react-router-dom";
import { CopyToClipboard } from "react-copy-to-clipboard";
import toast from "react-hot-toast";
import { SocketContext } from "../context/SocketContext";
import UserMediaPlayer from "../components/UserMediaPlayer";
import MyStream from "../components/MyStream";

const Room = () => {
  const { id } = useParams();

  const { socket, user, stream, peers } = useContext(SocketContext);

  useEffect(() => {
    if (user && id) {
      socket.emit("join-room", { roomId: id, peerId: user.id });
    }
  }, [socket, user, id]);

  const handleCopyNotification = () => {
    toast.success(
      "Room URL copied to clipboard! Share it with others to join."
    );
  };

  const currentUrl = window.location.href;

  return (
    <HomeLayout>
      <div className="relative mb-6">
        <div className="flex flex-col items-center space-y-4 p-6">
          <CopyToClipboard text={currentUrl} onCopy={handleCopyNotification}>
            <button className="bg-blue-600 text-white py-2 px-6 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
              Copy Room URL
            </button>
          </CopyToClipboard>
        </div>
        <div className="bg-gray-500 h-[1px] w-full"></div>
      </div>
      <div className="relative h-screen bg-gray-900">
        <div className="absolute top-[100px] left-1/2 transform -translate-x-1/2 border-4 border-blue-500 rounded-lg">
          <MyStream stream={stream} className="w-full h-full object-cover" />
        </div>

        {/* Participant stream */}
        {Object.keys(peers).length > 0 ? (
          <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-4 overflow-auto">
            {Object.keys(peers).map((eachPeerId) => (
              <div
                key={eachPeerId}
                className="relative w-36 h-36 bg-gray-800 border-4 border-green-500 rounded-lg overflow-hidden shadow-lg"
              >
                <UserMediaPlayer
                  stream={peers[eachPeerId].stream}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 w-full bg-gray-900 bg-opacity-80 text-white text-center text-xs py-1 rounded-b-lg shadow-md">
                  Participant {eachPeerId}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="w-full text-center text-3xl font-semibold text-white bg-gray-800 p-4 rounded-lg shadow-lg">
            No users are connected in this room.
          </div>
        )}
      </div>
    </HomeLayout>
  );
};

export default Room;
