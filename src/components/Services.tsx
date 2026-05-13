import { motion } from 'motion/react';
import { 
  AlertTriangle, 
  Droplets, 
  Thermometer, 
  Zap, 
  Trash2, 
  Wrench, 
  Home, 
  Search 
} from 'lucide-react';

const services = [
  {
    title: 'Emergency Plumbing',
    description: 'Burst pipes, overflowing toilets, or severe leaks? We are available 24/7.',
    icon: AlertTriangle,
    color: 'bg-red-50 text-red-600',
    image: 'https://images.unsplash.com/photo-1621905252507-b354bcadc4cf?auto=format&fit=crop&q=80&w=800'
  },
  {
    title: 'Drain Cleaning',
    description: 'Stubborn clogs? Our hydro jetting technology clears pipes fast and effectively.',
    icon: Droplets,
    color: 'bg-blue-50 text-blue-600',
    image: 'https://images.unsplash.com/photo-1558611848-73f7eb4001a1?auto=format&fit=crop&q=80&w=800'
  },
  {
    title: 'Water Heaters',
    description: 'Expert repair and installation of standard and tankless water heaters.',
    icon: Thermometer,
    color: 'bg-orange-50 text-orange-600',
    image: 'https://images.unsplash.com/photo-1585704032915-c3400ca1f963?auto=format&fit=crop&q=80&w=800'
  },
  {
    title: 'Leak Detection',
    description: 'Non-invasive technology to pinpoint leaks hidden behind walls or underground.',
    icon: Search,
    color: 'bg-purple-50 text-purple-600',
    image: 'https://images.unsplash.com/photo-1521207418485-99c705420785?auto=format&fit=crop&q=80&w=800'
  },
  {
    title: 'Kitchen & Bathroom',
    description: 'Full remodel support or simple fixture replacements and repairs.',
    icon: Home,
    color: 'bg-emerald-50 text-emerald-600',
    image: 'https://images.unsplash.com/photo-1584622171111-993a426fbf0a?auto=format&fit=crop&q=80&w=800'
  },
  {
    title: 'Sewer Line Repair',
    description: 'Trenchless sewer line solutions to fix major issues without ruining your lawn.',
    icon: Zap,
    color: 'bg-slate-50 text-slate-600',
    image: 'https://images.unsplash.com/photo-1542013936693-884638332954?auto=format&fit=crop&q=80&w=800'
  }
];

export default function Services() {
  return (
    <div id="services" className="py-16 px-8 lg:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary-600 font-bold uppercase tracking-widest text-sm mb-4"
          >
            Our Expertise
          </motion.h2>
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold font-display text-slate-900 mb-6"
          >
            Professional Solutions for Every Plumbing Need
          </motion.h3>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-600"
          >
            From simple repairs to complex technical installations, our team of licensed professionals is ready to handle any challenge.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative bg-white rounded-3xl p-8 shadow-md hover:shadow-2xl transition-all duration-300 border border-slate-100 flex flex-col h-full overflow-hidden"
            >
              {/* Card Header */}
              <div className="flex items-center justify-between mb-6">
                <div className={`p-4 rounded-2xl ${service.color} transition-transform group-hover:scale-110 duration-300`}>
                  <service.icon className="w-8 h-8" />
                </div>
                <div className="h-px bg-slate-100 flex-grow mx-4 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="text-slate-300 opacity-50 font-display text-2xl font-bold italic group-hover:text-primary-200 transition-colors">
                  0{index + 1}
                </div>
              </div>

              <h4 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-primary-600 transition-colors">
                {service.title}
              </h4>
              <p className="text-slate-600 mb-6 flex-grow leading-relaxed">
                {service.description}
              </p>

              <div className="mt-auto">
                <button className="flex items-center gap-2 text-primary-600 font-bold hover:gap-4 transition-all group/btn">
                  Learn More 
                  <Wrench className="w-4 h-4 group-hover/btn:rotate-12" />
                </button>
              </div>

              {/* Decorative Background Icon */}
              <service.icon className="absolute -bottom-10 -right-10 w-40 h-40 text-slate-50 opacity-0 group-hover:opacity-100 transition-opacity -z-0 pointer-events-none rotate-12" />
            </motion.div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-slate-500 font-medium mb-6">Need a custom service not listed here?</p>
          <a href="#booking" className="inline-flex items-center gap-3 text-slate-900 border-2 border-slate-900 px-8 py-4 rounded-2xl font-bold hover:bg-slate-900 hover:text-white transition-all">
            Inquire About Custom Services
          </a>
        </div>
      </div>
    </div>
  );
}
