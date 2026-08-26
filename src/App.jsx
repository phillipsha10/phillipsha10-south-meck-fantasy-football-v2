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
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });

  const [leagueData, setLeagueData] = useState(null);

  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      const newMode = !prev;
      localStorage.setItem('darkMode', JSON.stringify(newMode));
      return newMode;
    });
  };

  // Only used by the /rankings page (current-season live standings).
  // The personal dashboard is fully static and does not depend on this.
  useEffect(() => {
    const fetchLeagueData = async () => {
      try {
        const response = await fetch('/api/league');
        if (response.ok) {
          const data = await response.json();
          setLeagueData(data);
        }
      } catch (error) {
        console.error('Error fetching league data:', error);
        setLeagueData({});
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
          transition: 'background-color 0.3s ease, color 0.3s ease',
        }}
      >
        <BrandedNavbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<LandingPage />} />

            <Route
              path="/dashboard/:personId"
              element={<PersonalDashboard darkMode={darkMode} />}
            />

            <Route
              path="/rankings"
              element={<LeagueDashboard leagueData={leagueData} darkMode={darkMode} />}
            />

            <Route path="*" element={<LandingPage />} />
          </Routes>
        </main>

        <BrandedFooter darkMode={darkMode} />
      </div>
    </Router>
  );
};

export default App;
