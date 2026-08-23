import React from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

const BrandedNavbar = ({ darkMode, toggleDarkMode }) => {
  const { teamId } = useParams();
  const navigate = useNavigate();
  const selectedTeam = localStorage.getItem('selectedTeam')
    ? JSON.parse(localStorage.getItem('selectedTeam'))
    : null;

  const handleHome = () => {
    localStorage.removeItem('selectedTeam');
    navigate('/');
  };

  return (
    <nav
      style={{
        background: darkMode
          ? 'linear-gradient(90deg, #1a1a1a 0%, #2a2a2a 100%)'
          : 'linear-gradient(90deg, #c41e3a 0%, #8b162a 100%)',
        padding: '1rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
        borderBottom: '2px solid #d4af37',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}
    >
      {/* Left: Logo/Home Link */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        <Link
          to="/"
          onClick={handleHome}
          style={{
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            cursor: 'pointer'
          }}
        >
          <span style={{ fontSize: '1.8rem' }}>🏈</span>
          <div>
            <h1
              style={{
                margin: 0,
                fontSize: '1.2rem',
                fontWeight: '800',
                color: '#d4af37',
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}
            >
              South Meck
            </h1>
            <p
              style={{
                margin: 0,
                fontSize: '0.75rem',
                color: '#fff',
                fontWeight: '400'
              }}
            >
              Fantasy Football
            </p>
          </div>
        </Link>

        {/* Show team name when on dashboard */}
        {teamId && selectedTeam && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              paddingLeft: '1.5rem',
              borderLeft: '2px solid #d4af37'
            }}
          >
            <span style={{ fontSize: '1.5rem' }}>{selectedTeam.logo}</span>
            <div>
              <p
                style={{
                  margin: 0,
                  fontSize: '0.9rem',
                  color: '#fff',
                  fontWeight: '600'
                }}
              >
                {selectedTeam.teamName}
              </p>
              <p
                style={{
                  margin: 0,
                  fontSize: '0.75rem',
                  color: '#d4af37'
                }}
              >
                {selectedTeam.owner}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Right: Navigation Links & Dark Mode Toggle */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        {/* All-Time Rankings Link */}
        <Link
          to="/rankings"
          style={{
            color: '#d4af37',
            textDecoration: 'none',
            fontWeight: '600',
            fontSize: '0.95rem',
            padding: '0.5rem 1rem',
            borderRadius: '4px',
            transition: 'all 0.2s ease',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(212, 175, 55, 0.2)';
            e.currentTarget.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          ⭐ Rankings
        </Link>

        {/* Dark Mode Toggle */}
        <button
          onClick={toggleDarkMode}
          style={{
            background: darkMode ? '#d4af37' : '#1a1a1a',
            border: '2px solid #d4af37',
            color: darkMode ? '#1a1a1a' : '#d4af37',
            width: '45px',
            height: '45px',
            borderRadius: '50%',
            cursor: 'pointer',
            fontSize: '1.2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s ease',
            fontWeight: '600'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
          }}
          title={darkMode ? 'Light Mode' : 'Dark Mode'}
        >
          {darkMode ? '☀️' : '🌙'}
        </button>
      </div>
    </nav>
  );
};

export default BrandedNavbar;

