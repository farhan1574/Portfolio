import React, { useState } from 'react';
import { 
  Box, 
  FileText, 
  Layers, 
  Terminal, 
  Award, 
  Mail, 
  Sparkles, 
  Download, 
  SunMedium, 
  Moon, 
  Flame, 
  ExternalLink,
  Github,
  Linkedin,
  Compass
} from 'lucide-react';
import { portfolioData } from '../../data/portfolioData';

export default function Navbar({ 
  viewMode, 
  setViewMode, 
  activeModal, 
  openModal, 
  lightingTheme, 
  setLightingTheme, 
  onPrintResume,
  resetCamera
}) {
  const [showThemeMenu, setShowThemeMenu] = useState(false);

  const navHotspots = [
    { id: 'threadly', label: 'Threadly', icon: Layers, color: 'text-cyan-400' },
    { id: 'future-bright', label: 'Future Bright', icon: Box, color: 'text-emerald-400' },
    { id: 'terminal', label: 'Skills & Terminal', icon: Terminal, color: 'text-purple-400' },
    { id: 'certificates', label: 'Certificates', icon: Award, color: 'text-amber-400' },
    { id: 'contact', label: 'Contact', icon: Mail, color: 'text-pink-400' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 p-3 sm:p-4 pointer-events-none no-print">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
        {/* Left: Farhan Ahmad Identity Badge */}
        <div className="pointer-events-auto flex items-center gap-3">
          <div 
            onClick={resetCamera}
            className="group flex items-center gap-3 px-3 py-2 rounded-2xl glass-panel border border-cyan-500/30 hover:border-cyan-400/60 transition-all cursor-pointer shadow-glass hover:shadow-neon-cyan"
            title="Farhan Ahmad - Click to reset camera overview"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-500 to-purple-600 flex items-center justify-center font-bold text-white text-sm shadow-md">
              FA
            </div>
            <div className="hidden sm:flex flex-col text-left">
              <span className="font-bold text-sm tracking-tight text-white group-hover:text-cyan-400 transition-colors">
                {portfolioData.personal.name}
              </span>
              <span className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping inline-block" />
                Software Engineer / C++
              </span>
            </div>
          </div>
        </div>

        {/* Center: Hotspot Quick Jump Bar (Visible on larger screens) */}
        <nav className="pointer-events-auto hidden lg:flex items-center gap-1 px-2 py-1.5 rounded-2xl glass-panel border border-slate-700/60 shadow-glass">
          {navHotspots.map((item) => {
            const Icon = item.icon;
            const isActive = activeModal === item.id;
            return (
              <button
                key={item.id}
                onClick={() => openModal(item.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-neon-cyan'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${item.color}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Controls: 2D/3D Toggle + Theme + Resume */}
        <div className="pointer-events-auto flex items-center gap-2">
          {/* Recruiter View (2D / 3D) Mode Toggle */}
          <button
            onClick={() => setViewMode(viewMode === '3d' ? '2d' : '3d')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-2xl text-xs font-semibold transition-all border shadow-glass ${
              viewMode === '2d'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-black border-emerald-400 shadow-neon-green'
                : 'glass-panel text-slate-200 border-slate-700 hover:border-cyan-400 hover:text-cyan-300'
            }`}
            title="Toggle between 3D Interactive Room and 2D Recruiter Resume View"
          >
            {viewMode === '3d' ? (
              <>
                <FileText className="w-4 h-4 text-emerald-400" />
                <span className="hidden sm:inline">Recruiter View (2D)</span>
                <span className="sm:hidden">2D Mode</span>
              </>
            ) : (
              <>
                <Box className="w-4 h-4 text-black" />
                <span>3D Room View</span>
              </>
            )}
          </button>

          {/* Lighting Presets Menu (In 3D mode) */}
          {viewMode === '3d' && (
            <div className="relative">
              <button
                onClick={() => setShowThemeMenu(!showThemeMenu)}
                className="p-2 rounded-2xl glass-panel border border-slate-700 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/40 transition-all shadow-glass"
                title="Lighting Ambience Presets"
              >
                {lightingTheme === 'cyberpunk' && <Moon className="w-4 h-4 text-cyan-400" />}
                {lightingTheme === 'lofi' && <Flame className="w-4 h-4 text-amber-400" />}
                {lightingTheme === 'studio' && <SunMedium className="w-4 h-4 text-yellow-300" />}
              </button>

              {showThemeMenu && (
                <div className="absolute right-0 mt-2 w-44 rounded-2xl glass-panel border border-cyan-500/30 p-1.5 shadow-neon-cyan flex flex-col gap-1 z-50">
                  <div className="px-2.5 py-1 text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                    Lighting Theme
                  </div>
                  <button
                    onClick={() => { setLightingTheme('cyberpunk'); setShowThemeMenu(false); }}
                    className={`flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-xs text-left transition-colors ${
                      lightingTheme === 'cyberpunk' ? 'bg-cyan-500/20 text-cyan-300 font-semibold' : 'text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <Moon className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Cyberpunk Neon</span>
                  </button>
                  <button
                    onClick={() => { setLightingTheme('lofi'); setShowThemeMenu(false); }}
                    className={`flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-xs text-left transition-colors ${
                      lightingTheme === 'lofi' ? 'bg-amber-500/20 text-amber-300 font-semibold' : 'text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <Flame className="w-3.5 h-3.5 text-amber-400" />
                    <span>Lo-Fi Sunset</span>
                  </button>
                  <button
                    onClick={() => { setLightingTheme('studio'); setShowThemeMenu(false); }}
                    className={`flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-xs text-left transition-colors ${
                      lightingTheme === 'studio' ? 'bg-blue-500/20 text-blue-300 font-semibold' : 'text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <SunMedium className="w-3.5 h-3.5 text-yellow-300" />
                    <span>Modern Studio</span>
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Download Resume Button */}
          <button
            onClick={onPrintResume}
            className="flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-semibold text-xs transition-all shadow-neon-cyan active:scale-95"
            title="Download / Print Clean Resume"
          >
            <Download className="w-3.5 h-3.5 text-black" />
            <span className="hidden md:inline">Resume</span>
          </button>
        </div>
      </div>
    </header>
  );
}
