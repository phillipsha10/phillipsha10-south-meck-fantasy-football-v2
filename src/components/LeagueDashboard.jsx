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

        // For current season (2026), use ESPN API
        if (selectedSeason === 2026) {
          const response = await fetch(`/api/league?seasonId=${selectedSeason}`);
          if (!response.ok) {
            throw new Error(`Failed to fetch season ${selectedSeason}`);
          }
          const data = await response.json();
          console.log(`Successfully fetched ${selectedSeason} data from ESPN:`, data);
          setSeasonLeagueData(data);
        } else {
          // For past seasons, use Google Sheets directly
          console.log(`Fetching season ${selectedSeason} from Google Sheets...`);

          const sheetResponse = await fetch(`/api/google-sheets?tab=${selectedSeason}`);
          console.log(`Google Sheets response status: ${sheetResponse.status}`);

          if (!sheetResponse.ok) {
            throw new Error(`Failed to fetch season ${selectedSeason} from Google Sheets: ${sheetResponse.statusText}`);
          }

          const sheetData = await sheetResponse.json();
          console.log(`Successfully fetched ${selectedSeason} data from Google Sheets:`, sheetData);

          // Transform Google Sheet data to ESPN format for compatibility
          if (sheetData.data && sheetData.data.length > 0) {
            console.log('Sheet headers:', sheetData.headers);
            console.log('First row raw data:', sheetData.data[0]);

            const transformedTeams = sheetData.data.map((row, index) => {
              // Parse wins - use nullish coalescing to handle 0 correctly
              // Try both original case and lowercase access
              const wins = parseInt(row.Wins ?? row.wins) ?? 0;

              // Parse losses - try multiple column name variations
              // The API now provides both original-case and lowercase versions
              let losses = 0;
              const lossesValue =
                row.Losses ?? row.losses ?? row.Loss ?? row.loss ??
                row.Ls ?? row.ls ?? row.L ?? row.l ?? '';

              if (lossesValue !== '' && !isNaN(parseInt(lossesValue))) {
                losses = parseInt(lossesValue);
              }

              const championships = parseInt(row.Championships ?? row.championships) ?? 0;
              const runnersUp = parseInt(row['Runner-up'] ?? row['runner-up']) ?? 0;

              if (index === 0) {
                console.log('=== SHEET DATA PARSING DEBUG (Team Transformation) ===');
                console.log('All column headers:', sheetData.headers);
                console.log('Full raw first row:', row);
                console.log('Extracted values:', { wins, losses, championships, runnersUp });
                console.log('Raw losses value found:', lossesValue);
                console.log('============================');
              }

              return {
                rank: index + 1,
                teamId: index + 1,
                teamName: row.TEAM || `Team ${index + 1}`,
                owner: row.TEAM?.substring(0, 3).toUpperCase() || 'UNK',
                logo: '🏈',
                wins: wins,
                losses: losses,
                pointsFor: Math.round(parseFloat(row.PF) || 0),
                pointsAgainst: Math.round(parseFloat(row.PA) || 0),
                streak: 0,
                streakType: 'NONE',
                championships: championships,
                runnersUp: runnersUp
              };
            });

            setSeasonLeagueData({
              teams: transformedTeams,
              schedule: [],
              season: selectedSeason
            });
          }
        }
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

            // Debug for first team - log full record structure
            if (index === 0) {
              console.log('Full record object:', JSON.stringify(team.record, null, 2));
              if (team.record?.overall) {
                console.log('overall object keys:', Object.keys(team.record.overall));
              }
            }

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

            if (index === 0) {
              console.log(`Extracted from team: wins=${wins}, losses=${losses}`);
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

