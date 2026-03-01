
import React from 'react';
import { Project } from '../types';
import { motion } from 'framer-motion';

interface DashboardProps {
  projects: Project[];
  onSelectProject: (p: Project) => void;
  onCreateNew: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ projects, onSelectProject, onCreateNew }) => {
  return (
    <div className="min-h-screen p-6 lg:p-12 overflow-y-auto custom-scrollbar">
      <div className="max-w-7xl mx-auto space-y-20">
        {/* Branding Header */}
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row justify-between items-center gap-8 border-b border-white/5 pb-16"
        >
          <div className="flex flex-col gap-4 text-center md:text-left items-center md:items-start">
            <h1 className="manga-font text-9xl text-white tracking-tighter leading-none">
              Dado<span className="text-purple-500 neon-text-purple">AI</span>
            </h1>
            <p className="text-cyan-400/70 font-black uppercase tracking-[0.5em] text-[10px] italic">
              Professional Manga Engineering Suite
            </p>
          </div>
          <button 
            onClick={onCreateNew}
            className="group relative bg-lime-500 hover:bg-lime-400 text-black font-black px-14 py-6 rounded-[2rem] text-xs uppercase tracking-[0.3em] transition-all hover:scale-105 shadow-[0_0_40px_rgba(163,230,53,0.3)]"
          >
            <span className="relative z-10 flex items-center gap-3">
              <span className="text-xl">+</span> Start New Story
            </span>
          </button>
        </motion.header>

        {/* Subscription Tiers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* FREE TIER */}
          <motion.div whileHover={{ y: -8 }} className="glass-panel p-10 rounded-[3.5rem] border-white/5 relative group overflow-hidden bg-gradient-to-br from-white/5 to-transparent">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/5 rounded-full blur-3xl"></div>
            <h4 className="text-white/20 font-black text-[9px] uppercase tracking-widest mb-3">Beginner</h4>
            <h2 className="text-4xl manga-font text-white mb-2 uppercase tracking-tight">Free Pass</h2>
            <p className="text-white/30 text-[10px] font-bold uppercase mb-8">€0 / Forever</p>
            <div className="space-y-4 mb-10">
              <div className="flex items-center gap-3 text-xs text-white/50 font-medium">
                <span className="text-lime-500">✓</span> 5 Manga Pages / Project
              </div>
              <div className="flex items-center gap-3 text-xs text-white/50 font-medium">
                <span className="text-lime-500">✓</span> Standard AI Rendering
              </div>
              <div className="flex items-center gap-3 text-xs text-white/50 font-medium">
                <span className="text-lime-500">✓</span> Basic Character Creator
              </div>
              <div className="flex items-center gap-3 text-xs text-white/20 font-medium line-through">
                <span>✕</span> High-Res Export
              </div>
            </div>
            <button className="w-full py-4 bg-white/5 border border-white/10 rounded-2xl text-[9px] font-black uppercase tracking-widest text-white/10 cursor-default">Current Plan</button>
          </motion.div>

          {/* PRO TIER */}
          <motion.div whileHover={{ y: -8 }} className="glass-panel p-10 rounded-[3.5rem] border-purple-500/20 relative group overflow-hidden bg-gradient-to-br from-purple-500/10 to-transparent shadow-2xl">
            <div className="absolute top-6 right-6 bg-purple-500 text-white font-black text-[8px] px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg">Most Popular</div>
            <h4 className="text-purple-400 font-black text-[9px] uppercase tracking-widest mb-3">Professional</h4>
            <h2 className="text-4xl manga-font text-white mb-2 uppercase tracking-tight">Pro Mangaka</h2>
            <p className="text-purple-400 text-[10px] font-bold uppercase mb-8">€12.99 / Month</p>
            <div className="space-y-4 mb-10">
              <div className="flex items-center gap-3 text-xs text-white/80 font-semibold">
                <span className="text-purple-500">✓</span> Unlimited AI Generations
              </div>
              <div className="flex items-center gap-3 text-xs text-white/80 font-semibold">
                <span className="text-purple-500">✓</span> Ultra High-Res 4K Render
              </div>
              <div className="flex items-center gap-3 text-xs text-white/80 font-semibold">
                <span className="text-purple-500">✓</span> Priority AI Server Access
              </div>
              <div className="flex items-center gap-3 text-xs text-white/80 font-semibold">
                <span className="text-purple-500">✓</span> Full Commercial Rights
              </div>
              <div className="flex items-center gap-3 text-xs text-white/80 font-semibold">
                <span className="text-purple-500">✓</span> Character Consistency Engine
              </div>
            </div>
            <button className="w-full py-5 bg-purple-600 hover:bg-purple-500 text-white font-black rounded-2xl text-[10px] uppercase tracking-widest transition-all shadow-xl shadow-purple-900/40">Upgrade to Pro</button>
          </motion.div>

          {/* ELITE TIER (Coming Soon) */}
          <motion.div 
            whileHover={{ y: -8 }} 
            className="glass-panel p-10 rounded-[3.5rem] border-cyan-500/10 relative group overflow-hidden bg-black/40"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/5 via-transparent to-pink-500/5 opacity-50"></div>
            <h4 className="text-cyan-400/50 font-black text-[9px] uppercase tracking-widest mb-3">Next-Gen Studio</h4>
            <h2 className="text-4xl manga-font text-white/40 mb-2 uppercase tracking-tight">Studio Elite</h2>
            <p className="text-cyan-400 font-black text-[10px] uppercase mb-8 animate-pulse">Coming Soon</p>
            
            <div className="space-y-4 mb-10 opacity-30">
              <div className="flex items-center gap-3 text-xs text-white/60">
                <span className="text-cyan-400">✧</span> AI Anime Animation Engine
              </div>
              <div className="flex items-center gap-3 text-xs text-white/60">
                <span className="text-cyan-400">✧</span> Motion Manga Scene Export
              </div>
              <div className="flex items-center gap-3 text-xs text-white/60">
                <span className="text-cyan-400">✧</span> Dynamic Voice Synthesis (TTS)
              </div>
              <div className="flex items-center gap-3 text-xs text-white/60">
                <span className="text-cyan-400">✧</span> Real-time Collaborative Board
              </div>
              <div className="flex items-center gap-3 text-xs text-white/60">
                <span className="text-cyan-400">✧</span> Cinematic Video Overlays
              </div>
            </div>

            <div className="w-full py-4 border border-white/5 bg-white/5 rounded-2xl text-center">
              <span className="text-[9px] font-black uppercase tracking-[0.4em] text-white/10">Join Waitlist</span>
            </div>
          </motion.div>
        </div>

        {/* Project List */}
        <div className="space-y-12 pb-20">
          <div className="flex items-center gap-6">
             <div className="w-12 h-1.5 bg-gradient-to-r from-lime-500 to-purple-500 rounded-full"></div>
             <h3 className="manga-font text-6xl text-white uppercase tracking-tight">Your Manga</h3>
          </div>
          
          {projects.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-32 glass-panel rounded-[4rem] border-white/5 flex flex-col items-center justify-center text-center px-10 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none"></div>
              <h4 className="text-white/20 font-black uppercase tracking-[0.4em] text-sm mb-8">No Active Projects in the Matrix</h4>
              <button 
                onClick={onCreateNew} 
                className="px-10 py-5 border border-lime-500/20 text-lime-400 hover:bg-lime-500 hover:text-black transition-all rounded-3xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-lime-500/5"
              >
                Initialize New Project
              </button>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {projects.map((project, idx) => (
                <motion.div 
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  onClick={() => onSelectProject(project)}
                  className="group glass-panel p-10 rounded-[3.5rem] hover:neon-border-lime transition-all cursor-pointer relative overflow-hidden bg-black/40"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-lime-500/5 rounded-full blur-3xl group-hover:bg-lime-500/10 transition-colors"></div>
                  <h3 className="text-4xl font-black text-white mb-6 group-hover:text-lime-400 transition-colors tracking-tight uppercase leading-none">{project.title}</h3>
                  <div className="flex flex-wrap gap-2 mb-10">
                    {project.genres.slice(0, 2).map(g => (
                      <span key={g} className="text-[8px] text-cyan-400/60 font-black uppercase tracking-widest border border-white/5 px-3 py-1.5 rounded-full bg-white/5">{g}</span>
                    ))}
                    {project.genres.length > 2 && <span className="text-[8px] text-white/20 font-black uppercase py-1.5">+ {project.genres.length - 2} more</span>}
                  </div>
                  <div className="flex justify-between items-center pt-6 border-t border-white/5">
                     <span className="text-[9px] text-white/20 font-black uppercase tracking-widest">{project.panels.length} PANELS</span>
                     <span className="text-[9px] text-lime-500/50 font-black uppercase tracking-widest">{project.style.split(' ')[0]} STYLE</span>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
