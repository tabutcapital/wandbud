import React, { useState } from 'react';


const ReviewsAndRatings = () => {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState('');
  const [rating, setRating] = useState(0);

  const addReview = () => {
    if (!newReview.trim() || rating === 0) return alert("Please provide a review and rating.");
    const newEntry = {
      text: newReview,
      rating,
      date: new Date().toLocaleString(),
    };
    setReviews([...reviews, newEntry]);
    setNewReview('');
    setRating(0);
  };

  return (
    <div className="reviews-container">
      <h1>Reviews and Ratings</h1>
      <textarea
        className="review-textarea"
        placeholder="Leave a review"
        value={newReview}
        onChange={(e) => setNewReview(e.target.value)}
      ></textarea>
      <div className="rating-input">
        <label>Rate:</label>
        <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
          <option value="0">Select Rating</option>
          <option value="1">1 Star</option>
          <option value="2">2 Stars</option>
          <option value="3">3 Stars</option>
          <option value="4">4 Stars</option>
          <option value="5">5 Stars</option>
        </select>
      </div>
      <button className="submit-button" onClick={addReview}>
        Submit
      </button>
      <ul className="reviews-list">
        {reviews.map((review, index) => (
          <li key={index} className="review-item">
            <p><strong>Rating:</strong> {review.rating} Stars</p>
            <p>{review.text}</p>
            <span className="review-date">{review.date}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReviewsAndRatings;
