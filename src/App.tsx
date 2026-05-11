import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Package, 
  ShieldCheck, 
  LayoutDashboard, 
  Users, 
  Trophy, 
  ArrowRight,
  MessageSquare,
  ChevronRight,
  Target,
  UserPlus,
  BarChart3,
  Trash2
} from "lucide-react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  PieChart,
  Pie
} from "recharts";
import { cn } from "./lib/utils";
import { INITIAL_RIDERS, SMART_MESSAGES } from "./constants";
import { RiderStats, RiderRank } from "./types";

// --- Components ---

const SplashScreen = ({ onFinish }: { onFinish: () => void; key?: string }) => {
  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-[#020617] flex flex-col items-center justify-center overflow-hidden"
    >
      <div className="absolute w-[800px] h-[800px] bg-primary/10 rounded-full blur-[150px] animate-pulse" />
      
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ 
          type: "spring",
          stiffness: 260,
          damping: 20 
        }}
        className="flex flex-col items-center relative z-10"
      >
        <motion.div 
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ 
            y: { duration: 2, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: 4, repeat: Infinity, ease: "easeInOut" }
          }}
          className="w-28 h-28 mb-10 relative"
        >
           <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="absolute inset-[-10px] border border-primary/30 rounded-[2.5rem] shadow-[0_0_20px_rgba(14,165,233,0.3)]"
           />
           <div className="absolute inset-0 bg-gradient-to-br from-primary to-blue-700 rounded-[2rem] flex items-center justify-center shadow-2xl">
              <Package className="w-12 h-12 text-white drop-shadow-[0_5px_15px_rgba(0,0,0,0.3)]" />
           </div>
        </motion.div>
        
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
          className="text-center"
        >
          <h1 className="text-5xl font-display font-black tracking-tighter text-white uppercase italic">
            Parcel<span className="text-primary glow-text">Pulse</span>
          </h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-6 text-slate-500 font-mono tracking-[0.4em] uppercase text-[10px] flex items-center justify-center gap-4"
          >
            <span className="h-px w-6 bg-slate-800"></span>
            MADE BY <span className="text-primary italic font-bold">JAY SHANKAR</span>
            <span className="h-px w-6 bg-slate-800"></span>
          </motion.p>
        </motion.div>
      </motion.div>
      
      <motion.div 
        className="absolute bottom-16 w-full max-w-[240px] h-1.5 bg-slate-900 rounded-full overflow-hidden border border-white/5"
      >
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 2, ease: "linear" }}
          onAnimationComplete={onFinish}
          className="h-full bg-gradient-to-r from-blue-600 via-primary to-cyan-400 shadow-[0_0_15px_rgba(14,165,233,0.5)]"
        />
      </motion.div>
    </motion.div>
  );
};

const Navbar = ({ activeTab, setActiveTab, onProfileClick }: { activeTab: string, setActiveTab: (t: string) => void, onProfileClick: () => void }) => {
  const tabs = [
    { id: "rider", label: "For Delivery Partners", icon: LayoutDashboard },
    { id: "leader", label: "For Team Leader", icon: Users },
  ];

  return (
    <nav className="h-16 flex items-center justify-between px-4 sm:px-8 bg-white/5 backdrop-blur-xl border-b border-white/10 z-50 sticky top-0">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-gradient-to-tr from-blue-600 to-cyan-400 rounded-lg shadow-[0_0_15px_rgba(59,130,246,0.5)] flex items-center justify-center">
          <Package className="w-5 h-5 text-white italic" />
        </div>
        <div className="hidden sm:flex flex-col gap-0">
          <span className="text-xl font-black tracking-tighter text-gradient-yb leading-none">
            PARCELPULSE
          </span>
          <span className="text-[8px] font-bold text-slate-500 uppercase tracking-widest ml-0.5 leading-none mt-1">
            By Jay Shankar
          </span>
        </div>
      </div>
      
      <div className="flex items-center gap-4 sm:gap-8 text-sm font-medium text-slate-400">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "relative pb-1 transition-colors hover:text-white",
                isActive ? "text-blue-400 border-b-2 border-blue-400" : ""
              )}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <div className="flex items-center gap-4 cursor-pointer group" onClick={onProfileClick}>
        <div className="text-right hidden md:block">
          <p className="text-xs font-bold leading-none text-white group-hover:text-blue-400 transition-colors">Sonu Thakur</p>
          <p className="text-[10px] text-slate-500 uppercase tracking-widest">Team Leader</p>
        </div>
        <div className="w-10 h-10 rounded-full border-2 border-primary/50 p-0.5 group-hover:border-primary transition-all">
          <div className="w-full h-full rounded-full bg-slate-800 flex items-center justify-center shadow-lg transition-transform group-hover:scale-95">
            <span className="text-xs font-bold">ST</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

// --- Subsections ---

