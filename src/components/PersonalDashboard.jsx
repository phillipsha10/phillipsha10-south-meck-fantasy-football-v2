import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const PersonalDashboard = ({ leagueData, darkMode, allTeamsData }) => {
  const { teamId } = useParams();
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [isShaking, setIsShaking] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  // Load selected team from localStorage and trigger entry animation
  useEffect(() => {
    const storedTeam = localStorage.getItem('selectedTeam');
    if (storedTeam) {
      const team = JSON.parse(storedTeam);
      setSelectedTeam(team);

      // Trigger shake animation on entry
      setIsShaking(true);
      setShowMessage(true);

      setTimeout(() => {
        setIsShaking(false);
        setTimeout(() => {
          setShowMessage(false);
        }, 1500);
      }, 800);
    }
  }, []);

  if (!selectedTeam) {
    return (
      <div style={{
        padding: '2rem',
        textAlign: 'center',
        color: darkMode ? '#999' : '#666'
      }}>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div
      className={isShaking ? 'dashboard-shake' : ''}
      style={{
        padding: '2rem',
        position: 'relative'
      }}
    >
      {/* Entry Animation Message */}
      {showMessage && (
        <div style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: '2.5rem',
          fontWeight: '800',
          color: '#d4af37',
          textShadow: '2px 2px 8px rgba(0, 0, 0, 0.8)',
          zIndex: 100,
          animation: 'fadeInOut 1.5s ease-in-out',
          textAlign: 'center',
          pointerEvents: 'none',
          letterSpacing: '1px'
        }}>
          ⚡ ARE YOU READY FOR SOME FOOTBALL? ⚡
        </div>
      )}

      {/* Dashboard Header */}
      <div style={{
        marginBottom: '2rem',
        borderBottom: '2px solid #c41e3a',
        paddingBottom: '1rem'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          marginBottom: '1rem'
        }}>
          <span style={{ fontSize: '2.5rem' }}>{selectedTeam.logo}</span>
          <div>
            <h1 style={{
              fontSize: '2rem',
              fontWeight: '800',
              color: '#c41e3a',
              margin: '0 0 0.25rem 0',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}>
              {selectedTeam.teamName}
            </h1>
            <p style={{
              fontSize: '1.1rem',
              color: '#d4af37',
              margin: 0,
              fontWeight: '600'
            }}>
              Owner: {selectedTeam.owner}
            </p>
          </div>
        </div>
      </div>

      {/* Placeholder Content - Dashboard sections will go here */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
        gap: '2rem',
        marginBottom: '2rem'
      }}>
        <div style={{
          background: darkMode ? '#2a2a2a' : '#f8f8f8',
          border: '2px solid #c41e3a',
          borderRadius: '8px',
          padding: '2rem',
          textAlign: 'center',
          animation: 'fadeIn 0.6s ease-in-out'
        }}>
          <p style={{ color: '#888', margin: 0 }}>📊 Career Stats</p>
          <p style={{ color: '#888', fontSize: '0.9rem', marginTop: '1rem' }}>
            (Coming soon)
          </p>
        </div>

        <div style={{
          background: darkMode ? '#2a2a2a' : '#f8f8f8',
          border: '2px solid #c41e3a',
          borderRadius: '8px',
          padding: '2rem',
          textAlign: 'center',
          animation: 'fadeIn 0.7s ease-in-out'
        }}>
          <p style={{ color: '#888', margin: 0 }}>📈 Year-by-Year Record</p>
          <p style={{ color: '#888', fontSize: '0.9rem', marginTop: '1rem' }}>
            (Coming soon)
          </p>
        </div>

        <div style={{
          background: darkMode ? '#2a2a2a' : '#f8f8f8',
          border: '2px solid #c41e3a',
          borderRadius: '8px',
          padding: '2rem',
          textAlign: 'center',
          animation: 'fadeIn 0.8s ease-in-out'
        }}>
          <p style={{ color: '#888', margin: 0 }}>📋 Draft History</p>
          <p style={{ color: '#888', fontSize: '0.9rem', marginTop: '1rem' }}>
            (Coming soon)
          </p>
        </div>

        <div style={{
          background: darkMode ? '#2a2a2a' : '#f8f8f8',
          border: '2px solid #c41e3a',
          borderRadius: '8px',
          padding: '2rem',
          textAlign: 'center',
          animation: 'fadeIn 0.9s ease-in-out'
        }}>
          <p style={{ color: '#888', margin: 0 }}>🏟️ Schedule</p>
          <p style={{ color: '#888', fontSize: '0.9rem', marginTop: '1rem' }}>
            (Coming soon)
          </p>
        </div>

        <div style={{
          background: darkMode ? '#2a2a2a' : '#f8f8f8',
          border: '2px solid #c41e3a',
          borderRadius: '8px',
          padding: '2rem',
          textAlign: 'center',
          animation: 'fadeIn 1.0s ease-in-out'
        }}>
          <p style={{ color: '#888', margin: 0 }}>🏁 Head-to-Head</p>
          <p style={{ color: '#888', fontSize: '0.9rem', marginTop: '1rem' }}>
            (Coming soon)
          </p>
        </div>

        <div style={{
          background: darkMode ? '#2a2a2a' : '#f8f8f8',
          border: '2px solid #c41e3a',
          borderRadius: '8px',
          padding: '2rem',
          textAlign: 'center',
          animation: 'fadeIn 1.1s ease-in-out'
        }}>
          <p style={{ color: '#888', margin: 0 }}>📰 League News</p>
          <p style={{ color: '#888', fontSize: '0.9rem', marginTop: '1rem' }}>
            (Coming soon)
          </p>
        </div>

        <div style={{
          background: darkMode ? '#2a2a2a' : '#f8f8f8',
          border: '2px solid #c41e3a',
          borderRadius: '8px',
          padding: '2rem',
          textAlign: 'center',
          animation: 'fadeIn 1.2s ease-in-out'
        }}>
          <p style={{ color: '#888', margin: 0 }}>🏆 Weekly Awards</p>
          <p style={{ color: '#888', fontSize: '0.9rem', marginTop: '1rem' }}>
            (Coming soon)
          </p>
        </div>
      </div>

      {/* Styles */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInOut {
          0% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.8);
          }
          50% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.8);
          }
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0) rotate(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-8px) rotate(-0.5deg); }
          20%, 40%, 60%, 80% { transform: translateX(8px) rotate(0.5deg); }
        }

        .dashboard-shake {
          animation: shake 0.8s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default PersonalDashboard;
