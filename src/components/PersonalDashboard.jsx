import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CareerStats from './CareerStats';
import YearByYearRecord from './YearByYearRecord';
import DraftHistory from './DraftHistory_2';
import ScheduleCard from './ScheduleCard_2';
import LeagueNews from './LeagueNews';
import WeeklyAwards from './WeeklyAwards_2';
import HeadToHeadRecords from './HeadToHeadRecords_2';

const PersonalDashboard = ({ leagueData, darkMode, allTeamsData }) => {
  const { teamId } = useParams();
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [teamHistory, setTeamHistory] = useState(null);
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

  // Fetch team history data (all seasons)
  useEffect(() => {
    const loadTeamHistory = async () => {
      try {
        // This would typically fetch from an API that aggregates all historical data
        // For now, we'll structure it based on available data
        setTeamHistory({
          allTimeStats: {
            totalWins: 0,
            totalLosses: 0,
            championships: 0,
            runnersUp: 0,
            lastPlaces: 0
          },
          byYear: {},
          draftHistory: {}
        });
      } catch (error) {
        console.error('Error loading team history:', error);
      }
    };

    if (selectedTeam) {
      loadTeamHistory();
    }
  }, [selectedTeam]);

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

      {/* Main Dashboard Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
        gap: '2rem',
        marginBottom: '2rem'
      }}>
        {/* Career Stats */}
        <div style={{ animation: 'fadeIn 0.6s ease-in-out' }}>
          <CareerStats team={selectedTeam} darkMode={darkMode} />
        </div>

        {/* Year-by-Year Record */}
        <div style={{ animation: 'fadeIn 0.7s ease-in-out' }}>
          <YearByYearRecord team={selectedTeam} darkMode={darkMode} allTeamsData={allTeamsData} />
        </div>
      </div>

      {/* Draft History */}
      <div style={{
        marginBottom: '2rem',
        animation: 'fadeIn 0.8s ease-in-out'
      }}>
        <DraftHistory team={selectedTeam} darkMode={darkMode} />
      </div>

      {/* Schedule & Next Opponent */}
      <div style={{
        marginBottom: '2rem',
        animation: 'fadeIn 0.9s ease-in-out'
      }}>
        <ScheduleCard team={selectedTeam} darkMode={darkMode} leagueData={leagueData} />
      </div>

      {/* Head-to-Head Records */}
      <div style={{
        marginBottom: '2rem',
        animation: 'fadeIn 1s ease-in-out'
      }}>
        <HeadToHeadRecords team={selectedTeam} darkMode={darkMode} allTeamsData={allTeamsData} />
      </div>

      {/* League News */}
      <div style={{
        marginBottom: '2rem',
        animation: 'fadeIn 1.1s ease-in-out'
      }}>
        <LeagueNews darkMode={darkMode} />
      </div>

      {/* Weekly Awards */}
      <div style={{
        animation: 'fadeIn 1.2s ease-in-out'
      }}>
        <WeeklyAwards darkMode={darkMode} leagueData={leagueData} />
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