const MetricCard = ({ 
  title, 
  value, 
  subtitle, 
  icon: Icon, 
  trend, 
  color = "primary" 
}: { 
  title: string; 
  value: string | number; 
  subtitle?: string; 
  icon: any; 
  trend?: { val: string; pos: boolean };
  color?: "primary" | "success" | "failure" | "accent";
}) => {
  const colorMap = {
    primary: "text-blue-400 border-blue-400/20 bg-blue-400/10",
    success: "text-emerald-400 border-emerald-400/20 bg-emerald-400/10",
    failure: "text-rose-400 border-rose-400/20 bg-rose-400/10",
    accent: "text-orange-400 border-orange-400/20 bg-orange-400/10",
  };

  return (
    <motion.div 
      whileHover={{ scale: 1.05, y: -5 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
      className="glass-card glass-card-hover p-6 flex flex-col justify-between"
    >
      <div className="flex justify-between items-start mb-4">
        <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110", colorMap[color])}>
          <Icon className="w-5 h-5" />
        </div>
        {trend && (
          <span className={cn(
            "text-[10px] font-bold px-2 py-1 rounded inline-flex items-center gap-1",
            trend.pos ? "bg-emerald-500/10 text-emerald-400" : "bg-rose-500/10 text-rose-400"
          )}>
            {trend.pos ? "+" : ""}{trend.val}
          </span>
        )}
      </div>
      <div>
        <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">{title}</p>
        <div className="flex items-baseline gap-2 mt-1">
          <p className="text-3xl font-bold tracking-tight text-white">{value}</p>
          {subtitle && <p className="text-[10px] text-slate-500 font-medium">{subtitle}</p>}
        </div>
      </div>
    </motion.div>
  );
};

const SuccessRing = ({ percentage }: { percentage: number }) => {
  const strokeDasharray = 283; 
  const offset = strokeDasharray - (percentage / 100) * strokeDasharray;

  return (
    <motion.div 
      whileHover={{ scale: 1.02, rotate: 1 }}
      transition={{ type: "spring", stiffness: 400, damping: 15 }}
      className="bg-white/5 border border-white/10 rounded-3xl p-6 flex items-center justify-center relative min-h-[220px]"
    >
      <div className="absolute top-4 left-6">
        <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">Success Rate</p>
      </div>
      <div className="relative w-36 h-36">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
          <motion.circle
            cx="50" cy="50" r="45"
            fill="none"
            stroke="url(#grad_success)"
            strokeWidth="8"
            strokeLinecap="round"
            initial={{ strokeDashoffset: strokeDasharray }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            style={{ strokeDasharray }}
          />
          <defs>
            <linearGradient id="grad_success" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-black text-white glow-text">{percentage.toFixed(0)}%</span>
          <span className="text-[8px] text-slate-500 font-bold uppercase tracking-widest">Performance</span>
        </div>
      </div>
    </motion.div>
  );
};

// --- Main Views ---

const RiderDashboard = () => {
  const [total, setTotal] = useState<string>("");
  const [delivered, setDelivered] = useState<string>("");
  const [randomMsg, setRandomMsg] = useState(SMART_MESSAGES[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRandomMsg(SMART_MESSAGES[Math.floor(Math.random() * SMART_MESSAGES.length)]);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const stats = useMemo(() => {
    const t = parseFloat(total) || 0;
    const d = parseFloat(delivered) || 0;
    const f = t - d > 0 ? t - d : 0;
    const s = t > 0 ? (d / t) * 100 : 0;

    let rank: RiderRank = "Needs Improvement";
    if (s >= 95) rank = "Elite Rider";
    else if (s >= 90) rank = "Pro Rider";
    else if (s >= 80) rank = "Fast Mover";

    return { total: t, delivered: d, failed: f, success: s, rank };
  }, [total, delivered]);

  return (
    <div className="max-w-[1400px] mx-auto px-4 py-8 grid lg:grid-cols-12 gap-4">
      {/* Sidebar: Calculator */}
      <div className="lg:col-span-3 space-y-4">
        <div className="glass-card p-6 flex flex-col gap-6 backdrop-blur-md min-h-[450px]">
          <div className="space-y-1">
            <h2 className="text-[10px] font-bold text-blue-400 uppercase tracking-[0.2em]">Parcel Simulation</h2>
            <p className="text-slate-400 text-[11px] font-medium italic">Precision Earnings Simulation</p>
          </div>
          
          <div className="space-y-6 flex-1">
            <div className="relative group">
              <label className="absolute left-4 -top-2 text-[9px] px-1 bg-background text-blue-400 font-bold uppercase tracking-widest z-10 transition-colors group-focus-within:text-white">TOTAL PARCELS</label>
              <input 
                type="number" 
                min="0"
                value={total}
                onChange={(e) => {
                  const val = e.target.value;
                  const numVal = Math.max(0, parseInt(val) || 0);
                  const currentDeliveredVal = parseInt(delivered) || 0;
                  setTotal(numVal.toString());
                  if (currentDeliveredVal > numVal) {
                    setDelivered(numVal.toString());
                  }
                }}
                onKeyDown={(e) => e.key === 'Enter' && (e.target as HTMLInputElement).blur()}
                placeholder="Enter total parcels" 
                className="futuristic-input w-full text-base"
              />
            </div>
            <div className="relative group">
              <label className="absolute left-4 -top-2 text-[9px] px-1 bg-background text-blue-400 font-bold uppercase tracking-widest z-10 transition-colors group-focus-within:text-white">DELIVERED PARCELS</label>
              <input 
                type="number"
                min="0"
                value={delivered}
                onChange={(e) => {
                  const val = e.target.value;
                  const numVal = Math.max(0, parseInt(val) || 0);
                  const totalLimit = parseInt(total) || 0;
                  if (numVal > totalLimit) {
                    setDelivered(totalLimit.toString());
                  } else {
                    setDelivered(numVal.toString());
                  }
                }}
                onKeyDown={(e) => e.key === 'Enter' && (e.target as HTMLInputElement).blur()}
                placeholder="Enter delivered parcels" 
                className="futuristic-input w-full text-base"
              />
            </div>
          </div>
        </div>

        <div className="bg-blue-600 rounded-3xl p-6 text-white flex flex-col justify-between shadow-[0_0_30px_rgba(59,130,246,0.3)] border border-blue-400/30 overflow-hidden relative group cursor-pointer">
          <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 blur-3xl rounded-full" />
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] opacity-80">Active Hub Status</p>
            <p className="text-sm mt-1 font-semibold flex items-center gap-2">
              <Target className="w-4 h-4" /> Hub: Chamba Hub
            </p>
          </div>
          <div className="flex items-center gap-2 mt-8">
            <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse shadow-[0_0_8px_white]"></div>
            <p className="text-[10px] font-bold italic uppercase tracking-tighter">Syncing performance metrics...</p>
          </div>
        </div>
      </div>

      {/* Main Grid: Stats & Ring */}
      <div className="lg:col-span-9 grid sm:grid-cols-2 gap-4">
        <MetricCard 
          title="TOTAL PARCELS" 
          value={stats.total} 
          subtitle="Simulated Load" 
          icon={Package} 
          color="primary" 
        />
        
        <SuccessRing percentage={stats.success} />

        <div className="glass-card p-6 flex flex-col justify-between group">
          <div>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">DELIVERY ATTEMPTS</p>
            <div className="flex items-baseline gap-2 mt-1">
              <p className="text-3xl font-bold tracking-tight text-white">{stats.delivered}</p>
              <p className="text-xs text-emerald-400 font-semibold">Successful drops</p>
            </div>
          </div>
          <div className="mt-4 h-1.5 bg-white/5 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${stats.success}%` }}
              className="h-full bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.6)]" 
            />
          </div>
        </div>

        <div className="glass-card p-6 flex flex-col justify-between group">
          <div>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">FAILED PARCELS</p>
            <div className="flex items-baseline gap-2 mt-1">
              <p className="text-3xl font-bold tracking-tight text-white">{stats.failed}</p>
              <p className="text-xs text-rose-400 font-semibold">Requires attention</p>
            </div>
          </div>
          <div className="mt-4 h-1.5 bg-white/5 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(100, (stats.failed / stats.total) * 100)}%` }}
              className="h-full bg-rose-500 shadow-[0_0_12px_rgba(239,68,68,0.6)]" 
            />
          </div>
        </div>

        <div className="sm:col-span-2 bg-gradient-to-br from-white/[0.07] to-transparent border border-white/10 rounded-3xl p-6 flex flex-col justify-center items-center text-center group">
          <div className="px-4 py-1.5 bg-slate-800/80 rounded-full border border-white/10 text-[9px] font-bold text-slate-400 mb-4 uppercase tracking-[0.2em] group-hover:border-primary/30 transition-colors">
            Current Status
          </div>
          <h3 className="text-xl font-bold tracking-tight text-white mb-2 italic">
            {stats.total > 0 ? stats.rank : "Awaiting Input..."}
          </h3>
          <p className="text-xs text-blue-400 font-medium italic animate-pulse">“{randomMsg}”</p>
        </div>

        {/* Bottom Wide Bento: What If Analysis */}
        <div className="sm:col-span-2 bg-gradient-to-br from-slate-900/50 to-background border border-white/10 rounded-3xl p-6 grid sm:grid-cols-2 gap-6">
          <div className="flex flex-col justify-center gap-1">
            <span className="text-[9px] text-blue-400 font-black uppercase tracking-[0.3em]">Universal Status Protocol</span>
            <h2 className="text-lg font-bold leading-tight">Zone Performance Simulation</h2>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col justify-center">
            <p className="text-[8px] text-slate-500 uppercase font-black tracking-widest">Ekart Hub Rank</p>
            <p className="text-2xl font-display font-black text-white tracking-tighter">#{stats.success > 95 ? "1" : stats.success > 90 ? "2" : stats.success > 80 ? "5" : "--"}</p>
            <p className="text-[9px] text-slate-400 italic mt-1 font-medium">Est. position in Zone</p>
          </div>
        </div>
      </div>
    </div>

  );
};

const ProfileModal = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md z-[70] p-4 sm:p-6"
          >
            <div className="glass-card bg-[#0f172a]/95 border-white/10 p-8 flex flex-col items-center">
              <button 
                onClick={onClose}
                className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors text-2xl"
              >
                ×
              </button>
              
              <div className="w-24 h-24 rounded-full border-4 border-primary/30 p-1 mb-6 relative">
                 <div className="w-full h-full rounded-full bg-slate-800 flex items-center justify-center shadow-2xl">
                    <span className="text-3xl font-black text-primary">ST</span>
                 </div>
                 <div className="absolute bottom-1 right-1 w-6 h-6 bg-emerald-500 rounded-full border-2 border-[#0f172a] shadow-lg animate-pulse" />
              </div>

              <div className="text-center mb-8">
                <h3 className="text-2xl font-black text-white tracking-tight uppercase">Sonu Thakur</h3>
                <div className="flex items-center justify-center gap-2 mt-1">
                  <span className="text-[10px] font-bold text-blue-400 uppercase tracking-[0.2em] px-2 py-0.5 bg-blue-500/10 rounded border border-blue-500/20">Team Leader</span>
                </div>
              </div>

              <div className="w-full grid grid-cols-2 gap-4 mb-8">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/5 text-center">
                  <p className="text-[9px] text-slate-500 font-bold uppercase mb-1 tracking-widest">Active Hub</p>
                  <p className="text-sm font-semibold text-white">Chamba Hub</p>
                </div>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/5 text-center">
                  <p className="text-[9px] text-slate-500 font-bold uppercase mb-1 tracking-widest">Global Rank</p>
                   <div className="flex items-center justify-center gap-1">
                    <Trophy className="w-3 h-3 text-amber-400" />
                    <p className="text-sm font-semibold text-white">#1</p>
                  </div>
                </div>
              </div>

              <a 
                href="https://wa.link/ouztin" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full flex items-center justify-between p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 hover:bg-emerald-500/25 transition-all group/contact mb-2"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400 group-hover/contact:scale-110 transition-transform">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-black text-slate-300 uppercase tracking-widest">Contact Team Leader</span>
                </div>
                <ChevronRight className="w-4 h-4 text-emerald-500 group-hover/contact:translate-x-1 transition-transform" />
              </a>

              <button 
                onClick={onClose}
                className="w-full mt-8 py-3 bg-primary text-white font-black uppercase tracking-[0.2em] rounded-xl shadow-[0_0_20px_rgba(14,165,233,0.3)] hover:scale-105 active:scale-95 transition-all text-[10px]"
              >
                Close Protocol
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// --- Team Leader Dashboard & Persistence ---

interface RiderHistory {
  date: string;
  total: number;
  delivered: number;
  failed: number;
  rate: number;
}

interface ManagedRider {
  id: string;
  name: string;
  history: RiderHistory[];
  joinedAt: string;
}

const TeamLeaderDashboard = () => {
  const [riders, setRiders] = useState<ManagedRider[]>(() => {
    const saved = localStorage.getItem('managed_riders');
    if (!saved) return [];
    
    // Prune history older than 7 days on load
    const parsedRiders: ManagedRider[] = JSON.parse(saved);
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    return parsedRiders.map(rider => ({
      ...rider,
      history: rider.history.filter(h => {
        // Handle potential edge cases with date formats
        try {
          const entryDate = new Date(h.date);
          return entryDate >= sevenDaysAgo;
        } catch (e) {
          return true; // Keep if date is unparseable to be safe
        }
      }).slice(0, 7) // Always keep max 7 items
    }));
  });
  const [newRiderName, setNewRiderName] = useState('');
  const [selectedRider, setSelectedRider] = useState<ManagedRider | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [riderInputs, setRiderInputs] = useState<Record<string, { total: string; delivered: string }>>({});

  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem('managed_riders', JSON.stringify(riders));
  }, [riders]);

  const addRider = () => {
    if (!newRiderName.trim()) return;
    const newRider: ManagedRider = {
      id: Date.now().toString(),
      name: newRiderName,
      history: [],
      joinedAt: new Date().toISOString()
    };
    setRiders([...riders, newRider]);
    setNewRiderName('');
    setShowAddForm(false);
  };

  const updateStats = (riderId: string, total: number, delivered: number) => {
    const date = new Date().toLocaleDateString();
    setRiders(prev => prev.map(rider => {
      if (rider.id === riderId) {
        const failed = Math.max(0, total - delivered);
        const rate = total > 0 ? (delivered / total) * 100 : 0;
        
        const newHistory = [...rider.history];
        const existingIndex = newHistory.findIndex(h => h.date === date);
        
        const entry = { date, total, delivered, failed, rate };
        
        if (existingIndex > -1) {
          newHistory[existingIndex] = entry;
        } else {
          newHistory.unshift(entry);
        }
        
        // Final sanity check: strictly keep only the latest 7 days
        const updatedHistory = newHistory.slice(0, 7);
        
        return { ...rider, history: updatedHistory };
      }
      return rider;
    }));
  };

  const deleteRider = (riderId: string) => {
    setRiders(prev => prev.filter(r => r.id !== riderId));
    if (selectedRider?.id === riderId) setSelectedRider(null);
    setDeletingId(null);
  };

  const getLatestStats = (rider: ManagedRider) => {
    return rider.history[0] || { delivered: 0, total: 0, rate: 0 };
  };

  const fleetStats = {
    total: riders.reduce((acc, r) => acc + (r.history[0]?.total || 0), 0),
    delivered: riders.reduce((acc, r) => acc + (r.history[0]?.delivered || 0), 0),
    avgRate: riders.length > 0 
      ? riders.reduce((acc, r) => acc + (r.history[0]?.rate || 0), 0) / riders.length 
      : 0
  };

  const sortedRiders = [...riders].sort((a, b) => getLatestStats(b).rate - getLatestStats(a).rate);

  return (
    <div className="max-w-[1400px] mx-auto px-4 py-8 space-y-8">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="text-4xl font-display font-black tracking-tighter uppercase italic">
            Strategic <span className="text-primary italic glow-text">Operations</span>
          </h2>
          <div className="flex items-center gap-2 mt-1">
            <p className="text-slate-500 font-mono text-[10px] uppercase tracking-[0.3em]">Field Logistics Protocol v2.5.0</p>
            <span className="text-[8px] bg-amber-500/10 text-amber-500 px-2 py-0.5 rounded-full border border-amber-500/20 font-black uppercase">
              7D Retention Active
            </span>
          </div>
        </div>
        
        <div className="flex flex-wrap items-center gap-4">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            onClick={() => setShowAddForm(true)}
            className="flex items-center gap-2 px-6 py-3 bg-primary/10 hover:bg-primary/20 border border-primary/20 rounded-2xl text-xs font-black uppercase tracking-widest transition-all group"
          >
            <UserPlus className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
            Add New Rider
          </motion.button>
        </div>
      </header>

      {/* Fleet Analysis Board (Top Section) */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-black text-slate-500 uppercase tracking-[0.3em] flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-primary" /> Strategic Fleet Operations
          </h3>
          <div className="flex items-center gap-4">
             <div className="flex items-center gap-2">
               <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
               <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">{riders.length} Agents Online</span>
             </div>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          <MetricCard 
            title="Assigned Load" 
            value={fleetStats.total} 
            subtitle="Total Parcels"
            icon={Package} 
            color="primary" 
          />
          <MetricCard 
            title="Fleet Fulfillment" 
            value={fleetStats.delivered} 
            subtitle="Successful Drops"
            icon={ShieldCheck} 
            color="success" 
          />
          <MetricCard 
            title="Success Cap" 
            value={`${fleetStats.avgRate.toFixed(1)}%`} 
            subtitle="Fleet Avg Rate"
            icon={Trophy} 
            color="primary" 
          />
        </div>

        {/* Quick Rider Summary Table */}
        <div className="glass-card overflow-hidden border-white/5 shadow-2xl">
          <div className="bg-white/5 px-6 py-4 border-b border-white/10 flex items-center justify-between">
            <h4 className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Agent Performance Protocol</h4>
            <span className="text-[8px] text-slate-500 font-bold uppercase tracking-[0.2em]">Real-time Sync Active</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/5 bg-black/40">
                  <th className="px-6 py-4 text-[9px] font-black text-slate-500 uppercase tracking-widest text-left">Field Agent</th>
                  <th className="px-6 py-4 text-[9px] font-black text-slate-500 uppercase tracking-widest text-center">Fulfillment</th>
                  <th className="px-6 py-4 text-[9px] font-black text-slate-500 uppercase tracking-widest text-right">Protocol Status</th>
                  <th className="px-6 py-4 text-[9px] font-black text-slate-500 uppercase tracking-widest text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {sortedRiders.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-slate-500 italic text-xs">No active agents in database. Use "Add New Rider" to initialize.</td>
                  </tr>
                ) : sortedRiders.map(r => {
                  const s = getLatestStats(r);
                  return (
                    <tr key={r.id} className="hover:bg-white/10 transition-all cursor-pointer group" onClick={() => setSelectedRider(r)}>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20 group-hover:bg-primary/20 transition-colors">
                            <span className="text-sm font-black text-primary">{r.name.charAt(0)}</span>
                          </div>
                          <div>
                            <p className="text-sm font-bold text-white group-hover:text-primary transition-colors">{r.name}</p>
                            <p className="text-[9px] text-slate-500 font-mono">NODE_{r.id.slice(-4)}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col items-center gap-1">
                          <div className="w-32 h-1.5 bg-slate-800 rounded-full overflow-hidden border border-white/5">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${s.rate}%` }}
                              className={cn(
                                "h-full transition-all",
                                s.rate >= 90 ? "bg-emerald-500" : s.rate >= 70 ? "bg-blue-500" : "bg-amber-500"
                              )} 
                            />
                          </div>
                          <span className="text-[9px] font-mono text-slate-500">{s.delivered}/{s.total}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className={cn(
                          "text-[10px] font-black px-3 py-1.5 rounded-lg border",
                          s.rate >= 90 ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : 
                          s.rate >= 80 ? "bg-blue-500/10 text-blue-400 border-blue-500/20" :
                          "bg-amber-500/10 text-amber-400 border-amber-500/20"
                        )}>
                          {s.rate >= 95 ? "ELITE" : s.rate >= 90 ? "OPTIMAL" : "STANDBY"} • {s.rate.toFixed(0)}%
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex justify-center items-center">
                          <AnimatePresence mode="wait">
                            {deletingId === r.id ? (
                              <motion.div 
                                key="confirm"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                className="flex items-center gap-1"
                              >
                                <button 
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    deleteRider(r.id);
                                  }}
                                  className="px-2 py-1 bg-rose-600 text-white text-[8px] font-black uppercase rounded shadow-lg"
                                >
                                  Confirm
                                </button>
                                <button 
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setDeletingId(null);
                                  }}
                                  className="px-2 py-1 bg-slate-700 text-white text-[8px] font-black uppercase rounded"
                                >
                                  X
                                </button>
                              </motion.div>
                            ) : (
                              <motion.button 
                                key="delete"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setDeletingId(r.id);
                                }}
                                className="p-2 rounded-lg bg-rose-500/10 text-rose-500 hover:bg-rose-500 hover:text-white transition-all border border-rose-500/20 active:scale-90"
                                title="Purge Agent"
                              >
                                <Trash2 className="w-4 h-4" />
                              </motion.button>
                            )}
                          </AnimatePresence>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Add Rider Form Modal */}
      <AnimatePresence>
        {showAddForm && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowAddForm(false)} className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100]" />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-sm glass-card border-primary/20 p-8 z-[101]">
              <h3 className="text-xl font-black mb-6 uppercase italic text-primary">New Security Link</h3>
              <input 
                type="text" 
                value={newRiderName}
                onChange={(e) => setNewRiderName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && newRiderName.trim()) {
                    addRider();
                  }
                }}
                placeholder="ENTER RIDER NAME..."
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm font-bold text-white placeholder:text-slate-600 focus:border-primary outline-none mb-6"
              />
              <div className="flex gap-4">
                <button onClick={() => setShowAddForm(false)} className="flex-1 py-3 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-white transition-colors">Abort</button>
                <button onClick={addRider} className="flex-1 py-3 bg-primary text-white text-[10px] font-black uppercase tracking-widest rounded-xl">Initialize</button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Riders Grid (Moved to Bottom) */}
      <section className="space-y-4">
        <h3 className="text-xs font-black text-slate-500 uppercase tracking-[0.3em] flex items-center gap-2">
          <Users className="w-4 h-4 text-primary" /> Active Field Agents
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedRiders.map((rider) => {
            const stats = getLatestStats(rider);
            const currentInputs = riderInputs[rider.id] || { total: '', delivered: '' };

            return (
              <motion.div 
                key={rider.id}
                layoutId={rider.id}
                whileHover={{ scale: 1.03, y: -5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="glass-card p-6 flex flex-col gap-6 relative group overflow-hidden border-white/5 hover:border-primary/30 transition-all"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-primary/10 transition-colors" />
                
                <div className="flex items-center justify-between relative z-10">
                  <div 
                    className="flex items-center gap-3 cursor-pointer"
                    onClick={() => setSelectedRider(rider)}
                  >
                    <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center border border-primary/30">
                      <span className="text-sm font-black text-primary">{rider.name.charAt(0)}</span>
                    </div>
                    <div>
                      <h4 className="text-lg font-black text-white group-hover:text-primary transition-colors">{rider.name}</h4>
                      <span className="text-[9px] text-slate-500 uppercase font-bold tracking-widest">ID: {rider.id.slice(-4)}</span>
                    </div>
                  </div>
                  <div className="text-right flex flex-col items-end gap-2">
                    <div>
                      <p className="text-[9px] text-emerald-400 font-bold uppercase tracking-widest">Success</p>
                      <p className="text-xl font-black text-white">{stats.rate.toFixed(1)}%</p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <AnimatePresence mode="wait">
                        {deletingId === rider.id ? (
                          <motion.div 
                            key="confirm-card"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="flex items-center gap-2"
                          >
                            <button 
                              onClick={(e) => { e.stopPropagation(); setDeletingId(null); }}
                              className="text-[9px] font-black text-slate-500 hover:text-white uppercase tracking-tighter"
                            >
                              No
                            </button>
                            <button 
                              onClick={(e) => { e.stopPropagation(); deleteRider(rider.id); }}
                              className="px-3 py-1 bg-rose-600 text-white text-[9px] font-black uppercase rounded-lg shadow-lg hover:bg-rose-500"
                            >
                              Confirm Delete
                            </button>
                          </motion.div>
                        ) : (
                          <motion.button 
                            key="delete-card"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={(e) => {
                              e.stopPropagation();
                              setDeletingId(rider.id);
                            }}
                            className="p-2 rounded-lg bg-rose-500/10 text-rose-500 hover:bg-rose-500 hover:text-white transition-all border border-rose-500/20 shadow-sm"
                            title="Delete Rider"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </motion.button>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>

                {/* Inline Input Section */}
                <div className="relative z-10 space-y-4 bg-white/5 p-4 rounded-2xl border border-white/5">
                  <div className="flex items-center justify-between">
                    <h5 className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Daily Log Entry</h5>
                    <span className="text-[10px] font-bold text-slate-400">ZONE {rider.id.slice(-2)} Sync</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[8px] text-slate-500 font-bold uppercase tracking-tighter ml-1">Total</label>
                      <input 
                        type="number"
                        min="0"
                        placeholder="0"
                        value={currentInputs.total}
                        onChange={(e) => {
                          const val = e.target.value;
                          const numericTotal = Math.max(0, parseInt(val) || 0);
                          const currentDelivered = parseInt(currentInputs.delivered) || 0;
                          
                          // If total is reduced below current delivered, cap delivered
                          const newDelivered = currentDelivered > numericTotal ? numericTotal.toString() : currentInputs.delivered;

                          setRiderInputs(prev => ({
                            ...prev,
                            [rider.id]: { total: numericTotal.toString(), delivered: newDelivered }
                          }));
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            const t = parseInt(currentInputs.total);
                            const d = parseInt(currentInputs.delivered);
                            if (!isNaN(t) && !isNaN(d)) {
                              updateStats(rider.id, t, d);
                              setRiderInputs(prev => ({
                                ...prev,
                                [rider.id]: { total: '', delivered: '' }
                              }));
                            }
                          }
                        }}
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-xs font-bold text-white outline-none focus:border-primary/50"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[8px] text-slate-500 font-bold uppercase tracking-tighter ml-1">Delivered</label>
                      <input 
                        type="number"
                        min="0"
                        placeholder="0"
                        value={currentInputs.delivered}
                        onChange={(e) => {
                          const val = e.target.value;
                          const numericDelivered = Math.max(0, parseInt(val) || 0);
                          const totalLimit = parseInt(currentInputs.total) || 0;
                          
                          // Enforce protocol: Delivered cannot exceed Total
                          const validatedVal = numericDelivered > totalLimit ? totalLimit.toString() : numericDelivered.toString();

                          setRiderInputs(prev => ({
                            ...prev,
                            [rider.id]: { ...currentInputs, delivered: validatedVal }
                          }));
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            const t = parseInt(currentInputs.total);
                            const d = parseInt(currentInputs.delivered);
                            if (!isNaN(t) && !isNaN(d)) {
                              updateStats(rider.id, t, d);
                              setRiderInputs(prev => ({
                                ...prev,
                                [rider.id]: { total: '', delivered: '' }
                              }));
                            }
                          }
                        }}
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-xs font-bold text-white outline-none focus:border-primary/50"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-end pt-2">
                    <button 
                      onClick={() => {
                        const t = parseInt(currentInputs.total);
                        const d = parseInt(currentInputs.delivered);
                        if (!isNaN(t) && !isNaN(d)) {
                          updateStats(rider.id, t, d);
                          setRiderInputs(prev => ({
                            ...prev,
                            [rider.id]: { total: '', delivered: '' }
                          }));
                        }
                      }}
                      className="px-6 py-2 bg-primary text-white text-[9px] font-black uppercase tracking-widest rounded-lg hover:scale-105 active:scale-95 transition-all shadow-[0_4px_10px_rgba(14,165,233,0.2)]"
                    >
                      Save Protocol
                    </button>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between text-[10px] relative z-10">
                  <span className="text-slate-500 font-black uppercase">Weekly Status</span>
                  <div className="flex gap-1">
                    {[...Array(7)].map((_, i) => (
                      <div key={i} className={`w-1.5 h-4 rounded-full ${rider.history[i] ? 'bg-emerald-500' : 'bg-white/5'}`} />
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>


      {/* Detailed Rider Stats Modal */}
      <AnimatePresence>
        {selectedRider && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedRider(null)} className="fixed inset-0 bg-black/90 backdrop-blur-lg z-[100]" />
            <motion.div 
              layoutId={selectedRider.id}
              className="fixed top-2 shadow-2xl overflow-y-auto max-h-[96vh] md:top-1/2 left-1/2 -translate-x-1/2 md:-translate-y-1/2 w-full max-w-2xl glass-card border-white/10 p-6 md:p-10 z-[101]"
            >
              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center shadow-[0_0_20px_rgba(14,165,233,0.3)]">
                    <span className="text-2xl font-black text-white">{selectedRider.name.charAt(0)}</span>
                  </div>
                  <div>
                    <h3 className="text-3xl font-black text-white uppercase italic">{selectedRider.name}</h3>
                    <p className="text-[10px] text-slate-500 uppercase tracking-[0.3em] font-black">History Overview</p>
                  </div>
                </div>
                <button onClick={() => setSelectedRider(null)} className="text-3xl text-slate-500 hover:text-white transition-colors">×</button>
              </div>

              {/* 7 Day Chart */}
              <div className="h-64 mb-8">
                <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Weekly Performance Arc</h4>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={[...selectedRider.history].reverse()}>
                    <defs>
                      <linearGradient id="colorRateDetail" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff05" />
                    <XAxis dataKey="date" stroke="#475569" fontSize={10} tickLine={false} axisLine={false} />
                    <YAxis stroke="#475569" fontSize={10} tickLine={false} axisLine={false} tickFormatter={(v) => `${v}%`} />
                    <Area type="monotone" dataKey="rate" stroke="#0ea5e9" strokeWidth={3} fillOpacity={1} fill="url(#colorRateDetail)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* History List */}
              <div className="space-y-3 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                {selectedRider.history.map((h, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-white/5 border border-white/5 rounded-xl hover:bg-white/10 transition-colors">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-slate-500 font-bold uppercase">{h.date}</span>
                      <span className="text-xs font-black text-white">{h.delivered} / {h.total} Parcels</span>
                    </div>
                    <div className="text-right">
                       <span className={`text-sm font-black ${h.rate >= 90 ? 'text-emerald-400' : 'text-amber-400'}`}>{h.rate.toFixed(1)}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- Footer ---

const Footer = () => (
  <footer className="w-full py-12 flex flex-col items-center gap-10 border-t border-white/5 mt-20 relative overflow-hidden">
    {/* Decorative Background for space filling */}
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
    
    {/* Operational Excellence Section */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16 w-full max-w-4xl px-4">
      <div className="flex flex-col items-center md:items-start">
        <span className="text-[10px] font-black text-slate-600 uppercase tracking-[0.3em] mb-2">Network Uptime</span>
        <span className="text-lg font-bold text-slate-300">99.9%</span>
      </div>
      <div className="flex flex-col items-center md:items-start">
        <span className="text-[10px] font-black text-slate-600 uppercase tracking-[0.3em] mb-2">Hub Security</span>
        <span className="text-lg font-bold text-slate-300">L3 Encrypted</span>
      </div>
      <div className="flex flex-col items-center md:items-start">
        <span className="text-[10px] font-black text-slate-600 uppercase tracking-[0.3em] mb-2">Data Sync</span>
        <span className="text-lg font-bold text-slate-300">Real-time</span>
      </div>
      <div className="flex flex-col items-center md:items-start">
        <span className="text-[10px] font-black text-slate-600 uppercase tracking-[0.3em] mb-2">Protocol</span>
        <span className="text-lg font-bold text-slate-300">Fast-Track</span>
      </div>
    </div>

    <div className="max-w-2xl text-center px-6">
      <p className="text-[11px] text-slate-500 font-medium leading-relaxed tracking-wide italic">
        "Empowering the delivery force with precision simulation and real-time performance analytics. ParcelPulse is the definitive tool for riders seeking operational excellence in the modern logistics landscape."
      </p>
    </div>

    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center gap-2 group cursor-pointer transition-transform hover:scale-110">
        <Package className="w-5 h-5 text-primary group-hover:animate-bounce" />
        <div className="flex flex-col gap-0 text-left">
          <span className="text-lg font-black tracking-tight text-gradient-yb leading-none">PARCELPULSE</span>
          <span className="text-[8px] font-bold text-slate-500 uppercase tracking-widest ml-0.5 leading-none mt-1">Made By Jay Shankar</span>
        </div>
      </div>
      <p className="text-slate-500 text-[10px] font-medium tracking-widest uppercase">
        Designed & Developed by <span className="text-primary glow-text font-bold italic">Jay Shankar</span>
      </p>
    </div>

    <div className="flex flex-wrap justify-center gap-8 mt-4">
      {[
        { label: "Contact", href: "tel:9817905531" },
        { label: "Facebook", href: "https://facebook.com/jayshankar0431" },
        { label: "Instagram", href: "https://instagram.com/jayshankar431" },
        { label: "Gmail", href: "mailto:jayshankar431@gmail.com" }
      ].map(link => (
        <a 
          key={link.label} 
          href={link.href}
          target={link.label === "Contact" || link.label === "Gmail" ? undefined : "_blank"}
          rel="noopener noreferrer"
          className="text-[10px] text-slate-700 uppercase tracking-[0.2em] font-black hover:text-primary transition-colors cursor-pointer"
        >
          {link.label}
        </a>
      ))}
    </div>
  </footer>
);

// --- Main App ---

export default function App() {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("rider");
  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500); 
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#020617]">
      <ProfileModal open={showProfile} onClose={() => setShowProfile(false)} />
      
      <AnimatePresence mode="wait">
        {loading ? (
          <SplashScreen key="splash" onFinish={() => {}} />
        ) : (
          <motion.div
            key="main-app"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative z-10"
          >
            {/* Background Ambience only for main app */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
              <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-primary/10 blur-[120px] animate-pulse" />
              <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-500/10 blur-[120px]" />
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
            </div>

            {/* Header / Logo */}
            <header className="fixed top-0 left-0 w-full z-40 px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between backdrop-blur-md border-b border-white/5 bg-slate-950/20">
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="flex items-center gap-3 cursor-pointer"
              >
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-primary flex items-center justify-center shadow-[0_0_15px_rgba(14,165,233,0.4)]">
                   <Package className="text-white w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div className="flex flex-col gap-0 uppercase italic">
                  <h1 className="text-xl sm:text-2xl font-black tracking-tighter text-white leading-none">
                    Parcel<span className="text-primary glow-text">Pulse</span>
                  </h1>
                </div>
              </motion.div>
              
              <div className="flex items-center gap-4">
                <div className="text-right hidden xs:block">
                  <p className="text-[9px] sm:text-[10px] text-slate-500 font-bold uppercase tracking-widest leading-none mb-0.5 sm:mb-1">Sonu Thakur</p>
                  <p className="text-[10px] sm:text-sm font-mono text-emerald-400 font-bold">VERIFIED</p>
                </div>
                <div 
                  className="h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-gradient-to-tr from-slate-800 to-slate-700 border border-white/10 flex items-center justify-center text-primary overflow-hidden cursor-pointer active:scale-95 transition-transform"
                  onClick={() => setShowProfile(true)}
                >
                  <Users className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
              </div>
            </header>

            {/* Navigation */}
            <Navbar activeTab={activeTab} setActiveTab={setActiveTab} onProfileClick={() => setShowProfile(true)} />

            {/* Main Content Areas */}
            <main className="min-h-screen">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  {activeTab === "rider" && <RiderDashboard />}
                  {activeTab === "leader" && <TeamLeaderDashboard />}
                </motion.div>
              </AnimatePresence>
            </main>

            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
