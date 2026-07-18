'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Volume2, VolumeX } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const ballRef = useRef<HTMLDivElement>(null);
  const ballMeshRef = useRef<HTMLDivElement>(null);
  const shadowRef = useRef<HTMLDivElement>(null);
  const backboardRef = useRef<HTMLDivElement>(null);
  const rimRef = useRef<SVGSVGElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const scrollHelperRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const soundBtnRef = useRef<HTMLButtonElement>(null);

  const [soundEnabled, setSoundEnabled] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);

  // Initialize Web Audio API for a synthesized dunk sound (requires user activation)
  const playDunkSound = () => {
    if (!soundEnabled) return;
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const ctx = audioContextRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      // Generate a deep rim slam sound and net swish
      // 1. Slam (Deep boom)
      const oscSlam = ctx.createOscillator();
      const gainSlam = ctx.createGain();
      oscSlam.type = 'triangle';
      oscSlam.frequency.setValueAtTime(100, ctx.currentTime);
      oscSlam.frequency.exponentialRampToValueAtTime(30, ctx.currentTime + 0.3);
      gainSlam.gain.setValueAtTime(1.2, ctx.currentTime);
      gainSlam.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);

      oscSlam.connect(gainSlam);
      gainSlam.connect(ctx.destination);
      oscSlam.start();
      oscSlam.stop(ctx.currentTime + 0.45);

      // 2. Net Swish (White Noise)
      const bufferSize = ctx.sampleRate * 0.4;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      const noiseFilter = ctx.createBiquadFilter();
      noiseFilter.type = 'bandpass';
      noiseFilter.frequency.value = 1000;
      noiseFilter.Q.value = 3.0;

      const gainNoise = ctx.createGain();
      gainNoise.gain.setValueAtTime(0.3, ctx.currentTime);
      gainNoise.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.35);

      noise.connect(noiseFilter);
      noiseFilter.connect(gainNoise);
      gainNoise.connect(ctx.destination);
      noise.start();
      noise.stop(ctx.currentTime + 0.4);
    } catch (e) {
      console.warn('Audio play failed', e);
    }
  };

  useGSAP(() => {
    // 1. Initial Intro Animation
    const introTl = gsap.timeline();
    introTl
      .fromTo(logoRef.current, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 1.5, ease: 'back.out(1.7)' })
      .fromTo(textRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }, '-=0.5')
      .fromTo(scrollHelperRef.current, { opacity: 0 }, { opacity: 1, duration: 0.8, ease: 'power1.out' }, '-=0.3')
      .fromTo(ballRef.current, { opacity: 0, scale: 0.1, y: -200 }, { opacity: 1, scale: 1, y: 0, duration: 1.2, ease: 'bounce.out' }, '-=0.8')
      .fromTo(shadowRef.current, { opacity: 0, scale: 0.1 }, { opacity: 0.6, scale: 1, duration: 1.2, ease: 'power1.out' }, '-=1.2');

    // Spin the ball slowly at the start
    if (ballMeshRef.current) {
      gsap.to(ballMeshRef.current, {
        rotate: 360,
        duration: 10,
        repeat: -1,
        ease: 'linear',
      });
    }

    // 2. Scroll Trigger Timeline for Bouncing & Slam Dunk
    const mainTl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=3500', // Height of the scroll scroll-driven story
        scrub: 1.2,
        pin: true,
        anticipatePin: 1,
      },
    });

    // Setup coordinates: Basketball center is at 0, 0
    // Floor is around Y = 180, Apex Y = -180
    
    // First bounce (slow) - Fade out intro elements at the start of scroll
    mainTl.fromTo([logoRef.current, textRef.current, scrollHelperRef.current], 
      { opacity: 1, y: 0 },
      { opacity: 0, y: -30, duration: 0.4 }
    )
          .to(ballRef.current, { y: 160, ease: 'power1.in' }) // Down
          .to(shadowRef.current, { scaleX: 1.3, scaleY: 1.3, opacity: 0.9, duration: 0.1 }, '<')
          .to(ballRef.current, { scaleX: 1.15, scaleY: 0.8, y: 175, duration: 0.1, ease: 'power1.out' }) // Squash
          .to(ballRef.current, { scaleX: 1, scaleY: 1, y: 160, duration: 0.1 }) // Recover
          .to(ballRef.current, { y: -120, ease: 'power1.out' }) // Apex
          .to(shadowRef.current, { scaleX: 0.6, scaleY: 0.6, opacity: 0.3, duration: 0.5 }, '<');

    // Second bounce (medium)
    mainTl.to(ballRef.current, { y: 160, ease: 'power1.in' })
          .to(shadowRef.current, { scaleX: 1.3, scaleY: 1.3, opacity: 0.9, duration: 0.1 }, '<')
          .to(ballRef.current, { scaleX: 1.15, scaleY: 0.8, y: 175, duration: 0.1, ease: 'power1.out' }) // Squash
          .to(ballRef.current, { scaleX: 1, scaleY: 1, y: 160, duration: 0.1 })
          .to(ballRef.current, { y: -90, ease: 'power1.out' })
          .to(shadowRef.current, { scaleX: 0.7, scaleY: 0.7, opacity: 0.4, duration: 0.4 }, '<');

    // Third bounce (faster)
    mainTl.to(ballRef.current, { y: 160, ease: 'power1.in' })
          .to(shadowRef.current, { scaleX: 1.3, scaleY: 1.3, opacity: 0.9, duration: 0.1 }, '<')
          .to(ballRef.current, { scaleX: 1.15, scaleY: 0.8, y: 175, duration: 0.1, ease: 'power1.out' }) // Squash
          .to(ballRef.current, { scaleX: 1, scaleY: 1, y: 160, duration: 0.1 })
          .to(ballRef.current, { y: -50, ease: 'power1.out' })
          .to(shadowRef.current, { scaleX: 0.8, scaleY: 0.8, opacity: 0.5, duration: 0.3 }, '<');

    // Fourth bounce (very fast)
    mainTl.to(ballRef.current, { y: 160, ease: 'power1.in' })
          .to(shadowRef.current, { scaleX: 1.3, scaleY: 1.3, opacity: 0.9, duration: 0.05 }, '<')
          .to(ballRef.current, { scaleX: 1.15, scaleY: 0.8, y: 175, duration: 0.05, ease: 'power1.out' }) // Squash
          .to(ballRef.current, { scaleX: 1, scaleY: 1, y: 160, duration: 0.05 })
          .to(ballRef.current, { y: -20, ease: 'power1.out' })
          .to(shadowRef.current, { scaleX: 0.9, scaleY: 0.9, opacity: 0.6, duration: 0.2 }, '<');

    // Fly up to the rafters for the dunk
    mainTl.to(ballRef.current, { y: -380, scale: 0.7, ease: 'power2.out', duration: 0.8 })
          .to(shadowRef.current, { scaleX: 0.2, scaleY: 0.2, opacity: 0.1, duration: 0.8 }, '<')
          // Fade in the backboard & hoop
          .to(backboardRef.current, { opacity: 1, scale: 1.05, y: -20, duration: 0.5 }, '-=0.5');

    // Slam down!
    mainTl.to(ballRef.current, { 
      y: -15, 
      scale: 1.1, 
      ease: 'power3.in', 
      duration: 0.4,
      onComplete: () => {
        // Trigger slam effect
        playDunkSound();
        triggerDunkImpact();
      }
    })
    .to(shadowRef.current, { scaleX: 1.2, scaleY: 1.2, opacity: 0.8, duration: 0.4 }, '<');

    // Roll to bottom for section transition
    mainTl.to(ballRef.current, { 
      y: 400, 
      x: -50,
      scale: 1.3, 
      opacity: 0.9,
      ease: 'power2.out', 
      duration: 1 
    })
    .to(shadowRef.current, { opacity: 0, scale: 0.1, duration: 0.5 }, '-=0.8')
    // Fade out backboard to clean layout
    .to([backboardRef.current], { opacity: 0, duration: 0.5 }, '-=1');

  }, { scope: containerRef });

  // Slam dunk impact triggers: camera shake, backboard shake, and particle explosion
  const triggerDunkImpact = () => {
    // 1. Shake Camera (container)
    gsap.fromTo(containerRef.current, 
      { x: -8, y: -8 }, 
      { x: 0, y: 0, ease: 'rough({strength: 8, points: 20, template: linear, randomize: true})', duration: 0.5 }
    );

    // 2. Shake Backboard/Rim
    gsap.fromTo(backboardRef.current,
      { rotate: -3, y: -25 },
      { rotate: 0, y: -20, ease: 'elastic.out(1, 0.3)', duration: 0.8 }
    );
    gsap.fromTo(rimRef.current,
      { scaleY: 1.3, rotate: 5 },
      { scaleY: 1, rotate: 0, ease: 'elastic.out(1.5, 0.2)', duration: 1 }
    );

    // 3. Explode Particles
    if (particlesRef.current) {
      particlesRef.current.innerHTML = '';
      const colors = ['#F47A20', '#FFFFFF', '#0E2240', '#FF9F59'];
      const numParticles = 40;

      for (let i = 0; i < numParticles; i++) {
        const particle = document.createElement('div');
        particle.className = 'absolute w-2 h-2 rounded-full pointer-events-none';
        particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        particlesRef.current.appendChild(particle);

        const angle = Math.random() * Math.PI * 2;
        const velocity = 80 + Math.random() * 200;
        const xDist = Math.cos(angle) * velocity;
        const yDist = Math.sin(angle) * velocity;

        gsap.set(particle, { x: 0, y: -20, opacity: 1, scale: Math.random() * 1.5 + 0.5 });
        gsap.to(particle, {
          x: xDist,
          y: yDist + 150, // Gravity pull
          opacity: 0,
          scale: 0.1,
          duration: 0.8 + Math.random() * 0.5,
          ease: 'power3.out',
          onComplete: () => particle.remove()
        });
      }
    }
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative w-full h-screen bg-[#071324] overflow-hidden flex flex-col items-center justify-center select-none"
    >
      {/* 3D-like Fog Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(14,34,64,0.35)_0%,rgba(7,19,36,1)_100%)] z-0" />
      <div 
        className="absolute inset-0 bg-transparent mix-blend-screen opacity-20 z-0 animate-fog pointer-events-none" 
        style={{ 
          backgroundImage: 'radial-gradient(circle at 30% 40%, rgba(244,122,32,0.15) 0%, transparent 60%), radial-gradient(circle at 70% 60%, rgba(255,255,255,0.08) 0%, transparent 50%)' 
        }} 
      />

      {/* Arena Spotlight Rays */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Left Spotlight */}
        <div 
          className="absolute top-0 left-[-10%] w-[45vw] h-[120vh] origin-top-left opacity-30 mix-blend-screen"
          style={{
            background: 'linear-gradient(130deg, rgba(255,255,255,0.3) 0%, rgba(244,122,32,0.05) 40%, transparent 70%)',
            clipPath: 'polygon(0 0, 100% 0, 100% 100%, 30% 100%)',
          }}
        />
        {/* Right Spotlight */}
        <div 
          className="absolute top-0 right-[-10%] w-[45vw] h-[120vh] origin-top-right opacity-30 mix-blend-screen"
          style={{
            background: 'linear-gradient(-130deg, rgba(255,255,255,0.3) 0%, rgba(244,122,32,0.05) 40%, transparent 70%)',
            clipPath: 'polygon(0 0, 100% 0, 70% 100%, 0 100%)',
          }}
        />
      </div>

      {/* Floating Arena Particles in Background */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
        <div className="absolute top-[10%] left-[15%] w-1.5 h-1.5 bg-white/45 rounded-full blur-[1px] animate-pulse" />
        <div className="absolute top-[45%] left-[8%] w-2 h-2 bg-[#F47A20]/30 rounded-full blur-[1px]" />
        <div className="absolute top-[25%] right-[12%] w-1 h-1 bg-white/60 rounded-full" />
        <div className="absolute top-[75%] right-[20%] w-2 h-2 bg-white/20 rounded-full blur-[2px]" />
        <div className="absolute top-[80%] left-[25%] w-1.5 h-1.5 bg-[#F47A20]/40 rounded-full blur-[1px]" />
      </div>

      {/* Sound Toggle Button */}
      <button
        ref={soundBtnRef}
        onClick={() => setSoundEnabled(!soundEnabled)}
        className="absolute top-24 right-6 z-40 bg-white/10 hover:bg-[#F47A20]/80 border border-white/20 text-white p-3 rounded-full transition-all duration-300 pointer-events-auto"
        aria-label="Toggle Sound Effects"
      >
        {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
      </button>

      {/* Center court graphics */}
      <div className="absolute bottom-0 w-[120%] h-[30vh] border-t-2 border-white/5 bg-[#0e2240]/10 rounded-t-full scale-y-50 z-0 flex items-center justify-center opacity-30">
        <div className="w-[60%] h-[100%] border-t border-white/10 rounded-t-full" />
      </div>

      {/* 3. Sportizen Logo & Introduction (Separated and positioned at the top) */}
      <div ref={logoRef} className="absolute top-[10%] z-10 flex flex-col items-center">
        <div className="relative w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.5)] border-2 border-[#F47A20]">
          <Image
            src="/logo.png"
            alt="Sportizen Basketball Academy Logo"
            fill
            className="object-cover scale-[1.05]"
            priority
          />
        </div>
      </div>

      <div ref={textRef} className="absolute top-[28%] md:top-[26%] z-10 text-center px-4 max-w-2xl">
        <h1 className="font-bebas text-6xl md:text-8xl tracking-wider text-white leading-tight shadow-sm drop-shadow-[0_4px_4px_rgba(0,0,0,0.6)]">
          SPORTIZEN
        </h1>
        <p className="text-sm md:text-lg tracking-[0.3em] text-[#F47A20] font-bold uppercase drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
          Basketball Academy
        </p>
      </div>

      <div ref={scrollHelperRef} className="absolute bottom-[10%] z-10 text-center">
        <p className="text-white/60 text-xs md:text-sm uppercase tracking-widest animate-pulse">
          Scroll Down to Play
        </p>
      </div>

      {/* 4. Hoop & Backboard Assembly (Hidden initially, zooms in during dunk) */}
      <div 
        ref={backboardRef} 
        className="absolute z-10 w-[240px] md:w-[320px] h-[160px] md:h-[200px] flex flex-col items-center justify-center opacity-0 pointer-events-none"
        style={{ transform: 'translateY(-20px) scale(0.95)' }}
      >
        {/* Glass Backboard */}
        <div className="w-full h-full border-[3px] border-white/45 bg-white/5 backdrop-blur-[2px] rounded-sm relative flex items-center justify-center shadow-2xl">
          {/* Inner rectangle */}
          <div className="w-[45%] h-[45%] border-2 border-white/65 absolute bottom-0 rounded-sm" />
          
          {/* Orange Rim Connector */}
          <div className="w-12 h-6 bg-[#F47A20] absolute bottom-2 rounded-sm" />
        </div>

        {/* Orange Rim & Net */}
        <div className="absolute bottom-[2px] w-24 md:w-32 h-16 flex justify-center">
          <svg 
            ref={rimRef}
            viewBox="0 0 100 60" 
            className="w-full h-full overflow-visible origin-top"
          >
            {/* The Rim (Orange ring in perspective) */}
            <ellipse cx="50" cy="5" rx="32" ry="7" fill="none" stroke="#F47A20" strokeWidth="4.5" />
            <ellipse cx="50" cy="5" rx="30" ry="5.5" fill="none" stroke="#ff9447" strokeWidth="1" />
            
            {/* Net (Knotted cords) */}
            <path 
              d="M 20 6 L 25 22 L 32 38 L 40 55 M 80 6 L 75 22 L 68 38 L 60 55 M 35 6 L 40 22 L 48 38 L 48 55 M 65 6 L 60 22 L 52 38 L 52 55 M 50 6 L 50 55
                 M 20 6 L 35 22 M 80 6 L 65 22 M 25 22 L 40 38 M 75 22 L 60 38 M 32 38 L 48 55 M 68 38 L 52 55
                 M 35 6 L 25 22 M 65 6 L 75 22 M 40 22 L 32 38 M 60 22 L 68 38 M 48 38 L 40 55 M 52 38 L 60 55"
              fill="none" 
              stroke="white" 
              strokeWidth="1.5" 
              strokeLinecap="round"
              className="opacity-70"
            />
          </svg>
        </div>
      </div>

      {/* Dunk Particle Container */}
      <div ref={particlesRef} className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center" />

      {/* 5. The Rotating & Bouncing Basketball */}
      <div 
        ref={ballRef}
        className="absolute z-20 w-32 h-32 md:w-36 md:h-36 pointer-events-none"
      >
        {/* Basketball Container with 3D Spherical Shadow overlays */}
        <div ref={ballMeshRef} className="ball-mesh w-full h-full rounded-full bg-[#F47A20] border-[3.5px] border-[#0E2240] relative overflow-hidden shadow-[inset_-20px_-20px_40px_rgba(0,0,0,0.65),inset_10px_10px_20px_rgba(255,255,255,0.4),0_15px_30px_rgba(0,0,0,0.3)]">
          {/* Seam horizontal */}
          <div className="absolute w-[200%] h-[3px] bg-[#0E2240] top-1/2 left-[-50%] -translate-y-1/2" />
          {/* Seam vertical */}
          <div className="absolute h-[200%] w-[3px] bg-[#0E2240] left-1/2 top-[-50%] -translate-x-1/2" />
          
          {/* Curved seams (ellipses) */}
          <div className="absolute w-[80%] h-[80%] border-[2.5px] border-[#0E2240] rounded-full top-[10%] left-[10%] opacity-85" />
          <div className="absolute w-[80%] h-[80%] border-[2.5px] border-[#0E2240] rounded-full top-[10%] right-[10%] opacity-85" style={{ transform: 'translateX(40%) scaleX(0.7)' }} />
          <div className="absolute w-[80%] h-[80%] border-[2.5px] border-[#0E2240] rounded-full top-[10%] left-[10%] opacity-85" style={{ transform: 'translateX(-40%) scaleX(0.7)' }} />

          {/* Grip Texture (Subtle dots) */}
          <div 
            className="absolute inset-0 opacity-15"
            style={{
              backgroundImage: 'radial-gradient(circle, #000 10%, transparent 10%)',
              backgroundSize: '4px 4px'
            }}
          />

          {/* Top highlight shine */}
          <div className="absolute top-[8%] left-[15%] w-[35%] h-[20%] bg-white/35 rounded-full blur-[1.5px] rotate-[-15deg]" />
        </div>
      </div>

      {/* 6. Dynamic Shadow under the Basketball */}
      <div 
        ref={shadowRef}
        className="absolute w-28 h-6 bg-black rounded-full blur-[6px] opacity-60 z-10 bottom-[35%] translate-y-16"
        style={{ transform: 'scale(1)' }}
      />
    </section>
  );
}
