import React from 'react';

const BrandedHeader = ({ leagueData }) => {
  if (!leagueData) return null;

  const currentSeason = leagueData.season || new Date().getFullYear();
  const teamCount = leagueData.teams?.length || 0;

  return (
    <div className="hero-header">
      <h1>🏆 {leagueData.name || 'South Mecklenburg Fantasy Football'}</h1>
      <p>Est. 2014 | The Premier High School Fantasy Football League</p>

      <div className="hero-stats">
        <div className="stat-box">
          <div className="stat-label">Season</div>
          <div className="stat-value">{currentSeason}</div>
        </div>
        <div className="stat-box">
          <div className="stat-label">Teams</div>
          <div className="stat-value">{teamCount}</div>
        </div>
        <div className="stat-box">
          <div className="stat-label">Format</div>
          <div className="stat-value" style={{ fontSize: '1.2rem' }}>
            PPR
          </div>
        </div>
        <div className="stat-box">
          <div className="stat-label">Status</div>
          <div className="stat-value" style={{ fontSize: '1.2rem' }}>
            Live
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandedHeader;
