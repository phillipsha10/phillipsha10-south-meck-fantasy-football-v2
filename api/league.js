// Vercel Serverless Function - ESPN Fantasy Football API Proxy
// Using Node.js runtime with proper ESPN headers

export const runtime = "nodejs";

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
    // ESPN API endpoint - confirmed working
    const espnUrl = 'https://lm-api-reads.fantasy.espn.com/apis/v3/games/ffl/seasons/2026/segments/0/leagues/809120?view=mSettings&view=mTeam&view=mStandings';

    console.log('Fetching ESPN API:', espnUrl);

    // Fetch from ESPN API with proper headers
    const response = await fetch(espnUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json,text/plain,*/*',
        'Referer': 'https://fantasy.espn.com/',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36',
      },
      cache: 'no-store',
      redirect: 'follow',
    });

    console.log('ESPN API Response Status:', response.status);

    if (!response.ok) {
      const body = await response.text();
      console.log({
        url: espnUrl,
        status: response.status,
        statusText: response.statusText,
        contentType: response.headers.get('content-type'),
        bodyPreview: body.slice(0, 1000),
      });
      return res.status(response.status).json({
        error: `ESPN API returned ${response.status}`,
        message: `Failed to fetch league data: ${response.statusText}`,
        debug: { status: response.status, statusText: response.statusText },
      });
    }

    const data = await response.json();
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
