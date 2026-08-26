import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PEOPLE } from '../data/leagueData';

const LandingPage = () => {
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState('');

  const sortedPeople = [...PEOPLE].sort((a, b) => a.name.localeCompare(b.name));

  const handleEnter = () => {
    if (!selectedId) return;
    navigate(`/dashboard/${selectedId}`);
  };

  return (
    <div
      style={{
        minHeight: 'calc(100vh - 140px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage:
          'linear-gradient(rgba(10,10,10,0.7), rgba(10,10,10,0.75)), url("https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&h=1000&fit=crop")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        padding: '3rem 2rem',
        textAlign: 'center',
      }}
    >
      <div style={{ animation: 'fadeIn 1s ease-in-out' }}>
        <h1
          style={{
            fontSize: 'clamp(1.8rem, 5vw, 3.2rem)',
            fontWeight: '800',
            color: '#ffffff',
            textShadow: '3px 3px 8px rgba(0,0,0,0.9)',
            margin: '0 0 1rem 0',
            letterSpacing: '1px',
            textTransform: 'uppercase',
            lineHeight: 1.2,
          }}
        >
          South Meck Fantasy Football League
        </h1>

        <p
          style={{
            fontSize: '1.1rem',
            color: '#d4af37',
            fontWeight: '700',
            textShadow: '2px 2px 4px rgba(0,0,0,0.9)',
            margin: '0 0 0.35rem 0',
            letterSpacing: '2px',
          }}
        >
          EST 2008
        </p>
        <p
          style={{
            fontSize: '1.1rem',
            color: '#d4af37',
            fontWeight: '700',
            textShadow: '2px 2px 4px rgba(0,0,0,0.9)',
            margin: '0 0 2.5rem 0',
            letterSpacing: '2px',
          }}
        >
          Current Season - 18
        </p>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            alignItems: 'center',
          }}
        >
          <select
            value={selectedId}
            onChange={(e) => setSelectedId(e.target.value)}
            style={{
              width: '320px',
              maxWidth: '90vw',
              padding: '1rem 1.25rem',
              fontSize: '1.05rem',
              fontWeight: '600',
              borderRadius: '8px',
              border: '2px solid #d4af37',
              backgroundColor: '#1a1a1a',
              color: '#ffffff',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
            }}
          >
            <option value="" disabled>
              Select Your Name
            </option>
            {sortedPeople.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>

          <button
            onClick={handleEnter}
            disabled={!selectedId}
            style={{
              width: '320px',
              maxWidth: '90vw',
              padding: '1rem',
              fontSize: '1.1rem',
              fontWeight: '700',
              backgroundColor: selectedId ? '#c41e3a' : '#555',
              color: '#ffffff',
              border: 'none',
              borderRadius: '8px',
              cursor: selectedId ? 'pointer' : 'not-allowed',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              boxShadow: selectedId ? '0 8px 16px rgba(196,30,58,0.4)' : 'none',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              if (selectedId) e.target.style.backgroundColor = '#a01729';
            }}
            onMouseLeave={(e) => {
              if (selectedId) e.target.style.backgroundColor = '#c41e3a';
            }}
          >
            ⚡ Enter Portal
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default LandingPage;

