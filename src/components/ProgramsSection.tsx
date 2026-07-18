'use client';
import { useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Calendar, User, ChevronRight } from 'lucide-react';
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}
interface Program {
  id: string;
  title: string;
  description: string;
  age: string;
  duration: string;
  imgUrl: string;
  glow: string;
}
export default function ProgramsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const programs: Program[] = [
    {
      id: 'kids',
      title: 'KIDS PROGRAM',
      description: 'A fun, high-energy program introducing the absolute fundamentals of dribbling, shooting, and spatial coordination through play.',
      age: '5 - 8 Years',
      duration: 'Mon, Wed, Fri',
      imgUrl: '/images/Kid1.jpeg',
      glow: 'rgba(244, 122, 32, 0.4)',
    },
    {
      id: 'juniors',
      title: 'JUNIORS BATCH',
      description: 'Focuses on building correct shooting mechanisms, tactical court positioning, and essential two-hand coordination drills.',
      age: '9 - 12 Years',
      duration: 'Mon, Wed, Fri',
      imgUrl: '/images/Under 13.jpeg',
      glow: 'rgba(244, 122, 32, 0.4)',
    },
    {
      id: 'teens',
      title: 'TEENS DIVISION',
      description: 'Rigorous technical training, strength development, basic offensive strategies, and structured match play scenarios.',
      age: '13 - 16 Years',
      duration: 'Mon, Wed, Fri',
      imgUrl: '/images/Under 15 Girls.jpg',
      glow: 'rgba(244, 122, 32, 0.4)',
    },
    {
      id: 'advanced',
      title: 'ELITE ADVANCED',
      description: 'Tournament-level training, individual performance reports, custom fitness planning, and intensive playmaking analysis.',
      age: '17+ Years',
      duration: 'Mon, Wed, Fri',
      imgUrl: '/images/Mix Group Senior.jpg',
      glow: 'rgba(244, 122, 32, 0.6)',
    },
  ];
  useGSAP(() => {
    const cards = gsap.utils.toArray('.program-card');
    
    cards.forEach((card: any) => {
      gsap.fromTo(card,
        { scale: 0.9, opacity: 0.6, y: 50 },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            end: 'top 45%',
            scrub: true,
          }
        }
      );
    });
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
      id="programs"
      ref={containerRef}
      className="relative w-full py-24 bg-[#091527] text-white px-6 overflow-hidden"
    >
      {/* Background glow filters */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] rounded-full bg-[#F47A20]/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[600px] h-[600px] rounded-full bg-[#3a6073]/10 blur-[150px] pointer-events-none" />
      <div className="max-w-6xl mx-auto w-full relative z-10">
        {/* Header */}
        <div className="mb-20 text-center md:text-left">
          <span className="text-[#F47A20] text-sm md:text-base font-bold tracking-[0.25em] uppercase">TAILORED TRAINING</span>
          <h2 className="font-bebas text-5xl md:text-7xl tracking-wide mt-2">
            ACADEMY PROGRAMS
          </h2>
          <p className="text-white/60 max-w-xl text-sm md:text-base mt-4 font-sans leading-relaxed">
            From beginners to court leaders, select the program designed for your age bracket and developmental timeline.
          </p>
        </div>
        {/* Stack of horizontal cards */}
        <div className="flex flex-col gap-10">
          {programs.map((program) => (
            <div
              key={program.id}
              className="program-card interactive-card w-full rounded-2xl glass-card overflow-hidden flex flex-col md:flex-row border border-white/10 hover:border-[#F47A20]/30 transition-all duration-500 shadow-2xl relative group"
              style={{
                boxShadow: `0 10px 30px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)`,
              }}
            >
              {/* Graphic/Color Block representation of image */}
              <div className="w-full md:w-[35%] h-[240px] md:h-auto min-h-[220px] relative overflow-hidden flex flex-col items-center justify-center p-8 text-center">
                <Image
                  src={program.imgUrl}
                  alt={program.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 35vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                
                {/* Dark tint overlay */}
                <div className="absolute inset-0 bg-[#0E2240]/65 z-10" />
                {/* Overlay court lines in card graphics */}
                <div className="absolute inset-0 opacity-15 border border-white m-4 rounded-lg pointer-events-none flex items-center justify-center z-20">
                  <div className="w-[80%] h-[80%] border border-white rounded-full" />
                </div>
                <span className="font-bebas text-4xl lg:text-5xl tracking-widest text-white drop-shadow-md z-20 leading-none relative">
                  {program.title.split(" ")[0]}
                </span>
                <span className="font-bebas text-xl tracking-[0.2em] text-[#F47A20] mt-1 z-20 font-bold uppercase drop-shadow-sm relative">
                  {program.title.split(" ").slice(1).join(" ")}
                </span>
              </div>
              {/* Text / Details */}
              <div className="flex-1 p-8 lg:p-10 flex flex-col justify-between bg-gradient-to-r from-transparent to-[#0E2240]/10">
                <div>
                  {/* Age & Duration badging */}
                  <div className="flex flex-wrap items-center gap-4 md:gap-6 mb-6">
                    <span className="flex items-center gap-2 text-xs font-semibold text-white/80 uppercase tracking-widest bg-white/5 border border-white/10 px-3 py-1.5 rounded-full">
                      <User className="w-4 h-4 text-[#F47A20]" />
                      {program.age}
                    </span>
                    <span className="flex items-center gap-2 text-xs font-semibold text-white/80 uppercase tracking-widest bg-white/5 border border-white/10 px-3 py-1.5 rounded-full">
                      <Calendar className="w-4 h-4 text-[#F47A20]" />
                      {program.duration}
                    </span>
                  </div>
                  {/* Description */}
                  <p className="text-white/70 font-sans text-sm md:text-base leading-relaxed mb-8 max-w-2xl">
                    {program.description}
                  </p>
                </div>
                {/* CTA */}
                <div className="flex items-center">
                  <a
                    href="#trial"
                    onClick={handleSmoothScroll}
                    className="inline-flex items-center gap-2 text-white hover:text-[#F47A20] bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#F47A20] font-bebas text-xl tracking-wider px-6 py-3 rounded-md transition-all duration-300 shadow-md group/btn"
                  >
                    BOOK FREE TRIAL CLASS
                    <ChevronRight className="w-5 h-5 transition-transform duration-300 group-hover/btn:translate-x-1 text-[#F47A20]" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
