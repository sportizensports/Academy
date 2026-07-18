'use client';

import { useEffect, useState } from 'react';

export default function CourtScrollIndicator() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const progress = (window.scrollY / totalScroll) * 100;
        setScrollProgress(progress);
        
        // Show indicator only after scrolling down past the first 100px of Hero
        setIsVisible(window.scrollY > 150);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed right-8 top-1/4 bottom-1/4 w-8 z-40 hidden xl:flex flex-col items-center justify-between select-none pointer-events-none">
      {/* Top Court Half-Circle Key */}
      <div className="w-6 h-8 border-2 border-white/20 border-b-0 rounded-t-full relative">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-[1px] bg-white/20" />
      </div>

      {/* Sideline Progress Bar */}
      <div className="flex-1 w-[2px] bg-white/10 relative my-1">
        {/* Active Orange Fill */}
        <div 
          className="absolute top-0 left-0 w-full bg-[#F47A20] shadow-[0_0_10px_#F47A20]"
          style={{ height: `${scrollProgress}%` }}
        />
        
        {/* Sliding Basketball Node */}
        <div 
          className="absolute -left-[7px] w-4 h-4 rounded-full bg-[#F47A20] border border-[#0E2240] flex items-center justify-center shadow-lg transition-all duration-75"
          style={{ 
            top: `calc(${scrollProgress}% - 8px)`,
            transform: `rotate(${scrollProgress * 3.6}deg)`
          }}
        >
          {/* Seams inside the indicator ball */}
          <div className="w-full h-[1px] bg-[#0E2240] absolute" />
          <div className="h-full w-[1px] bg-[#0E2240] absolute" />
        </div>
      </div>

      {/* Bottom Court Half-Circle Key */}
      <div className="w-6 h-8 border-2 border-white/20 border-t-0 rounded-b-full relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-[1px] bg-white/20" />
      </div>
    </div>
  );
}
