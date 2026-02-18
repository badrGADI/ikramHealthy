import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

// GET /api/programs/[id]
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { data, error } = await supabaseAdmin
    .from('programs')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !data) {
    return NextResponse.json({ error: 'Programme introuvable.' }, { status: 404 });
  }
  return NextResponse.json(data);
}

// PATCH /api/programs/[id]
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();

  const { error } = await supabaseAdmin
    .from('programs')
    .update({
      name: body.name,
      slug: body.slug,
      sub_category: body.sub_category,
      price: body.price,
      description: body.description,
      full_description: body.full_description,
      image: body.image,
      duration: body.duration,
      schedule: body.schedule,
      ingredients: body.ingredients,
      cal: Number(body.cal) || 0,
      protein: body.protein,
      fiber: body.fiber,
      carbs: body.carbs,
      fats: body.fats,
      features: body.features,
    })
    .eq('id', id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ success: true });
}

// DELETE /api/programs/[id]
export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { error } = await supabaseAdmin
    .from('programs')
    .delete()
    .eq('id', id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ success: true });
}
