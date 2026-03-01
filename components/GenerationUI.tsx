
import React, { useState, useEffect } from 'react';
import { generateMangaImage, refinePrompt } from '../services/geminiService';
import { Project, MangaPanel } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

interface GenerationUIProps {
  project: Project;
  onPanelGenerated: (panel: MangaPanel) => void;
}

const GenerationUI: React.FC<GenerationUIProps> = ({ project, onPanelGenerated }) => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isRefining, setIsRefining] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    setIsSyncing(true);
    const timer = setTimeout(() => setIsSyncing(false), 800);
    return () => clearTimeout(timer);
  }, [project.panels, project.characters]);

  const handleGenerate = async () => {
    if (!prompt.trim() || isGenerating) return;
    setIsGenerating(true);
    
    const imageUrl = await generateMangaImage(
      prompt, 
      project.style, 
      project.genres, 
      project.storyLine, 
      project.characters,
      project.panels,
      "3:4"
    );
    
    if (imageUrl) {
      const newPanel: MangaPanel = {
        id: Math.random().toString(36).substr(2, 9),
        imageUrl,
        prompt: prompt,
        timestamp: Date.now(),
      };
      onPanelGenerated(newPanel);
      setPrompt('');
    }
    setIsGenerating(false);
  };

  const handleRefine = async () => {
    if (!prompt.trim() || isRefining) return;
    setIsRefining(true);
    const refined = await refinePrompt(prompt, project.genres);
    setPrompt(refined);
    setIsRefining(false);
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-[#050510] relative overflow-hidden">
      {/* Increased Background Lighting Effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-15%] right-[-15%] w-[80%] h-[80%] bg-purple-600/20 rounded-full blur-[160px]"></div>
        <div className="absolute bottom-[10%] left-[-15%] w-[70%] h-[70%] bg-cyan-600/15 rounded-full blur-[160px]"></div>
        <div className="absolute top-[30%] left-[20%] w-[60%] h-[60%] bg-white/5 rounded-full blur-[180px]"></div>
        <div className="absolute bottom-[-10%] right-[10%] w-[50%] h-[50%] bg-lime-500/10 rounded-full blur-[140px]"></div>
      </div>

      {/* Top Status Bar */}
      <div className="px-12 py-10 border-b border-white/10 bg-black/60 flex justify-between items-center z-20 backdrop-blur-xl">
        <div className="flex flex-col">
          <div className="flex items-center gap-10">
            <h1 className="manga-font text-6xl text-white tracking-tighter leading-none">
              Dado<span className="text-purple-500 neon-text-purple">AI</span>
            </h1>
            <div className="w-[2px] h-12 bg-white/15"></div>
            <h2 className="manga-font text-5xl text-white/90 uppercase tracking-tighter">
              {project.title}
            </h2>
          </div>
          <div className="flex items-center gap-6 mt-3">
             <p className="text-[10px] text-white/40 font-black uppercase tracking-[0.4em] italic">
               Director Engine: Story-Aware
             </p>
             <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${isSyncing ? 'bg-amber-500 animate-pulse' : 'bg-lime-500'}`}></div>
                <span className="text-[9px] text-white/50 font-black uppercase tracking-widest">
                   {isSyncing ? 'Synchronizing...' : 'Live System Ready'}
                </span>
             </div>
          </div>
        </div>
        <div className="text-[10px] text-lime-400 bg-lime-500/10 px-8 py-3 rounded-full border border-lime-500/20 tracking-[0.4em] font-black uppercase shadow-[0_0_20px_rgba(163,230,53,0.1)]">
          Optimal Build v6.4
        </div>
      </div>

      {/* Main Viewport */}
      <div className="flex-1 overflow-y-auto p-12 custom-scrollbar relative z-10">
        <AnimatePresence mode="popLayout">
          {project.panels.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="h-full flex flex-col items-center justify-center text-center max-w-2xl mx-auto space-y-12"
            >
              <div className="p-24 border border-dashed border-white/20 rounded-[5rem] bg-white/[0.06] backdrop-blur-md shadow-[0_0_100px_rgba(255,255,255,0.05)]">
                <h3 className="text-8xl manga-font text-white uppercase tracking-tight mb-8 leading-none">Ready to Create</h3>
                <p className="text-white/50 text-[12px] font-black uppercase tracking-[0.4em] leading-loose italic">
                  Describe a scene below. The AI will use your Characters and Story for perfect consistency.
                </p>
              </div>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-20 max-w-7xl mx-auto pb-64">
              {project.panels.map((panel, idx) => (
                <motion.div 
                  key={panel.id} 
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="group relative"
                >
                  <div className="absolute -inset-2 bg-gradient-to-br from-purple-500/20 to-cyan-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                  <div className="relative bg-black rounded-[4rem] p-4 border border-white/10 group-hover:neon-border-lime transition-all duration-500 shadow-[0_0_80px_rgba(0,0,0,0.9)] overflow-hidden aspect-[3/4]">
                    <img 
                      src={panel.imageUrl} 
                      className="w-full h-full object-cover rounded-[3rem] transition-all duration-[15s] group-hover:scale-105" 
                      alt="Manga Page"
                    />
                    <div className="absolute top-10 left-10 bg-black/80 backdrop-blur-md px-6 py-2 rounded-full border border-white/20">
                        <p className="text-[10px] text-lime-400 font-black uppercase tracking-[0.3em]">
                         PAGE {project.panels.length - idx}
                        </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Controls - Optimized Layout */}
      <div className="px-12 pb-16 pt-8 bg-gradient-to-t from-[#050510] via-[#050510]/98 to-transparent z-20">
        <div className="max-w-7xl mx-auto glass-panel border-white/20 p-8 rounded-[3.5rem] shadow-[0_0_100px_rgba(0,0,0,0.8)] bg-black/60 backdrop-blur-2xl">
          <div className="flex items-center gap-8">
            <div className="flex-1 relative">
              <input 
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
                placeholder="Describe the action... (e.g. Hero confronts the villain in the neon city)"
                className="w-full bg-black/50 border border-white/10 rounded-full px-14 py-8 text-xl focus:border-purple-500/50 outline-none transition-all placeholder:text-white/20 font-bold text-white shadow-inner"
              />
              <button 
                onClick={handleRefine}
                disabled={!prompt || isRefining}
                className="absolute right-8 top-1/2 -translate-y-1/2 p-3 text-white/30 hover:text-purple-400 transition-all disabled:opacity-10"
              >
                {isRefining ? <div className="w-6 h-6 border-2 border-purple-400 border-t-transparent animate-spin rounded-full"></div> : <span className="text-3xl">✨</span>}
              </button>
            </div>
            
            <button 
              onClick={handleGenerate}
              disabled={!prompt || isGenerating}
              className={`w-24 h-24 rounded-full font-black transition-all transform hover:scale-110 active:scale-95 shadow-2xl flex items-center justify-center shrink-0 ${
                !prompt || isGenerating 
                  ? 'bg-white/5 text-white/10 border border-white/5' 
                  : 'bg-lime-500 text-black hover:bg-lime-400 shadow-[0_0_40px_rgba(163,230,53,0.5)]'
              }`}
              title="Render Page"
            >
              {isGenerating ? (
                <div className="w-8 h-8 border-4 border-black border-t-transparent animate-spin rounded-full"></div>
              ) : (
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenerationUI;
