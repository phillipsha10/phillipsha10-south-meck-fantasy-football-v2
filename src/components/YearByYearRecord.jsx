import React, { useState } from 'react';

const YearByYearRecord = ({ team, darkMode, allTeamsData }) => {
  // Mock data - in production this would come from actual historical data
  const records = [
    { year: 2026, wins: 4, losses: 1, pf: 1247, pa: 1089 },
    { year: 2025, wins: 11, losses: 3, pf: 1559, pa: 1342 },
    { year: 2024, wins: 8, losses: 6, pf: 1423, pa: 1401 },
    { year: 2023, wins: 9, losses: 5, pf: 1378, pa: 1289 },
    { year: 2022, wins: 7, losses: 7, pf: 1245, pa: 1267 },
    { year: 2021, wins: 10, losses: 4, pf: 1489, pa: 1234 }
  ];

  const [expandedYear, setExpandedYear] = useState(null);

  const getWinPercentage = (wins, losses) => {
    const total = wins + losses;
    return total > 0 ? ((wins / total) * 100).toFixed(1) : '0.0';
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
        📊 Season Records
      </h2>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: '0.75rem',
        maxHeight: '400px',
        overflowY: 'auto'
      }}>
        {records.map((record) => (
          <div
            key={record.year}
            style={{
              backgroundColor: darkMode ? '#1a1a1a' : '#ffffff',
              border: '1px solid #ddd',
              borderRadius: '8px',
              padding: '1rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              borderLeft: '4px solid #c41e3a'
            }}
            onClick={() => setExpandedYear(expandedYear === record.year ? null : record.year)}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = darkMode ? '#2a2a2a' : '#f0f0f0';
              e.currentTarget.style.borderLeftColor = '#d4af37';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = darkMode ? '#1a1a1a' : '#ffffff';
              e.currentTarget.style.borderLeftColor = '#c41e3a';
            }}
          >
            <div style={{
              display: 'grid',
              gridTemplateColumns: '80px 1fr auto',
              gap: '1rem',
              alignItems: 'center'
            }}>
              <div style={{
                fontSize: '1.3rem',
                fontWeight: '800',
                color: '#c41e3a'
              }}>
                {record.year}
              </div>

              <div style={{
                display: 'flex',
                gap: '1.5rem',
                alignItems: 'center'
              }}>
                <div>
                  <span style={{ fontWeight: '700', fontSize: '1.1rem', color: '#2ecc71' }}>
                    {record.wins}
                  </span>
                  <span style={{ color: darkMode ? '#999' : '#999', margin: '0 0.25rem' }}>-</span>
                  <span style={{ fontWeight: '700', fontSize: '1.1rem', color: '#ff6b6b' }}>
                    {record.losses}
                  </span>
                  <span style={{
                    marginLeft: '0.5rem',
                    color: '#d4af37',
                    fontWeight: '600',
                    fontSize: '0.9rem'
                  }}>
                    ({getWinPercentage(record.wins, record.losses)}%)
                  </span>
                </div>
              </div>

              <div style={{
                fontSize: '1.2rem',
                color: darkMode ? '#aaa' : '#666'
              }}>
                {expandedYear === record.year ? '▼' : '▶'}
              </div>
            </div>

            {/* Expanded Details */}
            {expandedYear === record.year && (
              <div style={{
                marginTop: '1rem',
                paddingTop: '1rem',
                borderTop: '1px solid #ddd',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '1rem',
                animation: 'slideDown 0.3s ease-out'
              }}>
                <div style={{
                  backgroundColor: darkMode ? '#2a2a2a' : '#f8f9fa',
                  padding: '0.75rem',
                  borderRadius: '6px',
                  borderLeft: '3px solid #2ecc71'
                }}>
                  <div style={{
                    fontSize: '0.75rem',
                    color: darkMode ? '#aaa' : '#666',
                    fontWeight: '600',
                    textTransform: 'uppercase',
                    marginBottom: '0.25rem'
                  }}>
                    Points For
                  </div>
                  <div style={{
                    fontSize: '1.3rem',
                    fontWeight: '800',
                    color: '#2ecc71'
                  }}>
                    {record.pf.toLocaleString()}
                  </div>
                </div>

                <div style={{
                  backgroundColor: darkMode ? '#2a2a2a' : '#f8f9fa',
                  padding: '0.75rem',
                  borderRadius: '6px',
                  borderLeft: '3px solid #ff6b6b'
                }}>
                  <div style={{
                    fontSize: '0.75rem',
                    color: darkMode ? '#aaa' : '#666',
                    fontWeight: '600',
                    textTransform: 'uppercase',
                    marginBottom: '0.25rem'
                  }}>
                    Points Against
                  </div>
                  <div style={{
                    fontSize: '1.3rem',
                    fontWeight: '800',
                    color: '#ff6b6b'
                  }}>
                    {record.pa.toLocaleString()}
                  </div>
                </div>

                <div style={{
                  gridColumn: '1 / -1',
                  backgroundColor: darkMode ? '#2a2a2a' : '#f8f9fa',
                  padding: '0.75rem',
                  borderRadius: '6px',
                  borderLeft: '3px solid #d4af37'
                }}>
                  <div style={{
                    fontSize: '0.75rem',
                    color: darkMode ? '#aaa' : '#666',
                    fontWeight: '600',
                    textTransform: 'uppercase',
                    marginBottom: '0.25rem'
                  }}>
                    Point Differential
                  </div>
                  <div style={{
                    fontSize: '1.2rem',
                    fontWeight: '800',
                    color: (record.pf - record.pa) >= 0 ? '#2ecc71' : '#ff6b6b'
                  }}>
                    {(record.pf - record.pa) >= 0 ? '+' : ''}{(record.pf - record.pa).toLocaleString()}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
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

export default YearByYearRecord;
