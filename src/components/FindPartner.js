import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from '../AppContext'; // Import the context
import { useNavigate } from 'react-router-dom';

const FindPartner = () => {
  const [userProfile, setUserProfile] = useState({
    interests: [],
  });
  const [searchQuery, setSearchQuery] = useState(''); // State for interests input
  const [matches, setMatches] = useState([]);
  const [error, setError] = useState(null);
  const [partners, setPartners] = useState([]); // State to hold the fetched partners
  const [selectedPartner, setSelectedPartner] = useState(null); // State to store selected partner
  const { addBooking } = useContext(AppContext); // Access context
  const navigate = useNavigate(); // To navigate to the Shared Calendar page

  // Fetch partners data from db.json using useEffect
  useEffect(() => {
    fetch('https://server1-navy.vercel.app/partners') // URL of the mock API (json-server)
      .then((res) => res.json())
      .then((data) => setPartners(data)) // Store the fetched data in the partners state
      .catch((err) => setError('Failed to fetch partners: ' + err.message));
  }, []);

  // Handle the form submission and filter partners based on user interests
  const handleSearch = () => {
    const filteredMatches = partners.filter((partner) => {
      return partner.interests.some((interest) =>
        userProfile.interests.includes(interest)
      ); // Filter by interest
    });

    if (filteredMatches.length === 0) {
      setError('No matching partner found with these interests.');
    } else {
      setMatches(filteredMatches);
    }
  };

  // Handle partner selection and show profile
  const handlePartnerSelection = (partner) => {
    setSelectedPartner(partner); // Set the selected partner
  };

  // Navigate to Shared Calendar with the selected partner
  const proceedToCalendar = () => {
    navigate('/shared-calendar', { state: { selectedPartner } });
  };

  return (
    <div className="find-partner-container">
      <h1>Find a Travel Partner</h1>

      {/* Input for interests */}
      <div className="interest-input-container">
        <input
          type="text"
          placeholder="Enter your interests (comma separated)..."
          value={userProfile.interests.join(', ')}
          onChange={(e) =>
            setUserProfile({
              ...userProfile,
              interests: e.target.value.split(',').map((interest) => interest.trim()),
            })
          }
          className="interest-input"
        />
        <button onClick={handleSearch} className="search-button">
          Search
        </button>
      </div>

      {error && <p className="error-message">{error}</p>}

      {/* Displaying the matching partner profiles */}
      {matches.length > 0 && !selectedPartner && (
        <div className="matches-list">
          <h2>Matching Partners</h2>
          {matches.map((partner) => (
            <div key={partner.id} className="partner-card">
              <img
                src={partner.image}
                alt={partner.name}
                className="partner-image"
              />
              <h3>{partner.name}</h3>
              <p><strong>Location:</strong> {partner.location}</p>
              <p><strong>Bio:</strong> {partner.bio}</p>
              <button onClick={() => handlePartnerSelection(partner)} className="select-button">
                View Profile
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Display the selected partner's profile */}
      {selectedPartner && (
        <div className="selected-partner-profile">
          <h2>{selectedPartner.name}'s Profile</h2>
          <img
            src={selectedPartner.image}
            alt={selectedPartner.name}
            className="partner-profile-image"
          />
          <p><strong>Location:</strong> {selectedPartner.location}</p>
          <p><strong>Bio:</strong> {selectedPartner.bio}</p>
          <button onClick={proceedToCalendar} className="proceed-button">
            Proceed to Calendar
          </button>
        </div>
      )}
    </div>
  );
};

export default FindPartner;
