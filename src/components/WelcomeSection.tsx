'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function WelcomeSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const ballRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const headline = "Where Champions Begin.";

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top bottom', // Start animating when section enters bottom
        end: 'bottom top',   // End when section leaves top
        scrub: 1,            // Scrub scroll progress
      }
    });

    // 1. Transition background from dark navy to light gray court
    tl.to(bgRef.current, {
      backgroundColor: '#F8F9FA',
      duration: 1,
    });

    // 2. Roll basketball across the screen and stagger reveal text
    const textLetters = textRef.current?.querySelectorAll('.char');
    
    // We synchronize the ball rolling from left to right with the letters fading in
    const rollTl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 60%',
        end: 'bottom 80%',
        scrub: 1.2,
      }
    });

    rollTl.fromTo(ballRef.current, 
      { x: '-15vw', rotate: 0 }, 
      { x: '105vw', rotate: 1080, ease: 'none', duration: 3 }
    );

    if (textLetters && textLetters.length > 0) {
      rollTl.fromTo(textLetters,
        { opacity: 0, scale: 0.8, y: 15 },
        { 
          opacity: 1, 
          scale: 1, 
          y: 0, 
          stagger: 0.08, 
          ease: 'back.out(1.5)', 
          duration: 1.8 
        },
        '-=2.8' // Overlap with the rolling ball
      );
    }

    // 3. CTA entry
    rollTl.fromTo(ctaRef.current,
      { opacity: 0, y: 30, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'power2.out' },
      '-=0.8'
    );

  }, { scope: containerRef });

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.querySelector('#trial');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-[90vh] flex flex-col items-center justify-center py-20 px-6 overflow-hidden select-none"
    >
      {/* Background layer starting dark and fading to light court */}
      <div 
        ref={bgRef} 
        className="absolute inset-0 bg-[#071324] transition-colors duration-1000 z-0" 
      />

      {/* Stylized Basketball Court Lines (drawn subtly in background) */}
      <div className="absolute inset-0 z-0 opacity-15 pointer-events-none flex items-center justify-center">
        {/* Center Court Circle */}
        <div className="w-[45vw] h-[45vw] rounded-full border-4 border-[#0E2240] absolute" />
        {/* Three-Point Line Arch */}
        <div className="w-[120vw] h-[120vw] rounded-full border-4 border-[#0E2240] absolute -top-[50vw]" />
        {/* Free Throw Key outline */}
        <div className="w-[30vw] h-[50vh] border-4 border-[#0E2240] absolute bottom-0 rounded-t-lg" />
      </div>

      {/* Decorative floating balls (representing the rolling ball path) */}
      <div className="absolute bottom-[28%] left-0 w-full h-[2px] bg-dashed bg-white/5 border-b border-dashed border-[#0E2240]/10 z-10" />

      {/* Rolling transition ball from hero */}
      <div 
        ref={ballRef}
        className="absolute bottom-[20%] left-0 z-20 w-20 h-20 pointer-events-none"
      >
        <div className="w-full h-full rounded-full bg-[#F47A20] border-[2.5px] border-[#0E2240] relative overflow-hidden shadow-[inset_-8px_-8px_16px_rgba(0,0,0,0.5),0_8px_16px_rgba(0,0,0,0.25)]">
          <div className="absolute w-[200%] h-[2px] bg-[#0E2240] top-1/2 left-[-50%] -translate-y-1/2" />
          <div className="absolute h-[200%] w-[2px] bg-[#0E2240] left-1/2 top-[-50%] -translate-x-1/2" />
          <div className="absolute w-[80%] h-[80%] border border-[#0E2240] rounded-full top-[10%] left-[10%] opacity-60" />
        </div>
      </div>

      {/* Content Container */}
      <div className="z-10 text-center max-w-5xl flex flex-col items-center justify-center">
        {/* Huge Bold Title */}
        <h2 
          ref={textRef}
          className="font-bebas text-6xl md:text-[10rem] tracking-wider text-[#0E2240] leading-none mb-10 select-none flex flex-wrap justify-center gap-x-4 md:gap-x-8 drop-shadow-sm"
        >
          {headline.split(" ").map((word, wordIdx) => (
            <span key={wordIdx} className="inline-block whitespace-nowrap">
              {word.split("").map((char, charIdx) => (
                <span 
                  key={charIdx} 
                  className="char inline-block transition-transform duration-200"
                >
                  {char}
                </span>
              ))}
            </span>
          ))}
        </h2>

        {/* Supporting Text & Button */}
        <div ref={ctaRef} className="opacity-0 flex flex-col items-center gap-6 max-w-xl">
          <p className="text-base md:text-xl text-[#0E2240]/70 font-medium leading-relaxed font-sans">
            At Sportizen, we don&apos;t just teach the game—we build characters. 
            Through world-class training, expert mentors, and elite match play, 
            we shape the champions of tomorrow.
          </p>
          <div className="mt-4">
            <a
              href="#trial"
              onClick={handleSmoothScroll}
              className="bg-[#0E2240] hover:bg-[#F47A20] text-white font-bebas text-2xl tracking-wider px-10 py-4 rounded-md transition-all duration-300 shadow-xl hover:scale-105 active:scale-95 inline-block"
            >
              BOOK FREE TRIAL
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
