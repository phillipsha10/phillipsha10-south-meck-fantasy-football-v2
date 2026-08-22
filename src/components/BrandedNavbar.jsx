import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const BrandedNavbar = ({ darkMode, onToggleDarkMode }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedTeam, setSelectedTeam] = useState(null);

  useEffect(() => {
    const storedTeam = localStorage.getItem('selectedTeam');
    if (storedTeam) {
      setSelectedTeam(JSON.parse(storedTeam));
    }
  }, [location]);

  const handleHomeClick = () => {
    localStorage.removeItem('selectedTeam');
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand" onClick={handleHomeClick} style={{ cursor: 'pointer' }}>
        <div className="navbar-logo">🏈</div>
        <div>
          <div className="navbar-title">SOUTH MECKLENBURG</div>
          <div className="navbar-title" style={{ fontSize: '0.75rem', opacity: 0.8 }}>
            FANTASY FOOTBALL LEAGUE
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <div style={{
        display: 'flex',
        gap: '2rem',
        alignItems: 'center',
        flex: 1,
        marginLeft: '2rem'
      }}>
        <Link
          to="/"
          onClick={handleHomeClick}
          style={{
            color: location.pathname === '/' ? '#d4af37' : (darkMode ? '#aaa' : '#666'),
            textDecoration: 'none',
            fontWeight: '600',
            fontSize: '0.9rem',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            transition: 'color 0.2s ease',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => {
            e.target.style.color = '#d4af37';
          }}
          onMouseLeave={(e) => {
            e.target.style.color = location.pathname === '/' ? '#d4af37' : (darkMode ? '#aaa' : '#666');
          }}
        >
          🏠 Home
        </Link>

        {selectedTeam && location.pathname.includes('/dashboard') && (
          <span style={{
            color: '#c41e3a',
            fontWeight: '700',
            fontSize: '0.95rem',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            {selectedTeam.logo} {selectedTeam.teamName}
          </span>
        )}

        <Link
          to="/rankings"
          style={{
            color: location.pathname === '/rankings' ? '#d4af37' : (darkMode ? '#aaa' : '#666'),
            textDecoration: 'none',
            fontWeight: '600',
            fontSize: '0.9rem',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            transition: 'color 0.2s ease',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => {
            e.target.style.color = '#d4af37';
          }}
          onMouseLeave={(e) => {
            e.target.style.color = location.pathname === '/rankings' ? '#d4af37' : (darkMode ? '#aaa' : '#666');
          }}
        >
          📊 Rankings
        </Link>
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
