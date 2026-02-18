import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

// GET /api/programs — fetch all programs ordered by newest first
export async function GET() {
  const { data, error } = await supabaseAdmin
    .from('programs')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data ?? []);
}

// POST /api/programs — create a new program
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, sub_category, price, description, full_description, image, duration, schedule } = body;

    if (!name || !sub_category || !price || !description || !image) {
      return NextResponse.json({ error: 'Champs obligatoires manquants.' }, { status: 400 });
    }

    const { data, error } = await supabaseAdmin
      .from('programs')
      .insert([{
        name,
        slug: body.slug,
        sub_category,
        price: Number(price),
        description,
        full_description: full_description || '',
        image,
        duration: Number(duration) || 7,
        schedule: schedule || [],
        ingredients: body.ingredients || [],
        cal: Number(body.cal) || 0,
        protein: body.protein || '',
        fiber: body.fiber || '',
        carbs: body.carbs || '',
        fats: body.fats || '',
        features: body.features || [],
      }])
      .select()
      .single();

    if (error) {
      console.error('Supabase Error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(data, { status: 201 });
  } catch (err) {
    console.error('Unexpected Error:', err);
    return NextResponse.json({ error: 'Erreur inattendue.' }, { status: 500 });
  }
}
