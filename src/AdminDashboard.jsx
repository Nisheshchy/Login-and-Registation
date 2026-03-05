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
        },
        {
            title: "Active Users",
            value: "2,350",
            change: "+180.1%",
            trend: "up",
            icon: Users,
            color: "text-blue-400",
        },
        {
            title: "Sales",
            value: "+12,234",
            change: "+19%",
            trend: "up",
            icon: ShoppingBag,
            color: "text-purple-400",
        },
        {
            title: "Active Now",
            value: "+573",
            change: "+201",
            trend: "up",
            icon: Activity,
            color: "text-orange-400",
        },
    ];

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
                        { name: "Profile", icon: User },
                        { name: "Analytics", icon: BarChart3 },
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
                        )}
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
        </div>
    );
};

export default AdminDashboard;
