import React, { useState, useRef, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/ui/Navbar';
import LoadingScreen from './components/ui/LoadingScreen';
import RecruiterView from './components/ui/RecruiterView';
import RoomControls from './components/ui/RoomControls';
import Toast from './components/ui/Toast';
import RoomCanvas from './components/3d/RoomCanvas';
import ThreadlyModal from './components/modals/ThreadlyModal';
import FutureBrightModal from './components/modals/FutureBrightModal';
import TerminalModal from './components/modals/TerminalModal';
import CertificatesModal from './components/modals/CertificatesModal';
import ContactModal from './components/modals/ContactModal';
import { portfolioData } from './data/portfolioData';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState('3d'); // '3d' | '2d'
  const [activeModal, setActiveModal] = useState(null); // 'threadly' | 'future-bright' | 'terminal' | 'certificates' | 'contact' | null
  const [lightingTheme, setLightingTheme] = useState('cyberpunk'); // 'cyberpunk' | 'lofi' | 'studio'
  const [hoveredHotspot, setHoveredHotspot] = useState(null);
  const [cameraTarget, setCameraTarget] = useState(null);
  const [cameraPosition, setCameraPosition] = useState(null);
  const [toast, setToast] = useState(null);
  const orbitControlsRef = useRef(null);

  const showToast = useCallback((message, type = 'info') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast((curr) => (curr?.message === message ? null : curr));
    }, 3500);
  }, []);

  const openModal = useCallback((modalId) => {
    setActiveModal(modalId);
    const hotspot = portfolioData.hotspots.find((h) => h.id === modalId);
    if (hotspot) {
      setCameraTarget(hotspot.cameraTarget);
      setCameraPosition(hotspot.cameraPosition);
    }
  }, []);

  const closeModal = useCallback(() => {
    setActiveModal(null);
    setCameraTarget(null);
    setCameraPosition(null);
  }, []);

  const resetCamera = useCallback(() => {
    setCameraTarget(null);
    setCameraPosition(null);
    setActiveModal(null);
    if (orbitControlsRef.current) {
      orbitControlsRef.current.reset();
    }
    showToast('Reset camera to isometric room overview', 'info');
  }, [showToast]);

  const handlePrintResume = useCallback(() => {
    setViewMode('2d');
    setTimeout(() => {
      window.print();
    }, 300);
  }, []);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#07090e] text-slate-100 font-sans">
      {/* 1. Futuristic Loading Screen */}
      <AnimatePresence>
        {isLoading && (
          <LoadingScreen onLoaded={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {/* 2. Top Navigation Bar */}
      <Navbar
        viewMode={viewMode}
        setViewMode={setViewMode}
        activeModal={activeModal}
        openModal={openModal}
        lightingTheme={lightingTheme}
        setLightingTheme={setLightingTheme}
        onPrintResume={handlePrintResume}
        resetCamera={resetCamera}
      />

      {/* 3. Main Viewport: 3D Isometric Room OR 2D Recruiter View */}
      <main className="w-full h-full relative">
        {viewMode === '3d' ? (
          <div className="w-full h-full">
            <RoomCanvas
              lightingTheme={lightingTheme}
              activeModal={activeModal}
              onSelectHotspot={openModal}
              hoveredHotspot={hoveredHotspot}
              setHoveredHotspot={setHoveredHotspot}
              cameraTarget={cameraTarget}
              cameraPosition={cameraPosition}
              orbitControlsRef={orbitControlsRef}
            />

            {/* Floating Room Controls & Interaction Hints */}
            <RoomControls
              onResetCamera={resetCamera}
              lightingTheme={lightingTheme}
              activeModal={activeModal}
            />
          </div>
        ) : (
          <div className="w-full h-full overflow-y-auto">
            <RecruiterView
              setViewMode={setViewMode}
              onPrintResume={handlePrintResume}
              showToast={showToast}
            />
          </div>
        )}
      </main>

      {/* 4. Interactive Modals (Framer Motion) */}
      <ThreadlyModal
        isOpen={activeModal === 'threadly'}
        onClose={closeModal}
        showToast={showToast}
      />

      <FutureBrightModal
        isOpen={activeModal === 'future-bright'}
        onClose={closeModal}
      />

      <TerminalModal
        isOpen={activeModal === 'terminal'}
        onClose={closeModal}
        showToast={showToast}
      />

      <CertificatesModal
        isOpen={activeModal === 'certificates'}
        onClose={closeModal}
        showToast={showToast}
      />

      <ContactModal
        isOpen={activeModal === 'contact'}
        onClose={closeModal}
        showToast={showToast}
      />

      {/* 5. Notification Toast */}
      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}
