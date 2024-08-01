import React, { useEffect, useRef } from "react";

const UserMediaPlayer = ({ stream }) => {
  const videoRef = useRef();

  useEffect(() => {
    if (stream && videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  return (
    <div className=" relative">
      <video ref={videoRef} muted autoPlay />
    </div>
  );
};

export default UserMediaPlayer;
