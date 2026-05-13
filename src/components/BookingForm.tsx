import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Send, 
  CheckCircle2, 
  Calendar, 
  User, 
  Phone, 
  Mail, 
  MessageSquare,
  Wrench,
  Clock,
  MapPin
} from 'lucide-react';
import { db } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { handleFirestoreError, OperationType } from '../lib/firebaseUtils';

export default function BookingForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    address: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const leadsCol = collection(db, 'leads');
      await addDoc(leadsCol, {
        ...formData,
        status: 'New',
        createdAt: serverTimestamp()
      });
      setIsSubmitted(true);
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'leads');
    } finally {
      setIsSubmitting(false);
    }
  };

  const services = [
    'Emergency Repair',
    'Drain Cleaning',
    'Water Heater',
    'Leak Detection',
    'Kitchen/Bathroom',
    'Maintenance',
    'Other'
  ];

  return (
    <div id="booking" className="bg-white relative">
      <div className="max-w-7xl mx-auto">
        <div className="overflow-hidden">
          <div className="grid lg:grid-cols-5 h-full">
            
            {/* Left Content Column */}
            <div className="lg:col-span-2 bg-slate-900 p-10 lg:p-16 text-white flex flex-col justify-between relative overflow-hidden">
              {/* Background Accent */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary-600/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              
              <div className="relative z-10">
                <h2 className="text-primary-400 font-bold uppercase tracking-widest text-sm mb-6">Online Booking</h2>
                <h3 className="text-4xl font-bold font-display mb-8">
                  Schedule Your <br /> Service in Seconds
                </h3>
                
                <div className="space-y-8">
                  <div className="flex items-start gap-4">
                    <div className="mt-1 w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-primary-400 flex-shrink-0">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-bold text-lg">Fast Response</p>
                      <p className="text-slate-400">We respond to all online inquiries within 15 minutes during business hours.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="mt-1 w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-primary-400 flex-shrink-0">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-bold text-lg">Guaranteed Pricing</p>
                      <p className="text-slate-400">Transparent quotes with no hidden fees or surprise upcharges.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="mt-1 w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-primary-400 flex-shrink-0">
                      <Wrench className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-bold text-lg">Expert Technicians</p>
                      <p className="text-slate-400">Background-checked and certified plumbing professionals.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="relative z-10 mt-12 p-6 bg-white/5 rounded-3xl border border-white/10">
                <p className="text-slate-400 text-sm mb-2 uppercase font-bold tracking-widest">Need Immediate Help?</p>
                <a href="tel:1-800-PLUMBING" className="text-2xl font-bold text-white flex items-center gap-3 hover:text-primary-400 transition-colors">
                  <Phone className="w-6 h-6" />
                  1-800-PLUMBING
                </a>
              </div>
            </div>

            {/* Right Form Column */}
            <div className="lg:col-span-3 p-10 lg:p-16 relative">
              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-sm font-bold text-slate-700 ml-1">Full Name</label>
                          <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input 
                              type="text" 
                              required
                              placeholder="John Doe"
                              className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-primary-100 focus:border-primary-500 transition-all outline-none"
                              value={formData.name}
                              onChange={(e) => setFormData({...formData, name: e.target.value})}
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-bold text-slate-700 ml-1">Phone Number</label>
                          <div className="relative">
                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input 
                              type="tel" 
                              required
                              placeholder="(555) 000-0000"
                              className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-primary-100 focus:border-primary-500 transition-all outline-none"
                              value={formData.phone}
                              onChange={(e) => setFormData({...formData, phone: e.target.value})}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 ml-1">Email Address</label>
                        <div className="relative">
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                          <input 
                            type="email" 
                            required
                            placeholder="john@example.com"
                            className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-primary-100 focus:border-primary-500 transition-all outline-none"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 ml-1">Service Needed</label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          {services.map((s) => (
                            <button
                              key={s}
                              type="button"
                              onClick={() => setFormData({...formData, service: s})}
                              className={`py-3 px-2 text-xs font-bold rounded-xl border-2 transition-all ${
                                formData.service === s 
                                ? 'bg-primary-50 border-primary-600 text-primary-700' 
                                : 'bg-white border-slate-100 text-slate-500 hover:border-slate-300'
                              }`}
                            >
                              {s}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 ml-1">Service Address</label>
                        <div className="relative">
                          <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                          <input 
                            type="text" 
                            required
                            placeholder="123 Plumbing St, City"
                            className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-primary-100 focus:border-primary-500 transition-all outline-none"
                            value={formData.address}
                            onChange={(e) => setFormData({...formData, address: e.target.value})}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 ml-1">How can we help?</label>
                        <div className="relative">
                          <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-slate-400" />
                          <textarea 
                            rows={4}
                            required
                            placeholder="Describe your plumbing issue..."
                            className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-primary-100 focus:border-primary-500 transition-all outline-none resize-none"
                            value={formData.message}
                            onChange={(e) => setFormData({...formData, message: e.target.value})}
                          ></textarea>
                        </div>
                      </div>

                      <button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="w-full py-5 bg-primary-600 hover:bg-primary-700 text-white rounded-2xl font-bold text-lg shadow-xl shadow-primary-600/30 transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                          <>
                            <Send className="w-5 h-5" />
                            Book My Appointment
                          </>
                        )}
                      </button>
                      <p className="text-center text-xs text-slate-400 font-medium">
                        Secure Form. Your data is never shared with third parties.
                      </p>
                    </form>
                  </motion.div>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center text-center h-full py-20"
                  >
                    <div className="w-24 h-24 bg-green-50 text-green-500 rounded-full flex items-center justify-center mb-8">
                      <CheckCircle2 className="w-16 h-16" />
                    </div>
                    <h3 className="text-3xl font-bold text-slate-900 mb-4">Request Received!</h3>
                    <p className="text-slate-600 mb-8 max-w-sm">
                      Thank you, <span className="font-bold text-slate-950">{formData.name}</span>! Our team has received your request and will call you at <span className="font-bold text-slate-950">{formData.phone}</span> shortly.
                    </p>
                    <button 
                      onClick={() => setIsSubmitted(false)}
                      className="text-primary-600 font-bold hover:underline"
                    >
                      Send another request
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
