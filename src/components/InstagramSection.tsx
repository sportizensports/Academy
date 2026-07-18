'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Heart, MessageCircle } from 'lucide-react';
import { InstagramIcon } from '@/components/ui/SocialIcons';

interface InstagramPost {
  id: string;
  media_url: string;
  thumbnail_url?: string;
  media_type?: string;
  permalink: string;
  caption?: string;
}

export default function InstagramSection() {
  const [feed, setFeed] = useState<InstagramPost[]>([]);
  const [likesCount, setLikesCount] = useState<Record<string, number>>({});
  const [commentsCount, setCommentsCount] = useState<Record<string, number>>({});

  useEffect(() => {
    // Fetch live feed from our Next.js API route
    fetch('/api/instagram')
      .then((res) => res.json())
      .then((resData) => {
        if (resData.success && resData.data && resData.data.length > 0) {
          setFeed(resData.data);
          
          // Generate realistic mock likes/comments count for live posts
          const likes: Record<string, number> = {};
          const comments: Record<string, number> = {};
          resData.data.forEach((post: InstagramPost) => {
            likes[post.id] = Math.floor(Math.random() * 150) + 40;
            comments[post.id] = Math.floor(Math.random() * 20) + 5;
          });
          setLikesCount(likes);
          setCommentsCount(comments);
        }
      })
      .catch((err) => console.warn('Could not retrieve Instagram API feed:', err));
  }, []);

  // Standard fallback posts using actual academy images when no Instagram feed is configured/active
  const fallbackPosts: InstagramPost[] = [
    {
      id: 'fallback-1',
      media_url: '/images/Kid1.jpeg',
      permalink: 'https://instagram.com/sportizenbasketball',
      caption: '🏀 Grassroots kids training! Hard work starts early here.',
    },
    {
      id: 'fallback-2',
      media_url: '/images/Under 13.jpeg',
      permalink: 'https://instagram.com/sportizenbasketball',
      caption: '🎯 Master the shooting routine! Repetitive training with Coach Rakesh.',
    },
    {
      id: 'fallback-3',
      media_url: '/images/Under 15 Girls.jpg',
      permalink: 'https://instagram.com/sportizenbasketball',
      caption: '🔥 Intense training session for our Teens Division.',
    },
    {
      id: 'fallback-4',
      media_url: '/images/Mix Group Senior.jpg',
      permalink: 'https://instagram.com/sportizenbasketball',
      caption: '🏆 Match gameplay scrimmage rotations!',
    },
    {
      id: 'fallback-5',
      media_url: '/images/Under 13 batch.jpeg',
      permalink: 'https://instagram.com/sportizenbasketball',
      caption: '⛹️‍♂️ Tactical scrimmage drills under FIBA rules.',
    },
    {
      id: 'fallback-6',
      media_url: '/images/Kid2.jpeg',
      permalink: 'https://instagram.com/sportizenbasketball',
      caption: '🏀 Developing basic dribble handles and coordination.',
    },
  ];

  const activeFeed = feed.length > 0 ? feed : fallbackPosts;

  // Resolve thumbnail/media URLs (Reels use thumbnail_url from graph API)
  const getMediaUrl = (post: InstagramPost) => {
    if (post.media_type === 'VIDEO' && post.thumbnail_url) {
      return post.thumbnail_url;
    }
    return post.media_url;
  };

  return (
    <section
      id="instagram"
      className="relative w-full py-24 bg-[#091527] text-white px-6 overflow-hidden select-none"
    >
      {/* Background radial glow */}
      <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[#F47A20]/5 blur-[110px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-[#162F56]/15 blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto w-full z-10 relative">
        
        {/* Header with Follow CTA */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-8 text-center md:text-left">
          <div>
            <span className="text-[#F47A20] text-sm md:text-base font-bold tracking-[0.25em] uppercase">STAY CONNECTED</span>
            <h2 className="font-bebas text-5xl md:text-7xl tracking-wide mt-2">
              INSTAGRAM FEED
            </h2>
            <p className="text-white/60 max-w-xl text-sm md:text-base mt-2 font-sans">
              Follow our account to get daily insights, student drill videos, and academy announcements.
            </p>
          </div>
          <div>
            <a
              href="https://instagram.com/sportizenbasketball"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-[#F47A20] hover:bg-[#ff862e] text-white font-bebas text-xl tracking-wider px-8 py-3 rounded-md transition-all duration-300 shadow-xl glow-btn hover:scale-105 active:scale-95"
            >
              <InstagramIcon className="w-5 h-5" />
              FOLLOW @SPORTIZENBASKETBALL
            </a>
          </div>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full">
          {activeFeed.map((post, idx) => {
            const mockLikes = likesCount[post.id] || (120 + idx * 15);
            const mockComments = commentsCount[post.id] || (12 + idx * 2);
            return (
              <motion.a
                key={post.id}
                href={post.permalink}
                target="_blank"
                rel="noopener noreferrer"
                className="relative aspect-square rounded-2xl overflow-hidden shadow-lg border border-white/5 group block cursor-pointer"
                whileHover={{ 
                  y: -6,
                  boxShadow: '0 15px 30px rgba(244, 122, 32, 0.1)'
                }}
              >
                {/* Image */}
                <Image
                  src={getMediaUrl(post)}
                  alt={post.caption || "Instagram post thumbnail"}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />

                {/* Hover overlay (Likes/Comments) */}
                <div className="absolute inset-0 bg-[#0E2240]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex flex-col justify-between p-6">
                  {/* Caption snippet */}
                  <p className="text-white/90 text-xs md:text-sm leading-relaxed font-sans line-clamp-3">
                    {post.caption || '🏀 Sportizen Basketball Academy training drills.'}
                  </p>
                  
                  {/* Likes and Comments */}
                  <div className="flex items-center gap-6 mt-4 border-t border-white/10 pt-4">
                    <span className="flex items-center gap-2 font-semibold">
                      <Heart className="w-5 h-5 fill-[#F47A20] text-[#F47A20]" />
                      {mockLikes}
                    </span>
                    <span className="flex items-center gap-2 font-semibold">
                      <MessageCircle className="w-5 h-5 fill-white text-white" />
                      {mockComments}
                    </span>
                  </div>
                </div>
              </motion.a>
            );
          })}
        </div>

        {/* Show More Button */}
        <div className="flex justify-center mt-12">
          <a
            href="https://instagram.com/sportizenbasketball"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-[#F47A20] hover:bg-[#F47A20] text-white font-bebas text-2xl px-10 py-4 rounded-md transition-all duration-300 tracking-wider shadow-lg flex items-center gap-2 hover:scale-105 active:scale-95 cursor-pointer bg-transparent"
          >
            SHOW MORE POSTS
          </a>
        </div>

      </div>
    </section>
  );
}
