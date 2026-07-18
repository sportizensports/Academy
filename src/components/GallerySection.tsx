'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface GalleryItem {
  id: string;
  imgUrl: string;
  videoUrl?: string;
  playerName: string;
  practiceType: string;
  height: string;
}

export default function GallerySection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const items: GalleryItem[] = [
    {
      id: 'gallery-item-1',
      imgUrl: '/images/Under 13 batch.jpeg',
      videoUrl: 'https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c054ba208d130cd3497d5012e86bc93a&profile_id=139&oauth2_token_id=57447761',
      playerName: 'Under 13 Batch',
      practiceType: 'Tactical Agility Drills',
      height: 'h-[320px] md:h-[400px]',
    },
    {
      id: 'gallery-item-2',
      imgUrl: '/images/Under 15 Girls.jpg',
      playerName: 'Under 15 Girls Division',
      practiceType: 'Offensive Strategies',
      height: 'h-[250px] md:h-[300px]',
    },
    {
      id: 'gallery-item-3',
      imgUrl: '/images/Mix Group Senior.jpg',
      videoUrl: 'https://player.vimeo.com/external/435674703.sd.mp4?s=6f41161d7a5b3a4f107f9c2d1b82e21074e50eb6&profile_id=165&oauth2_token_id=57447761',
      playerName: 'Mix Group Senior Batch',
      practiceType: 'Scrimmage Play',
      height: 'h-[300px] md:h-[350px]',
    },
    {
      id: 'gallery-item-4',
      imgUrl: '/images/Kid1.jpeg',
      playerName: 'Grassroots Kids Division',
      practiceType: 'Ball Control Basics',
      height: 'h-[250px] md:h-[300px]',
    },
    {
      id: 'gallery-item-5',
      imgUrl: '/images/Under 13.jpeg',
      videoUrl: 'https://player.vimeo.com/external/517602126.sd.mp4?s=d0d21a50c8227b686d1a93e3d23d8c1c4e9514e8&profile_id=165&oauth2_token_id=57447761',
      playerName: 'Under 13 Group',
      practiceType: 'Layup Drill Sessions',
      height: 'h-[320px] md:h-[450px]',
    },
    {
      id: 'gallery-item-6',
      imgUrl: '/images/Kid2.jpeg',
      playerName: 'Grassroots Junior Kids',
      practiceType: 'Shooting Laboratory',
      height: 'h-[280px] md:h-[320px]',
    },
  ];

  useGSAP(() => {
    const galleryCards = gsap.utils.toArray('.gallery-card');
    
    galleryCards.forEach((card: any) => {
      gsap.fromTo(card,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 90%',
            end: 'top 60%',
            scrub: true,
          }
        }
      );
    });
  }, { scope: containerRef });

  const handleMouseEnter = (videoEl: HTMLVideoElement | null) => {
    if (videoEl) {
      videoEl.style.opacity = '1';
      videoEl.play().catch((e) => console.log('Video play prevented', e));
    }
  };

  const handleMouseLeave = (videoEl: HTMLVideoElement | null) => {
    if (videoEl) {
      videoEl.style.opacity = '0';
      videoEl.pause();
    }
  };

  return (
    <section
      id="gallery"
      ref={containerRef}
      className="relative w-full py-24 bg-white px-6 overflow-hidden"
    >
      {/* Background soft circular highlights */}
      <div className="absolute top-10 right-10 w-[400px] h-[400px] rounded-full bg-[#F47A20]/5 blur-[70px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[500px] h-[500px] rounded-full bg-[#0E2240]/5 blur-[90px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full z-10 relative">
        
        {/* Header */}
        <div className="mb-20 text-center md:text-left">
          <span className="text-[#F47A20] text-sm md:text-base font-bold tracking-[0.25em] uppercase">COURT ACTION</span>
          <h2 className="font-bebas text-5xl md:text-7xl text-[#0E2240] tracking-wide mt-2">
            ACADEMY GALLERY
          </h2>
          <p className="text-gray-500 max-w-xl text-sm md:text-base mt-4 font-sans leading-relaxed">
            Hover over cards to see live-action training videos playing silently. Witness the training routines of our students.
          </p>
        </div>

        {/* Masonry Layout grid columns */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {items.map((item) => {
            let videoRef: HTMLVideoElement | null = null;
            return (
              <div
                key={item.id}
                className={`gallery-card break-inside-avoid relative w-full ${item.height} rounded-2xl overflow-hidden shadow-md group cursor-pointer border border-[#0E2240]/5`}
                onMouseEnter={() => handleMouseEnter(videoRef)}
                onMouseLeave={() => handleMouseLeave(videoRef)}
              >
                {/* Image element */}
                <Image
                  src={item.imgUrl}
                  alt={item.playerName}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />

                {/* Autoplay Video Loop element (fades in on hover) */}
                {item.videoUrl && (
                  <video
                    ref={(el) => { videoRef = el; }}
                    src={item.videoUrl}
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-500 pointer-events-none z-10"
                  />
                )}

                {/* Orange Glow & Info Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E2240]/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20 flex flex-col justify-end p-6 md:p-8"
                  style={{
                    boxShadow: 'inset 0 0 40px rgba(244, 122, 32, 0.25)',
                  }}
                >
                  <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <span className="text-[#F47A20] text-xs font-bold uppercase tracking-widest bg-[#F47A20]/15 border border-[#F47A20]/30 px-2.5 py-1 rounded-full">
                      {item.practiceType}
                    </span>
                    <h4 className="font-bebas text-3xl md:text-4xl text-white tracking-wide mt-3 leading-none">
                      {item.playerName}
                    </h4>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
