import React, { useState } from 'react';

const TeamSelector = ({ teams, onSelectTeam, onClose, darkMode, loading }) => {
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [isShaking, setIsShaking] = useState(false);

  const handleEnter = () => {
    if (!selectedTeam) return;

    // Trigger shake animation
    setIsShaking(true);

    // Show message and navigate after shake
    setTimeout(() => {
      // The actual shake will be on the dashboard entry
      onSelectTeam(selectedTeam);
    }, 800);
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      animation: 'fadeIn 0.3s ease-in-out'
    }}>
      <div style={{
        backgroundColor: darkMode ? '#1a1a1a' : '#ffffff',
        borderRadius: '12px',
        padding: '2rem',
        maxWidth: '500px',
        width: '90%',
        maxHeight: '80vh',
        overflow: 'auto',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
        border: '2px solid #c41e3a',
        animation: 'slideIn 0.3s ease-out'
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '2rem',
          borderBottom: '2px solid #c41e3a',
          paddingBottom: '1rem'
        }}>
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: '800',
            color: '#c41e3a',
            margin: 0,
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}>
            🏈 Select Your Team
          </h2>
          <button
            onClick={onClose}
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              fontSize: '1.5rem',
              cursor: 'pointer',
              color: darkMode ? '#ffffff' : '#1a1a1a',
              padding: 0,
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'rotate(90deg)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'rotate(0deg)';
            }}
          >
            ✕
          </button>
        </div>

        {/* Team List */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '0.75rem',
          marginBottom: '2rem',
          maxHeight: '400px',
          overflowY: 'auto'
        }}>
          {loading ? (
            <p style={{
              textAlign: 'center',
              color: darkMode ? '#999' : '#666',
              padding: '1rem'
            }}>
              Loading teams...
            </p>
          ) : teams.length > 0 ? (
            teams.map((team) => (
              <div
                key={team.teamId}
                onClick={() => setSelectedTeam(team)}
                style={{
                  padding: '1rem 1.25rem',
                  border: selectedTeam?.teamId === team.teamId ? '2px solid #c41e3a' : '2px solid #ddd',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  backgroundColor: selectedTeam?.teamId === team.teamId
                    ? (darkMode ? 'rgba(196, 30, 58, 0.1)' : 'rgba(196, 30, 58, 0.05)')
                    : (darkMode ? '#2a2a2a' : '#f8f9fa'),
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem'
                }}
                onMouseEnter={(e) => {
                  if (selectedTeam?.teamId !== team.teamId) {
                    e.currentTarget.style.borderColor = '#c41e3a';
                    e.currentTarget.style.backgroundColor = darkMode ? 'rgba(196, 30, 58, 0.05)' : 'rgba(196, 30, 58, 0.02)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedTeam?.teamId !== team.teamId) {
                    e.currentTarget.style.borderColor = '#ddd';
                    e.currentTarget.style.backgroundColor = darkMode ? '#2a2a2a' : '#f8f9fa';
                  }
                }}
              >
                <span style={{ fontSize: '1.5rem' }}>{team.logo}</span>
                <div style={{ flex: 1 }}>
                  <div style={{
                    fontWeight: '700',
                    fontSize: '1rem',
                    color: darkMode ? '#ffffff' : '#1a1a1a',
                    marginBottom: '0.25rem'
                  }}>
                    {team.teamName}
                  </div>
                  <div style={{
                    fontSize: '0.85rem',
                    color: darkMode ? '#aaa' : '#666',
                    opacity: 0.8
                  }}>
                    Owner: {team.owner}
                  </div>
                </div>
                {selectedTeam?.teamId === team.teamId && (
                  <span style={{ fontSize: '1.3rem' }}>✓</span>
                )}
              </div>
            ))
          ) : (
            <p style={{
              textAlign: 'center',
              color: darkMode ? '#999' : '#666',
              padding: '1rem'
            }}>
              No teams available. Please try again later.
            </p>
          )}
        </div>

        {/* Enter Button */}
        <button
          onClick={handleEnter}
          disabled={!selectedTeam}
          style={{
            width: '100%',
            padding: '1rem',
            fontSize: '1.1rem',
            fontWeight: '700',
            backgroundColor: selectedTeam ? '#c41e3a' : '#ccc',
            color: '#ffffff',
            border: 'none',
            borderRadius: '8px',
            cursor: selectedTeam ? 'pointer' : 'not-allowed',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            transition: 'all 0.3s ease',
            boxShadow: selectedTeam ? '0 4px 8px rgba(196, 30, 58, 0.3)' : 'none'
          }}
          onMouseEnter={(e) => {
            if (selectedTeam) {
              e.target.style.backgroundColor = '#a01729';
              e.target.style.boxShadow = '0 8px 16px rgba(196, 30, 58, 0.4)';
              e.target.style.transform = 'scale(1.02)';
            }
          }}
          onMouseLeave={(e) => {
            if (selectedTeam) {
              e.target.style.backgroundColor = '#c41e3a';
              e.target.style.boxShadow = '0 4px 8px rgba(196, 30, 58, 0.3)';
              e.target.style.transform = 'scale(1)';
            }
          }}
        >
          ⚡ Enter Portal
        </button>

        {/* Helper Text */}
        <p style={{
          fontSize: '0.85rem',
          color: darkMode ? '#999' : '#666',
          textAlign: 'center',
          marginTop: '1rem',
          margin: '1rem 0 0 0'
        }}>
          {!selectedTeam
            ? 'Select your team to continue'
            : 'Ready to enter? Click "Enter Portal" to proceed'}
        </p>

        {/* Styles */}
        <style>{`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }

          @keyframes slideIn {
            from {
              opacity: 0;
              transform: scale(0.95);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }
        `}</style>
      </div>
    </div>
  );
};

export default TeamSelector;
