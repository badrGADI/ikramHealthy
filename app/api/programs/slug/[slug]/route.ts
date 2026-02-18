import { supabaseAdmin } from '@/lib/supabase';
import { NextResponse } from 'next/server';
import fs from 'fs';

export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const logPath = 'C:\\Users\\PC\\Downloads\\ikram-next\\healthybite-nextjs\\debug_api.txt';
  try {
    fs.appendFileSync(logPath, `\n\n[${new Date().toISOString()}] Checking slug: ${slug}\n`);
  } catch (e) {
    // ignore
  }

  let query = supabaseAdmin.from('programs').select('*');
  
  // Check if slug is a UUID
  const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(slug);
  try {
    fs.appendFileSync(logPath, `isUUID: ${isUUID}\n`);
  } catch (e) {}
  
  if (isUUID) {
    query = query.eq('id', slug);
  } else {
    query = query.eq('slug', slug);
  }

  const { data, error } = await query.single();

  try {
    if (error) {
       fs.appendFileSync(logPath, `Error: ${JSON.stringify(error)}\n`);
    } else {
       fs.appendFileSync(logPath, `Found: ${data?.name}\n`);
    }
  } catch (e) {}

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 404 });
  }

  return NextResponse.json(data);
}

