
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CharacterCategory, CharacterProfile, MangaStyle } from '../types';
import { generateCharacterDetails, generateCharacterPortrait } from '../services/geminiService';

interface CharacterCreatorProps {
  storyLine: string;
  style: MangaStyle;
  onSave: (char: CharacterProfile) => void;
  onClose: () => void;
}

const CharacterCreator: React.FC<CharacterCreatorProps> = ({ storyLine, style, onSave, onClose }) => {
  const [step, setStep] = useState<'identity' | 'body' | 'outfit'>('identity');
  const [name, setName] = useState('');
  const [category, setCategory] = useState<CharacterCategory>(CharacterCategory.MAIN);
  const [role, setRole] = useState('');
  const [personality, setPersonality] = useState('');
  const [appearance, setAppearance] = useState({
    base: '',
    hair: '',
    eyes: '',
    outfit: '',
    accessories: ''
  });
  const [portraitUrl, setPortraitUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [aiLog, setAiLog] = useState<string[]>([]);
  
  const debounceTimer = useRef<number | null>(null);

  const addToLog = (msg: string) => setAiLog(prev => [msg, ...prev].slice(0, 3));

  useEffect(() => {
    if (name && appearance.hair && !isSyncing) {
      if (debounceTimer.current) window.clearTimeout(debounceTimer.current);
      debounceTimer.current = window.setTimeout(() => {
        handleRender();
      }, 3000); 
    }
  }, [appearance, name]);

  const handleAISuggest = async () => {
    if (!name) {
      addToLog("System: Designation required.");
      return;
    }
    setIsGenerating(true);
    addToLog(`AI: Accessing Akashic records for ${name}...`);
    try {
      const details = await generateCharacterDetails(name, category, storyLine);
      setRole(details.role || '');
      setPersonality(details.personality || '');
      if (details.appearance) {
        setAppearance(prev => ({ ...prev, ...details.appearance }));
      }
      addToLog(`AI: Personality matrix synthesized.`);
    } catch (e) {
      addToLog("AI: Error in synthesis.");
    }
    setIsGenerating(false);
  };

  const handleRender = async () => {
    if (!name || isSyncing) return;
    setIsSyncing(true);
    addToLog("Core: Projecting visual manifest...");
    try {
      const portrait = await generateCharacterPortrait({
        name,
        category,
        role,
        personality,
        appearance: appearance
      }, style);
      setPortraitUrl(portrait);
      addToLog("Core: Manifest complete.");
    } catch (e) {
      addToLog("Core: Manifest unstable.");
    }
    setIsSyncing(false);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#050510]/95 backdrop-blur-3xl p-4 lg:p-10 overflow-hidden manga-dots speed-lines"
    >
      <div className="w-full h-full max-w-[90rem] flex flex-col gap-8 relative">
        {/* Colorful RPG-Style Header */}
        <div className="flex justify-between items-center bg-gradient-to-r from-lime-500/20 via-cyan-500/20 to-pink-500/20 p-8 rounded-[3rem] border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.5)]">
          <div className="flex flex-col">
            <h2 className="manga-font text-7xl text-white uppercase tracking-tighter leading-none neon-text-lime">
              CAST <span className="text-lime-400">DESIGNER</span>
            </h2>
            <p className="text-[11px] text-cyan-400 font-black uppercase tracking-[0.5em] mt-2">
              Biological Synthesis Module v3
            </p>
          </div>
          <button onClick={onClose} className="w-16 h-16 flex items-center justify-center hover:bg-white/10 rounded-full text-white/40 hover:text-white transition-all border border-white/5 bg-black/20">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        {/* Workspace */}
        <div className="flex-1 flex gap-8 overflow-hidden min-h-0">
          {/* Navigation Bar */}
          <div className="w-24 flex flex-col gap-4">
             {(['identity', 'body', 'outfit'] as const).map(s => (
               <button 
                key={s}
                onClick={() => setStep(s)} 
                className={`flex-1 rounded-[2.5rem] flex flex-col items-center justify-center border transition-all relative group ${step === s ? 'bg-lime-500 border-lime-400 text-black shadow-[0_0_30px_rgba(163,230,53,0.3)]' : 'bg-black/40 border-white/10 text-white/20 hover:text-white'}`}
               >
                 <span className="text-[11px] font-black uppercase tracking-[0.4em] [writing-mode:vertical-lr] rotate-180 group-hover:tracking-[0.6em] transition-all">{s}</span>
               </button>
             ))}
          </div>

          {/* Input Panel */}
          <div className="flex-1 glass-panel rounded-[4rem] p-12 overflow-y-auto custom-scrollbar border-white/10 relative shadow-2xl bg-gradient-to-br from-black/40 to-white/5">
            <AnimatePresence mode="wait">
              {step === 'identity' && (
                <motion.div key="identity" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-12">
                  <div className="space-y-6">
                    <label className="text-[12px] font-black text-lime-400 uppercase tracking-[0.4em] block pl-2">Designation Name</label>
                    <input 
                      value={name} onChange={e => setName(e.target.value)}
                      placeholder="Input ID..."
                      className="w-full bg-black/60 border border-white/10 rounded-[2rem] p-8 text-4xl font-black text-white outline-none focus:border-lime-500 transition-all placeholder:opacity-10 shadow-inner"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-10">
                    <div className="space-y-6">
                      <label className="text-[12px] font-black text-cyan-400 uppercase tracking-[0.4em] block pl-2">Archetype Class</label>
                      <div className="flex flex-wrap gap-3">
                        {Object.values(CharacterCategory).map(cat => (
                          <button 
                            key={cat} onClick={() => setCategory(cat)}
                            className={`flex-1 min-w-[120px] py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${category === cat ? 'bg-cyan-500 text-black shadow-lg' : 'bg-black/60 text-white/20 border border-white/5 hover:border-white/20'}`}
                          >
                            {cat}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-6">
                      <label className="text-[12px] font-black text-cyan-400 uppercase tracking-[0.4em] block pl-2">Story Function (Job)</label>
                      <input 
                        value={role} onChange={e => setRole(e.target.value)}
                        placeholder="e.g. Rogue Assassin, Student..."
                        className="w-full bg-black/60 border border-white/10 rounded-2xl p-6 text-sm text-white outline-none focus:border-cyan-500 shadow-inner"
                      />
                    </div>
                  </div>

                  <div className="space-y-6">
                    <label className="text-[12px] font-black text-pink-400 uppercase tracking-[0.4em] block pl-2">Psychology Matrix</label>
                    <textarea 
                      value={personality} onChange={e => setPersonality(e.target.value)}
                      placeholder="Describe core temperament..."
                      className="w-full h-40 bg-black/60 border border-white/10 rounded-[2.5rem] p-8 text-sm text-white outline-none resize-none focus:border-pink-500 shadow-inner leading-loose"
                    />
                  </div>

                  <button 
                    onClick={handleAISuggest}
                    disabled={isGenerating || !name}
                    className="w-full py-6 bg-white/5 hover:bg-white/10 border border-white/10 rounded-[2.5rem] text-[11px] font-black uppercase tracking-[0.5em] text-lime-400 transition-all flex items-center justify-center gap-4 hover:border-lime-500/50 group"
                  >
                    {isGenerating ? <div className="w-5 h-5 border-2 border-lime-400 border-t-transparent animate-spin rounded-full"></div> : <span className="group-hover:scale-110 transition-transform">✨ AI CORE SUGGESTION</span>}
                  </button>
                </motion.div>
              )}

              {step === 'body' && (
                <motion.div key="body" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-12">
                  <div className="space-y-6">
                    <label className="text-[12px] font-black text-lime-400 uppercase tracking-[0.4em] block pl-2">Physical Foundation</label>
                    <input 
                      value={appearance.base} onChange={e => setAppearance({...appearance, base: e.target.value})}
                      placeholder="e.g. Athletic, towering height, pale skin..."
                      className="w-full bg-black/60 border border-white/10 rounded-2xl p-6 text-sm text-white outline-none focus:border-lime-500"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-10">
                    <div className="space-y-6">
                      <label className="text-[12px] font-black text-cyan-400 uppercase tracking-[0.4em] block pl-2">Hair Texture & Color</label>
                      <input 
                        value={appearance.hair} onChange={e => setAppearance({...appearance, hair: e.target.value})}
                        placeholder="Spiky neon blue..."
                        className="w-full bg-black/60 border border-white/10 rounded-2xl p-6 text-xs text-white outline-none focus:border-cyan-500"
                      />
                    </div>
                    <div className="space-y-6">
                      <label className="text-[12px] font-black text-cyan-400 uppercase tracking-[0.4em] block pl-2">Eye Optics</label>
                      <input 
                        value={appearance.eyes} onChange={e => setAppearance({...appearance, eyes: e.target.value})}
                        placeholder="Deep crimson cat-eyes..."
                        className="w-full bg-black/60 border border-white/10 rounded-2xl p-6 text-xs text-white outline-none focus:border-cyan-500"
                      />
                    </div>
                  </div>
                  <div className="p-10 border-2 border-dashed border-white/5 rounded-[3rem] bg-white/[0.02] text-center">
                    <p className="text-[11px] font-black text-white/20 uppercase tracking-[0.5em] leading-loose">
                      Visual Matrix updates automatically after you finish editing the hair and eyes.
                    </p>
                  </div>
                </motion.div>
              )}

              {step === 'outfit' && (
                <motion.div key="outfit" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-12">
                  <div className="space-y-6">
                    <label className="text-[12px] font-black text-pink-400 uppercase tracking-[0.4em] block pl-2">Standard Gear</label>
                    <input 
                      value={appearance.outfit} onChange={e => setAppearance({...appearance, outfit: e.target.value})}
                      placeholder="Combat suit, flowing cloak..."
                      className="w-full bg-black/60 border border-white/10 rounded-2xl p-6 text-sm text-white outline-none focus:border-pink-500"
                    />
                  </div>
                  <div className="space-y-6">
                    <label className="text-[12px] font-black text-cyan-400 uppercase tracking-[0.4em] block pl-2">Unique Artifacts</label>
                    <textarea 
                      value={appearance.accessories} onChange={e => setAppearance({...appearance, accessories: e.target.value})}
                      placeholder="Cybernetic arm, glowing mask..."
                      className="w-full h-40 bg-black/60 border border-white/10 rounded-[2.5rem] p-8 text-sm text-white outline-none resize-none focus:border-cyan-500 shadow-inner"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Manifestation (Visual Screen) */}
          <div className="w-[540px] flex flex-col gap-8">
            <div className="flex-1 glass-panel rounded-[5rem] border-white/10 p-6 relative group shadow-2xl overflow-hidden bg-black/60">
              {/* Screen Glitch/Effect Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10 opacity-60"></div>
              
              <div className="absolute top-10 right-10 z-20 flex flex-col items-end gap-3">
                 <div className="bg-black/60 px-6 py-2 rounded-full border border-white/10 flex items-center gap-3 backdrop-blur-md">
                    <div className={`w-2 h-2 rounded-full ${isSyncing ? 'bg-amber-500 animate-pulse shadow-[0_0_10px_#f59e0b]' : 'bg-lime-400 shadow-[0_0_10px_#a3e635]'}`}></div>
                    <span className="text-[10px] font-black text-white uppercase tracking-widest">{isSyncing ? 'SYNCHRONIZING' : 'MANIFEST ACTIVE'}</span>
                 </div>
              </div>
              
              {portraitUrl ? (
                <div className="w-full h-full relative group">
                  <img src={portraitUrl} className="w-full h-full object-cover rounded-[4rem] transition-transform duration-[8s] group-hover:scale-110" />
                  <div className="absolute bottom-12 left-12 right-12 z-20 p-8 bg-black/80 backdrop-blur-xl rounded-[2.5rem] border border-white/10 shadow-2xl">
                     <p className="text-4xl manga-font text-white mb-2 neon-text-lime">{name || '---'}</p>
                     <p className="text-[11px] font-black text-cyan-400 uppercase tracking-[0.4em]">{role || 'UNKNOWN UNIT'}</p>
                  </div>
                </div>
              ) : (
                <div className="w-full h-full bg-white/[0.02] rounded-[4rem] flex flex-col items-center justify-center text-center p-16 border-2 border-dashed border-white/5">
                   <div className="w-24 h-24 border-2 border-dashed border-white/10 rounded-full animate-spin mb-10"></div>
                   <p className="text-[11px] font-black text-white/10 uppercase tracking-[0.6em]">Awaiting Visual DNA</p>
                </div>
              )}
              
              {isSyncing && (
                <div className="absolute inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-30">
                   <div className="flex flex-col items-center gap-6">
                      <div className="w-16 h-16 border-4 border-lime-500 border-t-transparent rounded-full animate-spin shadow-[0_0_20px_rgba(163,230,53,0.3)]"></div>
                      <span className="text-[10px] font-black text-lime-400 uppercase tracking-[0.5em]">Materializing...</span>
                   </div>
                </div>
              )}
            </div>

            {/* Interface Terminal */}
            <div className="h-44 glass-panel rounded-[3rem] border-white/10 p-8 flex flex-col gap-4 bg-black/60 shadow-inner">
               <h4 className="text-[10px] font-black text-white/40 uppercase tracking-widest flex items-center gap-3">
                  <div className="w-2 h-2 bg-pink-500 rounded-full shadow-[0_0_8px_#ec4899]"></div>
                  Log Output
               </h4>
               <div className="flex-1 overflow-y-auto custom-scrollbar space-y-3 font-mono">
                 {aiLog.length === 0 ? (
                    <p className="text-[11px] text-white/10 uppercase tracking-widest">System idle. Input character data.</p>
                 ) : (
                   aiLog.map((log, i) => (
                    <p key={i} className={`text-[11px] font-bold tracking-tight ${i === 0 ? 'text-lime-400' : 'text-white/20'}`}>
                      [{new Date().toLocaleTimeString()}] > {log}
                    </p>
                   ))
                 )}
               </div>
            </div>
          </div>
        </div>

        {/* Action Footer */}
        <div className="flex justify-between items-center bg-black/60 p-8 rounded-[3rem] border border-white/10 shadow-2xl">
          <button onClick={onClose} className="px-10 py-4 text-white/20 hover:text-red-500 text-[11px] font-black uppercase tracking-[0.4em] transition-all hover:bg-red-500/5 rounded-2xl">ABORT DESIGN</button>
          <button 
            onClick={() => onSave({
              id: Math.random().toString(36).substr(2, 9),
              name, role, category, personality, appearance, portraitUrl: portraitUrl || undefined
            })}
            disabled={!name || !role}
            className="px-20 py-6 bg-lime-500 text-black font-black uppercase text-sm tracking-[0.4em] rounded-[2rem] hover:bg-lime-400 transition-all shadow-[0_0_40px_rgba(163,230,53,0.3)] disabled:opacity-10 active:scale-95"
          >
            DEPLOY CHARACTER
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default CharacterCreator;
