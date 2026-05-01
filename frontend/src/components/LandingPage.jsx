import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, Moon, Sun, Heart, Target, Sparkles } from 'lucide-react';

const MOODS = [
  { emoji: '😔', label: 'Down', value: 0 },
  { emoji: '😊', label: 'Content', value: 25 },
  { emoji: '😌', label: 'Peaceful', value: 50 },
  { emoji: '🥰', label: 'Happy', value: 75 },
  { emoji: '✨', label: 'Excited', value: 100 },
];

function getMoodFromValue(val) {
  const idx = Math.round((val / 100) * (MOODS.length - 1));
  return MOODS[Math.min(idx, MOODS.length - 1)];
}

export default function LandingPage() {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [moodValue, setMoodValue] = useState(50);

  const currentMood = getMoodFromValue(moodValue);

  const theme = {
    bg: isDarkMode ? '#080f1a' : '#f8fafc',
    surface: isDarkMode ? 'rgba(125, 211, 252, 0.04)' : 'rgba(0,0,0,0.03)',
    border: isDarkMode ? 'rgba(125, 211, 252, 0.1)' : 'rgba(0,0,0,0.1)',
    text: isDarkMode ? '#ffffff' : '#0f172a',
    muted: isDarkMode ? 'rgba(255, 255, 255, 0.45)' : '#64748b',
    brand: '#7DD3FC',
    brandDim: 'rgba(125, 211, 252, 0.15)',
    navBg: isDarkMode ? '#080f1a' : '#f8fafc',
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: theme.bg,
      color: theme.text,
      fontFamily: "'DM Sans', system-ui, sans-serif",
      overflowX: 'hidden',
      transition: 'background 0.3s, color 0.3s',
    }}>

      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,700;1,9..40,300&family=DM+Serif+Display:ital@0;1&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .mood-slider {
          -webkit-appearance: none;
          appearance: none;
          width: 100%;
          height: 4px;
          border-radius: 2px;
          outline: none;
          cursor: pointer;
          background: linear-gradient(to right, #7DD3FC 0%, #7DD3FC ${moodValue}%, rgba(255,255,255,0.15) ${moodValue}%, rgba(255,255,255,0.15) 100%);
        }
        .mood-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 22px; height: 22px;
          border-radius: 50%;
          background: #fff;
          border: 3px solid #7DD3FC;
          box-shadow: 0 0 12px rgba(125,211,252,0.5);
          cursor: pointer;
        }
        .mood-slider::-moz-range-thumb {
          width: 22px; height: 22px;
          border-radius: 50%;
          background: #fff;
          border: 3px solid #7DD3FC;
          box-shadow: 0 0 12px rgba(125,211,252,0.5);
          cursor: pointer;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        .fade-up-1 { animation: fadeUp 0.7s ease both; }
        .fade-up-2 { animation: fadeUp 0.7s 0.12s ease both; }
        .fade-up-3 { animation: fadeUp 0.7s 0.24s ease both; }
        .fade-up-4 { animation: fadeUp 0.7s 0.36s ease both; }
        .fade-up-5 { animation: fadeUp 0.7s 0.48s ease both; }
        .fade-up-6 { animation: fadeUp 0.7s 0.6s ease both; }

        .nav-btn:hover { color: #7DD3FC; }
        .cta-btn:hover { background: #BAE6FD !important; transform: scale(1.02); }
        .cta-btn:active { transform: scale(0.98); }
        .toggle-btn:hover { background: rgba(125,211,252,0.1) !important; }
        .feature-card:hover { border-color: rgba(125,211,252,0.3) !important; background: rgba(125,211,252,0.06) !important; }
        .about-card:hover { border-color: rgba(125,211,252,0.25) !important; }
      `}</style>

      {/* Radial glow bg */}
      <div style={{
        position: 'fixed', top: 0, left: '50%', transform: 'translateX(-50%)',
        width: 700, height: 500,
        background: 'radial-gradient(ellipse, rgba(125,211,252,0.08) 0%, transparent 70%)',
        pointerEvents: 'none', zIndex: 0,
      }} />

      {/* NAVBAR */}
      <nav style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '20px 48px', position: 'relative', zIndex: 10,
        background: theme.navBg,
        borderBottom: `1px solid ${theme.border}`,
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Activity size={22} color={theme.brand} strokeWidth={2.5} />
            <span style={{ fontWeight: 700, fontSize: 18, letterSpacing: '0.02em' }}>Mindora</span>
          </div>
          <span style={{ fontSize: 11, color: theme.muted, marginLeft: 32 }}>Your mental health companion</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
          {['Features', 'About Mindora'].map(label => (
            <button key={label}
              className="nav-btn"
              onClick={() => document.getElementById(label === 'Features' ? 'features' : 'about').scrollIntoView({ behavior: 'smooth' })}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: theme.muted, fontSize: 14, fontWeight: 500, transition: 'color 0.2s', fontFamily: 'inherit' }}
            >{label}</button>
          ))}
          <button className="toggle-btn"
            onClick={() => setIsDarkMode(!isDarkMode)}
            style={{
              background: 'none', border: `1px solid ${theme.border}`, borderRadius: '50%',
              width: 36, height: 36, cursor: 'pointer', color: theme.muted,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'background 0.2s',
            }}>
            {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button
            onClick={() => navigate('/register')}
            style={{
              background: theme.brand, color: '#0a1612', border: 'none', borderRadius: 999,
              padding: '9px 22px', fontWeight: 700, fontSize: 14, cursor: 'pointer',
              transition: 'all 0.2s', fontFamily: 'inherit',
            }}
          >Sign In</button>
        </div>
      </nav>

      {/* HERO */}
      <main style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        textAlign: 'center', padding: '80px 24px 40px', position: 'relative', zIndex: 1,
      }}>
        <div className="fade-up-1" style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          border: `1px solid ${theme.border}`, borderRadius: 999,
          padding: '7px 16px', fontSize: 12, color: theme.muted,
          background: theme.surface, marginBottom: 32,
        }}>
          <span style={{
            width: 7, height: 7, borderRadius: '50%', background: theme.brand,
            animation: 'pulse-dot 2s infinite',
            display: 'inline-block',
          }} />
          Your AI Agent Mental Health Companion
        </div>

        <h1 className="fade-up-2" style={{
          fontFamily: "'DM Serif Display', Georgia, serif",
          fontSize: 'clamp(52px, 8vw, 88px)',
          fontWeight: 400,
          lineHeight: 1.08,
          letterSpacing: '-0.02em',
          marginBottom: 24,
          maxWidth: 700,
        }}>
          Find <span style={{ color: theme.brand }}>Peace</span><br />of Mind
        </h1>

        <p className="fade-up-3" style={{
          maxWidth: 520, fontSize: 16, lineHeight: 1.7, color: theme.muted, marginBottom: 48,
        }}>
          Experience a new way of emotional support. Our AI companion is here to listen, understand, and guide you through life's journey.
        </p>

        {/* MOOD SLIDER */}
        <div className="fade-up-4" style={{
          width: '100%', maxWidth: 520,
          border: `1px solid ${theme.border}`,
          borderRadius: 20,
          padding: '28px 32px',
          background: theme.surface,
          marginBottom: 40,
        }}>
          <p style={{ fontSize: 13, color: theme.muted, marginBottom: 24 }}>
            Whatever you're feeling, we're here to listen
          </p>
          <div style={{
            display: 'flex', justifyContent: 'space-between', marginBottom: 20,
          }}>
            {MOODS.map((mood, i) => (
              <div key={i} style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
                opacity: currentMood.label === mood.label ? 1 : 0.4,
                transform: currentMood.label === mood.label ? 'scale(1.15)' : 'scale(1)',
                transition: 'all 0.2s',
              }}>
                <span style={{ fontSize: 26 }}>{mood.emoji}</span>
                <span style={{
                  fontSize: 11, fontWeight: currentMood.label === mood.label ? 700 : 400,
                  color: currentMood.label === mood.label ? theme.brand : theme.muted,
                }}>{mood.label}</span>
              </div>
            ))}
          </div>
          <input
            type="range" min="0" max="100" value={moodValue}
            onChange={e => setMoodValue(Number(e.target.value))}
            className="mood-slider"
          />
          <p style={{ fontSize: 12, color: theme.muted, marginTop: 12, textAlign: 'center' }}>
            Slide to express how you're feeling today
          </p>
        </div>

        <button className="fade-up-5 cta-btn"
          onClick={() => navigate('/register')}
          style={{
            background: theme.brand, color: '#0c1a2e', border: 'none', borderRadius: 999,
            padding: '16px 40px', fontWeight: 700, fontSize: 16, cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: 10,
            boxShadow: '0 0 40px rgba(125,211,252,0.35)',
            transition: 'all 0.2s', fontFamily: 'inherit',
          }}>
          Begin Your Journey <span style={{ fontSize: 18 }}>→</span>
        </button>
      </main>

      {/* FEATURES — horizontal cards like Aura3.0 */}
      <section id="features" style={{ maxWidth: 1100, margin: '80px auto 0', padding: '60px 40px', position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <h2 style={{
            fontFamily: "'DM Serif Display', Georgia, serif",
            fontSize: 36, fontWeight: 400, color: theme.brand, marginBottom: 12,
          }}>How Mindora Helps You</h2>
          <p style={{ color: theme.muted, fontSize: 16 }}>
            Experience a new kind of emotional support, powered by empathetic AI
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
          {[
            { emoji: '💚', title: '24/7 Support', desc: 'Always here to listen and support you, any time of day' },
            { emoji: '💡', title: 'Smart Insights', desc: 'Personalized guidance powered by emotional intelligence' },
            { emoji: '🔒', title: 'Private & Secure', desc: 'Your conversations are always confidential and encrypted' },
            { emoji: '🧬', title: 'Evidence-Based', desc: 'Therapeutic techniques backed by clinical research' },
          ].map((f, i) => (
            <div key={i} className="feature-card" style={{
              border: `1px solid ${theme.border}`,
              borderRadius: 16,
              padding: '24px 20px',
              background: theme.surface,
              transition: 'all 0.25s',
              cursor: 'default',
            }}>
              <div style={{
                width: 42, height: 42, borderRadius: 12,
                background: theme.brandDim,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 20, marginBottom: 16,
                border: `1px solid ${theme.border}`,
              }}>
                {f.emoji}
              </div>
              <h3 style={{ fontWeight: 700, fontSize: 15, marginBottom: 8 }}>{f.title}</h3>
              <p style={{ fontSize: 13, color: theme.muted, lineHeight: 1.6 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT — Mission / Vision / Values like Aura3.0 */}
      <section id="about" style={{ maxWidth: 1100, margin: '80px auto 80px', padding: '60px 40px', position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <h2 style={{
            fontFamily: "'DM Serif Display', Georgia, serif",
            fontSize: 36, fontWeight: 400, marginBottom: 16,
          }}>About Mindora</h2>
          <p style={{ color: theme.muted, fontSize: 16, maxWidth: 640, margin: '0 auto', lineHeight: 1.7 }}>
            We're making emotional support accessible to everyone, anywhere, at any time — by combining advanced ML emotion detection with empathetic AI.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
          {[
            {
              icon: <Heart size={28} color={theme.brand} />,
              title: 'Our Mission',
              desc: 'Democratize access to mental health support through ethical AI, making quality therapeutic care available to everyone, everywhere, at any time.',
            },
            {
              icon: <Target size={28} color={theme.brand} />,
              title: 'Our Vision',
              desc: 'A world where mental health support is accessible, private, and personalized — powered by trusted AI that truly understands you.',
            },
            {
              icon: <Sparkles size={28} color={theme.brand} />,
              title: 'Our Values',
              desc: 'Privacy, Empathy, Innovation, and Trust form the cornerstone of our platform, ensuring the highest standards of care and security.',
            },
          ].map((card, i) => (
            <div key={i} className="about-card" style={{
              border: `1px solid ${theme.border}`,
              borderRadius: 20,
              padding: '36px 28px',
              background: theme.surface,
              textAlign: 'center',
              transition: 'border-color 0.25s',
            }}>
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                width: 56, height: 56, borderRadius: '50%',
                background: theme.brandDim, border: `1px solid ${theme.border}`,
                margin: '0 auto 20px',
              }}>
                {card.icon}
              </div>
              <h3 style={{ fontWeight: 700, fontSize: 18, marginBottom: 12 }}>{card.title}</h3>
              <p style={{ color: theme.muted, fontSize: 14, lineHeight: 1.7 }}>{card.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{
        borderTop: `1px solid ${theme.border}`,
        padding: '32px 48px',
        textAlign: 'center',
        background: theme.navBg,
        color: theme.muted,
        fontSize: 14,
        marginTop: 80,
      }}>
        © 2026 Mindora All rights reserved.
      </footer>

    </div>
  );
}
