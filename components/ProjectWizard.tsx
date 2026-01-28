
import React, { useState } from 'react';
import { MangaGenre, MangaStyle, Project } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

interface ProjectWizardProps {
  onComplete: (projectData: Partial<Project>) => void;
  onCancel: () => void;
}

const ProjectWizard: React.FC<ProjectWizardProps> = ({ onComplete, onCancel }) => {
  const [step, setStep] = useState(1);
  const [title, setTitle] = useState('');
  const [selectedGenres, setSelectedGenres] = useState<MangaGenre[]>([]);
  const [style, setStyle] = useState<MangaStyle>(MangaStyle.MODERN_ANIME);
  const [storyLine, setStoryLine] = useState('');

  const toggleGenre = (genre: MangaGenre) => {
    setSelectedGenres(prev => 
      prev.includes(genre) ? prev.filter(g => g !== genre) : [...prev, genre]
    );
  };

  const handleNext = () => setStep(prev => prev + 1);

  const handleSubmit = () => {
    onComplete({ 
      title, 
      genres: selectedGenres.length > 0 ? selectedGenres : [MangaGenre.SHOUNEN], 
      style, 
      storyLine 
    });
  };

  const stepVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#050510]/95 backdrop-blur-3xl p-4 md:p-6"
    >
      <motion.div 
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="glass-panel border-white/10 rounded-[4rem] w-full max-w-4xl overflow-hidden shadow-2xl relative"
      >
        {/* Progress Bar */}
        <div className="absolute top-0 left-0 w-full h-1.5 bg-white/5">
           <motion.div 
            className="h-full bg-cyan-600 shadow-[0_0_20px_rgba(6,182,212,0.5)]"
            animate={{ width: `${(step / 3) * 100}%` }}
           />
        </div>

        {/* Wizard Header */}
        <div className="p-10 md:p-14 pb-4 flex justify-between items-start">
          <div>
            <span className="text-cyan-400 font-black text-[10px] uppercase tracking-[0.5em]">Phase {step} of 3</span>
            <h2 className="text-5xl md:text-6xl manga-font text-white mt-4 uppercase tracking-tight">
              {step === 1 ? "The Concept" : step === 2 ? "The Soul" : "The Visuals"}
            </h2>
          </div>
          <button onClick={onCancel} className="p-3 hover:bg-white/10 rounded-full transition-colors">
            <svg className="w-10 h-10 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <div className="p-10 md:p-14 pt-4 min-h-[500px] flex flex-col justify-between">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              variants={stepVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.4 }}
              className="flex-1"
            >
              {step === 1 && (
                <div className="space-y-10">
                  <div className="space-y-6">
                    <label className="text-xs font-black uppercase tracking-[0.3em] text-white/20">Production Title</label>
                    <input 
                      autoFocus
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g. Neon Horizon, Blade of Destiny..."
                      className="w-full bg-white/5 border-b-2 border-white/10 focus:border-cyan-500 py-6 text-4xl font-black outline-none transition-all placeholder:text-white/5"
                    />
                  </div>
                  
                  <div className="space-y-6">
                    <label className="text-xs font-black uppercase tracking-[0.3em] text-white/20 flex justify-between">
                      <span>Select Genres ({selectedGenres.length})</span>
                      <span className="text-cyan-400">At least 1 required</span>
                    </label>
                    <div className="max-h-64 overflow-y-auto pr-4 flex flex-wrap gap-3 custom-scrollbar">
                      {Object.values(MangaGenre).map(g => (
                        <button
                          key={g}
                          onClick={() => toggleGenre(g)}
                          className={`px-5 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest border transition-all ${
                            selectedGenres.includes(g) 
                              ? 'bg-cyan-600 border-cyan-400 text-white shadow-lg' 
                              : 'bg-white/5 border-white/10 text-white/40 hover:border-white/30'
                          }`}
                        >
                          {g}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-8 h-full flex flex-col">
                  <label className="text-xs font-black uppercase tracking-[0.3em] text-white/20">Story & World Setting</label>
                  <textarea 
                    autoFocus
                    value={storyLine}
                    onChange={(e) => setStoryLine(e.target.value)}
                    placeholder="Describe the world, the conflict, and the overall vibe..."
                    className="flex-1 bg-white/5 border border-white/10 rounded-[3rem] p-10 text-xl font-medium outline-none focus:ring-2 focus:ring-cyan-600 resize-none transition-all"
                  />
                </div>
              )}

              {step === 3 && (
                <div className="space-y-10">
                  <label className="text-xs font-black uppercase tracking-[0.3em] text-white/20">Cinematic Art Style</label>
                  <div className="grid grid-cols-2 gap-6">
                    {Object.values(MangaStyle).map(s => (
                      <button
                        key={s}
                        onClick={() => setStyle(s)}
                        className={`group relative p-8 rounded-[3rem] border-2 transition-all flex items-center justify-between ${
                          style === s 
                            ? 'bg-cyan-600/10 border-cyan-600 shadow-2xl' 
                            : 'bg-white/5 border-white/10 hover:border-white/30'
                        }`}
                      >
                        <div className="flex items-center gap-6">
                           <div className={`w-4 h-4 rounded-full ${style === s ? 'bg-cyan-400' : 'bg-white/10'}`}></div>
                           <span className={`text-xs font-black uppercase tracking-widest ${style === s ? 'text-white' : 'text-white/40'}`}>
                            {s}
                           </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-between items-center pt-10 mt-10 border-t border-white/5">
            <button 
              onClick={() => step > 1 ? setStep(s => s - 1) : onCancel()} 
              className="text-xs font-black text-white/30 uppercase tracking-[0.3em] hover:text-white transition-colors"
            >
              {step === 1 ? "Discard" : "Go Back"}
            </button>
            
            <button 
              onClick={step < 3 ? handleNext : handleSubmit}
              disabled={step === 1 && !title}
              className={`px-16 py-6 rounded-[2rem] font-black text-xs uppercase tracking-[0.3em] transition-all transform hover:scale-105 active:scale-95 shadow-2xl ${
                step === 1 && !title ? 'bg-white/5 text-white/10' : 'bg-white text-black hover:bg-cyan-400'
              }`}
            >
              {step === 3 ? "Initialize Studio" : "Next Phase"}
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProjectWizard;
