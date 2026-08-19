import React, { useState, useEffect } from 'react';
import StandingsTable from './StandingsTable';
import Storylines from './Storylines';
import AwardTracker from './AwardTracker';
import StatsTracker from './StatsTracker';
import ChampionshipHistory from './ChampionshipHistory';
import AllTimeStats from './AllTimeStats';

const LeagueDashboard = ({ leagueData, darkMode }) => {
  const [activeTab, setActiveTab] = useState('standings');
  const [teams, setTeams] = useState([]);
  const [matchups, setMatchups] = useState([]);
  const [selectedSeason, setSelectedSeason] = useState(2026);
  const [seasonLeagueData, setSeasonLeagueData] = useState(leagueData);

  // Available seasons for selection
  const availableSeasons = [2026, 2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014];

  // Update seasonLeagueData when initial leagueData arrives
  useEffect(() => {
    if (leagueData) {
      setSeasonLeagueData(leagueData);
    }
  }, [leagueData]);

  // Fetch league data when season changes
  useEffect(() => {
    const fetchSeasonData = async () => {
      try {
        console.log(`Fetching data for season ${selectedSeason}...`);
        const response = await fetch(`/api/league?seasonId=${selectedSeason}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch season ${selectedSeason}`);
        }
        const data = await response.json();
        console.log(`Successfully fetched ${selectedSeason} data:`, data);
        setSeasonLeagueData(data);
      } catch (error) {
        console.error(`Error fetching season ${selectedSeason}:`, error);
      }
    };

    fetchSeasonData();
  }, [selectedSeason]);

  // Transform team data from ESPN API (handles both v2 and v3 formats)
  useEffect(() => {
    console.log('LeagueDashboard transforming seasonLeagueData:', seasonLeagueData);
    if (seasonLeagueData && seasonLeagueData.teams && seasonLeagueData.teams.length > 0) {
      console.log('Teams found, count:', seasonLeagueData.teams.length);
      console.log('First team raw data:', JSON.stringify(seasonLeagueData.teams[0], null, 2));

      try {
        const transformedTeams = seasonLeagueData.teams.map((team, index) => {
          try {
            // ESPN v3 API format
            const teamName = team.name || `Team ${team.id}`;
            const owner = team.abbrev || 'Unknown';

            // Debug: log the record structure for first team
            if (index === 0) {
              console.log('First team record object:', team.record);
              if (team.record?.overall) {
                console.log('First team record.overall:', team.record.overall);
              }
            }

            // Record structure in v3: try multiple possible locations
            let wins = 0;
            let losses = 0;

            // Try record.overall.wins/losses (v3 format)
            if (team.record?.overall?.wins !== undefined) {
              wins = team.record.overall.wins;
              losses = team.record.overall.losses || 0;
            }
            // Try record array format (v2)
            else if (Array.isArray(team.record) && team.record[0]) {
              wins = team.record[0].wins || 0;
              losses = team.record[0].losses || 0;
            }
            // Try direct record properties
            else if (team.record?.wins !== undefined) {
              wins = team.record.wins;
              losses = team.record.losses || 0;
            }
            // Fallback: look for any record structure
            else {
              console.warn(`Team ${team.id} has no recognizable wins/losses structure:`, team.record);
            }

            const pointsFor = team.points || 0;
            const pointsAgainst = team.pointsAgainst || 0;

            console.log(`Team ${index} (ID: ${team.id}):`, { teamName, owner, wins, losses, pointsFor, pointsAgainst });

            return {
              rank: index + 1,
              teamId: team.id,
              teamName: teamName,
              owner: owner,
              logo: team.logo || '🏈',
              wins: wins,
              losses: losses,
              pointsFor: Math.round(pointsFor),
              pointsAgainst: Math.round(pointsAgainst),
              streak: team.streak?.value || 0,
              streakType: team.streak?.streakType || 'NONE',
            };
          } catch (teamError) {
            console.error(`Error transforming team ${index}:`, teamError);
            return {
              rank: index + 1,
              teamId: team.id,
              teamName: `Team ${team.id}`,
              owner: 'Unknown',
              logo: '🏈',
              wins: 0,
              losses: 0,
              pointsFor: 0,
              pointsAgainst: 0,
              streak: 0,
              streakType: 'NONE',
            };
          }
        });

        console.log('Transformed teams:', transformedTeams);
        setTeams(transformedTeams);

        // Extract matchups if available
        if (seasonLeagueData.schedule) {
          setMatchups(seasonLeagueData.schedule);
        }
      } catch (error) {
        console.error('Error in team transformation:', error);
      }
    } else {
      console.log('No teams data available:', seasonLeagueData?.teams);
    }
  }, [seasonLeagueData]);

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
      case 'alltime':
        return <AllTimeStats darkMode={darkMode} />;
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
          className={`tab-button ${activeTab === 'alltime' ? 'active' : ''}`}
          onClick={() => setActiveTab('alltime')}
        >
          ⭐ All-Time
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
