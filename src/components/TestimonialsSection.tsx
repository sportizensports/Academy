'use client';

import { useRef } from 'react';
import { Quote, Star } from 'lucide-react';
import { motion } from 'framer-motion';

interface Testimonial {
  id: string;
  parentName: string;
  studentName: string;
  relation: string;
  text: string;
  rating: number;
  rotation: string;
}

export default function TestimonialsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const testimonials: Testimonial[] = [
    {
      id: 't-1',
      parentName: 'Sarah Miller',
      studentName: 'Leo Miller (11 yrs)',
      relation: 'Parent of',
      text: 'The coaching staff is exceptional. Leo has improved his spatial awareness and shooting accuracy by leaps and bounds in just 6 months. More than that, his self-belief has soared.',
      rating: 5,
      rotation: 'rotate-[-1.5deg]',
    },
    {
      id: 't-2',
      parentName: 'David K.',
      studentName: 'Luke K. (14 yrs)',
      relation: 'Parent of',
      text: 'Sportizen doesn\'t just build basketball skills; they instil discipline and routine. My son is more focused at home, handles pressure much better, and is scoring consistently in match plays.',
      rating: 5,
      rotation: 'rotate-[1deg]',
    },
    {
      id: 't-3',
      parentName: 'Elena Sobol',
      studentName: 'Maya Sobol (9 yrs)',
      relation: 'Parent of',
      text: 'Finding weekend coaching that fits our schedule was a challenge until we joined Sportizen. The facilities are modern and the coaches pay individual attention to Maya\'s layup form.',
      rating: 5,
      rotation: 'rotate-[-1deg]',
    },
    {
      id: 't-4',
      parentName: 'Robert Wright',
      studentName: 'James Wright (16 yrs)',
      relation: 'Parent of',
      text: 'The advanced division matches provided the exact exposure James needed. The detailed video analysis and scouting advice helped him secure a high school varsity trial successfully!',
      rating: 5,
      rotation: 'rotate-[1.5deg]',
    },
  ];

  return (
    <section
      id="testimonials"
      className="relative w-full py-24 bg-white px-6 overflow-hidden select-none"
    >
      {/* Background accents */}
      <div className="absolute top-1/4 left-10 w-[500px] h-[500px] rounded-full bg-[#0E2240]/5 blur-[90px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-[400px] h-[400px] rounded-full bg-[#F47A20]/5 blur-[70px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full z-10 relative">
        
        {/* Header */}
        <div className="mb-20 text-center">
          <span className="text-[#F47A20] text-sm md:text-base font-bold tracking-[0.25em] uppercase">TESTIMONIALS</span>
          <h2 className="font-bebas text-5xl md:text-7xl text-[#0E2240] tracking-wide mt-2">
            PARENTS & STUDENTS SAY
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-sm md:text-base mt-4 font-sans leading-relaxed">
            Read stories of growth, confidence, and tournament success shared by our academy families.
          </p>
        </div>

        {/* Horizontal Card Scroll Container */}
        <div 
          ref={scrollRef}
          className="flex gap-8 overflow-x-auto pb-10 pt-4 px-4 scrollbar-thin no-scrollbar touch-pan-x snap-x snap-mandatory cursor-grab active:cursor-grabbing"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {testimonials.map((item) => (
            <motion.div
              key={item.id}
              className={`flex-shrink-0 w-[290px] sm:w-[350px] md:w-[420px] rounded-2xl bg-[#F8F9FA] p-8 border border-[#0E2240]/5 shadow-lg group relative snap-start ${item.rotation}`}
              whileHover={{ 
                rotate: '0deg',
                y: -8,
                scale: 1.02,
                boxShadow: '0 20px 40px rgba(14, 34, 64, 0.1)',
                borderColor: 'rgba(244, 122, 32, 0.2)'
              }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            >
              {/* Quote Mark Icon */}
              <div className="absolute top-6 right-8 opacity-10 group-hover:opacity-20 group-hover:scale-110 transition-all duration-300">
                <Quote className="w-12 h-12 text-[#F47A20]" />
              </div>

              {/* Stars Rating */}
              <div className="flex gap-1 mb-6">
                {[...Array(item.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-[#F47A20] text-[#F47A20]" />
                ))}
              </div>

              {/* Review Text */}
              <p className="text-gray-600 font-sans text-sm md:text-base leading-relaxed italic mb-8 group-hover:text-[#0E2240] transition-colors duration-300">
                &ldquo;{item.text}&rdquo;
              </p>

              {/* Divider */}
              <div className="w-full h-[1px] bg-gray-200 mb-6 group-hover:bg-[#F47A20]/20 transition-colors duration-300" />

              {/* Author Info */}
              <div className="flex items-center gap-4">
                {/* Styled initial Avatar */}
                <div className="w-12 h-12 rounded-full bg-[#0E2240] group-hover:bg-[#F47A20] text-white flex items-center justify-center font-bold tracking-wider font-sans transition-colors duration-300 shadow-md">
                  {item.parentName.split(" ").map(n => n[0]).join("")}
                </div>
                
                <div className="flex flex-col">
                  <span className="font-bold text-[#0E2240] font-sans text-sm md:text-base">
                    {item.parentName}
                  </span>
                  <span className="text-gray-400 text-xs font-semibold font-sans mt-0.5">
                    {item.relation} <span className="text-[#F47A20]">{item.studentName}</span>
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Scroll hint indicator for desktop */}
        <p className="text-center text-gray-400 text-xs uppercase tracking-widest mt-6 animate-pulse hidden md:block">
          Drag or Scroll horizontally to read more
        </p>

      </div>
    </section>
  );
}
