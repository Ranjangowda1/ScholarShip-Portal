import React, { useState, useEffect } from 'react';
import './css/logout.css';
import { useNavigate } from 'react-router-dom';

const LogoutPage = () => {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoggingOut(true);
      setTimeout(() => {
        setIsLoggingOut(false);
        setIsLoggedOut(true);
        // localStorage.removeItem('userToken');
      }, 2000);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleGoHome = () => {
    navigate('/');
  };

  const handleSignInAgain = () => {
    navigate('/login');
  };

  const handleConfirmLogout = () => {
    setIsLoggingOut(true);
    setTimeout(() => {
      setIsLoggingOut(false);
      setIsLoggedOut(true);
    }, 2000);
  };

  if (isLoggingOut) {
    return (
      <div className="logout-container logout-loading-container">
        <div className="logout-card">
          <div className="logout-icon-container">
            <div className="logout-loading-spinner"></div>
          </div>
          <h2 className="logout-title">Logging Out...</h2>
          <p className="logout-message">
            Please wait while we securely log you out.
          </p>
        </div>
      </div>
    );
  }

  if (isLoggedOut) {
    return (
      <div className="logout-container logout-success-container">
        <div className="logout-card">
          <div className="logout-icon-container">
            <div className="logout-success-icon">✓</div>
          </div>
          <h1 className="logout-title">Successfully Logged Out</h1>
          <p className="logout-message">
            You have been safely logged out of your account. Thank you for using our service!
          </p>
          <div className="logout-button-container">
            <button onClick={handleGoHome} className="logout-btn logout-btn-primary">
              🏠 Go to Home
            </button>
            <button onClick={handleSignInAgain} className="logout-btn logout-btn-secondary">
              🔄 Sign In Again
            </button>
          </div>
          <p className="logout-info-text">
            For your security, please close your browser if you're on a shared computer.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="logout-container logout-confirm-container">
      <div className="logout-card">
        <div className="logout-icon-container">
          <div className="logout-icon">⚠️</div>
        </div>
        <h1 className="logout-title">Confirm Logout</h1>
        <p className="logout-message">
          Are you sure you want to log out of your account?
        </p>
        <div className="logout-button-container">
          <button onClick={handleConfirmLogout} className="logout-btn logout-btn-danger">
            🚪 Yes, Logout
          </button>
          <button onClick={handleGoHome} className="logout-btn logout-btn-cancel">
            🏠 Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutPage;
