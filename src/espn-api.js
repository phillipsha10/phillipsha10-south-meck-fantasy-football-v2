// ESPN Fantasy Football API Integration
// Public League ID: 809120 (South Mecklenburg High School Fantasy Football League)
// Note: Using Vercel serverless function (/api/league) to proxy ESPN API
// This avoids CORS issues by making server-to-server requests

const LEAGUE_ID = process.env.REACT_APP_ESPN_LEAGUE_ID || '809120';
const API_BASE = '/api/league';

/**
 * Fetch league information including standings and team details
 */
export const fetchLeagueData = async () => {
  try {
    const response = await fetch(
      `${API_BASE}?view=mTeam&view=mSettings`
    );
    if (!response.ok) throw new Error(`API responded with status ${response.status}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching league data:', error);
    throw error;
  }
};

/**
 * Fetch league standings for a specific season
 */
export const fetchLeagueStandings = async (seasonId) => {
  try {
    const response = await fetch(
      `${API_BASE}?seasonId=${seasonId}&view=mTeam&view=mSettings&view=mStandings`
    );
    if (!response.ok) throw new Error(`API responded with status ${response.status}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching league standings:', error);
    throw error;
  }
};

/**
 * Fetch matchups for current or specific week
 */
export const fetchMatchups = async (seasonId, weekId) => {
  try {
    const response = await fetch(
      `${API_BASE}?seasonId=${seasonId}&view=mMatchup&view=mMatchupScore&weekId=${weekId}`
    );
    if (!response.ok) throw new Error(`API responded with status ${response.status}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching matchups:', error);
    throw error;
  }
};

/**
 * Fetch team details and roster for a specific team
 */
export const fetchTeamDetails = async (teamId, seasonId) => {
  try {
    const response = await fetch(
      `${API_BASE}?seasonId=${seasonId}&view=mTeam&view=mRoster&teamId=${teamId}`
    );
    if (!response.ok) throw new Error(`API responded with status ${response.status}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching team details:', error);
    throw error;
  }
};

/**
 * Get current week number (derived from league data)
 */
export const getCurrentWeek = (leagueData) => {
  if (!leagueData || !leagueData.status) return 1;
  return leagueData.status.currentMatchupPeriod || 1;
};

/**
 * Get current season (derived from league data)
 */
export const getCurrentSeason = (leagueData) => {
  if (!leagueData || !leagueData.season) return new Date().getFullYear();
  return leagueData.season;
};

/**
 * Transform ESPN API team data to our format
 */
export const transformTeamData = (team) => {
  // Handle both v2 and v3 API formats
  const location = team.location || '';
  const nickname = team.nickname || '';
  const teamName = `${location} ${nickname}`.trim() || `Team ${team.id}`;

  const ownerFirstName = team.owner?.firstName || team.primaryOwner?.firstName || '';
  const ownerLastName = team.owner?.lastName || team.primaryOwner?.lastName || '';
  const owner = `${ownerFirstName} ${ownerLastName}`.trim() || 'Unknown';

  return {
    teamId: team.id,
    teamName: teamName,
    owner: owner,
    logo: team.logoUrl || '',
    wins: team.record?.[0]?.wins || team.record?.wins || 0,
    losses: team.record?.[0]?.losses || team.record?.losses || 0,
    ties: team.record?.[0]?.ties || team.record?.ties || 0,
    pointsFor: team.record?.[0]?.pointsFor || team.points || 0,
    pointsAgainst: team.record?.[0]?.pointsAgainst || team.pointsAgainst || 0,
    streak: team.streak?.value || 0,
    streakType: team.streak?.streakType || 'NONE',
  };
};

/**
 * Transform ESPN API matchup data for display
 */
export const transformMatchupData = (matchup) => {
  const homeTeam = matchup.home;
  const awayTeam = matchup.away;

  return {
    matchupId: matchup.id,
    week: matchup.matchupPeriodId,
    homeTeam: transformTeamData(homeTeam),
    awayTeam: transformTeamData(awayTeam),
    homeScore: matchup.homeScore || 0,
    awayScore: matchup.awayScore || 0,
    winner: matchup.winner || 'UNDECIDED',
    isPlayoff: matchup.playoffTierType !== null,
  };
};

/**
 * Calculate bench points for a team in a specific week
 * (This requires parsing individual roster scoring which ESPN API provides)
 */
export const calculateBenchPoints = (rosterData) => {
  if (!rosterData || !rosterData.entries) return 0;

  return rosterData.entries.reduce((total, entry) => {
    if (entry.status === 'BENCH' && entry.stats) {
      const stats = entry.stats.find((s) => s.id === '0');
      return total + (stats?.points || 0);
    }
    return total;
  }, 0);
};

export default {
  fetchLeagueData,
  fetchLeagueStandings,
  fetchMatchups,
  fetchTeamDetails,
  getCurrentWeek,
  getCurrentSeason,
  transformTeamData,
  transformMatchupData,
  calculateBenchPoints,
};
