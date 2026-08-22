/**
 * Draft Memory Bank - Insights and patterns for each team's draft strategy
 * Built from analyzing draft screenshots across seasons (2014-2026)
 *
 * This data structure stores:
 * - Draft strategy classification
 * - Position preferences and targets
 * - Recurring/favorite players
 * - Risk assessment and patterns
 * - Year-by-year evolution
 * - Notable decisions and trends
 */

export const DraftMemoryBank = {
  // Example team structure - replace with actual team data
  'Team Harper': {
    strategy: 'Value-Focused / Mid-Round Targets',
    positionalFocus: {
      early: ['RB', 'WR'], // Rounds 1-3
      mid: ['QB', 'TE', 'RB'],
      late: ['K', 'DEF']
    },
    recurringPlayers: [
      // Players drafted multiple times by this team
      { player: 'Player Name', positions: ['QB'], years: [2025, 2024], pattern: 'Consistent early pick' },
    ],
    riskProfile: 'MODERATE', // CONSERVATIVE, MODERATE, AGGRESSIVE
    strengths: [
      'Strong at identifying value WRs in rounds 3-5',
      'Good with late-round RB picks',
    ],
    weaknesses: [
      'QB selection struggles',
      'Miss on elite TE prospects',
    ],
    evolvedOver: {
      2024: 'More aggressive early QB selections',
      2023: 'Shifted to RB-heavy approach',
    },
    memorablePicks: [
      {
        year: 2025,
        round: 2,
        player: 'Player Name',
        pick: 'Reach or value?',
        outcome: 'Success/Bust',
        notes: 'Story behind the pick'
      },
    ],
    yearsActive: [2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026],
    tradedPlayersFrequently: ['Player 1', 'Player 2'], // Players later traded away
    lastUpdated: new Date().toISOString(),
  },

  'Team Stewart': {
    strategy: 'Placeholder',
    positionalFocus: { early: [], mid: [], late: [] },
    recurringPlayers: [],
    riskProfile: 'MODERATE',
    strengths: [],
    weaknesses: [],
    evolvedOver: {},
    memorablePicks: [],
    yearsActive: [],
    tradedPlayersFrequently: [],
    lastUpdated: new Date().toISOString(),
  },

  // Add all other teams...
};

/**
 * Helper function to get draft memory for a specific team
 */
export const getDraftMemory = (teamName) => {
  return DraftMemoryBank[teamName] || null;
};

/**
 * Helper function to get all teams with draft data
 */
export const getAllTeamsWithMemory = () => {
  return Object.keys(DraftMemoryBank);
};

/**
 * Helper function to get teams by risk profile
 */
export const getTeamsByRiskProfile = (riskProfile) => {
  return Object.entries(DraftMemoryBank)
    .filter(([_, data]) => data.riskProfile === riskProfile)
    .map(([teamName, _]) => teamName);
};

/**
 * Helper function to find teams that frequently draft a specific position
 */
export const getTeamsByPositionFocus = (position) => {
  return Object.entries(DraftMemoryBank)
    .filter(([_, data]) => {
      const allPositions = [
        ...data.positionalFocus.early,
        ...data.positionalFocus.mid,
        ...data.positionalFocus.late
      ];
      return allPositions.includes(position);
    })
    .map(([teamName, _]) => teamName);
};

/**
 * Helper function to find teams that have drafted a specific player multiple times
 */
export const getTeamsWhoFavored = (playerName) => {
  return Object.entries(DraftMemoryBank)
    .filter(([_, data]) => {
      return data.recurringPlayers.some(p => p.player === playerName);
    })
    .map(([teamName, data]) => ({
      team: teamName,
      details: data.recurringPlayers.find(p => p.player === playerName)
    }));
};

export default DraftMemoryBank;
