import React, { useState } from 'react';

const YearByYearRecord = ({ team, darkMode, allTeamsData }) => {
  const [expandedYear, setExpandedYear] = useState(null);

  // Sample year-by-year data structure
  const yearByYearData = [
    {
      year: 2026,
      wins: 7,
      losses: 2,
      pointsFor: 1245.3,
      pointsAgainst: 1089.4,
      finish: 'In Progress'
    },
    {
      year: 2025,
      wins: 9,
      losses: 4,
      pointsFor: 1520.8,
      pointsAgainst: 1401.2,
      finish: '3rd Place'
    },
    {
      year: 2024,
      wins: 8,
      losses: 5,
      pointsFor: 1418.6,
      pointsAgainst: 1365.9,
      finish: '5th Place'
    },
    {
      year: 2023,
      wins: 10,
      losses: 3,
      pointsFor: 1567.2,
      pointsAgainst: 1298.4,
      finish: 'Runner-Up'
    },
    {
      year: 2022,
      wins: 7,
      losses: 6,
      pointsFor: 1345.1,
      pointsAgainst: 1389.7,
      finish: '6th Place'
    },
    {
      year: 2021,
      wins: 11,
      losses: 2,
      pointsFor: 1623.4,
      pointsAgainst: 1187.9,
      finish: 'Champion'
    }
  ];

  const toggleExpand = (year) => {
    setExpandedYear(expandedYear === year ? null : year);
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
        📈 Year-by-Year Record
      </h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {yearByYearData.map((year) => (
          <div key={year.year}>
            <div
              onClick={() => toggleExpand(year.year)}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '1rem',
                background: darkMode ? '#1a1a1a' : 'white',
                border: '1px solid #ddd',
                borderRadius: '6px',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = darkMode ? '#333' : '#f0f0f0';
                e.currentTarget.style.transform = 'translateX(4px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = darkMode ? '#1a1a1a' : 'white';
                e.currentTarget.style.transform = 'translateX(0)';
              }}
            >
              <div>
                <p style={{ margin: 0, fontWeight: '600', fontSize: '1.1rem' }}>
                  {year.year}
                </p>
                <p style={{ margin: '0.25rem 0 0 0', color: '#888', fontSize: '0.9rem' }}>
                  {year.finish}
                </p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p
                  style={{
                    margin: 0,
                    fontWeight: '700',
                    fontSize: '1.2rem',
                    color: year.wins > year.losses ? '#2ecc71' : '#ff6b6b'
                  }}
                >
                  {year.wins}–{year.losses}
                </p>
                <p
                  style={{
                    margin: '0.25rem 0 0 0',
                    color: '#d4af37',
                    fontSize: '0.85rem'
                  }}
                >
                  {((year.wins / (year.wins + year.losses)) * 100).toFixed(1)}%
                </p>
              </div>
              <span
                style={{
                  marginLeft: '1rem',
                  color: '#c41e3a',
                  fontWeight: 'bold',
                  fontSize: '1.2rem'
                }}
              >
                {expandedYear === year.year ? '▼' : '▶'}
              </span>
            </div>

            {expandedYear === year.year && (
              <div
                style={{
                  background: darkMode ? '#1a1a1a' : 'white',
                  border: '1px solid #ddd',
                  borderTop: 'none',
                  borderRadius: '0 0 6px 6px',
                  padding: '1rem',
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '1rem',
                  animation: 'fadeIn 0.3s ease'
                }}
              >
                <div>
                  <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.85rem', color: '#888' }}>
                    Points For
                  </p>
                  <p style={{ margin: 0, fontSize: '1.3rem', fontWeight: '700', color: '#2ecc71' }}>
                    {year.pointsFor.toFixed(1)}
                  </p>
                </div>
                <div>
                  <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.85rem', color: '#888' }}>
                    Points Against
                  </p>
                  <p style={{ margin: 0, fontSize: '1.3rem', fontWeight: '700', color: '#ff6b6b' }}>
                    {year.pointsAgainst.toFixed(1)}
                  </p>
                </div>
                <div style={{ gridColumn: '1 / -1' }}>
                  <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.85rem', color: '#888' }}>
                    Point Differential
                  </p>
                  <p
                    style={{
                      margin: 0,
                      fontSize: '1.3rem',
                      fontWeight: '700',
                      color: year.pointsFor > year.pointsAgainst ? '#d4af37' : '#c41e3a'
                    }}
                  >
                    {(year.pointsFor - year.pointsAgainst).toFixed(1)}
                  </p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default YearByYearRecord;
