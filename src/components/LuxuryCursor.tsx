import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { useApp } from '../context/AppContext';

export const LuxuryCursor: React.FC = () => {
  const { cursorEnabled } = useApp();
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [hoverText, setHoverText] = useState<string | null>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Check touch support
    if (typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0)) {
      setIsTouchDevice(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });

      // Check hovered element
      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = target.closest('button, a, input, select, [role="button"], .cursor-hover');
        if (interactive) {
          setIsHovered(true);
          const dataText = interactive.getAttribute('data-cursor');
          setHoverText(dataText);
        } else {
          setIsHovered(false);
          setHoverText(null);
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    if (cursorEnabled && !isTouchDevice) {
      document.body.classList.add('custom-cursor-enabled');
    } else {
      document.body.classList.remove('custom-cursor-enabled');
    }
  }, [cursorEnabled, isTouchDevice]);

  if (!cursorEnabled || isTouchDevice) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Outer Ring */}
      <motion.div
        className={`fixed left-0 top-0 rounded-full border border-[#C9A84C]/60 transition-colors duration-200 ${
          isHovered
            ? 'h-16 w-16 -ml-8 -mt-8 bg-[#C9A84C]/10 border-[#E8C97A] shadow-[0_0_20px_rgba(232,201,122,0.4)]'
            : 'h-8 w-8 -ml-4 -mt-4 bg-transparent'
        }`}
        animate={{
          x: position.x,
          y: position.y,
          scale: isHovered ? 1.2 : 1
        }}
        transition={{
          type: 'spring',
          damping: 28,
          stiffness: 350,
          mass: 0.3
        }}
      >
        {hoverText && (
          <div className="flex h-full w-full items-center justify-center text-[9px] font-medium tracking-widest text-[#FFF8E7] uppercase">
            {hoverText}
          </div>
        )}
      </motion.div>

      {/* Center Precision Point */}
      <motion.div
        className="fixed left-0 top-0 h-1.5 w-1.5 -ml-0.75 -mt-0.75 rounded-full bg-[#E8C97A] shadow-[0_0_8px_#E8C97A]"
        animate={{
          x: position.x,
          y: position.y
        }}
        transition={{
          type: 'spring',
          damping: 40,
          stiffness: 700
        }}
      />
    </div>
  );
};
