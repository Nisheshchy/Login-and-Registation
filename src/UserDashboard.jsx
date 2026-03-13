/** @format */

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    LayoutDashboard,
    User,
    Settings,
    Bell,
    Search,
    LogOut,
    TrendingUp,
    Activity,
    Calendar,
    CheckCircle2,
    Clock,
    ArrowRight,
    Plus,
    Zap,
    Star,
    Shield,
    MessageSquare,
    ShoppingBag,
    DollarSign,
    Briefcase,
    Globe,
    ExternalLink,
    Tag,
    Download
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const BackgroundEffects = () => (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 rounded-full blur-[120px] animate-pulse delay-1000" />
        <div className="absolute top-[30%] right-[20%] w-[20%] h-[20%] bg-indigo-600/5 rounded-full blur-[80px]" />
    </div>
);

import { verifyToken } from "./utils/security";

const UserDashboard = () => {
    const [activeTab, setActiveTab] = useState("Store Dashboard");
    const [notifications, setNotifications] = useState(5);
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = () => {
            const token = localStorage.getItem('token');
            const decoded = verifyToken(token);
            const storedUser = localStorage.getItem('user');

            if (!decoded) {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                navigate('/login');
                return;
            }

            if (storedUser) {
                setUserData(JSON.parse(storedUser));
                setLoading(false);
            } else {
                setUserData({ name: "Store Manager", email: decoded.id ? atob(decoded.id) : "manager@store.com" });
                setLoading(false);
            }
        };

        fetchUserData();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"
                />
            </div>
        );
    }

    const menuItems = [
        { name: "Store Dashboard", icon: LayoutDashboard },
        { name: "My Store", icon: ShoppingBag },
        { name: "Project Analytics", icon: Activity },
        { name: "Customer Reviews", icon: MessageSquare },
        { name: "Platform Settings", icon: Settings },
    ];

    const stats = [
        { label: "Total Revenue", value: "$4,250", icon: DollarSign, color: "text-emerald-400", bg: "bg-emerald-400/10" },
        { label: "Project Sales", value: "158", icon: ShoppingBag, color: "text-blue-400", bg: "bg-blue-400/10" },
        { label: "Active Listings", value: "24", icon: Briefcase, color: "text-purple-400", bg: "bg-purple-400/10" },
        { label: "Conversion Rate", value: "3.2%", icon: TrendingUp, color: "text-amber-400", bg: "bg-amber-400/10" },
    ];

    const activeProjects = [
        { id: 1, name: "E-Commerce UI Kit", type: "Design", price: "$49", sales: 45, rating: 4.8, status: "Active" },
        { id: 2, name: "CRM Backend API", type: "Code", price: "$129", sales: 12, rating: 4.9, status: "Updating" },
        { id: 3, name: "Social Mobile App", type: "Full Stack", price: "$299", sales: 8, rating: 4.7, status: "Active" },
    ];

    const topMarkets = [
        { name: "North America", value: 65, color: "bg-blue-500" },
        { name: "Europe", value: 45, color: "bg-purple-500" },
        { name: "Asia", value: 30, color: "bg-emerald-500" },
    ];

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 flex overflow-hidden font-sans relative">
            <BackgroundEffects />
            {/* Sidebar */}
            <motion.aside
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="w-72 bg-slate-900/40 backdrop-blur-3xl border-r border-white/5 flex flex-col z-50 h-screen sticky top-0"
            >
                <div className="p-8 flex items-center gap-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/20">
                        <ShoppingBag className="text-white w-6 h-6" />
                    </div>
                    <span className="font-bold text-2xl tracking-tighter">
                        STORE<span className="text-purple-500">Hub</span>
                    </span>
                </div>

                <nav className="flex-1 px-4 py-4 space-y-2">
                    {menuItems.map((item) => (
                        <button
                            key={item.name}
                            onClick={() => setActiveTab(item.name)}
                            className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 group relative ${activeTab === item.name
                                ? "bg-purple-600/10 text-purple-400"
                                : "text-slate-400 hover:bg-white/5 hover:text-white"
                                }`}
                        >
                            <item.icon className="w-5 h-5" />
                            <span className="font-semibold text-sm tracking-wide">{item.name}</span>
                            {activeTab === item.name && (
                                <motion.div
                                    layoutId="sidebar-active"
                                    className="absolute left-0 w-1.5 h-8 bg-purple-500 rounded-r-full"
                                />
                            )}
                        </button>
                    ))}
                </nav>

                <div className="p-6 border-t border-white/5">
                    <div className="bg-slate-800/40 rounded-3xl p-4 mb-6 border border-white/5">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 rounded-xl overflow-hidden ring-2 ring-purple-500/20 bg-slate-700 flex items-center justify-center">
                                <User className="text-slate-400 w-6 h-6" />
                            </div>
                            <div className="overflow-hidden">
                                <p className="font-bold text-sm truncate">{userData?.name || 'Store Manager'}</p>
                                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Verified Seller</p>
                            </div>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-rose-400 bg-rose-500/5 hover:bg-rose-500/10 border border-rose-500/10 transition-all text-xs font-bold"
                        >
                            <LogOut className="w-3.5 h-3.5" />
                            Sign Out
                        </button>
                    </div>
                </div>
            </motion.aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col relative overflow-y-auto custom-scrollbar bg-slate-950">
                {/* Header */}
                <header className="h-24 px-8 flex items-center justify-between sticky top-0 z-40 bg-slate-950/80 backdrop-blur-md border-b border-white/5">
                    <div className="flex items-center gap-6">
                        <h1 className="text-2xl font-bold tracking-tight">
                            {activeTab}
                        </h1>
                        <div className="relative hidden md:block">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                            <input
                                type="text"
                                placeholder="Search listings..."
                                className="bg-slate-900/50 border border-white/10 rounded-2xl py-2.5 pl-12 pr-6 w-80 text-sm focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500/40 transition-all"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="relative p-3 bg-slate-900/50 border border-white/10 rounded-2xl text-slate-400 hover:text-white transition-all">
                            <Bell className="w-5 h-5" />
                            {notifications > 0 && (
                                <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-purple-500 rounded-full ring-2 ring-slate-950" />
                            )}
                        </button>
                        <div className="h-10 w-[1px] bg-white/5 mx-2" />
                        <div className="flex items-center gap-2 bg-slate-900 border border-white/10 p-1.5 rounded-2xl">
                            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-purple-400 to-indigo-500 flex items-center justify-center">
                                <DollarSign className="w-4 h-4 text-white" />
                            </div>
                            <span className="text-xs font-bold px-2 pr-3">Seller Hub</span>
                        </div>
                    </div>
                </header>

                {/* Dashboard Grid */}
                <div className="p-8 pb-12">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-10">
                        {stats.map((stat, i) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                whileHover={{ y: -5 }}
                                className="bg-slate-900/40 backdrop-blur-xl border border-white/5 p-6 rounded-[32px] group relative overflow-hidden"
                            >
                                <div className={`absolute -right-4 -bottom-4 w-24 h-24 ${stat.bg} blur-2xl rounded-full opacity-50 group-hover:scale-150 transition-transform duration-500`} />
                                <div className="flex justify-between items-start mb-4 relative z-10">
                                    <div className={`p-3 rounded-2xl ${stat.bg} border border-white/5`}>
                                        <stat.icon className={`w-6 h-6 ${stat.color}`} />
                                    </div>
                                    <div className="flex items-center gap-1 text-[10px] font-black uppercase text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-lg">
                                        <TrendingUp className="w-3 h-3" />
                                        +8.5%
                                    </div>
                                </div>
                                <div className="relative z-10">
                                    <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">{stat.label}</p>
                                    <h3 className="text-3xl font-black tracking-tight">{stat.value}</h3>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main Section */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* Performance Card */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="bg-gradient-to-br from-purple-600 to-indigo-700 rounded-[40px] p-10 relative overflow-hidden shadow-2xl shadow-purple-500/20"
                            >
                                <div className="relative z-10">
                                    <h2 className="text-4xl font-black text-white mb-4 tracking-tighter">
                                        Store Performance <br />
                                        is hitting records!
                                    </h2>
                                    <p className="text-purple-100 max-w-sm mb-8 text-lg font-medium opacity-90 leading-relaxed">
                                        Your sales have increased by 25% this month. Great job {userData?.name.split(' ')[0] || 'Partner'}!
                                    </p>
                                    <div className="flex gap-4">
                                        <button className="bg-white text-purple-600 font-black px-8 py-4 rounded-2xl flex items-center gap-3 hover:scale-105 active:scale-95 transition-all shadow-xl shadow-black/20">
                                            List New Project
                                            <Plus className="w-5 h-5" />
                                        </button>
                                        <button className="bg-purple-900/30 backdrop-blur-md text-white border border-white/20 font-bold px-8 py-4 rounded-2xl flex items-center gap-3 hover:bg-white/10 transition-all">
                                            View Sales Reports
                                        </button>
                                    </div>
                                </div>
                                {/* Background Decorations */}
                                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/10 blur-[100px] rounded-full -mr-32 -mt-32" />
                                <div className="absolute bottom-0 right-10 w-32 h-32 bg-indigo-400/20 blur-2xl rounded-full" />
                                <Globe className="absolute bottom-10 right-10 w-40 h-40 text-white/5 -rotate-12" />
                            </motion.div>

                            {/* Project tracking tracking */}
                            <div>
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="text-xl font-black tracking-tight flex items-center gap-3">
                                        Track Your Projects
                                        <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
                                    </h3>
                                    <button className="text-sm font-bold text-purple-400 hover:text-purple-300 transition-colors">Manage All</button>
                                </div>
                                <div className="grid grid-cols-1 gap-4">
                                    {activeProjects.map((project, i) => (
                                        <motion.div
                                            key={project.id}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.5 + (i * 0.1) }}
                                            className="bg-slate-900/30 backdrop-blur-sm border border-white/5 p-5 rounded-3xl flex items-center hover:bg-white/[0.02] transition-all cursor-pointer group"
                                        >
                                            <div className="w-14 h-14 rounded-2xl bg-slate-800 border border-white/5 flex items-center justify-center shrink-0 group-hover:border-purple-500/30 transition-colors">
                                                <Briefcase className="w-6 h-6 text-purple-400" />
                                            </div>
                                            <div className="ml-5 flex-1">
                                                <h4 className="font-bold text-base mb-0.5 group-hover:text-purple-400 transition-colors">{project.name}</h4>
                                                <div className="flex items-center gap-3">
                                                    <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest bg-slate-800/50 px-2 py-0.5 rounded-md border border-white/5">{project.type}</span>
                                                    <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest">{project.status}</span>
                                                </div>
                                            </div>
                                            <div className="flex flex-col items-end gap-1 px-4">
                                                <p className="text-sm font-black text-white">{project.price}</p>
                                                <div className="flex items-center gap-1 text-[10px] text-slate-500">
                                                    <Download className="w-3 h-3" />
                                                    {project.sales} Sales
                                                </div>
                                            </div>
                                            <button className="p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-purple-500 hover:text-white transition-all opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0">
                                                <ExternalLink className="w-4 h-4" />
                                            </button>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Sidebar Section */}
                        <div className="space-y-8">
                            {/* Market Analytics */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-[40px] p-8"
                            >
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="w-12 h-12 rounded-2xl bg-purple-400/10 flex items-center justify-center border border-purple-400/20">
                                        <Globe className="w-6 h-6 text-purple-400" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg leading-tight uppercase tracking-tight">Top Markets</h3>
                                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">Geographical Growth</p>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    {topMarkets.map((market, i) => (
                                        <div key={i} className="space-y-2">
                                            <div className="flex justify-between items-center text-xs font-bold">
                                                <span className="text-slate-400">{market.name}</span>
                                                <span className="text-white">{market.value}%</span>
                                            </div>
                                            <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${market.value}%` }}
                                                    transition={{ delay: 0.8 + (i * 0.1), duration: 1 }}
                                                    className={`h-full ${market.color}`}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <button className="w-full mt-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl flex items-center justify-center gap-2 text-xs font-black uppercase tracking-widest transition-all">
                                    <Tag className="w-4 h-4" />
                                    Add New Tag
                                </button>
                            </motion.div>

                            {/* Promotional Card */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                                className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 backdrop-blur-xl border border-white/10 rounded-[40px] p-8 relative overflow-hidden"
                            >
                                <div className="relative z-10">
                                    <h3 className="font-black text-xl mb-3 tracking-tighter">Boost Visibility</h3>
                                    <p className="text-slate-400 text-sm mb-6 leading-relaxed">Featured listings get 10x more views and higher conversions.</p>
                                    <button className="w-full py-4 bg-purple-600 text-white font-black rounded-2xl text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-lg shadow-purple-500/20">
                                        Feature Listing
                                    </button>
                                </div>
                                <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-purple-500/10 blur-[60px] rounded-full" />
                            </motion.div>
                        </div>
                    </div>
                </div>
            </main>

            <style dangerouslySetInnerHTML={{
                __html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.1);
        }
      `}} />
        </div>
    );
};

export default UserDashboard;
