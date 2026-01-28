
import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleGoogleLogin = () => {
    setStatus('loading');
    // Simulazione di un vero processo OAuth
    setTimeout(() => {
      setStatus('success');
      setTimeout(onLogin, 800);
    }, 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-transparent relative overflow-hidden manga-dots">
      <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] bg-lime-500/10 rounded-full blur-[160px] animate-pulse"></div>
      <div className="absolute bottom-[-20%] right-[-20%] w-[60%] h-[60%] bg-cyan-500/10 rounded-full blur-[160px] animate-pulse"></div>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="z-10 text-center space-y-12 p-16 lg:p-24 glass-panel rounded-[5rem] shadow-2xl max-w-2xl w-full border-white/5 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-lime-500/5 to-cyan-500/5 pointer-events-none"></div>

        <div className="space-y-6 relative z-10">
          <motion.div 
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            className="inline-block px-8 py-2.5 bg-lime-500/10 text-lime-400 text-[10px] font-black uppercase tracking-[0.5em] rounded-full border border-lime-500/20 mb-4"
          >
            Public Production Engine v4.0
          </motion.div>
          <h1 className="manga-font text-[10rem] text-white tracking-tighter leading-none neon-text-lime">
            DADO<span className="text-lime-400">AI</span>
          </h1>
          <p className="text-cyan-400 font-black uppercase tracking-[0.6em] text-xs italic">
            Professional Manga Suite
          </p>
        </div>
        
        <div className="pt-10 space-y-6 relative z-10">
          <button 
            onClick={handleGoogleLogin}
            disabled={status !== 'idle'}
            className={`w-full flex items-center justify-center gap-6 font-black py-7 px-10 rounded-[2.5rem] transition-all active:scale-95 shadow-2xl group relative overflow-hidden ${
              status === 'success' ? 'bg-lime-500 text-black' : 'bg-white text-black hover:bg-lime-400'
            }`}
          >
            {status === 'loading' ? (
              <div className="flex items-center gap-4">
                <div className="w-5 h-5 border-3 border-black border-t-transparent animate-spin rounded-full"></div>
                <span className="text-xs uppercase tracking-widest">Connecting to Google...</span>
              </div>
            ) : status === 'success' ? (
              <div className="flex items-center gap-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                <span className="text-xs uppercase tracking-widest">Accesso Eseguito</span>
              </div>
            ) : (
              <>
                <svg className="w-6 h-6" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                <span className="text-xs uppercase tracking-widest">Entra nel tuo Studio</span>
              </>
            )}
          </button>
          
          <p className="text-white/20 text-[9px] font-bold uppercase tracking-[0.3em] leading-loose max-w-sm mx-auto">
            Accedendo accetti i termini di servizio di DadoAImanga.com. I tuoi dati sono protetti da crittografia end-to-end.
          </p>
        </div>
        
        <div className="flex justify-between items-center text-white/10 text-[9px] uppercase font-black tracking-[0.4em] pt-12 border-t border-white/5 relative z-10">
           <span>DadoAImanga.com</span>
           <div className="flex gap-4">
             <div className="w-2 h-2 rounded-full bg-lime-500/20"></div>
             <div className="w-2 h-2 rounded-full bg-cyan-500/20"></div>
           </div>
           <span>© 2025 Studio</span>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
