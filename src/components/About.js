import React from 'react';
import { Link } from 'react-router-dom';

const features = [
  {
    title: 'User Profiles',
    description: 'Personalize your experience by specifying travel preferences, interests, and budget.',
  },
  {
    title: 'Shared Calendar',
    description: 'Plan trips collaboratively with friends and family.',
  },
  {
    title: 'Search and Booking',
    description: 'Find and book your ideal destinations with customized filters.',
  },
  {
    title: 'Booking Management',
    description: 'Easily manage your bookings and cancellations.',
  },
  {
    title: 'User Reviews and Ratings',
    description: 'Share and explore authentic travel experiences.',
  },
];

const About = () => {
  return (
    <div className="about-container">
      <div className="top-link">
        <Link to="/reviews-and-ratings">See Reviews</Link>
      </div>
      <h1>About </h1>
      <p>
        Welcome to WANDA BUD! This platform is designed to make your travel planning
        seamless and enjoyable. Our features cater to every aspect of your journey.
      </p>
      <h2>Key Features</h2>
      <ul className="features-list">
        {features.map((feature, index) => (
          <li key={index}>
            <strong>{feature.title}:</strong> {feature.description}
          </li>
        ))}
      </ul>
      <p>
        Start planning your next adventure with us, and let’s make it unforgettable!
      </p>
    </div>
  );
};

export default About;
