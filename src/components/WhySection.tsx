'use client';

import { motion } from 'framer-motion';
import { Users, GraduationCap, Trophy, Dumbbell, ShieldCheck, Heart, BarChart3 } from 'lucide-react';

interface Tile {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  colSpan: string;
}

export default function WhySection() {
  const tiles: Tile[] = [
    {
      id: 'batches',
      title: 'Small Batch Size',
      description: 'We maintain a strict 1:12 coach-to-student ratio to ensure each player receives individual corrective guidance.',
      icon: <Users className="w-8 h-8 text-[#F47A20]" />,
      colSpan: 'md:col-span-1',
    },
    {
      id: 'matches',
      title: 'Match Experience',
      description: 'Participate in weekly internal leagues, competitive local cups, and friendly inter-academy challenges.',
      icon: <Trophy className="w-8 h-8 text-[#F47A20]" />,
      colSpan: 'md:col-span-1',
    },
    {
      id: 'fitness',
      title: 'Fitness & Conditioning',
      description: 'Custom agility drills, plyometrics, jump-vertical development, and endurance circuits tailored for young athletes.',
      icon: <Dumbbell className="w-8 h-8 text-[#F47A20]" />,
      colSpan: 'md:col-span-2',
    },
    {
      id: 'training',
      title: 'Modern Training',
      description: 'Utilize state-of-the-art shooting machines, video analysis software, and modern grip court surfaces.',
      icon: <ShieldCheck className="w-8 h-8 text-[#F47A20]" />,
      colSpan: 'md:col-span-1',
    },
    {
      id: 'attention',
      title: 'Personal Attention',
      description: 'Receive custom player report sheets detailing strengths, weaknesses, and direct drills to practice at home.',
      icon: <Heart className="w-8 h-8 text-[#F47A20]" />,
      colSpan: 'md:col-span-1',
    },
    {
      id: 'tracking',
      title: 'Progress Tracking',
      description: 'Assess growth with quarterly shoot tests, agility timelines, and digitized statistical performance metrics.',
      icon: <BarChart3 className="w-8 h-8 text-[#F47A20]" />,
      colSpan: 'md:col-span-1',
    },
  ];

  return (
    <section
      id="why"
      className="relative w-full py-24 bg-[#0E2240] text-white px-6 overflow-hidden"
    >
      {/* Background neon lights */}
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-[#F47A20]/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-[#F47A20]/5 blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto w-full z-10 relative">
        
        {/* Title */}
        <div className="mb-20 text-center">
          <span className="text-[#F47A20] text-sm md:text-base font-bold tracking-[0.25em] uppercase">THE SPORTIZEN EDGE</span>
          <h2 className="font-bebas text-5xl md:text-7xl tracking-wide mt-2">
            WHY SPORTIZEN ACADEMY?
          </h2>
          <p className="text-white/60 max-w-xl mx-auto text-sm md:text-base mt-4 font-sans leading-relaxed">
            Discover the advantages and specialized setups that differentiate us from standard training camps.
          </p>
        </div>

        {/* Asymmetric Masonry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tiles.map((tile) => (
            <motion.div
              key={tile.id}
              className={`${tile.colSpan} bg-[#162F56]/60 backdrop-blur-md rounded-xl p-8 border border-white/10 hover:border-[#F47A20]/40 flex flex-col justify-between group cursor-pointer transition-all duration-300 relative`}
              whileHover={{ 
                y: -6,
                boxShadow: '0 15px 30px rgba(244, 122, 32, 0.15)',
              }}
              style={{
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
              }}
            >
              {/* Highlight Glow line on top border on hover */}
              <div className="absolute top-0 left-0 w-0 h-[2px] bg-[#F47A20] group-hover:w-full transition-all duration-500 rounded-t-xl" />

              <div>
                {/* Icon Circle */}
                <div className="w-14 h-14 rounded-full bg-white/5 group-hover:bg-[#F47A20]/25 flex items-center justify-center mb-6 transition-all duration-300">
                  <motion.div
                    whileHover={{ scale: 1.25, rotate: 10 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    {tile.icon}
                  </motion.div>
                </div>

                {/* Title */}
                <h4 className="text-2xl font-bold tracking-wide font-sans mb-3 text-white group-hover:text-[#F47A20] transition-colors duration-300">
                  {tile.title}
                </h4>
              </div>

              {/* Description */}
              <p className="text-white/70 font-sans text-sm leading-relaxed mt-2 group-hover:text-white transition-colors duration-300">
                {tile.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
