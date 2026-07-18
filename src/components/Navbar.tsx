'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Home, Info, Award, Image as ImageIcon, Users, HelpCircle, CalendarDays, PhoneCall } from 'lucide-react';

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: NavItem[] = [
    { label: 'Home', href: '#hero', icon: <Home className="w-5 h-5" /> },
    { label: 'About', href: '#why', icon: <Info className="w-5 h-5" /> },
    { label: 'Programs', href: '#programs', icon: <Award className="w-5 h-5" /> },
    { label: 'Gallery', href: '#gallery', icon: <ImageIcon className="w-5 h-5" /> },
    { label: 'Coaches', href: '#coaches', icon: <Users className="w-5 h-5" /> },
    { label: 'FAQ', href: '#faq', icon: <HelpCircle className="w-5 h-5" /> },
    { label: 'Register', href: '#trial', icon: <CalendarDays className="w-5 h-5" /> },
  ];

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Desktop Header */}
      <header
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 hidden lg:block ${
          isScrolled
            ? 'bg-[#0E2240]/95 backdrop-blur-md border-b border-white/10 py-3 shadow-lg'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <a href="#hero" onClick={(e) => handleSmoothScroll(e, '#hero')} className="flex items-center gap-3">
            <div className="relative w-11 h-11 rounded-full overflow-hidden shadow-md border border-[#F47A20]">
              <Image
                src="/logo.png"
                alt="Sportizen Logo"
                fill
                className="object-cover scale-[1.05]"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="font-bebas text-2xl tracking-wider text-white leading-none">SPORTIZEN</span>
              <span className="text-[10px] tracking-[0.2em] text-[#F47A20] font-bold uppercase">Basketball Academy</span>
            </div>
          </a>

          {/* Navigation Links */}
          <nav className="flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleSmoothScroll(e, item.href)}
                className="text-sm font-medium text-white/80 hover:text-[#F47A20] transition-colors duration-300 relative group py-2"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#F47A20] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* CTA Button */}
          <div>
            <a
              href="#trial"
              onClick={(e) => handleSmoothScroll(e, '#trial')}
              className="bg-[#F47A20] text-white font-bebas text-lg px-6 py-2 rounded-md hover:bg-[#ff862e] transition-all duration-300 glow-btn tracking-wider shadow-lg flex items-center gap-2"
            >
              BOOK TRIAL
            </a>
          </div>
        </div>
      </header>

      {/* Mobile Floating Bottom Navigation */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-[90%] max-w-[450px] lg:hidden">
        <div className="bg-[#0E2240]/90 backdrop-blur-xl border border-white/10 rounded-full px-4 py-3 shadow-2xl flex items-center justify-around">
          {navItems.slice(0, 6).map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => handleSmoothScroll(e, item.href)}
              className="flex flex-col items-center justify-center text-white/60 hover:text-[#F47A20] active:text-[#F47A20] transition-colors duration-200"
              title={item.label}
            >
              {item.icon}
              <span className="text-[9px] mt-1 font-semibold tracking-wide uppercase">{item.label}</span>
            </a>
          ))}
          
          {/* Mobile Booking Icon CTA */}
          <a
            href="#trial"
            onClick={(e) => handleSmoothScroll(e, '#trial')}
            className="w-10 h-10 rounded-full bg-[#F47A20] text-white flex items-center justify-center shadow-lg active:scale-95 transition-transform"
            title="Book Trial"
          >
            <CalendarDays className="w-5 h-5" />
          </a>
        </div>
      </div>
    </>
  );
}
