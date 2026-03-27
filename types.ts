export type PlanTier = 'Free' | 'Pro';

export interface HardwareProfile {
  cpu: string;
  gpu: string;
  ramGb: number;
  storage: string;
  network: string;
  class: 'Low' | 'Mid' | 'High';
}

export interface TelemetrySnapshot {
  timestamp: number;
  cpuUsage: number;
  gpuUsage: number;
  ramUsage: number;
  cpuTemp: number;
  gpuTemp: number;
  vramUsage: number;
  fps: number;
  ping: number;
  frameTime: number;
}

export interface PerformanceProfile {
  id: string;
  gameTitle: string;
  executable: string;
  boostLevel: 'Balanced' | 'Competitive' | 'Ultra';
  networkMode: 'Standard' | 'LowLatency';
  inputLagReduction: boolean;
  autoBoostOnLaunch: boolean;
  cpuAffinityMask?: string;
  powerPlan: 'Balanced' | 'HighPerformance' | 'Ultimate';
}

export interface OptimizationModule {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  premium: boolean;
  category: 'Boost' | 'Network' | 'Input' | 'Cleanup' | 'AI' | 'Overlay' | 'Safety';
}

export interface OperationResult {
  operation: string;
  status: 'success' | 'warning' | 'failed';
  message: string;
  rollbackHint?: string;
}

export interface AiRecommendation {
  id: string;
  title: string;
  impact: 'Low' | 'Medium' | 'High';
  confidence: number;
  requiresPro: boolean;
  detail: string;
}

export interface BenchmarkResult {
  id: string;
  gameTitle: string;
  date: string;
  avgFps: number;
  p1LowFps: number;
  avgPing: number;
  notes: string;
}

export interface SafetyState {
  safeMode: boolean;
  lastBackup: string;
  restorePointName: string;
}
