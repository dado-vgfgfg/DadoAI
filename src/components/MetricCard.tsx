import React from 'react';

type Props = {
  label: string;
  value: string;
  accent: 'cyan' | 'purple' | 'green' | 'orange';
  sub?: string;
};

const MetricCard: React.FC<Props> = ({ label, value, accent, sub }) => {
  return (
    <article className={`ngu-card accent-${accent}`}>
      <p className="ngu-card-label">{label}</p>
      <h3 className="ngu-card-value">{value}</h3>
      {sub ? <p className="ngu-card-sub">{sub}</p> : null}
    </article>
  );
};

export default MetricCard;
