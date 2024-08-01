import React, { useEffect, useRef, useState } from "react";

const MyStream = ({ stream }) => {
  const videoRef = useRef();

  useEffect(() => {
    if (stream && videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  return (
    <div className=" relative">
      <h1 className=" text-white bg-transparent text-center font-bold text-3xl">
        My Stream
      </h1>
      <video ref={videoRef} autoPlay />
    </div>
  );
};

export default MyStream;
