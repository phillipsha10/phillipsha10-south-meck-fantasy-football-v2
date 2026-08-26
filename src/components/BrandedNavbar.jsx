import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { PEOPLE } from '../data/leagueData';

const BrandedNavbar = ({ darkMode, toggleDarkMode }) => {
  const { personId } = useParams();
  const person = PEOPLE.find((p) => p.id === personId);

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
        zIndex: 100,
        flexWrap: 'wrap',
        gap: '1rem',
      }}
    >
      {/* Left: Logo/Home Link */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        <Link
          to="/"
          style={{
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            cursor: 'pointer',
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
                letterSpacing: '1px',
              }}
            >
              South Meck
            </h1>
            <p
              style={{
                margin: 0,
                fontSize: '0.75rem',
                color: '#fff',
                fontWeight: '400',
              }}
            >
              Fantasy Football
            </p>
          </div>
        </Link>

        {/* Show person name when on their dashboard */}
        {person && (
          <div
            style={{
              paddingLeft: '1.5rem',
              borderLeft: '2px solid #d4af37',
            }}
          >
            <p
              style={{
                margin: 0,
                fontSize: '0.9rem',
                color: '#fff',
                fontWeight: '600',
              }}
            >
              {person.name}
            </p>
          </div>
        )}
      </div>

      {/* Right: Navigation Links & Dark Mode Toggle */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
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
            cursor: 'pointer',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(212, 175, 55, 0.2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
          }}
        >
          ⭐ Rankings
        </Link>

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
            fontWeight: '600',
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

