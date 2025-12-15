import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqs = [
  {
    question: "Do I need my own API keys?",
    answer: "Yes. Pressiqo is a 'Bring Your Own Key' (BYOK) platform. This ensures you pay the lowest possible price for AI generation directly to providers like OpenAI, Google, or Anthropic, without any markup from us."
  },
  {
    question: "Is my data secure?",
    answer: "Absolutely. Your API keys are encrypted using AES-256 standards. We never use your data to train models, and your content remains yours. Communication with WordPress happens directly via secure REST API."
  },
  {
    question: "Does it work with any WordPress site?",
    answer: "Yes, Pressiqo connects to self-hosted WordPress sites (.org) via the standard WordPress REST API or Application Passwords. It works with any theme or plugin setup."
  },
  {
    question: "Can I upgrade or downgrade later?",
    answer: "Yes, you can change your plan at any time from your dashboard. Prorated charges will be applied automatically based on your usage period."
  },
  {
    question: "What happens if I cancel?",
    answer: "If you cancel, you will retain access until the end of your current billing cycle. After that, your account will revert to the Free tier, preserving your data but limiting generation features."
  }
];

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 bg-slate-950 border-t border-slate-900/50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Frequently Asked Questions</h2>
          <p className="text-slate-400">Everything you need to know about Pressiqo.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-slate-800 rounded-lg bg-slate-900/30 overflow-hidden transition-all duration-200 hover:border-slate-700"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
              >
                <span className={`font-medium text-lg transition-colors ${openIndex === index ? 'text-blue-400' : 'text-slate-200'}`}>
                  {faq.question}
                </span>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-slate-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-slate-400" />
                )}
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-6 pb-6 text-slate-400 leading-relaxed border-t border-slate-800/50 pt-4">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;