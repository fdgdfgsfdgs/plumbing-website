import { motion } from 'motion/react';
import { Star, Quote, CheckCircle2 } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Homeowner',
    content: "QuickFlow saved us from a major kitchen flood late on a Tuesday night. They arrived in 40 minutes and fixed the issue perfectly. Highly recommend!",
    rating: 5,
    image: 'https://i.pravatar.cc/150?u=sarah'
  },
  {
    name: 'Michael Chen',
    role: 'Property Manager',
    content: "I've used several plumbing companies for my properties, but QuickFlow is by far the most professional and reliable. Pricing is transparent and work is top-notch.",
    rating: 5,
    image: 'https://i.pravatar.cc/150?u=michael'
  },
  {
    name: 'Emma Williams',
    role: 'Homeowner',
    content: "Excellent service! They installed a new tankless water heater for us. The technicians were clean, polite, and explained everything. My energy bills are already down.",
    rating: 5,
    image: 'https://i.pravatar.cc/150?u=emma'
  }
];

export default function Testimonials() {
  return (
    <div id="testimonials" className="py-16 px-8 lg:px-12 bg-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 p-12 opacity-5">
        <Quote className="w-64 h-64 text-slate-900" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row items-end justify-between gap-12 mb-16">
          <div className="max-w-2xl text-left">
            <h2 className="text-primary-600 font-bold uppercase tracking-widest text-sm mb-4">Customer Stories</h2>
            <h3 className="text-4xl md:text-5xl font-bold font-display text-slate-900 mb-6">
              Hear Why Our Local Neighbors <br /> Trust QuickFlow
            </h3>
          </div>
          <div className="flex items-center gap-4 bg-slate-50 p-6 rounded-3xl border border-slate-100">
            <div className="flex items-center gap-1 text-secondary-500">
              <Star className="w-6 h-6 fill-current" />
              <Star className="w-6 h-6 fill-current" />
              <Star className="w-6 h-6 fill-current" />
              <Star className="w-6 h-6 fill-current" />
              <Star className="w-6 h-6 fill-current" />
            </div>
            <div>
              <p className="font-bold text-slate-900">4.9 / 5.0 Rating</p>
              <p className="text-sm text-slate-500 font-medium">From 1,200+ Reviews</p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-slate-50 border border-slate-100 p-10 rounded-[2.5rem] relative group hover:bg-white hover:shadow-2xl transition-all duration-500"
            >
              <div className="flex items-center gap-1 text-secondary-500 mb-6">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>
              
              <p className="text-lg text-slate-700 italic mb-8 leading-relaxed">
                "{t.content}"
              </p>
              
              <div className="flex items-center gap-4 mt-auto">
                <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-primary-100 p-0.5">
                  <img src={t.image} alt={t.name} className="w-full h-full object-cover rounded-full" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 flex items-center gap-2">
                    {t.name}
                    <CheckCircle2 className="w-4 h-4 text-blue-500" />
                  </h4>
                  <p className="text-sm text-slate-500 font-medium">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-16 bg-primary-600 rounded-[3rem] p-8 lg:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <h4 className="text-2xl font-bold mb-2">Join Our List of Happy Customers</h4>
            <p className="text-primary-100">Read more reviews on Google, Yelp, and Angi.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-6 opacity-80 font-display font-black text-2xl italic tracking-tighter">
            <span>GOOGLE</span>
            <span>YELP</span>
            <span>ANGI</span>
          </div>
        </div>
      </div>
    </div>
  );
}
