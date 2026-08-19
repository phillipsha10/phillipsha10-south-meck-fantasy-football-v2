# SMFF Platform v2 - Step-by-Step Deployment Guide

Your Fantasy Football platform is complete! Follow these steps to deploy it to GitHub and Vercel.

---

## PART 1: Download All Project Files

### Step 1: Get the Files
All your project files are ready in `/tmp/fantasy-football-platform-v2/`

You need to download them to your computer. They include:
- React components
- Styling files
- Configuration files
- Package management files

### Step 2: Organize on Your Computer

Create a new folder: `south-meck-fantasy-football-v2`

Download all files from the `/tmp/fantasy-football-platform-v2/` directory into this folder.

Your folder structure should look like:
```
south-meck-fantasy-football-v2/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── LeagueDashboard.jsx
│   │   ├── StandingsTable.jsx
│   │   ├── Storylines.jsx
│   │   ├── AwardTracker.jsx
│   │   ├── StatsTracker.jsx
│   │   ├── ChampionshipHistory.jsx
│   │   ├── BrandedNavbar.jsx
│   │   ├── BrandedHeader.jsx
│   │   └── BrandedFooter.jsx
│   ├── espn-api.js
│   ├── App.jsx
│   ├── App-branded.css
│   └── index.jsx
├── .gitignore
├── package.json
├── vercel.json
└── README.md
```

---

## PART 2: Create GitHub Repository

### Step 1: Go to GitHub
Visit: https://github.com/new

### Step 2: Create New Repository
- **Repository name:** `south-meck-fantasy-football-v2`
- **Description:** South Mecklenburg High School Fantasy Football League Platform with ESPN API
- **Public/Private:** Public (to match ESPN API requirements)
- Click **"Create repository"**

### Step 3: Get Your Repository URL
After creating, you'll see your repo URL:
```
https://github.com/YOUR_USERNAME/south-meck-fantasy-football-v2.git
```

**Copy this URL - you'll need it next!**

---

## PART 3: Upload Files to GitHub

You have TWO options:

### OPTION A: Using GitHub Web Interface (Easiest)

1. Go to your new GitHub repository
2. Click **"Add file"** → **"Upload files"**
3. Drag and drop your project folder contents into the upload area
4. Click **"Commit changes"**
5. Message: "Initial commit: Fantasy football platform v2 with ESPN API"
6. Click **"Commit changes"**

✅ **Skip to PART 4 if you use this method**

---

### OPTION B: Using Command Line (Faster for Experienced Users)

1. Open Terminal/Command Prompt on your computer
2. Navigate to your project folder:
   ```bash
   cd ~/path/to/south-meck-fantasy-football-v2
   ```

3. Initialize Git and add files:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Fantasy football platform v2 with ESPN API"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/south-meck-fantasy-football-v2.git
   git push -u origin main
   ```

   (Replace YOUR_USERNAME with your actual GitHub username)

✅ **Proceed to PART 4**

---

## PART 4: Deploy to Vercel

### Step 1: Sign Up / Log In to Vercel
Go to: https://vercel.com

- Click **"Sign Up"** if you don't have an account
- Use GitHub account for easiest setup
- Authorize Vercel to access your GitHub repos

### Step 2: Create New Project
1. Click **"New Project"**
2. Click **"Import Git Repository"**
3. Find and select: `south-meck-fantasy-football-v2`
4. Click **"Import"**

### Step 3: Configure Project
- **Project Name:** `south-meck-fantasy-football-v2` (or similar)
- **Framework:** Select **"Create React App"**
- **Root Directory:** Leave blank (default)
- **Build Command:** `npm run build` (should auto-fill)
- **Output Directory:** `build` (should auto-fill)

### Step 4: Environment Variables
The ESPN League ID is already in `vercel.json`:
- `REACT_APP_ESPN_LEAGUE_ID: 809120`

✅ **No additional env vars needed!**

### Step 5: Deploy
1. Click **"Deploy"**
2. Wait 2-3 minutes for build to complete
3. You'll see a green checkmark when done

### Step 6: View Your Site
1. Click the deployment URL (top of screen)
2. Your live Fantasy Football platform is now online! 🎉

---

## PART 5: Test Your Deployment

### What to Check:
- ✅ Navbar displays "SOUTH MECKLENBURG" and logo
- ✅ Dark mode toggle works (click 🌙 button)
- ✅ All tabs load: Standings, Storylines, Awards, Stats, History
- ✅ Standings table shows teams and data from ESPN API
- ✅ Mobile view looks good (test on phone)

### If Something Doesn't Work:

**"Page is blank or shows error"**
- Go to Vercel dashboard → Click your project
- Click **"Deployments"** tab
- Click latest deployment → **"View Logs"**
- Look for red error messages
- Most common issues are missing packages - let me know the error

**"No team data showing"**
- Check Vercel logs for "Failed to fetch league data"
- Verify ESPN League 809120 is public: https://fantasy.espn.com/football/team?leagueId=809120
- If still issues, contact me with the error from logs

---

## PART 6: Future Updates

When you want to update the site:

### Via GitHub (Recommended):
1. Make changes to your local files
2. Upload to GitHub (same as PART 3)
3. Vercel automatically rebuilds within 1-2 minutes
4. Your live site updates automatically

### Via Vercel Dashboard:
1. Go to Vercel dashboard
2. Click your project → "Deployments"
3. Click "Redeploy" on any previous deployment
4. Site rebuilds

---

## FREQUENTLY ASKED QUESTIONS

**Q: Can people see my site?**
A: Yes! Your Vercel URL is public. You can share it with everyone. They don't need login.

**Q: How do I add my own domain (like smff.com)?**
A: In Vercel dashboard → Your project → "Domains" → Add custom domain

**Q: How often does data update?**
A: ESPN API updates every 15 minutes. Dark mode and other preferences save locally in browser.

**Q: Can I edit the league history data?**
A: Yes! Edit `src/components/ChampionshipHistory.jsx` to add historical championship data (years 2014-2024)

**Q: How do I add more teams to awards/storylines?**
A: The platform automatically reads from ESPN API. If new teams join, they appear automatically.

---

## NEED HELP?

If deployment fails:
1. Check Vercel build logs (Deployments tab → View Logs)
2. Verify all files are in GitHub repo
3. Make sure .gitignore didn't exclude important files
4. Clear browser cache and try again

Send me:
- Screenshot of the error
- Vercel project name
- Link to your GitHub repo

I'm here to help! 🏈

---

**Your deployment URL:** https://south-meck-fantasy-football-v2.vercel.app
(Replace "south-meck-fantasy-football-v2" with your actual Vercel project name)

**Go team! 🏆**
