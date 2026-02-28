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
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState('');
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [onboardingStep, setOnboardingStep] = useState(1);
  
  // Onboarding data
  const [onboardingData, setOnboardingData] = useState({
    fullName: '',
    gender: '',
    dobDay: new Date().getDate(),
    dobMonth: 'January',
    dobYear: new Date().getFullYear() - 25,
    dob: '',
    heightFeet: '',
    heightInches: '',
    height: '',
    heightUnit: 'ft',
    weight: '',
    weightUnit: 'kg',
    bodyType: '',
    goal: '',
    targetWeight: '',
    activityLevel: ''
  });

  const [activeTab, setActiveTab] = useState<'home' | 'exercise' | 'food' | 'leaderboard' | 'profile'>('home');
  const [activeExFilter, setActiveExFilter] = useState('All');
  const [selectedExercise, setSelectedExercise] = useState<any>(null);
  const [showExModal, setShowExModal] = useState(false);
  const [leaderTab, setLeaderTab] = useState(0);
  const [showFoodModal, setShowFoodModal] = useState(false);
  const [foodSearch, setFoodSearch] = useState('');
  const [foodLog, setFoodLog] = useState([
    { id: 1, icon: '🌅', name: 'Morning Run', meta: '6.2 km · 32 min', cal: -310, time: '7:30 AM', type: 'workout' },
    { id: 2, icon: '🥣', name: 'Oatmeal + Banana', meta: 'Breakfast · 1 bowl', cal: 380, time: '8:15 AM', type: 'meal' },
    { id: 3, icon: '🥗', name: 'Chicken Salad', meta: 'Lunch · 1 serving', cal: 520, time: '1:10 PM', type: 'meal' },
    { id: 4, icon: '🏋️', name: 'Upper Body Gym', meta: '45 min · 8 sets', cal: -280, time: '5:30 PM', type: 'workout' },
    { id: 5, icon: '🍎', name: 'Apple + Almonds', meta: 'Snack · 1 serving', cal: 210, time: '6:00 PM', type: 'meal' },
  ]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // OAuth email login logic would go here
    console.log('Login with:', email);
    setUserName(email.split('@')[0]);
    setShowLogin(false);
    setShowOnboarding(true);
    setEmail('');
    setPassword('');
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    // OAuth email signup logic would go here
    console.log('Signup with:', { name, email });
    setUserName(name);
    setOnboardingData({ ...onboardingData, fullName: name });
    setShowSignup(false);
    setShowOnboarding(true);
    setName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  const handleOnboardingNext = () => {
    if (onboardingStep < 7) {
      setOnboardingStep(onboardingStep + 1);
    } else {
      setShowOnboarding(false);
      setIsAuthenticated(true);
    }
  };

  const handleOnboardingBack = () => {
    if (onboardingStep > 1) {
      setOnboardingStep(onboardingStep - 1);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserName('');
  };

  const switchToSignup = () => {
    setShowLogin(false);
    setShowSignup(true);
  };

  const switchToLogin = () => {
    setShowSignup(false);
    setShowLogin(true);
  };

  // ── Exercise modal image toggle (Start / End) ─────────────────────────────
  function ExModalImageToggle({ exercise }: { exercise: any }) {
    const [imgIdx, setImgIdx] = useState(0);
    return (
      <div className="ex-modal-img-wrap">
        <img src={exercise.images[imgIdx]} alt={exercise.name} className="ex-modal-img" />
        <div className="ex-modal-img-toggle">
          {['Start', 'End'].map((label, i) => (
            <button
              key={label}
              className={`ex-img-toggle-btn${imgIdx === i ? ' active' : ''}`}
              style={imgIdx === i ? { backgroundColor: exercise.accentColor } : {}}
              onClick={() => setImgIdx(i)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    );
  }

  // If showing onboarding
  if (showOnboarding) {
    return (
      <div className="onboarding-page">
        <div className="onboarding-progress">
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${(onboardingStep / 7) * 100}%` }}></div>
          </div>
          <span className="progress-text">Step {onboardingStep} of 7</span>
        </div>

        <div className="onboarding-container">
          <div className="onboarding-panda">
            <img src="/panda2_img-removebg-preview.png" alt="Health Panda" />
          </div>

          <div className="onboarding-content">
            {/* Step 1: Name & Gender */}
            {onboardingStep === 1 && (
              <div className="onboarding-step">
                <h2>What's your name?</h2>
                <p className="step-subtitle">Tell us a bit about yourself</p>
                <div className="panda-speech">{onboardingData.fullName ? `Great to meet you, ${onboardingData.fullName}!` : "Hi there! I'm Health Panda. What should I call you?"}</div>
                
                <div className="form-group">
                  <label>FULL NAME</label>
                  <input
                    type="text"
                    placeholder="e.g. Alex Johnson"
                    value={onboardingData.fullName}
                    onChange={(e) => setOnboardingData({...onboardingData, fullName: e.target.value})}
                    maxLength={30}
                  />
                </div>

                <div className="form-group">
                  <label>BIOLOGICAL SEX</label>
                  <div className="option-grid">
                    {['Male', 'Female', 'Other'].map((g) => (
                      <button
                        key={g}
                        className={`option-btn ${onboardingData.gender === g ? 'active' : ''}`}
                        onClick={() => setOnboardingData({...onboardingData, gender: g})}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Date of Birth */}
            {onboardingStep === 2 && (
              <div className="onboarding-step">
                <h2>When were you born?</h2>
                <p className="step-subtitle">We'll use this to personalize your plan</p>
                
                {(() => {
                  const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
                  const currentYear = new Date().getFullYear();
                  const YEARS = Array.from({ length: 85 }, (_, i) => currentYear - 13 - i);
                  const DAYS = Array.from({ length: 31 }, (_, i) => i + 1);
                  const monthIdx = MONTHS.indexOf(onboardingData.dobMonth);
                  const age = Math.floor((new Date().getTime() - new Date(onboardingData.dobYear, monthIdx, onboardingData.dobDay).getTime()) / (365.25 * 24 * 3600 * 1000));
                  const valid = age >= 13 && age <= 100;
                  
                  return (
                    <>
                      <div className="panda-speech">
                        {valid ? `${age} years old — perfect, I'll use this to calibrate your plan!` : "Scroll to pick your birthday below."}
                      </div>
                      
                      <div className="dob-picker">
                        <div className="dob-column" style={{ flex: 0.7 }}>
                          <label>DAY</label>
                          <div className="dob-scroll">
                            {DAYS.map((day) => (
                              <button
                                key={day}
                                className={`dob-option ${onboardingData.dobDay === day ? 'active' : ''}`}
                                onClick={() => setOnboardingData({...onboardingData, dobDay: day})}
                              >
                                {String(day).padStart(2, '0')}
                              </button>
                            ))}
                          </div>
                        </div>
                        
                        <div className="dob-column" style={{ flex: 1.6 }}>
                          <label>MONTH</label>
                          <div className="dob-scroll">
                            {MONTHS.map((month) => (
                              <button
                                key={month}
                                className={`dob-option ${onboardingData.dobMonth === month ? 'active' : ''}`}
                                onClick={() => setOnboardingData({...onboardingData, dobMonth: month})}
                              >
                                {month}
                              </button>
                            ))}
                          </div>
                        </div>
                        
                        <div className="dob-column" style={{ flex: 1 }}>
                          <label>YEAR</label>
                          <div className="dob-scroll">
                            {YEARS.map((year) => (
                              <button
                                key={year}
                                className={`dob-option ${onboardingData.dobYear === year ? 'active' : ''}`}
                                onClick={() => setOnboardingData({...onboardingData, dobYear: year})}
                              >
                                {year}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      {valid && (
                        <div className="age-badge">
                          <span>{age} years old</span>
                        </div>
                      )}
                    </>
                  );
                })()}
              </div>
            )}

            {/* Step 3: Height */}
            {onboardingStep === 3 && (
              <div className="onboarding-step">
                <h2>How tall are you?</h2>
                <p className="step-subtitle">Used for BMI & calorie calculations</p>
                
                {(() => {
                  const ft = parseInt(onboardingData.heightFeet, 10) || 0;
                  const inc = parseInt(onboardingData.heightInches, 10) || 0;
                  const totalInches = ft * 12 + inc;
                  const valid = totalInches >= 36 && totalInches <= 86 && onboardingData.heightFeet !== '';
                  const heightLabel = valid ? `${ft}' ${inc}"` : '—';
                  const cmLabel = valid ? `${Math.round(totalInches * 2.54)} cm` : '';
                  const percent = valid ? Math.min(Math.max((totalInches - 36) / 50, 0), 1) * 100 : 0;
                  
                  return (
                    <>
                      <div className="panda-speech">
                        {valid ? `${heightLabel} (${cmLabel}) — got it!` : "Enter your height in feet and inches."}
                      </div>
                      
                      <div className="height-meter-container">
                        <div className="height-ruler">
                          <div className="ruler-track">
                            <div className="ruler-fill" style={{ height: `${percent}%` }}></div>
                            {[3, 4, 5, 6, 7].map((feetMark) => {
                              const pos = ((feetMark - 3) / 4) * 100;
                              return (
                                <div key={feetMark} className="ruler-tick" style={{ bottom: `${pos}%` }}>
                                  <div className="tick-line"></div>
                                  <span className="tick-label">{feetMark}'</span>
                                </div>
                              );
                            })}
                            {percent > 0 && (
                              <div className="ruler-indicator" style={{ bottom: `${percent}%` }}>
                                <div className="indicator-dot"></div>
                              </div>
                            )}
                          </div>
                          <span className="ruler-label">Height</span>
                        </div>
                        
                        <div className="height-input-area">
                          <div className="height-inputs">
                            <div className="height-input-group">
                              <input
                                type="number"
                                placeholder="5"
                                value={onboardingData.heightFeet}
                                onChange={(e) => setOnboardingData({...onboardingData, heightFeet: e.target.value})}
                                min="3"
                                max="7"
                                className="height-input"
                              />
                              <span className="height-unit">ft</span>
                            </div>
                            <span className="height-separator">'</span>
                            <div className="height-input-group">
                              <input
                                type="number"
                                placeholder="10"
                                value={onboardingData.heightInches}
                                onChange={(e) => setOnboardingData({...onboardingData, heightInches: e.target.value})}
                                min="0"
                                max="11"
                                className="height-input"
                              />
                              <span className="height-unit">"</span>
                            </div>
                          </div>
                          
                          {valid && (
                            <div className="height-display">
                              <div className="height-value">{heightLabel}</div>
                              <div className="height-converted">≈ {cmLabel}</div>
                            </div>
                          )}
                        </div>
                      </div>
                    </>
                  );
                })()}
              </div>
            )}

            {/* Step 4: Weight */}
            {onboardingStep === 4 && (
              <div className="onboarding-step">
                <h2>What's your current weight?</h2>
                <p className="step-subtitle">We'll track your progress from here</p>
                
                {(() => {
                  const num = parseFloat(onboardingData.weight);
                  const unit = onboardingData.weightUnit;
                  const valid = unit === 'kg' ? (num >= 30 && num <= 250) : (num >= 66 && num <= 550);
                  const kgValue = unit === 'kg' ? num : num * 0.4536;
                  const lbValue = unit === 'lb' ? num : num * 2.2046;
                  const altUnit = unit === 'kg'
                    ? (valid ? `${Math.round(lbValue * 10) / 10} lb` : '')
                    : (valid ? `${Math.round(kgValue * 10) / 10} kg` : '');
                  
                  return (
                    <>
                      <div className="panda-speech">
                        {valid ? `${onboardingData.weight} ${unit}${altUnit ? ` · ${altUnit}` : ''} — logged!` : "Enter your current weight."}
                      </div>
                      
                      {/* Unit toggle */}
                      <div className="weight-unit-toggle">
                        {['kg', 'lb'].map((u) => (
                          <button
                            key={u}
                            className={`weight-unit-btn ${unit === u ? 'active' : ''}`}
                            onClick={() => { setOnboardingData({...onboardingData, weightUnit: u as 'kg' | 'lb', weight: ''}); }}
                          >
                            {u}
                          </button>
                        ))}
                      </div>
                      
                      {/* Weight input display */}
                      <div className="weight-display-box">
                        <input
                          type="number"
                          className="weight-input-large"
                          value={onboardingData.weight}
                          onChange={(e) => setOnboardingData({...onboardingData, weight: e.target.value})}
                          placeholder={unit === 'kg' ? '70' : '154'}
                          step="0.1"
                        />
                        <span className="weight-unit-text">{unit}</span>
                      </div>
                      
                      {/* Converted value */}
                      {valid && (
                        <div className="weight-converted">≈ {altUnit}</div>
                      )}
                      
                      {/* Weight category bar */}
                      <div className="weight-category-bar">
                        {[
                          { label: 'Light', color: '#93C5FD', end: unit === 'kg' ? 50 : 110 },
                          { label: 'Normal', color: '#6EE7B7', end: unit === 'kg' ? 80 : 176 },
                          { label: 'Heavy', color: '#FFA239', end: unit === 'kg' ? 110 : 242 },
                          { label: 'Very Heavy', color: '#FF5656', end: Infinity },
                        ].map((cat, idx, arr) => {
                          const prev = idx === 0 ? 0 : arr[idx - 1].end;
                          const inRange = valid && num > prev && num <= cat.end;
                          return (
                            <div
                              key={cat.label}
                              className="category-segment"
                              style={{
                                backgroundColor: inRange ? cat.color : cat.color + '50',
                                flex: 1
                              }}
                            >
                              <span className={`category-label ${inRange ? 'active' : ''}`}>{cat.label}</span>
                            </div>
                          );
                        })}
                      </div>
                    </>
                  );
                })()}
              </div>
            )}

            {/* Step 5: Body Type */}
            {onboardingStep === 5 && (
              <div className="onboarding-step">
                <h2>Body type</h2>
                <p className="step-subtitle">Choose what best describes you</p>
                <div className="panda-speech">This helps us personalize your fitness plan</div>
                
                <div className="form-group">
                  <div className="body-type-grid">
                    {[
                      { key: '1', label: 'Shredded', sub: 'Very lean & defined', bodyfat: '6–10%', color: '#3B82F6', image: '/1.jpeg' },
                      { key: '2', label: 'Fit', sub: 'Lean & athletic', bodyfat: '10–15%', color: '#10B981', image: '/2.jpeg' },
                      { key: '3', label: 'Average', sub: 'Healthy weight', bodyfat: '15–22%', color: '#FBBF24', image: '/3.jpeg' },
                      { key: '4', label: 'Overweight', sub: 'Higher body fat', bodyfat: '22–30%', color: '#FFA239', image: '/4.jpeg' },
                      { key: '5', label: 'Obese', sub: 'High body fat', bodyfat: '30%+', color: '#FF5656', image: '/5.jpeg' }
                    ].map((type) => (
                      <button
                        key={type.key}
                        className={`body-type-card ${onboardingData.bodyType === type.key ? 'active' : ''}`}
                        onClick={() => setOnboardingData({...onboardingData, bodyType: type.key})}
                        style={onboardingData.bodyType === type.key ? { borderColor: type.color } : {}}
                      >
                        <div className="body-type-image">
                          <img src={type.image} alt={type.label} />
                        </div>
                        <div className="body-type-info">
                          <span className="body-type-label">{type.label}</span>
                          <span className="body-type-sub">{type.sub}</span>
                          <span className="body-type-bf" style={{ color: type.color }}>{type.bodyfat} BF</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 6: Goal */}
            {onboardingStep === 6 && (
              <div className="onboarding-step">
                <h2>Your goal</h2>
                <p className="step-subtitle">What are you working towards?</p>
                
                {(() => {
                  const GOALS = [
                    { key: 'lose', label: 'Lose Weight', color: '#FF5656', desc: 'Calorie deficit plan' },
                    { key: 'maintain', label: 'Maintain Weight', color: '#3B82F6', desc: 'Maintenance calories' },
                    { key: 'gain', label: 'Build Muscle', color: '#FFA239', desc: 'Calorie surplus + strength' },
                    { key: 'health', label: 'Improve Health', color: '#10B981', desc: 'Energy, sleep & wellness' },
                    { key: 'sport', label: 'Athletic Performance', color: '#8B5CF6', desc: 'Fuel & recovery focused' },
                  ];
                  
                  const activeGoal = GOALS.find((g) => g.key === onboardingData.goal);
                  const showTarget = onboardingData.goal === 'lose' || onboardingData.goal === 'gain';
                  
                  return (
                    <>
                      <div className="panda-speech">
                        {activeGoal ? `${activeGoal.label} — great choice. Let's make it happen.` : 'What are you working towards?'}
                      </div>
                      
                      <div className="goal-cards">
                        {GOALS.map((goal) => {
                          const active = onboardingData.goal === goal.key;
                          return (
                            <button
                              key={goal.key}
                              className={`goal-card ${active ? 'active' : ''}`}
                              onClick={() => {
                                setOnboardingData({...onboardingData, goal: goal.key, targetWeight: ''});
                              }}
                              style={active ? { 
                                borderColor: goal.color, 
                                backgroundColor: goal.color + '08' 
                              } : {}}
                            >
                              <div 
                                className="goal-color-bar" 
                                style={{ 
                                  backgroundColor: active ? goal.color : '#E8E8E8',
                                  width: active ? '4px' : '3px'
                                }}
                              ></div>
                              <div className="goal-content">
                                <span className="goal-label" style={active ? { color: goal.color } : {}}>
                                  {goal.label}
                                </span>
                                <span className="goal-desc">{goal.desc}</span>
                              </div>
                              <div 
                                className="goal-radio" 
                                style={active ? { 
                                  backgroundColor: goal.color, 
                                  borderColor: goal.color 
                                } : {}}
                              >
                                {active && <div className="goal-radio-dot"></div>}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                      
                      {/* Target weight (only for lose/gain) */}
                      {showTarget && (
                        <div className="target-weight-section">
                          <div className="target-header">
                            <h3 className="target-title">Target weight</h3>
                            <p className="target-subtitle">What weight are you aiming for?</p>
                          </div>
                          
                          <div className="target-input-row">
                            <input
                              type="number"
                              className="target-weight-input"
                              value={onboardingData.targetWeight}
                              onChange={(e) => setOnboardingData({...onboardingData, targetWeight: e.target.value})}
                              placeholder={onboardingData.weightUnit === 'kg' ? '65' : '143'}
                              step="0.1"
                              style={onboardingData.targetWeight ? { borderColor: activeGoal?.color } : {}}
                            />
                            <div className="target-unit-toggle">
                              {['kg', 'lb'].map((u) => (
                                <button
                                  key={u}
                                  className={`target-unit-btn ${onboardingData.weightUnit === u ? 'active' : ''}`}
                                  onClick={() => setOnboardingData({...onboardingData, weightUnit: u as 'kg' | 'lb'})}
                                  style={onboardingData.weightUnit === u ? { backgroundColor: activeGoal?.color || '#FFA239' } : {}}
                                >
                                  {u}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </>
                  );
                })()}
              </div>
            )}

            {/* Step 7: Activity Level */}
            {onboardingStep === 7 && (
              <div className="onboarding-step">
                <h2>Activity level</h2>
                <p className="step-subtitle">How active are you on a typical week?</p>
                
                {(() => {
                  const LEVELS = [
                    { key: 'sedentary', label: 'Sedentary', desc: 'Desk job, little or no exercise', pct: 0.20, color: '#93C5FD' },
                    { key: 'light', label: 'Lightly Active', desc: 'Light exercise 1–3 days / week', pct: 0.40, color: '#6EE7B7' },
                    { key: 'moderate', label: 'Moderately Active', desc: 'Moderate exercise 3–5 days / week', pct: 0.60, color: '#FBBF24' },
                    { key: 'active', label: 'Very Active', desc: 'Hard training 6–7 days / week', pct: 0.80, color: '#FFA239' },
                    { key: 'athlete', label: 'Athlete', desc: 'Twice-daily training or physical job', pct: 1.00, color: '#FF5656' },
                  ];
                  
                  const activeLevel = LEVELS.find((l) => l.key === onboardingData.activityLevel);
                  
                  return (
                    <>
                      <div className="panda-speech">
                        {activeLevel ? `${activeLevel.label} — I'll factor this into your daily targets.` : 'How active are you on a typical week?'}
                      </div>
                      
                      <div className="activity-cards">
                        {LEVELS.map((level) => {
                          const active = onboardingData.activityLevel === level.key;
                          return (
                            <button
                              key={level.key}
                              className={`activity-card ${active ? 'active' : ''}`}
                              onClick={() => setOnboardingData({...onboardingData, activityLevel: level.key})}
                              style={active ? { 
                                borderColor: level.color, 
                                backgroundColor: level.color + '0A' 
                              } : {}}
                            >
                              {/* Activity bar */}
                              <div className="activity-bar-track">
                                <div 
                                  className="activity-bar-fill" 
                                  style={{ 
                                    height: `${level.pct * 100}%`,
                                    backgroundColor: level.color + (active ? 'FF' : '80')
                                  }}
                                ></div>
                              </div>
                              
                              <div className="activity-content">
                                <span className="activity-label" style={active ? { color: level.color } : {}}>
                                  {level.label}
                                </span>
                                <span className="activity-desc">{level.desc}</span>
                              </div>
                              
                              <div 
                                className="activity-radio" 
                                style={active ? { 
                                  backgroundColor: level.color, 
                                  borderColor: level.color 
                                } : {}}
                              >
                                {active && <div className="activity-radio-dot"></div>}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </>
                  );
                })()}
              </div>
            )}

            <div className="onboarding-actions">
              {onboardingStep > 1 && (
                <button className="btn-back" onClick={handleOnboardingBack}>← Back</button>
              )}
              <button 
                className="btn-continue" 
                onClick={handleOnboardingNext}
                disabled={!isStepValid()}
              >
                {onboardingStep === 7 ? 'Complete Setup' : 'Continue →'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Validation function for current step
  function isStepValid() {
    switch(onboardingStep) {
      case 1: return onboardingData.fullName.trim().length >= 2 && onboardingData.gender !== '';
      case 2: {
        const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        const monthIdx = MONTHS.indexOf(onboardingData.dobMonth);
        const age = Math.floor((new Date().getTime() - new Date(onboardingData.dobYear, monthIdx, onboardingData.dobDay).getTime()) / (365.25 * 24 * 3600 * 1000));
        return age >= 13 && age <= 100;
      }
      case 3: {
        const ft = parseInt(onboardingData.heightFeet, 10) || 0;
        const inc = parseInt(onboardingData.heightInches, 10) || 0;
        const totalInches = ft * 12 + inc;
        return totalInches >= 36 && totalInches <= 86 && onboardingData.heightFeet !== '';
      }
      case 4: {
        const num = parseFloat(onboardingData.weight);
        return onboardingData.weightUnit === 'kg' ? (num >= 30 && num <= 250) : (num >= 66 && num <= 550);
      }
      case 5: return onboardingData.bodyType !== '';
      case 6: {
        const showTarget = onboardingData.goal === 'lose' || onboardingData.goal === 'gain';
        if (!onboardingData.goal) return false;
        if (!showTarget) return true;
        const tNum = parseFloat(onboardingData.targetWeight);
        return tNum > 20 && tNum < 300;
      }
      case 7: return onboardingData.activityLevel !== '';
      default: return false;
    }
  }

  // If authenticated, show multi-tab app
  if (isAuthenticated) {
    const hour = new Date().getHours();
    const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';
    const displayName = onboardingData.fullName || userName;

    const EXERCISES = [
      { id: '1', name: 'Push-up', emoji: '💪', images: ['/exercises/Push-Ups_With_Feet_Elevated/0.jpg', '/exercises/Push-Ups_With_Feet_Elevated/1.jpg'], muscles: ['Chest'], secMuscles: ['Shoulders', 'Triceps'], level: 'beginner', calories: 45, sets: 3, reps: '12-15', category: 'Push', equipment: 'Bodyweight', accentColor: '#FF6B4A', instructions: ['Start in a plank position with hands slightly wider than shoulders.', 'Lower your chest until it nearly touches the floor.', 'Push back up to the starting position.', 'Keep your core engaged throughout.'] },
      { id: '2', name: 'Pull-up', emoji: '🦇', images: ['/exercises/Inverted_Row/0.jpg', '/exercises/Inverted_Row/1.jpg'], muscles: ['Lats'], secMuscles: ['Biceps', 'Shoulders'], level: 'intermediate', calories: 60, sets: 3, reps: '8-10', category: 'Pull', equipment: 'Pull-up Bar', accentColor: '#3B82F6', instructions: ['Grip the bar with palms facing away.', 'Pull yourself up until your chin is over the bar.', 'Lower yourself back down with control.', 'Avoid swinging your legs.'] },
      { id: '3', name: 'Squat', emoji: '🦵', images: ['/exercises/Bodyweight_Squat/0.jpg', '/exercises/Bodyweight_Squat/1.jpg'], muscles: ['Quads'], secMuscles: ['Glutes', 'Hamstrings'], level: 'beginner', calories: 50, sets: 4, reps: '15-20', category: 'Legs', equipment: 'Bodyweight', accentColor: '#10B981', instructions: ['Stand with feet shoulder-width apart.', 'Lower your hips as if sitting in a chair.', 'Keep your chest up and weight on your heels.', 'Return to standing position.'] },
      { id: '4', name: 'Dips', emoji: '🏗️', images: ['/exercises/Bench_Dips/0.jpg', '/exercises/Bench_Dips/1.jpg'], muscles: ['Triceps'], secMuscles: ['Chest', 'Shoulders'], level: 'intermediate', calories: 55, sets: 3, reps: '10-12', category: 'Push', equipment: 'Dip Bars', accentColor: '#F59E0B', instructions: ['Support yourself on dip bars with arms straight.', 'Lower your body by bending your elbows until they reach 90 degrees.', 'Push back up to the start.', 'Keep your torso upright.'] },
      { id: '5', name: 'Plank', emoji: '🧱', images: ['/exercises/Plank/0.jpg', '/exercises/Plank/1.jpg'], muscles: ['Abs'], secMuscles: ['Shoulders', 'Lower Back'], level: 'beginner', calories: 30, sets: 3, reps: '60s', category: 'Core', equipment: 'Bodyweight', accentColor: '#8B5CF6', instructions: ['Rest on your forearms and toes.', 'Keep your body in a straight line from head to heels.', 'Hold the position and breathe deeply.', 'Squeeze your core and glutes.'] },
      { id: '6', name: 'Triceps Dips', emoji: '🚀', images: ['/exercises/Dips_-_Triceps_Version/0.jpg', '/exercises/Dips_-_Triceps_Version/1.jpg'], muscles: ['Lats', 'Triceps'], secMuscles: ['Biceps', 'Chest'], level: 'advanced', calories: 120, sets: 3, reps: '3-5', category: 'Pull', equipment: 'Pull-up Bar', accentColor: '#EF4444', instructions: ['Support your weight on the dip bars with arms fully extended.', 'Lower your body by bending the elbows.', 'Keep elbows pointing back, not out.', 'Press back up to the starting position.'] },
      { id: '7', name: 'Crunches', emoji: '📐', images: ['/exercises/Crunches/0.jpg', '/exercises/Crunches/1.jpg'], muscles: ['Abs'], secMuscles: ['Triceps', 'Hip Flexors'], level: 'beginner', calories: 30, sets: 3, reps: '20', category: 'Core', equipment: 'Bodyweight', accentColor: '#06B6D4', instructions: ['Lie on your back with knees bent.', 'Place hands behind your head lightly.', 'Curl your shoulders toward your knees.', 'Lower back down with control.'] },
      { id: '8', name: 'Handstand Push-up', emoji: '🤸', images: ['/exercises/Handstand_Push-Ups/0.jpg', '/exercises/Handstand_Push-Ups/1.jpg'], muscles: ['Shoulders'], secMuscles: ['Triceps', 'Upper Traps'], level: 'advanced', calories: 90, sets: 3, reps: '5-8', category: 'Push', equipment: 'Wall', accentColor: '#EC4899', instructions: ['Kick up into a handstand against a wall.', 'Lower your head towards the floor by bending elbows.', 'Push back up until arms are fully extended.', 'Maintain a tight body position throughout.'] },
      { id: '9', name: 'Walking Lunge', emoji: '🚶', images: ['/exercises/Bodyweight_Walking_Lunge/0.jpg', '/exercises/Bodyweight_Walking_Lunge/1.jpg'], muscles: ['Quads', 'Glutes'], secMuscles: ['Hamstrings', 'Calves'], level: 'beginner', calories: 48, sets: 3, reps: '12 each', category: 'Legs', equipment: 'Bodyweight', accentColor: '#14B8A6', instructions: ['Stand upright with feet together.', 'Step forward with one foot into a lunge.', 'Lower your back knee toward the floor.', 'Drive forward and repeat on the other leg.'] },
      { id: '10', name: 'Cross-Body Crunch', emoji: '💎', images: ['/exercises/Cross-Body_Crunch/0.jpg', '/exercises/Cross-Body_Crunch/1.jpg'], muscles: ['Abs'], secMuscles: ['Obliques', 'Hip Flexors'], level: 'beginner', calories: 35, sets: 3, reps: '15 each', category: 'Core', equipment: 'Bodyweight', accentColor: '#7C3AED', instructions: ['Lie on your back with knees bent.', 'Bring one elbow toward the opposite knee.', 'Alternate sides in a controlled motion.', 'Keep lower back pressed to the floor.'] },
      { id: '11', name: 'Chin-up', emoji: '🙌', images: ['/exercises/Chin-Up/0.jpg', '/exercises/Chin-Up/1.jpg'], muscles: ['Biceps'], secMuscles: ['Lats', 'Forearms'], level: 'intermediate', calories: 58, sets: 3, reps: '8-10', category: 'Pull', equipment: 'Pull-up Bar', accentColor: '#0EA5E9', instructions: ['Grip the bar with palms facing you.', 'Pull yourself up until your chin clears the bar.', 'Lower down slowly.', 'Full extension at the bottom.'] },
      { id: '12', name: 'Flutter Kicks', emoji: '🦅', images: ['/exercises/Flutter_Kicks/0.jpg', '/exercises/Flutter_Kicks/1.jpg'], muscles: ['Abs'], secMuscles: ['Hip Flexors', 'Quads'], level: 'beginner', calories: 35, sets: 3, reps: '30s', category: 'Core', equipment: 'Bodyweight', accentColor: '#F97316', instructions: ['Lie flat on your back with legs straight.', 'Lift legs a few inches off the ground.', 'Alternate kicking up and down in a small range.', 'Keep your core braced throughout.'] },
      { id: '13', name: 'Mountain Climber', emoji: '⛰️', images: ['/exercises/Mountain_Climbers/0.jpg', '/exercises/Mountain_Climbers/1.jpg'], muscles: ['Abs'], secMuscles: ['Shoulders', 'Quads'], level: 'beginner', calories: 42, sets: 3, reps: '30s', category: 'Core', equipment: 'Bodyweight', accentColor: '#22C55E', instructions: ['Start in a high plank position.', 'Drive one knee toward your chest.', 'Quickly alternate legs.', 'Maintain a flat back throughout.'] },
      { id: '14', name: 'Wide Push-up', emoji: '🏊', images: ['/exercises/Push-Up_Wide/0.jpg', '/exercises/Push-Up_Wide/1.jpg'], muscles: ['Chest'], secMuscles: ['Shoulders', 'Triceps'], level: 'beginner', calories: 44, sets: 3, reps: '12-15', category: 'Push', equipment: 'Bodyweight', accentColor: '#F43F5E', instructions: ['Place hands wider than shoulder-width.', 'Lower your chest between your hands.', 'Push back up.', 'Focus on squeezing the chest at the top.'] },
      { id: '15', name: 'Superman', emoji: '🦸', images: ['/exercises/Superman/0.jpg', '/exercises/Superman/1.jpg'], muscles: ['Lower Back'], secMuscles: ['Glutes', 'Hamstrings'], level: 'beginner', calories: 28, sets: 3, reps: '15', category: 'Core', equipment: 'Bodyweight', accentColor: '#D97706', instructions: ['Lie face down with arms extended overhead.', 'Lift your arms, chest, and legs off the floor simultaneously.', 'Hold for 2-3 seconds.', 'Lower back down with control.'] },
    ];

    const FILTER_MAP: Record<string, string[]> = {
      'All': [], 'Push': ['Chest', 'Shoulders', 'Triceps'],
      'Pull': ['Lats', 'Biceps', 'Forearms'],
      'Legs': ['Quads', 'Hamstrings', 'Glutes', 'Calves'],
      'Core': ['Abs', 'Lower Back'],
    };
    const filteredExercises = activeExFilter === 'All'
      ? EXERCISES
      : EXERCISES.filter((ex) => FILTER_MAP[activeExFilter].some((m) => ex.muscles.includes(m) || ex.secMuscles.includes(m)));

    const LEADERS = [
      { rank: 1, name: 'Sarah K.', steps: 14220, cal: 2840, workouts: 6, avatar: '👩', badge: '🥇', you: false },
      { rank: 2, name: 'Mike R.', steps: 12800, cal: 2610, workouts: 5, avatar: '👨', badge: '🥈', you: false },
      { rank: 3, name: 'You', steps: 10640, cal: 2100, workouts: 4, avatar: '🐼', badge: '🥉', you: true },
      { rank: 4, name: 'Priya S.', steps: 9800, cal: 1980, workouts: 4, avatar: '👩', badge: '', you: false },
      { rank: 5, name: 'James L.', steps: 9200, cal: 1870, workouts: 3, avatar: '👨', badge: '', you: false },
      { rank: 6, name: 'Emma T.', steps: 8600, cal: 1760, workouts: 3, avatar: '👩', badge: '', you: false },
      { rank: 7, name: 'Carlos M.', steps: 7900, cal: 1680, workouts: 2, avatar: '👨', badge: '', you: false },
      { rank: 8, name: 'Nina P.', steps: 7100, cal: 1520, workouts: 2, avatar: '👩', badge: '', you: false },
    ];
    const CHALLENGES = [
      { title: '10K Steps Daily', progress: 0.75, goal: '7-day challenge', daysLeft: 2, color: '#3B82F6' },
      { title: '500 kcal Burn', progress: 0.84, goal: 'Today only', daysLeft: 0, color: '#FF5656' },
      { title: 'Hydration Heroes', progress: 0.60, goal: 'Weekly challenge', daysLeft: 4, color: '#FFA239' },
    ];
    const getLeaderVal = (p: typeof LEADERS[0]) => leaderTab === 0 ? `${(p.steps / 1000).toFixed(1)}k` : leaderTab === 1 ? `${p.cal}` : `${p.workouts}`;
    const getLeaderUnit = () => leaderTab === 0 ? 'steps' : leaderTab === 1 ? 'kcal' : 'workouts';
    const getLeaderRaw = (p: typeof LEADERS[0]) => leaderTab === 0 ? p.steps : leaderTab === 1 ? p.cal : p.workouts;
    const maxLeader = Math.max(...LEADERS.map(getLeaderRaw));

    const totalCalIn = foodLog.filter(f => f.cal > 0).reduce((s, f) => s + f.cal, 0);
    const totalCalOut = Math.abs(foodLog.filter(f => f.cal < 0).reduce((s, f) => s + f.cal, 0));
    const netCal = totalCalIn - totalCalOut;

    const WEEK_DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const WEEK_DONE = [true, true, false, true, false, false, false];
    const todayIdx = new Date().getDay() === 0 ? 6 : new Date().getDay() - 1;

    return (
      <div className="app-shell">
        {/* Top nav */}
        <nav className="dashboard-nav">
          <div className="container nav-inner">
            <div className="nav-logo">
              <img src="/panda1_img.svg" alt="Health Panda Logo" style={{ width: 32, height: 32, objectFit: 'contain' }} />
              Health Panda
            </div>
            <button className="btn-logout" onClick={handleLogout}>Logout</button>
          </div>
        </nav>

        {/* Tab content */}
        <div className="tab-content">

          {/* ══════════ HOME TAB ══════════ */}
          {activeTab === 'home' && (
            <div className="tab-page">
              <div className="dashboard-header-new">
                <div className="header-text">
                  <h1 className="greeting-text">{greeting} 👋</h1>
                  <p className="user-name">{displayName}</p>
                </div>
                <div className="header-avatar">
                  <img src="/panda2_img-removebg-preview.png" alt="Avatar" />
                </div>
              </div>

              {/* Wellness Score Card */}
              <div className="wellness-score-card">
                <div className="wellness-header">
                  <div className="wellness-left">
                    <span className="wellness-eyebrow">WELLNESS SCORE</span>
                    <div className="wellness-score-value">7.4<span className="score-max">/10</span></div>
                    <div className="wellness-badge"><span className="trend-icon">↗</span><span className="trend-text">+13% this week</span></div>
                  </div>
                  <div className="wellness-right">
                    <img src="/panda2_img-removebg-preview.png" alt="Panda" className="wellness-panda" />
                    <span className="wellness-status">Looking great!</span>
                  </div>
                </div>
                <div className="calorie-progress">
                  <div className="calorie-row">
                    <span className="calorie-label">Calories</span>
                    <span className="calorie-value"><strong>1,820</strong> / 2,100 kcal</span>
                  </div>
                  <div className="calorie-track"><div className="calorie-fill" style={{ width: '87%' }}></div></div>
                  <span className="calorie-deficit">280 kcal remaining · Deficit −150 kcal today</span>
                </div>
              </div>

              {/* 4 Stat Bubbles */}
              <div className="stats-bubbles">
                <div className="stat-bubble">
                  <div className="bubble-icon" style={{ backgroundColor: '#FFF0EC' }}><span style={{ fontSize: '22px' }}>🔥</span></div>
                  <div className="bubble-value">1,820</div><div className="bubble-label">Calories</div><div className="bubble-sub">kcal eaten</div>
                </div>
                <div className="stat-divider"></div>
                <div className="stat-bubble">
                  <div className="bubble-icon" style={{ backgroundColor: '#EFF6FF' }}><span style={{ fontSize: '22px' }}>👟</span></div>
                  <div className="bubble-value">6,430</div><div className="bubble-label">Steps</div><div className="bubble-sub">/ 10,000</div>
                </div>
                <div className="stat-divider"></div>
                <div className="stat-bubble">
                  <div className="bubble-icon" style={{ backgroundColor: '#FFF7ED' }}><span style={{ fontSize: '22px' }}>💪</span></div>
                  <div className="bubble-value">45</div><div className="bubble-label">Workout</div><div className="bubble-sub">min today</div>
                </div>
                <div className="stat-divider"></div>
                <div className="stat-bubble">
                  <div className="bubble-icon" style={{ backgroundColor: '#ECFEFF' }}><span style={{ fontSize: '22px' }}>💧</span></div>
                  <div className="bubble-value">1.5</div><div className="bubble-label">Water</div><div className="bubble-sub">L today</div>
                </div>
              </div>

              {/* Live Vitals */}
              <div className="vitals-section">
                <div className="section-header">
                  <h2 className="section-title">⌚ Live Vitals</h2>
                  <p className="section-subtitle">Simulated from your Panda Watch</p>
                </div>
                <div className="watch-banner">
                  <div className="watch-info">
                    <span className="watch-icon">⌚</span>
                    <div className="watch-details">
                      <div className="watch-name">Panda Watch · Series 3</div>
                      <div className="watch-status">Synced just now · 84% battery</div>
                    </div>
                  </div>
                  <div className="watch-live"><div className="live-dot"></div><span className="live-text">Live</span></div>
                </div>
                <div className="vitals-grid">
                  <div className="vital-card vital-large">
                    <div className="vital-header">
                      <div className="vital-icon" style={{ backgroundColor: '#FEE2E2' }}><span style={{ color: '#EF4444', fontSize: '16px' }}>❤️</span></div>
                      <span className="vital-label">HEART RATE</span>
                    </div>
                    <div className="vital-value-row">
                      <div className="pulse-indicator"><div className="pulse-ring"></div><span className="pulse-heart">♥</span></div>
                      <div className="vital-value">72 <span className="vital-unit">BPM</span></div>
                    </div>
                    <div className="heart-line">
                      {[4,4,6,10,30,8,4,20,4,6,4,4,4,8,14,6,4,4].map((h, i) => (
                        <div key={i} className="line-bar" style={{ height: `${h}px` }}></div>
                      ))}
                    </div>
                  </div>
                  <div className="vital-card">
                    <div className="vital-header">
                      <div className="vital-icon" style={{ backgroundColor: '#EFF6FF' }}><span style={{ color: '#3B82F6', fontSize: '15px' }}>📊</span></div>
                      <span className="vital-label">SPO₂</span>
                    </div>
                    <div className="vital-value">97.0 <span className="vital-unit">%</span></div>
                    <div className="status-badge" style={{ backgroundColor: '#D1FAE5', color: '#10B981' }}>Normal</div>
                  </div>
                  <div className="vital-card">
                    <div className="vital-header">
                      <div className="vital-icon" style={{ backgroundColor: '#F0FDF4' }}><span style={{ color: '#10B981', fontSize: '15px' }}>🌿</span></div>
                      <span className="vital-label">RESP</span>
                    </div>
                    <div className="vital-value">16 <span className="vital-unit">/min</span></div>
                  </div>
                  <div className="vital-card">
                    <div className="vital-header">
                      <div className="vital-icon" style={{ backgroundColor: '#EDE9FE' }}><span style={{ color: '#8B5CF6', fontSize: '15px' }}>📈</span></div>
                      <span className="vital-label">HRV</span>
                    </div>
                    <div className="vital-value">42 <span className="vital-unit">ms</span></div>
                    <div className="vital-sub">Heart Rate Variability</div>
                  </div>
                  <div className="vital-card">
                    <div className="vital-header">
                      <div className="vital-icon" style={{ backgroundColor: '#FEF3C7' }}><span style={{ color: '#F59E0B', fontSize: '15px' }}>🌡️</span></div>
                      <span className="vital-label">TEMP</span>
                    </div>
                    <div className="vital-value">36.4 <span className="vital-unit">°C</span></div>
                    <div className="vital-sub">Normal range</div>
                  </div>
                </div>
                <div className="stress-card">
                  <div className="stress-header">
                    <span className="stress-label">STRESS INDEX</span>
                    <div className="status-badge" style={{ backgroundColor: '#D1FAE5', color: '#10B981' }}>Low</div>
                  </div>
                  <div className="stress-bar-track"><div className="stress-bar-fill" style={{ width: '28%', backgroundColor: '#10B981' }}></div></div>
                  <span className="stress-value">28/100</span>
                </div>
              </div>

              {/* Daily Progress Arc Gauges */}
              <div className="card-white">
                <div className="card-header">
                  <h3 className="card-title">Daily Progress</h3>
                </div>
                <div className="arc-gauges-row">
                  {[
                    { label: 'Calories', pct: 87, color: '#FFA239' },
                    { label: 'Steps', pct: 64, color: '#3B82F6' },
                    { label: 'Protein', pct: 78, color: '#10B981' },
                    { label: 'Water', pct: 50, color: '#8B5CF6' },
                  ].map((g) => {
                    const circumference = Math.PI * 30;
                    const dashLen = (g.pct / 100) * circumference;
                    return (
                      <div key={g.label} className="arc-gauge">
                        <div className="arc-gauge-wrap">
                          <svg viewBox="0 0 80 44" className="arc-svg">
                            <path d="M8,40 A32,32 0 0,1 72,40" fill="none" stroke="#F0F0F0" strokeWidth="8" strokeLinecap="round"/>
                            <path d="M8,40 A32,32 0 0,1 72,40" fill="none" stroke={g.color} strokeWidth="8" strokeLinecap="round"
                              strokeDasharray={`${dashLen} ${circumference}`} />
                          </svg>
                          <div className="arc-center-val" style={{ color: g.color }}>{g.pct}%</div>
                        </div>
                        <span className="arc-label">{g.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Macros */}
              <div className="card-white">
                <div className="card-header">
                  <h3 className="card-title">Macros</h3>
                  <button className="card-action" onClick={() => setActiveTab('food')}>See details</button>
                </div>
                {[
                  { label: 'Protein', val: 117, goal: 150, color: '#3B82F6', unit: 'g' },
                  { label: 'Carbs', val: 210, goal: 260, color: '#FFA239', unit: 'g' },
                  { label: 'Fat', val: 52, goal: 70, color: '#FF5656', unit: 'g' },
                ].map((m) => (
                  <div key={m.label} className="macro-row">
                    <span className="macro-label">{m.label}</span>
                    <div className="macro-track"><div className="macro-fill" style={{ width: `${(m.val / m.goal) * 100}%`, backgroundColor: m.color }}></div></div>
                    <span className="macro-val">{m.val}<span className="macro-goal">/{m.goal}{m.unit}</span></span>
                  </div>
                ))}
              </div>

              {/* Today's Activity */}
              <div className="card-white">
                <div className="card-header">
                  <h3 className="card-title">Today's Activity</h3>
                  <button className="card-action" onClick={() => setActiveTab('exercise')}>Log workout</button>
                </div>
                {[
                  { icon: '🌅', label: 'Morning Run', meta: '6.2 km · 32 min', cal: '−310', calColor: '#10B981', time: '7:30 AM' },
                  { icon: '🍽️', label: 'Lunch', meta: 'Chicken salad bowl', cal: '+520', calColor: '#FF5656', time: '1:10 PM' },
                  { icon: '🏋️', label: 'Upper Body Gym', meta: '45 min · 8 sets', cal: '−280', calColor: '#10B981', time: '5:30 PM' },
                ].map((item, i) => (
                  <div key={i} className="act-row">
                    <div className="act-icon-wrap">{item.icon}</div>
                    <div className="act-info">
                      <span className="act-label">{item.label}</span>
                      <span className="act-meta">{item.meta}</span>
                    </div>
                    <div className="act-right">
                      <span className="act-cal" style={{ color: item.calColor }}>{item.cal} kcal</span>
                      <span className="act-time">{item.time}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Weekly Steps Bar Chart */}
              <div className="card-white">
                <div className="card-header">
                  <h3 className="card-title">Weekly Steps</h3>
                  <span className="card-meta">Avg 8,240</span>
                </div>
                <div className="bar-chart">
                  {[
                    { d: 'M', v: 0.75, done: true, today: false },
                    { d: 'T', v: 0.88, done: true, today: false },
                    { d: 'W', v: 0.50, done: true, today: false },
                    { d: 'T', v: 0.95, done: true, today: true },
                    { d: 'F', v: 0.30, done: false, today: false },
                    { d: 'S', v: 0.10, done: false, today: false },
                    { d: 'S', v: 0.05, done: false, today: false },
                  ].map((b, i) => (
                    <div key={i} className="bar-col">
                      <div className="bar-wrap">
                        <div className="bar-fill" style={{ height: `${b.v * 100}%`, backgroundColor: b.done ? (b.today ? '#FFA239' : '#D1FAE5') : '#F0F0F0' }}></div>
                      </div>
                      <span className="bar-day" style={{ color: b.today ? '#FFA239' : '#AAA', fontWeight: b.today ? '800' : '600' }}>{b.d}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Panda Insight */}
              <div className="panda-tip-card">
                <img src="/panda2_img-removebg-preview.png" alt="Panda" />
                <div className="tip-content">
                  <span className="tip-eyebrow">PANDA INSIGHT</span>
                  <p className="tip-text">Your heart rate is 72 BPM — normal zone. Keep it up and drink water! 💧</p>
                </div>
              </div>
            </div>
          )}

          {/* ══════════ EXERCISE TAB ══════════ */}
          {activeTab === 'exercise' && (
            <div className="tab-page">
              <div className="page-header">
                <h1>Exercises</h1>
                <p>15 calisthenics moves</p>
              </div>

              {/* Weekly Streak */}
              <div className="streak-card">
                <h3 className="streak-title">This week</h3>
                <div className="streak-row">
                  {WEEK_DAYS.map((day, i) => (
                    <div key={day} className="streak-day">
                      <span className="streak-day-label" style={{ color: todayIdx === i ? '#FFA239' : '#AAA' }}>{day}</span>
                      <div className={`streak-dot${WEEK_DONE[i] ? ' done' : ''}${todayIdx === i ? ' today' : ''}`}>
                        {WEEK_DONE[i] && <span className="streak-check">✓</span>}
                      </div>
                    </div>
                  ))}
                </div>
                <p className="streak-sub">3 / 7 workout days completed</p>
              </div>

              {/* Filter Chips */}
              <div className="filter-chips">
                {['All', 'Push', 'Pull', 'Legs', 'Core'].map((key) => (
                  <button key={key} className={`filter-chip${activeExFilter === key ? ' active' : ''}`} onClick={() => setActiveExFilter(key)}>{key}</button>
                ))}
              </div>
              <p className="exercise-count">{filteredExercises.length} exercise{filteredExercises.length !== 1 ? 's' : ''}</p>

              {/* Exercise Grid */}
              <div className="exercise-grid">
                {filteredExercises.map((ex) => (
                  <div key={ex.id} className="exercise-card" onClick={() => { setSelectedExercise(ex); setShowExModal(true); }}>
                    <div className="ex-card-top">
                      <img src={ex.images[0]} alt={ex.name} className="ex-card-img" />
                      <span className="ex-level-badge" style={{ backgroundColor: ex.level === 'beginner' ? '#10B981' : ex.level === 'intermediate' ? '#FFA239' : '#EF4444' }}>{ex.level}</span>
                      <span className="ex-cal-pill">🔥 {ex.calories} kcal</span>
                    </div>
                    <div className="ex-card-body">
                      <p className="ex-name">{ex.name}</p>
                      <p className="ex-muscles-text">{ex.muscles.join(', ')}{ex.secMuscles.length > 0 ? ` · ${ex.secMuscles.slice(0, 2).join(', ')}` : ''}</p>
                      <div className="ex-chips">
                        <span className="ex-chip" style={{ backgroundColor: ex.accentColor + '20', color: ex.accentColor }}>{ex.sets} sets</span>
                        <span className="ex-chip" style={{ backgroundColor: ex.accentColor + '20', color: ex.accentColor }}>{ex.reps} reps</span>
                        <span className="ex-chip ex-chip-gray">{ex.category}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ══════════ FOOD TAB ══════════ */}
          {activeTab === 'food' && (
            <div className="tab-page">
              <div className="page-header">
                <h1>Nutrition</h1>
                <p>Track your meals today</p>
              </div>

              {/* Calorie Balance */}
              <div className="food-summary-card">
                <div className="food-sum-item">
                  <span className="food-sum-val" style={{ color: '#FFA239' }}>{totalCalIn}</span>
                  <span className="food-sum-label">eaten</span>
                </div>
                <div className="food-sum-circle">
                  <div className="food-circle-net">{netCal}</div>
                  <div className="food-circle-label">kcal net</div>
                </div>
                <div className="food-sum-item">
                  <span className="food-sum-val" style={{ color: '#10B981' }}>{totalCalOut}</span>
                  <span className="food-sum-label">burned</span>
                </div>
              </div>

              {/* Macros */}
              <div className="card-white">
                <h3 className="card-title">Macros Today</h3>
                {[
                  { label: 'Protein', val: 117, goal: 150, color: '#3B82F6' },
                  { label: 'Carbs', val: 210, goal: 260, color: '#FFA239' },
                  { label: 'Fat', val: 52, goal: 70, color: '#FF5656' },
                ].map((m) => (
                  <div key={m.label} className="macro-row">
                    <span className="macro-label">{m.label}</span>
                    <div className="macro-track"><div className="macro-fill" style={{ width: `${(m.val / m.goal) * 100}%`, backgroundColor: m.color }}></div></div>
                    <span className="macro-val">{m.val}<span className="macro-goal">/{m.goal}g</span></span>
                  </div>
                ))}
              </div>

              <button className="scan-food-btn" onClick={() => setShowFoodModal(true)}>
                <span>📷</span> Scan Food / Add Meal
              </button>

              {/* Meal Log */}
              <div className="card-white">
                <h3 className="card-title">Today's Log</h3>
                {foodLog.map((item) => (
                  <div key={item.id} className="food-log-row">
                    <div className="food-log-icon">{item.icon}</div>
                    <div className="food-log-info">
                      <span className="food-log-name">{item.name}</span>
                      <span className="food-log-meta">{item.meta}</span>
                    </div>
                    <div className="food-log-right">
                      <span className="food-log-cal" style={{ color: item.cal > 0 ? '#F59E0B' : '#10B981' }}>{item.cal > 0 ? '+' : ''}{item.cal} kcal</span>
                      <span className="food-log-time">{item.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ══════════ LEADERBOARD TAB ══════════ */}
          {activeTab === 'leaderboard' && (
            <div className="tab-page">
              <div className="page-header">
                <h1>Leaderboard</h1>
                <p>This week · 8 friends</p>
              </div>

              {/* Podium */}
              <div className="podium-card">
                <div className="podium-col" style={{ marginTop: '28px' }}>
                  <span className="podium-avatar">{LEADERS[1].avatar}</span>
                  <div className="podium-bar silver"><span className="podium-rank-num">2</span></div>
                  <span className="podium-name">{LEADERS[1].name}</span>
                  <span className="podium-val">{getLeaderVal(LEADERS[1])} {getLeaderUnit()}</span>
                </div>
                <div className="podium-col">
                  <span className="leader-tag">LEADER</span>
                  <span className="podium-avatar">{LEADERS[0].avatar}</span>
                  <div className="podium-bar gold"><span className="podium-rank-num">1</span></div>
                  <span className="podium-name podium-winner">{LEADERS[0].name}</span>
                  <span className="podium-val">{getLeaderVal(LEADERS[0])} {getLeaderUnit()}</span>
                </div>
                <div className="podium-col" style={{ marginTop: '48px' }}>
                  <span className="podium-avatar">{LEADERS[2].avatar}</span>
                  <div className="podium-bar bronze"><span className="podium-rank-num">3</span></div>
                  <span className="podium-name podium-you">{LEADERS[2].name}</span>
                  <span className="podium-val">{getLeaderVal(LEADERS[2])} {getLeaderUnit()}</span>
                </div>
              </div>

              {/* Filter tabs */}
              <div className="leader-tabs">
                {['Steps', 'Calories', 'Workouts'].map((t, i) => (
                  <button key={t} className={`leader-tab${leaderTab === i ? ' active' : ''}`} onClick={() => setLeaderTab(i)}>{t}</button>
                ))}
              </div>

              {/* Full list */}
              <div className="leaders-list">
                {LEADERS.map((p) => (
                  <div key={p.rank} className={`leader-row${p.you ? ' you' : ''}`}>
                    <span className="leader-rank" style={{ color: p.rank <= 3 ? '#FFA239' : '#CCC' }}>{p.badge || `#${p.rank}`}</span>
                    <div className={`leader-ava${p.you ? ' you-ava' : ''}`}>{p.avatar}</div>
                    <div className="leader-info">
                      <span className="leader-name" style={p.you ? { color: '#FFA239' } : {}}>{p.name}</span>
                      <div className="leader-mini-track">
                        <div className="leader-mini-fill" style={{ width: `${(getLeaderRaw(p) / maxLeader) * 100}%`, backgroundColor: p.you ? '#FFA239' : '#DDD' }}></div>
                      </div>
                    </div>
                    <span className="leader-val" style={p.you ? { color: '#FFA239' } : {}}>{getLeaderVal(p)} {getLeaderUnit()}</span>
                  </div>
                ))}
              </div>

              {/* Challenges */}
              <div className="challenges-section">
                <h3 className="section-title-sm">Active Challenges</h3>
                {CHALLENGES.map((ch) => (
                  <div key={ch.title} className="challenge-card">
                    <div className="challenge-header">
                      <span className="challenge-title">{ch.title}</span>
                      <span className="challenge-goal" style={{ color: ch.color }}>{ch.goal}</span>
                    </div>
                    <div className="challenge-track"><div className="challenge-fill" style={{ width: `${ch.progress * 100}%`, backgroundColor: ch.color }}></div></div>
                    <span className="challenge-pct">{Math.round(ch.progress * 100)}%{ch.daysLeft > 0 ? ` · ${ch.daysLeft} days left` : ' · Ends today'}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ══════════ PROFILE TAB ══════════ */}
          {activeTab === 'profile' && (
            <div className="tab-page">
              <div className="profile-banner">
                <img src="/panda2_img-removebg-preview.png" alt="Avatar" className="profile-avatar-img" />
                <h2 className="profile-name">{displayName || 'Alex Johnson'}</h2>
                <p className="profile-handle">Member since Feb 2026</p>
                <button className="profile-edit-btn">Edit Profile</button>
              </div>

              <div className="profile-stats-grid">
                {[
                  { label: 'Current', value: `${onboardingData.weight || '72.4'} ${onboardingData.weightUnit}`, icon: '⚖️', color: '#FFA239' },
                  { label: 'Target', value: `${onboardingData.targetWeight || '68'} ${onboardingData.weightUnit}`, icon: '🎯', color: '#10B981' },
                  { label: 'BMI', value: '23.1', icon: '📊', color: '#3B82F6' },
                  { label: 'Body Fat', value: '18%', icon: '📏', color: '#FF5656' },
                ].map((st) => (
                  <div key={st.label} className="profile-stat-box" style={{ borderTopColor: st.color }}>
                    <span className="profile-stat-icon">{st.icon}</span>
                    <span className="profile-stat-value" style={{ color: st.color }}>{st.value}</span>
                    <span className="profile-stat-label">{st.label}</span>
                  </div>
                ))}
              </div>

              <div className="card-white">
                <h3 className="card-title">This week</h3>
                <div className="weekly-summary-row">
                  {[
                    { label: 'Workouts', value: '4', unit: 'sessions', color: '#FFA239' },
                    { label: 'Avg Steps', value: '9.2k', unit: '/day', color: '#3B82F6' },
                    { label: 'Avg Cals', value: '1,940', unit: 'kcal/day', color: '#10B981' },
                  ].map((wk) => (
                    <div key={wk.label} className="weekly-item">
                      <span className="weekly-val" style={{ color: wk.color }}>{wk.value}</span>
                      <span className="weekly-unit">{wk.unit}</span>
                      <span className="weekly-lbl">{wk.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card-white">
                <h3 className="card-title">Achievements</h3>
                <div className="achievements-scroll">
                  {[
                    { icon: '🔥', label: '7-day streak', earned: true },
                    { icon: '🏃', label: 'First 5K', earned: true },
                    { icon: '💪', label: '50 workouts', earned: false },
                    { icon: '🥗', label: 'Clean eater', earned: false },
                    { icon: '⚖️', label: '-5 kg', earned: false },
                  ].map((a) => (
                    <div key={a.label} className={`achievement-badge${!a.earned ? ' locked' : ''}`}>
                      <span className="achievement-icon">{a.icon}</span>
                      <span className="achievement-label">{a.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {[
                { section: 'Health & Goals', items: [{ label: 'Edit Goals', icon: '🎯' }, { label: 'Calorie Target', icon: '🔥' }, { label: 'Activity Level', icon: '💪' }, { label: 'Connected Devices', icon: '⌚' }] },
                { section: 'App', items: [{ label: 'Notifications', icon: '🔔' }, { label: 'Reminders', icon: '⏰' }, { label: 'Privacy', icon: '🔒' }, { label: 'About', icon: 'ℹ️' }] },
              ].map((group) => (
                <div key={group.section} className="card-white">
                  <h3 className="card-title">{group.section}</h3>
                  {group.items.map((item) => (
                    <div key={item.label} className="settings-row">
                      <span className="settings-icon">{item.icon}</span>
                      <span className="settings-label">{item.label}</span>
                      <span className="settings-chevron">›</span>
                    </div>
                  ))}
                </div>
              ))}

              <button className="logout-btn-full" onClick={handleLogout}>Log Out</button>
            </div>
          )}

        </div>

        {/* ══ Bottom Tab Bar ══ */}
        <nav className="bottom-tabs">
          {[
            { key: 'home', icon: '🏠', label: 'Home' },
            { key: 'exercise', icon: '💪', label: 'Exercise' },
            { key: 'food', icon: '🥗', label: 'Food' },
            { key: 'leaderboard', icon: '🏆', label: 'Ranks' },
            { key: 'profile', icon: '👤', label: 'Profile' },
          ].map((tab) => (
            <button key={tab.key} className={`tab-btn${activeTab === tab.key ? ' active' : ''}`} onClick={() => setActiveTab(tab.key as any)}>
              <span className="tab-icon">{tab.icon}</span>
              <span className="tab-label">{tab.label}</span>
            </button>
          ))}
        </nav>

        {/* ══ Exercise Detail Modal ══ */}
        {showExModal && selectedExercise && (
          <div className="modal-overlay" onClick={() => setShowExModal(false)}>
            <div className="ex-modal" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close" onClick={() => setShowExModal(false)}>✕</button>
              <ExModalImageToggle exercise={selectedExercise} />
              <div className="ex-modal-body">
                <h2 className="ex-modal-title">{selectedExercise.name}</h2>
                <div className="ex-modal-badges">
                  <span className="ex-badge" style={{ backgroundColor: selectedExercise.level === 'beginner' ? '#D1FAE5' : selectedExercise.level === 'intermediate' ? '#FEF3C7' : '#FEE2E2', color: selectedExercise.level === 'beginner' ? '#10B981' : selectedExercise.level === 'intermediate' ? '#F59E0B' : '#EF4444' }}>{selectedExercise.level}</span>
                  <span className="ex-badge" style={{ backgroundColor: selectedExercise.accentColor + '20', color: selectedExercise.accentColor }}>{selectedExercise.category}</span>
                  <span className="ex-badge ex-badge-gray">{selectedExercise.equipment}</span>
                </div>
                <div className="ex-modal-stats">
                  {[{ val: selectedExercise.sets, lbl: 'Sets' }, { val: selectedExercise.reps, lbl: 'Reps' }, { val: `${selectedExercise.calories} kcal`, lbl: 'Calories' }].map((s) => (
                    <div key={s.lbl} className="ex-stat-box" style={{ borderColor: selectedExercise.accentColor + '40' }}>
                      <span className="ex-stat-val" style={{ color: selectedExercise.accentColor }}>{s.val}</span>
                      <span className="ex-stat-lbl">{s.lbl}</span>
                    </div>
                  ))}
                </div>
                <div className="ex-muscles-section">
                  <h4>Muscles Worked</h4>
                  <div className="ex-muscle-chips">
                    {selectedExercise.muscles.map((m: string) => (
                      <span key={m} className="muscle-chip" style={{ backgroundColor: selectedExercise.accentColor, color: '#fff' }}>{m}</span>
                    ))}
                    {selectedExercise.secMuscles.map((m: string) => (
                      <span key={m} className="muscle-chip muscle-chip-sec">{m}</span>
                    ))}
                  </div>
                </div>
                <div className="ex-instructions-section">
                  <h4>How To Do It</h4>
                  {selectedExercise.instructions.map((step: string, i: number) => (
                    <div key={i} className="instruction-step">
                      <div className="step-num" style={{ backgroundColor: selectedExercise.accentColor }}>{i + 1}</div>
                      <p className="step-text">{step}</p>
                    </div>
                  ))}
                </div>
                <button className="ex-add-btn" style={{ backgroundColor: selectedExercise.accentColor }} onClick={() => setShowExModal(false)}>
                  Add to Today's Workout
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ══ Food Add Modal ══ */}
        {showFoodModal && (
          <div className="modal-overlay" onClick={() => setShowFoodModal(false)}>
            <div className="food-modal" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close" onClick={() => setShowFoodModal(false)}>✕</button>
              <h2 className="food-modal-title">🍽️ Add Meal</h2>
              <p className="food-modal-sub">Pick from common foods or search</p>
              <div className="food-search-row">
                <input type="text" className="food-search-input" placeholder="e.g. chicken rice, banana..." value={foodSearch} onChange={(e) => setFoodSearch(e.target.value)} />
                <button className="food-search-btn">🔍</button>
              </div>
              <div className="quick-foods">
                {[
                  { name: 'Grilled Chicken', calories: 231, emoji: '🍗' },
                  { name: 'Brown Rice', calories: 216, emoji: '🍚' },
                  { name: 'Caesar Salad', calories: 180, emoji: '🥗' },
                  { name: 'Greek Yogurt', calories: 100, emoji: '🥛' },
                  { name: 'Banana', calories: 89, emoji: '🍌' },
                  { name: 'Oatmeal', calories: 166, emoji: '🥣' },
                  { name: 'Avocado Toast', calories: 320, emoji: '🥑' },
                  { name: 'Protein Shake', calories: 150, emoji: '🥤' },
                ].filter(f => !foodSearch || f.name.toLowerCase().includes(foodSearch.toLowerCase())).map((f) => (
                  <button key={f.name} className="quick-food-btn" onClick={() => {
                    setFoodLog([...foodLog, { id: Date.now(), icon: f.emoji, name: f.name, meta: '1 serving', cal: f.calories, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), type: 'meal' }]);
                    setShowFoodModal(false);
                    setFoodSearch('');
                  }}>
                    <span className="qf-emoji">{f.emoji}</span>
                    <span className="qf-name">{f.name}</span>
                    <span className="qf-cal">{f.calories} kcal</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>
    );
  }

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

      {/* ── Interactive Dashboard Demo ── */}
      <section className="dashboard-demo-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag blue">💻 Try It Live</span>
            <h2>Experience <span className="gradient-text-warm">Health Tracking</span><br />In Action</h2>
            <p>Interactive demo of your personalized health dashboard</p>
          </div>
          
          <div className="demo-dashboard">
            <div className="demo-grid">
              {/* Health Metrics */}
              <div className="demo-card metric-card">
                <div className="metric-header">
                  <span className="metric-icon">❤️</span>
                  <span className="metric-label">Heart Rate</span>
                </div>
                <div className="metric-value">72 <span className="metric-unit">bpm</span></div>
                <div className="metric-trend positive">↑ 2% from yesterday</div>
                <div className="mini-chart">
                  <div className="chart-bar" style={{ height: '40%' }}></div>
                  <div className="chart-bar" style={{ height: '60%' }}></div>
                  <div className="chart-bar" style={{ height: '45%' }}></div>
                  <div className="chart-bar" style={{ height: '70%' }}></div>
                  <div className="chart-bar" style={{ height: '55%' }}></div>
                </div>
              </div>

              <div className="demo-card metric-card">
                <div className="metric-header">
                  <span className="metric-icon">🔥</span>
                  <span className="metric-label">Calories Burned</span>
                </div>
                <div className="metric-value">840 <span className="metric-unit">kcal</span></div>
                <div className="metric-trend positive">↑ 120 kcal</div>
                <div className="mini-chart">
                  <div className="chart-bar" style={{ height: '50%' }}></div>
                  <div className="chart-bar" style={{ height: '65%' }}></div>
                  <div className="chart-bar" style={{ height: '75%' }}></div>
                  <div className="chart-bar" style={{ height: '60%' }}></div>
                  <div className="chart-bar" style={{ height: '80%' }}></div>
                </div>
              </div>

              <div className="demo-card metric-card">
                <div className="metric-header">
                  <span className="metric-icon">💧</span>
                  <span className="metric-label">Water Intake</span>
                </div>
                <div className="metric-value">1.8 <span className="metric-unit">/ 2.5 L</span></div>
                <div className="metric-progress">
                  <div className="progress-bar" style={{ width: '72%' }}></div>
                </div>
                <div className="metric-trend">72% of daily goal</div>
              </div>

              <div className="demo-card metric-card">
                <div className="metric-header">
                  <span className="metric-icon">😴</span>
                  <span className="metric-label">Sleep Quality</span>
                </div>
                <div className="metric-value">8h <span className="metric-unit">12m</span></div>
                <div className="metric-trend positive">Excellent quality</div>
                <div className="sleep-stages">
                  <div className="sleep-stage deep" style={{ width: '30%' }}>Deep</div>
                  <div className="sleep-stage light" style={{ width: '50%' }}>Light</div>
                  <div className="sleep-stage rem" style={{ width: '20%' }}>REM</div>
                </div>
              </div>

              {/* Activity Card */}
              <div className="demo-card activity-card">
                <h3>🏃 Today's Activity</h3>
                <div className="activity-list">
                  <div className="activity-item">
                    <span className="activity-icon">🚶</span>
                    <span className="activity-name">Morning Walk</span>
                    <span className="activity-time">8,240 steps</span>
                  </div>
                  <div className="activity-item">
                    <span className="activity-icon">🏋️</span>
                    <span className="activity-name">Gym Session</span>
                    <span className="activity-time">45 min</span>
                  </div>
                  <div className="activity-item">
                    <span className="activity-icon">🧘</span>
                    <span className="activity-name">Yoga</span>
                    <span className="activity-time">20 min</span>
                  </div>
                </div>
              </div>

              {/* Nutrition Card */}
              <div className="demo-card nutrition-card">
                <h3>🥗 Nutrition Today</h3>
                <div className="nutrition-rings">
                  <div className="nutrition-ring">
                    <div className="ring-label">Protein</div>
                    <div className="ring-value">65g</div>
                  </div>
                  <div className="nutrition-ring">
                    <div className="ring-label">Carbs</div>
                    <div className="ring-value">180g</div>
                  </div>
                  <div className="nutrition-ring">
                    <div className="ring-label">Fat</div>
                    <div className="ring-value">45g</div>
                  </div>
                </div>
              </div>
            </div>
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
