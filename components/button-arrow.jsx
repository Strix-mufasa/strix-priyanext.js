"use client"
import React from "react";
import '@/app/style/buttonI.css'


const ButtonArrow = ({ text = "Log In", onClick }) => {
  return (
    <div
      aria-label="User Login Button"
      tabIndex={0}
      role="button"
      className="btn-arr"
      onClick={onClick}
    >
      <div className="space-btn"><p className='big-btn-p'>{text}</p> <span className="btn-arrow"></span></div>
    </div>
  );
};

export default ButtonArrow;
















