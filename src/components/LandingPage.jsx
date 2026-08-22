import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TeamSelector from './TeamSelector';

const LandingPage = ({ darkMode }) => {
  const navigate = useNavigate();
  const [teams, setTeams] = useState([]);
  const [showSelector, setShowSelector] = useState(false);
  const [loading, setLoading] = useState(false);

  // Load teams from API on mount
  useEffect(() => {
    const loadTeams = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/league?seasonId=2026');
        if (response.ok) {
          const data = await response.json();
          if (data.teams) {
            setTeams(data.teams.map((team, index) => ({
              teamId: team.id || index + 1,
              teamName: team.name || `Team ${index + 1}`,
              owner: team.abbrev || 'Unknown',
              logo: team.logo || '🏈'
            })));
          }
        }
      } catch (error) {
        console.error('Error loading teams:', error);
        // Set fallback teams
        setTeams([]);
      } finally {
        setLoading(false);
      }
    };

    loadTeams();
  }, []);

  const handleTeamSelect = (selectedTeam) => {
    // Save to localStorage
    localStorage.setItem('selectedTeam', JSON.stringify(selectedTeam));

    // Navigate to dashboard with shake animation
    navigate(`/dashboard/${selectedTeam.teamId}`);
  };

  return (
    <div className="landing-page" style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundImage: 'url("https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Dark overlay */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 1
      }} />

      {/* Content */}
      <div style={{
        position: 'relative',
        zIndex: 2,
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '2rem'
      }}>
        {/* Logo Section */}
        <div style={{
          animation: 'fadeIn 1s ease-in-out',
          marginBottom: '1rem'
        }}>
          <div style={{
            fontSize: '5rem',
            fontWeight: '800',
            color: '#d4af37',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)',
            marginBottom: '0.5rem',
            letterSpacing: '2px'
          }}>
            🏈
          </div>
          <h1 style={{
            fontSize: '3rem',
            fontWeight: '800',
            color: '#ffffff',
            textShadow: '3px 3px 6px rgba(0, 0, 0, 0.8)',
            margin: '0 0 0.5rem 0',
            letterSpacing: '1px'
          }}>
            SOUTH MECKLENBURG
          </h1>
          <p style={{
            fontSize: '1.5rem',
            color: '#d4af37',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)',
            margin: '0 0 2rem 0',
            fontWeight: '700',
            letterSpacing: '0.5px'
          }}>
            FANTASY FOOTBALL LEAGUE
          </p>
        </div>

        {/* Main CTA Button */}
        <button
          onClick={() => setShowSelector(true)}
          style={{
            padding: '1.25rem 3rem',
            fontSize: '1.3rem',
            fontWeight: '700',
            backgroundColor: '#c41e3a',
            color: '#ffffff',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            boxShadow: '0 8px 16px rgba(196, 30, 58, 0.4)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            transform: 'scale(1)',
            animation: 'fadeIn 1.2s ease-in-out'
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#a01729';
            e.target.style.boxShadow = '0 12px 24px rgba(196, 30, 58, 0.6)';
            e.target.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = '#c41e3a';
            e.target.style.boxShadow = '0 8px 16px rgba(196, 30, 58, 0.4)';
            e.target.style.transform = 'scale(1)';
          }}
        >
          ⚡ Enter Fantasy Football Portal
        </button>

        {/* Links Section */}
        <div style={{
          marginTop: '2rem',
          display: 'flex',
          gap: '2rem',
          justifyContent: 'center',
          animation: 'fadeIn 1.4s ease-in-out'
        }}>
          <button
            onClick={() => navigate('/rankings')}
            style={{
              backgroundColor: 'transparent',
              color: '#d4af37',
              border: '2px solid #d4af37',
              padding: '0.75rem 1.5rem',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '1rem',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              transition: 'all 0.3s ease',
              textShadow: '1px 1px 2px rgba(0, 0, 0, 0.8)'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = 'rgba(212, 175, 55, 0.1)';
              e.target.style.borderColor = '#ffffff';
              e.target.style.color = '#ffffff';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'transparent';
              e.target.style.borderColor = '#d4af37';
              e.target.style.color = '#d4af37';
            }}
          >
            📊 All-Time Rankings
          </button>
        </div>
      </div>

      {/* Team Selector Modal */}
      {showSelector && (
        <TeamSelector
          teams={teams}
          onSelectTeam={handleTeamSelect}
          onClose={() => setShowSelector(false)}
          darkMode={darkMode}
          loading={loading}
        />
      )}

      {/* Styles for animations */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0) rotate(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-2px) rotate(-0.5deg); }
          20%, 40%, 60%, 80% { transform: translateX(2px) rotate(0.5deg); }
        }

        .landing-page.shake {
          animation: shake 0.8s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default LandingPage;
