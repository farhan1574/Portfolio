import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Cpu, Sparkles, Code2 } from 'lucide-react';

export default function LoadingScreen({ onLoaded }) {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState("Initializing Three.js Shader Core...");

  const steps = [
    { threshold: 20, text: "Compiling 3D Isometric Geometries..." },
    { threshold: 45, text: "Loading Farhan's Resume & Projects..." },
    { threshold: 70, text: "Setting Up Lighting & Neon Shaders..." },
    { threshold: 90, text: "Calibrating Bounded Orbit Controls..." },
    { threshold: 100, text: "Compiling Farhan's Workspace..." },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            onLoaded();
          }, 400);
          return 100;
        }
        const next = prev + Math.floor(Math.random() * 8) + 4;
        const boundedNext = Math.min(next, 100);
        
        const matched = steps.find(s => boundedNext <= s.threshold);
        if (matched) {
          setCurrentStep(matched.text);
        }
        return boundedNext;
      });
    }, 45);

    return () => clearInterval(timer);
  }, [onLoaded]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#07090e] text-white p-6 select-none"
    >
      {/* Background Cyber Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293715_1px,transparent_1px),linear-gradient(to_bottom,#1f293715_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,242,254,0.08)_0%,transparent_70%)] pointer-events-none" />

      <div className="relative z-10 w-full max-w-md flex flex-col items-center text-center">
        {/* Glowing Icon Centerpiece */}
        <div className="relative mb-8">
          <div className="w-20 h-20 rounded-2xl bg-slate-900/90 border border-cyan-500/40 flex items-center justify-center shadow-neon-cyan relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 to-purple-500/20" />
            <Code2 className="w-10 h-10 text-cyan-400 relative z-10 animate-pulse" />
          </div>
          <div className="absolute -inset-2 rounded-2xl bg-cyan-500/20 blur-xl animate-pulse-glow pointer-events-none" />
        </div>

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">
          Farhan Ahmad
        </h1>
        <p className="text-xs uppercase tracking-widest text-cyan-400/90 font-mono mb-6">
          Interactive 3D Developer Portfolio
        </p>

        {/* Progress Bar Container */}
        <div className="w-full bg-slate-900/90 border border-slate-800 rounded-full h-3.5 p-0.5 mb-4 shadow-inner relative overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-full relative"
            style={{ width: `${progress}%` }}
            transition={{ ease: "easeOut" }}
          >
            <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.4),transparent)] animate-[move_1.5s_infinite]" />
          </motion.div>
        </div>

        {/* Status Text and Percentage */}
        <div className="w-full flex items-center justify-between text-xs font-mono text-slate-400">
          <div className="flex items-center gap-2 text-slate-300">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
            <span className="truncate max-w-[260px]">{currentStep}</span>
          </div>
          <span className="text-cyan-400 font-bold">{progress}%</span>
        </div>

        {/* Tech Badges */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2 text-[11px] font-mono text-slate-500">
          <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800">React 18</span>
          <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800">Three.js</span>
          <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800">R3F Isometric</span>
          <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800">Tailwind</span>
        </div>
      </div>
    </motion.div>
  );
}
