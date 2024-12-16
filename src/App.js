// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Destinations from './components/Destinations';
import SearchAndBooking from './components/SearchAndBooking';
import FindPartner from './components/FindPartner';
import BookingManagement from './components/BookingManagement';
import About from './components/About';
import NavBar from './components/NavBar';
import ReviewsAndRatings from './components/ReviewsAndRatings';
import UserProfile from './components/UserProfile';
import SharedCalendar from './components/SharedCalender';
import AppProvider from './AppContext'; // Import the AppProvider

import './App.css';

const App = () => {
  // Dynamic routes array
  const routes = [
    { path: '/', element: <Home /> },
    { path: '/destinations', element: <Destinations /> },
    { path: '/search-and-booking', element: <SearchAndBooking /> },
    { path: '/find-partner', element: <FindPartner /> },
    { path: '/booking-management', element: <BookingManagement /> },
    { path: '/about', element: <About /> },
    { path: '/reviews-and-ratings', element: <ReviewsAndRatings /> },
    { path: '/user-profile', element: <UserProfile /> },
    { path: '/shared-calendar', element: <SharedCalendar /> },
  ];

  return (
    <AppProvider> {/* Wrap the whole app with AppProvider */}
      <Router>
        <div>
          <NavBar />
          <Routes>
            {routes.map((route, index) => (
              <Route key={index} path={route.path} element={route.element} />
            ))}
          </Routes>
        </div>
      </Router>
    </AppProvider>
  );
};

export default App;

