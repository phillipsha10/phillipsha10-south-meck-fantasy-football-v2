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
  const [selectedSeason, setSelectedSeason] = useState(2026);

  // Available seasons for selection
  const availableSeasons = [2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014];

  // Transform team data from ESPN API (handles both v2 and v3 formats)
  useEffect(() => {
    if (leagueData && leagueData.teams) {
      const transformedTeams = leagueData.teams.map((team, index) => {
        // Handle both v2 and v3 API formats
        const location = team.location || '';
        const nickname = team.nickname || '';
        const teamName = `${location} ${nickname}`.trim() || `Team ${team.id}`;

        const ownerFirstName = team.owner?.firstName || team.primaryOwner?.firstName || '';
        const ownerLastName = team.owner?.lastName || team.primaryOwner?.lastName || '';
        const owner = `${ownerFirstName} ${ownerLastName}`.trim() || 'Unknown';

        // Handle v3 API record format (array) vs v2 (object)
        const record = Array.isArray(team.record) ? team.record[0] : team.record;
        const wins = record?.wins || 0;
        const losses = record?.losses || 0;
        const pointsFor = record?.pointsFor || team.points || 0;
        const pointsAgainst = record?.pointsAgainst || team.pointsAgainst || 0;

        return {
          rank: index + 1,
          teamId: team.id,
          teamName: teamName,
          owner: owner,
          logo: team.logoUrl || '🏈',
          wins: wins,
          losses: losses,
          pointsFor: Math.round(pointsFor),
          pointsAgainst: Math.round(pointsAgainst),
          streak: team.streak?.value || 0,
          streakType: team.streak?.streakType || 'NONE',
        };
      });

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
      {/* Season Selector */}
      <div style={{ marginBottom: '1.5rem', display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
        <label style={{ fontWeight: '600', marginRight: '0.5rem' }}>Season:</label>
        <select
          value={selectedSeason}
          onChange={(e) => setSelectedSeason(parseInt(e.target.value))}
          style={{
            padding: '0.5rem 1rem',
            borderRadius: '4px',
            border: '2px solid #c41e3a',
            backgroundColor: darkMode ? '#2a2a2a' : '#fff',
            color: darkMode ? '#fff' : '#000',
            fontSize: '1rem',
            cursor: 'pointer',
            fontWeight: '600',
          }}
        >
          {availableSeasons.map((season) => (
            <option key={season} value={season}>
              {season} Season
            </option>
          ))}
        </select>
        <span style={{ fontSize: '0.9rem', opacity: 0.7, marginLeft: '1rem' }}>
          (Current: 2026)
        </span>
      </div>

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

