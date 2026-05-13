import { motion } from 'motion/react';
import { Phone, Clock, AlertCircle } from 'lucide-react';

export default function EmergencyBanner({ sticky = false }: { sticky?: boolean }) {
  if (sticky) {
    return (
      <footer className="fixed bottom-0 left-0 right-0 z-[60] bg-red-600 h-[60px] flex items-center justify-between px-6 lg:px-12 text-white overflow-hidden">
        <div className="flex items-center gap-4">
          <span className="flex h-3 w-3 relative">
            <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
          </span>
          <p className="font-bold uppercase tracking-[0.2em] text-[10px] md:text-sm">Emergency? We are on call right now!</p>
        </div>
        <div className="flex items-center gap-6 font-bold text-[10px] md:text-xs">
          <p className="hidden sm:block opacity-80 font-black uppercase tracking-widest">Licensed: #PL-982310</p>
          <div className="hidden sm:block h-4 w-px bg-red-400"></div>
          <p className="uppercase tracking-widest">24/7 Dispatch</p>
          <a href="tel:1-800-PLUMBING" className="bg-white text-red-600 px-6 py-2 rounded-full font-black uppercase tracking-widest text-[10px] hover:scale-105 transition-transform active:scale-95 whitespace-nowrap">
            Call Now
          </a>
        </div>
      </footer>
    );
  }

  return (
    <section className="bg-slate-900 overflow-hidden py-12 relative rounded-[2rem] border border-slate-800 my-8 mx-4 sm:mx-0">
      <div className="absolute top-0 bottom-0 left-0 w-2 bg-primary-600"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-6">
            <div className="relative">
              <div className="absolute -inset-2 bg-red-600 rounded-full blur opacity-25 animate-pulse"></div>
              <div className="relative bg-red-600 p-5 rounded-full text-white">
                <AlertCircle className="w-10 h-10" />
              </div>
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold font-display text-white mb-2 leading-tight">
                Plumbing Emergency?
              </h2>
              <p className="text-slate-400 text-lg">
                Active leak? Burst pipe? We arrive within <span className="text-white font-bold">60 minutes</span> or less.
              </p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-6 w-full lg:w-auto">
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 p-6 rounded-3xl flex items-center gap-4 w-full sm:w-auto">
              <Clock className="w-8 h-8 text-primary-50" />
              <div>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Available</p>
                <p className="text-white font-bold text-lg">24 Hours / 7 Days</p>
              </div>
            </div>
            
            <a 
              href="tel:1-800-PLUMBING" 
              className="group flex items-center justify-center gap-4 bg-primary-600 hover:bg-primary-700 text-white px-10 py-6 rounded-3xl font-bold text-2xl shadow-2xl shadow-primary-600/40 transition-all transform hover:scale-105 active:scale-95 w-full sm:w-auto"
            >
              <Phone className="w-8 h-8 group-hover:rotate-12 transition-transform" />
              1-800-PLUMBING
            </a>
          </div>
        </div>
      </div>
      
      {/* Decorative pulse effect */}
      <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-primary-600/5 rounded-full blur-3xl pointer-events-none"></div>
    </section>
  );
}
