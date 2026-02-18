import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

// GET /api/products — fetch all DB products
export async function GET() {
  const { data, error } = await supabaseAdmin
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data);
}

// POST /api/products — create a new product (admin only)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      name, category, sub_category, price,
      description, full_description, image,
      cal, protein, fiber, carbs, fats, ingredients,
    } = body;

    if (!name || !category || !sub_category || !price || !description || !image) {
      return NextResponse.json({ error: 'Champs obligatoires manquants.' }, { status: 400 });
    }

    const { data, error } = await supabaseAdmin
      .from('products')
      .insert([{
        name,
        slug: body.slug,
        category,
        sub_category,
        price: parseFloat(price),
        description, full_description, image,
        cal: parseInt(cal) || 0,
        protein: protein || '0g',
        fiber: fiber || '0g',
        carbs: carbs || '0g',
        fats: fats || '0g',
        ingredients: ingredients || [],
      }])
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(data, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: 'Erreur inattendue.' }, { status: 500 });
  }
}
