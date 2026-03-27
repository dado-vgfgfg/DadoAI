import { useEffect, useMemo, useState } from 'react';
import { TelemetrySnapshot } from '../../types';

const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));

const buildSnapshot = (prev?: TelemetrySnapshot): TelemetrySnapshot => {
  const drift = (base: number, range = 8) => clamp(base + (Math.random() - 0.5) * range, 0, 1000);
  return {
    timestamp: Date.now(),
    cpuUsage: clamp(drift(prev?.cpuUsage ?? 41, 11), 8, 98),
    gpuUsage: clamp(drift(prev?.gpuUsage ?? 75, 12), 12, 99),
    ramUsage: clamp(drift(prev?.ramUsage ?? 56, 7), 15, 95),
    cpuTemp: clamp(drift(prev?.cpuTemp ?? 67, 4), 35, 96),
    gpuTemp: clamp(drift(prev?.gpuTemp ?? 63, 5), 36, 95),
    vramUsage: clamp(drift(prev?.vramUsage ?? 61, 9), 10, 98),
    fps: clamp(drift(prev?.fps ?? 184, 22), 45, 450),
    ping: clamp(drift(prev?.ping ?? 24, 6), 4, 240),
    frameTime: clamp(drift(prev?.frameTime ?? 5.6, 0.65), 2.5, 23),
  };
};

export const useRealtimeMetrics = () => {
  const [current, setCurrent] = useState<TelemetrySnapshot>(() => buildSnapshot());
  const [history, setHistory] = useState<TelemetrySnapshot[]>([]);

  useEffect(() => {
    const id = window.setInterval(() => {
      setCurrent((prev) => {
        const next = buildSnapshot(prev);
        setHistory((h) => [...h.slice(-59), next]);
        return next;
      });
    }, 1000);

    return () => window.clearInterval(id);
  }, []);

  const quickStats = useMemo(
    () => [
      { label: 'CPU', value: `${Math.round(current.cpuUsage)}%`, tone: 'cyan' },
      { label: 'GPU', value: `${Math.round(current.gpuUsage)}%`, tone: 'purple' },
      { label: 'FPS', value: `${Math.round(current.fps)}`, tone: 'green' },
      { label: 'Ping', value: `${Math.round(current.ping)} ms`, tone: 'orange' },
    ],
    [current],
  );

  return { current, history, quickStats };
};
