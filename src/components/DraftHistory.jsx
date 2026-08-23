import React, { useState } from 'react';

const DraftHistory = ({ team, darkMode }) => {
  const [selectedYear, setSelectedYear] = useState(2026);

  const draftData = {
    2026: [
      { round: 1, pick: 7, player: 'Josh Allen', position: 'QB', nfl_team: 'BUF' },
      { round: 2, pick: 20, player: 'Travis Kelce', position: 'TE', nfl_team: 'KC' },
      { round: 3, pick: 31, player: 'CeeDee Lamb', position: 'WR', nfl_team: 'DAL' },
      { round: 4, pick: 42, player: 'Lamarr Jackson', position: 'QB', nfl_team: 'BAL' }
    ],
    2025: [
      { round: 1, pick: 5, player: 'Patrick Mahomes', position: 'QB', nfl_team: 'KC' },
      { round: 2, pick: 18, player: 'Stefon Diggs', position: 'WR', nfl_team: 'HOU' },
      { round: 3, pick: 29, player: 'Chris Jones', position: 'DEF', nfl_team: 'KC' }
    ],
    2024: [
      { round: 1, pick: 8, player: 'Jalen Hurts', position: 'QB', nfl_team: 'PHI' },
      { round: 2, pick: 22, player: 'Tyreek Hill', position: 'WR', nfl_team: 'MIA' }
    ],
    2023: [
      { round: 1, pick: 3, player: 'Jonathan Taylor', position: 'RB', nfl_team: 'IND' },
      { round: 2, pick: 14, player: 'Davante Adams', position: 'WR', nfl_team: 'LV' }
    ]
  };

  const positionColors = {
    QB: '#3498db',
    RB: '#2ecc71',
    WR: '#f39c12',
    TE: '#e74c3c',
    K: '#95a5a6',
    DEF: '#9b59b6'
  };

  const currentYearPicks = draftData[selectedYear] || [];

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
        📋 Draft History
      </h3>

      <div
        style={{
          display: 'flex',
          gap: '0.5rem',
          marginBottom: '1.5rem',
          flexWrap: 'wrap'
        }}
      >
        {[2026, 2025, 2024, 2023].map((year) => (
          <button
            key={year}
            onClick={() => setSelectedYear(year)}
            style={{
              padding: '0.5rem 1rem',
              border: selectedYear === year ? '2px solid #d4af37' : '1px solid #ddd',
              background: selectedYear === year ? '#c41e3a' : darkMode ? '#1a1a1a' : 'white',
              color: selectedYear === year ? '#fff' : darkMode ? '#fff' : '#000',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: selectedYear === year ? '600' : '400',
              transition: 'all 0.2s ease',
              fontSize: '0.9rem'
            }}
          >
            {year}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {currentYearPicks.length > 0 ? (
          currentYearPicks.map((pick, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '1rem',
                background: darkMode ? '#1a1a1a' : 'white',
                border: '1px solid #ddd',
                borderRadius: '6px',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateX(4px)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateX(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div
                style={{
                  background: positionColors[pick.position] || '#95a5a6',
                  color: 'white',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold',
                  fontSize: '0.75rem'
                }}
              >
                Rd {pick.round}
              </div>

              <div style={{ flex: 1 }}>
                <p style={{ margin: 0, fontWeight: '600', fontSize: '1rem' }}>
                  {pick.player}
                </p>
                <p style={{ margin: '0.25rem 0 0 0', color: '#888', fontSize: '0.85rem' }}>
                  {pick.position} • {pick.nfl_team}
                </p>
              </div>

              <div style={{ textAlign: 'right' }}>
                <p style={{ margin: 0, fontWeight: '600', color: '#c41e3a', fontSize: '0.9rem' }}>
                  Pick {pick.pick}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p style={{ textAlign: 'center', color: '#888' }}>
            Draft data not yet available
          </p>
        )}
      </div>

      <div
        style={{
          marginTop: '1.5rem',
          padding: '1rem',
          background: 'rgba(212, 175, 55, 0.1)',
          borderLeft: '4px solid #d4af37',
          borderRadius: '4px'
        }}
      >
        <p style={{ margin: 0, fontSize: '0.9rem', color: '#888' }}>
          💡 <strong>Draft Strategy:</strong> Mix of value-oriented picks and position security
        </p>
      </div>
    </div>
  );
};

export default DraftHistory;
