
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
    <div className="min-h-screen p-6 lg:p-12 overflow-y-auto custom-scrollbar speed-lines">
      <div className="max-w-7xl mx-auto space-y-20">
        {/* Branding Header */}
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row justify-between items-center gap-8 border-b border-white/10 pb-16"
        >
          <div className="flex flex-col gap-2 text-center md:text-left">
            <h1 className="manga-font text-9xl text-white tracking-tighter leading-none neon-text-lime">
              DADOAI <span className="text-lime-400">STUDIO</span>
            </h1>
            <p className="text-cyan-400 font-black uppercase tracking-[0.6em] text-sm italic">
              Professional Manga Engineering Suite
            </p>
          </div>
          <button 
            onClick={onCreateNew}
            className="group relative bg-lime-500 hover:bg-lime-400 text-black font-black px-16 py-7 rounded-[2.5rem] text-sm uppercase tracking-[0.3em] transition-all hover:scale-105 shadow-[0_0_50px_rgba(163,230,53,0.4)]"
          >
            <span className="relative z-10 flex items-center gap-4">
              <span className="text-2xl">+</span> Start New Story
            </span>
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity rounded-[2.5rem]"></div>
          </button>
        </motion.header>

        {/* Subscription Tiers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* FREE TIER */}
          <motion.div whileHover={{ y: -10 }} className="glass-panel p-12 rounded-[4rem] border-white/5 relative group overflow-hidden bg-gradient-to-br from-white/5 to-transparent">
            <h4 className="text-white/40 font-black text-[10px] uppercase tracking-widest mb-4">Entry Level</h4>
            <h2 className="text-5xl manga-font text-white mb-2 uppercase">Free Pass</h2>
            <p className="text-lime-400/50 text-xs font-bold uppercase mb-8">€0 / Forever</p>
            <div className="space-y-4 mb-12">
              <p className="text-xs text-white/60 flex items-center gap-3"><span className="text-lime-400">✓</span> 5 Manga Pages</p>
              <p className="text-xs text-white/60 flex items-center gap-3"><span className="text-lime-400">✓</span> Standard Rendering</p>
            </div>
            <button className="w-full py-5 bg-white/5 border border-white/10 rounded-3xl text-[10px] font-black uppercase tracking-widest text-white/20">Active Plan</button>
          </motion.div>

          {/* PRO TIER */}
          <motion.div whileHover={{ y: -10 }} className="glass-panel p-12 rounded-[4rem] border-lime-500/30 relative group overflow-hidden bg-gradient-to-br from-lime-500/10 to-transparent ring-1 ring-lime-500/20 shadow-xl">
            <div className="absolute top-8 right-8 bg-lime-500 text-black font-black text-[9px] px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg">Popular</div>
            <h4 className="text-lime-400 font-black text-[10px] uppercase tracking-widest mb-4">Professional</h4>
            <h2 className="text-5xl manga-font text-white mb-2 uppercase">Pro Mangaka</h2>
            <p className="text-lime-400 text-xs font-bold uppercase mb-8">€12.99 / Month</p>
            <div className="space-y-4 mb-12">
              <p className="text-xs text-white/80 flex items-center gap-3"><span className="text-lime-400">✓</span> Unlimited AI Pages</p>
              <p className="text-xs text-white/80 flex items-center gap-3"><span className="text-lime-400">✓</span> High-Res 4K Render</p>
              <p className="text-xs text-white/80 flex items-center gap-3"><span className="text-lime-400">✓</span> Priority Core Access</p>
            </div>
            <button className="w-full py-5 bg-lime-500 text-black font-black rounded-3xl text-[10px] font-black uppercase tracking-widest hover:bg-lime-400 transition-all shadow-xl shadow-lime-500/20">Upgrade Now</button>
          </motion.div>

          {/* ELITE TIER - COMING SOON */}
          <motion.div 
            whileHover={{ y: -15, scale: 1.02 }} 
            className="glass-panel p-12 rounded-[4rem] elite-tier relative group overflow-hidden bg-gradient-to-br from-yellow-500/20 via-black/40 to-black/80 shimmer-effect shadow-2xl"
          >
            <div className="absolute top-8 right-8 bg-yellow-500 text-black font-black text-[9px] px-5 py-2 rounded-full uppercase tracking-[0.2em] shadow-2xl z-20">COMING SOON</div>
            
            <h4 className="text-yellow-500 font-black text-[10px] uppercase tracking-[0.4em] mb-4 neon-text-gold">Production House</h4>
            <h2 className="text-6xl manga-font text-white mb-2 uppercase tracking-tighter">Studio Elite</h2>
            <p className="text-yellow-200/40 text-xs font-bold uppercase mb-8 italic">The Ultimate Advantage</p>
            
            <div className="space-y-5 mb-12 relative z-10">
              <p className="text-xs text-white flex items-center gap-4 group-hover:translate-x-2 transition-transform duration-300">
                <span className="w-6 h-6 rounded-full bg-yellow-500/20 flex items-center justify-center text-yellow-500 text-[10px]">★</span> 
                AI-Powered Team Hub
              </p>
              <p className="text-xs text-white flex items-center gap-4 group-hover:translate-x-2 transition-transform duration-300 delay-75">
                <span className="w-6 h-6 rounded-full bg-yellow-500/20 flex items-center justify-center text-yellow-500 text-[10px]">★</span> 
                Video & Motion Manga
              </p>
              <p className="text-xs text-white flex items-center gap-4 group-hover:translate-x-2 transition-transform duration-300 delay-150">
                <span className="w-6 h-6 rounded-full bg-yellow-500/20 flex items-center justify-center text-yellow-500 text-[10px]">★</span> 
                Direct Studio API
              </p>
              <p className="text-xs text-white flex items-center gap-4 group-hover:translate-x-2 transition-transform duration-300 delay-200">
                <span className="w-6 h-6 rounded-full bg-yellow-500/20 flex items-center justify-center text-yellow-500 text-[10px]">★</span> 
                Full IP Ownership Rights
              </p>
            </div>

            <div className="w-full py-6 bg-yellow-500/5 border border-yellow-500/20 rounded-3xl flex flex-col items-center justify-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-yellow-500">Waitlist Open</span>
                <span className="text-[9px] text-white/30 uppercase font-bold">Limited Studio Slots</span>
            </div>

            {/* Background elements for Elite tier */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-yellow-500/10 rounded-full blur-3xl group-hover:bg-yellow-500/20 transition-all duration-1000"></div>
          </motion.div>
        </div>

        {/* Project List */}
        <div className="space-y-12">
          <div className="flex items-center gap-6">
             <div className="w-16 h-2 bg-lime-500 rounded-full shadow-[0_0_15px_rgba(163,230,53,0.5)]"></div>
             <h3 className="manga-font text-6xl text-white uppercase tracking-tight">Project Portfolio</h3>
          </div>
          
          {projects.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-40 glass-panel rounded-[5rem] border-white/5 flex flex-col items-center justify-center text-center px-10 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/5"></div>
              <div className="relative z-10">
                <h4 className="text-4xl text-white font-black uppercase mb-6 tracking-tighter">Your Studio is Silent</h4>
                <p className="text-white/30 text-xs font-bold uppercase tracking-[0.4em] max-w-lg mb-12 leading-relaxed italic">
                  Launch your first production cycle and see your characters come to life with professional AI rendering.
                </p>
                <button 
                  onClick={onCreateNew} 
                  className="px-10 py-5 border-2 border-lime-500/30 text-lime-400 hover:bg-lime-500 hover:text-black transition-all rounded-3xl font-black text-xs uppercase tracking-widest"
                >
                  Create Project Matrix
                </button>
              </div>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 pb-20">
              {projects.map((project, idx) => (
                <motion.div 
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  onClick={() => onSelectProject(project)}
                  className="group glass-panel p-12 rounded-[5rem] hover:border-lime-500/50 transition-all cursor-pointer relative overflow-hidden shadow-2xl bg-black/40"
                >
                  <div className="absolute top-0 right-0 p-12 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-12 h-12 bg-lime-500 rounded-2xl flex items-center justify-center text-black">
                       <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" /></svg>
                    </div>
                  </div>
                  <h3 className="text-5xl font-black text-white mb-8 group-hover:text-lime-400 transition-colors tracking-tight uppercase leading-none">{project.title}</h3>
                  <div className="flex flex-wrap gap-2 mb-12">
                    {project.genres.slice(0, 3).map(g => (
                      <span key={g} className="text-[10px] text-cyan-400 font-black uppercase tracking-widest border border-cyan-500/20 px-5 py-2 rounded-full bg-cyan-500/5">{g}</span>
                    ))}
                  </div>
                  <div className="pt-10 border-t border-white/5 flex justify-between items-center">
                    <span className="text-[11px] text-white/30 font-black uppercase tracking-[0.3em]">{project.panels.length} PAGES READY</span>
                    <div className="flex -space-x-3">
                      {project.characters.slice(0, 3).map(c => (
                        <div key={c.id} className="w-12 h-12 rounded-xl bg-zinc-900 border-2 border-black overflow-hidden shadow-lg">
                           {c.portraitUrl ? <img src={c.portraitUrl} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-lime-400 font-black">{c.name[0]}</div>}
                        </div>
                      ))}
                    </div>
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
