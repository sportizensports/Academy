'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

import SmoothScroll from '@/components/ui/SmoothScroll';
import CustomCursor from '@/components/ui/CustomCursor';
import BackgroundScrollAnimation from '@/components/ui/BackgroundScrollAnimation';
import Navbar from '@/components/Navbar';
import CourtScrollIndicator from '@/components/ui/CourtScrollIndicator';
import HeroSection from '@/components/HeroSection';

import ProgramsSection from '@/components/ProgramsSection';
import WhySection from '@/components/WhySection';
import GallerySection from '@/components/GallerySection';
import StatsSection from '@/components/StatsSection';
import InstagramSection from '@/components/InstagramSection';
import CoachesSection from '@/components/CoachesSection';
import FaqSection from '@/components/FaqSection';
import TrialFormSection from '@/components/TrialFormSection';
import Footer from '@/components/Footer';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const mainRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Select all section elements directly under main
    // Exclude 'hero' since it has its own heavy pin/bounce timelines.
    const sections = gsap.utils.toArray('main > section').filter((section: any) => {
      const id = section.getAttribute('id');
      return id !== 'hero';
    });

    sections.forEach((section: any, idx) => {
      // Skip the last section (TrialFormSection) so the footer flows naturally
      if (idx === sections.length - 1) return;

      gsap.to(section, {
        scrollTrigger: {
          trigger: section,
          start: 'bottom bottom', // When the bottom of the section reaches the bottom of the viewport
          end: 'bottom top',      // When the bottom of the section leaves the top of the viewport
          scrub: true,
        },
        opacity: 0.15,          // Smoothly fade to transparent/dark overlay
        scale: 0.95,            // Shrink slightly to create depth stack
        yPercent: -8,           // Parallax scroll overlay offset
        ease: 'none',
      });
    });
  }, { scope: mainRef });

  return (
    <SmoothScroll>
      {/* Premium custom mouse cursor */}
      <CustomCursor />

      {/* Decorative low-opacity background scroll tracking balls */}
      <BackgroundScrollAnimation />
      
      {/* Sticky navigation */}
      <Navbar />

      {/* Floating court scroll outline */}
      <CourtScrollIndicator />

      {/* Main Single Page Sections */}
      <main ref={mainRef} className="w-full flex flex-col bg-[#071324] overflow-hidden relative z-10">
        {/* Section 1: Hero - Full viewport dunk scene */}
        <HeroSection />
        

        
        {/* Section 3: Programs - Expandable horizontal cards */}
        <ProgramsSection />
        
        {/* Section 4: Why Sportizen - Interactive asymmetric grid */}
        <WhySection />
        
        {/* Section 5: Gallery - Masonry grid with hover videos */}
        <GallerySection />
        
        {/* Section 6: Statistics - Viewport count up details */}
        <StatsSection />
        
        {/* Section 7: Instagram Feed - Animated feed grid */}
        <InstagramSection />
        
        {/* Section 8: Coaches - Zooms & bios slideup */}
        <CoachesSection />
        
        {/* Section 9: FAQ - Accordion with rotating ball icon */}
        <FaqSection />
        
        {/* Section 10: Trial Class Form - Glassmorphic court registration */}
        <TrialFormSection />
      </main>

      {/* Website Footer & Location Pin */}
      <Footer />
    </SmoothScroll>
  );
}
