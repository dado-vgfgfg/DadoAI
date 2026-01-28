
import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import ProjectWizard from './components/ProjectWizard';
import Sidebar from './components/Sidebar';
import GenerationUI from './components/GenerationUI';
// Fix: Added Language to imports
import { Project, CharacterProfile, MangaPanel, User, CharacterCategory, MangaStyle, Language } from './types';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('mangai_user');
    const savedProjects = localStorage.getItem('mangai_projects');
    if (savedUser) setUser(JSON.parse(savedUser));
    if (savedProjects) setProjects(JSON.parse(savedProjects));
  }, []);

  useEffect(() => {
    localStorage.setItem('mangai_projects', JSON.stringify(projects));
  }, [projects]);

  const handleLogin = () => {
    // Fix: Added missing 'language' property to satisfy User interface requirements
    const mockUser: User = { 
      name: "Mangaka Guest", 
      email: "guest@mangai.com", 
      avatar: "https://i.pravatar.cc/150",
      tier: 'Free',
      language: Language.ENGLISH
    };
    setUser(mockUser);
    localStorage.setItem('mangai_user', JSON.stringify(mockUser));
  };

  const handleCreateProject = (projectData: Partial<Project>) => {
    const newProject: Project = {
      id: Math.random().toString(36).substr(2, 9),
      title: projectData.title || "Untitled Story",
      genres: projectData.genres || [],
      style: projectData.style || MangaStyle.MODERN_ANIME,
      storyLine: projectData.storyLine || "",
      characters: [],
      panels: [],
      createdAt: Date.now(),
    };
    setProjects(prev => [newProject, ...prev]);
    setSelectedProjectId(newProject.id);
    setIsCreating(false);
  };

  const handleUpdateProject = (projectId: string, updates: Partial<Project>) => {
    setProjects(prev => prev.map(p => p.id === projectId ? { ...p, ...updates } : p));
  };

  const handleAddCharacter = (projectId: string, newChar: CharacterProfile) => {
    setProjects(prev => prev.map(p => 
      p.id === projectId ? { ...p, characters: [...p.characters, newChar] } : p
    ));
  };

  const handleDeleteCharacter = (projectId: string, charId: string) => {
    setProjects(prev => prev.map(p => 
      p.id === projectId ? { ...p, characters: p.characters.filter(c => c.id !== charId) } : p
    ));
  };

  const handlePanelGenerated = (projectId: string, panel: MangaPanel) => {
    setProjects(prev => prev.map(p => 
      p.id === projectId ? { ...p, panels: [panel, ...p.panels] } : p
    ));
  };

  const currentProject = projects.find(p => p.id === selectedProjectId);

  if (!user) return <Login onLogin={handleLogin} />;

  if (selectedProjectId && currentProject) {
    return (
      <div className="flex h-screen w-full text-zinc-100 font-sans antialiased overflow-hidden">
        <Sidebar 
          project={currentProject}
          onUpdateProject={(updates) => handleUpdateProject(currentProject.id, updates)}
          onAddCharacter={(char) => handleAddCharacter(currentProject.id, char)}
          onDeleteCharacter={(id) => handleDeleteCharacter(currentProject.id, id)}
          onExit={() => setSelectedProjectId(null)}
        />
        <main className="flex-1 flex flex-col relative overflow-hidden">
          <GenerationUI 
            project={currentProject}
            onPanelGenerated={(panel) => handlePanelGenerated(currentProject.id, panel)}
          />
        </main>
      </div>
    );
  }

  return (
    <>
      <Dashboard 
        projects={projects} 
        onSelectProject={(p) => setSelectedProjectId(p.id)} 
        onCreateNew={() => setIsCreating(true)} 
      />
      {isCreating && (
        <ProjectWizard 
          onComplete={handleCreateProject} 
          onCancel={() => setIsCreating(false)} 
        />
      )}
    </>
  );
};

export default App;
