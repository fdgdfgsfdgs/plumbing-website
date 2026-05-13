import { useState, useEffect } from 'react';
import { db, auth } from '../lib/firebase';
import { collection, onSnapshot, query, orderBy, doc, updateDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LogOut, 
  Search, 
  Filter, 
  CheckCircle2, 
  Clock, 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  MessageSquare,
  Wrench,
  Trash2,
  ChevronDown,
  ExternalLink
} from 'lucide-react';
import { handleFirestoreError, OperationType } from '../lib/firebaseUtils';

interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  service: string;
  address: string;
  message: string;
  status: 'New' | 'Contacted' | 'Booked' | 'Closed';
  createdAt: any;
}

export default function AdminDashboard() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  useEffect(() => {
    const q = query(collection(db, 'leads'), orderBy('createdAt', 'desc'));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const leadsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Lead[];
      setLeads(leadsData);
      setLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'leads');
    });

    return () => unsubscribe();
  }, []);

  const handleStatusUpdate = async (leadId: string, newStatus: string) => {
    try {
      const leadRef = doc(db, 'leads', leadId);
      await updateDoc(leadRef, { 
        status: newStatus,
        updatedAt: serverTimestamp()
      });
      if (selectedLead?.id === leadId) {
        setSelectedLead(prev => prev ? { ...prev, status: newStatus as any } : null);
      }
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `leads/${leadId}`);
    }
  };

  const handleDelete = async (leadId: string) => {
    if (!window.confirm('Are you sure you want to delete this lead?')) return;
    try {
      await deleteDoc(doc(db, 'leads', leadId));
      setSelectedLead(null);
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `leads/${leadId}`);
    }
  };

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = 
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.phone.includes(searchTerm) ||
      lead.service.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'All' || lead.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'New': return 'bg-blue-100 text-blue-700';
      case 'Contacted': return 'bg-purple-100 text-purple-700';
      case 'Booked': return 'bg-green-100 text-green-700';
      case 'Closed': return 'bg-slate-100 text-slate-700';
      default: return 'bg-slate-50 text-slate-500';
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar - Desktop Only */}
      <aside className="w-80 bg-slate-950 text-white p-8 hidden lg:flex flex-col flex-shrink-0">
        <div className="flex items-center gap-3 mb-12">
          <div className="bg-primary-600 p-2 rounded-xl">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <span className="text-xl font-black font-display tracking-tight">Admin<span className="text-primary-500">Center</span></span>
        </div>

        <nav className="space-y-2 flex-grow">
          <button className="w-full flex items-center gap-3 bg-white/10 p-4 rounded-2xl font-bold transition-all text-primary-400">
            <User className="w-5 h-5" />
            Active Leads
          </button>
          <button className="w-full flex items-center gap-3 hover:bg-white/5 p-4 rounded-2xl font-bold transition-all text-slate-400">
            <Clock className="w-5 h-5" />
            History
          </button>
        </nav>

        <button 
          onClick={() => { signOut(auth); window.location.hash = ''; }}
          className="flex items-center gap-3 text-slate-500 hover:text-red-400 font-bold transition-all p-4"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-grow flex flex-col min-w-0 bg-slate-50 overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-slate-200 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-slate-900 leading-none">Dashboard</h1>
            <p className="text-sm font-bold text-slate-400 mt-1 uppercase tracking-widest">Managing {leads.length} Leads</p>
          </div>
          
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative flex-grow sm:w-64">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search leads..."
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-primary-100 focus:border-primary-500 transition-all outline-none text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <select 
                className="pl-9 pr-8 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-primary-100 focus:border-primary-500 transition-all outline-none text-sm appearance-none font-bold text-slate-600"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="All">All Status</option>
                <option value="New">New</option>
                <option value="Contacted">Contacted</option>
                <option value="Booked">Booked</option>
                <option value="Closed">Closed</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-grow overflow-hidden flex flex-col xl:flex-row">
          {/* Table Area */}
          <div className="flex-grow overflow-auto p-6 min-w-0">
            {loading ? (
              <div className="flex flex-col items-center justify-center h-full text-slate-400">
                <div className="w-12 h-12 border-4 border-primary-100 border-t-primary-600 rounded-full animate-spin mb-4"></div>
                <p className="font-bold">Syncing leads database...</p>
              </div>
            ) : filteredLeads.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-slate-400 bg-white rounded-3xl border-2 border-dashed border-slate-200">
                <Search className="w-12 h-12 mb-4 opacity-20" />
                <p className="font-bold">No leads found matching your criteria</p>
              </div>
            ) : (
              <div className="grid gap-4">
                {filteredLeads.map((lead) => (
                  <motion.div
                    key={lead.id}
                    layoutId={lead.id}
                    onClick={() => setSelectedLead(lead)}
                    className={`p-6 rounded-3xl border-2 transition-all cursor-pointer group flex flex-col md:flex-row md:items-center justify-between gap-6 ${
                      selectedLead?.id === lead.id 
                        ? 'bg-primary-50 border-primary-600 shadow-lg' 
                        : 'bg-white border-white hover:border-slate-200 shadow-sm'
                    }`}
                  >
                    <div className="flex items-center gap-5">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-lg ${getStatusColor(lead.status).split(' ')[0]}`}>
                        {lead.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h3 className="font-black text-slate-900 flex items-center gap-2 group-hover:text-primary-700 transition-colors">
                          {lead.name}
                          {lead.status === 'New' && <span className="w-2 h-2 bg-red-500 rounded-full"></span>}
                        </h3>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-0.5">{lead.service}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-4 text-sm font-medium text-slate-500">
                      <div className="flex items-center gap-2">
                        <Phone className="w-3.5 h-3.5" />
                        {lead.phone}
                      </div>
                      <div className="flex items-center gap-2 hidden sm:flex">
                        <Clock className="w-3.5 h-3.5" />
                        {lead.createdAt?.toDate ? lead.createdAt.toDate().toLocaleDateString() : 'Just now'}
                      </div>
                    </div>

                    <div className="flex items-center justify-between md:justify-end gap-4 min-w-[120px]">
                      <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-current bg-opacity-10 ${getStatusColor(lead.status)}`}>
                        {lead.status}
                      </span>
                      <ChevronDown className={`w-5 h-5 text-slate-300 md:hidden transition-transform ${selectedLead?.id === lead.id ? 'rotate-180' : ''}`} />
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Details Sidebar */}
          <AnimatePresence>
            {selectedLead && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="w-full xl:w-[450px] bg-white border-l border-slate-200 p-8 flex flex-col flex-shrink-0 overflow-auto z-20 absolute inset-0 xl:relative shadow-2xl xl:shadow-none"
              >
                <div className="flex items-center justify-between mb-10">
                  <span className="text-xs font-black uppercase tracking-widest text-slate-400">Lead Details</span>
                  <button 
                    onClick={() => setSelectedLead(null)}
                    className="p-2 hover:bg-slate-100 rounded-xl transition-colors xl:hidden"
                  >
                    < ChevronDown className="w-6 h-6 rotate-90" />
                  </button>
                </div>

                <div className="mb-10 text-center">
                  <div className={`w-24 h-24 rounded-[2rem] flex items-center justify-center font-black text-3xl mx-auto mb-6 ${getStatusColor(selectedLead.status).split(' ')[0]} ${getStatusColor(selectedLead.status).split(' ')[1]}`}>
                    {selectedLead.name.charAt(0).toUpperCase()}
                  </div>
                  <h2 className="text-3xl font-black text-slate-900 mb-2">{selectedLead.name}</h2>
                  <div className="flex items-center justify-center gap-2 text-primary-600 font-bold uppercase tracking-widest text-[10px]">
                    <Clock className="w-3.5 h-3.5" />
                    Received: {selectedLead.createdAt?.toDate ? selectedLead.createdAt.toDate().toLocaleString() : 'Recent'}
                  </div>
                </div>

                <div className="space-y-8 mb-10">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 flex-shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-widest font-black text-slate-400 mb-1">Phone</p>
                      <a href={`tel:${selectedLead.phone}`} className="font-bold text-slate-900 text-lg hover:text-primary-600 transition-colors">
                        {selectedLead.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 flex-shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-widest font-black text-slate-400 mb-1">Email</p>
                      <a href={`mailto:${selectedLead.email}`} className="font-bold text-slate-900 text-lg hover:text-primary-600 transition-colors">
                        {selectedLead.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 flex-shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-widest font-black text-slate-400 mb-1">Service Address</p>
                      <p className="font-bold text-slate-900">{selectedLead.address}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 flex-shrink-0">
                      <MessageSquare className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-widest font-black text-slate-400 mb-1">Message / Issue Details</p>
                      <p className="font-medium text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-100">
                        {selectedLead.message}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-auto pt-8 border-t border-slate-100 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    {(['New', 'Contacted', 'Booked', 'Closed'] as const).map((status) => (
                      <button
                        key={status}
                        onClick={() => handleStatusUpdate(selectedLead.id, status)}
                        className={`py-3 px-4 rounded-xl font-bold text-[10px] uppercase tracking-widest transition-all border-2 ${
                          selectedLead.status === status
                            ? 'bg-slate-900 border-slate-900 text-white shadow-lg'
                            : 'bg-white border-slate-100 text-slate-400 hover:border-slate-300'
                        }`}
                      >
                        {status}
                      </button>
                    ))}
                  </div>

                  <div className="flex gap-4">
                    <a 
                      href={`tel:${selectedLead.phone}`}
                      className="flex-grow flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white p-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-xl shadow-primary-600/20"
                    >
                      <Phone className="w-4 h-4" />
                      Call Lead
                    </a>
                    <button 
                      onClick={() => handleDelete(selectedLead.id)}
                      className="p-4 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white rounded-2xl transition-all"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
