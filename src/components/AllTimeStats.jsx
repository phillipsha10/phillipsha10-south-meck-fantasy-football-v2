import React, { useState, useEffect } from 'react';

const SEASONS = [2026, 2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014];

const AllTimeStats = ({ darkMode }) => {
  const [careerStats, setCareerStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('wins');

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const fetchAllSeasonData = async () => {
      try {
        setLoading(true);
        const allStats = {};

        // Fetch data for each season
        for (const season of SEASONS) {
          try {
            const response = await fetch(`/api/league?seasonId=${season}`);
            if (!response.ok) continue;

            const data = await response.json();
            if (data.teams) {
              data.teams.forEach((team) => {
                const teamId = team.id;
                if (!allStats[teamId]) {
                  allStats[teamId] = {
                    teamId: teamId,
                    teamName: team.name || `Team ${teamId}`,
                    owner: team.abbrev || 'Unknown',
                    logo: team.logo || '🏈',
                    totalWins: 0,
                    totalLosses: 0,
                    totalPointsFor: 0,
                    totalPointsAgainst: 0,
                    seasonRecords: {},
                    championships: 0,
                    runnersUp: 0,
                  };
                }

                // Get wins/losses from record.overall or record array
                let wins = 0;
                let losses = 0;

                if (team.record?.overall?.wins !== undefined) {
                  wins = team.record.overall.wins;
                  losses = team.record.overall.losses || 0;
                } else if (Array.isArray(team.record) && team.record[0]) {
                  wins = team.record[0].wins || 0;
                  losses = team.record[0].losses || 0;
                } else if (team.record?.wins !== undefined) {
                  wins = team.record.wins;
                  losses = team.record.losses || 0;
                }

                allStats[teamId].totalWins += wins;
                allStats[teamId].totalLosses += losses;
                allStats[teamId].totalPointsFor += team.points || 0;
                allStats[teamId].totalPointsAgainst += team.pointsAgainst || 0;
                allStats[teamId].seasonRecords[season] = {
                  wins,
                  losses,
                  pointsFor: team.points || 0,
                };
              });
            }
          } catch (error) {
            console.error(`Error fetching season ${season}:`, error);
          }
        }

        // Convert to array and sort
        const statsArray = Object.values(allStats).sort((a, b) => {
          if (sortBy === 'wins') return b.totalWins - a.totalWins;
          if (sortBy === 'losses') return a.totalLosses - b.totalLosses;
          if (sortBy === 'pointsFor') return b.totalPointsFor - a.totalPointsFor;
          return 0;
        });

        setCareerStats(statsArray);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching all season data:', error);
        setLoading(false);
      }
    };

    fetchAllSeasonData();
  }, []);

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
                totalGames > 0 ? ((team.totalWins / totalGames) * 100).toFixed(1) : '0.0';

              return (
                <tr key={team.teamId} className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
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
                    {team.championships || '0'} 🏆
                  </td>
                  <td style={{ fontWeight: '700', color: '#888' }}>
                    {team.runnersUp || '0'} 🥈
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

