
// src/AppContext.js

import React, { createContext, useState } from 'react';

// Create the context
export const AppContext = createContext();

// Create a provider component
const AppProvider = ({ children }) => {
  const [bookings, setBookings] = useState([]);
  const [userProfile, setUserProfile] = useState({});

  // Function to add booking
  const addBooking = (booking) => {
    const alreadyBooked = bookings.some((b) => b.id === booking.id);
    if (alreadyBooked) {
      alert(`${booking.partnerName} is already in your bookings!`);
      return;
    }
    setBookings((prev) => [...prev, booking]);
  };

  // Function to cancel a booking
  const cancelBooking = (id) => {
    setBookings((prev) => prev.filter((booking) => booking.id !== id));
  };

  // Context value that will be provided to other components
  const contextValue = {
    bookings,
    addBooking,
    cancelBooking,
    userProfile,
    setUserProfile,
  };

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};

export default AppProvider;
