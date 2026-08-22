import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App-branded.css';
import BrandedNavbar from './components/BrandedNavbar';
import BrandedFooter from './components/BrandedFooter';
import LandingPage from './components/LandingPage';
import PersonalDashboard from './components/PersonalDashboard';
import AllTimeRankings from './components/AllTimeRankings';
import LeagueDashboard from './components/LeagueDashboard';

function App() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem('darkMode') === 'true'
  );
  const [leagueData, setLeagueData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [allTeamsData, setAllTeamsData] = useState(null);

  // Apply dark mode to body on mount and when it changes
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  // Fetch league data on mount
  useEffect(() => {
    const loadLeagueData = async () => {
      try {
        setLoading(true);
        // Fetch from our Vercel serverless function (which proxies ESPN API)
        const response = await fetch('/api/league');

        if (!response.ok) {
          throw new Error('Failed to fetch league data from ESPN API');
        }

        const data = await response.json();
        setLeagueData(data);
        setAllTeamsData(data.teams || []);
        setError(null);
      } catch (err) {
        console.error('Error loading league data:', err);
        setError(err.message);
        // Set some mock data as fallback
        setLeagueData({
          name: 'South Mecklenburg Fantasy Football',
          teams: [],
          season: new Date().getFullYear(),
        });
      } finally {
        setLoading(false);
      }
    };

    loadLeagueData();
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <Router>
      <div className={`app-container ${darkMode ? 'dark-mode' : ''}`}>
        <BrandedNavbar darkMode={darkMode} onToggleDarkMode={toggleDarkMode} />

        <div className="main-content">
          <Routes>
            {/* Landing Page - Entry Portal */}
            <Route
              path="/"
              element={<LandingPage darkMode={darkMode} />}
            />

            {/* Personal Dashboard */}
            <Route
              path="/dashboard/:teamId"
              element={
                <PersonalDashboard
                  leagueData={leagueData}
                  darkMode={darkMode}
                  allTeamsData={allTeamsData}
                />
              }
            />

            {/* All-Time Rankings */}
            <Route
              path="/rankings"
              element={
                !loading && leagueData ? (
                  <LeagueDashboard leagueData={leagueData} darkMode={darkMode} />
                ) : (
                  <div className="loading">
                    <div className="spinner"></div>
                    <p>Loading rankings...</p>
                  </div>
                )
              }
            />

            {/* Fallback to landing page */}
            <Route path="*" element={<LandingPage darkMode={darkMode} />} />
          </Routes>

          {/* Show loading/error at top level if needed */}
          {loading && !leagueData && (
            <div className="loading">
              <div className="spinner"></div>
              <p>Loading league data...</p>
            </div>
          )}

          {error && (
            <div className="card" style={{ borderLeftColor: '#ff6b6b', margin: '1rem' }}>
              <h3 style={{ color: '#ff6b6b' }}>⚠️ Loading Notice</h3>
              <p>{error}</p>
              <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>
                Some features may be limited.
              </p>
            </div>
          )}
        </div>

        <BrandedFooter />
      </div>
    </Router>
  );
}

export default App; 
