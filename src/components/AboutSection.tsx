'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ShieldCheck, Target, Flame, ClipboardList, Users } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface AboutCard {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

export default function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const ballRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const cards: AboutCard[] = [
    {
      id: 'elite-coaching',
      title: 'Elite Coaching',
      description: 'Train under former national players and FIBA-certified coaches who analyze every move.',
      icon: <ShieldCheck className="w-10 h-10 text-[#F47A20]" />,
    },
    {
      id: 'skill-dev',
      title: 'Skill Development',
      description: 'Master shooting mechanisms, ball-handling, court vision, and footwork patterns.',
      icon: <Target className="w-10 h-10 text-[#F47A20]" />,
    },
    {
      id: 'confidence',
      title: 'Confidence',
      description: 'Build mental toughness to take high-stakes game-winning shots without fear.',
      icon: <Flame className="w-10 h-10 text-[#F47A20]" />,
    },
    {
      id: 'discipline',
      title: 'Discipline',
      description: 'Develop structured workout routines, physical endurance, and professional focus.',
      icon: <ClipboardList className="w-10 h-10 text-[#F47A20]" />,
    },
    {
      id: 'teamwork',
      title: 'Teamwork',
      description: 'Understand defensive rotations, spacing, communication, and shared success.',
      icon: <Users className="w-10 h-10 text-[#F47A20]" />,
    },
  ];

  useGSAP(() => {
    // Pin section and dribble ball across the screen
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=1500', // Scroll length of pin
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      }
    });

    // Animate the basketball dribbling across the screen (X translate + Y bounce)
    // We break the X progression into segments and bounce the ball on each card trigger
    tl.to(ballRef.current, { x: '0%', opacity: 1, duration: 0.1 });

    // Dribble to Card 1
    tl.to(ballRef.current, { x: '10%', y: 60, ease: 'power1.in', duration: 0.2 })
      .to(ballRef.current, { y: -20, ease: 'power1.out', duration: 0.2 })
      .to('.about-card-0', { opacity: 1, y: 0, scale: 1, ease: 'back.out(1.4)', duration: 0.4 }, '-=0.1')
      .to('.about-card-0 .icon-wrapper', { rotate: 360, duration: 0.4 }, '<');

    // Dribble to Card 2
    tl.to(ballRef.current, { x: '30%', y: 60, ease: 'power1.in', duration: 0.2 })
      .to(ballRef.current, { y: -20, ease: 'power1.out', duration: 0.2 })
      .to('.about-card-1', { opacity: 1, y: 0, scale: 1, ease: 'back.out(1.4)', duration: 0.4 }, '-=0.1')
      .to('.about-card-1 .icon-wrapper', { scale: 1.3, duration: 0.2, yoyo: true, repeat: 1 }, '<');

    // Dribble to Card 3
    tl.to(ballRef.current, { x: '50%', y: 60, ease: 'power1.in', duration: 0.2 })
      .to(ballRef.current, { y: -20, ease: 'power1.out', duration: 0.2 })
      .to('.about-card-2', { opacity: 1, y: 0, scale: 1, ease: 'back.out(1.4)', duration: 0.4 }, '-=0.1')
      .to('.about-card-2 .icon-wrapper', { skewX: 15, duration: 0.2, yoyo: true, repeat: 1 }, '<');

    // Dribble to Card 4
    tl.to(ballRef.current, { x: '70%', y: 60, ease: 'power1.in', duration: 0.2 })
      .to(ballRef.current, { y: -20, ease: 'power1.out', duration: 0.2 })
      .to('.about-card-3', { opacity: 1, y: 0, scale: 1, ease: 'back.out(1.4)', duration: 0.4 }, '-=0.1')
      .to('.about-card-3 .icon-wrapper', { rotateY: 180, duration: 0.3 }, '<');

    // Dribble to Card 5
    tl.to(ballRef.current, { x: '92%', y: 60, ease: 'power1.in', duration: 0.2 })
      .to(ballRef.current, { y: -20, ease: 'power1.out', duration: 0.2 })
      .to('.about-card-4', { opacity: 1, y: 0, scale: 1, ease: 'back.out(1.4)', duration: 0.4 }, '-=0.1')
      .to('.about-card-4 .icon-wrapper', { y: -10, duration: 0.2, yoyo: true, repeat: 1 }, '<');

    // Ball rolls off screen
    tl.to(ballRef.current, { x: '105%', y: 300, rotate: 360, opacity: 0, duration: 0.4 });

  }, { scope: containerRef });

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative w-full min-h-screen bg-white flex flex-col justify-center py-20 px-6 overflow-hidden select-none"
    >
      {/* Background orange circular accents */}
      <div className="absolute top-10 left-10 w-[500px] h-[500px] rounded-full bg-[#F47A20]/5 blur-[80px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[600px] h-[600px] rounded-full bg-[#0E2240]/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full z-10 flex flex-col">
        {/* Title Block */}
        <div className="mb-16 md:mb-24">
          <span className="text-[#F47A20] text-sm md:text-base font-bold tracking-[0.25em] uppercase">HOW WE BUILD CHAMPIONS</span>
          <h3 className="font-bebas text-5xl md:text-7xl text-[#0E2240] tracking-wide mt-2">
            The Sportizen Core Principles
          </h3>
          <p className="text-gray-500 max-w-2xl text-sm md:text-base mt-4 font-sans leading-relaxed">
            Our academy is built on foundational pillars designed to grow basketball talents from initial steps to elite professional leagues.
          </p>
        </div>

        {/* Dribbling ball trajectory guide */}
        <div className="relative w-full h-10 mb-8 hidden md:block">
          <div className="absolute top-5 left-0 w-full h-[1px] bg-dashed border-b border-dashed border-[#F47A20]/30" />
          
          {/* Tracking Ball */}
          <div 
            ref={ballRef}
            className="absolute top-0 left-0 w-10 h-10 opacity-0 -translate-y-1"
            style={{ transform: 'translateX(-50px)' }}
          >
            <div className="w-full h-full rounded-full bg-[#F47A20] border-2 border-[#0E2240] relative overflow-hidden shadow-[inset_-4px_-4px_8px_rgba(0,0,0,0.5)]">
              <div className="absolute w-[200%] h-[1px] bg-[#0E2240] top-1/2 left-[-50%] -translate-y-1/2" />
              <div className="absolute h-[200%] w-[1px] bg-[#0E2240] left-1/2 top-[-50%] -translate-x-1/2" />
            </div>
          </div>
        </div>

        {/* Cards Grid */}
        <div 
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-4 lg:gap-6 w-full"
        >
          {cards.map((card, idx) => (
            <div
              key={card.id}
              className={`about-card-${idx} interactive-card md:opacity-0 md:translate-y-16 md:scale-95 bg-[#F8F9FA] hover:bg-[#0E2240] hover:text-white rounded-lg p-6 lg:p-8 flex flex-col justify-between border border-[#0E2240]/5 hover:border-transparent transition-all duration-300 hover:shadow-2xl group min-h-[300px] shadow-sm`}
            >
              <div>
                {/* Icon wrapper */}
                <div className="icon-wrapper w-16 h-16 rounded-full bg-[#F47A20]/15 group-hover:bg-[#F47A20]/25 flex items-center justify-center mb-8 transition-transform duration-300">
                  {card.icon}
                </div>
                
                {/* Title */}
                <h4 className="text-2xl font-bold tracking-wide font-sans mb-3 text-[#0E2240] group-hover:text-white transition-colors duration-300">
                  {card.title}
                </h4>
              </div>

              {/* Description */}
              <p className="text-gray-500 group-hover:text-white/80 font-sans text-sm md:text-xs lg:text-sm leading-relaxed transition-colors duration-300">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
