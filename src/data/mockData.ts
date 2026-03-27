import { AiRecommendation, BenchmarkResult, HardwareProfile, OptimizationModule, PerformanceProfile, SafetyState } from '../../types';

export const hardwareProfile: HardwareProfile = {
  cpu: 'Intel Core i7-14700K',
  gpu: 'NVIDIA RTX 4080 SUPER',
  ramGb: 32,
  storage: '2TB NVMe Gen4',
  network: '2.5GbE + Wi-Fi 7',
  class: 'High',
};

export const defaultSafetyState: SafetyState = {
  safeMode: true,
  lastBackup: new Date().toISOString(),
  restorePointName: 'NEON_GAMER_ULTRA_AUTO_BACKUP',
};

export const optimizationModules: OptimizationModule[] = [
  { id: 'boost-core', name: 'One Click Boost', description: 'RAM cleanup, service tuning, process focus.', enabled: true, premium: false, category: 'Boost' },
  { id: 'network-engine', name: 'HyperNet Low Latency', description: 'TCP/UDP profile switching and DNS optimizer.', enabled: true, premium: true, category: 'Network' },
  { id: 'input-zero', name: 'Input Zero-Lag', description: 'Timer resolution, polling tuning and queue optimization.', enabled: true, premium: true, category: 'Input' },
  { id: 'smart-clean', name: 'Auto Cleaner', description: 'Junk cleanup and startup item automation.', enabled: true, premium: false, category: 'Cleanup' },
  { id: 'ai-coach', name: 'AI Performance Assistant', description: 'Live bottleneck prediction and per-game recommendations.', enabled: true, premium: true, category: 'AI' },
  { id: 'neon-overlay', name: 'In-game Overlay', description: 'FPS, thermals, frame-time and ping in overlay widget.', enabled: true, premium: true, category: 'Overlay' },
  { id: 'safety-guard', name: 'Safety Guard', description: 'Automatic backups and one-click rollback.', enabled: true, premium: false, category: 'Safety' },
];

export const profiles: PerformanceProfile[] = [
  {
    id: 'profile-valorant',
    gameTitle: 'VALORANT',
    executable: 'VALORANT-Win64-Shipping.exe',
    boostLevel: 'Competitive',
    networkMode: 'LowLatency',
    inputLagReduction: true,
    autoBoostOnLaunch: true,
    powerPlan: 'Ultimate',
    cpuAffinityMask: '0x0FFF',
  },
  {
    id: 'profile-cyberpunk',
    gameTitle: 'Cyberpunk 2077',
    executable: 'Cyberpunk2077.exe',
    boostLevel: 'Balanced',
    networkMode: 'Standard',
    inputLagReduction: false,
    autoBoostOnLaunch: true,
    powerPlan: 'HighPerformance',
  },
];

export const aiRecommendations: AiRecommendation[] = [
  {
    id: 'ai-1',
    title: 'Lower GPU power target to 93% for smoother frametime',
    impact: 'Medium',
    confidence: 89,
    requiresPro: true,
    detail: 'Detected transient power spikes causing frame pacing variance. Adaptive curve can improve 1% lows by ~6%.',
  },
  {
    id: 'ai-2',
    title: 'Disable 14 startup apps before competitive sessions',
    impact: 'High',
    confidence: 94,
    requiresPro: false,
    detail: 'Startup contention is adding CPU wakeups and storage access. Free tier cleaner can apply this immediately.',
  },
  {
    id: 'ai-3',
    title: 'Switch DNS route profile for lower routing jitter',
    impact: 'Low',
    confidence: 74,
    requiresPro: true,
    detail: 'Current route has unstable hop times in evening windows. Low-latency DNS profile should reduce spikes.',
  },
];

export const benchmarkHistory: BenchmarkResult[] = [
  { id: 'b1', gameTitle: 'VALORANT', date: '2026-03-21', avgFps: 392, p1LowFps: 282, avgPing: 18, notes: 'Post network tuning' },
  { id: 'b2', gameTitle: 'Cyberpunk 2077', date: '2026-03-20', avgFps: 121, p1LowFps: 92, avgPing: 0, notes: 'DLSS Quality + balanced profile' },
  { id: 'b3', gameTitle: 'Apex Legends', date: '2026-03-18', avgFps: 244, p1LowFps: 171, avgPing: 27, notes: 'Input latency mode active' },
];
