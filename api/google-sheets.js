// Vercel Serverless Function - Google Sheets Data Proxy
// Fetches and parses data from public Google Sheet

export const runtime = "nodejs";

const SHEET_ID = "1zopODvQe7POC1G-jbT78QO7dRV5RvqzGCf-qCoyNW-A";

// Tab names and their IDs (gid values from Google Sheet)
const TABS = {
  overall: 0, // "Overall" tab - sorted by championships
  overall2025: 712152445, // "Overall (2025)" tab - sorted by win %
  2026: 0, // 2026 Season (current)
  2025: 1458478620, // 2025 Season
  2024: 666783981, // 2024 Season
  2023: 1753355751, // 2023 Season
  2022: 619212077, // 2022 Season
  2021: 2054409495, // 2021 Season
  2020: 0, // 2020 Season
  2019: 1135357214, // 2019 Season
  2018: 683769960, // 2018 Season
  2017: 1734201387, // 2017 Season
  2016: 378493787, // 2016 Season
  2015: 928972029, // 2015 Season
  2014: 1891019671, // 2014 Season
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
