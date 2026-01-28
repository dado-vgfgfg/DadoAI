
import React, { useState, useEffect } from 'react';
import { generateMangaImage, refinePrompt } from '../services/geminiService';
import { Project, MangaPanel } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

type LayoutType = 'panels' | 'splash';

interface GenerationUIProps {
  project: Project;
  onPanelGenerated: (panel: MangaPanel) => void;
}

const GenerationUI: React.FC<GenerationUIProps> = ({ project, onPanelGenerated }) => {
  const [prompt, setPrompt] = useState('');
  const [layout, setLayout] = useState<LayoutType>('panels');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isRefining, setIsRefining] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  // Simulo un indicatore di salvataggio automatico quando cambia il progetto
  useEffect(() => {
    setIsSyncing(true);
    const timer = setTimeout(() => setIsSyncing(false), 800);
    return () => clearTimeout(timer);
  }, [project.panels, project.characters]);

  const handleGenerate = async () => {
    if (!prompt.trim() || isGenerating) return;
    setIsGenerating(true);
    
    const layoutInstructions = layout === 'panels' 
      ? "Detailed layout: 3-4 granular panels showing micro-actions of the scene." 
      : "Full-page splash focusing on the atmospheric transition of this scene.";

    const fullPrompt = `${layoutInstructions} ACTION: ${prompt}`;
    
    const imageUrl = await generateMangaImage(
      fullPrompt, 
      project.style, 
      project.genres, 
      project.storyLine, 
      project.characters,
      project.panels, // Passo la storia per il pacing
      layout === 'panels' ? "3:4" : "9:16"
    );
    
    if (imageUrl) {
      const newPanel: MangaPanel = {
        id: Math.random().toString(36).substr(2, 9),
        imageUrl,
        prompt: fullPrompt,
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
    <div className="flex-1 flex flex-col h-full bg-[#07070e] relative overflow-hidden">
      {/* Top Status Bar */}
      <div className="px-10 py-6 border-b border-white/5 bg-black/40 flex justify-between items-center z-20">
        <div className="flex flex-col">
          <h2 className="text-xl font-black text-white uppercase tracking-tighter flex items-center gap-4">
            {project.title}
            <span className="text-[10px] text-lime-400 bg-lime-500/10 px-3 py-1 rounded-full border border-lime-500/20 tracking-widest">
              STUDIO ATTIVO
            </span>
          </h2>
          <div className="flex items-center gap-4 mt-1">
             <p className="text-[9px] text-white/20 font-black uppercase tracking-[0.4em] italic">
               Mode: Slow-Pacing Enabled
             </p>
             <div className="flex items-center gap-2">
                <div className={`w-1.5 h-1.5 rounded-full ${isSyncing ? 'bg-amber-500 animate-pulse' : 'bg-lime-500'}`}></div>
                <span className="text-[8px] text-white/30 font-black uppercase tracking-widest">
                   {isSyncing ? 'Auto-Saving...' : 'Cloud Synced'}
                </span>
             </div>
          </div>
        </div>
      </div>

      {/* Main Viewport */}
      <div className="flex-1 overflow-y-auto p-12 custom-scrollbar relative">
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

        <AnimatePresence mode="popLayout">
          {project.panels.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="h-full flex flex-col items-center justify-center text-center max-w-2xl mx-auto space-y-8"
            >
              <div className="p-16 border-2 border-dashed border-white/5 rounded-[4rem] bg-white/[0.02]">
                <h3 className="text-7xl manga-font text-white uppercase tracking-tight mb-4 neon-text-lime">Studio Pronto</h3>
                <p className="text-white/40 text-[11px] font-black uppercase tracking-[0.4em] leading-relaxed italic">
                  Il motore DadoAI genererà la tua storia con un pacing cinematografico. Ogni comando creerà scene granulari per evitare salti temporali eccessivi.
                </p>
              </div>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-16 max-w-7xl mx-auto pb-40">
              {project.panels.map((panel, idx) => (
                <motion.div 
                  key={panel.id} 
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="group relative"
                >
                  <div className="relative bg-black rounded-[4rem] p-4 border border-white/10 group-hover:border-lime-500/50 transition-all duration-700 shadow-2xl overflow-hidden aspect-[3/4]">
                    <img 
                      src={panel.imageUrl} 
                      className="w-full h-full object-cover rounded-[3rem] transition-transform duration-[15s] group-hover:scale-110" 
                      alt="Pagina Manga"
                    />
                    <div className="absolute bottom-12 left-12 right-12 p-8 bg-black/90 backdrop-blur-xl rounded-3xl border border-white/10 opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0">
                      <p className="text-[10px] text-lime-400 font-black uppercase tracking-widest mb-2 flex items-center gap-3">
                         <span className="w-8 h-[1px] bg-lime-400"></span>
                         Tavola Sequenziale {project.panels.length - idx}
                      </p>
                      <p className="text-[11px] text-white/50 leading-relaxed font-bold uppercase italic">
                        {panel.prompt.split('ACTION: ')[1] || panel.prompt}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Interface Controls */}
      <div className="px-10 pb-12 pt-6 bg-gradient-to-t from-black via-black/90 to-transparent z-20">
        <div className="max-w-4xl mx-auto glass-panel border-white/10 p-10 rounded-[4rem] shadow-[0_-20px_80px_rgba(0,0,0,0.8)]">
          <div className="flex flex-col gap-10">
            <div className="flex justify-center gap-6">
              <button 
                onClick={() => setLayout('panels')}
                className={`flex-1 flex items-center justify-center gap-4 py-4 rounded-[2rem] text-[11px] font-black uppercase tracking-[0.3em] border transition-all ${layout === 'panels' ? 'bg-lime-500 text-black border-lime-400 shadow-[0_0_30px_rgba(163,230,53,0.3)]' : 'bg-white/5 text-white/30 border-white/5 hover:border-white/20'}`}
              >
                Sequenza Vignette
              </button>
              <button 
                onClick={() => setLayout('splash')}
                className={`flex-1 flex items-center justify-center gap-4 py-4 rounded-[2rem] text-[11px] font-black uppercase tracking-[0.3em] border transition-all ${layout === 'splash' ? 'bg-lime-500 text-black border-lime-400 shadow-[0_0_30px_rgba(163,230,53,0.3)]' : 'bg-white/5 text-white/30 border-white/5 hover:border-white/20'}`}
              >
                Splash Art Lenta
              </button>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex-1 relative">
                <input 
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
                  placeholder="Descrivi l'azione successiva (es: 'Si versa il caffè fissando la pioggia')"
                  className="w-full bg-black/60 border border-white/10 rounded-[2.5rem] px-12 py-7 text-sm focus:border-lime-500 outline-none transition-all placeholder:text-white/10 font-bold"
                />
                <button 
                  onClick={handleRefine}
                  disabled={!prompt || isRefining}
                  className="absolute right-8 top-1/2 -translate-y-1/2 p-3 text-lime-400 hover:scale-125 transition-transform disabled:opacity-30 group"
                  title="Ottimizza Pacing"
                >
                  {isRefining ? <div className="w-5 h-5 border-2 border-lime-400 border-t-transparent animate-spin rounded-full"></div> : <span className="group-hover:neon-text-lime text-2xl">✨</span>}
                </button>
              </div>
              
              <button 
                onClick={handleGenerate}
                disabled={!prompt || isGenerating}
                className={`h-[80px] px-16 rounded-[2.5rem] font-black text-xs uppercase tracking-[0.4em] transition-all transform hover:scale-105 active:scale-95 shadow-2xl flex items-center gap-4 ${
                  !prompt || isGenerating 
                    ? 'bg-white/5 text-white/10 border border-white/5' 
                    : 'bg-lime-500 text-black shadow-lime-900/60'
                }`}
              >
                {isGenerating && <div className="w-5 h-5 border-3 border-black border-t-transparent animate-spin rounded-full"></div>}
                {isGenerating ? 'Rendering...' : 'Crea Tavola'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenerationUI;
