import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

// GET /api/products/[id]
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { data, error } = await supabaseAdmin
    .from('products')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !data) {
    return NextResponse.json({ error: 'Produit introuvable.' }, { status: 404 });
  }
  return NextResponse.json(data);
}

// PATCH /api/products/[id] — update a product
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();

  const { error } = await supabaseAdmin
    .from('products')
    .update({
      name: body.name,
      slug: body.slug,
      category: body.category,
      sub_category: body.sub_category,
      price: body.price,
      description: body.description,
      full_description: body.full_description,
      image: body.image,
      cal: body.cal,
      protein: body.protein,
      fiber: body.fiber,
      carbs: body.carbs,
      fats: body.fats,
      ingredients: body.ingredients,
      })
    .eq('id', id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ success: true });
}

// DELETE /api/products/[id]
export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { error } = await supabaseAdmin
    .from('products')
    .delete()
    .eq('id', id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ success: true });
}
