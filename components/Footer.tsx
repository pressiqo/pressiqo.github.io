import React from 'react';
import { Zap, Github, Twitter, Mail, Youtube } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 pt-20 pb-10 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <Zap className="h-6 w-6 text-blue-500" />
              <span className="text-xl font-bold text-white">Pressiqo</span>
            </div>
            <p className="text-slate-400 max-w-sm mb-8">
              The professional's choice for AI content automation. 
              Secure, web-based, and built for high-volume WordPress publishers.
            </p>
            <div className="flex gap-4">
              <a href="https://www.youtube.com/@pressiqo" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-600 transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 rounded-full bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-600 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 rounded-full bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-600 transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 rounded-full bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-600 transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-6">Product</h4>
            <ul className="space-y-4">
              <li><a href="#features" className="text-slate-400 hover:text-blue-400 transition-colors">Features</a></li>
              <li><a href="#" className="text-slate-400 hover:text-blue-400 transition-colors">Integrations</a></li>
              <li><a href="#pricing" className="text-slate-400 hover:text-blue-400 transition-colors">Pricing</a></li>
              <li><a href="#" className="text-slate-400 hover:text-blue-400 transition-colors">Changelog</a></li>
              <li><a href="https://app.pressiqo.app" target="_blank" className="text-slate-400 hover:text-blue-400 transition-colors">Launch App</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-6">Legal</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-slate-400 hover:text-blue-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-slate-400 hover:text-blue-400 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-slate-400 hover:text-blue-400 transition-colors">Cookie Policy</a></li>
              <li><a href="#" className="text-slate-400 hover:text-blue-400 transition-colors">Licenses</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} Pressiqo Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <span className="text-sm text-slate-400">All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;