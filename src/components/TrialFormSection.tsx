'use client';

import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

// Form validation schema using Zod
const formSchema = z.object({
  player_name: z.string().min(2, "Player name must be at least 2 characters"),
  parent_name: z.string().min(2, "Parent name must be at least 2 characters"),
  age: z.number().min(5, "Age must be at least 5").max(30, "Age must be under 30"),
  phone: z.string().regex(/^\+?[0-9\s-]{10,15}$/, "Enter a valid phone number (10-15 digits)"),
  email: z.string().email("Enter a valid email address"),
  city: z.string().min(2, "City must be at least 2 characters"),
  experience: z.string().min(1, "Select experience level"),
  preferred_batch: z.string().min(1, "Select preferred batch"),
  preferred_day: z.string().min(1, "Select preferred day"),
  message: z.string().optional(),
  agree: z.literal(true, {
    message: "You must agree to be contacted",
  }),
});

type FormData = z.infer<typeof formSchema>;

export default function TrialFormSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitAnimating, setIsSubmitAnimating] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      player_name: '',
      parent_name: '',
      age: undefined,
      phone: '',
      email: '',
      city: '',
      experience: '',
      preferred_batch: '5:00 PM - 7:00 PM',
      preferred_day: 'Monday, Wednesday, Friday',
      message: '',
      agree: undefined,
    }
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setIsSubmitAnimating(true);
    setSubmitError(null);

    // Run the button hoop roll animation for 1.5s
    const animPromise = new Promise((resolve) => setTimeout(resolve, 1600));

    // Save via server API (which stores in Supabase and sends email)
    const apiPromise = fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .catch((err) => ({ success: false, error: err.message }));

    try {
      const [_, apiResult] = await Promise.all([animPromise, apiPromise]);
      
      if (apiResult.success) {
        setIsSuccess(true);
        // Trigger full screen confetti
        confetti({
          particleCount: 150,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#F47A20', '#FFFFFF', '#0E2240'],
        });
        reset();
      } else {
        setSubmitError(apiResult.error || 'Failed to submit registration. Please try again.');
      }
    } catch (e: any) {
      setSubmitError(e.message || 'An unexpected error occurred.');
    } finally {
      setIsSubmitting(false);
      setIsSubmitAnimating(false);
    }
  };

  return (
    <section
      id="trial"
      className="relative w-full min-h-screen py-24 flex flex-col items-center justify-center px-6 overflow-hidden"
    >
      {/* Background Court Video Loop */}
      <div className="absolute inset-0 z-0">
        <video
          src="https://player.vimeo.com/external/403788775.sd.mp4?s=82c0f6f059c3a30cbff5cbb819c968f9b96bc93a&profile_id=165&oauth2_token_id=57447761"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        />
        {/* Dark theme blend overlay */}
        <div className="absolute inset-0 bg-[#071324]/85 backdrop-blur-[1px]" />
      </div>

      <div className="max-w-4xl w-full z-10 relative flex flex-col items-center">
        
        {/* Header */}
        <div className="mb-12 text-center">
          <span className="text-[#F47A20] text-sm md:text-base font-bold tracking-[0.25em] uppercase">SECURE A SLOT</span>
          <h2 className="font-bebas text-5xl md:text-7xl text-white tracking-wide mt-2">
            READY TO ELEVATE YOUR GAME?
          </h2>
          <p className="text-white/60 max-w-xl mx-auto text-sm md:text-base mt-4 font-sans leading-relaxed">
            Register for your 1 Free Trial Class today. Let our coaches evaluate your skills and design your path.
          </p>
        </div>

        {/* Trial Registration Glassmorphic Form Card */}
        <div className="w-full rounded-2xl glass-card p-8 md:p-12 shadow-2xl border border-white/10 relative overflow-hidden">
          
          <AnimatePresence mode="wait">
            {!isSuccess ? (
              <motion.form
                key="form"
                onSubmit={handleSubmit(onSubmit)}
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {/* Honeypot field for spam prevention */}
                <input
                  type="text"
                  name="website"
                  style={{ display: 'none' }}
                  tabIndex={-1}
                  autoComplete="off"
                />
                {/* Error Banner */}
                {submitError && (
                  <div className="col-span-1 md:col-span-2 bg-red-500/10 border border-red-500/30 rounded-xl p-4 flex items-center gap-3 text-red-200 text-sm">
                    <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                    <span>{submitError}</span>
                  </div>
                )}

                {/* Player Name */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-white/70">Player Name</label>
                  <input
                    type="text"
                    {...register('player_name')}
                    className="bg-white/5 border border-white/10 focus:border-[#F47A20] rounded-lg px-4 py-3 text-white outline-none transition-colors text-sm"
                    placeholder="Enter player's full name"
                  />
                  {errors.player_name && (
                    <span className="text-red-400 text-xs mt-1">{errors.player_name.message}</span>
                  )}
                </div>

                {/* Parent Name */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-white/70">Parent Name</label>
                  <input
                    type="text"
                    {...register('parent_name')}
                    className="bg-white/5 border border-white/10 focus:border-[#F47A20] rounded-lg px-4 py-3 text-white outline-none transition-colors text-sm"
                    placeholder="Enter parent's full name"
                  />
                  {errors.parent_name && (
                    <span className="text-red-400 text-xs mt-1">{errors.parent_name.message}</span>
                  )}
                </div>

                {/* Player Age */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-white/70">Age</label>
                  <input
                    type="number"
                    {...register('age', { valueAsNumber: true })}
                    className="bg-white/5 border border-white/10 focus:border-[#F47A20] rounded-lg px-4 py-3 text-white outline-none transition-colors text-sm"
                    placeholder="E.g. 12"
                  />
                  {errors.age && (
                    <span className="text-red-400 text-xs mt-1">{errors.age.message}</span>
                  )}
                </div>

                {/* Phone Number */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-white/70">Phone Number</label>
                  <input
                    type="tel"
                    {...register('phone')}
                    className="bg-white/5 border border-white/10 focus:border-[#F47A20] rounded-lg px-4 py-3 text-white outline-none transition-colors text-sm"
                    placeholder="E.g. +91 9988776655"
                  />
                  {errors.phone && (
                    <span className="text-red-400 text-xs mt-1">{errors.phone.message}</span>
                  )}
                </div>

                {/* Email Address */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-white/70">Email Address</label>
                  <input
                    type="email"
                    {...register('email')}
                    className="bg-white/5 border border-white/10 focus:border-[#F47A20] rounded-lg px-4 py-3 text-white outline-none transition-colors text-sm"
                    placeholder="E.g. player@example.com"
                  />
                  {errors.email && (
                    <span className="text-red-400 text-xs mt-1">{errors.email.message}</span>
                  )}
                </div>

                {/* City */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-white/70">City</label>
                  <input
                    type="text"
                    {...register('city')}
                    className="bg-white/5 border border-white/10 focus:border-[#F47A20] rounded-lg px-4 py-3 text-white outline-none transition-colors text-sm"
                    placeholder="E.g. Bangalore"
                  />
                  {errors.city && (
                    <span className="text-red-400 text-xs mt-1">{errors.city.message}</span>
                  )}
                </div>

                {/* Experience Level */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-white/70">Experience Level</label>
                  <select
                    {...register('experience')}
                    className="bg-[#162F56] border border-white/10 focus:border-[#F47A20] rounded-lg px-4 py-3 text-white outline-none transition-colors text-sm"
                  >
                    <option value="" disabled>Select skill level</option>
                    <option value="Beginner">Beginner (Never played / Basic dribbles)</option>
                    <option value="Intermediate">Intermediate (Played school matches)</option>
                    <option value="Advanced">Advanced (Club league level player)</option>
                  </select>
                  {errors.experience && (
                    <span className="text-red-400 text-xs mt-1">{errors.experience.message}</span>
                  )}
                </div>

                {/* Preferred Batch */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-white/70">Preferred Batch</label>
                  <select
                    {...register('preferred_batch')}
                    className="bg-[#162F56] border border-white/10 focus:border-[#F47A20] rounded-lg px-4 py-3 text-white outline-none transition-colors text-sm"
                  >
                    <option value="5:00 PM - 7:00 PM">5:00 PM - 7:00 PM Batch (Only time available)</option>
                  </select>
                  {errors.preferred_batch && (
                    <span className="text-red-400 text-xs mt-1">{errors.preferred_batch.message}</span>
                  )}
                </div>

                {/* Preferred Day */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-white/70">Preferred Days</label>
                  <select
                    {...register('preferred_day')}
                    className="bg-[#162F56] border border-white/10 focus:border-[#F47A20] rounded-lg px-4 py-3 text-white outline-none transition-colors text-sm"
                  >
                    <option value="Monday, Wednesday, Friday">Monday, Wednesday, Friday</option>
                  </select>
                  {errors.preferred_day && (
                    <span className="text-red-400 text-xs mt-1">{errors.preferred_day.message}</span>
                  )}
                </div>

                {/* Message */}
                <div className="flex flex-col gap-2 md:col-span-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-white/70">Message (Optional)</label>
                  <textarea
                    {...register('message')}
                    rows={3}
                    className="bg-white/5 border border-white/10 focus:border-[#F47A20] rounded-lg px-4 py-3 text-white outline-none transition-colors text-sm resize-none"
                    placeholder="Any health notes, positions, or specific queries..."
                  />
                </div>

                {/* Agreement Checkbox */}
                <div className="md:col-span-2 flex items-start gap-3 mt-2">
                  <input
                    type="checkbox"
                    id="agree"
                    {...register('agree')}
                    className="w-4.5 h-4.5 accent-[#F47A20] mt-0.5 rounded cursor-pointer"
                  />
                  <label htmlFor="agree" className="text-xs text-white/60 leading-relaxed cursor-pointer select-none">
                    I agree to be contacted via Email/Phone/SMS regarding academy batch timings and trial availability.
                  </label>
                </div>
                {errors.agree && (
                  <span className="col-span-1 md:col-span-2 text-red-400 text-xs mt-[-10px]">{errors.agree.message}</span>
                )}

                {/* Submit button with Hoop swish animation */}
                <div className="md:col-span-2 mt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full relative h-16 bg-[#F47A20] hover:bg-[#ff862e] disabled:bg-[#F47A20]/80 text-white font-bebas text-2xl tracking-wider rounded-lg transition-all duration-300 shadow-xl overflow-hidden cursor-pointer"
                  >
                    <AnimatePresence mode="wait">
                      {!isSubmitAnimating ? (
                        <motion.span
                          key="static"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center justify-center gap-2"
                        >
                          SUBMIT REGISTRATION
                        </motion.span>
                      ) : (
                        <motion.div
                          key="animating"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="absolute inset-0 flex items-center justify-between px-10"
                        >
                          {/* Dribbling ball rolling right */}
                          <motion.div 
                            className="w-8 h-8 rounded-full bg-white border border-[#0E2240] relative overflow-hidden"
                            initial={{ x: -20, rotate: 0 }}
                            animate={{ 
                              x: 420, 
                              rotate: 720,
                              y: [0, -15, 0, -10, 0, 5, 20] // Bouncing down into hoop
                            }}
                            transition={{ 
                              duration: 1.5,
                              ease: 'easeInOut'
                            }}
                          >
                            <div className="absolute w-full h-[1px] bg-[#0E2240] top-1/2 left-0 -translate-y-1/2" />
                            <div className="absolute h-full w-[1px] bg-[#0E2240] left-1/2 top-0 -translate-x-1/2" />
                          </motion.div>

                          {/* Hoop on the right side */}
                          <div className="w-12 h-12 flex flex-col items-center relative z-10 translate-x-[40px]">
                            {/* Rim */}
                            <div className="w-8 h-2 border-2 border-white rounded-full bg-transparent relative z-20" />
                            {/* Net */}
                            <div 
                              className="w-6 h-8 border-x border-b border-dashed border-white/60 rounded-b-md mt-[-2px] origin-top" 
                              style={{
                                backgroundImage: 'linear-gradient(45deg, transparent 40%, rgba(255,255,255,0.2) 50%, transparent 60%)'
                              }}
                            />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </button>
                </div>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex flex-col items-center justify-center text-center py-12"
              >
                <div className="w-20 h-20 rounded-full bg-[#F47A20]/15 flex items-center justify-center mb-6 border-2 border-[#F47A20]/30 shadow-md">
                  <CheckCircle2 className="w-12 h-12 text-[#F47A20]" />
                </div>
                <h3 className="font-bebas text-4xl md:text-5xl text-white tracking-wide">
                  REGISTRATION COMPLETED!
                </h3>
                <p className="text-white/70 max-w-md text-sm md:text-base mt-4 font-sans leading-relaxed">
                  Your free trial batch request has been saved. Our coordinator will contact you via Phone/Email within the next 24 hours to allocate your trial slot.
                </p>
                <button
                  onClick={() => setIsSuccess(false)}
                  className="mt-8 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bebas text-lg px-8 py-3 rounded-md transition-all duration-300"
                >
                  SUBMIT ANOTHER FORM
                </button>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

      </div>
    </section>
  );
}
