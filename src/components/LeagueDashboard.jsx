import React, { useState } from 'react';
import StandingsTable from './StandingsTable';

const LeagueDashboard = ({ leagueData, darkMode }) => {
  const [activeTab, setActiveTab] = useState('standings');
  const [selectedSeason, setSelectedSeason] = useState(2026);

  const seasons = [2026, 2025, 2024, 2023, 2022, 2021];
  const currentSeason = 2026;

  return (
    <div style={{ minHeight: '100vh', paddingBottom: '3rem' }}>
      {/* Hero Header */}
      <div
        style={{
          background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
          borderTop: '3px solid',
          borderImage: 'linear-gradient(90deg, #c41e3a, #d4af37) 1',
          padding: '3rem 2rem',
          marginBottom: '2rem',
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h1
            style={{
              fontSize: '2.5rem',
              fontWeight: '800',
              color: '#d4af37',
              margin: '0 0 0.5rem 0',
              textTransform: 'uppercase',
              letterSpacing: '1.5px',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
            }}
          >
            ⭐ All-Time Standings
          </h1>
          <p
            style={{
              fontSize: '1rem',
              color: '#aaa',
              margin: '0.5rem 0 0 0',
              fontWeight: '500',
              letterSpacing: '0.5px',
            }}
          >
            Historical league standings and championship records
          </p>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
        {/* Season Selector */}
        <div
          style={{
            backgroundColor: darkMode ? 'rgba(196, 30, 58, 0.1)' : 'rgba(196, 30, 58, 0.05)',
            border: '1px solid rgba(196, 30, 58, 0.3)',
            borderRadius: '8px',
            padding: '1.5rem',
            marginBottom: '2rem',
            borderLeft: '4px solid #c41e3a',
            transition: 'all 0.3s ease',
          }}
        >
          <div
            style={{
              fontSize: '0.9rem',
              fontWeight: '600',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              color: '#d4af37',
              marginBottom: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            📅 Select Season
          </div>
          <div
            style={{
              display: 'flex',
              gap: '0.75rem',
              flexWrap: 'wrap',
            }}
          >
            {seasons.map((season) => (
              <button
                key={season}
                onClick={() => setSelectedSeason(season)}
                style={{
                  padding: '0.75rem 1.25rem',
                  borderRadius: '6px',
                  border:
                    selectedSeason === season
                      ? '2px solid #c41e3a'
                      : '1px solid rgba(196, 30, 58, 0.3)',
                  backgroundColor:
                    selectedSeason === season
                      ? 'rgba(196, 30, 58, 0.2)'
                      : 'transparent',
                  color:
                    selectedSeason === season ? '#d4af37' : darkMode ? '#aaa' : '#666',
                  fontWeight: selectedSeason === season ? '700' : '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  fontSize: '0.9rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                }}
                onMouseEnter={(e) => {
                  if (selectedSeason !== season) {
                    e.target.style.backgroundColor = darkMode
                      ? 'rgba(196, 30, 58, 0.1)'
                      : 'rgba(196, 30, 58, 0.05)';
                    e.target.style.color = '#c41e3a';
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedSeason !== season) {
                    e.target.style.backgroundColor = 'transparent';
                    e.target.style.color = darkMode ? '#aaa' : '#666';
                  }
                }}
              >
                {season}
                {season === currentSeason && (
                  <span
                    style={{
                      marginLeft: '0.5rem',
                      fontSize: '0.75rem',
                      fontWeight: '700',
                      color: '#d4af37',
                    }}
                  >
                    CURRENT
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Navigation */}
        <div
          style={{
            borderBottom: '2px solid rgba(196, 30, 58, 0.2)',
            display: 'flex',
            gap: '1rem',
            marginBottom: '2rem',
            paddingBottom: '1rem',
            flexWrap: 'wrap',
          }}
        >
          <button
            onClick={() => setActiveTab('standings')}
            style={{
              padding: '0.75rem 1.5rem',
              border: 'none',
              backgroundColor: 'transparent',
              color: activeTab === 'standings' ? '#d4af37' : darkMode ? '#aaa' : '#666',
              fontWeight: activeTab === 'standings' ? '700' : '600',
              cursor: 'pointer',
              fontSize: '0.95rem',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              borderBottom:
                activeTab === 'standings'
                  ? '3px solid #c41e3a'
                  : '3px solid transparent',
              marginBottom: '-1rem',
              paddingBottom: '1rem',
            }}
            onMouseEnter={(e) => {
              if (activeTab !== 'standings') {
                e.target.style.color = '#c41e3a';
              }
            }}
            onMouseLeave={(e) => {
              if (activeTab !== 'standings') {
                e.target.style.color = darkMode ? '#aaa' : '#666';
              }
            }}
          >
            📊 Standings
          </button>

          <button
            onClick={() => setActiveTab('history')}
            style={{
              padding: '0.75rem 1.5rem',
              border: 'none',
              backgroundColor: 'transparent',
              color: activeTab === 'history' ? '#d4af37' : darkMode ? '#aaa' : '#666',
              fontWeight: activeTab === 'history' ? '700' : '600',
              cursor: 'pointer',
              fontSize: '0.95rem',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              borderBottom:
                activeTab === 'history' ? '3px solid #c41e3a' : '3px solid transparent',
              marginBottom: '-1rem',
              paddingBottom: '1rem',
            }}
            onMouseEnter={(e) => {
              if (activeTab !== 'history') {
                e.target.style.color = '#c41e3a';
              }
            }}
            onMouseLeave={(e) => {
              if (activeTab !== 'history') {
                e.target.style.color = darkMode ? '#aaa' : '#666';
              }
            }}
          >
            🏆 Championship History
          </button>
        </div>

        {/* Tab Content */}
        <div style={{ animation: 'fadeIn 0.3s ease-out' }}>
          {activeTab === 'standings' && (
            <StandingsTable teams={leagueData?.teams || []} />
          )}
          {activeTab === 'history' && (
            <div
              style={{
                textAlign: 'center',
                padding: '3rem',
                color: darkMode ? '#999' : '#666',
              }}
            >
              <p>🏆 Championship History — coming soon</p>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default LeagueDashboard;

