'use client';

import { useEffect, useRef, useState } from 'react';

export default function StatsSection() {
  const [count, setCount] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setHasStarted(true);
        }
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasStarted) return;

    let start = 0;
    const end = 500;
    const duration = 2200; // 2.2 seconds
    const startTime = performance.now();

    function updateCount(currentTime: number) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Ease out quad formula for smooth decelerating count-up
      const easeProgress = progress * (2 - progress);
      const currentVal = Math.floor(easeProgress * (end - start) + start);
      
      setCount(currentVal);

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      }
    }

    requestAnimationFrame(updateCount);
  }, [hasStarted]);

  return (
    <section
      id="stats"
      ref={containerRef}
      className="relative w-full py-24 bg-[#071324] text-white px-6 overflow-hidden flex items-center justify-center"
    >
      {/* Background neon flares */}
      <div className="absolute top-[20%] left-[25%] w-[500px] h-[500px] rounded-full bg-[#F47A20]/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[25%] w-[400px] h-[400px] rounded-full bg-[#162F56]/15 blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto w-full z-10 relative flex flex-col items-center justify-center text-center">
        
        {/* Stylized Single Metric Card */}
        <div className="flex flex-col items-center justify-center p-12 md:p-20 bg-[#162F56]/30 border border-white/10 rounded-3xl relative overflow-hidden group shadow-2xl max-w-xl w-full">
          {/* Orange left border highlights */}
          <div className="absolute left-0 top-0 w-[6px] h-full bg-[#F47A20] shadow-[0_0_15px_#F47A20]" />
          
          {/* Massive Orange Count-Up Number */}
          <span className="font-bebas text-[7rem] sm:text-[9rem] md:text-[11rem] leading-none tracking-wider text-[#F47A20] drop-shadow-[0_0_20px_rgba(244,122,32,0.3)] select-none transition-transform duration-300 group-hover:scale-105">
            {count}+
          </span>
          
          {/* Label */}
          <span className="text-base sm:text-lg md:text-xl text-white/80 font-bold tracking-[0.25em] uppercase mt-6 select-none border-t border-white/10 pt-4 w-full max-w-[280px]">
            STUDENTS TRAINED
          </span>
        </div>

      </div>
    </section>
  );
}
