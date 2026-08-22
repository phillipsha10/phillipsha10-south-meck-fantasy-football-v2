import React from 'react';

const CareerStats = ({ team, darkMode }) => {
  // Calculate stats from team data
  const totalWins = team?.allTimeWins || 0;
  const totalLosses = team?.allTimeLosses || 0;
  const championships = team?.championships || 0;
  const runnerUps = team?.runnerUps || 0;
  const lastPlaces = team?.lastPlaces || 0;

  const total = totalWins + totalLosses;
  const winPercentage = total > 0 ? ((totalWins / total) * 100).toFixed(1) : 0;

  return (
    <div
      style={{
        background: darkMode ? '#2a2a2a' : '#f8f8f8',
        border: '2px solid #c41e3a',
        borderRadius: '8px',
        padding: '1.5rem',
        boxShadow: darkMode ? '0 2px 8px rgba(0,0,0,0.3)' : '0 2px 8px rgba(0,0,0,0.1)'
      }}
    >
      <h3 style={{ color: '#c41e3a', marginTop: 0, marginBottom: '1.5rem' }}>
        📊 Career Stats
      </h3>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '1rem',
          marginBottom: '1.5rem'
        }}
      >
        <div
          style={{
            background: darkMode ? '#1a1a1a' : 'white',
            padding: '1rem',
            borderRadius: '6px',
            border: '1px solid #d4af37',
            textAlign: 'center'
          }}
        >
          <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.85rem', color: '#888' }}>
            All-Time Record
          </p>
          <p style={{ margin: 0, fontSize: '1.8rem', fontWeight: '800', color: '#c41e3a' }}>
            {totalWins}–{totalLosses}
          </p>
        </div>

        <div
          style={{
            background: darkMode ? '#1a1a1a' : 'white',
            padding: '1rem',
            borderRadius: '6px',
            border: '1px solid #d4af37',
            textAlign: 'center'
          }}
        >
          <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.85rem', color: '#888' }}>
            Win Percentage
          </p>
          <p style={{ margin: 0, fontSize: '1.8rem', fontWeight: '800', color: '#d4af37' }}>
            {winPercentage}%
          </p>
        </div>
      </div>

      <div style={{ borderTop: '1px solid #ddd', paddingTop: '1rem' }}>
        <h4 style={{ color: '#d4af37', marginTop: 0, marginBottom: '1rem', fontSize: '0.95rem' }}>
          Achievements
        </h4>

        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <div
            style={{
              background: 'rgba(212, 175, 55, 0.1)',
              padding: '0.75rem 1rem',
              borderRadius: '4px',
              border: '1px solid #d4af37',
              fontSize: '0.9rem'
            }}
          >
            <span style={{ fontWeight: '600' }}>🏆</span> {championships} Championship{championships !== 1 ? 's' : ''}
          </div>

          <div
            style={{
              background: 'rgba(196, 30, 58, 0.1)',
              padding: '0.75rem 1rem',
              borderRadius: '4px',
              border: '1px solid #c41e3a',
              fontSize: '0.9rem'
            }}
          >
            <span style={{ fontWeight: '600' }}>🥈</span> {runnerUps} Runner-Up{runnerUps !== 1 ? 's' : ''}
          </div>

          <div
            style={{
              background: 'rgba(200, 200, 200, 0.1)',
              padding: '0.75rem 1rem',
              borderRadius: '4px',
              border: '1px solid #999',
              fontSize: '0.9rem'
            }}
          >
            <span style={{ fontWeight: '600' }}>📉</span> {lastPlaces} Last Place{lastPlaces !== 1 ? 's' : ''}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerStats;
