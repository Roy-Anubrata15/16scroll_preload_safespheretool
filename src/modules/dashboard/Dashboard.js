// Dashboard.js
import React from 'react';
import TextScrollAnimation from './TextScrollAnimation';
import SplitCardAnimation from './SplitCardAnimation';
import Horizontalscroll  from './horizontalscroll';
import './cardanimation.css'; // Include both CSS files
import './textreveal.css';
import './horizontalscroll.css'
import SprintoReplica from "./SprintoReplica"


const Dashboard = () => {
  return (
    <div className="dashboard">
      {/* First: Text Scroll Animation */}
      <TextScrollAnimation />
      
      {/* Spacer to ensure clean separation */}
      {/* <div style={{ height: '100vh' }} /> */}
      
      {/* Second: Card Animation */}
      <SplitCardAnimation />
        
        <SprintoReplica/>
        <Horizontalscroll/>
    
    </div>
  );
};

export default Dashboard;
