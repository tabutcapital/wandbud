import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../AppContext';

const SearchAndBooking = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { addBooking } = useContext(AppContext);

  const [partners, setPartners] = useState([]);
  const [showPartnerModal, setShowPartnerModal] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentBooking, setCurrentBooking] = useState(null);

  const fetchPartners = async () => {
    try {
      const response = await fetch('https://server1-navy.vercel.app/partners');
      if (!response.ok) {
        throw new Error('Failed to fetch partners');
      }
      const data = await response.json();
      setPartners(data);
    } catch (err) {
      console.error('Error fetching partners:', err);
    }
  };

  const handleSearch = async () => {
    if (!query.trim()) {
      setError('Please enter a search term.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const response = await fetch(`https://server1-navy.vercel.app/destinations/?q=${query}`);
      if (!response.ok) {
        throw new Error('Failed to fetch destinations');
      }
      const data = await response.json();
      if (data.length === 0) {
        setError('No destinations found. Please try another search.');
      }
      setResults(data);
    } catch (err) {
      setError('An error occurred while searching. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleBooking = (item) => {
    setCurrentBooking(item);
    fetchPartners();
    setShowPartnerModal(true);
  };

  const handlePartnerSelection = (partner) => {
    setSelectedPartner(partner);
    setShowPartnerModal(false);
    setShowCalendar(true);
  };

  const handleDateSelection = (date) => {
    if (!date) {
      alert('Please select a valid date.');
      return;
    }

    setSelectedDate(date);
    setShowCalendar(false);

    addBooking({
      name: currentBooking.name,
      image: currentBooking.image,
      description: currentBooking.description,
      partnerName: selectedPartner.name,
      partnerBio: selectedPartner.bio,
      partnerLocation: selectedPartner.location,
      date: date,
      id: Date.now(),
    });

    alert(`Booking confirmed for ${currentBooking.name} on ${date} with ${selectedPartner.name}`);
    resetBookingState();
  };

  const resetBookingState = () => {
    setSelectedPartner(null);
    setSelectedDate(null);
    setCurrentBooking(null);
  };

  // Filter results based on the search query
  const filteredResults = results.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase()) ||
    item.description.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="search-and-booking">
      <h1 className="main-heading">Search and Book Your Adventure</h1>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for destinations..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search-input"
        />
        <button onClick={handleSearch} disabled={loading} className="search-button">
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>

      {error && <p className="error-message">{error}</p>}

      <div className="content-container">
        {/* Search Results */}
        <div className="results-container">
          <h2 className="section-heading">Search Results</h2>
          {filteredResults.length > 0 ? (
            <ul className="results-list">
              {filteredResults.map((item) => (
                <li key={item.id} className="result-item">
                  <h3>{item.name}</h3>
                  <img src={item.image} alt={item.name} className="result-image" />
                  <p>{item.description}</p>
                  <button onClick={() => handleBooking(item)} className="book-button">
                    Book
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p>No matching destinations found.</p>
          )}
        </div>

        {/* Partner Selection */}
        {showPartnerModal && (
          <div className="modal partner-modal">
            <h2>Recent Partner</h2>
            <ul>
              {partners.map((partner) => (
                <li key={partner.id}>
                  <button onClick={() => handlePartnerSelection(partner)}>
                    {partner.name} ({partner.location})
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Calendar Selection */}
        {showCalendar && (
          <div className="modal calendar-modal">
            <h2>Select a Date</h2>
            <input
              type="date"
              onChange={(e) => handleDateSelection(e.target.value)}
              className="calendar-input"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchAndBooking;
