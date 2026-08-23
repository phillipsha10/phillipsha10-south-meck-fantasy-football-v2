import React, { useState } from 'react';

const HeadToHeadRecords = ({ team, darkMode, allTeamsData }) => {
  const h2hRecords = [
    { opponent: 'Team Alpha', wins: 4, losses: 2, winPercentage: 66.7 },
    { opponent: 'Team Beta', wins: 3, losses: 3, winPercentage: 50.0 },
    { opponent: 'Team Gamma', wins: 5, losses: 1, winPercentage: 83.3 },
    { opponent: 'Team Delta', wins: 2, losses: 4, winPercentage: 33.3 },
    { opponent: 'Team Epsilon', wins: 4, losses: 2, winPercentage: 66.7 },
    { opponent: 'Team Zeta', wins: 3, losses: 3, winPercentage: 50.0 },
    { opponent: 'Team Eta', wins: 5, losses: 1, winPercentage: 83.3 },
    { opponent: 'Team Theta', wins: 2, losses: 4, winPercentage: 33.3 },
    { opponent: 'Team Iota', wins: 4, losses: 2, winPercentage: 66.7 },
    { opponent: 'Team Kappa', wins: 3, losses: 3, winPercentage: 50.0 },
    { opponent: 'Team Lambda', wins: 6, losses: 0, winPercentage: 100.0 },
    { opponent: 'Team Mu', wins: 1, losses: 5, winPercentage: 16.7 }
  ];

  const [sortConfig, setSortConfig] = useState({ key: 'opponent', direction: 'asc' });

  const totalWins = h2hRecords.reduce((sum, record) => sum + record.wins, 0);
  const totalLosses = h2hRecords.reduce((sum, record) => sum + record.losses, 0);
  const totalH2h = totalWins + totalLosses;
  const overallWinPercentage = totalH2h > 0 ? ((totalWins / totalH2h) * 100).toFixed(1) : 0;

  const sortedRecords = [...h2hRecords].sort((a, b) => {
    let aVal = a[sortConfig.key];
    let bVal = b[sortConfig.key];

    if (sortConfig.key === 'winPercentage') {
      aVal = parseFloat(aVal);
      bVal = parseFloat(bVal);
    }

    if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
    if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  const handleSort = (key) => {
    setSortConfig({
      key,
      direction: sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc'
    });
  };

  const SortableHeader = ({ label, sortKey }) => (
    <th
      onClick={() => handleSort(sortKey)}
      style={{
        padding: '1rem',
        textAlign: sortKey === 'opponent' ? 'left' : 'center',
        fontWeight: '600',
        color: '#c41e3a',
        cursor: 'pointer',
        userSelect: 'none',
        transition: 'all 0.2s ease'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = 'rgba(196, 30, 58, 0.05)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'transparent';
      }}
    >
      {label}
      {sortConfig.key === sortKey && (
        <span style={{ marginLeft: '0.5rem' }}>
          {sortConfig.direction === 'asc' ? '▲' : '▼'}
        </span>
      )}
    </th>
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
        🏁 Head-to-Head Records
      </h3>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '1rem',
          marginBottom: '2rem'
        }}
      >
        <div
          style={{
            background: darkMode ? '#1a1a1a' : 'white',
            padding: '1rem',
            borderRadius: '6px',
            border: '1px solid #c41e3a',
            textAlign: 'center'
          }}
        >
          <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.85rem', color: '#888' }}>
            H2H Wins
          </p>
          <p style={{ margin: 0, fontSize: '1.8rem', fontWeight: '800', color: '#c41e3a' }}>
            {totalWins}
          </p>
        </div>

        <div
          style={{
            background: darkMode ? '#1a1a1a' : 'white',
            padding: '1rem',
            borderRadius: '6px',
            border: '1px solid #ff6b6b',
            textAlign: 'center'
          }}
        >
          <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.85rem', color: '#888' }}>
            H2H Losses
          </p>
          <p style={{ margin: 0, fontSize: '1.8rem', fontWeight: '800', color: '#ff6b6b' }}>
            {totalLosses}
          </p>
        </div>

        <div
          style={{
            background: darkMode ? '#1a1a1a' : 'white',
            padding: '1rem',
            borderRadius: '6px',
            border: '1px solid #d4af37',
            textAlign: 'center'
          }}
        >
          <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.85rem', color: '#888' }}>
            Win %
          </p>
          <p style={{ margin: 0, fontSize: '1.8rem', fontWeight: '800', color: '#d4af37' }}>
            {overallWinPercentage}%
          </p>
        </div>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontSize: '0.9rem'
          }}
        >
          <thead>
            <tr style={{ borderBottom: '2px solid #c41e3a' }}>
              <SortableHeader label="Opponent" sortKey="opponent" />
              <SortableHeader label="Wins" sortKey="wins" />
              <SortableHeader label="Losses" sortKey="losses" />
              <SortableHeader label="Win %" sortKey="winPercentage" />
            </tr>
          </thead>
          <tbody>
            {sortedRecords.map((record, idx) => (
              <tr
                key={idx}
                style={{
                  borderBottom: '1px solid #ddd',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = darkMode
                    ? 'rgba(196, 30, 58, 0.1)'
                    : 'rgba(196, 30, 58, 0.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                <td style={{ padding: '1rem', fontWeight: '600' }}>
                  {record.opponent}
                </td>
                <td
                  style={{
                    padding: '1rem',
                    textAlign: 'center',
                    color: '#2ecc71',
                    fontWeight: '600'
                  }}
                >
                  {record.wins}
                </td>
                <td
                  style={{
                    padding: '1rem',
                    textAlign: 'center',
                    color: '#ff6b6b',
                    fontWeight: '600'
                  }}
                >
                  {record.losses}
                </td>
                <td
                  style={{
                    padding: '1rem',
                    textAlign: 'center',
                    fontWeight: '600'
                  }}
                >
                  <span
                    style={{
                      padding: '0.25rem 0.75rem',
                      borderRadius: '4px',
                      background: 'rgba(212, 175, 55, 0.2)',
                      color: '#d4af37'
                    }}
                  >
                    {record.winPercentage.toFixed(1)}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div
        style={{
          marginTop: '1.5rem',
          padding: '1rem',
          background: darkMode ? '#1a1a1a' : '#f9f9f9',
          borderRadius: '6px',
          borderLeft: '4px solid #d4af37',
          fontSize: '0.9rem'
        }}
      >
        <p style={{ margin: 0, color: '#888' }}>
          💡 <strong>Tip:</strong> Click any column header to sort your matchup records. Identify
          which teams you dominate and which ones give you trouble.
        </p>
      </div>
    </div>
  );
};

export default HeadToHeadRecords;
