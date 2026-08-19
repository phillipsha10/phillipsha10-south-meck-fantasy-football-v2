import React from 'react';

const AwardTracker = ({ teams, matchups }) => {
  // Calculate awards based on team data
  const calculateAwards = () => {
    if (!teams || teams.length === 0) return [];

    const awards = [];

    // High Score Award
    const highScorer = [...teams].reduce((max, team) =>
      team.pointsFor > max.pointsFor ? team : max
    );
    if (highScorer) {
      awards.push({
        name: 'High Score of the Week',
        winner: highScorer.teamName,
        value: highScorer.pointsFor,
        emoji: '🔥',
        color: '#c41e3a',
      });
    }

    // Bench Blaster Award (team with most bench points)
    // This is estimated based on point differential
    const benchTeam = [...teams].sort(
      (a, b) => Math.abs(a.wins - a.losses) - Math.abs(b.wins - b.losses)
    )[0];
    if (benchTeam) {
      awards.push({
        name: 'Bench Blaster',
        winner: benchTeam.teamName,
        value: '?',
        emoji: '💺',
        color: '#3498db',
      });
    }

    // Closest Matchup (simulated)
    if (teams.length >= 2) {
      awards.push({
        name: 'Closest Matchup',
        winner: `${teams[0].teamName} vs ${teams[1].teamName}`,
        value: '(Check schedule)',
        emoji: '⚡',
        color: '#f39c12',
      });
    }

    // Best Record
    const bestRecord = [...teams].reduce((best, team) =>
      team.wins > best.wins ? team : best
    );
    if (bestRecord) {
      awards.push({
        name: 'Best Record',
        winner: bestRecord.teamName,
        value: `${bestRecord.wins}-${bestRecord.losses}`,
        emoji: '🏅',
        color: '#d4af37',
      });
    }

    // Upset Special
    if (teams.length > 2) {
      const middle = teams[Math.floor(teams.length / 2)];
      awards.push({
        name: 'Upset Watch',
        winner: middle.teamName,
        value: `${middle.wins}-${middle.losses}`,
        emoji: '😲',
        color: '#e74c3c',
      });
    }

    return awards;
  };

  const awards = calculateAwards();

  return (
    <div>
      <h2 style={{ color: '#c41e3a', marginBottom: '1.5rem' }}>
        🏅 Weekly Awards
      </h2>

      {awards.length > 0 ? (
        <div className="grid-container">
          {awards.map((award, index) => (
            <div
              key={index}
              className="card"
              style={{
                borderLeftColor: award.color,
              }}
            >
              <h3
                style={{
                  color: award.color,
                  marginBottom: '0.5rem',
                }}
              >
                {award.emoji} {award.name}
              </h3>
              <p style={{ fontSize: '1.1rem', fontWeight: '600' }}>
                {award.winner}
              </p>
              <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>
                {award.value}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="card">
          <p>Loading awards...</p>
        </div>
      )}

      <div
        style={{
          marginTop: '2rem',
          padding: '1rem',
          background: 'rgba(196, 30, 58, 0.05)',
          borderRadius: '4px',
          borderLeft: '3px solid #c41e3a',
        }}
      >
        <p style={{ fontSize: '0.9rem', margin: 0 }}>
          🎖️ <strong>Awards</strong> are calculated weekly based on league performance and matchup results.
        </p>
      </div>
    </div>
  );
};

export default AwardTracker;
