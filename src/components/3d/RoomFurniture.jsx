import React from 'react';
import { RoundedBox, Cylinder } from '@react-three/drei';

export default function RoomFurniture({ themeConfig }) {
  const { lampColor, accentColor } = themeConfig;

  return (
    <group>
      {/* ========================================================
          1. MAIN WORKSTATION DESK
      ======================================================== */}
      <group position={[0.2, 0, -1.2]}>
        {/* Desktop Surface */}
        <RoundedBox
          args={[3.4, 0.08, 1.8]}
          radius={0.03}
          smoothness={3}
          position={[0, 1.0, 0]}
          castShadow
          receiveShadow
        >
          <meshStandardMaterial
            color="#1e293b"
            roughness={0.25}
            metalness={0.2}
          />
        </RoundedBox>

        {/* Desk Under-Glow Strip */}
        <mesh position={[0, 0.95, 0.88]}>
          <boxGeometry args={[3.3, 0.02, 0.02]} />
          <meshBasicMaterial color={accentColor} />
        </mesh>

        {/* Desk Metal Legs (Left & Right Frames) */}
        <mesh position={[-1.55, 0.48, 0]} castShadow>
          <boxGeometry args={[0.06, 0.96, 1.6]} />
          <meshStandardMaterial color="#0b0f19" roughness={0.4} metalness={0.8} />
        </mesh>
        <mesh position={[1.55, 0.48, 0]} castShadow>
          <boxGeometry args={[0.06, 0.96, 1.6]} />
          <meshStandardMaterial color="#0b0f19" roughness={0.4} metalness={0.8} />
        </mesh>

        {/* Cable Management Tray & Support Beam */}
        <mesh position={[0, 0.9, -0.6]}>
          <boxGeometry args={[2.9, 0.08, 0.1]} />
          <meshStandardMaterial color="#0f172a" roughness={0.5} />
        </mesh>
      </group>

      {/* ========================================================
          2. ERGONOMIC DEVELOPER CHAIR
      ======================================================== */}
      <group position={[0.2, 0, 0.2]} rotation={[0, -Math.PI / 14, 0]}>
        {/* 5-Star Caster Base */}
        <Cylinder args={[0.35, 0.35, 0.04, 8]} position={[0, 0.06, 0]} castShadow>
          <meshStandardMaterial color="#0b0f19" metalness={0.9} roughness={0.3} />
        </Cylinder>
        {/* Wheels */}
        {[-0.25, 0, 0.25].map((x, i) => (
          <mesh key={i} position={[x, 0.03, 0.2]}>
            <sphereGeometry args={[0.03, 8, 8]} />
            <meshStandardMaterial color="#000000" />
          </mesh>
        ))}

        {/* Hydraulic Piston Column */}
        <Cylinder args={[0.04, 0.04, 0.4, 16]} position={[0, 0.26, 0]} castShadow>
          <meshStandardMaterial color="#334155" metalness={0.9} roughness={0.2} />
        </Cylinder>

        {/* Seat Cushion */}
        <RoundedBox args={[0.7, 0.1, 0.65]} radius={0.04} smoothness={3} position={[0, 0.48, 0]} castShadow>
          <meshStandardMaterial color="#1e293b" roughness={0.6} />
        </RoundedBox>

        {/* High Mesh Backrest */}
        <group position={[0, 0.9, 0.28]} rotation={[-0.1, 0, 0]}>
          <RoundedBox args={[0.65, 0.8, 0.06]} radius={0.03} smoothness={3} castShadow>
            <meshStandardMaterial color="#0f172a" roughness={0.7} />
          </RoundedBox>
          {/* Headrest */}
          <RoundedBox args={[0.4, 0.18, 0.08]} radius={0.03} smoothness={2} position={[0, 0.48, 0.02]} castShadow>
            <meshStandardMaterial color="#1e293b" roughness={0.6} />
          </RoundedBox>
        </group>

        {/* Armrests */}
        <group position={[-0.36, 0.62, 0]}>
          <mesh position={[0, -0.06, 0]}>
            <boxGeometry args={[0.04, 0.18, 0.06]} />
            <meshStandardMaterial color="#0b0f19" metalness={0.8} />
          </mesh>
          <RoundedBox args={[0.08, 0.04, 0.35]} radius={0.02} smoothness={2} position={[0, 0.05, 0]}>
            <meshStandardMaterial color="#334155" roughness={0.4} />
          </RoundedBox>
        </group>
        <group position={[0.36, 0.62, 0]}>
          <mesh position={[0, -0.06, 0]}>
            <boxGeometry args={[0.04, 0.18, 0.06]} />
            <meshStandardMaterial color="#0b0f19" metalness={0.8} />
          </mesh>
          <RoundedBox args={[0.08, 0.04, 0.35]} radius={0.02} smoothness={2} position={[0, 0.05, 0]}>
            <meshStandardMaterial color="#334155" roughness={0.4} />
          </RoundedBox>
        </group>
      </group>

      {/* ========================================================
          3. TALL BOOKSHELF IN CORNER
      ======================================================== */}
      <group position={[2.7, 0, -2.4]} rotation={[0, -Math.PI / 6, 0]}>
        {/* Bookshelf Frame */}
        <RoundedBox args={[1.1, 3.2, 0.45]} radius={0.03} smoothness={2} position={[0, 1.6, 0]} castShadow receiveShadow>
          <meshStandardMaterial color="#0f172a" roughness={0.5} />
        </RoundedBox>

        {/* Shelf Dividers */}
        {[0.6, 1.3, 2.0, 2.7].map((y, idx) => (
          <mesh key={idx} position={[0, y, 0]}>
            <boxGeometry args={[1.0, 0.04, 0.42]} />
            <meshStandardMaterial color="#1e293b" />
          </mesh>
        ))}

        {/* Books on Tier 2 */}
        <group position={[-0.35, 1.48, 0]}>
          {[
            { color: '#00f2fe', width: 0.07, h: 0.32 },
            { color: '#ec4899', width: 0.06, h: 0.35 },
            { color: '#a855f7', width: 0.08, h: 0.30 },
            { color: '#10b981', width: 0.05, h: 0.34 },
            { color: '#f59e0b', width: 0.07, h: 0.31 },
          ].map((b, i) => (
            <mesh key={i} position={[i * 0.08, 0, 0]}>
              <boxGeometry args={[b.width, b.h, 0.25]} />
              <meshStandardMaterial color={b.color} roughness={0.4} />
            </mesh>
          ))}
        </group>

        {/* Books on Tier 3 */}
        <group position={[-0.3, 2.18, 0]}>
          {[
            { color: '#3b82f6', width: 0.08, h: 0.32 },
            { color: '#eab308', width: 0.06, h: 0.28 },
            { color: '#06b6d4', width: 0.07, h: 0.34 },
            { color: '#8b5cf6', width: 0.09, h: 0.30 },
          ].map((b, i) => (
            <mesh key={i} position={[i * 0.09, 0, 0]}>
              <boxGeometry args={[b.width, b.h, 0.25]} />
              <meshStandardMaterial color={b.color} roughness={0.4} />
            </mesh>
          ))}
        </group>

        {/* Decorative Mini Trophy / Object on Top Shelf */}
        <group position={[0, 2.85, 0]}>
          <Cylinder args={[0.08, 0.08, 0.15, 16]}>
            <meshStandardMaterial color="#fbbf24" metalness={0.9} roughness={0.1} />
          </Cylinder>
          <sphereGeometry args={[0.08, 16, 16]} />
          <mesh position={[0, 0.12, 0]}>
            <sphereGeometry args={[0.06, 16, 16]} />
            <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={0.5} />
          </mesh>
        </group>
      </group>

      {/* ========================================================
          4. DESKTOP ACCESSORIES (KEYBOARD, MOUSE, SPEAKERS)
      ======================================================== */}
      {/* Keyboard & Mousepad */}
      <group position={[0.2, 1.05, -0.9]}>
        {/* Large Mousepad */}
        <RoundedBox args={[1.3, 0.01, 0.55]} radius={0.02} smoothness={2} position={[0, 0, 0]}>
          <meshStandardMaterial color="#0f172a" roughness={0.8} />
        </RoundedBox>

        {/* Mechanical Keyboard */}
        <group position={[-0.15, 0.02, 0.02]}>
          <RoundedBox args={[0.7, 0.025, 0.24]} radius={0.01} smoothness={2}>
            <meshStandardMaterial color="#090d16" roughness={0.3} />
          </RoundedBox>
          {/* Keycaps */}
          <mesh position={[0, 0.02, 0]}>
            <boxGeometry args={[0.66, 0.015, 0.2]} />
            <meshStandardMaterial color="#1e293b" roughness={0.5} />
          </mesh>
          {/* RGB Key Underglow */}
          <mesh position={[0, 0.01, 0]}>
            <boxGeometry args={[0.68, 0.005, 0.22]} />
            <meshBasicMaterial color="#00f2fe" />
          </mesh>
        </group>

        {/* Ergonomic Wireless Mouse */}
        <group position={[0.38, 0.02, 0.02]}>
          <RoundedBox args={[0.1, 0.03, 0.16]} radius={0.02} smoothness={3}>
            <meshStandardMaterial color="#090d16" roughness={0.2} metalness={0.5} />
          </RoundedBox>
          <mesh position={[0, 0.02, 0]}>
            <boxGeometry args={[0.01, 0.005, 0.06]} />
            <meshBasicMaterial color="#10b981" />
          </mesh>
        </group>
      </group>

      {/* Studio Monitor Speakers (Left & Right) */}
      <group position={[-1.1, 1.04, -1.3]}>
        <RoundedBox args={[0.22, 0.38, 0.22]} radius={0.02} smoothness={2} castShadow>
          <meshStandardMaterial color="#0b0f19" roughness={0.4} />
        </RoundedBox>
        {/* Speaker Driver Cones */}
        <Cylinder args={[0.06, 0.06, 0.02, 16]} position={[0, 0.06, 0.11]} rotation={[Math.PI / 2, 0, 0]}>
          <meshStandardMaterial color="#334155" roughness={0.3} metalness={0.5} />
        </Cylinder>
        <Cylinder args={[0.04, 0.04, 0.02, 16]} position={[0, -0.08, 0.11]} rotation={[Math.PI / 2, 0, 0]}>
          <meshStandardMaterial color="#334155" roughness={0.3} metalness={0.5} />
        </Cylinder>
        {/* RGB Audio Level Strip */}
        <mesh position={[0, -0.16, 0.11]}>
          <boxGeometry args={[0.14, 0.015, 0.01]} />
          <meshBasicMaterial color="#00f2fe" />
        </mesh>
      </group>

      <group position={[1.4, 1.04, -1.3]}>
        <RoundedBox args={[0.22, 0.38, 0.22]} radius={0.02} smoothness={2} castShadow>
          <meshStandardMaterial color="#0b0f19" roughness={0.4} />
        </RoundedBox>
        <Cylinder args={[0.06, 0.06, 0.02, 16]} position={[0, 0.06, 0.11]} rotation={[Math.PI / 2, 0, 0]}>
          <meshStandardMaterial color="#334155" roughness={0.3} metalness={0.5} />
        </Cylinder>
        <Cylinder args={[0.04, 0.04, 0.02, 16]} position={[0, -0.08, 0.11]} rotation={[Math.PI / 2, 0, 0]}>
          <meshStandardMaterial color="#334155" roughness={0.3} metalness={0.5} />
        </Cylinder>
        <mesh position={[0, -0.16, 0.11]}>
          <boxGeometry args={[0.14, 0.015, 0.01]} />
          <meshBasicMaterial color="#ec4899" />
        </mesh>
      </group>

      {/* ========================================================
          5. WARM DESK LAMP
      ======================================================== */}
      <group position={[-1.2, 1.04, -0.8]}>
        {/* Base */}
        <Cylinder args={[0.1, 0.1, 0.02, 16]}>
          <meshStandardMaterial color="#0b0f19" metalness={0.8} roughness={0.3} />
        </Cylinder>
        {/* Stem */}
        <Cylinder args={[0.015, 0.015, 0.4, 8]} position={[0, 0.2, 0]} rotation={[0, 0, -0.2]}>
          <meshStandardMaterial color="#475569" metalness={0.9} />
        </Cylinder>
        {/* Arm */}
        <Cylinder args={[0.012, 0.012, 0.3, 8]} position={[0.08, 0.42, 0]} rotation={[0, 0, 0.5]}>
          <meshStandardMaterial color="#475569" metalness={0.9} />
        </Cylinder>
        {/* Shade */}
        <group position={[0.18, 0.46, 0]} rotation={[0, 0, -0.6]}>
          <Cylinder args={[0.08, 0.04, 0.12, 16]}>
            <meshStandardMaterial color="#1e293b" metalness={0.7} />
          </Cylinder>
          {/* Bulb Light */}
          <mesh position={[0, -0.04, 0]}>
            <sphereGeometry args={[0.03, 16, 16]} />
            <meshBasicMaterial color={lampColor} />
          </mesh>
        </group>
      </group>

      {/* ========================================================
          6. INDOOR POTTED PLANT
      ======================================================== */}
      <group position={[-2.4, 0, 2.2]}>
        {/* Ceramic Pot */}
        <Cylinder args={[0.26, 0.2, 0.5, 16]} position={[0, 0.25, 0]} castShadow>
          <meshStandardMaterial color="#334155" roughness={0.4} />
        </Cylinder>
        {/* Soil */}
        <mesh position={[0, 0.48, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.24, 16]} />
          <meshStandardMaterial color="#1c1412" roughness={0.9} />
        </mesh>
        {/* Plant Leaves */}
        {[0, 1, 2, 3, 4].map((i) => (
          <group key={i} position={[0, 0.5, 0]} rotation={[0.2, (i * Math.PI * 2) / 5, 0.4]}>
            <RoundedBox args={[0.14, 0.45, 0.02]} radius={0.01} smoothness={2} position={[0, 0.2, 0]}>
              <meshStandardMaterial color="#10b981" roughness={0.5} />
            </RoundedBox>
          </group>
        ))}
      </group>
    </group>
  );
}
