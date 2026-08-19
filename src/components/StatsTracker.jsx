import React, { useState } from 'react';

const StatsTracker = ({ teams }) => {
  const [sortBy, setSortBy] = useState('pointsFor');

  const sortedTeams = [...teams].sort((a, b) => {
    switch (sortBy) {
      case 'pointsFor':
        return b.pointsFor - a.pointsFor;
      case 'pointsAgainst':
        return b.pointsAgainst - a.pointsAgainst;
      case 'differential':
        return (b.pointsFor - b.pointsAgainst) - (a.pointsFor - a.pointsAgainst);
      case 'average':
        const avgA = a.wins > 0 ? a.pointsFor / a.wins : 0;
        const avgB = b.wins > 0 ? b.pointsFor / b.wins : 0;
        return avgB - avgA;
      default:
        return 0;
    }
  });

  return (
    <div>
      <h2 style={{ color: '#c41e3a', marginBottom: '1.5rem' }}>
        📈 Advanced Statistics
      </h2>

      <div style={{ marginBottom: '1.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <button
          className={`btn ${sortBy === 'pointsFor' ? 'active' : ''}`}
          onClick={() => setSortBy('pointsFor')}
          style={{
            backgroundColor: sortBy === 'pointsFor' ? '#c41e3a' : '#999',
          }}
        >
          Total Points
        </button>
        <button
          className={`btn ${sortBy === 'pointsAgainst' ? 'active' : ''}`}
          onClick={() => setSortBy('pointsAgainst')}
          style={{
            backgroundColor: sortBy === 'pointsAgainst' ? '#c41e3a' : '#999',
          }}
        >
          Points Against
        </button>
        <button
          className={`btn ${sortBy === 'differential' ? 'active' : ''}`}
          onClick={() => setSortBy('differential')}
          style={{
            backgroundColor: sortBy === 'differential' ? '#c41e3a' : '#999',
          }}
        >
          Point Differential
        </button>
        <button
          className={`btn ${sortBy === 'average' ? 'active' : ''}`}
          onClick={() => setSortBy('average')}
          style={{
            backgroundColor: sortBy === 'average' ? '#c41e3a' : '#999',
          }}
        >
          Avg per Win
        </button>
      </div>

      <table className="data-table">
        <thead>
          <tr>
            <th>Team</th>
            <th>Owner</th>
            <th>Points For</th>
            <th>Points Against</th>
            <th>Differential</th>
            <th>Avg/Game</th>
          </tr>
        </thead>
        <tbody>
          {sortedTeams.map((team) => {
            const differential = team.pointsFor - team.pointsAgainst;
            const avgPerGame2 = team.wins + team.losses > 0
              ? (team.pointsFor / (team.wins + team.losses)).toFixed(1)
              : '0.0';

            return (
              <tr key={team.teamId}>
                <td style={{ fontWeight: '600' }}>{team.teamName}</td>
                <td>{team.owner}</td>
                <td style={{ color: '#c41e3a', fontWeight: '600' }}>
                  {team.pointsFor}
                </td>
                <td>{team.pointsAgainst}</td>
                <td
                  style={{
                    color: differential >= 0 ? '#2ecc71' : '#e74c3c',
                    fontWeight: '600',
                  }}
                >
                  {differential >= 0 ? '+' : ''}{differential}
                </td>
                <td>{avgPerGame2}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div
        style={{
          marginTop: '2rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1rem',
        }}
      >
        <div className="card">
          <h3 style={{ color: '#c41e3a' }}>📊 League Insights</h3>
          <p>
            <strong>Total Teams:</strong> {teams.length}
          </p>
          <p>
            <strong>Avg Points For:</strong>{' '}
            {teams.length > 0
              ? (teams.reduce((sum, t) => sum + t.pointsFor, 0) / teams.length).toFixed(0)
              : '0'}
          </p>
          <p>
            <strong>Highest Score:</strong>{' '}
            {teams.length > 0
              ? Math.max(...teams.map((t) => t.pointsFor))
              : '0'}
          </p>
          <p>
            <strong>Lowest Score:</strong>{' '}
            {teams.length > 0
              ? Math.min(...teams.map((t) => t.pointsFor))
              : '0'}
          </p>
        </div>

        <div className="card">
          <h3 style={{ color: '#c41e3a' }}>🎯 Efficiency Metrics</h3>
          <p>
            <strong>Best Differential:</strong> {teams.length > 0
              ? `${Math.max(...teams.map((t) => t.pointsFor - t.pointsAgainst))}`
              : '0'}
          </p>
          <p>
            <strong>Worst Differential:</strong> {teams.length > 0
              ? `${Math.min(...teams.map((t) => t.pointsFor - t.pointsAgainst))}`
              : '0'}
          </p>
          <p>
            <strong>Most Consistent:</strong>{' '}
            {teams.length > 0
              ? teams.reduce((best, team) => {
                  const stdDev1 = team.wins > 0 ? team.pointsFor / team.wins : 0;
                  const stdDev2 = best.wins > 0 ? best.pointsFor / best.wins : 0;
                  return Math.abs(stdDev1 - 100) < Math.abs(stdDev2 - 100) ? team : best;
                }).teamName
              : 'N/A'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default StatsTracker;
