import React from 'react';
import './css/home.css';

import {
  GraduationCap,
  Award,
  Shield,
  FileText,
  CheckCircle,
  ChevronRight,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Homepage = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <div style={{ minHeight: '100vh' }}>
      <header>
        <div className="container header-inner">
          <div className="logo">
            <div className="logo-icon">
              <GraduationCap />
            </div>
            <div className="logo-text">
              <h1>DASHAPATA</h1>
              <p>Excellence in Education</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-badge">
            <Award />
            Scholarship Portal 2025
          </div>

          <h1 className="hero-title">
            Unlock Your <span>Future</span>
          </h1>

          <p className="hero-text">
            Apply for merit-based scholarships and transform your educational journey.
            Simple application process, secure verification, and instant status updates.
          </p>

          <button className="btn-apply" onClick={handleLogin}>
            Apply Now <ChevronRight />
          </button>
        </section>

        {/* Features */}
        <div className='features-wrapper'>
        <div className="features-grid">
          {[
            {
              icon: Shield,
              bgColor: '#dbeafe',
              iconColor: '#3b82f6',
              title: 'Secure Verification',
              description:
                'Aadhaar-based identity verification ensures secure and authentic applications.',
            },
            {
              icon: FileText,
              bgColor: '#dcfce7',
              iconColor: '#16a34a',
              title: 'Easy Application',
              description:
                'Simple step-by-step process to submit your scholarship application online.',
            },
            {
              icon: CheckCircle,
              bgColor: '#f3e8ff',
              iconColor: '#9333ea',
              title: 'Quick Processing',
              description:
                'Fast review process with real-time status updates and notifications.',
            },
          ].map(({ icon: Icon, bgColor, iconColor, title, description }, i) => (
            <div className="feature-card" key={i}>
              <div
                className="feature-icon"
                style={{ backgroundColor: bgColor, color: iconColor }}
              >
                <Icon />
              </div>
              <h3 className="feature-title">{title}</h3>
              <p className="feature-desc">{description}</p>
            </div>
          ))}
        </div>
        </div>
      </main>
    </div>
  );
};

export default Homepage;
