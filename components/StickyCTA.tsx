import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Rocket, PlayCircle } from 'lucide-react';

const StickyCTA: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show banner after scrolling past the Hero section (approx 600px)
      if (window.scrollY > 600) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (isDismissed) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-0 left-0 right-0 z-40 p-4 border-t border-slate-800 bg-slate-950/90 backdrop-blur-lg shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.5)]"
        >
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left flex-1">
              <h4 className="text-white font-semibold text-lg sm:text-base">Ready to scale your WordPress content?</h4>
              <p className="text-sm text-slate-400 hidden sm:block">Join thousands of creators automating their SEO workflow securely.</p>
            </div>
            
            <div className="flex items-center gap-3 sm:gap-6 w-full sm:w-auto justify-center">
               <a 
                href="https://www.youtube.com/@pressiqo" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hidden md:flex items-center gap-2 text-slate-300 hover:text-white text-sm font-medium transition-colors"
              >
                <PlayCircle className="w-4 h-4" />
                Watch Demo
              </a>
              
              <a 
                href="https://app.pressiqo.app"
                target="_blank" 
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-2.5 rounded-lg text-sm font-medium transition-all shadow-lg shadow-blue-600/20 hover:shadow-blue-600/40 hover:-translate-y-0.5"
              >
                <Rocket className="w-4 h-4" />
                Start for Free
              </a>
              
              <button 
                onClick={() => setIsDismissed(true)}
                className="p-2 -mr-2 text-slate-500 hover:text-slate-300 transition-colors rounded-full hover:bg-slate-800"
                aria-label="Close banner"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StickyCTA;