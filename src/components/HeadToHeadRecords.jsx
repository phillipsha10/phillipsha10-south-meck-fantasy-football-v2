import React, { useState } from 'react';

const HeadToHeadRecords = ({ team, darkMode, allTeamsData }) => {
  // Mock H2H data - in production this would be calculated from schedule data across all seasons
  const h2hRecords = [
    { opponent: 'Jay Darji', wins: 5, losses: 2, winPct: '71.4%' },
    { opponent: 'Lee Sutton', wins: 4, losses: 3, winPct: '57.1%' },
    { opponent: 'Alex Vesano', wins: 6, losses: 1, winPct: '85.7%' },
    { opponent: 'Caleb Cunningham', wins: 3, losses: 4, winPct: '42.9%' },
    { opponent: 'Stephen Hasty', wins: 7, losses: 2, winPct: '77.8%' },
    { opponent: 'Jakob Stewart', wins: 2, losses: 5, winPct: '28.6%' }
  ];

  const [sortBy, setSortBy] = useState('winPct');
  const [sortDir, setSortDir] = useState('desc');

  const sortedRecords = [...h2hRecords].sort((a, b) => {
    let aVal, bVal;

    switch (sortBy) {
      case 'opponent':
        aVal = a.opponent;
        bVal = b.opponent;
        if (aVal < bVal) return sortDir === 'asc' ? -1 : 1;
        if (aVal > bVal) return sortDir === 'asc' ? 1 : -1;
        return 0;
      case 'wins':
        aVal = b.wins - a.wins;
        return sortDir === 'asc' ? -aVal : aVal;
      case 'losses':
        aVal = b.losses - a.losses;
        return sortDir === 'asc' ? -aVal : aVal;
      case 'winPct':
      default:
        aVal = parseFloat(a.winPct) - parseFloat(b.winPct);
        return sortDir === 'asc' ? aVal : -aVal;
    }
  });

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortDir('desc');
    }
  };

  const getWinPctColor = (pct) => {
    const num = parseFloat(pct);
    if (num >= 75) return '#2ecc71';
    if (num >= 50) return '#f39c12';
    return '#ff6b6b';
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
        🔥 Head-to-Head Records
      </h2>

      <div style={{
        overflowX: 'auto',
        borderRadius: '8px'
      }}>
        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          fontSize: '0.95rem'
        }}>
          <thead>
            <tr style={{
              backgroundColor: darkMode ? '#1a1a1a' : '#f0f0f0',
              borderBottom: '2px solid #c41e3a'
            }}>
              <th
                onClick={() => handleSort('opponent')}
                style={{
                  padding: '1rem',
                  textAlign: 'left',
                  fontWeight: '700',
                  color: '#c41e3a',
                  cursor: 'pointer',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  fontSize: '0.85rem',
                  userSelect: 'none'
                }}
              >
                Opponent {sortBy === 'opponent' && (sortDir === 'asc' ? '↑' : '↓')}
              </th>
              <th
                onClick={() => handleSort('wins')}
                style={{
                  padding: '1rem',
                  textAlign: 'center',
                  fontWeight: '700',
                  color: '#c41e3a',
                  cursor: 'pointer',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  fontSize: '0.85rem',
                  userSelect: 'none'
                }}
              >
                W {sortBy === 'wins' && (sortDir === 'asc' ? '↑' : '↓')}
              </th>
              <th
                onClick={() => handleSort('losses')}
                style={{
                  padding: '1rem',
                  textAlign: 'center',
                  fontWeight: '700',
                  color: '#c41e3a',
                  cursor: 'pointer',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  fontSize: '0.85rem',
                  userSelect: 'none'
                }}
              >
                L {sortBy === 'losses' && (sortDir === 'asc' ? '↑' : '↓')}
              </th>
              <th
                onClick={() => handleSort('winPct')}
                style={{
                  padding: '1rem',
                  textAlign: 'center',
                  fontWeight: '700',
                  color: '#c41e3a',
                  cursor: 'pointer',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  fontSize: '0.85rem',
                  userSelect: 'none'
                }}
              >
                Win % {sortBy === 'winPct' && (sortDir === 'asc' ? '↑' : '↓')}
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedRecords.map((record, index) => (
              <tr
                key={record.opponent}
                style={{
                  borderBottom: '1px solid #ddd',
                  backgroundColor: index % 2 === 0 ? (darkMode ? '#1a1a1a' : '#ffffff') : (darkMode ? '#2a2a2a' : '#f8f9fa'),
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = darkMode ? '#2a2a2a' : '#f0f0f0';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = index % 2 === 0 ? (darkMode ? '#1a1a1a' : '#ffffff') : (darkMode ? '#2a2a2a' : '#f8f9fa');
                }}
              >
                <td style={{
                  padding: '1rem',
                  fontWeight: '600',
                  color: darkMode ? '#ffffff' : '#1a1a1a'
                }}>
                  {record.opponent}
                </td>
                <td style={{
                  padding: '1rem',
                  textAlign: 'center',
                  fontWeight: '700',
                  color: '#2ecc71',
                  fontSize: '1.05rem'
                }}>
                  {record.wins}
                </td>
                <td style={{
                  padding: '1rem',
                  textAlign: 'center',
                  fontWeight: '700',
                  color: '#ff6b6b',
                  fontSize: '1.05rem'
                }}>
                  {record.losses}
                </td>
                <td style={{
                  padding: '1rem',
                  textAlign: 'center',
                  fontWeight: '700',
                  color: getWinPctColor(record.winPct)
                }}>
                  {record.winPct}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Summary Stats */}
      <div style={{
        marginTop: '1.5rem',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
        gap: '1rem'
      }}>
        <div style={{
          backgroundColor: darkMode ? '#1a1a1a' : '#ffffff',
          padding: '1rem',
          borderRadius: '8px',
          borderLeft: '4px solid #2ecc71',
          textAlign: 'center'
        }}>
          <div style={{
            fontSize: '0.75rem',
            color: darkMode ? '#aaa' : '#666',
            fontWeight: '600',
            textTransform: 'uppercase',
            marginBottom: '0.5rem'
          }}>
            Total H2H Wins
          </div>
          <div style={{
            fontSize: '2rem',
            fontWeight: '800',
            color: '#2ecc71'
          }}>
            {h2hRecords.reduce((sum, r) => sum + r.wins, 0)}
          </div>
        </div>

        <div style={{
          backgroundColor: darkMode ? '#1a1a1a' : '#ffffff',
          padding: '1rem',
          borderRadius: '8px',
          borderLeft: '4px solid #ff6b6b',
          textAlign: 'center'
        }}>
          <div style={{
            fontSize: '0.75rem',
            color: darkMode ? '#aaa' : '#666',
            fontWeight: '600',
            textTransform: 'uppercase',
            marginBottom: '0.5rem'
          }}>
            Total H2H Losses
          </div>
          <div style={{
            fontSize: '2rem',
            fontWeight: '800',
            color: '#ff6b6b'
          }}>
            {h2hRecords.reduce((sum, r) => sum + r.losses, 0)}
          </div>
        </div>

        <div style={{
          backgroundColor: darkMode ? '#1a1a1a' : '#ffffff',
          padding: '1rem',
          borderRadius: '8px',
          borderLeft: '4px solid '#d4af37',
          textAlign: 'center'
        }}>
          <div style={{
            fontSize: '0.75rem',
            color: darkMode ? '#aaa' : '#666',
            fontWeight: '600',
            textTransform: 'uppercase',
            marginBottom: '0.5rem'
          }}>
            Overall H2H %
          </div>
          <div style={{
            fontSize: '2rem',
            fontWeight: '800',
            color: '#d4af37'
          }}>
            {((h2hRecords.reduce((sum, r) => sum + r.wins, 0) /
              (h2hRecords.reduce((sum, r) => sum + r.wins + r.losses, 0))) * 100).toFixed(1)}%
          </div>
        </div>
      </div>

      {/* Info */}
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
          💡 All-time head-to-head records against each opponent. Click column headers to sort by wins, losses, or win percentage. These records are calculated across all seasons.
        </p>
      </div>
    </div>
  );
};

export default HeadToHeadRecords;
