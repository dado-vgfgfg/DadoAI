import React from 'react';
import { BenchmarkResult } from '../../types';

type Props = {
  benchmarks: BenchmarkResult[];
};

const HistoryPanel: React.FC<Props> = ({ benchmarks }) => (
  <section className="ngu-panel">
    <header className="ngu-panel-header">
      <h2>Performance History & Benchmarks</h2>
      <p>Before/after validation to prove value for paid upgrades.</p>
    </header>
    <div className="ngu-history-grid">
      {benchmarks.map((entry) => (
        <article key={entry.id} className="ngu-history-item">
          <h3>{entry.gameTitle}</h3>
          <p>{entry.date}</p>
          <dl>
            <div><dt>Avg FPS</dt><dd>{entry.avgFps}</dd></div>
            <div><dt>1% Low</dt><dd>{entry.p1LowFps}</dd></div>
            <div><dt>Avg Ping</dt><dd>{entry.avgPing} ms</dd></div>
          </dl>
          <p className="note">{entry.notes}</p>
        </article>
      ))}
    </div>
  </section>
);

export default HistoryPanel;
