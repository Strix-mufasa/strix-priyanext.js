import React from 'react';
import '@/app/style/whychoose.css';

const WhyChooseUs = () => {
  return (
    <div className="why-section">

      {/* Main wide card */}
      <div className="why-main-card">
        <h3 className="why-main-title">Design + Development + Production</h3>
        <p className="why-main-sub">No briefing three agencies and chasing handoffs.<br />Everything ships from one studio.</p>
      </div>

      {/* 3 bottom cards */}
      <div className="why-cards-row">
        <div className="why-card why-card-img">
          <img src="/assets/img/upwork-card.png" alt="Upwork" className="why-card-full-img" />
        </div>
        <div className="why-card why-card-img">
          <img src="/assets/img/rating-card.png" alt="5.0 Rating" className="why-card-full-img" />
        </div>
        <div className="why-card why-card-img">
          <img src="/assets/img/projects-card.png" alt="100+ Projects" className="why-card-full-img" />
        </div>
      </div>

    </div>
  );
};

export default WhyChooseUs;