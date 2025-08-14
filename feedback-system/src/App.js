import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddReview from './pages/AddReview';
import ReviewList from './pages/ReviewList';
import FeedbackChart from './pages/FeedbackChart';
import Navbar from './components/Navbar';
import './App.css';

function App() {
  const [feedbackData, setFeedbackData] = useState([]);

  // Load from localStorage
  useEffect(() => {
    const storedData = localStorage.getItem('feedback');
    if (storedData) {
      setFeedbackData(JSON.parse(storedData));
    }
  }, []);

  // Save to localStorage on update
  useEffect(() => {
    localStorage.setItem('feedback', JSON.stringify(feedbackData));
  }, [feedbackData]);

  const addFeedback = (newFeedback) => {
    setFeedbackData([newFeedback, ...feedbackData]);
  };

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<AddReview onSubmit={addFeedback} />} />
        <Route path="/reviews" element={<ReviewList feedbackData={feedbackData} />} />
        <Route path="/chart" element={<FeedbackChart feedbackData={feedbackData} />} />
      </Routes>
    </Router>
  );
}

export default App;
