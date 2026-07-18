'use client';

import Image from 'next/image';
import { Medal } from 'lucide-react';
import { InstagramIcon, LinkedinIcon, TwitterIcon } from '@/components/ui/SocialIcons';

interface Coach {
  id: string;
  name: string;
  role: string;
  imgUrl: string;
  achievements: string[];
  bio: string;
  socials: { instagram: string; linkedin: string; twitter: string };
}

export default function CoachesSection() {
  const coaches: Coach[] = [
    {
      id: 'rakesh-kumar-verma',
      name: 'Rakesh Kumar Verma',
      role: 'HEAD COACH',
      imgUrl: '/images/Rakesh.jpeg',
      achievements: [
        'Registered Coach - Basketball Federation of India (BFI)',
        'Grassroots Development Specialist',
        'FIBA Match & Play Coordinator',
      ],
      bio: 'Rakesh Kumar Verma is a BFI-registered coach bringing years of professional training experience. He leads youth development pathways at Sportizen, molding raw athleticism into tactical game play.',
      socials: { instagram: 'https://instagram.com/sportizenbasketball', linkedin: '#', twitter: '#' },
    },
  ];

  return (
    <section
      id="coaches"
      className="relative w-full py-24 bg-white px-6 overflow-hidden select-none"
    >
      {/* Background accents */}
      <div className="absolute top-1/4 right-10 w-[500px] h-[500px] rounded-full bg-[#0E2240]/5 blur-[90px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-10 w-[400px] h-[400px] rounded-full bg-[#F47A20]/5 blur-[70px] pointer-events-none" />

      <div className="max-w-6xl mx-auto w-full z-10 relative">
        
        {/* Header */}
        <div className="mb-16 text-center">
          <span className="text-[#F47A20] text-sm md:text-base font-bold tracking-[0.25em] uppercase">ACADEMY MENTORSHIP</span>
          <h2 className="font-bebas text-5xl md:text-7xl text-[#0E2240] tracking-wide mt-2">
            MEET THE COACH
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-sm md:text-base mt-4 font-sans leading-relaxed">
            Train under a registered professional from the Basketball Federation of India (BFI) who supervises all training sessions.
          </p>
        </div>

        {/* Centered Single Coach Card */}
        <div className="flex justify-center w-full">
          {coaches.map((coach) => (
            <div
              key={coach.id}
              className="relative w-full max-w-[420px] aspect-[3/4] md:aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border border-[#0E2240]/5 group cursor-pointer"
            >
              {/* Coach Image */}
              <Image
                src={coach.imgUrl}
                alt={coach.name}
                fill
                sizes="(max-width: 768px) 100vw, 420px"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                priority
              />

              {/* Gradient card tint */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0E2240]/95 via-[#0E2240]/40 to-transparent z-10" />

              {/* Card Static details (bottom) */}
              <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 z-20 transition-transform duration-500 group-hover:translate-y-[-180px]">
                <span className="text-[#F47A20] text-xs font-bold tracking-widest uppercase">
                  {coach.role}
                </span>
                <h3 className="font-bebas text-3xl md:text-4xl text-white tracking-wide mt-1 leading-none">
                  {coach.name}
                </h3>
                <span className="text-[10px] text-white/50 tracking-wider font-semibold uppercase font-sans mt-2 block">
                  Basketball Federation of India Registered
                </span>
              </div>

              {/* Hover Slide-up Bio Details Overlay */}
              <div 
                className="absolute bottom-0 left-0 w-full p-6 md:p-8 z-20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 bg-[#0E2240]/98 border-t border-white/10 rounded-t-2xl flex flex-col justify-between"
                style={{ height: '230px' }}
              >
                <div>
                  {/* Bio statement */}
                  <p className="text-white/80 font-sans text-xs md:text-sm leading-relaxed mb-4">
                    {coach.bio}
                  </p>

                  {/* Achievements */}
                  <div className="flex flex-col gap-1.5 mb-4">
                    {coach.achievements.map((ach, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-[10px] md:text-xs text-white/60 font-semibold uppercase tracking-wider font-sans">
                        <Medal className="w-3.5 h-3.5 text-[#F47A20] flex-shrink-0" />
                        <span>{ach}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Social Links */}
                <div className="flex items-center gap-4">
                  <a href={coach.socials.instagram} target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-[#F47A20] transition-colors">
                    <InstagramIcon className="w-5 h-5" />
                  </a>
                  <a href={coach.socials.linkedin} className="text-white/60 hover:text-[#F47A20] transition-colors">
                    <LinkedinIcon className="w-5 h-5" />
                  </a>
                  <a href={coach.socials.twitter} className="text-white/60 hover:text-[#F47A20] transition-colors">
                    <TwitterIcon className="w-5 h-5" />
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
