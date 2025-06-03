import React ,{useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import AadhaarEducationPages from './pages/EducationPage';
import SignupPage from './pages/SiginUpPage';
import WelcomePage from './pages/welcome';
import ProtectedRoute from './pages/ProtectedRoute';
import ThankYouPage from './pages/thank';
import LogoutPage from './pages/logout';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* <Route path="/welcome" element={<WelcomePage />} /> */}
        <Route path="/login" element={<LoginPage setUser={setUser} />} />
        <Route
          path="/education"
          element={
            <ProtectedRoute user={user}>
              <AadhaarEducationPages user={user} />
            </ProtectedRoute>
          }
        />
        <Route
  path="/welcome"
  element={
    <ProtectedRoute user={user}>
      <WelcomePage username={user?.name || ''} />
    </ProtectedRoute>
  }
/>
        <Route
  path="/thanks"
  element={
    <ProtectedRoute user={user}>
      <ThankYouPage  />
    </ProtectedRoute>
  }
/>
        <Route
  path="/logout"
  element={
    <ProtectedRoute user={user}>
      <LogoutPage  />
    </ProtectedRoute>
  }
/>
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </Router>
  );
}

export default App;