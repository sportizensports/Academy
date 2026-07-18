'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Mail, Phone, MapPin } from 'lucide-react';
import { InstagramIcon, FacebookIcon, YoutubeIcon } from '@/components/ui/SocialIcons';

function VisitorCounter() {
  const [visitorCount, setVisitorCount] = useState<number | null>(null);

  useEffect(() => {
    async function trackVisit() {
      try {
        const now = new Date();
        const monthKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
        const storageKey = 'sportizen_last_visit_month';
        const lastVisitedMonth = localStorage.getItem(storageKey);
        
        const isNewVisit = lastVisitedMonth !== monthKey;
        
        const res = await fetch('/api/visits', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ isNewVisit, monthKey }),
        });
        
        const data = await res.json();
        if (data && typeof data.count === 'number') {
          setVisitorCount(data.count);
          if (isNewVisit) {
            localStorage.setItem(storageKey, monthKey);
          }
        }
      } catch (err) {
        console.error('Error tracking visitor metrics:', err);
      }
    }
    
    trackVisit();
  }, []);

  if (visitorCount === null) return null;

  return (
    <span 
      className="text-[10px] text-white/10 select-none cursor-default hover:text-white/30 transition-colors duration-300" 
      title="Monthly Unique Visitors"
    >
      MUV: {visitorCount}
    </span>
  );
}

export default function Footer() {
  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative w-full bg-[#071324] text-white border-t border-white/10 pt-20 pb-10 px-6 overflow-hidden">
      
      {/* Background neon flares */}
      <div className="absolute bottom-0 left-[-10%] w-[300px] h-[300px] rounded-full bg-[#F47A20]/5 blur-[80px] pointer-events-none" />
      <div className="absolute top-[20%] right-[-10%] w-[350px] h-[350px] rounded-full bg-[#162F56]/10 blur-[90px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full z-10 relative">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          {/* Logo & Statement */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <div className="relative w-11 h-11 rounded-full overflow-hidden shadow-md border border-[#F47A20]">
                <Image
                  src="/logo.png"
                  alt="Sportizen Logo"
                  fill
                  className="object-cover scale-[1.05]"
                  loading="lazy"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-bebas text-2xl tracking-wider text-white leading-none">SPORTIZEN</span>
                <span className="text-[10px] tracking-[0.2em] text-[#F47A20] font-bold uppercase">Basketball Academy</span>
              </div>
            </div>
            <p className="text-white/60 font-sans text-sm leading-relaxed max-w-xs">
              Molding young talent into elite court champions through FIBA-certified coaches, modern methodologies, and rigorous match exposure.
            </p>
            <div className="flex items-center gap-4 mt-2">
              <a href="https://instagram.com/sportizenbasketball" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#F47A20] text-white flex items-center justify-center transition-colors">
                <InstagramIcon className="w-4.5 h-4.5" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#F47A20] text-white flex items-center justify-center transition-colors">
                <FacebookIcon className="w-4.5 h-4.5" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#F47A20] text-white flex items-center justify-center transition-colors">
                <YoutubeIcon className="w-4.5 h-4.5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-6">
            <h4 className="font-bebas text-xl tracking-wider text-white">QUICK LINKS</h4>
            <nav className="flex flex-col gap-3">
              {[
                { label: 'Home', href: '#hero' },
                { label: 'About Academy', href: '#about' },
                { label: 'Academy Programs', href: '#programs' },
                { label: 'Action Gallery', href: '#gallery' },
                { label: 'Elite Coaches', href: '#coaches' },
                { label: 'Frequently Asked', href: '#faq' },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleSmoothScroll(e, link.href)}
                  className="text-white/60 hover:text-[#F47A20] text-sm font-sans transition-colors duration-200"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact Information */}
          <div className="flex flex-col gap-6">
            <h4 className="font-bebas text-xl tracking-wider text-white">CONTACT</h4>
            <div className="flex flex-col gap-4 text-sm text-white/60 font-sans">
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-[#F47A20] flex-shrink-0 mt-0.5" />
                <div className="flex flex-col">
                  <span>+91 82855 65701</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-[#F47A20] flex-shrink-0 mt-0.5" />
                <span>sportizen.sports@gmail.com</span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#F47A20] flex-shrink-0 mt-0.5" />
                <span>Arwachin International School, Dilshad Garden, Delhi - 110095</span>
              </div>
            </div>
          </div>

          {/* Google Maps Location Embed */}
          <div className="flex flex-col gap-6">
            <h4 className="font-bebas text-xl tracking-wider text-white">OUR LOCATION</h4>
            <div className="relative w-full h-[180px] rounded-xl overflow-hidden border border-white/10">
              <iframe
                title="Sportizen Court Location Map"
                src="https://maps.google.com/maps?q=Arwachin%20International%20School,%20Dilshad%20Garden,%20Delhi%20-%20110095&t=&z=15&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full border-0 opacity-75 hover:opacity-100 transition-opacity duration-300"
                allowFullScreen={true}
                loading="lazy"
              ></iframe>
            </div>
          </div>

        </div>

        {/* Divider */}
        <div className="w-full h-[1px] bg-white/10 my-8" />

        {/* Lower footer copyrights */}
        <div className="flex flex-col md:flex-row items-center justify-between text-xs text-white/40 font-sans gap-4 text-center">
          <span>&copy; {new Date().getFullYear()} Sportizen Basketball Academy. All rights reserved.</span>
          
          <VisitorCounter />

          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
