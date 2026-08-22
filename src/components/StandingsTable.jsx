import React, { useState } from 'react';

const StandingsTable = ({ teams }) => {
  const [sortBy, setSortBy] = useState('rank');
  const [sortDir, setSortDir] = useState('asc');

  const sortedTeams = [...teams].sort((a, b) => {
    let aVal, bVal;

    switch (sortBy) {
      case 'rank':
        aVal = a.rank;
        bVal = b.rank;
        break;
      case 'wins':
        aVal = b.wins - a.wins;
        bVal = 0;
        return aVal;
      case 'losses':
        aVal = a.losses - b.losses;
        bVal = 0;
        return aVal;
      case 'pointsFor':
        aVal = b.pointsFor - a.pointsFor;
        bVal = 0;
        return aVal;
      case 'pointsAgainst':
        aVal = b.pointsAgainst - a.pointsAgainst;
        bVal = 0;
        return aVal;
      default:
        aVal = a.rank;
        bVal = b.rank;
    }

    if (aVal < bVal) return sortDir === 'asc' ? -1 : 1;
    if (aVal > bVal) return sortDir === 'asc' ? 1 : -1;
    return 0;
  });

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortDir('asc');
    }
  };

  return (
    <div>
      <h2 style={{ color: '#c41e3a', marginBottom: '1.5rem' }}>
        Current Standings
      </h2>

      <table className="data-table">
        <thead>
          <tr>
            <th style={{ cursor: 'pointer' }} onClick={() => handleSort('rank')}>
              Rank {sortBy === 'rank' && (sortDir === 'asc' ? '↑' : '↓')}
            </th>
            <th>Team</th>
            <th>Owner</th>
            <th style={{ cursor: 'pointer' }} onClick={() => handleSort('wins')}>
              Wins {sortBy === 'wins' && (sortDir === 'asc' ? '↑' : '↓')}
            </th>
            <th style={{ cursor: 'pointer' }} onClick={() => handleSort('losses')}>
              Losses {sortBy === 'losses' && (sortDir === 'asc' ? '↑' : '↓')}
            </th>
            <th style={{ cursor: 'pointer' }} onClick={() => handleSort('pointsFor')}>
              Points For {sortBy === 'pointsFor' && (sortDir === 'asc' ? '↑' : '↓')}
            </th>
            <th
              style={{ cursor: 'pointer' }}
              onClick={() => handleSort('pointsAgainst')}
            >
              Points Against{' '}
              {sortBy === 'pointsAgainst' && (sortDir === 'asc' ? '↑' : '↓')}
            </th>
            <th>Streak</th>
          </tr>
        </thead>
        <tbody>
          {sortedTeams.map((team, index) => (
            <tr key={team.teamId}>
              <td>
                <span className="rank-badge">{team.rank}</span>
              </td>
              <td style={{ fontWeight: '600' }}>
                {team.teamName}
                {team.championships > 0 && (
                  <span style={{ marginLeft: '0.5rem' }} title="Champion">🏆</span>
                )}
                {team.runnersUp > 0 && (
                  <span style={{ marginLeft: '0.3rem' }} title="Runner-up">🥈</span>
                )}
              </td>
              <td>{team.owner}</td>
              <td style={{ fontWeight: '600', color: '#2ecc71' }}>
                {team.wins}
              </td>
              <td style={{ fontWeight: '600', color: '#ff6b6b' }}>
                {team.losses}
              </td>
              <td style={{ color: '#c41e3a', fontWeight: '600' }}>
                {team.pointsFor}
              </td>
              <td>{team.pointsAgainst}</td>
              <td>
                <span
                  style={{
                    color: team.streakType === 'WIN' ? '#2ecc71' : '#e74c3c',
                    fontWeight: 'bold',
                  }}
                >
                  {team.streakType === 'WIN' ? '🔥' : '❄️'} {team.streak}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: '2rem', padding: '1rem', background: 'rgba(196, 30, 58, 0.05)', borderRadius: '4px' }}>
        <p style={{ fontSize: '0.9rem', margin: 0 }}>
          💡 <strong>Pro Tip:</strong> Click on column headers to sort the standings by different criteria.
        </p>
      </div>
    </div>
  );
};

export default StandingsTable;

