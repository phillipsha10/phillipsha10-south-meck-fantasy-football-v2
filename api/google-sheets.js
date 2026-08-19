// Vercel Serverless Function - Google Sheets Data Proxy
// Fetches and parses data from public Google Sheet

export const runtime = "nodejs";

const SHEET_ID = "1zopODvQe7POC1G-jbT78QO7dRV5RvqzGCf-qCoyNW-A";

// Tab names and their IDs - you may need to get the actual gid values
// gid=0 is the first sheet, but we need to identify the correct tabs
const TABS = {
  overall: 0, // "Overall" tab - sorted by championships
  overall2025: 712152445, // "Overall (2025)" tab - sorted by win %
};

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { tab = 'overall' } = req.query;
    const tabId = TABS[tab] || TABS.overall;

    // CSV export URL for the specific tab
    const csvUrl = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=${tabId}`;

    console.log(`Fetching Google Sheet tab: ${tab} (gid=${tabId})`);

    const response = await fetch(csvUrl, {
      method: 'GET',
      headers: {
        'Accept': 'text/csv',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      return res.status(response.status).json({
        error: `Failed to fetch Google Sheet: ${response.statusText}`,
      });
    }

    const csvText = await response.text();

    // Parse CSV
    const lines = csvText.trim().split('\n');
    if (lines.length < 2) {
      return res.status(200).json({ data: [], headers: [] });
    }

    // First line is headers
    const headers = lines[0].split(',').map(h => h.trim());

    // Parse data rows
    const data = lines.slice(1).map(line => {
      const values = line.split(',').map(v => v.trim());
      const row = {};
      headers.forEach((header, index) => {
        row[header] = values[index] || '';
      });
      return row;
    }).filter(row => row.TEAM && row.TEAM.length > 0); // Filter out empty rows

    console.log(`Successfully parsed ${data.length} teams from Google Sheet`);

    res.status(200).json({
      success: true,
      tab,
      headers,
      data,
      count: data.length,
    });
  } catch (error) {
    console.error('Error fetching Google Sheet:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: error.message,
    });
  }
}
