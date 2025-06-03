import React from 'react';
import { useNavigate } from 'react-router-dom';
const ThankYouPage = () => {
    const navigate = useNavigate();
  const handleBackHome = () => {
    // Add your navigation logic here
    navigate('/welcome')
  };

  const handleLogout = () => {
    // Add your logout logic here
   navigate('/logout');
  };

  return (
    <div className="container">
      <div className="card">
        {/* Success Icon */}
        <div className="icon-container">
          <div className="success-icon">✓</div>
        </div>
        
        {/* Thank You Message */}
        <h1 className="title">Thank You!</h1>
        
        {/* Validation Message */}
        <p className="message">
          Your details have been submitted successfully. Your details will be validated and you will be notified once the process is complete.
        </p>
        
        {/* Action Buttons */}
        <div className="button-container">
          <button onClick={handleBackHome} className="btn btn-primary">
            🏠 Back to Home
          </button>
          
          <button onClick={handleLogout} className="btn btn-secondary">
            🚪 Logout
          </button>
        </div>
        
        {/* Additional Info */}
        <p className="info-text">
          You will receive an email confirmation shortly.
        </p>
      </div>

      <style jsx>{`
        .container {
          min-height: 100vh;
          background: linear-gradient(135deg, #e8f5e8 0%, #e6f3ff 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        .card {
          background: white;
          border-radius: 12px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          padding: 40px 32px;
          max-width: 400px;
          width: 100%;
          text-align: center;
          transition: transform 0.3s ease;
        }

        .card:hover {
          transform: translateY(-5px);
        }

        .icon-container {
          margin-bottom: 24px;
        }

        .success-icon {
          width: 64px;
          height: 64px;
          background: linear-gradient(135deg, #10b981, #059669);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto;
          color: white;
          font-size: 32px;
          font-weight: bold;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0% {
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7);
          }
          70% {
            transform: scale(1.05);
            box-shadow: 0 0 0 10px rgba(16, 185, 129, 0);
          }
          100% {
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(16, 185, 129, 0);
          }
        }

        .title {
          font-size: 28px;
          font-weight: bold;
          color: #1f2937;
          margin-bottom: 16px;
          margin-top: 0;
        }

        .message {
          color: #6b7280;
          line-height: 1.6;
          margin-bottom: 32px;
          font-size: 16px;
        }

        .button-container {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 24px;
        }

        .btn {
          width: 100%;
          padding: 14px 24px;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          text-decoration: none;
        }

        .btn-primary {
          background: linear-gradient(135deg, #3b82f6, #2563eb);
          color: white;
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
        }

        .btn-primary:hover {
          background: linear-gradient(135deg, #2563eb, #1d4ed8);
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(59, 130, 246, 0.4);
        }

        .btn-secondary {
          background: linear-gradient(135deg, #6b7280, #4b5563);
          color: white;
          box-shadow: 0 4px 12px rgba(107, 114, 128, 0.3);
        }

        .btn-secondary:hover {
          background: linear-gradient(135deg, #4b5563, #374151);
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(107, 114, 128, 0.4);
        }

        .btn:active {
          transform: translateY(0);
        }

        .info-text {
          font-size: 14px;
          color: #9ca3af;
          margin: 0;
        }

        @media (max-width: 480px) {
          .card {
            padding: 32px 24px;
            margin: 16px;
          }
          
          .title {
            font-size: 24px;
          }
          
          .btn {
            padding: 12px 20px;
            font-size: 15px;
          }
        }
      `}</style>
    </div>
  );
};

export default ThankYouPage;