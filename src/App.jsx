import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BrandedNavbar from './components/BrandedNavbar';
import BrandedFooter from './components/BrandedFooter';
import LandingPage from './components/LandingPage';
import PersonalDashboard from './components/PersonalDashboard';
import LeagueDashboard from './components/LeagueDashboard';
import './App-branded.css';

const App = () => {
  const [darkMode, setDarkMode] = useState(() => {
    // Load dark mode preference from localStorage
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });

  const [leagueData, setLeagueData] = useState(null);
  const [allTeamsData, setAllTeamsData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Toggle dark mode and save preference
  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      const newMode = !prev;
      localStorage.setItem('darkMode', JSON.stringify(newMode));
      return newMode;
    });
  };

  // Fetch league data on mount
  useEffect(() => {
    const fetchLeagueData = async () => {
      try {
        // Try to fetch from your API endpoint
        const response = await fetch('/api/league');
        if (response.ok) {
          const data = await response.json();
          setLeagueData(data);
          setAllTeamsData(data.teams || []);
        }
      } catch (error) {
        console.error('Error fetching league data:', error);
        // Fallback: use empty data, components will handle gracefully
        setLeagueData({});
        setAllTeamsData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchLeagueData();
  }, []);

  return (
    <Router>
      <div
        className={darkMode ? 'dark-mode' : ''}
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: darkMode ? '#1a1a1a' : '#ffffff',
          color: darkMode ? '#ffffff' : '#000000',
          transition: 'background-color 0.3s ease, color 0.3s ease'
        }}
      >
        {/* Navigation */}
        <BrandedNavbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

        {/* Main Content */}
        <main style={{ flex: 1 }}>
          <Routes>
            {/* Landing Page - Entry Point */}
            <Route path="/" element={<LandingPage darkMode={darkMode} />} />

            {/* Personal Dashboard - Individual Team Portal */}
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
              element={<LeagueDashboard leagueData={leagueData} darkMode={darkMode} />}
            />

            {/* Fallback to Landing Page */}
            <Route path="*" element={<LandingPage darkMode={darkMode} />} />
          </Routes>
        </main>

        {/* Footer */}
        <BrandedFooter darkMode={darkMode} />
      </div>
    </Router>
  );
};

export default App;
