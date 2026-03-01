
import React, { useState } from 'react';
import { Project, MangaGenre, MangaStyle, CharacterCategory, CharacterProfile } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import CharacterCreator from './CharacterCreator';

interface SidebarProps {
  project: Project;
  onUpdateProject: (updates: Partial<Project>) => void;
  onAddCharacter: (char: CharacterProfile) => void;
  onDeleteCharacter: (id: string) => void;
  onExit: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  project, onUpdateProject, onAddCharacter, onDeleteCharacter, onExit 
}) => {
  const [activeTab, setActiveTab] = useState<'characters' | 'story' | 'settings'>('characters');
  const [showCreator, setShowCreator] = useState(false);

  return (
    <>
      <motion.aside 
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="w-[440px] glass-panel border-r border-white/20 flex flex-col h-full z-30 shadow-[50px_0_100px_rgba(0,0,0,0.7)] bg-[#0a0a1f]"
      >
        <div className="p-12 border-b border-white/10 bg-black/50">
          <div className="flex justify-between items-center mb-12">
            <div className="flex flex-col">
              <h1 className="manga-font text-6xl text-white tracking-tighter leading-none">
                Dado<span className="text-purple-500 neon-text-purple">AI</span>
              </h1>
            </div>
            <button onClick={onExit} className="p-4 hover:bg-white/10 rounded-full transition-all text-white/40 hover:text-white border border-white/10 shadow-lg">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            </button>
          </div>
          
          <div className="flex bg-black/40 p-2 rounded-[2.5rem] border border-white/10 shadow-inner">
            {(['characters', 'story', 'settings'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-5 text-[11px] font-black uppercase tracking-[0.25em] rounded-[1.8rem] transition-all ${
                  activeTab === tab 
                    ? 'bg-lime-500 text-black shadow-[0_0_30px_rgba(163,230,53,0.6)]' 
                    : 'text-white/40 hover:text-white hover:bg-white/5'
                }`}
              >
                {tab === 'characters' ? 'Characters' : tab === 'story' ? 'Story' : 'Settings'}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-12 custom-scrollbar">
          <AnimatePresence mode="wait">
            {activeTab === 'characters' && (
              <motion.div key="characters" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-14">
                <div className="flex items-center justify-between">
                  <h3 className="text-[13px] font-black uppercase text-lime-400 tracking-[0.5em] neon-text-lime">CHARACTERS</h3>
                  <button 
                    onClick={() => setShowCreator(true)}
                    className="flex items-center gap-4 bg-cyan-500/10 hover:bg-cyan-500 hover:text-black border border-cyan-500/40 px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all shadow-[0_0_20px_rgba(34,211,238,0.2)]"
                  >
                    + NEW HERO
                  </button>
                </div>

                <div className="space-y-8">
                  {project.characters.length === 0 ? (
                    <div className="py-28 text-center border-2 border-dashed border-white/10 rounded-[5rem] space-y-8 bg-white/[0.02]">
                      <p className="text-[12px] font-black text-white/10 uppercase tracking-[0.6em]">No bio-signatures found</p>
                      <button onClick={() => setShowCreator(true)} className="text-cyan-400 font-black text-[12px] uppercase tracking-widest hover:neon-text-cyan transition-all underline decoration-2 underline-offset-8">Design Character</button>
                    </div>
                  ) : (
                    project.characters.map(char => (
                      <div key={char.id} className="group flex gap-8 p-8 bg-white/[0.04] border border-white/10 rounded-[4rem] hover:neon-border-lime transition-all shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-lime-500/5 blur-3xl rounded-full"></div>
                        <div className="w-24 h-24 rounded-[2.5rem] overflow-hidden bg-black border border-white/20 flex-shrink-0 shadow-inner">
                          {char.portraitUrl ? <img src={char.portraitUrl} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center font-black text-lime-400 text-4xl">{char.name[0]}</div>}
                        </div>
                        <div className="flex-1 min-w-0 flex flex-col justify-center">
                          <div className="flex justify-between items-start">
                            <span className="text-2xl font-black text-white truncate group-hover:text-lime-400 transition-colors uppercase tracking-tight">{char.name}</span>
                            <button onClick={() => onDeleteCharacter(char.id)} className="opacity-0 group-hover:opacity-100 text-white/30 hover:text-red-500 transition-all p-2 bg-black/40 rounded-full">
                              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                          </div>
                          <p className="text-[11px] text-cyan-400 font-black uppercase mt-3 tracking-[0.3em]">{char.role}</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </motion.div>
            )}

            {activeTab === 'story' && (
              <motion.div key="story" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-10">
                <div className="p-12 bg-white/[0.03] border border-white/15 rounded-[5rem] space-y-8 shadow-[0_0_60px_rgba(0,0,0,0.5)] relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-3 h-full bg-gradient-to-b from-cyan-500 to-lime-500 shadow-[0_0_20px_rgba(34,211,238,0.5)]"></div>
                  <p className="text-[14px] font-black text-cyan-400 uppercase tracking-[0.5em] flex items-center gap-4">
                    <span className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_10px_#22d3ee]"></span>
                    NARRATIVE LORE
                  </p>
                  <textarea 
                    value={project.storyLine}
                    onChange={(e) => onUpdateProject({ storyLine: e.target.value })}
                    className="w-full h-[500px] bg-black/60 border border-white/10 rounded-[3rem] p-10 text-[16px] text-white/90 outline-none focus:neon-border-cyan transition-all resize-none leading-relaxed custom-scrollbar shadow-inner"
                    placeholder="Input the core story here."
                  />
                </div>
              </motion.div>
            )}

            {activeTab === 'settings' && (
              <motion.div key="settings" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-14">
                <div className="space-y-12">
                  <div className="space-y-6">
                    <label className="text-[12px] font-black text-white/40 uppercase tracking-[0.5em] ml-3">VISUAL ART ENGINE</label>
                    <select 
                      value={project.style}
                      onChange={e => onUpdateProject({ style: e.target.value as MangaStyle })}
                      className="w-full bg-black/60 border border-white/15 rounded-[3rem] px-12 py-8 text-[15px] text-white outline-none focus:neon-border-lime transition-all appearance-none cursor-pointer font-black"
                    >
                      {Object.values(MangaStyle).map(s => <option key={s} value={s} className="bg-[#0f0f2d]">{s}</option>)}
                    </select>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="p-12 border-t border-white/10 bg-black/60 text-center">
          <p className="text-[12px] font-black text-white/30 uppercase tracking-[0.7em] mb-6">DadoAI GLOBAL INFRASTRUCTURE</p>
          <div className="flex justify-center gap-5">
             <div className="w-3 h-3 rounded-full bg-lime-500 shadow-[0_0_15px_#a3e635]"></div>
             <div className="w-3 h-3 rounded-full bg-cyan-500 shadow-[0_0_15px_#22d3ee]"></div>
          </div>
        </div>
      </motion.aside>

      <AnimatePresence>
        {showCreator && (
          <CharacterCreator 
            storyLine={project.storyLine}
            style={project.style}
            onSave={(char) => {
              onAddCharacter(char);
              setShowCreator(false);
            }}
            onClose={() => setShowCreator(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
