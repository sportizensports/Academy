import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

export async function POST(request: Request) {
  try {
    const { isNewVisit, monthKey } = await request.json();

    if (!monthKey) {
      return NextResponse.json({ error: 'Missing monthKey' }, { status: 400 });
    }

    // 1. Fetch current record for this month
    const { data: record, error: fetchError } = await supabase
      .from('monthly_visitors_count')
      .select('visit_count')
      .eq('month_key', monthKey)
      .maybeSingle();

    if (fetchError) {
      // If table doesn't exist or other DB errors occur, throw and trigger fallback
      throw fetchError;
    }

    if (isNewVisit) {
      if (!record) {
        // First visit for this month - Create row starting at 1 (or baseline value)
        const { data: newRecord, error: insertError } = await supabase
          .from('monthly_visitors_count')
          .insert([{ month_key: monthKey, visit_count: 1 }])
          .select('visit_count')
          .single();

        if (insertError) throw insertError;
        return NextResponse.json({ count: newRecord.visit_count });
      } else {
        // Increment the existing monthly count
        const newCount = record.visit_count + 1;
        const { data: updatedRecord, error: updateError } = await supabase
          .from('monthly_visitors_count')
          .update({ visit_count: newCount })
          .eq('month_key', monthKey)
          .select('visit_count')
          .single();

        if (updateError) throw updateError;
        return NextResponse.json({ count: updatedRecord.visit_count });
      }
    } else {
      // Returning user for the month - Just fetch and display current count
      const count = record ? record.visit_count : 0;
      return NextResponse.json({ count });
    }
  } catch (error: any) {
    console.warn('Supabase visitor count failed, using offline fallback. Details:', error.message);
    
    // Graceful fallback: Use a simulated count so the site works even if the table isn't created yet.
    // Base count is 184 + mock increments based on date/hour
    const mockBase = 184;
    const currentHour = new Date().getHours();
    const minutes = new Date().getMinutes();
    const simulatedCount = mockBase + (currentHour * 3) + Math.floor(minutes / 5);
    
    return NextResponse.json({ 
      count: simulatedCount, 
      fallback: true,
      error: error.message 
    });
  }
}
