import React from 'react';
import { AiRecommendation, PlanTier } from '../../types';

type Props = {
  recommendations: AiRecommendation[];
  tier: PlanTier;
};

const AiCoachPanel: React.FC<Props> = ({ recommendations, tier }) => (
  <section className="ngu-panel">
    <header className="ngu-panel-header">
      <h2>AI Performance Assistant</h2>
      <p>Hardware-aware suggestions powered by telemetry trends and benchmark history.</p>
    </header>
    <div className="ngu-recommendations">
      {recommendations.map((item) => {
        const locked = item.requiresPro && tier === 'Free';
        return (
          <article key={item.id} className="ngu-reco-item">
            <div>
              <h3>{item.title}</h3>
              <p>{item.detail}</p>
            </div>
            <div className="ngu-reco-meta">
              <span>Impact: {item.impact}</span>
              <span>Confidence: {item.confidence}%</span>
              {locked ? <span className="tag locked">Pro required</span> : <span className="tag enabled">Ready</span>}
            </div>
          </article>
        );
      })}
    </div>
  </section>
);

export default AiCoachPanel;
