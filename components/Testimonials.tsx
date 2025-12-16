import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    quote: "Pressiqo completely changed our workflow. We went from publishing 5 articles a week to 50, without sacrificing quality. The AI semantic linking is a massive time-saver.",
    author: "Sarah Jenkins",
    role: "Content Manager",
    company: "TechFlow Media",
    image: "./assets/mahros.jpg"
  },
  {
    quote: "The local-first approach is a game changer for us. knowing my API keys and draft data stay on my machine gives me peace of mind that other cloud tools couldn't offer.",
    author: "Michael Ross",
    role: "Senior SEO Specialist",
    company: "GrowthSpike",
    image: "./assets/mahros.jpg"
  },
  {
    quote: "Best investment for my niche sites. The bulk generation feature paid for itself in day one. I can spin up a topical authority map in minutes.",
    author: "Elena Dragan",
    role: "Niche Site Builder",
    company: "Portfolio Ventures",
    image: "./assets/mahros.jpg"
  }
];

const Testimonials: React.FC = () => {
  return (
    <section className="py-24 bg-slate-950 relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-base font-semibold text-blue-500 tracking-wide uppercase mb-2">Testimonials</h2>
          <h3 className="text-3xl md:text-5xl font-bold text-white mb-6">Loved by SEOs and Writers alike.</h3>
          <p className="text-slate-400 text-lg">
            Join thousands of content creators who are scaling their publishing with Pressiqo.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 p-8 rounded-2xl hover:border-slate-700 transition-colors relative group"
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-8 opacity-10 group-hover:opacity-20 transition-opacity">
                <Quote size={48} className="text-blue-500 fill-current" />
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                ))}
              </div>

              {/* Quote Text */}
              <blockquote className="text-slate-300 leading-relaxed mb-8 relative z-10">
                "{item.quote}"
              </blockquote>

              {/* Author Info */}
              <div className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.author}
                  className="w-12 h-12 rounded-full border-2 border-slate-800 object-cover"
                />
                <div>
                  <div className="font-semibold text-white">{item.author}</div>
                  <div className="text-sm text-slate-500">
                    {item.role}, <span className="text-blue-400">{item.company}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;