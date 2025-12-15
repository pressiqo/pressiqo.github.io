import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Settings2, Rocket, ArrowRight } from 'lucide-react';

const steps = [
  {
    id: '01',
    title: "Connect Your Site",
    description: "Link your WordPress website securely using Application Passwords. No heavy plugins required on your site.",
    icon: <Globe className="w-6 h-6 text-blue-400" />,
    color: "blue"
  },
  {
    id: '02',
    title: "Configure AI",
    description: "Select your preferred model (Gemini 1.5, GPT-4o, or Claude). Paste your API key to keep costs low.",
    icon: <Settings2 className="w-6 h-6 text-purple-400" />,
    color: "purple"
  },
  {
    id: '03',
    title: "Generate & Publish",
    description: "Enter a keyword or upload a CSV. Pressiqo researches, writes, optimizes, and posts the content for you.",
    icon: <Rocket className="w-6 h-6 text-green-400" />,
    color: "green"
  }
];

const HowItWorks: React.FC = () => {
  return (
    <section id="how-it-works" className="py-24 bg-slate-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-base font-semibold text-blue-500 tracking-wide uppercase mb-2">Workflow</h2>
          <h3 className="text-3xl md:text-5xl font-bold text-white mb-6">From keyword to ranking in 3 steps.</h3>
          <p className="text-slate-400 text-lg">
            Complex SEO workflows simplified into a streamlined process.
          </p>
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Connector Line (Desktop) */}
          <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-blue-900/50 via-purple-900/50 to-green-900/50 z-0"></div>

          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.2 }}
              className="relative z-10 flex flex-col items-center text-center"
            >
              {/* Icon Bubble */}
              <div className={`w-24 h-24 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center mb-8 shadow-xl relative group transition-transform duration-300 hover:scale-105 hover:border-${step.color}-500/50`}>
                <div className={`absolute inset-0 bg-${step.color}-500/10 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity`}></div>
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 relative z-10">
                  {step.icon}
                </div>
                {/* Step Number Badge */}
                <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-bold text-slate-300">
                  {step.id}
                </div>
              </div>

              <h4 className="text-xl font-bold text-white mb-4">{step.title}</h4>
              <p className="text-slate-400 leading-relaxed max-w-sm">
                {step.description}
              </p>

              {/* Mobile Arrow (except last item) */}
              {idx !== steps.length - 1 && (
                <div className="md:hidden mt-8 text-slate-700">
                  <ArrowRight className="w-6 h-6 rotate-90" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;