import React from 'react';
import { RotateCcw, Sparkles, Compass, HelpCircle } from 'lucide-react';

export default function RoomControls({ onResetCamera, lightingTheme, activeModal }) {
  if (activeModal) return null; // Hide when a modal is open

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 pointer-events-none flex flex-col sm:flex-row items-center gap-2 no-print">
      {/* Interaction Hint Pill */}
      <div className="px-4 py-2 rounded-2xl glass-panel border border-cyan-500/30 text-xs font-mono text-slate-300 shadow-glass flex items-center gap-2.5 backdrop-blur-md">
        <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
        <span>Click 3D glowing objects or drag to rotate view</span>
      </div>

      {/* Reset Camera Button */}
      <button
        onClick={onResetCamera}
        className="pointer-events-auto flex items-center gap-1.5 px-3.5 py-2 rounded-2xl glass-panel border border-slate-700 hover:border-cyan-400 text-slate-300 hover:text-white text-xs font-semibold shadow-glass transition-all active:scale-95"
        title="Reset 3D camera to default isometric overview"
      >
        <RotateCcw className="w-3.5 h-3.5 text-cyan-400" />
        <span>Reset Angle</span>
      </button>
    </div>
  );
}
