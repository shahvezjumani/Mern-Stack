import React from "react";

const  Container = ({ children }) => {
  return (
    <div className="w-screen h-[70%] text-white mx-auto px-9 ">
      {children}
    </div>
  );
};

export default Container;
 