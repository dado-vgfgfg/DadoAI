import React from 'react';
import { OptimizationModule, PlanTier } from '../../types';

type Props = {
  modules: OptimizationModule[];
  tier: PlanTier;
};

const ModuleGrid: React.FC<Props> = ({ modules, tier }) => (
  <section className="ngu-panel">
    <header className="ngu-panel-header">
      <h2>Optimization Modules</h2>
      <p>Modular architecture ready for plugin expansion and future Windows native integrations.</p>
    </header>
    <div className="ngu-module-grid">
      {modules.map((module) => {
        const locked = module.premium && tier === 'Free';
        return (
          <article key={module.id} className="ngu-module-item">
            <div>
              <h3>{module.name}</h3>
              <p>{module.description}</p>
            </div>
            <div className="ngu-module-tags">
              <span className="tag">{module.category}</span>
              {locked ? <span className="tag locked">PRO</span> : null}
              <span className={`tag ${module.enabled ? 'enabled' : ''}`}>{module.enabled ? 'Online' : 'Offline'}</span>
            </div>
          </article>
        );
      })}
    </div>
  </section>
);

export default ModuleGrid;
