import React from 'react';

const Storylines = ({ teams, matchups }) => {
  // Generate storylines based on team standings and performance
  const generateStorylines = () => {
    if (!teams || teams.length === 0) return [];

    const stories = [];

    // Story 1: Leader
    const leader = [...teams].sort((a, b) => b.wins - a.wins)[0];
    if (leader) {
      stories.push({
        title: `🔥 ${leader.teamName} Dominating League`,
        description: `${leader.owner}'s squad sits atop the standings with an impressive ${leader.wins}-${leader.losses} record and ${leader.pointsFor} total points. Can they maintain their dominance all the way to the championship?`,
        icon: '🏆',
      });
    }

    // Story 2: Underdog
    const underdog = [...teams].sort((a, b) => a.wins - b.wins)[0];
    if (underdog && underdog.wins < 5) {
      stories.push({
        title: `⬆️ ${underdog.teamName} Fighting Back`,
        description: `Despite sitting near the bottom, ${underdog.owner} remains in the hunt. With ${underdog.pointsFor} points and ${underdog.wins} wins, every matchup from here on is crucial.`,
        icon: '💪',
      });
    }

    // Story 3: Close Matchups
    if (teams.length > 1) {
      const top2 = [...teams]
        .sort((a, b) => b.wins - a.wins)
        .slice(0, 2);

      if (top2.length === 2 && Math.abs(top2[0].wins - top2[1].wins) <= 1) {
        stories.push({
          title: `⚡ Battle at the Top`,
          description: `${top2[0].teamName} and ${top2[1].teamName} are neck-and-neck for the top spot. Every point matters in this fierce competition for league supremacy.`,
          icon: '⚔️',
        });
      }
    }

    // Story 4: Bench Points Leader
    const benchMaster = [...teams].sort(
      (a, b) => (b.pointsFor - b.pointsAgainst) - (a.pointsFor - a.pointsAgainst)
    )[0];
    if (benchMaster) {
      const benchDiff = benchMaster.pointsFor - benchMaster.pointsAgainst;
      stories.push({
        title: `📊 ${benchMaster.teamName} Efficiency King`,
        description: `${benchMaster.owner} is maximizing every point with superior point differential of ${benchDiff}. Superior decision-making or just lucky?`,
        icon: '✨',
      });
    }

    // Story 5: Best Defense
    const bestDefense = [...teams].sort((a, b) => a.pointsAgainst - b.pointsAgainst)[0];
    if (bestDefense) {
      stories.push({
        title: `🛡️ ${bestDefense.teamName} Playing Strong Defense`,
        description: `With only ${bestDefense.pointsAgainst} points allowed, ${bestDefense.owner} is running one of the stingiest rosters in the league.`,
        icon: '🔒',
      });
    }

    return stories;
  };

  const storylines = generateStorylines();

  return (
    <div>
      <h2 style={{ color: '#c41e3a', marginBottom: '1.5rem' }}>
        Weekly Storylines
      </h2>

      {storylines.length > 0 ? (
        <div className="grid-container">
          {storylines.map((story, index) => (
            <div key={index} className="card">
              <h3 style={{ color: '#c41e3a' }}>{story.icon} {story.title}</h3>
              <p>{story.description}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="card">
          <p>Loading storylines...</p>
        </div>
      )}

      <div
        style={{
          marginTop: '2rem',
          padding: '1rem',
          background: 'rgba(212, 175, 55, 0.05)',
          borderRadius: '4px',
          borderLeft: '3px solid #d4af37',
        }}
      >
        <p style={{ fontSize: '0.9rem', margin: 0, color: '#d4af37' }}>
          ✨ <strong>Storylines generated</strong> from current league standings and performance metrics.
        </p>
      </div>
    </div>
  );
};

export default Storylines;
