import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AppContext } from '../AppContext'; // Import the context
import { useContext } from 'react';

const SharedCalendar = () => {
  const location = useLocation(); // Get the selected partner from location state
  const navigate = useNavigate();
  const { addBooking } = useContext(AppContext); // Access context to add bookings
  const [selectedDate, setSelectedDate] = useState(null);

  // Make sure that selectedPartner is coming from location.state
  const selectedPartner = location.state?.selectedPartner;

  // Handle the case where the partner might not be passed correctly
  if (!selectedPartner) {
    return <div>Error: No partner selected. Please go back and select a partner.</div>;
  }

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const handleBooking = () => {
    if (!selectedDate) {
      alert('Please select a date.');
      return;
    }

    const bookingDetails = {
      id: Date.now(),
      partnerName: selectedPartner.name,
      partnerImage: selectedPartner.image,
      date: selectedDate,
      partnerBio: selectedPartner.bio,
      partnerLocation: selectedPartner.location,
      partnerBudget: selectedPartner.budget,
      partnerInterests: selectedPartner.interests,
    };

    // Add booking to context
    addBooking(bookingDetails);

    // Navigate to booking management page
    navigate('/booking-management');
  };

  return (
    <div className="shared-calendar">
      <h2>Select a Date for Your Booking</h2>
      <p><strong>Partner:</strong> {selectedPartner.name}</p>
      <img
        src={selectedPartner.image}
        alt={selectedPartner.name}
        className="selected-partner-image"
      />
      <div>
        <label>Select Date: </label>
        <input type="date" onChange={handleDateChange} />
      </div>
      <button onClick={handleBooking}>Confirm Booking</button>
    </div>
  );
};

export default SharedCalendar;
