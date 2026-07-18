'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function BackgroundScrollAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const ball1Ref = useRef<HTMLDivElement>(null);
  const ball2Ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // 1. Ball 1: Dribbles horizontally across a dashed guide line (from Core Principles)
    gsap.fromTo(ball1Ref.current,
      { x: '-10%' },
      {
        x: '110%',
        ease: 'none',
        scrollTrigger: {
          trigger: document.documentElement,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.8,
        }
      }
    );
    
    // Vertical dribbling bounce loop for Ball 1
    gsap.to(ball1Ref.current, {
      y: 110,
      repeat: -1,
      yoyo: true,
      duration: 0.5,
      ease: 'bounce.out',
    });

    // 2. Ball 2: Winding vertical path ball (from Scroll Story)
    // Moves down the page and waves back and forth across the screen as you scroll
    gsap.fromTo(ball2Ref.current,
      { y: '5vh', x: '10vw' },
      {
        y: '90vh',
        ease: 'none',
        scrollTrigger: {
          trigger: document.documentElement,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.5,
        }
      }
    );

    // Side-to-side winding wave loop for Ball 2
    gsap.to(ball2Ref.current, {
      x: '90vw',
      repeat: -1,
      yoyo: true,
      duration: 4,
      ease: 'sine.inOut',
    });

  }, { scope: containerRef });

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden select-none opacity-[0.06]"
    >
      {/* Decorative dashed horizontal guide representing core principles line */}
      <div className="absolute top-[35%] left-0 w-full h-[1px] border-t border-dashed border-[#F47A20] opacity-30" />
      <div 
        ref={ball1Ref}
        className="absolute top-[35%] left-0 w-8 h-8 rounded-full bg-[#F47A20] flex items-center justify-center shadow-md -translate-y-4"
      >
        <div className="w-full h-[1px] bg-[#071324] absolute" />
        <div className="h-full w-[1px] bg-[#071324] absolute" />
      </div>

      {/* Decorative winding ball representing scroll story track */}
      <div 
        ref={ball2Ref}
        className="absolute w-12 h-12 rounded-full bg-[#F47A20] flex items-center justify-center shadow-lg"
      >
        <div className="w-full h-[1px] bg-[#071324] absolute" />
        <div className="h-full w-[1px] bg-[#071324] absolute" />
      </div>
    </div>
  );
}
