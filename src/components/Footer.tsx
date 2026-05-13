import { Phone, Mail, MapPin, Facebook, Instagram, Twitter, Youtube, Star } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-slate-300 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Info */}
          <div className="space-y-6">
            <a href="#" className="flex items-center gap-2">
              <div className="bg-primary-600 p-2 rounded-lg">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="text-2xl font-bold font-display text-white">
                QuickFlow<span className="text-primary-500">Plumbing</span>
              </span>
            </a>
            <p className="text-slate-400 leading-relaxed">
              Your trusted local plumbing experts. Available 24/7 for all your residential and commercial plumbing needs. Licensed, insured, and dedicated to excellence.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-slate-900 hover:bg-primary-600 text-white rounded-full flex items-center justify-center transition-all">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-slate-900 hover:bg-primary-600 text-white rounded-full flex items-center justify-center transition-all">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-slate-900 hover:bg-primary-600 text-white rounded-full flex items-center justify-center transition-all">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-4">
              <li><a href="#services" className="hover:text-primary-400 transition-colors">Our Services</a></li>
              <li><a href="#about" className="hover:text-primary-400 transition-colors">About QuickFlow</a></li>
              <li><a href="#testimonials" className="hover:text-primary-400 transition-colors">Customer Reviews</a></li>
              <li><a href="#areas" className="hover:text-primary-400 transition-colors">Areas We Serve</a></li>
              <li><a href="#booking" className="hover:text-primary-400 transition-colors">Book Online</a></li>
              <li><a href="#admin" className="hover:text-primary-400 transition-colors">Admin Dashboard</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6">Get In Touch</h4>
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <Phone className="w-6 h-6 text-primary-500 flex-shrink-0" />
                <a href="tel:1-800-PLUMBING" className="hover:text-primary-400 transition-colors">
                  <span className="block font-bold text-white">1-800-PLUMBING</span>
                  <span className="text-sm text-slate-500 italic">24/7 Emergency Line</span>
                </a>
              </li>
              <li className="flex items-start gap-4">
                <Mail className="w-6 h-6 text-primary-500 flex-shrink-0" />
                <a href="mailto:help@quickflowplumbing.com" className="hover:text-primary-400 transition-colors">
                  <span className="block font-bold text-white">Email Us</span>
                  <span className="text-sm">help@quickflowplumbing.com</span>
                </a>
              </li>
              <li className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-primary-500 flex-shrink-0" />
                <address className="not-italic">
                  <span className="block font-bold text-white">Visit Us</span>
                  <span className="text-sm">123 Plumbing Way, Suite 100<br />City Name, State Zip</span>
                </address>
              </li>
            </ul>
          </div>

          {/* Trust Factors */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6">Google Reviews</h4>
            <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800">
              <div className="flex items-center gap-1 text-secondary-500 mb-3">
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
              </div>
              <p className="text-white font-bold text-2xl mb-1">4.9 / 5.0</p>
              <p className="text-sm text-slate-500 mb-4">Based on 1,284 local reviews</p>
              <div className="flex items-center gap-2 py-2 px-4 bg-white rounded-xl w-fit">
                <img src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png" alt="Google" className="h-4" referrerPolicy="no-referrer" />
                <span className="text-slate-900 font-black text-xs">Review Badge</span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-slate-900 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-sm text-slate-500">
            &copy; {currentYear} QuickFlow Plumbing. All rights reserved. Licensed & Insured #123456789.
          </p>
          <div className="flex gap-8 text-xs font-bold uppercase tracking-widest text-slate-600">
            <a href="#" className="hover:text-primary-500 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary-500 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-primary-500 transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
