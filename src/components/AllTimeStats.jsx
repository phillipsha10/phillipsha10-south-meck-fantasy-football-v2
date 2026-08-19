import React, { useState, useEffect } from 'react';

const AllTimeStats = ({ darkMode }) => {
  const [careerStats, setCareerStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('wins');

  useEffect(() => {
    const fetchAllSeasonData = async () => {
      try {
        setLoading(true);

        // Fetch from Google Sheet (Overall tab - sorted by Championships)
        const response = await fetch('/api/google-sheets?tab=overall');
        if (!response.ok) {
          throw new Error(`Failed to fetch Google Sheet data: ${response.statusText}`);
        }

        const sheetData = await response.json();
        console.log('Google Sheet data received:', sheetData);

        if (!sheetData.data || sheetData.data.length === 0) {
          console.warn('No data in Google Sheet');
          setCareerStats([]);
          setLoading(false);
          return;
        }

        // Transform Google Sheet data to our format
        const stats = sheetData.data.map((row, index) => {
          return {
            rank: index + 1,
            teamName: row.TEAM || 'Unknown',
            owner: row.TEAM || 'Unknown',
            logo: '🏈',
            totalWins: parseInt(row.Wins) || 0,
            totalLosses: parseInt(row.Losses) || 0,
            totalPointsFor: parseFloat(row.PF) || 0,
            totalPointsAgainst: parseFloat(row.PA) || 0,
            winPercentage: parseFloat(row['Win %']) || 0,
            pointsPerGame: parseFloat(row['Points Per Game']) || 0,
            pointsAgainstPerGame: parseFloat(row['Points Against Per Game']) || 0,
            championships: parseInt(row.Championships) || 0,
            runnersUp: parseInt(row['Runner-up']) || 0,
            moves: parseInt(row.Moves) || 0,
            movesPerSeason: parseFloat(row['Moves Per Season']) || 0,
          };
        });

        console.log('Transformed stats:', stats);
        setCareerStats(stats);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching all season data:', error);
        setLoading(false);
      }
    };

    fetchAllSeasonData();
  }, []);

  // Sort stats when sortBy changes
  useEffect(() => {
    setCareerStats((prevStats) =>
      [...prevStats].sort((a, b) => {
        if (sortBy === 'wins') return b.totalWins - a.totalWins;
        if (sortBy === 'losses') return a.totalLosses - b.totalLosses;
        if (sortBy === 'pointsFor') return b.totalPointsFor - a.totalPointsFor;
        return 0;
      })
    );
  }, [sortBy]);

  const handleSort = (field) => {
    setSortBy(field);
    setCareerStats((prevStats) =>
      [...prevStats].sort((a, b) => {
        if (field === 'wins') return b.totalWins - a.totalWins;
        if (field === 'losses') return a.totalLosses - b.totalLosses;
        if (field === 'pointsFor') return b.totalPointsFor - a.totalPointsFor;
        return 0;
      })
    );
  };

  if (loading) {
    return <div className="loading"><p>Loading career statistics...</p></div>;
  }

  return (
    <div className="all-time-stats">
      <h2 style={{ color: '#c41e3a', marginBottom: '1.5rem' }}>All-Time Career Stats (2014-2026)</h2>

      <div className="stats-table-container">
        <table className="stats-table">
          <thead>
            <tr>
              <th style={{ textAlign: 'left' }}>RANK</th>
              <th style={{ textAlign: 'left' }}>TEAM</th>
              <th style={{ textAlign: 'left' }}>OWNER</th>
              <th
                onClick={() => handleSort('wins')}
                style={{ cursor: 'pointer', userSelect: 'none' }}
                title="Click to sort"
              >
                WINS ↕
              </th>
              <th
                onClick={() => handleSort('losses')}
                style={{ cursor: 'pointer', userSelect: 'none' }}
                title="Click to sort"
              >
                LOSSES ↕
              </th>
              <th>WIN %</th>
              <th
                onClick={() => handleSort('pointsFor')}
                style={{ cursor: 'pointer', userSelect: 'none' }}
                title="Click to sort"
              >
                TOTAL POINTS ↕
              </th>
              <th>CHAMPIONSHIPS</th>
              <th>RUNNER-UP</th>
            </tr>
          </thead>
          <tbody>
            {careerStats.map((team, index) => {
              const totalGames = team.totalWins + team.totalLosses;
              const winPercentage =
                totalGames > 0 ? ((team.totalWins / totalGames) * 100).toFixed(1) : team.winPercentage?.toFixed(1) || '0.0';

              return (
                <tr key={team.teamName} className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
                  <td style={{ fontWeight: 'bold', color: '#c41e3a' }}>{index + 1}</td>
                  <td style={{ fontWeight: '600' }}>
                    {team.logo && <span style={{ marginRight: '0.5rem' }}>{team.logo}</span>}
                    {team.teamName}
                  </td>
                  <td>{team.owner}</td>
                  <td style={{ fontWeight: '600', color: '#4ade80' }}>{team.totalWins}</td>
                  <td style={{ fontWeight: '600', color: '#ff6b6b' }}>{team.totalLosses}</td>
                  <td>{winPercentage}%</td>
                  <td style={{ fontWeight: '600' }}>{Math.round(team.totalPointsFor)}</td>
                  <td style={{ fontWeight: '700', color: '#d4af37', fontSize: '1.1rem' }}>
                    {team.championships || 0} 🏆
                  </td>
                  <td style={{ fontWeight: '700', color: '#888' }}>
                    {team.runnersUp || 0} 🥈
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <style>{`
        .all-time-stats {
          padding: 1.5rem;
        }

        .stats-table-container {
          overflow-x: auto;
          border-radius: 8px;
          border: 2px solid #c41e3a;
        }

        .stats-table {
          width: 100%;
          border-collapse: collapse;
          background: ${darkMode ? '#2a2a2a' : '#fff'};
          color: ${darkMode ? '#fff' : '#000'};
        }

        .stats-table thead {
          background: #1a1a1a;
          color: #d4af37;
          font-weight: 700;
          text-transform: uppercase;
          font-size: 0.85rem;
        }

        .stats-table th {
          padding: 1rem;
          text-align: center;
          border-bottom: 2px solid #c41e3a;
        }

        .stats-table td {
          padding: 1rem;
          text-align: center;
          border-bottom: 1px solid ${darkMode ? '#444' : '#eee'};
        }

        .stats-table td:first-child,
        .stats-table th:first-child {
          text-align: center;
        }

        .stats-table td:nth-child(2),
        .stats-table th:nth-child(2) {
          text-align: left;
        }

        .stats-table td:nth-child(3),
        .stats-table th:nth-child(3) {
          text-align: center;
        }

        .stats-table tbody tr:hover {
          background: ${darkMode ? '#3a3a3a' : '#f9f9f9'};
          transition: background 0.2s ease;
        }

        .even-row {
          background: ${darkMode ? '#1f1f1f' : '#f5f5f5'};
        }

        .odd-row {
          background: ${darkMode ? '#2a2a2a' : '#fff'};
        }

        @media (max-width: 768px) {
          .stats-table {
            font-size: 0.85rem;
          }

          .stats-table th,
          .stats-table td {
            padding: 0.7rem 0.5rem;
          }

          .stats-table th {
            font-size: 0.75rem;
          }
        }
      `}</style>
    </div>
  );
};

export default AllTimeStats;

