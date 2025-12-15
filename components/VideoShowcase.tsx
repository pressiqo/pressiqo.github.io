import React from 'react';
import { Play } from 'lucide-react';
import { motion } from 'framer-motion';

const VideoShowcase: React.FC = () => {
  return (
    <section id="demo" className="py-20 bg-slate-950 border-t border-slate-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">See Pressiqo in Action.</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Watch how easily you can connect your WordPress site, configure your AI model, and start publishing high-ranking content in minutes.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative max-w-5xl mx-auto"
        >
          {/* Video Container */}
          <a 
            href="https://www.youtube.com/@pressiqo" 
            target="_blank" 
            rel="noopener noreferrer"
            className="block relative aspect-video bg-slate-900 rounded-2xl border border-slate-800 shadow-2xl shadow-blue-900/10 overflow-hidden group cursor-pointer"
          >
            {/* Placeholder for actual video or iframe */}
            <div className="absolute inset-0 flex items-center justify-center bg-slate-800/50 group-hover:bg-slate-800/40 transition-colors">
               <div className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center pl-1 shadow-lg shadow-blue-600/30 group-hover:scale-110 transition-transform duration-300">
                 <Play className="w-8 h-8 text-white fill-current" />
               </div>
            </div>
            {/* Simulate video poster */}
            <img 
              src="https://picsum.photos/seed/pressiqo-demo/1280/720" 
              alt="Pressiqo Dashboard Demo" 
              className="w-full h-full object-cover opacity-60 mix-blend-overlay"
            />
          </a>
          
          {/* Decorative Elements */}
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-600/20 blur-3xl rounded-full opacity-40"></div>
          <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-purple-600/20 blur-3xl rounded-full opacity-40"></div>
        </motion.div>
      </div>
    </section>
  );
};

export default VideoShowcase;