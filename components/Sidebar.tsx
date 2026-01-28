
import React, { useState } from 'react';
import { Project, MangaGenre, MangaStyle, CharacterCategory, CharacterProfile, Language } from '../types';
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
  const [activeTab, setActiveTab] = useState<'cast' | 'guide' | 'settings'>('cast');
  const [showCreator, setShowCreator] = useState(false);
  const [currentLang, setCurrentLang] = useState<Language>(Language.ITALIAN);

  return (
    <>
      <motion.aside 
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="w-96 glass-panel border-r border-white/10 flex flex-col h-full z-30 shadow-2xl bg-[#0a0a14]"
      >
        <div className="p-10 border-b border-white/10 bg-black/40">
          <div className="flex justify-between items-center mb-8">
            <h1 className="manga-font text-4xl text-white tracking-tight uppercase leading-none">DADOAI</h1>
            <button onClick={onExit} className="p-2.5 hover:bg-white/10 rounded-full transition-colors text-white/30 hover:text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            </button>
          </div>
          
          <div className="flex bg-white/5 p-1 rounded-2xl">
            {(['cast', 'guide', 'settings'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-3 text-[10px] font-black uppercase tracking-[0.2em] rounded-xl transition-all ${
                  activeTab === tab ? 'bg-lime-500 text-black shadow-lg' : 'text-white/40 hover:text-white'
                }`}
              >
                {tab === 'cast' ? 'Cast' : tab === 'guide' ? 'Guida' : 'Opzioni'}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          <AnimatePresence mode="wait">
            {activeTab === 'cast' && (
              <motion.div key="cast" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-10">
                <div className="flex items-center justify-between">
                  <h3 className="text-[10px] font-black uppercase text-lime-400 tracking-[0.3em]">PERSONAGGI</h3>
                  <button 
                    onClick={() => setShowCreator(true)}
                    className="flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 px-5 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all"
                  >
                    + AGGIUNGI
                  </button>
                </div>

                <div className="space-y-8">
                  {project.characters.length === 0 ? (
                    <div className="py-24 text-center border-2 border-dashed border-white/5 rounded-[3rem] space-y-6">
                      <p className="text-[10px] font-black text-white/10 uppercase tracking-[0.4em]">Nessun Personaggio</p>
                      <button onClick={() => setShowCreator(true)} className="text-lime-400 font-black text-[10px] uppercase tracking-widest hover:text-white transition-all underline">Crea il tuo Avatar</button>
                    </div>
                  ) : (
                    [CharacterCategory.MAIN, CharacterCategory.VILLAIN, CharacterCategory.SECONDARY].map(cat => {
                      const chars = project.characters.filter(c => c.category === cat);
                      if (chars.length === 0) return null;
                      return (
                        <div key={cat} className="space-y-4">
                          <p className="text-[9px] font-black text-white/20 uppercase tracking-[0.5em] pl-1">{cat}</p>
                          <div className="space-y-3">
                            {chars.map(char => (
                              <div key={char.id} className="group flex gap-4 p-4 bg-white/5 border border-white/5 rounded-[2.5rem] hover:border-lime-500/30 transition-all shadow-xl">
                                <div className="w-16 h-16 rounded-[1.5rem] overflow-hidden bg-zinc-900 border border-white/10 flex-shrink-0">
                                  {char.portraitUrl ? <img src={char.portraitUrl} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center font-black text-lime-400 text-xl">{char.name[0]}</div>}
                                </div>
                                <div className="flex-1 min-w-0 flex flex-col justify-center">
                                  <div className="flex justify-between items-start">
                                    <span className="text-sm font-black text-white truncate group-hover:text-lime-400 transition-colors uppercase">{char.name}</span>
                                    <button onClick={() => onDeleteCharacter(char.id)} className="opacity-0 group-hover:opacity-100 text-white/20 hover:text-red-500 transition-all">
                                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                                    </button>
                                  </div>
                                  <p className="text-[9px] text-lime-400/70 font-black uppercase mt-1 tracking-widest">{char.role}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </motion.div>
            )}

            {activeTab === 'settings' && (
              <motion.div key="settings" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-10">
                <div className="space-y-8">
                  <div className="space-y-4">
                    <label className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em] ml-1">Lingua Studio</label>
                    <div className="grid grid-cols-2 gap-2">
                       {Object.values(Language).map(l => (
                         <button 
                          key={l}
                          onClick={() => setCurrentLang(l)}
                          className={`py-3 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${currentLang === l ? 'bg-lime-500 text-black border-lime-400' : 'bg-white/5 text-white/40 border-white/10 hover:border-white/30'}`}
                         >
                           {l}
                         </button>
                       ))}
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <label className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em] ml-1">Stile Artistico</label>
                    <select 
                      value={project.style}
                      onChange={e => onUpdateProject({ style: e.target.value as MangaStyle })}
                      className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-5 text-sm text-white outline-none focus:border-lime-500 transition-all"
                    >
                      {Object.values(MangaStyle).map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'guide' && (
              <motion.div key="guide" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                <div className="p-8 bg-lime-500/5 border border-lime-500/20 rounded-[3rem] space-y-4 shadow-xl text-center">
                  <p className="text-[11px] font-black text-lime-400 uppercase tracking-widest">Master Workflow</p>
                  <p className="text-xs text-white/50 leading-loose uppercase font-bold">
                    Crea i personaggi nella scheda Cast prima di generare le tavole per mantenere la coerenza visiva.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="p-10 border-t border-white/5 bg-black/20 text-center">
          <p className="text-[10px] font-black text-white uppercase tracking-widest opacity-30">DadoAI Engine v3</p>
          <p className="text-[9px] text-lime-400/40 font-black uppercase tracking-[0.4em] mt-2">Core Status: Optimal</p>
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
