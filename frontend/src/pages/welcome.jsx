import React, { useEffect, useState } from 'react';
import './css/welcome.css';
import { useNavigate } from 'react-router-dom';
const WelcomePage = ({ username }) => {
  const [showContent, setShowContent] = useState(false);
const navigate = useNavigate();
  useEffect(() => {
    // Animate in content after mount
    setTimeout(() => setShowContent(true), 300);
  }, []);

  // Function to get initials from username
  const getInitials = (name) => {
    if (!name) return '';
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className="welcome-page">
      <div className={`welcome-container ${showContent ? 'animate-in' : ''}`}>
        <div className="background-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
        </div>
        
        <div className="content">
          <h1 className="welcome-title">Welcome</h1>
          
          <div className="user-section">
            <div className="user-avatar">
              {getInitials(username)}
            </div>
            <h2 className="username">{username}</h2>
            <p className="subtitle">Ready to get started?</p>
          </div>
          
          <button className="apply-button" onClick={() => navigate('/education') }>
            <span>Apply Here</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
