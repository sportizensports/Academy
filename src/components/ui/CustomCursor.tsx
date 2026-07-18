'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 250 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Check if device supports hover (desktop)
    const mediaQuery = window.matchMedia('(any-hover: hover)');
    if (!mediaQuery.matches) return;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', moveCursor);
    document.body.addEventListener('mouseenter', handleMouseEnter);
    document.body.addEventListener('mouseleave', handleMouseLeave);
    
    // Add custom cursor class to document
    document.documentElement.classList.add('custom-cursor-active');

    // Attach hover effects to links & buttons
    const attachHoverHandlers = () => {
      const handleHoverStart = () => setIsHovered(true);
      const handleHoverEnd = () => setIsHovered(false);
      
      const elements = document.querySelectorAll('a, button, select, input, textarea, [role="button"], .interactive-card');
      elements.forEach((el) => {
        el.addEventListener('mouseenter', handleHoverStart);
        el.addEventListener('mouseleave', handleHoverEnd);
      });
      
      return () => {
        elements.forEach((el) => {
          el.removeEventListener('mouseenter', handleHoverStart);
          el.removeEventListener('mouseleave', handleHoverEnd);
        });
      };
    };

    const cleanupHover = attachHoverHandlers();

    // Re-attach hover when DOM changes
    const observer = new MutationObserver(() => {
      cleanupHover();
      attachHoverHandlers();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.body.removeEventListener('mouseenter', handleMouseEnter);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
      document.documentElement.classList.remove('custom-cursor-active');
      cleanupHover();
      observer.disconnect();
    };
  }, [cursorX, cursorY, isVisible]);

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-50 flex items-center justify-center select-none hidden lg:flex"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
      }}
    >
      <motion.div 
        className="w-full h-full rounded-full bg-[#F47A20] border-2 border-[#0E2240] relative flex items-center justify-center shadow-lg"
        animate={{
          rotate: 360,
          scale: isHovered ? 1.4 : 1,
        }}
        transition={{
          rotate: { repeat: Infinity, duration: 4, ease: "linear" },
          scale: { duration: 0.2, ease: "easeOut" }
        }}
      >
        {/* Basketball seam lines */}
        <div className="absolute w-full h-[2px] bg-[#0E2240] top-1/2 left-0 -translate-y-1/2" />
        <div className="absolute w-[2px] h-full bg-[#0E2240] left-1/2 top-0 -translate-x-1/2" />
        <div className="absolute w-[80%] h-[80%] border-2 border-[#0E2240] rounded-full opacity-60" />
      </motion.div>
    </motion.div>
  );
}
