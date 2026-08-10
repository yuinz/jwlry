import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Rotate3D, ZoomIn, ZoomOut, RefreshCw, Sparkles } from 'lucide-react';

interface JewelryViewer360Props {
  images: string[];
  title: string;
}

export const JewelryViewer360: React.FC<JewelryViewer360Props> = ({ images, title }) => {
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0);
  const [isAutoRotating, setIsAutoRotating] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);

  // We simulate 360 rotation frames if only 3-4 images exist by creating interpolated tilt & lighting shifts
  const frameCount = 16;

  const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    isDraggingRef.current = true;
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    startXRef.current = clientX;
  };

  const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDraggingRef.current) return;
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const deltaX = clientX - startXRef.current;

    if (Math.abs(deltaX) > 10) {
      const step = deltaX > 0 ? 1 : -1;
      setCurrentFrameIndex((prev) => (prev + step + frameCount) % frameCount);
      startXRef.current = clientX;
    }
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  // Map 16 frame indices to available image angles with smooth rotation angle CSS transform
  const currentImage = images[currentFrameIndex % images.length] || images[0];
  const frameRotation = (currentFrameIndex / frameCount) * 360;

  return (
    <div className="relative w-full aspect-square bg-radial from-[#1A1A1A] via-[#111111] to-[#0A0A0A] rounded-2xl border border-[#C9A84C]/20 overflow-hidden group select-none shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
      {/* Subtle Gold Dust Particles Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(201,168,76,0.08),transparent_70%)] pointer-events-none" />

      {/* 360 Interactive Stage */}
      <div
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchStart={handleMouseDown}
        onTouchMove={handleMouseMove}
        onTouchEnd={handleMouseUp}
        className="w-full h-full flex items-center justify-center p-8 cursor-grab active:cursor-grabbing relative"
      >
        <motion.div
          animate={{
            rotateY: (frameRotation % 30) - 15,
            scale: zoomLevel
          }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="relative max-w-full max-h-full flex items-center justify-center"
        >
          <img
            src={currentImage}
            alt={`${title} 360 angle view`}
            referrerPolicy="no-referrer"
            className="max-h-[380px] w-auto object-contain filter drop-shadow-[0_20px_30px_rgba(0,0,0,0.9)]"
          />

          {/* Liquid Gold Reflection Flare */}
          <div
            className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#FFF8E7]/20 to-transparent pointer-events-none transition-opacity duration-300"
            style={{
              transform: `rotate(${frameRotation}deg)`,
              opacity: 0.3 + (currentFrameIndex % 3) * 0.2
            }}
          />
        </motion.div>
      </div>

      {/* Controls Overlay Bar */}
      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-2 bg-[#0A0A0A]/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#C9A84C]/30 text-[10px] font-mono-luxury text-[#E8C97A]">
          <Rotate3D className="h-3.5 w-3.5 text-[#C9A84C] animate-spin" style={{ animationDuration: '8s' }} />
          <span>Drag to rotate 360° • Angle {Math.round(frameRotation)}°</span>
        </div>

        <div className="flex items-center space-x-1 bg-[#0A0A0A]/90 backdrop-blur-md p-1 rounded-full border border-[#C9A84C]/30 pointer-events-auto">
          <button
            onClick={() => setZoomLevel((prev) => Math.min(prev + 0.25, 2))}
            className="p-1.5 text-[#A39E94] hover:text-[#E8C97A] rounded-full transition-colors"
            title="Zoom In"
          >
            <ZoomIn className="h-3.5 w-3.5" />
          </button>

          <button
            onClick={() => setZoomLevel((prev) => Math.max(prev - 0.25, 0.75))}
            className="p-1.5 text-[#A39E94] hover:text-[#E8C97A] rounded-full transition-colors"
            title="Zoom Out"
          >
            <ZoomOut className="h-3.5 w-3.5" />
          </button>

          <button
            onClick={() => {
              setCurrentFrameIndex(0);
              setZoomLevel(1);
            }}
            className="p-1.5 text-[#A39E94] hover:text-[#E8C97A] rounded-full transition-colors"
            title="Reset Perspective"
          >
            <RefreshCw className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
