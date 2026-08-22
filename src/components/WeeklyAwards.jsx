import React, { useState } from 'react';

const WeeklyAwards = ({ darkMode, leagueData }) => {
  const [selectedWeek, setSelectedWeek] = useState(2);

  // Mock awards data
  const weeklyAwards = {
    2: {
      mostPoints: { team: 'Jay Darji', points: 287.3 },
      bestPlayerPerformance: { player: 'Patrick Mahomes', points: 62, team: 'Jay Darji' },
      bestMatchup: { team1: 'Jay Darji', points1: 287.3, team2: 'You', points2: 284.1 },
      yourPlace: 3
    },
    1: {
      mostPoints: { team: 'Lee Sutton', points: 298.5 },
      bestPlayerPerformance: { player: 'Josh Allen', points: 58, team: 'Lee Sutton' },
      bestMatchup: { team1: 'Lee Sutton', points1: 298.5, team2: 'Alex Vesano', points2: 276.2 },
      yourPlace: 1
    }
  };

  const currentWeekData = weeklyAwards[selectedWeek];

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
        🏅 Weekly Awards
      </h2>

      {/* Week Selector */}
      <div style={{
        display: 'flex',
        gap: '0.5rem',
        marginBottom: '1.5rem',
        borderBottom: '2px solid #ddd',
        paddingBottom: '1rem',
        flexWrap: 'wrap'
      }}>
        {[1, 2, 3, 4, 5].map((week) => (
          <button
            key={week}
            onClick={() => setSelectedWeek(week)}
            style={{
              padding: '0.5rem 1rem',
              border: 'none',
              borderRadius: '6px',
              backgroundColor: selectedWeek === week ? '#c41e3a' : 'transparent',
              color: selectedWeek === week ? '#ffffff' : (darkMode ? '#aaa' : '#666'),
              fontWeight: selectedWeek === week ? '700' : '600',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              fontSize: '0.9rem',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}
            onMouseEnter={(e) => {
              if (selectedWeek !== week) {
                e.target.style.backgroundColor = darkMode ? 'rgba(196, 30, 58, 0.1)' : 'rgba(196, 30, 58, 0.05)';
                e.target.style.color = '#c41e3a';
              }
            }}
            onMouseLeave={(e) => {
              if (selectedWeek !== week) {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.color = darkMode ? '#aaa' : '#666';
              }
            }}
          >
            Week {week}
          </button>
        ))}
      </div>

      {/* Awards Grid */}
      {currentWeekData && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1.5rem',
          marginBottom: '1.5rem'
        }}>
          {/* Most Points */}
          <div style={{
            backgroundColor: darkMode ? '#1a1a1a' : '#ffffff',
            border: '2px solid #ffc107',
            borderRadius: '10px',
            padding: '1.25rem',
            textAlign: 'center',
            boxShadow: '0 4px 12px rgba(255, 193, 7, 0.2)'
          }}>
            <div style={{
              fontSize: '2rem',
              marginBottom: '0.5rem'
            }}>
              🏆
            </div>
            <h3 style={{
              fontSize: '0.85rem',
              color: darkMode ? '#aaa' : '#666',
              textTransform: 'uppercase',
              fontWeight: '600',
              letterSpacing: '0.5px',
              margin: '0 0 0.75rem 0'
            }}>
              Most Points
            </h3>
            <div style={{
              fontSize: '1.5rem',
              fontWeight: '800',
              color: '#ffc107',
              marginBottom: '0.5rem'
            }}>
              {currentWeekData.mostPoints.team}
            </div>
            <div style={{
              fontSize: '1.2rem',
              fontWeight: '700',
              color: darkMode ? '#ccc' : '#666'
            }}>
              {currentWeekData.mostPoints.points}
            </div>
          </div>

          {/* Best Player Performance */}
          <div style={{
            backgroundColor: darkMode ? '#1a1a1a' : '#ffffff',
            border: '2px solid #e74c3c',
            borderRadius: '10px',
            padding: '1.25rem',
            textAlign: 'center',
            boxShadow: '0 4px 12px rgba(231, 76, 60, 0.2)'
          }}>
            <div style={{
              fontSize: '2rem',
              marginBottom: '0.5rem'
            }}>
              ⭐
            </div>
            <h3 style={{
              fontSize: '0.85rem',
              color: darkMode ? '#aaa' : '#666',
              textTransform: 'uppercase',
              fontWeight: '600',
              letterSpacing: '0.5px',
              margin: '0 0 0.75rem 0'
            }}>
              Best Player
            </h3>
            <div style={{
              fontSize: '1.3rem',
              fontWeight: '800',
              color: '#e74c3c',
              marginBottom: '0.5rem'
            }}>
              {currentWeekData.bestPlayerPerformance.player}
            </div>
            <div style={{
              fontSize: '0.95rem',
              color: darkMode ? '#ccc' : '#666',
              marginBottom: '0.5rem'
            }}>
              {currentWeekData.bestPlayerPerformance.points} pts
            </div>
            <div style={{
              fontSize: '0.8rem',
              color: darkMode ? '#aaa' : '#999'
            }}>
              by {currentWeekData.bestPlayerPerformance.team}
            </div>
          </div>

          {/* Best Matchup */}
          <div style={{
            backgroundColor: darkMode ? '#1a1a1a' : '#ffffff',
            border: '2px solid #3498db',
            borderRadius: '10px',
            padding: '1.25rem',
            textAlign: 'center',
            boxShadow: '0 4px 12px rgba(52, 152, 219, 0.2)'
          }}>
            <div style={{
              fontSize: '2rem',
              marginBottom: '0.5rem'
            }}>
              ⚡
            </div>
            <h3 style={{
              fontSize: '0.85rem',
              color: darkMode ? '#aaa' : '#666',
              textTransform: 'uppercase',
              fontWeight: '600',
              letterSpacing: '0.5px',
              margin: '0 0 0.75rem 0'
            }}>
              Best Matchup
            </h3>
            <div style={{
              fontSize: '0.9rem',
              marginBottom: '0.5rem'
            }}>
              <span style={{
                fontWeight: '700',
                color: '#3498db'
              }}>
                {currentWeekData.bestMatchup.team1}
              </span>
              <span style={{
                color: darkMode ? '#aaa' : '#999',
                margin: '0 0.5rem'
              }}>
                vs
              </span>
              <span style={{
                fontWeight: '700',
                color: '#3498db'
              }}>
                {currentWeekData.bestMatchup.team2}
              </span>
            </div>
            <div style={{
              fontSize: '0.8rem',
              color: darkMode ? '#ccc' : '#666'
            }}>
              {currentWeekData.bestMatchup.points1.toFixed(1)} - {currentWeekData.bestMatchup.points2.toFixed(1)}
            </div>
          </div>
        </div>
      )}

      {/* Your Placement */}
      {currentWeekData && (
        <div style={{
          backgroundColor: darkMode ? 'rgba(196, 30, 58, 0.1)' : 'rgba(196, 30, 58, 0.08)',
          border: '2px solid #c41e3a',
          borderRadius: '8px',
          padding: '1rem',
          textAlign: 'center'
        }}>
          <div style={{
            fontSize: '0.85rem',
            color: darkMode ? '#aaa' : '#666',
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            marginBottom: '0.5rem'
          }}>
            Your Placement This Week
          </div>
          <div style={{
            fontSize: '2.5rem',
            fontWeight: '800',
            color: '#c41e3a'
          }}>
            #{currentWeekData.yourPlace}
          </div>
        </div>
      )}
    </div>
  );
};

export default WeeklyAwards;
