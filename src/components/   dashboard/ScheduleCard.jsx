import React from 'react';

const ScheduleCard = ({ team, darkMode, leagueData }) => {
  // Mock schedule data
  const schedule = [
    { week: 1, opponent: 'Lee Sutton', pointsFor: 287, pointsAgainst: 234, result: 'W' },
    { week: 2, opponent: 'Caleb Cunningham', pointsFor: 284, pointsAgainst: 291, result: 'L' },
    { week: 3, opponent: 'Alex Vesano', pointsFor: null, pointsAgainst: null, result: null },
    { week: 4, opponent: 'Jay Darji', pointsFor: null, pointsAgainst: null, result: null },
    { week: 5, opponent: 'BYE', pointsFor: null, pointsAgainst: null, result: 'BYE' },
    { week: 6, opponent: 'Stephen Hasty', pointsFor: null, pointsAgainst: null, result: null }
  ];

  const nextMatchup = schedule.find(s => s.result === null && s.result !== 'BYE');
  const averagePoints = (287 + 284) / 2;

  const getResultColor = (result) => {
    if (result === 'W') return '#2ecc71';
    if (result === 'L') return '#ff6b6b';
    if (result === 'BYE') return '#95a5a6';
    return 'transparent';
  };

  const getResultEmoji = (result) => {
    if (result === 'W') return '✓';
    if (result === 'L') return '✕';
    if (result === 'BYE') return '➖';
    return '?';
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
        📅 2026 Schedule
      </h2>

      {/* Next Matchup Highlight */}
      {nextMatchup && (
        <div style={{
          backgroundColor: darkMode ? 'rgba(196, 30, 58, 0.15)' : 'rgba(196, 30, 58, 0.08)',
          border: '2px solid #c41e3a',
          borderRadius: '8px',
          padding: '1.25rem',
          marginBottom: '1.5rem'
        }}>
          <div style={{
            fontSize: '0.85rem',
            color: darkMode ? '#aaa' : '#666',
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            marginBottom: '0.75rem'
          }}>
            ⚡ Next Week (Week {nextMatchup.week})
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr auto 1fr',
            gap: '1.5rem',
            alignItems: 'center',
            marginBottom: '1rem'
          }}>
            {/* Your Team */}
            <div style={{
              backgroundColor: darkMode ? '#1a1a1a' : '#ffffff',
              padding: '1rem',
              borderRadius: '8px',
              borderLeft: '4px solid #2ecc71',
              textAlign: 'center'
            }}>
              <div style={{
                fontSize: '0.9rem',
                color: darkMode ? '#aaa' : '#666',
                fontWeight: '600',
                marginBottom: '0.5rem'
              }}>
                You
              </div>
              <div style={{
                fontSize: '1.5rem',
                fontWeight: '800',
                color: '#2ecc71'
              }}>
                {team.owner}
              </div>
            </div>

            {/* VS */}
            <div style={{
              fontSize: '1.2rem',
              fontWeight: '700',
              color: '#c41e3a'
            }}>
              VS
            </div>

            {/* Opponent */}
            <div style={{
              backgroundColor: darkMode ? '#1a1a1a' : '#ffffff',
              padding: '1rem',
              borderRadius: '8px',
              borderLeft: '4px solid #ffc107',
              textAlign: 'center'
            }}>
              <div style={{
                fontSize: '0.9rem',
                color: darkMode ? '#aaa' : '#666',
                fontWeight: '600',
                marginBottom: '0.5rem'
              }}>
                Opponent
              </div>
              <div style={{
                fontSize: '1.5rem',
                fontWeight: '800',
                color: '#ffc107'
              }}>
                {nextMatchup.opponent}
              </div>
            </div>
          </div>

          {/* Prediction Stats */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '1rem'
          }}>
            <div style={{
              backgroundColor: darkMode ? '#2a2a2a' : '#f0f0f0',
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
                Your Avg Points
              </div>
              <div style={{
                fontSize: '1.3rem',
                fontWeight: '800',
                color: '#2ecc71'
              }}>
                {averagePoints.toFixed(1)}
              </div>
            </div>

            <div style={{
              backgroundColor: darkMode ? '#2a2a2a' : '#f0f0f0',
              padding: '0.75rem',
              borderRadius: '6px',
              borderLeft: '3px solid '#ffc107'
            }}>
              <div style={{
                fontSize: '0.75rem',
                color: darkMode ? '#aaa' : '#666',
                fontWeight: '600',
                textTransform: 'uppercase',
                marginBottom: '0.25rem'
              }}>
                Their Avg Points
              </div>
              <div style={{
                fontSize: '1.3rem',
                fontWeight: '800',
                color: '#ffc107'
              }}>
                {'--'}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Upcoming Schedule */}
      <div>
        <h3 style={{
          fontSize: '1rem',
          fontWeight: '700',
          color: '#c41e3a',
          marginBottom: '1rem',
          textTransform: 'uppercase',
          letterSpacing: '0.5px'
        }}>
          Upcoming Matchups
        </h3>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '0.75rem',
          maxHeight: '300px',
          overflowY: 'auto'
        }}>
          {schedule.map((game) => (
            <div
              key={game.week}
              style={{
                backgroundColor: darkMode ? '#1a1a1a' : '#ffffff',
                border: '1px solid #ddd',
                borderRadius: '6px',
                padding: '0.75rem 1rem',
                display: 'grid',
                gridTemplateColumns: 'auto 1fr auto auto',
                gap: '1rem',
                alignItems: 'center',
                borderLeft: `4px solid ${getResultColor(game.result) || '#d4af37'}`
              }}
            >
              <div style={{
                fontWeight: '800',
                color: '#c41e3a',
                fontSize: '0.9rem'
              }}>
                W{game.week}
              </div>

              <div>
                <div style={{
                  fontWeight: '600',
                  color: darkMode ? '#ffffff' : '#1a1a1a',
                  fontSize: '0.9rem'
                }}>
                  {game.opponent}
                </div>
              </div>

              {game.result && game.result !== 'BYE' && (
                <div style={{
                  display: 'flex',
                  gap: '0.5rem',
                  fontSize: '0.85rem',
                  color: darkMode ? '#aaa' : '#666'
                }}>
                  <span>{game.pointsFor}</span>
                  <span>-</span>
                  <span>{game.pointsAgainst}</span>
                </div>
              )}

              <div style={{
                backgroundColor: getResultColor(game.result),
                color: '#ffffff',
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: '800',
                fontSize: '0.8rem'
              }}>
                {getResultEmoji(game.result)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScheduleCard;
