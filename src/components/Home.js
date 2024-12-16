import React from 'react';
import { Link } from 'react-router-dom';



const Home = () => {
  const features = [
    { path: '/destinations', label: 'Destinations' },
    { path: '/search-and-booking', label: 'Search & Booking' },
    { path: '/find-partner', label: 'Find Partner' },
    { path: '/booking-management', label: 'MY TRIPS' },
  ];

  return (
    <div className="home-container">
      <h1>Welcome to WANDA BUD!</h1>
      <p>Your journey starts here. Explore our features to make your travel seamless and memorable.</p>
      <ul className="home-features">
        {features.map((feature, index) => (
          <li key={index} className="home-feature-item">
            <Link to={feature.path} className="home-link">
              {feature.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
