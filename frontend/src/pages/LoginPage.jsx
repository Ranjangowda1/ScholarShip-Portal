
import React, { useState } from 'react';
import { Eye, EyeOff, GraduationCap, ArrowLeft } from 'lucide-react';
import './css/login.css';
import { useNavigate } from 'react-router-dom';
import {apiRequest} from './api.js';
const validateEmail = (email) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(\".+\"))@(([^<>()[\]\\.,;:\s@"]+\.)+[^<>()[\]\\.,;:\s@"]{2,})$/i;
  return re.test(email);
};

const LoginPage = ({ setUser, setCurrentPage }) => {
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const newErrors = {};
    if (!validateEmail(loginForm.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!loginForm.password || loginForm.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
    try {
      const data = await apiRequest('http://127.0.0.1:8000/api/login/', 'POST', {
        email: loginForm.email,
        password: loginForm.password,
      });
      // Login success, set user and navigate
       setUser(data.user);  // assuming you have setUser in parent context
      navigate('/welcome');
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
            <GraduationCap className="icon" />
          </div>
          <h2 className="login-title">Welcome Back</h2>
          <p className="login-subtitle">Sign in to your account</p>
        </div>

        <form onSubmit={handleLogin} className="login-form">
          {errors.form && <p className="error-text">{errors.form}</p>}
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="form-input"
              value={loginForm.email}
              onChange={(e) => setLoginForm(prev => ({ ...prev, email: e.target.value }))}
            />
            {errors.email && <p className="error-text">{errors.email}</p>}
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <div className="password-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                className="form-input"
                value={loginForm.password}
                onChange={(e) => setLoginForm(prev => ({ ...prev, password: e.target.value }))}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="toggle-password"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password && <p className="error-text">{errors.password}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`submit-button ${loading ? 'disabled' : ''}`}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <div className="footer-actions">
          <p className="signup-text">
            Don't have an account?{' '}
            <button onClick={() => navigate('/signup')} className="link-button">
              Sign up
            </button>
          </p>
          <button onClick={() => navigate('/')} className="back-button">
            <ArrowLeft size={16} className="back-icon" />
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
