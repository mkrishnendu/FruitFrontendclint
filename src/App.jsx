import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import ChatbotPage from './pages/ChatbotPage';
import TranslatorPage from './pages/TranslatorPage';
import FaqPage from './pages/FaqPage';
import AboutPage from './pages/AboutPage';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const [auth, setAuth] = useState(JSON.parse(localStorage.getItem('auth')) || {});

  useEffect(() => {
    const storedAuth = localStorage.getItem('auth');
    if (storedAuth) {
      setAuth(JSON.parse(storedAuth));
    }
  }, []);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute isAuthenticated={auth.isAuthenticate}>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route path="/chatbot" element={<ProtectedRoute isAuthenticated={auth.isAuthenticate}><ChatbotPage /></ProtectedRoute>} />
        <Route path="/translator" element={<ProtectedRoute isAuthenticated={auth.isAuthenticate}><TranslatorPage /></ProtectedRoute>} />
        <Route path="/faq" element={<ProtectedRoute isAuthenticated={auth.isAuthenticate}><FaqPage /></ProtectedRoute>} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/login" element={<LoginPage setAuth={setAuth} />} />
        <Route path="/logout" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
