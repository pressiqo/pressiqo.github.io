import React, { useState } from 'react';
import { Check, X } from 'lucide-react';
import { motion } from 'framer-motion';

const Pricing: React.FC = () => {
  const [isAnnual, setIsAnnual] = useState(true);

  const tiers = [
    {
      name: "Starter",
      description: "Perfect for individuals and hobbyists.",
      price: isAnnual ? "0" : "0",
      period: "/forever",
      cta: "Start for Free",
      ctaVariant: "outline",
      features: [
        "1 WordPress Site",
        "Bring your own API Key",
        "Standard GPT-4o Mini Support",
        "50 AI Articles / month",
        "Manual Publishing",
        "Community Support",
      ],
      notIncluded: [
        "Bulk Generation",
        "LinkedIn & X Auto-posting",
        "Internal Link Building",
      ]
    },
    {
      name: "Pro",
      description: "For serious bloggers and niche site builders.",
      price: isAnnual ? "29" : "39",
      period: "/month",
      popular: true,
      cta: "Get Started",
      ctaVariant: "primary",
      features: [
        "5 WordPress Sites",
        "Bring your own API Key",
        "All Models (Gemini, Claude, GPT-4)",
        "Unlimited AI Articles",
        "One-Click Publishing",
        "Bulk CSV Import",
        "Internal Link Suggestions",
        "Priority Email Support",
      ],
      notIncluded: [
        "White-label Reports",
      ]
    },
    {
      name: "Agency",
      description: "For agencies managing client portfolios.",
      price: isAnnual ? "99" : "129",
      period: "/month",
      cta: "Contact Sales",
      ctaVariant: "outline",
      features: [
        "Unlimited WordPress Sites",
        "Bring your own API Key",
        "All Models + Fine-tuning",
        "Unlimited AI Articles",
        "Social Media Auto-Pilot",
        "Team Collaboration (5 Seats)",
        "White-label Reports",
        "Dedicated Account Manager",
        "API Access",
      ],
      notIncluded: []
    }
  ];

  return (
    <section id="pricing" className="py-24 bg-slate-950 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 blur-[120px] rounded-full opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-base font-semibold text-blue-500 tracking-wide uppercase mb-2">Pricing</h2>
          <h3 className="text-3xl md:text-5xl font-bold text-white mb-6">Simple, transparent pricing.</h3>
          <p className="text-slate-400 text-lg mb-8">
            Choose the plan that fits your content needs. No hidden fees. Cancel anytime.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4">
            <span className={`text-sm font-medium ${!isAnnual ? 'text-white' : 'text-slate-500'}`}>Monthly</span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className="relative w-14 h-8 rounded-full bg-slate-800 border border-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-950"
            >
              <div
                className={`absolute top-1 left-1 w-6 h-6 rounded-full bg-blue-500 transition-transform ${
                  isAnnual ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
            <span className={`text-sm font-medium ${isAnnual ? 'text-white' : 'text-slate-500'}`}>
              Yearly <span className="text-blue-400 text-xs ml-1">(Save 20%)</span>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tiers.map((tier, idx) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className={`relative flex flex-col p-8 rounded-2xl border ${
                tier.popular 
                  ? 'bg-slate-900/80 border-blue-500/50 shadow-2xl shadow-blue-900/20' 
                  : 'bg-slate-900/30 border-slate-800'
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-lg">
                  Most Popular
                </div>
              )}

              <div className="mb-6">
                <h4 className="text-xl font-bold text-white mb-2">{tier.name}</h4>
                <p className="text-slate-400 text-sm h-10">{tier.description}</p>
              </div>

              <div className="mb-8 flex items-end gap-1">
                <span className="text-4xl font-bold text-white">${tier.price}</span>
                <span className="text-slate-500 mb-1">{tier.period}</span>
              </div>

              <a
                href={tier.name === "Agency" ? "mailto:sales@pressiqo.app" : "https://app.pressiqo.app"}
                target="_blank"
                className={`w-full py-3 px-6 rounded-xl text-sm font-semibold transition-all mb-8 flex items-center justify-center ${
                  tier.ctaVariant === 'primary'
                    ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/20'
                    : 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700'
                }`}
              >
                {tier.cta}
              </a>

              <div className="flex-grow space-y-4">
                {tier.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-blue-500 flex-shrink-0" />
                    <span className="text-sm text-slate-300">{feature}</span>
                  </div>
                ))}
                {tier.notIncluded.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3 opacity-50">
                    <X className="w-5 h-5 text-slate-600 flex-shrink-0" />
                    <span className="text-sm text-slate-500">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;