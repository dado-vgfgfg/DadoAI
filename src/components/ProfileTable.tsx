import React from 'react';
import { PerformanceProfile } from '../../types';

type Props = {
  profiles: PerformanceProfile[];
  onBoost: (profile: PerformanceProfile) => Promise<void>;
};

const ProfileTable: React.FC<Props> = ({ profiles, onBoost }) => {
  return (
    <section className="ngu-panel">
      <header className="ngu-panel-header">
        <h2>Game Profiles</h2>
        <p>Per-game presets for boost levels, network modes, and auto-launch optimization.</p>
      </header>
      <table className="ngu-table">
        <thead>
          <tr>
            <th>Game</th>
            <th>Boost</th>
            <th>Network</th>
            <th>Input Lag</th>
            <th>Power Plan</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {profiles.map((profile) => (
            <tr key={profile.id}>
              <td>{profile.gameTitle}</td>
              <td>{profile.boostLevel}</td>
              <td>{profile.networkMode}</td>
              <td>{profile.inputLagReduction ? 'Enabled' : 'Disabled'}</td>
              <td>{profile.powerPlan}</td>
              <td>
                <button className="ngu-btn" onClick={() => onBoost(profile)}>
                  Apply
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default ProfileTable;
