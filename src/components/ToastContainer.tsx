import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../context/AppContext';
import { Sparkles } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts } = useApp();

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none px-4 sm:px-0">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="pointer-events-auto flex items-start gap-3 rounded-lg border border-[#C9A84C]/30 bg-[#161616]/95 p-4 shadow-[0_10px_30px_rgba(0,0,0,0.8)] backdrop-blur-xl"
          >
            <div className="mt-0.5 rounded-full bg-[#C9A84C]/15 p-1.5 text-[#E8C97A]">
              <Sparkles className="h-4 w-4" />
            </div>
            <div className="flex-1">
              <h4 className="font-serif-luxury text-sm font-semibold tracking-wide text-[#F5F0E6]">
                {toast.title}
              </h4>
              {toast.description && (
                <p className="mt-0.5 text-xs text-[#A39E94] leading-relaxed">
                  {toast.description}
                </p>
              )}
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
