/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import EmergencyBanner from './components/EmergencyBanner';
import Testimonials from './components/Testimonials';
import BookingForm from './components/BookingForm';
import AreasServed from './components/AreasServed';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import AdminDashboard from './components/AdminDashboard';
import AdminLogin from './components/AdminLogin';
import { Shield, Clock, CheckCircle, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { auth } from './lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';

export default function App() {
  const [view, setView] = useState<'home' | 'admin'>('home');
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Basic hash-based "routing" for the agent to navigate easily
    const handleHash = () => {
      if (window.location.hash === '#admin') {
        setView('admin');
      } else {
        setView('home');
      }
    };
    window.addEventListener('hashchange', handleHash);
    handleHash();
    
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
    });
    
    return () => {
      window.removeEventListener('hashchange', handleHash);
      unsubscribe();
    };
  }, []);

  if (view === 'admin') {
    return (
      <div className="min-h-screen bg-slate-50 selection:bg-primary-100 selection:text-primary-900">
        {!user ? <AdminLogin /> : <AdminDashboard />}
      </div>
    );
  }

  return (
    <div className="min-h-screen font-sans selection:bg-primary-100 selection:text-primary-900">
      <Navbar />
      
      <main className="max-w-7xl mx-auto space-y-8 pb-24">
        <Hero />
        
        <div className="px-4 sm:px-6 lg:px-8 grid grid-cols-12 gap-8">
          {/* Trust Signals Bento Cards */}
          <div className="col-span-12 lg:col-span-8 bento-card p-10 flex flex-col justify-center">
             <div className="grid sm:grid-cols-2 gap-10">
               {[
                 { icon: Shield, title: 'Licensed & Insured', sub: 'Safe & Reliable' },
                 { icon: Clock, title: '24/7 Availability', sub: 'Emergency Experts' },
                 { icon: CheckCircle, title: 'Upfront Pricing', sub: 'No Hidden Fees' },
                 { icon: Shield, title: '100% Satisfaction', sub: 'Service Guaranteed' }
               ].map((item, i) => (
                 <div key={i} className="flex items-center gap-6 group">
                   <div className="w-14 h-14 bg-primary-50 rounded-2xl flex items-center justify-center text-primary-600 transition-colors group-hover:bg-primary-600 group-hover:text-white">
                     <item.icon className="w-7 h-7" />
                   </div>
                   <div>
                     <p className="font-black text-slate-900 text-lg uppercase tracking-tight">{item.title}</p>
                     <p className="text-[10px] text-slate-400 uppercase tracking-[0.2em] font-bold mt-0.5">{item.sub}</p>
                   </div>
                 </div>
               ))}
             </div>
          </div>

          <div className="col-span-12 lg:col-span-4 bg-primary-600 rounded-[2rem] p-10 text-white flex flex-col justify-between shadow-xl shadow-primary-600/20">
             <div>
               <h4 className="text-3xl font-black font-display leading-tight mb-4">Plumbing Emergency?</h4>
               <p className="text-primary-100 font-medium leading-relaxed">Active leak or burst pipe? Our dispatchers are standing by to send an expert to your door in 60 minutes or less.</p>
             </div>
             <a href="tel:1-800-PLUMBING" className="mt-8 bg-white text-primary-700 w-full py-4 rounded-xl font-black text-center uppercase tracking-widest text-sm hover:bg-primary-50 transition-colors">
               Call Dispatch Now
             </a>
          </div>

          {/* Services Card */}
          <div className="col-span-12 bento-card p-0">
             <Services />
          </div>

          {/* About & Trust Combo */}
          <div className="col-span-12 lg:col-span-7 bento-card p-12">
            <h2 className="text-primary-600 font-bold uppercase tracking-widest text-xs mb-4">Expertise Matters</h2>
            <h3 className="text-4xl font-black font-display text-slate-900 mb-8 tracking-tight">Expert Plumbing with a <br /> Personal Touch</h3>
            <div className="space-y-6">
              {[
                { title: 'Clean & Tidy Work', desc: 'We always wear boot covers and use drop cloths.' },
                { title: 'Modern Equipment', desc: 'Latest diagnostic tools to find problems fast.' }
              ].map((benefit, i) => (
                <div key={i} className="flex gap-5 p-6 rounded-2xl bg-slate-50 border border-slate-100">
                  <CheckCircle className="w-6 h-6 text-primary-600 flex-shrink-0" />
                  <div>
                    <p className="font-bold text-slate-900 mb-1">{benefit.title}</p>
                    <p className="text-sm text-slate-500 font-medium">{benefit.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="col-span-12 lg:col-span-5 bento-card-dark p-0 relative min-h-[300px]">
            <img 
              src="https://images.unsplash.com/photo-1542013936693-884638332954?auto=format&fit=crop&q=80&w=800" 
              className="w-full h-full object-cover opacity-60"
              alt="team"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent p-10 flex flex-col justify-end">
              <p className="text-5xl font-black text-white italic tracking-tighter mb-2">15+</p>
              <p className="text-xs font-bold text-slate-300 uppercase tracking-widest leading-loose">Years of Service To the metropolitan area</p>
            </div>
          </div>

          {/* Testimonials */}
          <div className="col-span-12 bento-card p-0">
            <Testimonials />
          </div>

          {/* Booking & Areas */}
          <div className="col-span-12 bento-card p-0">
            <BookingForm />
          </div>

          <div className="col-span-12 bento-card p-0">
            <AreasServed />
          </div>
        </div>
      </main>

      <Footer />
      <EmergencyBanner sticky />
      <WhatsAppButton />
    </div>
  );
}

