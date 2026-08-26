import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PEOPLE, YEAR_BY_YEAR, getCareerStats } from '../data/leagueData';

const StatBox = ({ label, value, color, icon }) => (
  <div
    style={{
      background: 'rgba(212, 175, 55, 0.08)',
      border: `1px solid ${color}`,
      borderRadius: '6px',
      padding: '1rem',
      textAlign: 'center',
    }}
  >
    <p style={{ margin: '0 0 0.4rem 0', fontSize: '0.8rem', color: '#888' }}>{label}</p>
    <p style={{ margin: 0, fontSize: '1.5rem', fontWeight: '800', color }}>
      {icon ? `${icon} ` : ''}
      {value}
    </p>
  </div>
);

const Th = ({ children, align = 'left' }) => (
  <th style={{ padding: '0.85rem', textAlign: align, fontWeight: '700', color: '#c41e3a' }}>
    {children}
  </th>
);

const PersonalDashboard = ({ darkMode }) => {
  const { personId } = useParams();
  const navigate = useNavigate();
  const [isShaking, setIsShaking] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const person = PEOPLE.find((p) => p.id === personId);
  const seasons = [...(YEAR_BY_YEAR[personId] || [])].sort((a, b) => b.year - a.year);
  const career = getCareerStats(personId);

  useEffect(() => {
    setIsShaking(true);
    setShowMessage(true);
    const t1 = setTimeout(() => setIsShaking(false), 800);
    const t2 = setTimeout(() => setShowMessage(false), 2300);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [personId]);

  if (!person) {
    return (
      <div style={{ padding: '3rem', textAlign: 'center' }}>
        <p style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>We couldn't find that person.</p>
        <button
          onClick={() => navigate('/')}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: '#c41e3a',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: '600',
          }}
        >
          ← Back to Home
        </button>
      </div>
    );
  }

  return (
    <div
      className={isShaking ? 'dashboard-shake' : ''}
      style={{ padding: '2rem', maxWidth: '1100px', margin: '0 auto' }}
    >
      {showMessage && (
        <div
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontSize: 'clamp(1.3rem, 4vw, 2.3rem)',
            fontWeight: '800',
            color: '#d4af37',
            textShadow: '2px 2px 8px rgba(0,0,0,0.8)',
            zIndex: 100,
            animation: 'fadeInOut 2s ease-in-out',
            textAlign: 'center',
            pointerEvents: 'none',
            letterSpacing: '1px',
            padding: '0 1rem',
          }}
        >
          ⚡ ARE YOU READY FOR SOME FOOTBALL? ⚡
        </div>
      )}

      <div style={{ marginBottom: '2rem', borderBottom: '2px solid #c41e3a', paddingBottom: '1rem' }}>
        <h1
          style={{
            fontSize: '2rem',
            fontWeight: '800',
            color: '#c41e3a',
            margin: 0,
            textTransform: 'uppercase',
            letterSpacing: '1px',
          }}
        >
          {person.name}
        </h1>
        <p style={{ color: '#d4af37', fontWeight: '600', margin: '0.25rem 0 0 0' }}>
          {career.seasonsPlayed} season{career.seasonsPlayed !== 1 ? 's' : ''} in the league
        </p>
      </div>

      {/* All-Time Record */}
      <div
        style={{
          background: darkMode ? '#2a2a2a' : '#f8f8f8',
          border: '2px solid #c41e3a',
          borderRadius: '8px',
          padding: '1.5rem',
          marginBottom: '2rem',
        }}
      >
        <h2 style={{ color: '#c41e3a', marginTop: 0, marginBottom: '1.5rem', fontSize: '1.3rem' }}>
          📊 All-Time Record
        </h2>

        {career.seasonsPlayed === 0 ? (
          <p style={{ color: '#888' }}>No historical data yet — check back once seasons are added.</p>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
              gap: '1rem',
            }}
          >
            <StatBox label="Record" value={`${career.wins}-${career.losses}`} color="#c41e3a" />
            <StatBox label="Win %" value={`${career.winPct.toFixed(1)}%`} color="#d4af37" />
            <StatBox label="Championships" value={career.championships} color="#d4af37" icon="🏆" />
            <StatBox label="Runner-Ups" value={career.runnerUps} color="#c41e3a" icon="🥈" />
            <StatBox label="Last Place" value={career.lastPlaces} color="#888" icon="📉" />
          </div>
        )}
      </div>

      {/* Year by Year */}
      <div
        style={{
          background: darkMode ? '#2a2a2a' : '#f8f8f8',
          border: '2px solid #c41e3a',
          borderRadius: '8px',
          padding: '1.5rem',
        }}
      >
        <h2 style={{ color: '#c41e3a', marginTop: 0, marginBottom: '1.5rem', fontSize: '1.3rem' }}>
          📈 Year-by-Year Record
        </h2>

        {seasons.length === 0 ? (
          <p style={{ color: '#888' }}>No season data yet.</p>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.95rem' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #c41e3a' }}>
                  <Th>Year</Th>
                  <Th>Record</Th>
                  <Th align="center">Points For</Th>
                  <Th align="center">Points Against</Th>
                  <Th align="center">Finish</Th>
                </tr>
              </thead>
              <tbody>
                {seasons.map((s) => (
                  <tr key={s.year} style={{ borderBottom: '1px solid #ddd' }}>
                    <td style={{ padding: '0.85rem', fontWeight: '700' }}>{s.year}</td>
                    <td
                      style={{
                        padding: '0.85rem',
                        fontWeight: '600',
                        color: s.wins > s.losses ? '#2ecc71' : '#ff6b6b',
                      }}
                    >
                      {s.wins}-{s.losses}
                    </td>
                    <td style={{ padding: '0.85rem', textAlign: 'center', color: '#2ecc71', fontWeight: '600' }}>
                      {s.pointsFor.toFixed(1)}
                    </td>
                    <td style={{ padding: '0.85rem', textAlign: 'center', color: '#ff6b6b', fontWeight: '600' }}>
                      {s.pointsAgainst.toFixed(1)}
                    </td>
                    <td style={{ padding: '0.85rem', textAlign: 'center' }}>{s.finish || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeInOut {
          0% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
          50% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
          100% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0) rotate(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-8px) rotate(-0.5deg); }
          20%, 40%, 60%, 80% { transform: translateX(8px) rotate(0.5deg); }
        }
        .dashboard-shake {
          animation: shake 0.8s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default PersonalDashboard;

