import React, { useState } from 'react';
import StandingsTable from './StandingsTable';
import ChampionshipHistory from './ChampionshipHistory';

const AllTimeRankings = ({ teamsData, darkMode }) => {
  const [activeTab, setActiveTab] = useState('standings');

  return (
    <div style={{
      padding: '2rem',
      minHeight: '100vh'
    }}>
      {/* Header */}
      <div style={{
        marginBottom: '2rem',
        borderBottom: '3px solid #c41e3a',
        paddingBottom: '1rem'
      }}>
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: '800',
          color: '#c41e3a',
          margin: '0 0 0.5rem 0',
          textTransform: 'uppercase',
          letterSpacing: '1px',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem'
        }}>
          ⭐ All-Time Rankings
        </h1>
        <p style={{
          fontSize: '1.1rem',
          color: '#d4af37',
          margin: 0,
          fontWeight: '600'
        }}>
          Career Statistics & Championship History
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="tabs-container" style={{
        marginBottom: '2rem',
        borderBottom: '2px solid #ddd',
        display: 'flex',
        gap: '0.5rem',
        flexWrap: 'wrap',
        paddingBottom: '1rem'
      }}>
        <button
          className={`tab-button ${activeTab === 'standings' ? 'active' : ''}`}
          onClick={() => setActiveTab('standings')}
          style={{
            padding: '0.75rem 1.5rem',
            border: 'none',
            borderRadius: '6px',
            backgroundColor: activeTab === 'standings' ? '#c41e3a' : 'transparent',
            color: activeTab === 'standings' ? '#ffffff' : (darkMode ? '#aaa' : '#666'),
            fontWeight: activeTab === 'standings' ? '700' : '600',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            fontSize: '0.95rem',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}
          onMouseEnter={(e) => {
            if (activeTab !== 'standings') {
              e.target.style.backgroundColor = darkMode ? 'rgba(196, 30, 58, 0.1)' : 'rgba(196, 30, 58, 0.05)';
              e.target.style.color = '#c41e3a';
            }
          }}
          onMouseLeave={(e) => {
            if (activeTab !== 'standings') {
              e.target.style.backgroundColor = 'transparent';
              e.target.style.color = darkMode ? '#aaa' : '#666';
            }
          }}
        >
          📊 Standings
        </button>

        <button
          className={`tab-button ${activeTab === 'history' ? 'active' : ''}`}
          onClick={() => setActiveTab('history')}
          style={{
            padding: '0.75rem 1.5rem',
            border: 'none',
            borderRadius: '6px',
            backgroundColor: activeTab === 'history' ? '#c41e3a' : 'transparent',
            color: activeTab === 'history' ? '#ffffff' : (darkMode ? '#aaa' : '#666'),
            fontWeight: activeTab === 'history' ? '700' : '600',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            fontSize: '0.95rem',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}
          onMouseEnter={(e) => {
            if (activeTab !== 'history') {
              e.target.style.backgroundColor = darkMode ? 'rgba(196, 30, 58, 0.1)' : 'rgba(196, 30, 58, 0.05)';
              e.target.style.color = '#c41e3a';
            }
          }}
          onMouseLeave={(e) => {
            if (activeTab !== 'history') {
              e.target.style.backgroundColor = 'transparent';
              e.target.style.color = darkMode ? '#aaa' : '#666';
            }
          }}
        >
          🏆 Championship History
        </button>
      </div>

      {/* Tab Content */}
      <div style={{
        animation: 'fadeIn 0.3s ease-out'
      }}>
        {activeTab === 'standings' && (
          <StandingsTable teams={teamsData || []} />
        )}
        {activeTab === 'history' && (
          <ChampionshipHistory />
        )}
      </div>

      {/* Info Box */}
      <div style={{
        marginTop: '3rem',
        padding: '1.5rem',
        backgroundColor: darkMode ? 'rgba(196, 30, 58, 0.1)' : 'rgba(196, 30, 58, 0.05)',
        borderLeft: '4px solid #c41e3a',
        borderRadius: '8px'
      }}>
        <p style={{
          fontSize: '0.9rem',
          color: darkMode ? '#aaa' : '#666',
          margin: 0,
          lineHeight: '1.6'
        }}>
          💡 <strong>All-Time Rankings Legend:</strong>
          <br />
          🏆 Championship teams are highlighted with a gold gradient
          <br />
          🥈 Runner-up teams are highlighted with a red tint
          <br />
          Click column headers to sort by any metric
        </p>
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

export default AllTimeRankings;
