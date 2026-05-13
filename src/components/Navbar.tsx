import { useState, useEffect } from 'react';
import { Phone, Menu, X, Clock, Shield, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Services', href: '#services' },
    { name: 'About', href: '#about' },
    { name: 'Reviews', href: '#testimonials' },
    { name: 'Areas', href: '#areas' },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/80 backdrop-blur-md border-b border-slate-200 py-3 shadow-sm' : 'bg-transparent py-5 text-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <a href="#" className="flex items-center gap-3 group">
              <div className="bg-primary-700 p-2 rounded-xl group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className={`text-xl font-black font-display tracking-tight leading-none ${isScrolled ? 'text-slate-900' : 'text-white'}`}>
                  QuickFlow <span className="text-primary-600">Plumbing</span>
                </span>
                <span className={`text-[10px] uppercase tracking-[0.2em] font-bold mt-1 ${isScrolled ? 'text-slate-500' : 'text-white/60'}`}>
                  Fast • Reliable • 24/7
                </span>
              </div>
            </a>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className={`text-xs font-bold uppercase tracking-widest hover:text-primary-500 transition-colors ${
                  isScrolled ? 'text-slate-500' : 'text-white/90'
                }`}
              >
                {link.name}
              </a>
            ))}
            <div className="h-6 w-px bg-slate-200/20"></div>
            <a 
              href="tel:1-800-QUICKFLOW" 
              className={`flex items-center gap-2 text-sm font-black ${
                isScrolled ? 'text-primary-700' : 'text-white'
              }`}
            >
              <Phone className="w-4 h-4 fill-current" />
              (555) 012-3456
            </a>
            <a 
              href="#booking" 
              className="bg-primary-700 hover:bg-primary-800 text-white px-6 py-3 rounded-full font-bold shadow-lg shadow-primary-700/20 transition-all text-xs uppercase tracking-widest"
            >
              Book Online
            </a>
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden flex items-center gap-4">
            <a href="tel:1-800-PLUMBING" className={`p-2 rounded-full ${isScrolled ? 'bg-primary-50 text-primary-600' : 'bg-white/10 text-white'}`}>
              <Phone className="w-5 h-5" />
            </a>
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={isScrolled ? 'text-slate-900' : 'text-white'}
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-slate-100 overflow-hidden"
          >
            <div className="px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-lg font-medium text-slate-900"
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-4 flex flex-col gap-4">
                <a 
                  href="tel:1-800-PLUMBING" 
                  className="flex items-center justify-center gap-2 w-full py-4 bg-slate-50 text-primary-600 rounded-xl font-bold"
                >
                  <Phone className="w-5 h-5" />
                  Call 1-800-PLUMBING
                </a>
                <a 
                  href="#booking" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full py-4 bg-primary-600 text-white rounded-xl font-bold text-center"
                >
                  Book Online Now
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
