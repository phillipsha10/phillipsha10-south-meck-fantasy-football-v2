# South Mecklenburg Fantasy Football League Platform

A modern web platform for the South Mecklenburg High School Fantasy Football League built with React 18 and powered by the ESPN Fantasy Football API.

**Live League ID:** 809120

## Features

- ✅ **Standings Display** - Real-time standings with sortable columns
- ✅ **Weekly Storylines** - Auto-generated narrative content based on league performance
- ✅ **Awards Tracker** - Track weekly awards (High Score, Bench Blaster, etc.)
- ✅ **Advanced Statistics** - Bench points analysis, point differential, and efficiency metrics
- ✅ **Championship History** - Historical records from 2014-2025
- ✅ **Dark Mode** - Toggle between light and dark themes
- ✅ **Mobile Responsive** - Fully optimized for all device sizes
- ✅ **South Meck Branding** - Black (#1a1a1a), Red (#c41e3a), Gold (#d4af37) color scheme

## Tech Stack

- **Frontend:** React 18.2.0, React DOM 18.2.0
- **Build Tool:** react-scripts 5.0.1
- **API:** ESPN Fantasy Football Public API
- **Deployment:** Vercel with CI/CD
- **HTTP Client:** Axios

## Project Structure

```
fantasy-football-platform-v2/
├── public/
│   └── index.html              # HTML entry point
├── src/
│   ├── components/
│   │   ├── LeagueDashboard.jsx # Main dashboard with tabs
│   │   ├── StandingsTable.jsx  # Standings display
│   │   ├── Storylines.jsx      # Auto-generated narratives
│   │   ├── AwardTracker.jsx    # Weekly awards
│   │   ├── StatsTracker.jsx    # Advanced statistics
│   │   ├── ChampionshipHistory.jsx # Historical data
│   │   ├── BrandedNavbar.jsx   # Navigation bar
│   │   ├── BrandedHeader.jsx   # Hero header
│   │   └── BrandedFooter.jsx   # Footer
│   ├── espn-api.js             # ESPN API integration
│   ├── App.jsx                 # Main app component
│   ├── App-branded.css         # Global styles
│   └── index.jsx               # React entry point
├── api/
│   └── (Vercel serverless functions - future)
├── package.json                # Dependencies
├── vercel.json                 # Vercel deployment config
└── .gitignore                  # Git ignore rules
```

## Getting Started

### Prerequisites

- Node.js 14+ installed
- npm or yarn package manager

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/south-meck-fantasy-football-v2.git
   cd south-meck-fantasy-football-v2
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm start
   ```
   The app will open at `http://localhost:3000`

4. **Build for production**
   ```bash
   npm run build
   ```

## Environment Variables

Create a `.env` file in the root directory:

```env
REACT_APP_ESPN_LEAGUE_ID=809120
```

This environment variable is automatically set in `vercel.json` for Vercel deployments.

## Deployment to Vercel

### Step-by-Step Instructions

1. **Create a GitHub Repository**
   - Go to https://github.com/new
   - Name: `south-meck-fantasy-football-v2`
   - Initialize with README
   - Click "Create repository"

2. **Upload Files to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Fantasy football platform v2 with ESPN API"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/south-meck-fantasy-football-v2.git
   git push -u origin main
   ```

3. **Deploy on Vercel**
   - Go to https://vercel.com
   - Click "New Project"
   - Select "Import Git Repository"
   - Find and select your GitHub repository
   - Project name: `south-meck-fantasy-football-v2`
   - Framework: Select "Create React App"
   - Environment Variables: Already in `vercel.json` (ESPN_LEAGUE_ID)
   - Click "Deploy"

4. **Verify Deployment**
   - Vercel will automatically build and deploy
   - Wait for green checkmark (typically 2-3 minutes)
   - Click the deployment URL to view your live site

## API Reference

The platform uses the public ESPN Fantasy Football API:

- **Base URL:** `https://lm-api-reads.fantasy.espn.com/apis/site/v2/sports/football/classic`
- **Public League ID:** 809120
- **Authentication:** None required (public league)

### Available Endpoints

- League info: `/leagues/{leagueId}`
- Standings: `/leagues/{leagueId}?view=mStandings`
- Matchups: `/leagues/{leagueId}?view=mMatchup`
- Team roster: `/leagues/{leagueId}?view=mRoster&teamId={teamId}`

## Customization

### Branding Colors

Edit `src/App-branded.css` to customize the color scheme:

```css
:root {
  --primary-black: #1a1a1a;      /* South Meck Black */
  --primary-red: #c41e3a;         /* South Meck Red */
  --primary-gold: #d4af37;        /* Gold Accents */
}
```

### League Information

Update `src/components/BrandedHeader.jsx` with your league details:
- League name
- Founding year
- Team count (auto-fetched from API)

## Features Coming Soon

- 🔐 Individual team pages with rosters
- 📊 Season-over-season statistics
- 🎯 Head-to-head matchup predictions
- 💬 League chat/messaging system
- 📲 Mobile app
- 📈 Advanced analytics dashboard

## Troubleshooting

### Issue: "Failed to fetch league data from ESPN API"

**Solution:** Verify the league is public
- Go to https://fantasy.espn.com/football/team?leagueId=809120
- Check league privacy settings
- Ensure league ID (809120) is correct

### Issue: Dark mode not persisting

**Solution:** Clear browser localStorage
```javascript
localStorage.clear()
```
Then refresh the page.

### Issue: Deployment stuck on "Building"

**Solution:** Check Vercel build logs
- Go to Vercel dashboard
- Click on your project
- Navigate to "Deployments" tab
- Click "View Logs" for the failing deployment
- Common issues: Missing dependencies, environment variables

## Performance Tips

- The ESPN API caches data every 15 minutes
- Weekly updates happen at ESPN's scheduled refresh times
- Local browser caching reduces load times on revisits
- Mobile: Optimized for 4G and 5G connections

## Support

For issues or feature requests:
1. Check the troubleshooting section above
2. Review ESPN API documentation: https://fantasy.espn.com/
3. Contact league administrator: harrison@banfana.com

## License

© 2026 South Mecklenburg High School Fantasy Football League. All rights reserved.

## Credits

Built with ❤️ for the SMFF League Community
- React 18
- ESPN Fantasy Football API
- Vercel Hosting
