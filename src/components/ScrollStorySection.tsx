'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface Milestone {
  step: string;
  title: string;
  description: string;
  percentage: number;
}

export default function ScrollStorySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const ballRef = useRef<HTMLDivElement>(null);
  const lineFillRef = useRef<HTMLDivElement>(null);

  const milestones: Milestone[] = [
    {
      step: '01',
      title: 'Learn Fundamentals',
      description: 'Master the triple-threat stance, basic layout mechanics, and double-dribble rules.',
      percentage: 0,
    },
    {
      step: '02',
      title: 'Improve Shooting',
      description: 'Build a repeatable shooting form, catch-and-shoot timing, and free-throw routine.',
      percentage: 20,
    },
    {
      step: '03',
      title: 'Improve Defense',
      description: 'Develop fast defensive slides, closeout positioning, rebounding boxing, and active hands.',
      percentage: 40,
    },
    {
      step: '04',
      title: 'Match Play',
      description: 'Put skills to the test in structured 3v3 and 5v5 internal academy scrimmages.',
      percentage: 60,
    },
    {
      step: '05',
      title: 'Tournament Play',
      description: 'Represent Sportizen Academy in city leagues, school tournaments, and state cups.',
      percentage: 80,
    },
    {
      step: '06',
      title: 'Become Elite',
      description: 'Get scouted, prepare for club tryouts, and qualify for athletic university scholarships.',
      percentage: 100,
    },
  ];

  useGSAP(() => {
    // Pin section and scrub bouncing ball + card reveals
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=2000', // Height of scrub scroll
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      }
    });

    // 1. Initial State: Card 0 is active, Ball is at 0%
    tl.to(ballRef.current, { opacity: 1, duration: 0.05 })
      .to('.node-0', { backgroundColor: '#F47A20', scale: 1.25, boxShadow: '0 0 15px #F47A20', duration: 0.1 }, '<')
      .to('.card-0', { opacity: 1, y: 0, scale: 1, duration: 0.1 }, '<');

    // Bounce from Node 0 (0%) to Node 1 (20%)
    tl.to(ballRef.current, { left: '20%', duration: 1, ease: 'none' })
      .to(ballRef.current, { y: -80, ease: 'power1.out', duration: 0.5 }, '-=1') // Rise
      .to(ballRef.current, { y: 0, ease: 'power1.in', duration: 0.5 }, '-=0.5')   // Fall
      .to(lineFillRef.current, { width: '20%', ease: 'none', duration: 1 }, '-=1')
      .to('.node-1', { backgroundColor: '#F47A20', scale: 1.25, boxShadow: '0 0 15px #F47A20', duration: 0.1 })
      .to('.card-1', { opacity: 1, y: 0, scale: 1, ease: 'back.out(1.2)', duration: 0.3 }, '-=0.1');

    // Bounce from Node 1 (20%) to Node 2 (40%)
    tl.to(ballRef.current, { left: '40%', duration: 1, ease: 'none' })
      .to(ballRef.current, { y: -80, ease: 'power1.out', duration: 0.5 }, '-=1')
      .to(ballRef.current, { y: 0, ease: 'power1.in', duration: 0.5 }, '-=0.5')
      .to(lineFillRef.current, { width: '40%', ease: 'none', duration: 1 }, '-=1')
      .to('.node-2', { backgroundColor: '#F47A20', scale: 1.25, boxShadow: '0 0 15px #F47A20', duration: 0.1 })
      .to('.card-2', { opacity: 1, y: 0, scale: 1, ease: 'back.out(1.2)', duration: 0.3 }, '-=0.1');

    // Bounce from Node 2 (40%) to Node 3 (60%)
    tl.to(ballRef.current, { left: '60%', duration: 1, ease: 'none' })
      .to(ballRef.current, { y: -80, ease: 'power1.out', duration: 0.5 }, '-=1')
      .to(ballRef.current, { y: 0, ease: 'power1.in', duration: 0.5 }, '-=0.5')
      .to(lineFillRef.current, { width: '60%', ease: 'none', duration: 1 }, '-=1')
      .to('.node-3', { backgroundColor: '#F47A20', scale: 1.25, boxShadow: '0 0 15px #F47A20', duration: 0.1 })
      .to('.card-3', { opacity: 1, y: 0, scale: 1, ease: 'back.out(1.2)', duration: 0.3 }, '-=0.1');

    // Bounce from Node 3 (60%) to Node 4 (80%)
    tl.to(ballRef.current, { left: '80%', duration: 1, ease: 'none' })
      .to(ballRef.current, { y: -80, ease: 'power1.out', duration: 0.5 }, '-=1')
      .to(ballRef.current, { y: 0, ease: 'power1.in', duration: 0.5 }, '-=0.5')
      .to(lineFillRef.current, { width: '80%', ease: 'none', duration: 1 }, '-=1')
      .to('.node-4', { backgroundColor: '#F47A20', scale: 1.25, boxShadow: '0 0 15px #F47A20', duration: 0.1 })
      .to('.card-4', { opacity: 1, y: 0, scale: 1, ease: 'back.out(1.2)', duration: 0.3 }, '-=0.1');

    // Bounce from Node 4 (80%) to Node 5 (100%)
    tl.to(ballRef.current, { left: '100%', duration: 1, ease: 'none' })
      .to(ballRef.current, { y: -80, ease: 'power1.out', duration: 0.5 }, '-=1')
      .to(ballRef.current, { y: 0, ease: 'power1.in', duration: 0.5 }, '-=0.5')
      .to(lineFillRef.current, { width: '100%', ease: 'none', duration: 1 }, '-=1')
      .to('.node-5', { backgroundColor: '#F47A20', scale: 1.25, boxShadow: '0 0 15px #F47A20', duration: 0.1 })
      .to('.card-5', { opacity: 1, y: 0, scale: 1, ease: 'back.out(1.2)', duration: 0.3 }, '-=0.1');

  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen bg-[#F8F9FA] flex flex-col justify-center py-24 px-6 overflow-hidden select-none"
    >
      <div className="max-w-7xl mx-auto w-full z-10 flex flex-col">
        
        {/* Header */}
        <div className="mb-20 text-center md:text-left">
          <span className="text-[#F47A20] text-sm md:text-base font-bold tracking-[0.25em] uppercase">THE PLAYER JOURNEY</span>
          <h2 className="font-bebas text-5xl md:text-7xl text-[#0E2240] tracking-wide mt-2">
            SCROLL STORY
          </h2>
          <p className="text-gray-500 max-w-xl text-sm md:text-base mt-4 font-sans leading-relaxed">
            Follow the bouncing basketball to see the milestones a student completes to progress from beginners to court champions.
          </p>
        </div>

        {/* Milestone Timeline Container (Desktop horizontal track) */}
        <div className="relative w-full mt-12 flex flex-col items-center">
          
          {/* Horizontal Track Bar */}
          <div 
            ref={trackRef}
            className="relative w-[90%] md:w-[94%] h-[4px] bg-[#0E2240]/15 mb-24 rounded-full"
          >
            {/* Active filled line */}
            <div 
              ref={lineFillRef} 
              className="absolute left-0 top-0 h-full w-[0%] bg-[#F47A20] rounded-full transition-all duration-75 shadow-[0_0_10px_#F47A20]"
            />

            {/* Bouncing Basketball */}
            <div 
              ref={ballRef}
              className="absolute w-12 h-12 opacity-0 -translate-y-12 -translate-x-6 z-20 pointer-events-none"
              style={{ left: '0%', top: '0%' }}
            >
              <div className="w-full h-full rounded-full bg-[#F47A20] border-2 border-[#0E2240] relative overflow-hidden shadow-[inset_-4px_-4px_8px_rgba(0,0,0,0.5),0_4px_8px_rgba(0,0,0,0.2)]">
                <div className="absolute w-[200%] h-[1px] bg-[#0E2240] top-1/2 left-[-50%] -translate-y-1/2" />
                <div className="absolute h-[200%] w-[1px] bg-[#0E2240] left-1/2 top-[-50%] -translate-x-1/2" />
              </div>
            </div>

            {/* Timeline Nodes */}
            {milestones.map((milestone, idx) => (
              <div 
                key={milestone.step}
                className={`node-${idx} absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-[#0E2240]/25 border-4 border-[#F8F9FA] transition-all duration-300 z-10 shadow-sm`}
                style={{ left: `${milestone.percentage}%` }}
              >
                {/* Milestone Node Number label */}
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs font-bold text-[#0E2240]/40 font-sans">
                  {milestone.step}
                </span>
              </div>
            ))}
          </div>

          {/* Milestone Details Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-6 gap-6 w-full relative min-h-[220px]">
            {milestones.map((milestone, idx) => (
              <div
                key={milestone.step}
                className={`card-${idx} opacity-0 translate-y-10 scale-95 bg-white border border-[#0E2240]/5 rounded-xl p-5 flex flex-col justify-start shadow-md hover:shadow-lg transition-shadow duration-300 min-h-[180px]`}
              >
                <span className="font-bebas text-4xl text-[#F47A20]/20 tracking-wider">
                  {milestone.step}
                </span>
                <h4 className="text-lg font-bold text-[#0E2240] font-sans mt-1 leading-tight">
                  {milestone.title}
                </h4>
                <p className="text-gray-500 font-sans text-xs md:text-[11px] lg:text-xs mt-3 leading-relaxed">
                  {milestone.description}
                </p>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
