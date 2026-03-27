import React, { useMemo, useState } from 'react';
import { PlanTier, PerformanceProfile, SafetyState } from './types';
import { aiRecommendations, benchmarkHistory, defaultSafetyState, hardwareProfile, optimizationModules, profiles } from './src/data/mockData';
import SidebarNav from './src/components/SidebarNav';
import MetricCard from './src/components/MetricCard';
import ModuleGrid from './src/components/ModuleGrid';
import ProfileTable from './src/components/ProfileTable';
import AiCoachPanel from './src/components/AiCoachPanel';
import HistoryPanel from './src/components/HistoryPanel';
import { useRealtimeMetrics } from './src/hooks/useRealtimeMetrics';
import { systemBridge } from './src/services/systemBridge';
import './src/styles/neon.css';

const navItems = ['Dashboard', 'Profiles', 'Overlay', 'AI Coach', 'History', 'Safety'];

const App: React.FC = () => {
  const [active, setActive] = useState<string>('Dashboard');
  const [tier, setTier] = useState<PlanTier>('Pro');
  const [status, setStatus] = useState<string>('Ready for optimization.');
  const [safety, setSafety] = useState<SafetyState>(defaultSafetyState);
  const { current, quickStats } = useRealtimeMetrics();

  const planSummary = useMemo(
    () => ({
      free: ['Basic One-Click Boost', 'Real-time Monitoring', 'Temp File Cleanup', 'Startup App Manager', 'FPS Estimation'],
      pro: ['Advanced CPU/GPU Tweaks', 'Low Latency Network Stack', 'In-game Overlay', 'AI Assistant', 'Benchmark History'],
    }),
    [],
  );

  const handleBoost = async (profile: PerformanceProfile) => {
    const results = await systemBridge.applyOneClickBoost(profile);
    const last = results[results.length - 1];
    setStatus(`${profile.gameTitle} optimized. ${last.message}`);
  };

  const handleSafeMode = async () => {
    const next = await systemBridge.toggleSafeMode(safety);
    setSafety(next);
    setStatus(`Safe mode ${next.safeMode ? 'enabled' : 'disabled'}. Backup synced at ${new Date(next.lastBackup).toLocaleTimeString()}.`);
  };

  return (
    <div className="ngu-shell">
      <SidebarNav items={navItems} active={active} onSelect={setActive} />
      <main className="ngu-main">
        <header className="ngu-topbar">
          <div>
            <h1>NEON GAMER ULTRA</h1>
            <p>Commercial-grade gaming optimization hub with safety-first automation.</p>
          </div>
          <div className="ngu-actions">
            <button className="ngu-btn secondary" onClick={() => setTier((t) => (t === 'Free' ? 'Pro' : 'Free'))}>
              Plan: {tier}
            </button>
            <button className="ngu-btn" onClick={() => handleBoost(profiles[0])}>ONE CLICK BOOST</button>
          </div>
        </header>

        <section className="ngu-stats-row">
          {quickStats.map((stat) => (
            <MetricCard key={stat.label} label={stat.label} value={stat.value} accent={stat.tone as 'cyan' | 'purple' | 'green' | 'orange'} />
          ))}
          <MetricCard label="CPU Temp" value={`${Math.round(current.cpuTemp)}°C`} accent="orange" sub="Temperature-aware throttle control" />
          <MetricCard label="Frame Time" value={`${current.frameTime.toFixed(1)} ms`} accent="cyan" sub="Overlay export ready" />
        </section>

        <section className="ngu-panel">
          <header className="ngu-panel-header">
            <h2>System Intelligence</h2>
            <p>
              Auto-detected profile: <strong>{hardwareProfile.class}</strong> tier ({hardwareProfile.cpu} / {hardwareProfile.gpu} / {hardwareProfile.ramGb}GB RAM).
            </p>
          </header>
          <div className="ngu-pill-list">
            {planSummary.free.map((item) => <span key={item} className="tag enabled">Free: {item}</span>)}
            {planSummary.pro.map((item) => <span key={item} className="tag">Pro: {item}</span>)}
          </div>
        </section>

        <ModuleGrid modules={optimizationModules} tier={tier} />
        <ProfileTable profiles={profiles} onBoost={handleBoost} />
        <AiCoachPanel recommendations={aiRecommendations} tier={tier} />
        <HistoryPanel benchmarks={benchmarkHistory} />

        <section className="ngu-panel safety-panel">
          <header className="ngu-panel-header">
            <h2>Safety System</h2>
            <p>All tweaks are reversible, with automatic backups before modification.</p>
          </header>
          <div className="ngu-safety-controls">
            <p><strong>Safe Mode:</strong> {safety.safeMode ? 'Enabled' : 'Disabled'}</p>
            <p><strong>Restore Point:</strong> {safety.restorePointName}</p>
            <button className="ngu-btn secondary" onClick={handleSafeMode}>Toggle Safe Mode</button>
          </div>
        </section>

        <footer className="ngu-status">Status: {status}</footer>
      </main>
    </div>
  );
};

export default App;
