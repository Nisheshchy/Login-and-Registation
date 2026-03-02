import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Lock, ArrowRight, CheckCircle2, Eye, EyeOff } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Login = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate successful login
    setIsSuccess(true);
  };

  return (
    <div className="bg-slate-900/40 backdrop-blur-2xl p-8 rounded-3xl shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] border border-white/10 w-full relative overflow-hidden min-h-[500px] flex items-center justify-center">
      <AnimatePresence mode="wait">
        {!isSuccess ? (
          <motion.div
            key="login-form"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
            transition={{ duration: 0.4 }}
            className="w-full"
          >
            <div className="text-center mb-10">
              <motion.h1
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-4xl font-extrabold text-white mb-3 tracking-tight"
              >
                Welcome Back
              </motion.h1>
              <motion.p
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-slate-400 text-sm font-medium"
              >
                Please enter your details to sign in
              </motion.p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Email */}
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.1em] ml-1" htmlFor="email">
                  Email Address
                </label>
                <motion.div
                  whileFocus={{ scale: 1.01 }}
                  className="relative group"
                >
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-blue-500 transition-colors" />
                  <input
                    required
                    className="w-full bg-slate-800/40 border border-slate-700/50 rounded-2xl py-3.5 pl-12 pr-4 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/50 transition-all outline-none"
                    type="email"
                    id="email"
                    name="email"
                    placeholder="name@company.com"
                  />
                </motion.div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <div className="flex justify-between items-center px-1">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.1em]" htmlFor="password">
                    Password
                  </label>
                  <button type="button" className="text-xs text-blue-400 font-bold hover:text-blue-300 transition-colors">
                    Forgot?
                  </button>
                </div>
                <motion.div
                  whileFocus={{ scale: 1.01 }}
                  className="relative group"
                >
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-blue-500 transition-colors" />
                  <input
                    required
                    className="w-full bg-slate-800/40 border border-slate-700/50 rounded-2xl py-3.5 pl-12 pr-12 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/50 transition-all outline-none"
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </motion.div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02, backgroundColor: "#3b82f6" }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-blue-600 text-white font-bold py-4 rounded-2xl shadow-xl shadow-blue-900/20 flex items-center justify-center space-x-3 transition-colors mt-6"
              >
                <span className="text-lg">Sign In</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </form>

            <div className="mt-10 text-center">
              <p className="text-slate-400 text-sm">
                Don't have an account?{" "}
                <Link to="/signup" className="text-blue-400 font-bold hover:text-blue-300 transition-colors underline-offset-4 hover:underline">
                  Create account
                </Link>
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="success-card"
            initial={{ opacity: 0, scale: 0.8, rotateY: 90 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            className="flex flex-col items-center justify-center text-center py-10"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.2 }}
              className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mb-6 border border-emerald-500/30 shadow-[0_0_30px_rgba(16,185,129,0.2)]"
            >
              <CheckCircle2 className="w-10 h-10 text-emerald-400" />
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-3xl font-extrabold text-white mb-2"
            >
              Login Successful!
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-slate-400 max-w-[250px]"
            >
              Your personal dashboard is being prepared...
            </motion.p>
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              onClick={() => setIsSuccess(false)}
              className="mt-8 text-slate-500 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest"
            >
              Back to login
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Login;
