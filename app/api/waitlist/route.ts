import { NextResponse } from 'next/server';
import { createServerSupabase } from '@/lib/supabase/client';
import { sendWaitlistEmail } from '@/lib/resend/client';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = (body?.email || '').toString().trim();

    if (!email) return NextResponse.json({ success: false, error: 'Email required' }, { status: 400 });
    if (!EMAIL_REGEX.test(email)) return NextResponse.json({ success: false, error: 'Invalid email' }, { status: 400 });

    const supabase = createServerSupabase();
    if (!supabase) return NextResponse.json({ success: false, error: 'Supabase not configured' }, { status: 500 });

    const { error } = await supabase.from('waitlist').insert([{ email }]);

    if (error) {
      // Handle duplicates gracefully
      if (error.code === '23505' || String(error.message).toLowerCase().includes('duplicate')) {
        return NextResponse.json({ success: true, message: 'duplicate' });
      }
      return NextResponse.json({ success: false, error: error.message ?? 'Database error' }, { status: 500 });
    }

    // Send confirmation email (best-effort)
    try {
      await sendWaitlistEmail(email);
    } catch (e) {
      console.warn('Failed to send waitlist email', e);
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('API /waitlist error', err);
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
  }
}
