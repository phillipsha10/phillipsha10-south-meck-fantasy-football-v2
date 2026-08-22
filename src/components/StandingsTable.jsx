import React, { useState } from 'react';

const StandingsTable = ({ teams = [] }) => {
  const [sortBy, setSortBy] = useState('wins');
  const [sortOrder, setSortOrder] = useState('desc');

  // Ensure teams is an array
  const teamsArray = Array.isArray(teams) ? teams : [];

  // Sort teams
  const sortedTeams = [...teamsArray].sort((a, b) => {
    let aVal, bVal;

    switch (sortBy) {
      case 'wins':
        aVal = a.wins || 0;
        bVal = b.wins || 0;
        break;
      case 'losses':
        aVal = a.losses || 0;
        bVal = b.losses || 0;
        break;
      case 'pct':
        aVal = (a.wins || 0) / ((a.wins || 0) + (a.losses || 0) || 1);
        bVal = (b.wins || 0) / ((b.wins || 0) + (b.losses || 0) || 1);
        break;
      case 'pf':
        aVal = a.pointsFor || 0;
        bVal = b.pointsFor || 0;
        break;
      case 'pa':
        aVal = a.pointsAgainst || 0;
        bVal = b.pointsAgainst || 0;
        break;
      default:
        return 0;
    }

    if (sortOrder === 'asc') {
      return aVal - bVal;
    } else {
      return bVal - aVal;
    }
  });

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('desc');
    }
  };

  const getRowStyles = (team) => {
    const baseStyles = {
      display: 'grid',
      gridTemplateColumns: '40px 1fr 80px 80px 100px 120px 120px',
      gap: '1rem',
      padding: '1rem',
      borderRadius: '8px',
      alignItems: 'center',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      borderLeft: '4px solid transparent',
    };

    // Champion highlighting
    if (team.isChampion) {
      return {
        ...baseStyles,
        background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.15) 0%, rgba(212, 175, 55, 0.05) 100%)',
        borderLeft: '4px solid #d4af37',
        boxShadow: 'inset 0 1px 3px rgba(212, 175, 55, 0.2)',
      };
    }

    // Runner-up highlighting
    if (team.isRunnerUp) {
      return {
        ...baseStyles,
        background: 'rgba(196, 30, 58, 0.08)',
        borderLeft: '4px solid #c41e3a',
      };
    }

    return baseStyles;
  };

  return (
    <div style={{ padding: '2rem', overflowX: 'auto' }}>
      <div style={{ minWidth: '900px' }}>
        {/* Header Row */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '40px 1fr 80px 80px 100px 120px 120px',
            gap: '1rem',
            padding: '1rem',
            backgroundColor: '#1a1a1a',
            color: '#d4af37',
            fontWeight: '700',
            borderRadius: '8px 8px 0 0',
            textTransform: 'uppercase',
            fontSize: '0.85rem',
            letterSpacing: '0.5px',
            borderBottom: '2px solid #c41e3a',
          }}
        >
          <div>Rank</div>
          <div
            onClick={() => handleSort('team')}
            style={{ cursor: 'pointer', userSelect: 'none' }}
          >
            Team {sortBy === 'team' && (sortOrder === 'asc' ? '▲' : '▼')}
          </div>
          <div
            onClick={() => handleSort('wins')}
            style={{ cursor: 'pointer', userSelect: 'none' }}
          >
            Wins {sortBy === 'wins' && (sortOrder === 'asc' ? '▲' : '▼')}
          </div>
          <div
            onClick={() => handleSort('losses')}
            style={{ cursor: 'pointer', userSelect: 'none' }}
          >
            Losses {sortBy === 'losses' && (sortOrder === 'asc' ? '▲' : '▼')}
          </div>
          <div
            onClick={() => handleSort('pct')}
            style={{ cursor: 'pointer', userSelect: 'none' }}
          >
            Win % {sortBy === 'pct' && (sortOrder === 'asc' ? '▲' : '▼')}
          </div>
          <div
            onClick={() => handleSort('pf')}
            style={{ cursor: 'pointer', userSelect: 'none' }}
          >
            Points For {sortBy === 'pf' && (sortOrder === 'asc' ? '▲' : '▼')}
          </div>
          <div
            onClick={() => handleSort('pa')}
            style={{ cursor: 'pointer', userSelect: 'none' }}
          >
            Points Against {sortBy === 'pa' && (sortOrder === 'asc' ? '▲' : '▼')}
          </div>
        </div>

        {/* Data Rows */}
        {sortedTeams.map((team, index) => {
          const wins = team.wins || 0;
          const losses = team.losses || 0;
          const winPct = (wins / (wins + losses || 1)).toFixed(3);

          return (
            <div
              key={team.teamName || index}
              style={getRowStyles(team)}
              onMouseEnter={(e) => {
                if (!team.isChampion && !team.isRunnerUp) {
                  e.currentTarget.style.backgroundColor = 'rgba(196, 30, 58, 0.05)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
                }
              }}
              onMouseLeave={(e) => {
                if (!team.isChampion && !team.isRunnerUp) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }
              }}
            >
              {/* Rank Badge */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background:
                    index === 0
                      ? 'linear-gradient(135deg, #d4af37, #c9a227)'
                      : index === 1
                      ? 'linear-gradient(135deg, #c0c0c0, #a8a8a8)'
                      : 'linear-gradient(135deg, #cd7f32, #b8600b)',
                  color: '#fff',
                  fontWeight: '700',
                  fontSize: '0.9rem',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
                }}
              >
                {index + 1}
              </div>

              {/* Team Name */}
              <div
                style={{
                  fontWeight: '600',
                  fontSize: '0.95rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}
              >
                {team.logo || '🏈'} {team.teamName}
              </div>

              {/* Wins - Green */}
              <div
                style={{
                  fontWeight: '700',
                  color: '#2ecc71',
                  fontSize: '1rem',
                  textAlign: 'center',
                }}
              >
                {wins}
              </div>

              {/* Losses - Red */}
              <div
                style={{
                  fontWeight: '700',
                  color: '#ff6b6b',
                  fontSize: '1rem',
                  textAlign: 'center',
                }}
              >
                {losses}
              </div>

              {/* Win Percentage */}
              <div
                style={{
                  fontWeight: '700',
                  color: '#d4af37',
                  fontSize: '1rem',
                  textAlign: 'center',
                }}
              >
                {(winPct * 100).toFixed(1)}%
              </div>

              {/* Points For */}
              <div
                style={{
                  textAlign: 'center',
                  fontSize: '0.95rem',
                  fontWeight: '600',
                }}
              >
                {(team.pointsFor || 0).toLocaleString('en-US', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </div>

              {/* Points Against */}
              <div
                style={{
                  textAlign: 'center',
                  fontSize: '0.95rem',
                  fontWeight: '600',
                }}
              >
                {(team.pointsAgainst || 0).toLocaleString('en-US', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Info Box */}
      <div
        style={{
          marginTop: '2rem',
          padding: '1rem',
          backgroundColor: 'rgba(196, 30, 58, 0.08)',
          borderLeft: '4px solid #c41e3a',
          borderRadius: '6px',
          fontSize: '0.9rem',
        }}
      >
        💡 <strong>Click column headers to sort</strong> • 🏆 = Championship • 🥈 = Runner-up
      </div>
    </div>
  );
};

export default StandingsTable;


