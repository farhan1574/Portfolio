import React, { useState } from 'react';
import { RoundedBox, Cylinder } from '@react-three/drei';
import FloatingAnnotation from './FloatingAnnotation';
import { portfolioData } from '../../data/portfolioData';

export default function InteractiveObjects({ onSelectHotspot, activeModal, hoveredHotspot, setHoveredHotspot }) {
  const [localHover, setLocalHover] = useState(null);

  const handlePointerOver = (e, id) => {
    e.stopPropagation();
    if (activeModal) return;
    document.body.style.cursor = 'pointer';
    setLocalHover(id);
    setHoveredHotspot?.(id);
  };

  const handlePointerOut = (e) => {
    e.stopPropagation();
    document.body.style.cursor = 'auto';
    setLocalHover(null);
    setHoveredHotspot?.(null);
  };

  const handleClick = (e, id) => {
    e.stopPropagation();
    onSelectHotspot(id);
  };

  const isCurrentHovered = (id) => (!activeModal && (localHover === id || hoveredHotspot === id));
  const isHidden = !!activeModal;

  return (
    <group>
      {/* ========================================================
          1. CLOTHING RACK / WARDROBE -> THREADLY (E-COMMERCE)
      ======================================================== */}
      <group
        position={[-2.2, 0, -1.8]}
        onClick={(e) => handleClick(e, 'threadly')}
        onPointerOver={(e) => handlePointerOver(e, 'threadly')}
        onPointerOut={handlePointerOut}
      >
        {/* Rack Base Support Frame */}
        <mesh position={[0, 0.05, 0]}>
          <boxGeometry args={[0.1, 0.06, 1.2]} />
          <meshStandardMaterial
            color={isCurrentHovered('threadly') ? '#00f2fe' : '#1e293b'}
            emissive="#00f2fe"
            emissiveIntensity={isCurrentHovered('threadly') ? 0.6 : 0.05}
            metalness={0.9}
            roughness={0.2}
          />
        </mesh>
        <mesh position={[0, 0.05, 0.55]}>
          <boxGeometry args={[0.4, 0.06, 0.08]} />
          <meshStandardMaterial color="#0f172a" metalness={0.8} />
        </mesh>
        <mesh position={[0, 0.05, -0.55]}>
          <boxGeometry args={[0.4, 0.06, 0.08]} />
          <meshStandardMaterial color="#0f172a" metalness={0.8} />
        </mesh>

        {/* Vertical Uprights */}
        <Cylinder args={[0.02, 0.02, 2.0, 16]} position={[0, 1.05, 0.5]} castShadow>
          <meshStandardMaterial
            color={isCurrentHovered('threadly') ? '#00f2fe' : '#334155'}
            emissive="#00f2fe"
            emissiveIntensity={isCurrentHovered('threadly') ? 0.5 : 0}
            metalness={0.9}
          />
        </Cylinder>
        <Cylinder args={[0.02, 0.02, 2.0, 16]} position={[0, 1.05, -0.5]} castShadow>
          <meshStandardMaterial
            color={isCurrentHovered('threadly') ? '#00f2fe' : '#334155'}
            emissive="#00f2fe"
            emissiveIntensity={isCurrentHovered('threadly') ? 0.5 : 0}
            metalness={0.9}
          />
        </Cylinder>

        {/* Top Horizontal Rail */}
        <Cylinder args={[0.02, 0.02, 1.1, 16]} position={[0, 2.0, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
          <meshStandardMaterial
            color={isCurrentHovered('threadly') ? '#00f2fe' : '#475569'}
            emissive="#00f2fe"
            emissiveIntensity={isCurrentHovered('threadly') ? 0.8 : 0.1}
            metalness={0.9}
          />
        </Cylinder>

        {/* Hanging Clothes on Hangers */}
        {[
          { color: '#00f2fe', z: -0.35, length: 0.85, width: 0.28 },
          { color: '#ec4899', z: -0.18, length: 0.80, width: 0.26 },
          { color: '#3b82f6', z: 0.0, length: 0.90, width: 0.28 },
          { color: '#10b981', z: 0.18, length: 0.75, width: 0.25 },
          { color: '#f59e0b', z: 0.35, length: 0.82, width: 0.27 },
        ].map((item, idx) => (
          <group key={idx} position={[0, 1.55, item.z]}>
            <mesh position={[0, 0.42, 0]}>
              <ringGeometry args={[0.03, 0.04, 16]} />
              <meshStandardMaterial color="#94a3b8" metalness={0.9} />
            </mesh>
            <RoundedBox
              args={[item.width, item.length, 0.09]}
              radius={0.03}
              smoothness={2}
              position={[0, 0, 0]}
              castShadow
            >
              <meshStandardMaterial
                color={item.color}
                roughness={0.7}
                emissive={item.color}
                emissiveIntensity={isCurrentHovered('threadly') ? 0.3 : 0.05}
              />
            </RoundedBox>
          </group>
        ))}

        {/* Floating Tooltip Annotation */}
        <FloatingAnnotation
          position={[0, 2.3, 0]}
          title="Threadly"
          tooltip="Explore Threadly (E-Commerce)"
          color="#00f2fe"
          isHovered={isCurrentHovered('threadly')}
          onClick={() => onSelectHotspot('threadly')}
          hide={isHidden}
        />
      </group>

      {/* ========================================================
          2. SMART BLACKBOARD / DIGITAL WALL MONITOR -> FUTURE BRIGHT
      ======================================================== */}
      <group
        position={[-1.2, 2.2, -3.28]}
        onClick={(e) => handleClick(e, 'future-bright')}
        onPointerOver={(e) => handlePointerOver(e, 'future-bright')}
        onPointerOut={handlePointerOut}
      >
        <RoundedBox
          args={[2.2, 1.3, 0.06]}
          radius={0.04}
          smoothness={3}
          position={[0, 0, 0]}
          castShadow
        >
          <meshStandardMaterial
            color={isCurrentHovered('future-bright') ? '#10b981' : '#090d16'}
            emissive="#10b981"
            emissiveIntensity={isCurrentHovered('future-bright') ? 0.6 : 0.08}
            metalness={0.8}
            roughness={0.2}
          />
        </RoundedBox>

        <mesh position={[0, 0, 0.035]}>
          <planeGeometry args={[2.08, 1.18]} />
          <meshBasicMaterial color="#061a14" />
        </mesh>

        <group position={[0, 0, 0.04]}>
          <mesh position={[0, 0.46, 0]}>
            <planeGeometry args={[1.9, 0.12]} />
            <meshBasicMaterial color="#10b981" />
          </mesh>
          {[-0.3, 0, 0.3].map((x, i) => (
            <mesh key={i} position={[x, 0.15, 0]}>
              <planeGeometry args={[0.55, 0.35]} />
              <meshBasicMaterial color="#0d3829" />
            </mesh>
          ))}
          <mesh position={[0, -0.22, 0]}>
            <planeGeometry args={[1.9, 0.22]} />
            <meshBasicMaterial color="#0f4532" />
          </mesh>
        </group>

        <FloatingAnnotation
          position={[0, 0.95, 0.2]}
          title="Future Bright"
          tooltip="Explore Future Bright (Portal)"
          color="#10b981"
          isHovered={isCurrentHovered('future-bright')}
          onClick={() => onSelectHotspot('future-bright')}
          hide={isHidden}
        />
      </group>

      {/* ========================================================
          3. DESK LAPTOP & DUAL MONITORS -> SKILLS & TERMINAL
      ======================================================== */}
      <group
        position={[0.2, 1.04, -1.2]}
        onClick={(e) => handleClick(e, 'terminal')}
        onPointerOver={(e) => handlePointerOver(e, 'terminal')}
        onPointerOut={handlePointerOut}
      >
        <group position={[0, 0.45, -0.3]}>
          <mesh position={[0, -0.4, 0]}>
            <cylinderGeometry args={[0.18, 0.18, 0.02, 16]} />
            <meshStandardMaterial color="#0f172a" metalness={0.9} />
          </mesh>
          <mesh position={[0, -0.18, 0]}>
            <boxGeometry args={[0.05, 0.45, 0.05]} />
            <meshStandardMaterial color="#0f172a" metalness={0.9} />
          </mesh>

          <RoundedBox args={[1.6, 0.75, 0.04]} radius={0.02} smoothness={2} castShadow>
            <meshStandardMaterial
              color={isCurrentHovered('terminal') ? '#a855f7' : '#0b0f19'}
              emissive="#a855f7"
              emissiveIntensity={isCurrentHovered('terminal') ? 0.7 : 0.1}
              metalness={0.8}
            />
          </RoundedBox>

          <mesh position={[0, 0, 0.025]}>
            <planeGeometry args={[1.52, 0.68]} />
            <meshBasicMaterial color="#0d111d" />
          </mesh>

          <group position={[-0.6, 0.22, 0.03]}>
            {[
              { width: 0.35, color: '#a855f7' },
              { width: 0.7, color: '#00f2fe' },
              { width: 0.5, color: '#10b981' },
              { width: 0.9, color: '#f59e0b' },
              { width: 0.4, color: '#ec4899' },
              { width: 0.65, color: '#38bdf8' },
              { width: 0.8, color: '#a855f7' },
            ].map((line, i) => (
              <mesh key={i} position={[line.width / 2, -i * 0.065, 0]}>
                <planeGeometry args={[line.width, 0.025]} />
                <meshBasicMaterial color={line.color} />
              </mesh>
            ))}
          </group>
        </group>

        <group position={[-0.85, 0.02, 0.1]} rotation={[0, Math.PI / 8, 0]}>
          <RoundedBox args={[0.55, 0.02, 0.38]} radius={0.01} smoothness={2}>
            <meshStandardMaterial color="#1e293b" metalness={0.8} roughness={0.3} />
          </RoundedBox>
          <mesh position={[0, 0.015, 0.03]}>
            <planeGeometry args={[0.48, 0.22]} />
            <meshStandardMaterial color="#090d16" />
          </mesh>
          <group position={[0, 0.01, -0.18]} rotation={[-1.9, 0, 0]}>
            <RoundedBox args={[0.55, 0.38, 0.015]} radius={0.01} smoothness={2} position={[0, 0.19, 0]}>
              <meshStandardMaterial color="#1e293b" metalness={0.8} />
            </RoundedBox>
            <mesh position={[0, 0.19, 0.01]}>
              <planeGeometry args={[0.51, 0.34]} />
              <meshBasicMaterial color="#a855f7" />
            </mesh>
          </group>
        </group>

        <FloatingAnnotation
          position={[0, 1.1, 0]}
          title="Skills & Terminal"
          tooltip="Skills & Coding Terminal"
          color="#a855f7"
          isHovered={isCurrentHovered('terminal')}
          onClick={() => onSelectHotspot('terminal')}
          hide={isHidden}
        />
      </group>

      {/* ========================================================
          4. WALL PICTURE FRAMES / DIPLOMAS -> CERTIFICATES
      ======================================================== */}
      <group
        position={[1.8, 2.1, -3.28]}
        onClick={(e) => handleClick(e, 'certificates')}
        onPointerOver={(e) => handlePointerOver(e, 'certificates')}
        onPointerOut={handlePointerOut}
      >
        <group position={[-0.45, 0, 0]} rotation={[0, 0, isCurrentHovered('certificates') ? 0.05 : 0]}>
          <RoundedBox args={[0.7, 0.9, 0.04]} radius={0.02} smoothness={2} castShadow>
            <meshStandardMaterial
              color={isCurrentHovered('certificates') ? '#f59e0b' : '#1e293b'}
              emissive="#f59e0b"
              emissiveIntensity={isCurrentHovered('certificates') ? 0.6 : 0.08}
              metalness={0.8}
            />
          </RoundedBox>
          <mesh position={[0, 0, 0.025]}>
            <planeGeometry args={[0.6, 0.78]} />
            <meshBasicMaterial color="#0f172a" />
          </mesh>
          <mesh position={[0, 0.15, 0.03]}>
            <circleGeometry args={[0.1, 16]} />
            <meshBasicMaterial color="#f59e0b" />
          </mesh>
          <mesh position={[0, -0.12, 0.03]}>
            <planeGeometry args={[0.45, 0.05]} />
            <meshBasicMaterial color="#38bdf8" />
          </mesh>
        </group>

        <group position={[0.45, 0, 0]} rotation={[0, 0, isCurrentHovered('certificates') ? -0.05 : 0]}>
          <RoundedBox args={[0.7, 0.9, 0.04]} radius={0.02} smoothness={2} castShadow>
            <meshStandardMaterial
              color={isCurrentHovered('certificates') ? '#f59e0b' : '#1e293b'}
              emissive="#f59e0b"
              emissiveIntensity={isCurrentHovered('certificates') ? 0.6 : 0.08}
              metalness={0.8}
            />
          </RoundedBox>
          <mesh position={[0, 0, 0.025]}>
            <planeGeometry args={[0.6, 0.78]} />
            <meshBasicMaterial color="#0f172a" />
          </mesh>
          <mesh position={[0, 0.15, 0.03]}>
            <circleGeometry args={[0.1, 16]} />
            <meshBasicMaterial color="#10b981" />
          </mesh>
          <mesh position={[0, -0.12, 0.03]}>
            <planeGeometry args={[0.45, 0.05]} />
            <meshBasicMaterial color="#a855f7" />
          </mesh>
        </group>

        <FloatingAnnotation
          position={[0, 0.85, 0.2]}
          title="Certificates"
          tooltip="Verified Certificates"
          color="#f59e0b"
          isHovered={isCurrentHovered('certificates')}
          onClick={() => onSelectHotspot('certificates')}
          hide={isHidden}
        />
      </group>

      {/* ========================================================
          5. SMARTPHONE & STEAMING COFFEE MUG -> CONTACT
      ======================================================== */}
      <group
        position={[1.2, 1.04, -0.85]}
        onClick={(e) => handleClick(e, 'contact')}
        onPointerOver={(e) => handlePointerOver(e, 'contact')}
        onPointerOut={handlePointerOut}
      >
        <group position={[-0.18, 0.015, 0]} rotation={[0, -Math.PI / 6, 0]}>
          <RoundedBox args={[0.16, 0.018, 0.32]} radius={0.015} smoothness={3} castShadow>
            <meshStandardMaterial
              color={isCurrentHovered('contact') ? '#ec4899' : '#0b0f19'}
              emissive="#ec4899"
              emissiveIntensity={isCurrentHovered('contact') ? 0.8 : 0.1}
              metalness={0.9}
            />
          </RoundedBox>
          <mesh position={[0, 0.012, 0]}>
            <planeGeometry args={[0.14, 0.28]} />
            <meshBasicMaterial color="#ec4899" />
          </mesh>
        </group>

        <group position={[0.18, 0.1, 0]}>
          <Cylinder args={[0.07, 0.06, 0.16, 16]} castShadow>
            <meshStandardMaterial
              color="#f8fafc"
              roughness={0.2}
              emissive="#ec4899"
              emissiveIntensity={isCurrentHovered('contact') ? 0.4 : 0.05}
            />
          </Cylinder>
          <mesh position={[0, 0.07, 0]}>
            <cylinderGeometry args={[0.06, 0.06, 0.01, 16]} />
            <meshStandardMaterial color="#451a03" roughness={0.1} />
          </mesh>
          <mesh position={[0.08, 0, 0]}>
            <torusGeometry args={[0.04, 0.012, 8, 16]} />
            <meshStandardMaterial color="#f8fafc" />
          </mesh>
        </group>

        <FloatingAnnotation
          position={[0, 0.6, 0]}
          title="Contact"
          tooltip="Get in Touch (Contact)"
          color="#ec4899"
          isHovered={isCurrentHovered('contact')}
          onClick={() => onSelectHotspot('contact')}
          hide={isHidden}
        />
      </group>
    </group>
  );
}
