import React, { useContext } from 'react';
import { AppContext } from '../AppContext';

const BookingManagement = () => {
  const { bookings, cancelBooking } = useContext(AppContext); // Access context for bookings and cancelBooking function

  const handleCancelBooking = (id) => {
    const confirmation = window.confirm('Are you sure you want to cancel this booking?');
    if (confirmation) {
      cancelBooking(id);
      alert('Booking cancelled successfully');
    }
  };

  return (
    <div className="booking-management">
      <h1>My Trips</h1>
      {bookings.length === 0 ? (
        <div>
          <h2>No bookings made yet</h2>
          <p>Please select a partner and choose a date on the calendar to make a booking.</p>
        </div>
      ) : (
        <ul>
          {bookings.map((booking) => (
            <li key={booking.id}>
              <h3>{booking.name}</h3>
              <img src={booking.image} alt={booking.name} style={{ width: '150px', borderRadius: '8px' }} />
              <p><strong>Description:</strong> {booking.description}</p>
              <p><strong>Partner:</strong> {booking.partnerName}</p>
              <p><strong>Bio:</strong> {booking.partnerBio}</p>
              <p><strong>Location:</strong> {booking.partnerLocation}</p>
              <p><strong>Date:</strong> {new Date(booking.date).toDateString()}</p>
              <button onClick={() => handleCancelBooking(booking.id)}>Cancel Booking</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BookingManagement;
