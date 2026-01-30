import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import VideoShowcase from './components/VideoShowcase';
import HowItWorks from './components/HowItWorks';
import Features from './components/Features';
import Gallery from './components/Gallery';
import Pricing from './components/Pricing';
import FAQ from './components/FAQ';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import StickyCTA from './components/StickyCTA';
import AIChatWidget from './components/AIChatWidget';
import DevNotice from './components/DevNotice';

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-200 font-sans">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <VideoShowcase />
        <HowItWorks />
        <Features />
        <Gallery />
        <Pricing />
        <FAQ />
        {/* <Testimonials /> */}
      </main>
      <Footer />
      <StickyCTA />
      <AIChatWidget />
      <DevNotice />
    </div>
  );
};

export default App;