"use client"
// import React from "react";
// import '@/app/style/button.css'


// const Button = ({ text = "Log In", onClick }) => {
//   return (
//     <div
//       aria-label="User Login Button"
//       tabIndex={0}
//       role="button"
//       className="btn"
//       onClick={onClick}
//     >
//       <div className="space-btn"><p className='bbtn-p'>{text}</p></div>
//     </div>
//   );
// };

// export default Button;

import React from "react";
import '@/app/style/button.css'


const Button = ({ text = "Log In", onClick }) => {
  const handleClick = () => {
    if (text === "Book Appointment") {
      window.open('https://calendly.com/strix-ryvon/raj-consultation', '_blank')
    }
    if (onClick) onClick()
  }

  return (
    <div
      aria-label="User Login Button"
      tabIndex={0}
      role="button"
      className="btn"
      onClick={handleClick}
    >
      <div className="space-btn"><p className='bbtn-p'>{text}</p></div>
    </div>
  );
};

export default Button;















