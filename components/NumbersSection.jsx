import React from 'react';
import '@/app/style/numbers.css';

const cards = [
  {
    logo: "/assets/img/kundali-logo.png",
    logoAlt: "Kundali",
    stat: "50,000+",
    label: "Downloads\nDelivered",
    desc: "App UI/UX redesign that took a dated astrology app to trending on the Play Store.",
  },
  {
    logo: "/assets/img/amilo-logo.png",
    logoAlt: "Amilo Halos",
    stat: "500k+",
    label: "Funds Raised\nIn Pre-Seed",
    desc: "Pitch deck and presentation design that helped close their funding round.",
  },
  {
    logo: null,
    logoAlt: "Structly",
    brandName: "Structly",
    logoWithText: true, 
    stat: "3x",
    label: "Faster\nOnboarding",
    desc: "SaaS dashboard redesign that reduced time-to-value for new users.",
  },
];

const NumbersSection = () => {
  return (
    <div className="numbers-section">
      <div className="numbers-blur" />
      <h2 className="numbers-heading">Design that moves the numbers.</h2>
      <p className="numbers-subheading">
        Every design decision is backed by user behaviour – not personal preference, not trends, not what looked good last year.
      </p>
      <div className="numbers-grid">
        {cards.map((card, i) => (
          <div className="numbers-card" key={i}>
            <div className="numbers-card-logo">
                {card.logo ? (
                    <img src={card.logo} alt={card.logoAlt} />
                ) : (
                    <div className="structly-icon">S</div>
                )}
                {card.logoWithText && (
                    <span className="numbers-brand-name">{card.brandName}</span>
                )}
            </div>
            <div className="numbers-stat">{card.stat}</div>
            <div className="numbers-label">
              {card.label.split('\n').map((line, j) => (
                <span key={j}>{line}<br /></span>
              ))}
            </div>
            <p className="numbers-desc">{card.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NumbersSection;