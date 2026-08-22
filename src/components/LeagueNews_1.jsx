import React, { useState } from 'react';

const LeagueNews = ({ darkMode }) => {
  const [reactions, setReactions] = useState({});

  const transactions = [
    {
      id: 1,
      type: 'Trade',
      teams: 'Team Alpha → Team Beta',
      details: 'Traded Patrick Mahomes for Josh Allen',
      timestamp: '2h ago',
      emoji: '🔄'
    },
    {
      id: 2,
      type: 'Waiver',
      teams: 'Team Gamma',
      details: 'Picked up Jaylen Hurts (QB)',
      timestamp: '4h ago',
      emoji: '✋'
    },
    {
      id: 3,
      type: 'Trade',
      teams: 'Team Delta ↔ Team Epsilon',
      details: 'CeeDee Lamb for Travis Kelce',
      timestamp: '1d ago',
      emoji: '🔄'
    },
    {
      id: 4,
      type: 'Drop',
      teams: 'Team Zeta',
      details: 'Dropped Rasheed Rice to waivers',
      timestamp: '2d ago',
      emoji: '🗑️'
    },
    {
      id: 5,
      type: 'Waiver',
      teams: 'Team Eta',
      details: 'Claimed D. Henry off waivers',
      timestamp: '3d ago',
      emoji: '✋'
    }
  ];

  const reactionEmojis = ['🔥', '😂', '👍', '🚀', '🤔', '👀'];

  const toggleReaction = (transactionId, emoji) => {
    const key = `${transactionId}-${emoji}`;
    setReactions((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div
      style={{
        background: darkMode ? '#2a2a2a' : '#f8f8f8',
        border: '2px solid #c41e3a',
        borderRadius: '8px',
        padding: '1.5rem',
        boxShadow: darkMode ? '0 2px 8px rgba(0,0,0,0.3)' : '0 2px 8px rgba(0,0,0,0.1)'
      }}
    >
      <h3 style={{ color: '#c41e3a', marginTop: 0, marginBottom: '1.5rem' }}>
        📰 League News & Transactions
      </h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {transactions.map((transaction) => (
          <div
            key={transaction.id}
            style={{
              background: darkMode ? '#1a1a1a' : 'white',
              border: '1px solid #ddd',
              borderRadius: '6px',
              padding: '1rem',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateX(4px)';
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateX(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div
              style={{
                display: 'flex',
                gap: '1rem',
                alignItems: 'flex-start',
                marginBottom: '0.75rem'
              }}
            >
              <span style={{ fontSize: '1.5rem' }}>{transaction.emoji}</span>
              <div style={{ flex: 1 }}>
                <p
                  style={{
                    margin: 0,
                    fontWeight: '600',
                    fontSize: '0.95rem',
                    color: '#c41e3a'
                  }}
                >
                  {transaction.type}
                </p>
                <p style={{ margin: '0.25rem 0 0 0', fontWeight: '600', fontSize: '0.9rem' }}>
                  {transaction.teams}
                </p>
                <p style={{ margin: '0.5rem 0 0 0', color: '#888', fontSize: '0.85rem' }}>
                  {transaction.details}
                </p>
                <p style={{ margin: '0.5rem 0 0 0', color: '#aaa', fontSize: '0.8rem' }}>
                  {transaction.timestamp}
                </p>
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                gap: '0.5rem',
                flexWrap: 'wrap',
                borderTop: '1px solid #ddd',
                paddingTop: '0.75rem',
                marginTop: '0.75rem'
              }}
            >
              {reactionEmojis.map((emoji) => {
                const key = `${transaction.id}-${emoji}`;
                const isActive = reactions[key];
                return (
                  <button
                    key={emoji}
                    onClick={() => toggleReaction(transaction.id, emoji)}
                    style={{
                      padding: '0.4rem 0.7rem',
                      border: isActive ? '2px solid #d4af37' : '1px solid #ddd',
                      background: isActive
                        ? 'rgba(212, 175, 55, 0.1)'
                        : darkMode
                          ? '#333'
                          : '#f5f5f5',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '1rem',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = isActive
                        ? 'rgba(212, 175, 55, 0.2)'
                        : darkMode
                          ? '#444'
                          : '#e5e5e5';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = isActive
                        ? 'rgba(212, 175, 55, 0.1)'
                        : darkMode
                          ? '#333'
                          : '#f5f5f5';
                    }}
                  >
                    {emoji}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          marginTop: '1.5rem',
          padding: '1rem',
          background: 'rgba(212, 175, 55, 0.1)',
          borderLeft: '4px solid #d4af37',
          borderRadius: '4px'
        }}
      >
        <p style={{ margin: 0, fontSize: '0.9rem' }}>
          📲 <strong>Stay Updated:</strong> Follow all league transactions and drama in real-time.
          React to trades and pickups to engage with your league mates.
        </p>
      </div>
    </div>
  );
};

export default LeagueNews;
