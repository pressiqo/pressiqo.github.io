import React from 'react';
import { Bot, Shield, FileStack, Database, Link2, Share2, Sparkles, Zap, Layers } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  {
    title: "Multi-LLM Support",
    description: "Switch between Gemini 1.5 Pro, OpenAI GPT-4, and Claude 3.5 Sonnet instantly. Use the best model for the job.",
    icon: <Bot className="w-6 h-6 text-blue-400" />,
    colSpan: "md:col-span-2",
  },
  {
    title: "Local-First Security",
    description: "Your API keys and data are encrypted locally (AES-256). Nothing touches our servers.",
    icon: <Shield className="w-6 h-6 text-green-400" />,
    colSpan: "md:col-span-1",
  },
  {
    title: "Workflow Blueprints",
    description: "Chain prompts together for complex workflows. Generate title > outline > intro > full content automatically.",
    icon: <Layers className="w-6 h-6 text-purple-400" />,
    colSpan: "md:col-span-1",
  },
  {
    title: "Bulk Generation",
    description: "Upload a CSV of keywords and generate hundreds of SEO-optimized posts in a single click.",
    icon: <Database className="w-6 h-6 text-amber-400" />,
    colSpan: "md:col-span-2",
  },
  {
    title: "Semantic Linking",
    description: "AI scans your existing posts and automatically inserts relevant internal links to boost SEO authority.",
    icon: <Link2 className="w-6 h-6 text-pink-400" />,
    colSpan: "md:col-span-1",
  },
  {
    title: "Social Sync",
    description: "Auto-generate and schedule LinkedIn posts and Tweets alongside your WordPress articles.",
    icon: <Share2 className="w-6 h-6 text-cyan-400" />,
    colSpan: "md:col-span-1",
  },
  {
    title: "SEO Optimization",
    description: "Built-in keyword density checker and meta description generator ensures green lights on Yoast/RankMath.",
    icon: <Sparkles className="w-6 h-6 text-yellow-400" />,
    colSpan: "md:col-span-1",
  },
];

const Features: React.FC = () => {
  return (
    <section id="features" className="py-24 bg-slate-950 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-[0.1]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-16 md:text-center max-w-3xl mx-auto">
          <h2 className="text-base font-semibold text-blue-500 tracking-wide uppercase mb-2">Powerful Features</h2>
          <h3 className="text-3xl md:text-5xl font-bold text-white mb-6">Everything you need to scale content.</h3>
          <p className="text-slate-400 text-lg">
            Stop copy-pasting from ChatGPT. Pressiqo brings the power of AI directly to your CMS with a workflow designed for publishers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className={`bg-slate-900/50 backdrop-blur-sm border border-slate-800 p-8 rounded-2xl hover:border-slate-700 transition-colors group ${feature.colSpan}`}
            >
              <div className="bg-slate-950 border border-slate-800 w-12 h-12 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h4 className="text-xl font-bold text-slate-100 mb-3">{feature.title}</h4>
              <p className="text-slate-400 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;