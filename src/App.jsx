import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Chatbot from './components/Chatbot';
import { authAPI } from './services/api';
import { FiX } from 'react-icons/fi';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [pendingNewsItem, setPendingNewsItem] = useState(null);
  const [authMode, setAuthMode] = useState('login');

  useEffect(() => {
    // Check if user is already authenticated to enable permanent persistence across reloads
    if (authAPI.isAuthenticated()) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    setShowLogin(false);
    // The item will be opened by Dashboard via propped pendingNewsItem
  };

  const handleLogout = () => {
    authAPI.logout();
    setIsAuthenticated(false);
    setPendingNewsItem(null);
  };

  const handleLoginClick = (item = null, mode = 'login') => {
    if (item && item.id) {
      setPendingNewsItem(item);
    }
    setAuthMode(mode);
    setShowLogin(true);
  };

  return (
    <div className="app">
      <Dashboard
        isAuthenticated={isAuthenticated}
        onLogout={handleLogout}
        onLoginClick={handleLoginClick}
        pendingNewsItem={pendingNewsItem}
        onPendingItemCleared={() => setPendingNewsItem(null)}
      />

      {/* 🤖 Antigravity Intelligence Layer */}
      <Chatbot />

      {showLogin && (
        <div className="login-overlay animate-fadeIn">
          <button className="close-login" onClick={() => {
            setShowLogin(false);
            setPendingNewsItem(null);
          }} title="Close">
            <FiX />
          </button>
          <Login
            onLoginSuccess={handleLoginSuccess}
            initialMode={authMode}
            isGatedAccess={!!pendingNewsItem}
          />
        </div>
      )}
    </div>
  );
}

export default App;
