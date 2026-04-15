import { useEffect, useMemo, useState } from 'react';
import Sidebar from './components/Sidebar';
import LoyaltyBuilder from './components/LoyaltyBuilder';
import InvitationBuilder from './components/InvitationBuilder';
import MenuBuilder from './components/MenuBuilder';
import ProjectList from './components/ProjectList';
import { ModuleType, StudioProject } from './types';
import { studioApi } from './lib/studioApi';

function makeProject(module: ModuleType): StudioProject {
  return {
    id: crypto.randomUUID(),
    type: module,
    name: `${module}-project-${new Date().toISOString().slice(0, 10)}`,
    payload: { template: 'default' },
    updatedAt: new Date().toISOString()
  };
}

export default function App() {
  const [selectedModule, setSelectedModule] = useState<ModuleType>('loyalty');
  const [projects, setProjects] = useState<StudioProject[]>([]);

  useEffect(() => {
    studioApi.listProjects().then(setProjects);
  }, []);

  const Current = useMemo(() => {
    if (selectedModule === 'loyalty') return <LoyaltyBuilder />;
    if (selectedModule === 'invitation') return <InvitationBuilder />;
    return <MenuBuilder />;
  }, [selectedModule]);

  const handleSaveTemplate = async () => {
    const project = makeProject(selectedModule);
    await studioApi.saveProject(project);
    setProjects((prev) => [project, ...prev]);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar selected={selectedModule} onSelect={setSelectedModule} />
      <main className="flex-1 space-y-4 overflow-auto p-6">
        <header className="panel flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Windows Desktop Studio (.exe-ready)</p>
            <h2 className="text-2xl font-bold">Build Loyalty, Invitations & QR Menus Locally</h2>
          </div>
          <button className="rounded bg-cyan-400 px-4 py-2 font-semibold text-slate-950" onClick={handleSaveTemplate}>
            Save Project Preset
          </button>
        </header>

        {Current}

        <ProjectList projects={projects} />
      </main>
    </div>
  );
}
