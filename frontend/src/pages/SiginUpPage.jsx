import React, { useState } from 'react';
import { Eye, EyeOff, User, ArrowLeft } from 'lucide-react';
import './css/login.css';
import { useNavigate } from 'react-router-dom';
import {apiRequest} from './api.js';
const SignupPage = ({ setCurrentPage }) => {
  const [signupForm, setSignupForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

const navigate = useNavigate();
  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validatePhone = (phone) =>
    /^\d{10}$/.test(phone);

  const handleSignup = async  (e) => {
    e.preventDefault();
    setLoading(true);
    const newErrors = {};

    if (!signupForm.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!validateEmail(signupForm.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!validatePhone(signupForm.phone)) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }
    if (!signupForm.password || signupForm.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (signupForm.password !== signupForm.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
    try {
      const response = await apiRequest('http://127.0.0.1:8000/api/signup/', 'POST', {
        name: signupForm.name,
        email: signupForm.email,
        phone: signupForm.phone,
        password: signupForm.password,
        confirmPassword: signupForm.confirmPassword,
      });

      setShowSuccessModal(true);
    } catch (error) {
      setErrors({ form: error.message });
    }
  }
  setLoading(false);
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-header">
          <div className="icon-wrapper">
            <User className="icon" />
          </div>
          <h2 className="login-title">Create Account</h2>
          <p className="login-subtitle">Join the scholarship program</p>
        </div>

        <form onSubmit={handleSignup} className="login-form">
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              className="form-input"
              value={signupForm.name}
              onChange={(e) =>
                setSignupForm((prev) => ({ ...prev, name: e.target.value }))
              }
            />
            {errors.name && <p className="error-text">{errors.name}</p>}
          </div>

          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="form-input"
              value={signupForm.email}
              onChange={(e) =>
                setSignupForm((prev) => ({ ...prev, email: e.target.value }))
              }
            />
            {errors.email && <p className="error-text">{errors.email}</p>}
          </div>

          <div className="form-group">
            <label className="form-label">Phone Number</label>
            <input
              type="tel"
              placeholder="Enter 10-digit phone number"
              className="form-input"
              value={signupForm.phone}
              onChange={(e) =>
                setSignupForm((prev) => ({
                  ...prev,
                  phone: e.target.value.replace(/\D/g, '').slice(0, 10)
                }))
              }
            />
            {errors.phone && <p className="error-text">{errors.phone}</p>}
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <div className="password-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Create a password"
                className="form-input"
                value={signupForm.password}
                onChange={(e) =>
                  setSignupForm((prev) => ({
                    ...prev,
                    password: e.target.value
                  }))
                }
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password && <p className="error-text">{errors.password}</p>}
          </div>

          <div className="form-group">
            <label className="form-label">Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm your password"
              className="form-input"
              value={signupForm.confirmPassword}
              onChange={(e) =>
                setSignupForm((prev) => ({
                  ...prev,
                  confirmPassword: e.target.value
                }))
              }
            />
            {errors.confirmPassword && (
              <p className="error-text">{errors.confirmPassword}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`submit-button ${loading ? 'disabled' : ''}`}
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <div className="footer-actions">
          <p className="signup-text">
            Already have an account?{' '}
            <button
              className="link-button"
              onClick={() => navigate('/login')}
            >
              Sign in
            </button>
          </p>
          <button
            className="back-button"
            onClick={() => navigate('/')}
          >
            <ArrowLeft size={16} className="back-icon" />
            Back to Home
          </button>
        </div>
      </div>
      {showSuccessModal && (
  <div className="modal-overlay">
    <div className="modal-content">
      <div className="success-icon">&#10004;</div>
      <h3 className="modal-title">Account Created Successfully</h3>
      <button
        className="submit-button"
        onClick={() => navigate('/login')}
      >
        Okay
      </button>
    </div>
  </div>
)}
    </div>
    
  );
};

export default SignupPage;
