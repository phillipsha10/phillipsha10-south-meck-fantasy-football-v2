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

    // Parse CSV with proper quote handling
    const parseCSVLine = (line) => {
      const result = [];
      let current = '';
      let insideQuotes = false;

      for (let i = 0; i < line.length; i++) {
        const char = line[i];
        const nextChar = line[i + 1];

        if (char === '"') {
          if (insideQuotes && nextChar === '"') {
            // Escaped quote
            current += '"';
            i++; // Skip next quote
          } else {
            // Toggle quote state
            insideQuotes = !insideQuotes;
          }
        } else if (char === ',' && !insideQuotes) {
          // End of field
          result.push(current.trim());
          current = '';
        } else {
          current += char;
        }
      }

      // Add last field
      result.push(current.trim());
      return result;
    };

    const lines = csvText.trim().split('\n');
    if (lines.length < 2) {
      return res.status(200).json({ data: [], headers: [] });
    }

    // First line is headers
    const headers = parseCSVLine(lines[0]);

    // Create case-insensitive header map for flexible column matching
    const headerMap = {};
    headers.forEach((header, index) => {
      headerMap[header.toLowerCase()] = index;
    });

    // Parse data rows with header-agnostic value access
    let data = lines.slice(1).map(line => {
      const values = parseCSVLine(line);
      const row = {};

      // Store both original headers and normalized lowercase access
      headers.forEach((header, index) => {
        row[header] = values[index] || '';
        row[header.toLowerCase()] = values[index] || ''; // Add lowercase version
      });

      return row;
    }).filter(row => row.TEAM && row.TEAM.length > 0); // Filter out empty rows

    // Debug: Log first few rows with all their data
    console.log(`Raw parsed data sample (first 3 teams):`);
    data.slice(0, 3).forEach((row, idx) => {
      console.log(`  Team ${idx + 1}:`, JSON.stringify(row));
    });

    // Deduplicate: Keep only first occurrence of each team name
    const seenTeams = new Set();
    data = data.filter(row => {
      const teamName = row.TEAM?.trim();
      if (seenTeams.has(teamName)) {
        console.log(`Filtering out duplicate team: ${teamName}`);
        return false;
      }
      seenTeams.add(teamName);
      return true;
    });

    // Filter out likely metadata rows (no wins recorded, generic labels like "Name")
    data = data.filter(row => {
      const teamName = row.TEAM?.trim();
      const wins = parseInt(row.Wins) || 0;

      // Skip generic labels and metadata rows
      if (teamName === 'Name' || teamName === 'TEAM' || (wins === 0 && parseFloat(row.PF || 0) === 0)) {
        console.log(`Filtering out metadata row: ${teamName}`);
        return false;
      }
      return true;
    });

    console.log(`Successfully parsed ${data.length} teams from Google Sheet`);
    console.log(`Column headers: ${JSON.stringify(headers)}`);
    if (data.length > 0) {
      console.log(`First team data:`, JSON.stringify(data[0]));
      console.log(`Header map (case-insensitive):`, Object.keys(headerMap));
    }

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
