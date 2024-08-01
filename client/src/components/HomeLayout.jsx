import React from "react";

const HomeLayout = ({ children }) => {
  return (
    <div className="bg-gradient-to-r from-gray-800 via-gray-900 to-black h-[100vh] w-full ">
      {children}
    </div>
  );
};

export default HomeLayout;
