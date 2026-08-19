import React, { useState, useEffect } from 'react';
import './App-branded.css';
import BrandedHeader from './components/BrandedHeader';
import BrandedNavbar from './components/BrandedNavbar';
import LeagueDashboard from './components/LeagueDashboard';
import BrandedFooter from './components/BrandedFooter';

function App() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem('darkMode') === 'true'
  );
  const [leagueData, setLeagueData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
         try {
        setLoading(true);
        // Fetch from our Vercel serverless function (which proxies ESPN API)
        const response = await fetch(
          '/api/league'
        );

        if (!response.ok) {
          throw new Error('Failed to fetch league data from ESPN API');
        }

        const data = await response.json();
        setLeagueData(data);
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
    <div className={`app-container ${darkMode ? 'dark-mode' : ''}`}>
      <BrandedNavbar darkMode={darkMode} onToggleDarkMode={toggleDarkMode} />

      <div className="main-content">
        <BrandedHeader leagueData={leagueData} />

        {loading && (
          <div className="loading">
            <div className="spinner"></div>
            <p>Loading league data...</p>
          </div>
        )}

        {error && (
          <div className="card" style={{ borderLeftColor: '#ff6b6b' }}>
            <h3 style={{ color: '#ff6b6b' }}>⚠️ Loading Notice</h3>
            <p>{error}</p>
            <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>
              Displaying league data. Some features may be limited.
            </p>
          </div>
        )}

        {!loading && leagueData && (
          <LeagueDashboard leagueData={leagueData} darkMode={darkMode} />
        )}
      </div>

      <BrandedFooter />
    </div>
  );
}

export default App;

