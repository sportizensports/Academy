import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://kcmogkokjlhaawzuckxc.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Fallback to anonymous key supplied by user if env variable is not loaded yet in some contexts
const finalAnonKey = supabaseAnonKey || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtjbW9na29ramxoYWF3enVja3hjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQzMDI2ODYsImV4cCI6MjA5OTg3ODY4Nn0.sQDWuq23E14igvCCMejmkOPLwvXns3hqV-tKhwgStYc';

export const supabase = createClient(supabaseUrl, finalAnonKey);

export interface TrialRegistration {
  player_name: string;
  parent_name: string;
  age: number;
  phone: string;
  email: string;
  city: string;
  experience: string;
  preferred_batch: string;
  preferred_day: string;
  message?: string;
  status?: string;
}

export async function registerTrial(data: TrialRegistration) {
  try {
    const { data: result, error } = await supabase
      .from('trial_registrations')
      .insert([
        {
          player_name: data.player_name,
          parent_name: data.parent_name,
          age: data.age,
          phone: data.phone,
          email: data.email,
          city: data.city,
          experience: data.experience,
          preferred_batch: data.preferred_batch,
          preferred_day: data.preferred_day,
          message: data.message || '',
          status: 'Pending'
        }
      ])
      .select();

    if (error) throw error;
    return { success: true, data: result };
  } catch (error: any) {
    console.error('Supabase registration error:', error);
    // If the table doesn't exist yet, we can store in LocalStorage as fallback so user experience doesn't break
    if (typeof window !== 'undefined') {
      const localRegs = JSON.parse(localStorage.getItem('sportizen_registrations') || '[]');
      const newReg = { ...data, id: Math.random().toString(36).substr(2, 9), created_at: new Date().toISOString(), status: 'Pending' };
      localRegs.push(newReg);
      localStorage.setItem('sportizen_registrations', JSON.stringify(localRegs));
      console.log('Saved registration to LocalStorage fallback.');
      return { success: true, data: [newReg], fallback: true, error: error.message };
    }
    return { success: false, error: error.message || 'Unknown error occurred' };
  }
}
