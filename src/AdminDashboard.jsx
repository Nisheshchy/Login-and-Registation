/** @format */

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    LayoutDashboard,
    Users,
    BarChart3,
    Settings,
    Bell,
    Search,
    User,
    LogOut,
    MoreVertical,
    TrendingUp,
    TrendingDown,
    DollarSign,
    Activity,
    ShoppingBag,
    Menu,
    X,
    PieChart,
    Shield,
    Globe,
    Zap,
    Mail,
    Smartphone,
    History,
    CheckCircle2,
    AlertCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const AdminDashboard = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [activeTab, setActiveTab] = useState("Dashboard");
    const navigate = useNavigate();

    const stats = [
        {
            title: "Total Revenue",
            value: "$45,231.89",
            change: "+20.1%",
            trend: "up",
            icon: DollarSign,
            color: "text-emerald-400",
            bg: "bg-emerald-400/5",
        },
        {
            title: "Active Users",
            value: "2,350",
            change: "+180.1%",
            trend: "up",
            icon: Users,
            color: "text-blue-400",
            bg: "bg-blue-400/5",
        },
        {
            title: "Sales Count",
            value: "+12,234",
            change: "+19.2%",
            trend: "up",
            icon: ShoppingBag,
            color: "text-purple-400",
            bg: "bg-purple-400/5",
        },
        {
            title: "Live Sessions",
            value: "+573",
            change: "+20 today",
            trend: "up",
            icon: Activity,
            color: "text-orange-400",
            bg: "bg-orange-400/5",
        },
    ];

    const [isQuickActionOpen, setIsQuickActionOpen] = useState(false);

    const [usersList, setUsersList] = useState([
        {
            name: "Alex Johnson",
            email: "alex@log.com",
            role: "Owner",
            status: "Active",
            image: "https://i.pravatar.cc/150?u=50",
        },
        {
            name: "Sam Smith",
            email: "sam@log.com",
            role: "Manager",
            status: "Active",
            image: "https://i.pravatar.cc/150?u=54",
        },
        {
            name: "Mike Ross",
            email: "mike@log.com",
            role: "User",
            status: "Inactive",
            image: "https://i.pravatar.cc/150?u=58",
        },
        {
            name: "Ray Zane",
            email: "ray@log.com",
            role: "User",
            status: "Active",
            image: "https://i.pravatar.cc/150?u=60",
        },
        {
            name: "Harvey Specter",
            email: "harvey@log.com",
            role: "User",
            status: "Active",
            image: "https://i.pravatar.cc/150?u=64",
        },
    ]);

    const [isUserModalOpen, setIsUserModalOpen] = useState(false);
    const [editingUserIndex, setEditingUserIndex] = useState(null);
    const [userFormData, setUserFormData] = useState({ name: "", email: "", role: "User", status: "Active" });
    const [searchQuery, setSearchQuery] = useState("");
    const [filterRole, setFilterRole] = useState("All");

    const [settings, setSettings] = useState({
        systemName: "LOGAdmin v2.0",
        notifications: {
            email: true,
            push: true,
            sms: false,
        },
        securityMode: "High",
        theme: "Dark",
    });

    const logs = [
        { id: 1, action: "User Login", user: "Alex Johnson", time: "2 mins ago", status: "success", icon: CheckCircle2 },
        { id: 2, action: "Settings Update", user: "Nishesh Ch.", time: "15 mins ago", status: "success", icon: CheckCircle2 },
        { id: 3, action: "Password Change", user: "Sam Smith", time: "1 hour ago", status: "warning", icon: AlertCircle },
        { id: 4, action: "DB Backup", user: "System", time: "2 hours ago", status: "success", icon: CheckCircle2 },
        { id: 5, action: "New User Registered", user: "Ray Zane", time: "4 hours ago", status: "success", icon: CheckCircle2 },
    ];

    const revenueData = [30, 45, 35, 60, 55, 80, 75, 90, 85, 100]; // Sample data for custom chart

    const filteredUsers = usersList.filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFilter = filterRole === "All" || user.role === filterRole;
        return matchesSearch && matchesFilter;
    });

    const handleExportPDF = () => {
        const doc = new jsPDF();
        doc.text("User Management Report", 20, 10);
        const tableData = filteredUsers.map(user => [user.name, user.email, user.role, user.status]);
        autoTable(doc, {
            head: [['Name', 'Email', 'Role', 'Status']],
            body: tableData,
        });
        doc.save("users-report.pdf");
    };

    const handleAddUserClick = () => {
        setEditingUserIndex(null);
        setUserFormData({ name: "", email: "", role: "User", status: "Active" });
        setIsUserModalOpen(true);
    };

    const handleEditUserClick = (index, user) => {
        setEditingUserIndex(index);
        setUserFormData(user);
        setIsUserModalOpen(true);
    };

    const handleDeleteUser = (index) => {
        const updatedUsers = usersList.filter((_, i) => i !== index);
        setUsersList(updatedUsers);
    };

    const handleSaveUser = () => {
        if (!userFormData.name || !userFormData.email) return;

        const updatedUsers = [...usersList];
        if (editingUserIndex !== null) {
            updatedUsers[editingUserIndex] = { ...updatedUsers[editingUserIndex], ...userFormData };
        } else {
            updatedUsers.unshift({
                ...userFormData,
                image: `https://i.pravatar.cc/150?u=${Math.floor(Math.random() * 50) + 70}`,
            });
        }
        setUsersList(updatedUsers);
        setIsUserModalOpen(false);
    };

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 flex overflow-hidden font-sans">
            {/* Sidebar */}
            <motion.aside
                initial={false}
                animate={{ width: isSidebarOpen ? "260px" : "80px" }}
                className="bg-slate-900/50 backdrop-blur-xl border-r border-white/5 flex flex-col z-50 h-screen transition-all duration-300 ease-in-out">
                <div className="p-6 flex items-center gap-3 overflow-hidden">
                    <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shrink-0 shadow-lg shadow-blue-500/20">
                        <LayoutDashboard className="text-white w-6 h-6" />
                    </div>
                    <AnimatePresence>
                        {isSidebarOpen && (
                            <motion.span
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                className="font-bold text-xl tracking-tight whitespace-nowrap">
                                LOG<span className="text-blue-500">Admin</span>
                            </motion.span>
                        )}
                    </AnimatePresence>
                </div>

                <nav className="flex-1 px-4 py-6 space-y-2">
                    {[
                        { name: "Dashboard", icon: LayoutDashboard },
                        { name: "Users", icon: Users },
                        { name: "Analytics", icon: BarChart3 },
                        { name: "Logs", icon: History },
                        { name: "Profile", icon: User },
                        { name: "Settings", icon: Settings },
                    ].map((item) => (
                        <button
                            key={item.name}
                            onClick={() => setActiveTab(item.name)}
                            className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group relative ${activeTab === item.name
                                ? "bg-blue-600/10 text-blue-400"
                                : "text-slate-400 hover:bg-white/5 hover:text-white"
                                }`}>
                            {activeTab === item.name && (
                                <motion.div
                                    layoutId="active-pill"
                                    className="absolute left-0 w-1 h-6 bg-blue-500 rounded-r-full"
                                />
                            )}
                            <item.icon
                                className={`w-5 h-5 shrink-0 ${activeTab === item.name ? "text-blue-400" : "group-hover:scale-110 transition-transform"}`}
                            />
                            <AnimatePresence>
                                {isSidebarOpen && (
                                    <motion.span
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="font-medium whitespace-nowrap">
                                        {item.name}
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </button>
                    ))}
                </nav>

                <div className="p-4 border-t border-white/5">
                    <button
                        onClick={() => navigate("/login")}
                        className="w-full flex items-center gap-4 px-4 py-3 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-xl transition-all">
                        <LogOut className="w-5 h-5 shrink-0" />
                        {isSidebarOpen && <span className="font-medium">Logout</span>}
                    </button>
                </div>
            </motion.aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col relative overflow-hidden">
                {/* Top Navbar */}
                <header className="h-20 bg-slate-950/50 backdrop-blur-md border-b border-white/5 px-8 flex items-center justify-between z-40 sticky top-0">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className="p-2 hover:bg-white/5 rounded-lg text-slate-400 hover:text-white transition-colors">
                            <Menu className="w-5 h-5" />
                        </button>
                        <div className="relative hidden md:block">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                            <input
                                type="text"
                                placeholder="Search analytics..."
                                className="bg-slate-900 border border-white/5 rounded-xl py-2 pl-10 pr-4 w-64 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all shadow-inner"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="relative p-2 hover:bg-white/5 rounded-lg text-slate-400 hover:text-white transition-colors">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-blue-500 rounded-full border-2 border-slate-950" />
                        </button>
                        <div className="h-8 w-[1px] bg-white/10 mx-2" />
                        <div
                            onClick={() => setActiveTab("Profile")}
                            className="flex items-center gap-3 p-1.5 hover:bg-white/5 rounded-xl transition-colors cursor-pointer group"
                        >
                            <div className="text-right">
                                <p className="text-sm font-bold leading-none group-hover:text-blue-400 transition-colors">
                                    Nishesh Ch.
                                </p>
                                <p className="text-[10px] text-slate-500 font-medium mt-1">
                                    Administrator
                                </p>
                            </div>
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 p-[1px]">
                                <div className="w-full h-full bg-slate-900 rounded-[11px] flex items-center justify-center overflow-hidden">
                                    <img
                                        src="https://i.pravatar.cc/150?u=72"
                                        alt="Profile"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Dashboard Content */}
                <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                    <AnimatePresence mode="wait">
                        {activeTab === "Dashboard" ? (
                            <motion.div
                                key="dashboard"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}>
                                <div className="mb-8">
                                    <h1 className="text-3xl font-bold tracking-tight mb-2 text-white">
                                        Dashboard Overview
                                    </h1>
                                    <p className="text-slate-400">
                                        Welcome back, here's what's happening today.
                                    </p>
                                </div>

                                {/* Stats Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                                    {stats.map((stat, index) => (
                                        <motion.div
                                            key={stat.title}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                            className="bg-slate-900/40 backdrop-blur-sm border border-white/5 p-6 rounded-3xl hover:border-blue-500/30 transition-all group relative overflow-hidden">
                                            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-[50px] rounded-full -mr-16 -mt-16 group-hover:bg-blue-500/10 transition-colors" />
                                            <div className="flex justify-between items-start mb-4">
                                                <div
                                                    className={`p-3 rounded-2xl bg-slate-800 border border-white/5 group-hover:scale-110 transition-transform`}>
                                                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                                                </div>
                                                <div
                                                    className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-lg ${stat.trend === "up" ? "text-emerald-400 bg-emerald-400/10" : "text-rose-400 bg-rose-400/10"}`}>
                                                    {stat.trend === "up" ? (
                                                        <TrendingUp className="w-3 h-3" />
                                                    ) : (
                                                        <TrendingDown className="w-3 h-3" />
                                                    )}
                                                    {stat.change}
                                                </div>
                                            </div>
                                            <p className="text-slate-400 text-sm font-medium mb-1 uppercase tracking-wider">
                                                {stat.title}
                                            </p>
                                            <h3 className="text-2xl font-bold">{stat.value}</h3>
                                        </motion.div>
                                    ))}
                                </div>

                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                    {/* Recent Users Table */}
                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.4 }}
                                        className="lg:col-span-2 bg-slate-900/40 backdrop-blur-sm border border-white/5 rounded-3xl overflow-hidden">
                                        <div className="p-6 border-b border-white/5 flex justify-between items-center">
                                            <h2 className="text-xl font-bold">Recent Users</h2>
                                            <button
                                                onClick={() => setActiveTab("Users")}
                                                className="text-sm text-blue-400 font-bold hover:underline underline-offset-4">
                                                View All
                                            </button>
                                        </div>
                                        <div className="p-0 overflow-x-auto">
                                            <table className="w-full text-left">
                                                <thead>
                                                    <tr className="text-slate-500 text-xs font-bold uppercase tracking-widest border-b border-white/5">
                                                        <th className="px-6 py-4">User</th>
                                                        <th className="px-6 py-4">Role</th>
                                                        <th className="px-6 py-4">Status</th>
                                                        <th className="px-6 py-4">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-white/5">
                                                    {usersList.slice(0, 5).map((user) => (
                                                        <tr
                                                            key={user.email}
                                                            className="group hover:bg-white/5 transition-colors">
                                                            <td className="px-6 py-4">
                                                                <div className="flex items-center gap-3">
                                                                    <img
                                                                        src={user.image}
                                                                        alt={user.name}
                                                                        className="w-10 h-10 rounded-full border border-white/10"
                                                                    />
                                                                    <div>
                                                                        <p className="font-bold text-sm group-hover:text-blue-400 transition-colors uppercase tracking-tight">
                                                                            {user.name}
                                                                        </p>
                                                                        <p className="text-xs text-slate-500">
                                                                            {user.email}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="px-6 py-4 font-bold text-slate-400">
                                                                {user.role}
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                <span
                                                                    className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-widest ${user.status === "Active" ? "bg-emerald-500/10 text-emerald-400" : "bg-slate-800 text-slate-500"}`}>
                                                                    {user.status}
                                                                </span>
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                <button className="p-2 hover:bg-slate-800 rounded-lg transition-colors">
                                                                    <MoreVertical className="w-4 h-4 text-slate-500" />
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </motion.div>

                                    {/* Performance Card */}
                                    <motion.div
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.5 }}
                                        className="bg-slate-900/40 backdrop-blur-sm border border-white/5 rounded-3xl p-6">
                                        <h2 className="text-xl font-bold mb-6">Performance</h2>
                                        <div className="space-y-6">
                                            {[
                                                {
                                                    label: "Server Load",
                                                    value: 45,
                                                    color: "bg-blue-500",
                                                },
                                                {
                                                    label: "Database Usage",
                                                    value: 78,
                                                    color: "bg-purple-500",
                                                },
                                                {
                                                    label: "API Latency",
                                                    value: 22,
                                                    color: "bg-emerald-500",
                                                },
                                                {
                                                    label: "Memory Usage",
                                                    value: 64,
                                                    color: "bg-orange-500",
                                                },
                                            ].map((item) => (
                                                <div key={item.label}>
                                                    <div className="flex justify-between items-center mb-2">
                                                        <span className="text-sm font-medium text-slate-400">
                                                            {item.label}
                                                        </span>
                                                        <span className="text-sm font-bold">
                                                            {item.value}%
                                                        </span>
                                                    </div>
                                                    <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                                                        <motion.div
                                                            initial={{ width: 0 }}
                                                            animate={{ width: `${item.value}%` }}
                                                            transition={{ duration: 1, delay: 0.8 }}
                                                            className={`h-full ${item.color} shadow-[0_0_10px_rgba(59,130,246,0.3)]`}
                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="mt-8 p-4 bg-blue-600/10 rounded-2xl border border-blue-500/20">
                                            <div className="flex items-center gap-3 mb-2">
                                                <div className="p-2 bg-blue-500 rounded-lg">
                                                    <Activity className="w-4 h-4 text-white" />
                                                </div>
                                                <span className="font-bold text-sm text-blue-400 uppercase tracking-widest">
                                                    System Status
                                                </span>
                                            </div>
                                            <p className="text-xs text-slate-400 leading-relaxed">
                                                All systems are performing within optimal parameters. No
                                                issues detected in the last 24 hours.
                                            </p>
                                        </div>
                                    </motion.div>
                                </div>
                            </motion.div>
                        ) : activeTab === "Profile" ? (
                            <motion.div
                                key="profile"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                                className="max-w-4xl mx-auto"
                            >
                                <div className="mb-8">
                                    <h1 className="text-3xl font-bold tracking-tight mb-2 text-white">My Profile</h1>
                                    <p className="text-slate-400">View and manage your administrator profile information.</p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                    {/* Profile Sidebar */}
                                    <div className="md:col-span-1 space-y-6">
                                        <div className="bg-slate-900/40 backdrop-blur-sm border border-white/5 rounded-3xl p-8 flex flex-col items-center text-center">
                                            <div className="w-24 h-24 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 p-[1px] mb-4">
                                                <div className="w-full h-full bg-slate-900 rounded-[23px] flex items-center justify-center overflow-hidden">
                                                    <img src="https://i.pravatar.cc/150?u=72" alt="Admin" className="w-full h-full object-cover" />
                                                </div>
                                            </div>
                                            <h2 className="text-xl font-bold text-white uppercase tracking-tight">Nishesh Ch.</h2>
                                            <p className="text-blue-400 text-xs font-bold uppercase tracking-widest mt-1">Administrator</p>
                                            <div className="mt-6 w-full pt-6 border-t border-white/5 space-y-3">
                                                <div className="flex justify-between text-xs">
                                                    <span className="text-slate-500 font-medium">Status</span>
                                                    <span className="text-emerald-400 font-bold uppercase">Active</span>
                                                </div>
                                                <div className="flex justify-between text-xs">
                                                    <span className="text-slate-500 font-medium">Joined</span>
                                                    <span className="text-slate-300 font-bold uppercase">Oct 2023</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Profile Details */}
                                    <div className="md:col-span-2 space-y-6">
                                        <div className="bg-slate-900/40 backdrop-blur-sm border border-white/5 rounded-3xl p-8">
                                            <h3 className="text-lg font-bold mb-6 flex items-center gap-3">
                                                <User className="w-5 h-5 text-blue-500" />
                                                Account Details
                                            </h3>
                                            <div className="space-y-6">
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                                    <div className="space-y-2">
                                                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Full Name</label>
                                                        <input
                                                            readOnly
                                                            value="Nishesh Chaudhary"
                                                            className="w-full bg-slate-800/50 border border-white/5 rounded-xl py-3 px-4 text-sm text-slate-300 outline-none focus:border-blue-500/50 transition-colors"
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Email Address</label>
                                                        <input
                                                            readOnly
                                                            value="admin@log.com"
                                                            className="w-full bg-slate-800/50 border border-white/5 rounded-xl py-3 px-4 text-sm text-slate-300 outline-none focus:border-blue-500/50 transition-colors"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                                    <div className="space-y-2">
                                                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Role</label>
                                                        <input
                                                            readOnly
                                                            value="System Administrator"
                                                            className="w-full bg-slate-800/50 border border-white/5 rounded-xl py-3 px-4 text-sm text-slate-300 outline-none focus:border-blue-500/50 transition-colors"
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Employee ID</label>
                                                        <input
                                                            readOnly
                                                            value="EMP-2023-001"
                                                            className="w-full bg-slate-800/50 border border-white/5 rounded-xl py-3 px-4 text-sm text-slate-300 outline-none focus:border-blue-500/50 transition-colors"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="pt-6 border-t border-white/5">
                                                    <button className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-blue-500/20 active:scale-95 text-sm">
                                                        Edit Profile Details
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ) : activeTab === "Users" ? (
                            <motion.div
                                key="users"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}>
                                <div className="mb-8 flex justify-between items-center">
                                    <div>
                                        <h1 className="text-3xl font-bold tracking-tight mb-2 text-white">
                                            User Management
                                        </h1>
                                        <p className="text-slate-400">
                                            Manage your team and user permissions.
                                        </p>
                                    </div>
                                    <button
                                        onClick={handleAddUserClick}
                                        className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-blue-500/20 active:scale-95">
                                        Add New User
                                    </button>
                                </div>

                                <div className="bg-slate-900/40 backdrop-blur-sm border border-white/5 rounded-3xl overflow-hidden">
                                    {/* Search & Filters */}
                                    <div className="p-6 border-b border-white/5 flex flex-wrap gap-4 items-center justify-between">
                                        <div className="relative">
                                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                            <input
                                                type="text"
                                                placeholder="Search by name or email..."
                                                value={searchQuery}
                                                onChange={(e) => setSearchQuery(e.target.value)}
                                                className="bg-slate-800/50 border border-white/5 rounded-xl py-2.5 pl-10 pr-4 w-64 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-all text-white"
                                            />
                                        </div>
                                        <div className="flex gap-3">
                                            <select
                                                value={filterRole}
                                                onChange={(e) => setFilterRole(e.target.value)}
                                                className="px-4 py-2 bg-slate-800 border border-white/5 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-slate-700 transition-colors focus:outline-none focus:ring-1 focus:ring-blue-500/50 text-white appearance-none cursor-pointer"
                                            >
                                                <option value="All">All Roles</option>
                                                <option value="Owner">Owner</option>
                                                <option value="Admin">Admin</option>
                                                <option value="Manager">Manager</option>
                                                <option value="User">User</option>
                                            </select>
                                            <button
                                                onClick={handleExportPDF}
                                                className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold uppercase tracking-widest transition-all shadow-lg shadow-blue-500/10 active:scale-95">
                                                Export PDF
                                            </button>
                                        </div>
                                    </div>

                                    <div className="p-0 overflow-x-auto">
                                        <table className="w-full text-left">
                                            <thead>
                                                <tr className="text-slate-500 text-xs font-bold uppercase tracking-widest border-b border-white/5 bg-slate-950/20">
                                                    <th className="px-6 py-5">User</th>
                                                    <th className="px-6 py-5">Role</th>
                                                    <th className="px-6 py-5">Status</th>
                                                    <th className="px-6 py-5">Joined</th>
                                                    <th className="px-6 py-5 text-right">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-white/5">
                                                {filteredUsers.map((user, i) => (
                                                    <tr
                                                        key={i}
                                                        className="group hover:bg-white/[0.02] transition-colors">
                                                        <td className="px-6 py-4">
                                                            <div className="flex items-center gap-3">
                                                                <img
                                                                    src={user.image}
                                                                    alt={user.name}
                                                                    className="w-10 h-10 rounded-full"
                                                                />
                                                                <div>
                                                                    <p className="font-bold text-sm text-slate-200">
                                                                        {user.name}
                                                                    </p>
                                                                    <p className="text-xs text-slate-500">
                                                                        {user.email}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <span className="text-xs font-medium text-slate-400 bg-slate-800/50 px-2 py-1 rounded-md border border-white/5">
                                                                {user.role}
                                                            </span>
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <div className="flex items-center gap-2">
                                                                <div
                                                                    className={`w-2 h-2 rounded-full ${user.status === "Active" ? "bg-emerald-500" : "bg-slate-600"}`}
                                                                />
                                                                <span
                                                                    className={`text-xs font-bold ${user.status === "Active" ? "text-emerald-400" : "text-slate-500"}`}>
                                                                    {user.status}
                                                                </span>
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 text-xs text-slate-500 font-medium">
                                                            Oct 12, 2023
                                                        </td>
                                                        <td className="px-6 py-4 text-right">
                                                            <button
                                                                onClick={() => handleEditUserClick(i, user)}
                                                                className="text-xs font-bold text-blue-400 hover:text-blue-300 transition-colors uppercase tracking-widest mr-4">
                                                                Edit
                                                            </button>
                                                            <button
                                                                onClick={() => handleDeleteUser(i)}
                                                                className="text-xs font-bold text-rose-500 hover:text-rose-400 transition-colors uppercase tracking-widest">
                                                                Delete
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="p-6 border-t border-white/5 flex items-center justify-between">
                                        <p className="text-xs text-slate-500">
                                            Showing{" "}
                                            <span className="text-slate-300 font-bold">{filteredUsers.length}</span> of{" "}
                                            <span className="text-slate-300 font-bold">{usersList.length}</span>{" "}
                                            users
                                        </p>
                                        <div className="flex gap-2">
                                            <button
                                                className="p-2 bg-slate-800 rounded-lg disabled:opacity-50"
                                                disabled>
                                                Next
                                            </button>
                                            <button className="p-2 bg-slate-800 rounded-lg">
                                                Prev
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ) : activeTab === "Analytics" ? (
                            <motion.div
                                key="analytics"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}>
                                <div className="mb-8">
                                    <h1 className="text-3xl font-bold tracking-tight mb-2 text-white">System Analytics</h1>
                                    <p className="text-slate-400">Detailed insights into your system performance and user activity.</p>
                                </div>

                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                    {/* Revenue Trend Chart */}
                                    <div className="bg-slate-900/40 backdrop-blur-sm border border-white/5 rounded-3xl p-8">
                                        <div className="flex justify-between items-center mb-8">
                                            <div>
                                                <h3 className="text-lg font-bold">Revenue Growth</h3>
                                                <p className="text-xs text-slate-500 mt-1 uppercase tracking-widest font-medium">Last 30 Days Trend</p>
                                            </div>
                                            <div className="flex items-center gap-2 text-emerald-400 text-sm font-bold bg-emerald-400/10 px-3 py-1 rounded-xl">
                                                <TrendingUp className="w-4 h-4" />
                                                +24.5%
                                            </div>
                                        </div>
                                        <div className="h-[250px] w-full flex items-end gap-2 px-2">
                                            {revenueData.map((val, i) => (
                                                <motion.div
                                                    key={i}
                                                    initial={{ height: 0 }}
                                                    animate={{ height: `${val}%` }}
                                                    transition={{ delay: i * 0.05, duration: 0.8 }}
                                                    className="flex-1 bg-gradient-to-t from-blue-600/80 to-blue-400/20 rounded-t-lg relative group"
                                                >
                                                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity font-bold">
                                                        ${val}k
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </div>
                                        <div className="flex justify-between mt-4 px-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                                            <span>Week 1</span>
                                            <span>Week 2</span>
                                            <span>Week 3</span>
                                            <span>Week 4</span>
                                        </div>
                                    </div>

                                    {/* Distribution Stats */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {[
                                            { label: "New Signups", val: "1.2k", icon: Users, color: "text-blue-400", bg: "bg-blue-400/10" },
                                            { label: "Transactions", val: "842", icon: Zap, color: "text-orange-400", bg: "bg-orange-400/10" },
                                            { label: "Global Reach", val: "14", icon: Globe, color: "text-emerald-400", bg: "bg-emerald-400/10" },
                                            { label: "Uptime", val: "99.9%", icon: Activity, color: "text-purple-400", bg: "bg-purple-400/10" },
                                        ].map((item, idx) => (
                                            <div key={idx} className="bg-slate-900/40 backdrop-blur-sm border border-white/5 rounded-3xl p-6 hover:bg-white/[0.02] transition-colors cursor-default">
                                                <div className={`p-3 rounded-2xl w-fit mb-4 ${item.bg}`}>
                                                    <item.icon className={`w-6 h-6 ${item.color}`} />
                                                </div>
                                                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">{item.label}</p>
                                                <h4 className="text-2xl font-bold">{item.val}</h4>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ) : activeTab === "Logs" ? (
                            <motion.div
                                key="logs"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}>
                                <div className="mb-8">
                                    <h1 className="text-3xl font-bold tracking-tight mb-2 text-white">System Activity Logs</h1>
                                    <p className="text-slate-400">Monitor all administrative actions and security events.</p>
                                </div>

                                <div className="bg-slate-900/40 backdrop-blur-sm border border-white/5 rounded-3xl overflow-hidden">
                                    <div className="p-6 border-b border-white/5 flex gap-4">
                                        <div className="flex-1 relative">
                                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                            <input type="text" placeholder="Search logs..." className="w-full bg-slate-800/50 border border-white/5 rounded-xl py-2 pl-10 pr-4 text-sm" />
                                        </div>
                                        <button className="px-4 py-2 bg-slate-800 border border-white/5 rounded-xl text-xs font-bold uppercase tracking-widest text-slate-300">Filter By Date</button>
                                    </div>
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-left">
                                            <thead>
                                                <tr className="text-slate-500 text-[10px] font-bold uppercase tracking-widest border-b border-white/5 bg-slate-950/20">
                                                    <th className="px-8 py-5">Event</th>
                                                    <th className="px-8 py-5">User</th>
                                                    <th className="px-8 py-5">Time</th>
                                                    <th className="px-8 py-5">Status</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-white/5">
                                                {logs.map((log) => (
                                                    <tr key={log.id} className="hover:bg-white/[0.02] transition-colors">
                                                        <td className="px-8 py-4">
                                                            <div className="flex items-center gap-3">
                                                                <div className={`p-2 rounded-lg ${log.status === 'success' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
                                                                    <log.icon className="w-4 h-4" />
                                                                </div>
                                                                <span className="text-sm font-bold text-slate-200">{log.action}</span>
                                                            </div>
                                                        </td>
                                                        <td className="px-8 py-4 text-sm text-slate-400">{log.user}</td>
                                                        <td className="px-8 py-4 text-sm text-slate-500 italic font-medium">{log.time}</td>
                                                        <td className="px-8 py-4">
                                                            <span className={`text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-center rounded-lg ${log.status === 'success' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'}`}>
                                                                {log.status}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </motion.div>
                        ) : activeTab === "Settings" ? (
                            <motion.div
                                key="settings"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                                className="max-w-4xl"
                            >
                                <div className="mb-8">
                                    <h1 className="text-3xl font-bold tracking-tight mb-2 text-white">System Settings</h1>
                                    <p className="text-slate-400">Configure global parameters and security preferences.</p>
                                </div>

                                <div className="grid grid-cols-1 gap-6">
                                    {/* General Settings */}
                                    <div className="bg-slate-900/40 backdrop-blur-sm border border-white/5 rounded-3xl p-8">
                                        <div className="flex items-center gap-3 mb-8 pb-4 border-b border-white/5">
                                            <Settings className="w-6 h-6 text-blue-500" />
                                            <h3 className="text-lg font-bold">General Configuration</h3>
                                        </div>
                                        <div className="space-y-6">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">System Name</label>
                                                    <input
                                                        type="text"
                                                        value={settings.systemName}
                                                        onChange={(e) => setSettings({ ...settings, systemName: e.target.value })}
                                                        className="w-full bg-slate-800/50 border border-white/5 rounded-xl py-3 px-4 text-sm focus:border-blue-500 outline-none"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Security Level</label>
                                                    <select
                                                        value={settings.securityMode}
                                                        onChange={(e) => setSettings({ ...settings, securityMode: e.target.value })}
                                                        className="w-full bg-slate-800/50 border border-white/5 rounded-xl py-3 px-4 text-sm outline-none"
                                                    >
                                                        <option>Low</option>
                                                        <option>Medium</option>
                                                        <option>High</option>
                                                        <option>Maximum (Ultra)</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="pt-6">
                                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6 block">Notification Channels</label>
                                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                                    {[
                                                        { id: "email", label: "Email Alerts", icon: Mail },
                                                        { id: "push", label: "Push Notification", icon: Bell },
                                                        { id: "sms", label: "SMS Gateway", icon: Smartphone },
                                                    ].map((channel) => (
                                                        <button
                                                            key={channel.id}
                                                            onClick={() => setSettings({
                                                                ...settings,
                                                                notifications: { ...settings.notifications, [channel.id]: !settings.notifications[channel.id] }
                                                            })}
                                                            className={`p-6 rounded-2xl border flex flex-col items-center gap-3 transition-all ${settings.notifications[channel.id] ? 'bg-blue-500/10 border-blue-500/30 text-blue-400' : 'bg-slate-800/30 border-white/5 text-slate-500'}`}
                                                        >
                                                            <channel.icon className="w-8 h-8" />
                                                            <span className="text-xs font-bold uppercase tracking-widest">{channel.label}</span>
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-10 pt-6 border-t border-white/5 flex justify-end">
                                            <button className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-2xl font-bold transition-all shadow-xl shadow-blue-500/20 active:scale-95">
                                                Save All Changes
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="other"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="flex flex-col items-center justify-center h-[60vh] text-center">
                                <div className="w-20 h-20 bg-slate-900 rounded-3xl flex items-center justify-center mb-6 border border-white/10 shadow-2xl">
                                    <Settings className="w-10 h-10 text-slate-500 animate-spin-slow" />
                                </div>
                                <h2 className="text-2xl font-bold text-white mb-2">
                                    {activeTab} Section
                                </h2>
                                <p className="text-slate-400 max-w-sm">
                                    This module is currently under development. Please check back
                                    later.
                                </p>
                            </motion.div>
                        )
                        }
                    </AnimatePresence>
                </div>
            </main>

            <style
                dangerouslySetInnerHTML={{
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
      `,
                }}
            />

            {/* User Modal */}
            <AnimatePresence>
                {isUserModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            className="bg-slate-900 border border-white/10 rounded-3xl p-6 w-full max-w-md shadow-2xl relative"
                        >
                            <button
                                onClick={() => setIsUserModalOpen(false)}
                                className="absolute right-4 top-4 p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            <h2 className="text-2xl font-bold text-white mb-6">
                                {editingUserIndex !== null ? "Edit User" : "Add New User"}
                            </h2>

                            <div className="space-y-4">
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Name</label>
                                    <input
                                        type="text"
                                        value={userFormData.name}
                                        onChange={(e) => setUserFormData({ ...userFormData, name: e.target.value })}
                                        className="w-full bg-slate-800/50 border border-white/5 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                                        placeholder="Full Name"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Email</label>
                                    <input
                                        type="email"
                                        value={userFormData.email}
                                        onChange={(e) => setUserFormData({ ...userFormData, email: e.target.value })}
                                        className="w-full bg-slate-800/50 border border-white/5 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                                        placeholder="Email Address"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Role</label>
                                        <select
                                            value={userFormData.role}
                                            onChange={(e) => setUserFormData({ ...userFormData, role: e.target.value })}
                                            className="w-full bg-slate-800/50 border border-white/5 rounded-xl py-3 px-4 text-sm text-white focus:outline-none appearance-none"
                                        >
                                            <option value="User">User</option>
                                            <option value="Manager">Manager</option>
                                            <option value="Admin">Admin</option>
                                            <option value="Owner">Owner</option>
                                        </select>
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</label>
                                        <select
                                            value={userFormData.status}
                                            onChange={(e) => setUserFormData({ ...userFormData, status: e.target.value })}
                                            className="w-full bg-slate-800/50 border border-white/5 rounded-xl py-3 px-4 text-sm text-white focus:outline-none appearance-none"
                                        >
                                            <option value="Active">Active</option>
                                            <option value="Inactive">Inactive</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="pt-4 flex gap-3">
                                    <button
                                        onClick={() => setIsUserModalOpen(false)}
                                        className="flex-1 px-4 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleSaveUser}
                                        className="flex-1 px-4 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold transition-colors shadow-lg shadow-blue-500/20"
                                    >
                                        Save User
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Quick Action Floating Speed Dial */}
            <div className="fixed bottom-8 right-8 z-[100]">
                <AnimatePresence>
                    {isQuickActionOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: 20, scale: 0.8 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 20, scale: 0.8 }}
                            className="flex flex-col gap-4 mb-4 items-end"
                        >
                            {[
                                { label: "Add New User", icon: Users, action: handleAddUserClick },
                                { label: "Generate Report", icon: BarChart3, action: handleExportPDF },
                                { label: "System Sync", icon: Zap, action: () => alert("System Syncing...") },
                            ].map((btn, i) => (
                                <button
                                    key={i}
                                    onClick={() => { btn.action(); setIsQuickActionOpen(false); }}
                                    className="group flex items-center gap-3 bg-slate-900 border border-white/10 px-4 py-2 rounded-2xl shadow-2xl hover:bg-blue-600 transition-all text-slate-300 hover:text-white"
                                >
                                    <span className="text-xs font-bold uppercase tracking-widest hidden group-hover:block transition-all">{btn.label}</span>
                                    <btn.icon className="w-5 h-5" />
                                </button>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
                <button
                    onClick={() => setIsQuickActionOpen(!isQuickActionOpen)}
                    className={`w-14 h-14 rounded-[20px] shadow-2xl flex items-center justify-center transition-all ${isQuickActionOpen ? 'bg-rose-600 rotate-45' : 'bg-blue-600 shadow-blue-500/30'}`}
                >
                    <X className={`w-6 h-6 text-white transition-transform ${!isQuickActionOpen && 'rotate-45'}`} />
                </button>
            </div>
        </div>
    );
};

export default AdminDashboard;
