"use client"
import React from "react";
import Link from 'next/link';
import '@/app/style/normsmallbtn.css'


const BtnNormsall = ({ text = "Log In", onClick, to }) => {
  const button = (
    <div
      tabIndex={0}
      role="button"
      className="btn-norm"
      suppressHydrationWarning={true}
      onClick={onClick}
    >
      <div className="space-btn"><p className='btn-p'>{text}</p></div>
    </div>
  );

  if (to) {
    return <Link href={to}>{button}</Link>;
  }

  return button;
};

export default BtnNormsall;
















