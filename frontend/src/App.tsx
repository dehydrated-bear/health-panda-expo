import { useState } from 'react';
import './App.css';
import './index.css';

/* ── Data ───────────────────────────────────────────────────────── */
const features = [
  {
    icon: '❤️', title: 'Heart Rate Monitoring', color: 'f-red',
    desc: 'Real-time continuous heart rate tracking with smart alerts and personalised cardiac insights.'
  },
  {
    icon: '🥗', title: 'Nutrition Tracker', color: 'f-yellow',
    desc: 'Log meals effortlessly with our vast food database and get AI-powered diet recommendations.'
  },
  {
    icon: '🏃', title: 'Workout Planner', color: 'f-orange',
    desc: 'Adaptive workout plans built around your fitness level — track reps, sets, and calories burned.'
  },
  {
    icon: '😴', title: 'Sleep Analysis', color: 'f-blue',
    desc: 'Understand sleep cycles with detailed stage breakdowns and actionable rest-quality tips.'
  },
  {
    icon: '🧠', title: 'Mental Wellness', color: 'f-yellow',
    desc: 'Daily mood check-ins, guided meditations, and stress management to keep your mind balanced.'
  },
  {
    icon: '📊', title: 'Health Dashboard', color: 'f-orange',
    desc: 'All your vitals in one beautiful dashboard — spot trends, celebrate milestones, share with docs.'
  },
];

const stats = [
  { icon: '👥', number: '2M+', label: 'Active Users', color: 'c-blue' },
  { icon: '⭐', number: '4.9★', label: 'App Store Rating', color: 'c-yellow' },
  { icon: '📈', number: '50+', label: 'Health Metrics', color: 'c-orange' },
  { icon: '🏆', number: '98%', label: 'Satisfaction Rate', color: 'c-red' },
];

const steps = [
  {
    step: 'step: 1', icon: '📥', emoji: '📲', title: 'Download the App',
    desc: 'Get Health Panda free from the App Store or Google Play in seconds.', cls: 's1'
  },
  {
    step: 'step: 2', icon: '👤', emoji: '🧬', title: 'Set Up Your Profile',
    desc: 'Tell us about yourself — age, goals, fitness level, and health history.', cls: 's2'
  },
  {
    step: 'step: 3', icon: '🔗', emoji: '⌚', title: 'Connect Devices',
    desc: 'Sync your wearables, Apple Watch, or Fitbit for automatic data capture.', cls: 's3'
  },
  {
    step: 'step: 4', icon: '🚀', emoji: '📊', title: 'Start Tracking',
    desc: 'Your personalised health journey begins — with insights from day one.', cls: 's4'
  },
];

const marqueeItems = [
  { icon: '🏥', text: 'Trusted by Physicians' },
  { icon: '🔒', text: 'HIPAA Compliant' },
  { icon: '🌍', text: 'Available in 40+ Countries' },
  { icon: '🤖', text: 'AI-Powered Insights' },
  { icon: '⌚', text: 'Wearable Sync' },
  { icon: '🏆', text: '#1 Health App 2025' },
  { icon: '💊', text: 'Medication Reminders' },
  { icon: '📱', text: 'iOS & Android' },
];

