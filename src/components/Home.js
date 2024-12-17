// import React from 'react';
// import { Link } from 'react-router-dom';



// const Home = () => {
//   const features = [
//     { path: '/destinations', label: 'Destinations' },
//     { path: '/search-and-booking', label: 'Search & Booking' },
//     { path: '/find-partner', label: 'Find Partner' },
//     { path: '/booking-management', label: 'MY TRIPS' },
//   ];

//   return (
//     <div className="home-container">
//       <h1>Welcome to WANDA BUD!</h1>
//       <p>Your journey starts here. Explore our features to make your travel seamless and memorable.</p>
//       <ul className="home-features">
//         {features.map((feature, index) => (
//           <li key={index} className="home-feature-item">
//             <Link to={feature.path} className="home-link">
//               {feature.label}
//             </Link>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Home;


import React from 'react';
import { Link } from 'react-router-dom';
import useFetch from './useFetch';

const Home = () => {
  const features = [
    { path: '/search-and-booking', label: 'Search & Booking' },
    { path: '/find-partner', label: 'Find Partner' },
    { path: '/booking-management', label: 'MY TRIPS' },
  ];

  const { data: destinations, loading, error } = useFetch('https://db-server1.vercel.app/destinations');

  return (
    <div className="home-container">
      <h1>Welcome to WANDA BUD!</h1>
      <p>Your journey starts here. Explore our features to make your travel seamless and memorable.</p>

      <ul className="home-features">
        {features.map((feature, index) => (
          <li key={index} className="home-feature-item">
            <Link to={feature.path} className="home-link" aria-label={`Navigate to ${feature.label}`}>
              {feature.label}
            </Link>
          </li>
        ))}
      </ul>

      <section className="home-destinations">
        <h2>Explore Top Destinations</h2>

        {loading ? (
          <p className="loading-message">Loading destinations...</p>
        ) : error ? (
          <div className="error-message">
            <p>Error: {error}</p>
            <p>Please try refreshing the page or check back later.</p>
          </div>
        ) : (
          <ul className="destinations-list">
            {destinations.slice(0, 4).map((dest) => (
              <li key={dest.id} className="destination-item">
                <h3>{dest.name}</h3>
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="destination-image"
                  style={{ width: '150px', height: 'auto', borderRadius: '8px' }}
                  loading="lazy" // Lazy load the images
                />
                <p>{dest.description}</p>
              </li>
            ))}
          </ul>
        )}

        <Link to="/destinations" className="view-all-link" aria-label="View all destinations">
          View All Destinations
        </Link>
      </section>
    </div>
  );
};

export default Home;
