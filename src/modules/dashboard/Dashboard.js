// Dashboard.js
import React from 'react';
import TextScrollAnimation from './TextScrollAnimation';
import SplitCardAnimation from './SplitCardAnimation';
import './cardanimation.css'; // Include both CSS files
import './textreveal.css';

const Dashboard = () => {
  return (
    <div className="dashboard">
      {/* First: Text Scroll Animation */}
      <TextScrollAnimation />
      
      {/* Spacer to ensure clean separation */}
      {/* <div style={{ height: '100vh' }} /> */}
      
      {/* Second: Card Animation */}
      <SplitCardAnimation />
    </div>
  );
};

export default Dashboard;
