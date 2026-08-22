import React, { useState } from 'react';

const ChampionshipHistory = () => {
  // Historical championship data (2014-2025)
  const history = [
    { year: 2025, champion: 'TBD', runner_up: 'TBD', points: '—' },
    { year: 2024, champion: 'TBD', runner_up: 'TBD', points: '—' },
    { year: 2023, champion: 'TBD', runner_up: 'TBD', points: '—' },
    { year: 2022, champion: 'TBD', runner_up: 'TBD', points: '—' },
    { year: 2021, champion: 'TBD', runner_up: 'TBD', points: '—' },
    { year: 2020, champion: 'TBD', runner_up: 'TBD', points: '—' },
    { year: 2019, champion: 'TBD', runner_up: 'TBD', points: '—' },
    { year: 2018, champion: 'TBD', runner_up: 'TBD', points: '—' },
    { year: 2017, champion: 'TBD', runner_up: 'TBD', points: '—' },
    { year: 2016, champion: 'TBD', runner_up: 'TBD', points: '—' },
    { year: 2015, champion: 'TBD', runner_up: 'TBD', points: '—' },
    { year: 2014, champion: 'TBD', runner_up: 'TBD', points: '—' },
  ];

  const [selectedYear, setSelectedYear] = useState(2025);

  return (
    <div>
      <h2 style={{ color: '#c41e3a', marginBottom: '1.5rem' }}>
        🏆 Championship History
      </h2>

      <p style={{ marginBottom: '1.5rem', fontSize: '0.95rem' }}>
        The South Mecklenburg Fantasy Football League has been running strong since
        2014. Below is the complete history of league champions and their playoff
        performances.
      </p>

      <table className="data-table">
        <thead>
          <tr>
            <th>Year</th>
            <th>Champion</th>
            <th>Runner-Up</th>
            <th>Championship Points</th>
          </tr>
        </thead>
        <tbody>
          {history.map((entry) => (
            <tr
              key={entry.year}
              onClick={() => setSelectedYear(entry.year)}
              style={{
                cursor: 'pointer',
                backgroundColor:
                  selectedYear === entry.year
                    ? 'rgba(196, 30, 58, 0.1)'
                    : undefined,
              }}
            >
              <td style={{ fontWeight: '600' }}>{entry.year}</td>
              <td style={{ color: '#c41e3a', fontWeight: '600' }}>
                {entry.champion === 'TBD' ? '📋 Pending' : `🏆 ${entry.champion}`}
              </td>
              <td>{entry.runner_up === 'TBD' ? '—' : entry.runner_up}</td>
              <td>{entry.points}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="grid-container" style={{ marginTop: '2rem' }}>
        <div className="card">
          <h3 style={{ color: '#c41e3a' }}>📜 League Stats</h3>
          <p>
            <strong>Seasons Played:</strong> {history.length}
          </p>
          <p>
            <strong>Championships Awarded:</strong> {history.filter((h) => h.champion !== 'TBD').length}
          </p>
          <p>
            <strong>Since:</strong> 2014
          </p>
          <p>
            <strong>Teams (Current):</strong> 12
          </p>
        </div>

        <div className="card">
          <h3 style={{ color: '#c41e3a' }}>🎯 Notable Records</h3>
          <p>
            <strong>Longest Active Streak:</strong> —
          </p>
          <p>
            <strong>Most Appearances:</strong> —
          </p>
          <p>
            <strong>Closest Finals:</strong> —
          </p>
        </div>
      </div>

      <div
        style={{
          marginTop: '2rem',
          padding: '1.5rem',
          background: 'rgba(212, 175, 55, 0.05)',
          borderRadius: '4px',
          borderLeft: '4px solid #d4af37',
        }}
      >
        <h3 style={{ color: '#d4af37', marginTop: 0 }}>
          📝 Update Championship Data
        </h3>
        <p style={{ fontSize: '0.9rem' }}>
          Championship history will be populated with actual results as seasons
          complete. Click on a year above to view details.
        </p>
      </div>
    </div>
  );
};

export default ChampionshipHistory;
