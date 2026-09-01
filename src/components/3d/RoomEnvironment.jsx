import React from 'react';
import { RoundedBox, Sparkles } from '@react-three/drei';

export default function RoomEnvironment({ themeConfig }) {
  const { floorColor, wallColor, windowColor, accentColor } = themeConfig;

  return (
    <group position={[0, 0, 0]}>
      {/* Ambient Floating Dust Motes */}
      <Sparkles
        count={50}
        scale={[8, 6, 8]}
        size={2.5}
        speed={0.4}
        opacity={0.6}
        color={accentColor}
        position={[0, 2.5, 0]}
      />

      {/* Main Floor Platform */}
      <RoundedBox
        args={[7, 0.4, 7]}
        radius={0.08}
        smoothness={4}
        position={[0, -0.2, 0]}
        receiveShadow
      >
        <meshStandardMaterial
          color={floorColor}
          roughness={0.4}
          metalness={0.15}
        />
      </RoundedBox>

      {/* Sub-floor shadow base */}
      <mesh position={[0, -0.42, 0]}>
        <boxGeometry args={[7.2, 0.05, 7.2]} />
        <meshBasicMaterial color="#04060a" />
      </mesh>

      {/* Modern Floor Rug under Desk */}
      <RoundedBox
        args={[3.8, 0.02, 3.4]}
        radius={0.04}
        smoothness={2}
        position={[0.2, 0.01, -0.6]}
        receiveShadow
      >
        <meshStandardMaterial
          color="#131b2e"
          roughness={0.8}
          metalness={0.05}
        />
      </RoundedBox>

      {/* Rug Accent Border */}
      <mesh position={[0.2, 0.02, -0.6]}>
        <ringGeometry args={[1.6, 1.65, 32]} />
        <meshStandardMaterial color={accentColor} emissive={accentColor} emissiveIntensity={0.3} />
      </mesh>

      {/* Back Wall (North Wall) */}
      <group position={[0, 2.2, -3.4]}>
        <RoundedBox args={[7, 4.4, 0.2]} radius={0.04} smoothness={2} receiveShadow>
          <meshStandardMaterial
            color={wallColor}
            roughness={0.6}
            metalness={0.1}
          />
        </RoundedBox>

        {/* Back Wall Baseboard Trim */}
        <mesh position={[0, -2.1, 0.12]}>
          <boxGeometry args={[7, 0.2, 0.05]} />
          <meshStandardMaterial color="#080c14" />
        </mesh>

        {/* Back Wall LED Accent Strip */}
        <mesh position={[0, -2.18, 0.15]}>
          <boxGeometry args={[6.8, 0.03, 0.02]} />
          <meshBasicMaterial color={accentColor} />
        </mesh>
      </group>

      {/* Left Wall (West Wall) */}
      <group position={[-3.4, 2.2, 0]}>
        <RoundedBox args={[0.2, 4.4, 7]} radius={0.04} smoothness={2} receiveShadow>
          <meshStandardMaterial
            color={wallColor}
            roughness={0.6}
            metalness={0.1}
          />
        </RoundedBox>

        {/* Left Wall Baseboard Trim */}
        <mesh position={[0.12, -2.1, 0]}>
          <boxGeometry args={[0.05, 0.2, 7]} />
          <meshStandardMaterial color="#080c14" />
        </mesh>

        {/* Left Wall LED Accent Strip */}
        <mesh position={[0.15, -2.18, 0]}>
          <boxGeometry args={[0.02, 0.03, 6.8]} />
          <meshBasicMaterial color={accentColor} />
        </mesh>
      </group>

      {/* Window on Left Wall */}
      <group position={[-3.32, 2.4, 0.8]}>
        {/* Window Glow Backdrop / Skyline */}
        <mesh position={[-0.05, 0, 0]}>
          <planeGeometry args={[2.2, 2.6]} />
          <meshBasicMaterial color={windowColor} />
        </mesh>

        {/* Window Glass Pane */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.04, 2.6, 2.2]} />
          <meshStandardMaterial
            color="#38bdf8"
            transparent
            opacity={0.35}
            roughness={0.1}
            metalness={0.9}
          />
        </mesh>

        {/* Window Frame Outer */}
        <mesh position={[0.03, 0, 0]}>
          <boxGeometry args={[0.08, 2.7, 0.1]} />
          <meshStandardMaterial color="#0f172a" roughness={0.3} />
        </mesh>
        <mesh position={[0.03, 0, 0]}>
          <boxGeometry args={[0.08, 0.1, 2.3]} />
          <meshStandardMaterial color="#0f172a" roughness={0.3} />
        </mesh>
        <mesh position={[0.03, 1.35, 0]}>
          <boxGeometry args={[0.08, 0.1, 2.3]} />
          <meshStandardMaterial color="#0f172a" roughness={0.3} />
        </mesh>
        <mesh position={[0.03, -1.35, 0]}>
          <boxGeometry args={[0.16, 0.1, 2.4]} />
          <meshStandardMaterial color="#1e293b" roughness={0.3} />
        </mesh>
        <mesh position={[0.03, 0, 1.15]}>
          <boxGeometry args={[0.08, 2.7, 0.1]} />
          <meshStandardMaterial color="#0f172a" roughness={0.3} />
        </mesh>
        <mesh position={[0.03, 0, -1.15]}>
          <boxGeometry args={[0.08, 2.7, 0.1]} />
          <meshStandardMaterial color="#0f172a" roughness={0.3} />
        </mesh>

        {/* Window Cross Dividers */}
        <mesh position={[0.02, 0, 0]}>
          <boxGeometry args={[0.04, 2.6, 0.05]} />
          <meshStandardMaterial color="#1e293b" />
        </mesh>
        <mesh position={[0.02, 0.3, 0]}>
          <boxGeometry args={[0.04, 0.05, 2.2]} />
          <meshStandardMaterial color="#1e293b" />
        </mesh>
      </group>
    </group>
  );
}
