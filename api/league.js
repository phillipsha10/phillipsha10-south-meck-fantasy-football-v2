// Vercel Serverless Function - ESPN Fantasy Football API Proxy
// This solves CORS issues by proxying requests server-to-server

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle preflight
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const leagueId = process.env.REACT_APP_ESPN_LEAGUE_ID || '809120';
    const { view, seasonId, teamId, weekId } = req.query;

    // Build the ESPN API URL
    let url = `https://lm-api-reads.fantasy.espn.com/apis/site/v2/sports/football/classic/leagues/${leagueId}`;

    // Add query parameters
    const params = [];
    if (view) params.push(`view=${view}`);
    if (seasonId) params.push(`seasonId=${seasonId}`);
    if (teamId) params.push(`teamId=${teamId}`);
    if (weekId) params.push(`matchupPeriodId=${weekId}`);

    if (params.length > 0) {
      url += '?' + params.join('&');
    }

    // Fetch from ESPN API
    const espnResponse = await fetch(url);

    if (!espnResponse.ok) {
      return res.status(espnResponse.status).json({
        error: `ESPN API returned ${espnResponse.status}`,
        message: `Failed to fetch league data: ${espnResponse.statusText}`,
      });
    }

    const data = await espnResponse.json();

    // Return with CORS headers
    res.status(200).json(data);
  } catch (error) {
    console.error('Serverless function error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: error.message,
    });
  }
}
