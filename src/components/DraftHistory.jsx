import React, { useState } from 'react';

const DraftHistory = ({ team, darkMode }) => {
  // Mock draft data - will be populated from DraftMemoryBank
  const draftHistory = [
    {
      year: 2026,
      picks: [
        { round: 1, player: 'Patrick Mahomes', position: 'QB', note: 'Championship roster' },
        { round: 2, player: 'Travis Kelce', position: 'TE', note: '' }
      ]
    },
    {
      year: 2025,
      picks: [
        { round: 1, player: 'Josh Allen', position: 'QB', note: 'Early QB reach' },
        { round: 2, player: 'Derrick Henry', position: 'RB', note: 'Great value' }
      ]
    },
    {
      year: 2024,
      picks: [
        { round: 1, player: 'Jalen Hurts', position: 'QB', note: 'Best value pick' }
      ]
    }
  ];

  const [expandedYear, setExpandedYear] = useState(2026);

  const getPositionColor = (position) => {
    const colors = {
      'QB': '#3498db',
      'RB': '#2ecc71',
      'WR': '#f39c12',
      'TE': '#e74c3c',
      'K': '#95a5a6',
      'DEF': '#9b59b6'
    };
    return colors[position] || '#d4af37';
  };

  return (
    <div style={{
      backgroundColor: darkMode ? '#2a2a2a' : '#f8f9fa',
      border: '2px solid #c41e3a',
      borderRadius: '10px',
      padding: '1.5rem',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      transition: 'all 0.3s ease'
    }}>
      <h2 style={{
        fontSize: '1.3rem',
        fontWeight: '800',
        color: '#c41e3a',
        margin: '0 0 1.5rem 0',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem'
      }}>
        📋 Draft History
      </h2>

      {/* Year Tabs */}
      <div style={{
        display: 'flex',
        gap: '0.5rem',
        marginBottom: '1.5rem',
        flexWrap: 'wrap',
        borderBottom: '2px solid #ddd',
        paddingBottom: '1rem'
      }}>
        {draftHistory.map((draft) => (
          <button
            key={draft.year}
            onClick={() => setExpandedYear(draft.year)}
            style={{
              padding: '0.75rem 1.5rem',
              border: 'none',
              borderRadius: '6px',
              backgroundColor: expandedYear === draft.year ? '#c41e3a' : 'transparent',
              color: expandedYear === draft.year ? '#ffffff' : (darkMode ? '#aaa' : '#666'),
              fontWeight: expandedYear === draft.year ? '700' : '600',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              fontSize: '0.95rem',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}
            onMouseEnter={(e) => {
              if (expandedYear !== draft.year) {
                e.target.style.backgroundColor = darkMode ? 'rgba(196, 30, 58, 0.1)' : 'rgba(196, 30, 58, 0.05)';
                e.target.style.color = '#c41e3a';
              }
            }}
            onMouseLeave={(e) => {
              if (expandedYear !== draft.year) {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.color = darkMode ? '#aaa' : '#666';
              }
            }}
          >
            {draft.year}
          </button>
        ))}
      </div>

      {/* Draft Picks for Selected Year */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: '1rem'
      }}>
        {draftHistory
          .find(d => d.year === expandedYear)
          ?.picks.map((pick, index) => (
            <div
              key={index}
              style={{
                backgroundColor: darkMode ? '#1a1a1a' : '#ffffff',
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '1rem',
                borderLeft: `4px solid ${getPositionColor(pick.position)}`,
                display: 'grid',
                gridTemplateColumns: 'auto 1fr auto',
                gap: '1rem',
                alignItems: 'start'
              }}
            >
              {/* Round Badge */}
              <div style={{
                backgroundColor: getPositionColor(pick.position),
                color: '#ffffff',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: '800',
                fontSize: '0.85rem'
              }}>
                R{pick.round}
              </div>

              {/* Player Info */}
              <div>
                <div style={{
                  fontSize: '1.1rem',
                  fontWeight: '700',
                  color: darkMode ? '#ffffff' : '#1a1a1a',
                  marginBottom: '0.25rem'
                }}>
                  {pick.player}
                </div>
                <div style={{
                  display: 'flex',
                  gap: '1rem',
                  alignItems: 'center'
                }}>
                  <span style={{
                    display: 'inline-block',
                    backgroundColor: getPositionColor(pick.position),
                    color: '#ffffff',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '20px',
                    fontSize: '0.75rem',
                    fontWeight: '700',
                    textTransform: 'uppercase'
                  }}>
                    {pick.position}
                  </span>
                  {pick.note && (
                    <span style={{
                      fontSize: '0.85rem',
                      color: '#d4af37',
                      fontStyle: 'italic'
                    }}>
                      💡 {pick.note}
                    </span>
                  )}
                </div>
              </div>

              {/* Position Color Indicator */}
              <div style={{
                fontSize: '1.5rem'
              }}>
                {'🎯'}
              </div>
            </div>
          ))}
      </div>

      {/* Info Box */}
      <div style={{
        marginTop: '1.5rem',
        padding: '1rem',
        backgroundColor: darkMode ? 'rgba(196, 30, 58, 0.1)' : 'rgba(196, 30, 58, 0.05)',
        borderLeft: '4px solid #c41e3a',
        borderRadius: '6px'
      }}>
        <p style={{
          fontSize: '0.85rem',
          color: darkMode ? '#aaa' : '#666',
          margin: 0,
          lineHeight: '1.5'
        }}>
          💡 <strong>Draft Memory Bank:</strong> Click on years to view draft strategy across seasons. Look for patterns in position targeting and risk tolerance.
        </p>
      </div>
    </div>
  );
};

export default DraftHistory;
