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

    // Add query parameters - build as array to handle multiple view params
    const params = new URLSearchParams();
    if (view) {
      // view can be comma-separated or multiple params
      const views = Array.isArray(view) ? view : view.split(',');
      views.forEach(v => params.append('view', v.trim()));
    }
    if (seasonId) params.append('seasonId', seasonId);
    if (teamId) params.append('teamId', teamId);
    if (weekId) params.append('matchupPeriodId', weekId);

    const queryString = params.toString();
    if (queryString) {
      url += '?' + queryString;
    }

    console.log('Fetching ESPN API:', url);

    // Fetch from ESPN API with proper headers
    const espnResponse = await fetch(url, {
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'application/json',
        'Accept-Encoding': 'gzip, deflate',
      },
    });

    console.log('ESPN API Response Status:', espnResponse.status);

    if (!espnResponse.ok) {
      const errorText = await espnResponse.text();
      console.error('ESPN API Error:', errorText);
      return res.status(espnResponse.status).json({
        error: `ESPN API returned ${espnResponse.status}`,
        message: `Failed to fetch league data: ${espnResponse.statusText}`,
      });
    }

    const data = await espnResponse.json();
    console.log('Successfully fetched ESPN data');

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
