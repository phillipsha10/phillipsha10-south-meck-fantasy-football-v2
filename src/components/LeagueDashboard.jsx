import React, { useState, useEffect } from 'react';
import StandingsTable from './StandingsTable';
import Storylines from './Storylines';
import AwardTracker from './AwardTracker';
import StatsTracker from './StatsTracker';
import ChampionshipHistory from './ChampionshipHistory';

const LeagueDashboard = ({ leagueData, darkMode }) => {
  const [activeTab, setActiveTab] = useState('standings');
  const [teams, setTeams] = useState([]);
  const [matchups, setMatchups] = useState([]);

  // Transform team data from ESPN API
  useEffect(() => {
    if (leagueData && leagueData.teams) {
      const transformedTeams = leagueData.teams.map((team, index) => ({
        rank: index + 1,
        teamId: team.id,
        teamName: `${team.location} ${team.nickname}`,
        owner: team.owner?.firstName
          ? `${team.owner.firstName} ${team.owner.lastName}`
          : 'Unknown',
        logo: team.logoUrl || '🏈',
        wins: team.record?.wins || 0,
        losses: team.record?.losses || 0,
        pointsFor: Math.round(team.points || 0),
        pointsAgainst: Math.round(team.pointsAgainst || 0),
        streak: team.streak?.value || 0,
        streakType: team.streak?.streakType || 'NONE',
      }));

      setTeams(transformedTeams);

      // Extract matchups if available
      if (leagueData.schedule) {
        setMatchups(leagueData.schedule);
      }
    }
  }, [leagueData]);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'standings':
        return <StandingsTable teams={teams} />;
      case 'storylines':
        return <Storylines teams={teams} matchups={matchups} />;
      case 'awards':
        return <AwardTracker teams={teams} matchups={matchups} />;
      case 'stats':
        return <StatsTracker teams={teams} />;
      case 'history':
        return <ChampionshipHistory />;
      default:
        return <StandingsTable teams={teams} />;
    }
  };

  return (
    <div className="league-dashboard">
      <div className="tabs-container">
        <button
          className={`tab-button ${activeTab === 'standings' ? 'active' : ''}`}
          onClick={() => setActiveTab('standings')}
        >
          📊 Standings
        </button>
        <button
          className={`tab-button ${activeTab === 'storylines' ? 'active' : ''}`}
          onClick={() => setActiveTab('storylines')}
        >
          📖 Storylines
        </button>
        <button
          className={`tab-button ${activeTab === 'awards' ? 'active' : ''}`}
          onClick={() => setActiveTab('awards')}
        >
          🏅 Awards
        </button>
        <button
          className={`tab-button ${activeTab === 'stats' ? 'active' : ''}`}
          onClick={() => setActiveTab('stats')}
        >
          📈 Stats
        </button>
        <button
          className={`tab-button ${activeTab === 'history' ? 'active' : ''}`}
          onClick={() => setActiveTab('history')}
        >
          🏆 History
        </button>
      </div>

      <div className="tab-content">
        {teams.length > 0 ? (
          renderTabContent()
        ) : (
          <div className="loading">
            <p>Loading team data...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeagueDashboard;
