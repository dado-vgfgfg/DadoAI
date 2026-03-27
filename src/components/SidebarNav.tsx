import React from 'react';

type Props = {
  items: string[];
  active: string;
  onSelect: (item: string) => void;
};

const SidebarNav: React.FC<Props> = ({ items, active, onSelect }) => (
  <aside className="ngu-sidebar">
    <div className="ngu-logo">
      <span className="ngu-logo-main">NEON</span>
      <span className="ngu-logo-sub">GAMER ULTRA</span>
    </div>
    <nav>
      {items.map((item) => (
        <button
          key={item}
          onClick={() => onSelect(item)}
          className={`ngu-nav-btn ${active === item ? 'active' : ''}`}
        >
          {item}
        </button>
      ))}
    </nav>
  </aside>
);

export default SidebarNav;
