import React from 'react';

const LeagueNews = ({ darkMode }) => {
  // Mock transaction data
  const transactions = [
    {
      date: '2 days ago',
      team: 'Lee Sutton',
      type: 'TRADE',
      details: 'Traded Travis Kelce for Mark Andrews',
      reactions: { '🔥': 3, '😂': 1 }
    },
    {
      date: '3 days ago',
      team: 'Jay Darji',
      type: 'PICKUP',
      details: 'Picked up Tee Higgins (dropped Amari Cooper)',
      reactions: { '👍': 2 }
    },
    {
      date: '4 days ago',
      team: 'Caleb Cunningham',
      type: 'TRADE',
      details: 'Traded Justin Jefferson for CeeDee Lamb + pick',
      reactions: { '🤔': 1, '👀': 2 }
    },
    {
      date: '1 week ago',
      team: 'Alex Vesano',
      type: 'PICKUP',
      details: 'Picked up Saquon Barkley (dropped Jonathan Taylor)',
      reactions: { '🚀': 4 }
    }
  ];

  const getTransactionIcon = (type) => {
    if (type === 'TRADE') return '🔄';
    if (type === 'PICKUP') return '✅';
    if (type === 'DROP') return '❌';
    return '📰';
  };

  const getTransactionColor = (type) => {
    if (type === 'TRADE') return '#3498db';
    if (type === 'PICKUP') return '#2ecc71';
    if (type === 'DROP') return '#ff6b6b';
    return '#95a5a6';
  };

  return (
    <div style={{
      backgroundColor: darkMode ? '#2a2a2a' : '#f8f9fa',
      border: '2px solid #c41e3a',
      borderRadius: '10px',
      padding: '1.5rem',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      transition: 'all 0.3s ease'
    }}>
      <h2 style={{
        fontSize: '1.3rem',
        fontWeight: '800',
        color: '#c41e3a',
        margin: '0 0 1.5rem 0',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem'
      }}>
        📰 League News
      </h2>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: '1rem',
        maxHeight: '400px',
        overflowY: 'auto'
      }}>
        {transactions.map((transaction, index) => (
          <div
            key={index}
            style={{
              backgroundColor: darkMode ? '#1a1a1a' : '#ffffff',
              border: '1px solid #ddd',
              borderRadius: '8px',
              padding: '1rem',
              borderLeft: `4px solid ${getTransactionColor(transaction.type)}`,
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div style={{
              display: 'flex',
              gap: '1rem',
              marginBottom: '0.75rem',
              alignItems: 'flex-start'
            }}>
              {/* Icon */}
              <div style={{
                fontSize: '1.5rem'
              }}>
                {getTransactionIcon(transaction.type)}
              </div>

              {/* Content */}
              <div style={{
                flex: 1
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'start',
                  marginBottom: '0.25rem'
                }}>
                  <div>
                    <span style={{
                      fontWeight: '700',
                      color: darkMode ? '#ffffff' : '#1a1a1a',
                      fontSize: '0.95rem'
                    }}>
                      {transaction.team}
                    </span>
                    <span style={{
                      display: 'inline-block',
                      marginLeft: '0.5rem',
                      backgroundColor: getTransactionColor(transaction.type),
                      color: '#ffffff',
                      padding: '0.2rem 0.6rem',
                      borderRadius: '12px',
                      fontSize: '0.7rem',
                      fontWeight: '600',
                      textTransform: 'uppercase'
                    }}>
                      {transaction.type}
                    </span>
                  </div>

                  <span style={{
                    fontSize: '0.8rem',
                    color: darkMode ? '#aaa' : '#999',
                    fontWeight: '600'
                  }}>
                    {transaction.date}
                  </span>
                </div>

                <p style={{
                  margin: '0.5rem 0 0 0',
                  color: darkMode ? '#ccc' : '#555',
                  fontSize: '0.95rem',
                  lineHeight: '1.4'
                }}>
                  {transaction.details}
                </p>

                {/* Reactions */}
                {Object.keys(transaction.reactions).length > 0 && (
                  <div style={{
                    marginTop: '0.75rem',
                    display: 'flex',
                    gap: '0.5rem',
                    flexWrap: 'wrap'
                  }}>
                    {Object.entries(transaction.reactions).map(([emoji, count]) => (
                      <button
                        key={emoji}
                        style={{
                          backgroundColor: darkMode ? '#2a2a2a' : '#f0f0f0',
                          border: '1px solid #ddd',
                          borderRadius: '16px',
                          padding: '0.3rem 0.6rem',
                          cursor: 'pointer',
                          fontSize: '0.85rem',
                          fontWeight: '600',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.3rem',
                          transition: 'all 0.2s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = getTransactionColor(transaction.type);
                          e.currentTarget.style.color = '#ffffff';
                          e.currentTarget.style.borderColor = getTransactionColor(transaction.type);
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = darkMode ? '#2a2a2a' : '#f0f0f0';
                          e.currentTarget.style.color = 'inherit';
                          e.currentTarget.style.borderColor = '#ddd';
                        }}
                      >
                        <span>{emoji}</span>
                        <span>{count}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Info Footer */}
      <div style={{
        marginTop: '1.5rem',
        padding: '1rem',
        backgroundColor: darkMode ? 'rgba(196, 30, 58, 0.1)' : 'rgba(196, 30, 58, 0.05)',
        borderLeft: '4px solid #c41e3a',
        borderRadius: '6px'
      }}>
        <p style={{
          fontSize: '0.85rem',
          color: darkMode ? '#aaa' : '#666',
          margin: 0,
          lineHeight: '1.5'
        }}>
          💡 React to league transactions with emojis. Stay up to date with all trades, pickups, and drops!
        </p>
      </div>
    </div>
  );
};

export default LeagueNews;
