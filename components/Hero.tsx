import React from 'react';
import { PlayCircle, Lock, Cpu, Globe, Rocket } from 'lucide-react';
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-blue-600/20 blur-[120px] rounded-full opacity-30 pointer-events-none" />
      <div className="absolute top-20 right-0 w-[300px] h-[300px] bg-purple-600/20 blur-[100px] rounded-full opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-medium text-blue-400 mb-6"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            v2.0 Now Live on Pressiqo.app
          </motion.div>

          {/* Headline */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6 leading-[1.1]"
          >
            Automate Your WordPress <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              Content Workflow
            </span>{' '}
            in the Cloud.
          </motion.h1>

          {/* Subheadline */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            Generate, optimize, and publish SEO-ready articles securely from your browser.
            No subscriptions, no data leaks. Bring your own API keys.
          </motion.p>

          {/* CTAs */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <a 
              href="https://app.pressiqo.app"
              target="_blank"
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-xl text-lg font-medium transition-all shadow-lg shadow-blue-600/25 hover:shadow-blue-600/40 transform hover:-translate-y-1"
            >
              <Rocket className="w-5 h-5" />
              Start for Free
            </a>
            <a 
              href="https://www.youtube.com/@pressiqo" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-lg font-medium text-slate-300 border border-slate-700 hover:border-slate-500 hover:text-white hover:bg-slate-900 transition-all"
            >
              <PlayCircle className="w-5 h-5" />
              Watch Demo
            </a>
          </motion.div>

          {/* Trust Badges */}
          <motion.div 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ duration: 0.5, delay: 0.4 }}
             className="flex items-center justify-center gap-6 text-sm text-slate-500 mb-20"
          >
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4" />
              <span>AES-256 Local Encryption</span>
            </div>
            <div className="hidden sm:flex w-px h-4 bg-slate-800"></div>
            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4" />
              <span>Multi-LLM Support</span>
            </div>
            <div className="hidden sm:flex w-px h-4 bg-slate-800"></div>
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4" />
              <span>No Installation Required</span>
            </div>
          </motion.div>
        </div>

        {/* Mock Interface */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="relative mx-auto max-w-6xl"
        >
          <div className="rounded-xl border border-slate-800 bg-slate-900 shadow-2xl overflow-hidden aspect-video relative group">
             {/* Window Controls & URL Bar */}
             <div className="h-10 bg-slate-950 border-b border-slate-800 flex items-center px-4 gap-4">
               <div className="flex gap-2">
                 <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
                 <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
                 <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
               </div>
               {/* Browser Address Bar */}
               <div className="flex-1 max-w-2xl mx-auto bg-slate-900 rounded-md border border-slate-800 h-6 flex items-center justify-center text-[11px] text-slate-400 font-mono tracking-wide">
                 <Lock className="w-3 h-3 mr-2 text-green-500/80" /> https://pressiqo.app/dashboard
               </div>
               <div className="w-12"></div> {/* Spacer for balance */}
             </div>
             
             {/* Dashboard Content Mockup */}
             <div className="w-full h-full bg-slate-950 p-6 flex gap-6">
                {/* Sidebar */}
                <div className="w-16 flex flex-col items-center gap-6 border-r border-slate-900 pt-4 hidden md:flex">
                  <div className="w-8 h-8 rounded-lg bg-blue-600/20 text-blue-500 flex items-center justify-center"><Cpu size={18}/></div>
                  <div className="w-8 h-8 rounded-lg text-slate-600 flex items-center justify-center"><Globe size={18}/></div>
                </div>
                
                {/* Main Area */}
                <div className="flex-1 space-y-6">
                   <div className="flex justify-between items-center">
                     <div>
                       <h3 className="text-xl font-semibold text-slate-200">Content Queue</h3>
                       <p className="text-sm text-slate-500">Managing 3 active campaigns</p>
                     </div>
                     <div className="flex gap-2">
                       <button className="px-3 py-1.5 bg-blue-600 text-white text-xs rounded-md font-medium">New Campaign</button>
                     </div>
                   </div>

                   {/* Stats Cards */}
                   <div className="grid grid-cols-3 gap-4">
                     {[
                       { label: 'Published', val: '124', color: 'text-green-400' },
                       { label: 'Pending', val: '45', color: 'text-yellow-400' },
                       { label: 'Drafts', val: '12', color: 'text-slate-400' }
                     ].map((stat, i) => (
                       <div key={i} className="bg-slate-900/50 border border-slate-800 p-4 rounded-lg">
                         <div className="text-xs text-slate-500 mb-1">{stat.label}</div>
                         <div className={`text-2xl font-bold ${stat.color}`}>{stat.val}</div>
                       </div>
                     ))}
                   </div>

                   {/* List */}
                   <div className="space-y-2">
                      {[1, 2, 3].map((item) => (
                        <div key={item} className="flex items-center justify-between p-3 bg-slate-900/30 border border-slate-800/60 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded bg-slate-800 flex items-center justify-center text-xs font-mono text-slate-500">WP</div>
                            <div>
                              <div className="text-sm text-slate-300 font-medium">Top 10 AI Tools for 2024</div>
                              <div className="text-xs text-slate-600">Generated via Gemini Pro 1.5 • 2 mins ago</div>
                            </div>
                          </div>
                          <div className="text-xs text-green-500 bg-green-500/10 px-2 py-1 rounded">Published</div>
                        </div>
                      ))}
                   </div>
                </div>
             </div>

             {/* Overlay Gradient for depth */}
             <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-50 pointer-events-none"></div>
          </div>
          
          {/* Glow effect under the mock */}
          <div className="absolute -inset-4 bg-blue-500/10 blur-2xl -z-10 rounded-full opacity-50"></div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;