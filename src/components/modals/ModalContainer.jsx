import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export default function ModalContainer({ isOpen, onClose, title, subtitle, icon: Icon, glowColor = 'cyan', children }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const glowBorder = {
    cyan: 'border-cyan-500/50 shadow-neon-cyan',
    green: 'border-emerald-500/50 shadow-neon-green',
    purple: 'border-purple-500/50 shadow-neon-purple',
    amber: 'border-amber-500/50 shadow-neon-amber',
    pink: 'border-pink-500/50 shadow-neon-pink',
  }[glowColor] || 'border-cyan-500/50 shadow-neon-cyan';

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6 overflow-y-auto pointer-events-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#04060a]/85 backdrop-blur-lg"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: 'spring', damping: 26, stiffness: 320 }}
            className={`relative w-full max-w-3xl my-auto rounded-3xl glass-panel border ${glowBorder} bg-[#0a0f1d] text-slate-100 overflow-hidden shadow-2xl flex flex-col max-h-[90vh] z-10`}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-[#0d1527]/90 shrink-0">
              <div className="flex items-center gap-3">
                {Icon && (
                  <div className="p-2.5 rounded-2xl bg-slate-800/90 border border-slate-700 text-cyan-400">
                    <Icon className="w-5 h-5" />
                  </div>
                )}
                <div>
                  <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
                    {title}
                  </h3>
                  {subtitle && (
                    <p className="text-xs text-slate-400 font-mono">{subtitle}</p>
                  )}
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-slate-400 hover:text-white transition-colors"
                title="Close modal (Esc)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-6 overflow-y-auto text-sm space-y-6">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
