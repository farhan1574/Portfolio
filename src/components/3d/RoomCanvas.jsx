import React, { useRef, useEffect, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import RoomEnvironment from './RoomEnvironment';
import RoomFurniture from './RoomFurniture';
import InteractiveObjects from './InteractiveObjects';
import { portfolioData } from '../../data/portfolioData';

// Camera Rig for Smooth Camera Transitions
function CameraRig({ cameraTarget, cameraPosition, activeModal }) {
  const { camera } = useThree();
  const targetVec = useRef(new THREE.Vector3(0, 1.2, 0));
  const posVec = useRef(new THREE.Vector3(12, 11, 12));

  useEffect(() => {
    if (cameraTarget) {
      targetVec.current.set(...cameraTarget);
    } else {
      targetVec.current.set(0, 1.2, 0);
    }

    if (cameraPosition) {
      posVec.current.set(...cameraPosition);
    } else {
      posVec.current.set(12, 11, 12);
    }
  }, [cameraTarget, cameraPosition]);

  useFrame((state, delta) => {
    const step = Math.min(delta * 2.8, 0.1);
    camera.position.lerp(posVec.current, step);
    state.camera.lookAt(targetVec.current);
  });

  return null;
}

export default function RoomCanvas({
  lightingTheme = 'cyberpunk',
  activeModal,
  onSelectHotspot,
  hoveredHotspot,
  setHoveredHotspot,
  cameraTarget,
  cameraPosition,
  orbitControlsRef
}) {
  const themeConfig = portfolioData.lightingPresets[lightingTheme] || portfolioData.lightingPresets.cyberpunk;

  return (
    <div className="w-full h-full relative select-none">
      <Canvas
        shadows
        dpr={[1, 2]}
        gl={{
          antialias: true,
          powerPreference: 'high-performance',
          alpha: false,
        }}
        className="w-full h-full"
      >
        <Suspense fallback={null}>
          {/* Base Perspective Camera with Isometric Angle */}
          <PerspectiveCamera
            makeDefault
            position={[12, 11, 12]}
            fov={34}
            near={0.1}
            far={100}
          />

          {/* Camera Rig Lerper */}
          <CameraRig
            cameraTarget={cameraTarget}
            cameraPosition={cameraPosition}
            activeModal={activeModal}
          />

          {/* Bounded OrbitControls */}
          <OrbitControls
            ref={orbitControlsRef}
            enableDamping
            dampingFactor={0.06}
            minDistance={7}
            maxDistance={22}
            minPolarAngle={Math.PI / 8}
            maxPolarAngle={Math.PI / 2.25}
            minAzimuthAngle={-Math.PI / 4}
            maxAzimuthAngle={Math.PI / 2.2}
            target={[0, 1.2, 0]}
          />

          {/* Lighting Setup */}
          <color attach="background" args={['#07090e']} />
          
          {/* Soft Ambient Light */}
          <ambientLight
            color={themeConfig.ambientColor}
            intensity={themeConfig.ambientIntensity}
          />

          {/* Key Directional Sunlight casting soft shadows */}
          <directionalLight
            position={[10, 18, 12]}
            color={themeConfig.mainLightColor}
            intensity={themeConfig.mainLightIntensity}
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
            shadow-camera-near={0.5}
            shadow-camera-far={35}
            shadow-camera-left={-6}
            shadow-camera-right={6}
            shadow-camera-top={6}
            shadow-camera-bottom={-6}
            shadow-bias={-0.0005}
          />

          {/* Colored Fill Light */}
          <directionalLight
            position={[-10, 8, -8]}
            color={themeConfig.accentColor}
            intensity={themeConfig.accentIntensity}
          />

          {/* Desk Spot Lamp Light */}
          <spotLight
            position={[-1.2, 2.2, -0.8]}
            target-position={[-0.5, 1.0, -1.0]}
            color={themeConfig.lampColor}
            intensity={themeConfig.lampIntensity}
            distance={5}
            angle={Math.PI / 4}
            penumbra={0.6}
            castShadow
          />

          {/* Procedural 3D Environment (Walls, Floor, Window, Dust Motes) */}
          <RoomEnvironment themeConfig={themeConfig} />

          {/* Room Furniture (Desk, Chair, Bookshelf, Speakers, Accessories) */}
          <RoomFurniture themeConfig={themeConfig} />

          {/* Interactive 3D Meshes with Glowing Tooltips */}
          <InteractiveObjects
            onSelectHotspot={onSelectHotspot}
            activeModal={activeModal}
            hoveredHotspot={hoveredHotspot}
            setHoveredHotspot={setHoveredHotspot}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
