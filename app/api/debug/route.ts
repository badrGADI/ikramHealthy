import { supabaseAdmin } from '@/lib/supabase';
import { NextResponse } from 'next/server';

export async function GET() {
  const testSlug = '4a99111e-551d-4faf-9fee-c560bceaa8cd';
  
  const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(testSlug);
  
  let query = supabaseAdmin.from('programs').select('*');
  
  if (isUUID) {
    query = query.eq('id', testSlug);
  } else {
    query = query.eq('slug', testSlug);
  }

  const { data, error } = await query.single();
  
  return NextResponse.json({
    testSlug,
    isUUID,
    data,
    error
  });
}
