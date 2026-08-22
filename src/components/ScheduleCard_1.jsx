import React from 'react';

const ScheduleCard = ({ team, darkMode, leagueData }) => {
  const schedule = [
    { week: 1, opponent: 'Team Alpha', pointsFor: 145.2, pointsAgainst: 132.8, result: 'W' },
    { week: 2, opponent: 'Team Beta', pointsFor: 118.6, pointsAgainst: 154.3, result: 'L' },
    { week: 3, opponent: 'Team Gamma', pointsFor: 162.1, pointsAgainst: 121.9, result: 'W' },
    { week: 4, opponent: 'Team Delta', pointsFor: 139.4, pointsAgainst: 142.7, result: 'L' },
    { week: 5, opponent: 'Team Epsilon', pointsFor: 156.8, pointsAgainst: 119.2, result: 'W' },
    { week: 6, opponent: 'Team Zeta', pointsFor: 0, pointsAgainst: 0, result: 'upcoming' },
    { week: 7, opponent: 'Team Eta', pointsFor: 0, pointsAgainst: 0, result: 'upcoming' },
    { week: 8, opponent: 'Team Theta', pointsFor: 0, pointsAgainst: 0, result: 'upcoming' }
  ];

  const nextMatchup = schedule.find((s) => s.result === 'upcoming');
  const currentWeek = schedule.find((s) => s.result !== 'upcoming')?.week || 0;

  const getResultColor = (result) => {
    if (result === 'W') return '#2ecc71';
    if (result === 'L') return '#ff6b6b';
    return '#95a5a6';
  };

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
        🏟️ Schedule & Next Matchup
      </h3>

      {nextMatchup && (
        <div
          style={{
            background: 'linear-gradient(135deg, #c41e3a 0%, #8b162a 100%)',
            padding: '1.5rem',
            borderRadius: '8px',
            marginBottom: '1.5rem',
            color: 'white'
          }}
        >
          <p style={{ margin: 0, fontSize: '0.9rem', opacity: 0.9 }}>
            Week {nextMatchup.week} Matchup
          </p>
          <h2 style={{ margin: '0.5rem 0 0 0', fontSize: '1.8rem', fontWeight: '800' }}>
            vs {nextMatchup.opponent}
          </h2>
          <p style={{ margin: '1rem 0 0 0', fontSize: '0.95rem', opacity: 0.95 }}>
            Get your lineup set before kickoff!
          </p>
        </div>
      )}

      <div
        style={{
          overflowX: 'auto',
          marginBottom: '1.5rem'
        }}
      >
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontSize: '0.9rem'
          }}
        >
          <thead>
            <tr style={{ borderBottom: '2px solid #c41e3a' }}>
              <th
                style={{
                  padding: '0.75rem',
                  textAlign: 'left',
                  fontWeight: '600',
                  color: '#c41e3a'
                }}
              >
                Week
              </th>
              <th
                style={{
                  padding: '0.75rem',
                  textAlign: 'left',
                  fontWeight: '600',
                  color: '#c41e3a'
                }}
              >
                Opponent
              </th>
              <th
                style={{
                  padding: '0.75rem',
                  textAlign: 'center',
                  fontWeight: '600',
                  color: '#c41e3a'
                }}
              >
                PF
              </th>
              <th
                style={{
                  padding: '0.75rem',
                  textAlign: 'center',
                  fontWeight: '600',
                  color: '#c41e3a'
                }}
              >
                PA
              </th>
              <th
                style={{
                  padding: '0.75rem',
                  textAlign: 'center',
                  fontWeight: '600',
                  color: '#c41e3a'
                }}
              >
                Result
              </th>
            </tr>
          </thead>
          <tbody>
            {schedule.map((game, idx) => (
              <tr
                key={idx}
                style={{
                  borderBottom: '1px solid #ddd',
                  background: game.result === 'upcoming' ? 'rgba(196, 30, 58, 0.05)' : 'transparent'
                }}
              >
                <td
                  style={{
                    padding: '0.75rem',
                    fontWeight: '600'
                  }}
                >
                  {game.week}
                </td>
                <td style={{ padding: '0.75rem' }}>
                  {game.opponent}
                </td>
                <td
                  style={{
                    padding: '0.75rem',
                    textAlign: 'center',
                    color: '#2ecc71',
                    fontWeight: '600'
                  }}
                >
                  {game.pointsFor > 0 ? game.pointsFor : '—'}
                </td>
                <td
                  style={{
                    padding: '0.75rem',
                    textAlign: 'center',
                    color: '#ff6b6b',
                    fontWeight: '600'
                  }}
                >
                  {game.pointsAgainst > 0 ? game.pointsAgainst : '—'}
                </td>
                <td
                  style={{
                    padding: '0.75rem',
                    textAlign: 'center',
                    fontWeight: '700'
                  }}
                >
                  <span
                    style={{
                      display: 'inline-block',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '4px',
                      background: getResultColor(game.result),
                      color: 'white',
                      fontSize: '0.85rem'
                    }}
                  >
                    {game.result === 'W' ? '✓ W' : game.result === 'L' ? '✗ L' : 'TBD'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '1rem'
        }}
      >
        <div
          style={{
            padding: '1rem',
            background: darkMode ? '#1a1a1a' : 'white',
            borderRadius: '6px',
            border: '1px solid #ddd'
          }}
        >
          <p style={{ margin: 0, fontSize: '0.85rem', color: '#888' }}>
            Current Record (through Week {currentWeek})
          </p>
          <p style={{ margin: '0.5rem 0 0 0', fontSize: '1.4rem', fontWeight: '800', color: '#2ecc71' }}>
            7–2
          </p>
        </div>
        <div
          style={{
            padding: '1rem',
            background: darkMode ? '#1a1a1a' : 'white',
            borderRadius: '6px',
            border: '1px solid #ddd'
          }}
        >
          <p style={{ margin: 0, fontSize: '0.85rem', color: '#888' }}>
            Points For (season)
          </p>
          <p style={{ margin: '0.5rem 0 0 0', fontSize: '1.4rem', fontWeight: '800', color: '#d4af37' }}>
            1245.3
          </p>
        </div>
      </div>
    </div>
  );
};

export default ScheduleCard;