/* ── Component ──────────────────────────────────────────────────── */
export default function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // OAuth email login logic would go here
    console.log('Login with:', email);
    alert('Login functionality will be connected to OAuth provider');
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    // OAuth email signup logic would go here
    console.log('Signup with:', { name, email });
    alert('Signup functionality will be connected to OAuth provider');
  };

  const switchToSignup = () => {
    setShowLogin(false);
    setShowSignup(true);
  };

  const switchToLogin = () => {
    setShowSignup(false);
    setShowLogin(true);
  };

  return (
    <>
      {/* ── Login Modal ── */}
      {showLogin && (
        <div className="modal-overlay" onClick={() => setShowLogin(false)}>
          <div className="login-modal signin-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowLogin(false)}>✕</button>
            <div className="login-content">
              <img src="/panda2_img-removebg-preview.png" alt="Health Panda" style={{ width: 80, height: 80, objectFit: 'contain', marginBottom: '1rem' }} />
              <h2 className="signin-title">Welcome Back! 🐼</h2>
              <p style={{ color: '#666', marginBottom: '2rem', fontWeight: 500 }}>Sign in to continue your wellness journey</p>
              
              <form onSubmit={handleLogin}>
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                  />
                </div>
                <button type="submit" className="btn-signin">Sign In with Email</button>
              </form>
              
              <div className="login-footer">
                <a href="#" style={{ color: '#8CE4FF', fontSize: '0.9rem' }}>Forgot password?</a>
                <p style={{ marginTop: '1rem', color: '#888', fontSize: '0.9rem' }}>
                  Don't have an account? <a href="#" onClick={(e) => { e.preventDefault(); switchToSignup(); }} style={{ color: '#8CE4FF', cursor: 'pointer' }}>Sign up</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Signup Modal ── */}
      {showSignup && (
        <div className="modal-overlay" onClick={() => setShowSignup(false)}>
          <div className="login-modal signup-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowSignup(false)}>✕</button>
            <div className="login-content">
              <img src="/panda2_img-removebg-preview.png" alt="Health Panda" style={{ width: 80, height: 80, objectFit: 'contain', marginBottom: '1rem' }} />
              <h2 className="signup-title">Join Health Panda! 🐼</h2>
              <p style={{ color: '#666', marginBottom: '2rem', fontWeight: 500 }}>Start your wellness journey today</p>
              
              <form onSubmit={handleSignup}>
                <div className="form-group">
                  <label htmlFor="signup-name">Full Name</label>
                  <input
                    type="text"
                    id="signup-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="signup-email">Email Address</label>
                  <input
                    type="email"
                    id="signup-email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="signup-password">Password</label>
                  <input
                    type="password"
                    id="signup-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Create a strong password"
                    required
                    minLength={8}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="confirm-password">Confirm Password</label>
                  <input
                    type="password"
                    id="confirm-password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm your password"
                    required
                    minLength={8}
                  />
                </div>
                <button type="submit" className="btn-signup">Create Account</button>
              </form>
              
              <div className="login-footer">
                <p style={{ marginTop: '1rem', color: '#888', fontSize: '0.9rem' }}>
                  Already have an account? <a href="#" onClick={(e) => { e.preventDefault(); switchToLogin(); }} style={{ color: '#8CE4FF', cursor: 'pointer' }}>Sign in</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Navbar ── */}
      <nav className="navbar">
        <div className="container nav-inner">
          <div className="nav-logo">
            <img src="/panda1_img.svg" alt="Health Panda Logo" style={{ width: 32, height: 32, objectFit: 'contain' }} />
            Health Panda
            <span className="logo-pill">Beta</span>
          </div>
          <ul className="nav-links">
            <li><a href="#features">Features</a></li>
            <li><a href="#how">How It Works</a></li>
            <li><a href="#stats">Stats</a></li>
            <li><a href="#cta">Download</a></li>
          </ul>
          <button className="nav-cta" onClick={() => setShowLogin(true)}>Sign In →</button>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="hero" id="home">
        <div className="hero-blob-1" />
        <div className="hero-blob-2" />
        <div className="hero-blob-3" />

        <div className="container hero-inner">
          {/* Left: Text */}
          <div>
            <div className="hero-badge fade-up">
              <span className="badge-icon">✨</span>
              Now Available on iOS &amp; Android — Free!
            </div>
            <h1 className="fade-up-delay-1">
              Your Health,<br />
              <span className="gradient-text-warm">Supercharged</span><br />
              <span className="gradient-text-blue">by AI 🐼</span>
            </h1>
            <p className="fade-up-delay-2">
              Health Panda is your all-in-one wellness companion. Track vitals,
              plan workouts, monitor nutrition, and unlock personalised AI health
              insights — all in one adorable app.
            </p>
            <div className="hero-actions fade-up-delay-3">
              <button className="btn-primary">📱 Download Free</button>
              <button className="btn-secondary">▶ Watch Demo</button>
            </div>
          </div>

          {/* Right: Panda Visual */}
          <div className="hero-visual">
            {/* Floating chips */}
            <div className="hero-chip chip-1" style={{ color: '#2AABDA' }}>
              <span style={{ color: '#2AABDA', fontSize: '1rem' }}>❤️</span>
              72 bpm
              <span className="chip-dot" style={{ background: '#8CE4FF' }} />
            </div>
            <div className="hero-chip chip-2" style={{ color: '#B89000' }}>
              <span style={{ fontSize: '1rem' }}>🔥</span>
              840 kcal
              <span className="chip-dot" style={{ background: '#FEEE91' }} />
            </div>
            <div className="hero-chip chip-3" style={{ color: '#E08020' }}>
              <span style={{ fontSize: '1rem' }}>💧</span>
              1.8 / 2.5 L
              <span className="chip-dot" style={{ background: '#FFA239' }} />
            </div>
            <div className="hero-chip chip-4" style={{ color: '#CC2020' }}>
              <span style={{ fontSize: '1rem' }}>😴</span>
              8h 12m
              <span className="chip-dot" style={{ background: '#FF5656' }} />
            </div>

            <div className="panda-ring">
              <img
                src="/panda2_img-removebg-preview.png"
                alt="Health Panda mascot — a cute doctor panda"
                className="panda-img"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Marquee trust bar ── */}
      <div className="marquee-section">
        <div className="marquee-track">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <div className="marquee-item" key={i}>
              <span>{item.icon}</span> {item.text}
              <span style={{ opacity: 0.3, margin: '0 8px' }}>•</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Stats ── */}
      <section className="stats-section" id="stats">
        <div className="container">
          <div className="stats-grid">
            {stats.map((s) => (
              <div className={`stat-card ${s.color}`} key={s.label}>
                <div className="stat-icon">{s.icon}</div>
                <div className="stat-number">{s.number}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="features-section" id="features">
        <div className="container">
          <div className="section-header">
            <span className="section-tag blue">✨ Features</span>
            <h2>Everything Your Health<br /><span className="gradient-text-warm">Deserves</span></h2>
            <p>Comprehensive tools designed to support every facet of your wellness journey, powered by advanced AI.</p>
          </div>
          <div className="features-grid">
            {features.map((f) => (
              <div className={`feature-card ${f.color}`} key={f.title}>
                <div className="feature-icon-wrap">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="how-section" id="how">
        <div className="container">
          <div className="section-header">
            <span className="section-tag orange">🚀 How It Works</span>
            <h2>Up &amp; Running in<br /><span className="gradient-text-blue">4 Simple Steps</span></h2>
            <p>Getting started with Health Panda takes less than 5 minutes. No credit card needed.</p>
          </div>
          <div className="how-grid">
            {steps.map((s, i) => (
              <div className="how-card" key={i}>
                <div className={`how-step ${s.cls}`}>{s.emoji}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="cta-section" id="cta">
        <div className="cta-bg-blob-1" />
        <div className="cta-bg-blob-2" />
        <div className="container cta-inner">
          <div className="cta-text">
            <h2>
              Start Your Wellness<br />
              Journey <span style={{ color: '#8CE4FF' }}>Today</span> 🐼
            </h2>
            <p>
              Join over 2 million people who trust Health Panda to help them
              live healthier, happier lives. Core features are free — forever.
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
            <img src="/panda_img.svg" alt="Health Panda mascot" style={{ width: 120, height: 120, objectFit: 'contain' }} />
            <div className="cta-buttons">
              <button className="btn-cta-primary">🍎 Download for iOS</button>
              <button className="btn-cta-secondary">🤖 Download for Android</button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="footer">
        <div className="container">
          <div className="footer-top">
            <div className="footer-brand">
              <div className="brand-logo">
                <img src="/panda_img.svg" alt="Health Panda" style={{ width: 32, height: 32, borderRadius: 8, objectFit: 'contain', background: 'rgba(140,228,255,0.15)' }} />
                Health Panda
              </div>
              <p>Your all-in-one wellness companion — beautiful, smart, and free.</p>
            </div>
            <div className="footer-col">
              <h4>Product</h4>
              <ul>
                <li><a href="#">Features</a></li>
                <li><a href="#">Pricing</a></li>
                <li><a href="#">Integrations</a></li>
                <li><a href="#">Changelog</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Company</h4>
              <ul>
                <li><a href="#">About</a></li>
                <li><a href="#">Blog</a></li>
                <li><a href="#">Careers</a></li>
                <li><a href="#">Contact</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Legal</h4>
              <ul>
                <li><a href="#">Privacy Policy</a></li>
                <li><a href="#">Terms of Service</a></li>
                <li><a href="#">HIPAA Compliance</a></li>
                <li><a href="#">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© 2026 Health Panda. All rights reserved.</p>
            <div className="footer-colors">
              {['#8CE4FF', '#FEEE91', '#FFA239', '#FF5656'].map(c => (
                <div key={c} className="color-dot" style={{ background: c }} title={c} />
              ))}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
