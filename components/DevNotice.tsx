import React, { useState } from 'react';
import { AlertTriangle, X, Github, Code, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const DevNotice: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 left-6 z-40 flex flex-col items-start gap-2 font-sans">
        {/* Expanded Content */}
        <AnimatePresence>
            {isExpanded && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 10, originY: 1 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 10 }}
                    className="mb-2 w-80 bg-slate-950/90 backdrop-blur-xl border border-yellow-500/20 rounded-2xl shadow-2xl p-5 ring-1 ring-black/50"
                >
                    <div className="flex items-start gap-3 mb-4">
                         <div className="p-2.5 bg-yellow-500/10 rounded-xl border border-yellow-500/10">
                            <Code className="w-5 h-5 text-yellow-500" />
                         </div>
                         <div className="flex-1">
                            <h4 className="text-white font-semibold text-sm tracking-tight">Development Preview</h4>
                            <p className="text-slate-400 text-xs mt-1 leading-relaxed">
                                Pressiqo is currently in active development. Features shown are for demonstration purposes.
                            </p>
                         </div>
                    </div>
                    
                    <div className="space-y-1 bg-slate-900/50 rounded-lg p-3 border border-slate-800/50 mb-4">
                        <div className="flex items-center justify-between text-xs py-1">
                             <span className="text-slate-500 font-medium">Build Version</span>
                             <span className="font-mono text-slate-300 bg-slate-800 px-1.5 py-0.5 rounded text-[10px]">v0.9.2-beta</span>
                        </div>
                         <div className="flex items-center justify-between text-xs py-1">
                             <span className="text-slate-500 font-medium">Environment</span>
                             <span className="flex items-center gap-1.5 text-green-400 font-medium">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.5)]"></span>
                                Live Demo
                             </span>
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <button 
                            onClick={() => setIsVisible(false)}
                            className="flex-1 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium rounded-lg transition-colors border border-slate-700 hover:border-slate-600"
                        >
                            Dismiss
                        </button>
                        <a 
                            href="https://github.com/pressiqo" 
                            target="_blank"
                            className="flex-1 flex items-center justify-center gap-2 py-2 bg-blue-600/10 hover:bg-blue-600/20 text-blue-400 text-xs font-medium rounded-lg transition-colors border border-blue-600/20 hover:border-blue-600/30"
                        >
                            <Github className="w-3.5 h-3.5" />
                            Contribute
                        </a>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>

        {/* Trigger Button */}
        <motion.button
            onClick={() => setIsExpanded(!isExpanded)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`group flex items-center gap-3 px-3.5 py-2.5 rounded-full border shadow-lg backdrop-blur-md transition-all duration-300 ${
                isExpanded 
                ? 'bg-yellow-500/10 border-yellow-500/50 text-yellow-500 shadow-yellow-900/10' 
                : 'bg-slate-900/80 border-slate-700/50 hover:border-yellow-500/30 text-slate-400 hover:text-yellow-500'
            }`}
        >
            <div className="flex items-center gap-2.5">
                <span className="relative flex h-2 w-2">
                  <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isExpanded ? 'bg-yellow-500' : 'bg-slate-500 group-hover:bg-yellow-500'}`}></span>
                  <span className={`relative inline-flex rounded-full h-2 w-2 ${isExpanded ? 'bg-yellow-500' : 'bg-slate-500 group-hover:bg-yellow-500'}`}></span>
                </span>
                <span className="text-[11px] font-bold uppercase tracking-wider">Preview Build</span>
            </div>
            
            <div className={`w-px h-3 ${isExpanded ? 'bg-yellow-500/30' : 'bg-slate-700'}`}></div>

            {isExpanded ? (
                 <X className="w-3.5 h-3.5 opacity-70" />
             ) : (
                 <Info className="w-3.5 h-3.5 opacity-70" />
             )}
        </motion.button>
    </div>
  );
};

export default DevNotice;