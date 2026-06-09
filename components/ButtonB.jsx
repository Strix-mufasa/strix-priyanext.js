"use client"
import React from "react";
import '@/app/style/buttonI.css'


const ButtonB = ({ text = "Log In", onClick }) => {
  return (
    <div
      aria-label="User Login Button"
      tabIndex={0}
      role="button"
      className="btn-arr btnb"
      onClick={onClick}
    >
      <p className='btn-p'>{text}</p> <span className="btn-arrow"></span>
    </div>
  );
};

export default ButtonB;
















