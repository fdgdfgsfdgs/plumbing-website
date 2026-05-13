const areas = [
  'Downtown', 'North Hills', 'South Shore', 'East End', 'West Side',
  'Green Valley', 'River District', 'Central Station', 'Hilltop', 'Bay View',
  'Old Town', 'New Heights'
];

export default function AreasServed() {
  return (
    <div id="areas" className="py-16 px-8 lg:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2">
            <h2 className="text-primary-600 font-bold uppercase tracking-widest text-sm mb-4">Service Coverage</h2>
            <h3 className="text-4xl font-bold font-display text-slate-900 mb-6"> AREAS WE SERVE</h3>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              QuickFlow Plumbing provides premium services to residential and commercial clients across the entire metropolitan area. We have technicians stationed throughout these neighborhoods to ensure fast response times.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-8">
              {areas.map((area) => (
                <div key={area} className="flex items-center gap-3 group">
                  <div className="w-2 h-2 rounded-full bg-primary-500 group-hover:scale-150 transition-transform"></div>
                  <span className="text-slate-700 font-medium group-hover:text-primary-600 transition-colors uppercase text-xs tracking-wider">{area}</span>
                </div>
              ))}
            </div>

            <div className="mt-12 p-6 bg-primary-50 rounded-3xl border border-primary-100 italic text-primary-800">
               "Don't see your neighborhood? Give us a call anyway! We often expand our reach for major projects."
            </div>
          </div>

          <div className="lg:w-1/2 w-full h-[400px] bg-slate-100 rounded-[3rem] overflow-hidden relative shadow-inner">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center p-8 bg-white/80 backdrop-blur shadow-2xl rounded-3xl border border-white max-w-xs">
                <p className="font-bold text-slate-900 mb-2">Google Maps Integration</p>
                <p className="text-sm text-slate-500">In a production app, we would embed a live Google Map here centered on your service area.</p>
              </div>
            </div>
            {/* Simple Map Visualization */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
                <div className="w-full h-full bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:20px_20px]"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
