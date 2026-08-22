import React from 'react';

const CareerStats = ({ team, darkMode }) => {
  // Mock data - in production this would come from actual data
  const stats = {
    totalWins: 87,
    totalLosses: 65,
    championships: 2,
    runnersUp: 1,
    lastPlaces: 0
  };

  const winPercentage = ((stats.totalWins / (stats.totalWins + stats.totalLosses)) * 100).toFixed(1);

  return (
    <div style={{
      backgroundColor: darkMode ? '#2a2a2a' : '#f8f9fa',
      border: '2px solid #c41e3a',
      borderRadius: '10px',
      padding: '1.5rem',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      transition: 'all 0.3s ease',
      cursor: 'pointer'
    }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = '0 8px 20px rgba(196, 30, 58, 0.2)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
      }}
    >
      <h2 style={{
        fontSize: '1.3rem',
        fontWeight: '800',
        color: '#c41e3a',
        margin: '0 0 1.5rem 0',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem'
      }}>
        🏈 Career Stats
      </h2>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '1rem',
        marginBottom: '1.5rem'
      }}>
        {/* Record */}
        <div style={{
          backgroundColor: darkMode ? '#1a1a1a' : '#ffffff',
          padding: '1rem',
          borderRadius: '8px',
          borderLeft: '4px solid #c41e3a'
        }}>
          <div style={{
            fontSize: '0.85rem',
            color: darkMode ? '#aaa' : '#666',
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            marginBottom: '0.5rem'
          }}>
            Record
          </div>
          <div style={{
            fontSize: '1.8rem',
            fontWeight: '800',
            color: '#c41e3a'
          }}>
            {stats.totalWins}-{stats.totalLosses}
          </div>
        </div>

        {/* Win % */}
        <div style={{
          backgroundColor: darkMode ? '#1a1a1a' : '#ffffff',
          padding: '1rem',
          borderRadius: '8px',
          borderLeft: '4px solid #d4af37'
        }}>
          <div style={{
            fontSize: '0.85rem',
            color: darkMode ? '#aaa' : '#666',
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            marginBottom: '0.5rem'
          }}>
            Win %
          </div>
          <div style={{
            fontSize: '1.8rem',
            fontWeight: '800',
            color: '#d4af37'
          }}>
            {winPercentage}%
          </div>
        </div>
      </div>

      {/* Achievements */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gap: '0.75rem'
      }}>
        <div style={{
          backgroundColor: darkMode ? '#1a1a1a' : '#ffffff',
          padding: '1rem',
          borderRadius: '8px',
          borderLeft: '4px solid #2ecc71',
          textAlign: 'center'
        }}>
          <div style={{
            fontSize: '1.5rem',
            marginBottom: '0.25rem'
          }}>
            🏆
          </div>
          <div style={{
            fontSize: '1.3rem',
            fontWeight: '800',
            color: '#2ecc71'
          }}>
            {stats.championships}
          </div>
          <div style={{
            fontSize: '0.75rem',
            color: darkMode ? '#aaa' : '#666',
            marginTop: '0.25rem',
            fontWeight: '600'
          }}>
            Championships
          </div>
        </div>

        <div style={{
          backgroundColor: darkMode ? '#1a1a1a' : '#ffffff',
          padding: '1rem',
          borderRadius: '8px',
          borderLeft: '4px solid #ffc107',
          textAlign: 'center'
        }}>
          <div style={{
            fontSize: '1.5rem',
            marginBottom: '0.25rem'
          }}>
            🥈
          </div>
          <div style={{
            fontSize: '1.3rem',
            fontWeight: '800',
            color: '#ffc107'
          }}>
            {stats.runnersUp}
          </div>
          <div style={{
            fontSize: '0.75rem',
            color: darkMode ? '#aaa' : '#666',
            marginTop: '0.25rem',
            fontWeight: '600'
          }}>
            Runner-ups
          </div>
        </div>

        <div style={{
          backgroundColor: darkMode ? '#1a1a1a' : '#ffffff',
          padding: '1rem',
          borderRadius: '8px',
          borderLeft: '4px solid #ff6b6b',
          textAlign: 'center'
        }}>
          <div style={{
            fontSize: '1.5rem',
            marginBottom: '0.25rem'
          }}>
            📉
          </div>
          <div style={{
            fontSize: '1.3rem',
            fontWeight: '800',
            color: '#ff6b6b'
          }}>
            {stats.lastPlaces}
          </div>
          <div style={{
            fontSize: '0.75rem',
            color: darkMode ? '#aaa' : '#666',
            marginTop: '0.25rem',
            fontWeight: '600'
          }}>
            Last Places
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerStats;
