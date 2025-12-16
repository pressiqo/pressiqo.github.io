import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Edit3, Workflow, ListOrdered } from 'lucide-react';

const tabs = [
  {
    id: 'editor',
    label: 'Split-Screen Editor',
    icon: <Edit3 className="w-4 h-4" />,
    title: 'Write and Refine in Real-Time',
    description: 'Chat with AI on the left, edit Markdown on the right. Changes sync instantly to your WordPress draft.',
    image: '/assets/screenshots/split-screen-editor.png'
  },
  {
    id: 'workflow',
    label: 'Workflow Builder',
    icon: <Workflow className="w-4 h-4" />,
    title: 'Visual Automation Builder',
    description: 'Drag and drop nodes to create custom content recipes. Chain research, writing, and SEO optimization steps.',
    image: '/assets/screenshots/workflows.png'
  },
  {
    id: 'queue',
    label: 'Queue Manager',
    icon: <ListOrdered className="w-4 h-4" />,
    title: 'Batch Processing Center',
    description: 'Monitor the status of hundreds of articles. Pause, resume, or retry failed generations with one click.',
    image: '/assets/screenshots/queue.png'
  }
];

const Gallery: React.FC = () => {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <section className="py-24 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">A Workspace Built for Writers.</h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Designed to feel as fast as a native app, right in your browser. Dark-mode first and distraction-free.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Tabs Navigation */}
          <div className="lg:w-1/3 flex flex-col gap-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab)}
                className={`flex items-start gap-4 p-6 rounded-xl border text-left transition-all duration-300 ${activeTab.id === tab.id
                  ? 'bg-slate-900 border-blue-600/50 shadow-lg shadow-blue-900/10'
                  : 'bg-transparent border-transparent hover:bg-slate-900/50 hover:border-slate-800'
                  }`}
              >
                <div className={`mt-1 p-2 rounded-lg ${activeTab.id === tab.id ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400'
                  }`}>
                  {tab.icon}
                </div>
                <div>
                  <h3 className={`font-semibold mb-1 ${activeTab.id === tab.id ? 'text-white' : 'text-slate-300'
                    }`}>
                    {tab.label}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    {tab.title}
                  </p>
                </div>
              </button>
            ))}
          </div>

          {/* Screenshot Display */}
          <div className="lg:w-2/3">
            <div className="relative rounded-2xl border border-slate-800 bg-slate-900 p-2 shadow-2xl overflow-hidden aspect-[4/3] lg:aspect-[16/10]">
              <div className="absolute top-0 left-0 w-full h-full bg-slate-950/50 z-0"></div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="relative z-10 w-full h-full rounded-xl overflow-hidden bg-slate-950"
                >
                  <img
                    src={activeTab.image}
                    alt={activeTab.title}
                    className="w-full h-full object-stretch"
                  />

                  {/* Overlay text for context */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-950 via-slate-950/90 to-transparent p-8 pt-20">
                    <h4 className="text-2xl font-bold text-white mb-2">{activeTab.title}</h4>
                    <p className="text-slate-300">{activeTab.description}</p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;