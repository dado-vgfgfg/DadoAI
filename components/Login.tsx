
import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleLogin = () => {
    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
      setTimeout(onLogin, 800);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-transparent relative overflow-hidden manga-dots">
      {/* Background Neon Orbs */}
      <div className="absolute top-[-20%] left-[-20%] w-[70%] h-[70%] bg-purple-500/10 rounded-full blur-[180px] animate-pulse"></div>
      <div className="absolute bottom-[-20%] right-[-20%] w-[70%] h-[70%] bg-lime-500/10 rounded-full blur-[180px] animate-pulse"></div>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="z-10 text-center space-y-12 p-16 lg:p-24 glass-panel rounded-[5rem] shadow-[0_0_100px_rgba(0,0,0,0.8)] max-w-2xl w-full border-white/5 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-lime-500/5 pointer-events-none"></div>

        <div className="space-y-10 relative z-10 flex flex-col items-center">
          <motion.div 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="manga-font text-9xl text-white tracking-tighter leading-none">
              Dado<span className="text-purple-500 neon-text-purple">AI</span>
            </h1>
          </motion.div>

          <div className="space-y-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="inline-block px-10 py-3 bg-black/40 text-purple-400 text-[9px] font-black uppercase tracking-[0.6em] rounded-full border border-purple-500/20"
            >
              Enterprise Studio v6.0
            </motion.div>
            <p className="text-white/30 font-black uppercase tracking-[0.4em] text-[10px] italic">
              Professional Manga Creation Environment
            </p>
          </div>
        </div>
        
        <div className="space-y-8 relative z-10 max-w-sm mx-auto">
          <button 
            onClick={handleLogin}
            disabled={status !== 'idle'}
            className={`w-full flex items-center justify-center gap-6 font-black py-8 px-12 rounded-[3rem] transition-all active:scale-95 shadow-2xl group relative overflow-hidden ${
              status === 'success' ? 'bg-purple-600 text-white shadow-purple-500/20' : 'bg-white text-black hover:bg-purple-100'
            }`}
          >
            {status === 'loading' ? (
              <div className="flex items-center gap-4">
                <div className="w-5 h-5 border-4 border-black border-t-transparent animate-spin rounded-full"></div>
                <span className="text-[11px] uppercase tracking-widest font-black">Booting...</span>
              </div>
            ) : status === 'success' ? (
              <span className="text-[11px] uppercase tracking-widest font-black">Authorized</span>
            ) : (
              <span className="text-[11px] uppercase tracking-widest font-black">Enter Studio</span>
            )}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
