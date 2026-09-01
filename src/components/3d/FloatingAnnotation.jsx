import React, { useState } from 'react';
import { Html } from '@react-three/drei';
import { ArrowRight } from 'lucide-react';

export default function FloatingAnnotation({ position, title, tooltip, color = '#00f2fe', onClick, isHovered, hide = false }) {
  const [internalHover, setInternalHover] = useState(false);
  const active = isHovered || internalHover;

  // Completely unmount and hide when a modal is open
  if (hide) return null;

  return (
    <group position={position}>
      <Html
        center
        distanceFactor={10}
        zIndexRange={[20, 0]}
        style={{
          transition: 'all 0.25s ease',
          pointerEvents: 'auto',
          userSelect: 'none',
        }}
      >
        <div
          onMouseEnter={() => setInternalHover(true)}
          onMouseLeave={() => setInternalHover(false)}
          onClick={(e) => {
            e.stopPropagation();
            onClick?.();
          }}
          className="cursor-pointer group flex flex-col items-center"
        >
          {/* Tooltip Tag */}
          <div
            className={`px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold whitespace-nowrap transition-all duration-200 flex items-center gap-1.5 shadow-xl border ${
              active
                ? 'scale-105 -translate-y-1.5 bg-[#090d16] text-white border-opacity-100'
                : 'scale-90 bg-[#090d16]/90 text-slate-300 border-opacity-40'
            }`}
            style={{
              borderColor: color,
              boxShadow: active ? `0 0 16px ${color}80` : `0 0 8px ${color}20`,
            }}
          >
            <span
              className="w-2 h-2 rounded-full shrink-0"
              style={{
                backgroundColor: color,
                boxShadow: `0 0 8px ${color}`,
              }}
            />
            <span>{tooltip}</span>
            <ArrowRight className="w-3 h-3 text-white transition-transform group-hover:translate-x-0.5" />
          </div>

          {/* Indicator Needle */}
          <div
            className="w-0.5 h-2.5 transition-all duration-200"
            style={{
              backgroundColor: color,
              boxShadow: `0 0 6px ${color}`,
            }}
          />

          {/* Glowing Beacon Dot */}
          <div
            className="w-2.5 h-2.5 rounded-full transition-transform duration-200"
            style={{
              backgroundColor: color,
              boxShadow: `0 0 10px ${color}`,
              transform: active ? 'scale(1.3)' : 'scale(1)',
            }}
          />
        </div>
      </Html>
    </group>
  );
}
