import { OperationResult, PerformanceProfile, SafetyState } from '../../types';

/**
 * SystemBridge defines the contract to native Windows integrations.
 *
 * In production this class should call secure IPC handlers exposed by Electron main
 * process or a Tauri command bridge that invokes signed native modules.
 */
export class SystemBridge {
  async applyOneClickBoost(profile: PerformanceProfile): Promise<OperationResult[]> {
    return [
      { operation: 'Process Prioritization', status: 'success', message: `Applied ${profile.boostLevel} boost process policy.` },
      { operation: 'Memory Trim', status: 'success', message: 'Released reclaimable standby memory pages.' },
      { operation: 'Service Optimization', status: 'warning', message: '2 non-critical services deferred until game exit.', rollbackHint: 'Use Safety > Restore Defaults' },
    ];
  }

  async optimizeNetwork(gameTitle: string): Promise<OperationResult> {
    return {
      operation: 'Network Optimization',
      status: 'success',
      message: `Low-latency profile for ${gameTitle} activated (DNS, QoS, socket tuning).`,
    };
  }

  async toggleSafeMode(current: SafetyState): Promise<SafetyState> {
    return {
      ...current,
      safeMode: !current.safeMode,
      lastBackup: new Date().toISOString(),
    };
  }

  async createBackupTag(): Promise<string> {
    return `NGU_BACKUP_${Date.now()}`;
  }
}

export const systemBridge = new SystemBridge();
