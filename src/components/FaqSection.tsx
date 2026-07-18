'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export default function FaqSection() {
  const [activeIndex, setActiveIndex] = useState<string | null>(null);

  const faqs: FaqItem[] = [
    {
      id: 'faq-1',
      question: 'What is the age group eligibility for the academy?',
      answer: 'We train players between the ages of 5 and 18+ years old. Students are segmented into age-appropriate divisions: Kids (5-8 yrs), Juniors (9-12 yrs), Teens (13-16 yrs), and Elite Advanced (17+ yrs).',
    },
    {
      id: 'faq-2',
      question: 'How do I book a free trial class?',
      answer: 'You can book a free trial class by completing the booking form below. Select your preferred day and timing, submit the form, and our coordinator will confirm your slot within 24 hours.',
    },
    {
      id: 'faq-3',
      question: 'What is the duration and frequency of each session?',
      answer: 'Sessions are 90 minutes long. Our training runs 3 times a week exclusively on Monday, Wednesday, and Friday. We do not host weekend classes.',
    },
    {
      id: 'faq-4',
      question: 'Do you provide path recommendations and player reports?',
      answer: 'Yes. Our Elite Advanced players receive detailed performance report sheets, individual drill plans, and video analysis recommendations to assist in their own school team or club tryouts.',
    },
    {
      id: 'faq-5',
      question: 'Where are the training courts located? Are they outdoor?',
      answer: 'All our training sessions are conducted on our high-quality outdoor court at Arwachin International School, Dilshad Garden, Delhi. Our players train in professional outdoor court conditions.',
    },
  ];

  const toggleFaq = (id: string) => {
    setActiveIndex(activeIndex === id ? null : id);
  };

  return (
    <section
      id="faq"
      className="relative w-full py-24 bg-[#091527] text-white px-6 overflow-hidden select-none"
    >
      {/* Background neon elements */}
      <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[#F47A20]/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-[#162F56]/20 blur-[130px] pointer-events-none" />

      <div className="max-w-4xl mx-auto w-full z-10 relative">
        
        {/* Header */}
        <div className="mb-20 text-center">
          <span className="text-[#F47A20] text-sm md:text-base font-bold tracking-[0.25em] uppercase">QUESTIONS & ANSWERS</span>
          <h2 className="font-bebas text-5xl md:text-7xl tracking-wide mt-2">
            FREQUENTLY ASKED QUESTIONS
          </h2>
          <p className="text-white/60 max-w-xl mx-auto text-sm md:text-base mt-4 font-sans leading-relaxed">
            Find answers to commonly asked questions regarding registrations, batch allocations, and training protocols.
          </p>
        </div>

        {/* Accordion List */}
        <div className="flex flex-col gap-4">
          {faqs.map((faq) => {
            const isOpen = activeIndex === faq.id;
            return (
              <div
                key={faq.id}
                className="w-full rounded-xl glass-card border border-white/10 overflow-hidden transition-all duration-300 hover:border-white/20"
              >
                {/* Accordion Trigger header */}
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full p-6 md:p-8 flex items-center justify-between text-left cursor-pointer select-none"
                >
                  <span className="text-lg md:text-xl font-bold font-sans text-white/95 group-hover:text-white transition-colors duration-200 pr-4">
                    {faq.question}
                  </span>
                  
                  {/* Rotating Basketball icon */}
                  <motion.div
                    className="w-8 h-8 rounded-full flex-shrink-0 relative overflow-hidden flex items-center justify-center border border-white/20"
                    animate={{ 
                      rotate: isOpen ? 180 : 0,
                      backgroundColor: isOpen ? '#F47A20' : 'rgba(255,255,255,0.05)',
                      borderColor: isOpen ? '#F47A20' : 'rgba(255,255,255,0.2)'
                    }}
                    transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                  >
                    {/* Miniature basketball seams */}
                    <div className="absolute w-full h-[1px] bg-[#0E2240] top-1/2 left-0 -translate-y-1/2 opacity-70" />
                    <div className="absolute h-full w-[1px] bg-[#0E2240] left-1/2 top-0 -translate-x-1/2 opacity-70" />
                    <div className="absolute w-[80%] h-[80%] border border-[#0E2240] rounded-full opacity-40" />
                  </motion.div>
                </button>

                {/* Animated content box */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: 'easeInOut' }}
                    >
                      <div className="px-6 md:px-8 pb-6 md:pb-8 text-white/70 font-sans text-sm md:text-base leading-relaxed border-t border-white/5 pt-4">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
