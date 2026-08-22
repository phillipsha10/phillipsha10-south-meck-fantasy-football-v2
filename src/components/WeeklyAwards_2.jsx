import React, { useState } from 'react';

const WeeklyAwards = ({ darkMode, leagueData }) => {
  const [selectedWeek, setSelectedWeek] = useState(1);

  const weeklyAwards = {
    1: {
      mostPoints: { team: 'Team Alpha', points: 162.1 },
      bestPlayer: { player: 'Travis Kelce', points: 28.4 },
      bestMatchup: { team1: 'Team Alpha', team2: 'Team Gamma', score1: 162.1, score2: 145.8 },
      yourPlacement: 3
    },
    2: {
      mostPoints: { team: 'Team Beta', points: 178.3 },
      bestPlayer: { player: 'Josh Allen', points: 31.2 },
      bestMatchup: { team1: 'Team Beta', team2: 'Team Delta', score1: 178.3, score2: 172.9 },
      yourPlacement: 7
    },
    3: {
      mostPoints: { team: 'Team Delta', points: 169.4 },
      bestPlayer: { player: 'CeeDee Lamb', points: 25.6 },
      bestMatchup: { team1: 'Team Delta', team2: 'Team Epsilon', score1: 169.4, score2: 156.2 },
      yourPlacement: 2
    },
    4: {
      mostPoints: { team: 'Team Epsilon', points: 173.7 },
      bestPlayer: { player: 'Jaylen Hurts', points: 29.8 },
      bestMatchup: { team1: 'Team Epsilon', team2: 'Team Gamma', score1: 173.7, score2: 168.1 },
      yourPlacement: 4
    },
    5: {
      mostPoints: { team: 'Team Zeta', points: 181.2 },
      bestPlayer: { player: 'Patrick Mahomes', points: 32.1 },
      bestMatchup: { team1: 'Team Zeta', team2: 'Team Alpha', score1: 181.2, score2: 175.3 },
      yourPlacement: 6
    }
  };

  const awards = weeklyAwards[selectedWeek] || weeklyAwards[1];

  const AwardBox = ({ title, icon, content, color }) => (
    <div
      style={{
        background: darkMode ? '#1a1a1a' : 'white',
        border: `2px solid ${color}`,
        borderRadius: '8px',
        padding: '1.5rem',
        textAlign: 'center'
      }}
    >
      <p
        style={{
          margin: 0,
          fontSize: '2.5rem',
          marginBottom: '0.5rem'
        }}
      >
        {icon}
      </p>
      <h4
        style={{
          margin: '0 0 0.75rem 0',
          color: color,
          fontSize: '0.95rem',
          textTransform: 'uppercase',
          letterSpacing: '0.5px'
        }}
      >
        {title}
      </h4>
      {content}
    </div>
  );

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
        🏆 Weekly Awards
      </h3>

      <div
        style={{
          display: 'flex',
          gap: '0.5rem',
          marginBottom: '2rem',
          flexWrap: 'wrap'
        }}
      >
        {[1, 2, 3, 4, 5].map((week) => (
          <button
            key={week}
            onClick={() => setSelectedWeek(week)}
            style={{
              padding: '0.5rem 1rem',
              border: selectedWeek === week ? '2px solid #d4af37' : '1px solid #ddd',
              background: selectedWeek === week ? '#c41e3a' : darkMode ? '#1a1a1a' : 'white',
              color: selectedWeek === week ? '#fff' : darkMode ? '#fff' : '#000',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: selectedWeek === week ? '600' : '400',
              transition: 'all 0.2s ease',
              fontSize: '0.9rem'
            }}
          >
            Week {week}
          </button>
        ))}
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1.5rem',
          marginBottom: '2rem'
        }}
      >
        <AwardBox
          title="Most Points"
          icon="🏆"
          color="#d4af37"
          content={
            <>
              <p
                style={{
                  margin: 0,
                  fontSize: '1.2rem',
                  fontWeight: '700',
                  color: '#d4af37'
                }}
              >
                {awards.mostPoints.team}
              </p>
              <p
                style={{
                  margin: '0.5rem 0 0 0',
                  fontSize: '1.8rem',
                  fontWeight: '800',
                  color: darkMode ? '#fff' : '#000'
                }}
              >
                {awards.mostPoints.points.toFixed(1)}
              </p>
              <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.8rem', color: '#888' }}>
                points
              </p>
            </>
          }
        />

        <AwardBox
          title="Best Player Performance"
          icon="⭐"
          color="#f39c12"
          content={
            <>
              <p
                style={{
                  margin: 0,
                  fontSize: '1.2rem',
                  fontWeight: '700',
                  color: '#f39c12'
                }}
              >
                {awards.bestPlayer.player}
              </p>
              <p
                style={{
                  margin: '0.5rem 0 0 0',
                  fontSize: '1.8rem',
                  fontWeight: '800',
                  color: darkMode ? '#fff' : '#000'
                }}
              >
                {awards.bestPlayer.points.toFixed(1)}
              </p>
              <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.8rem', color: '#888' }}>
                points scored
              </p>
            </>
          }
        />

        <AwardBox
          title="Best Matchup"
          icon="⚡"
          color="#3498db"
          content={
            <>
              <p
                style={{
                  margin: 0,
                  fontSize: '0.95rem',
                  fontWeight: '600'
                }}
              >
                {awards.bestMatchup.team1}
              </p>
              <p
                style={{
                  margin: '0.25rem 0 0 0',
                  fontSize: '1.3rem',
                  fontWeight: '800',
                  color: '#3498db'
                }}
              >
                {awards.bestMatchup.score1.toFixed(1)}
              </p>
              <p style={{ margin: '0.5rem 0', fontSize: '0.8rem', color: '#888' }}>
                vs {awards.bestMatchup.score2.toFixed(1)}
              </p>
              <p
                style={{
                  margin: 0,
                  fontSize: '0.85rem',
                  fontWeight: '600',
                  color: '#888'
                }}
              >
                {awards.bestMatchup.team2}
              </p>
            </>
          }
        />
      </div>

      <div
        style={{
          background: 'linear-gradient(135deg, rgba(196, 30, 58, 0.1) 0%, rgba(212, 175, 55, 0.1) 100%)',
          border: '2px dashed #c41e3a',
          borderRadius: '8px',
          padding: '1.5rem',
          textAlign: 'center'
        }}
      >
        <p style={{ margin: 0, fontSize: '0.9rem', color: '#888', marginBottom: '0.75rem' }}>
          📍 Your Placement This Week
        </p>
        <div
          style={{
            fontSize: '3rem',
            fontWeight: '900',
            color: '#c41e3a',
            margin: '0.5rem 0'
          }}
        >
          #{awards.yourPlacement}
        </div>
        <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.85rem', color: '#888' }}>
          out of 12 teams
        </p>
      </div>
    </div>
  );
};

export default WeeklyAwards;
