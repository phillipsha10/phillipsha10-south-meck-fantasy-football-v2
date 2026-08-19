import React from 'react';

const BrandedNavbar = ({ darkMode, onToggleDarkMode }) => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <div className="navbar-logo">🏈</div>
        <div>
          <div className="navbar-title">SOUTH MECKLENBURG</div>
          <div className="navbar-title" style={{ fontSize: '0.75rem', opacity: 0.8 }}>
            FANTASY FOOTBALL LEAGUE
          </div>
        </div>
      </div>

      <div className="navbar-controls">
        <button
          className="dark-mode-toggle"
          onClick={onToggleDarkMode}
          title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {darkMode ? '☀️ Light' : '🌙 Dark'}
        </button>
      </div>
    </nav>
  );
};

export default BrandedNavbar;
