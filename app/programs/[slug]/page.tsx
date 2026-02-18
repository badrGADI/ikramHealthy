'use client';

import { useState, useEffect, use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PRODUCTS } from '@/lib/constants';
import { Category } from '@/lib/types';

const MEAL_ICONS: Record<string, string> = {
  'Petit-déjeuner': '🌅',
  'Déjeuner': '☀️',
  'Collation': '🍎',
  'Dîner': '🌙',
};

interface MealItem {
  product_id?: string;
  label: string;
}

interface Meal {
  repas: string;
  items: MealItem[];
}

interface DaySchedule {
  day: number;
  meals: Meal[];
}

interface Program {
  id: string;
  name: string;
  sub_category: string;
  price: number;
  description: string;
  full_description: string;
  image: string;
  duration: number;
  schedule: DaySchedule[];
  ingredients: { name: string; amount: string; benefit: string }[];
  cal: number;
  protein: string;
  fiber: string;
  carbs: string;
  fats: string;
  created_at: string;
}

export default function ProgramDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [program, setProgram] = useState<Program | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeDay, setActiveDay] = useState(1);
  const [activeAccordion, setActiveAccordion] = useState<string | null>(null);

  useEffect(() => {
    // 1. Check static programs
    const staticProgram = PRODUCTS.find(p => p.slug === slug && p.category === Category.PROGRAM);
    
    if (staticProgram) {
      // Map static product to Program interface
      setProgram({
        id: staticProgram.id,
        name: staticProgram.name,
        sub_category: staticProgram.subCategory,
        price: staticProgram.price,
        description: staticProgram.description,
        full_description: staticProgram.fullDescription,
        image: staticProgram.image,
        duration: 7, // Default for static
        schedule: [], // Static programs don't have schedules yet
        ingredients: staticProgram.ingredients,
        cal: staticProgram.nutrition.calories,
        protein: staticProgram.nutrition.protein,
        fiber: staticProgram.nutrition.fiber,
        carbs: staticProgram.nutrition.carbs || '',
        fats: staticProgram.nutrition.fats || '',
        created_at: new Date().toISOString(),
      });
      setLoading(false);
      return;
    }

    // 2. Fetch from API
    fetch(`/api/program-slug/${slug}`)
      .then(r => r.json())
      .then(data => {
        if (data && !data.error) setProgram(data);
      })
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <svg className="animate-spin h-10 w-10 text-emerald-600" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
        </svg>
      </div>
    );
  }

  if (!program) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-5xl">😕</p>
        <p className="text-stone-500 font-bold">Programme introuvable.</p>
        <Link href="/programs" className="text-emerald-600 font-bold hover:underline">← Retour aux programmes</Link>
      </div>
    );
  }

  const daySchedule = program.schedule?.find(d => d.day === activeDay);
  const toggleAccordion = (key: string) => setActiveAccordion(activeAccordion === key ? null : key);

  return (
    <div className="animate-in fade-in duration-700 py-20 max-w-7xl mx-auto px-4 bg-stone-50 min-h-screen">
      <Link
        href="/programs"
        className="mb-12 flex items-center space-x-2 text-stone-400 hover:text-emerald-600 transition-colors font-bold uppercase tracking-widest text-[10px]"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7"/></svg>
        <span>Retour aux programmes</span>
      </Link>

      {/* Main Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 mb-32">
        {/* Left: Image */}
        <div className="relative group self-start sticky top-24">
          <div className="absolute -inset-4 bg-emerald-50 rounded-[4rem] -z-10 group-hover:scale-105 transition-transform duration-700"></div>
          <div className="relative w-full aspect-square rounded-[3.5rem] shadow-2xl overflow-hidden">
            <Image
              src={program.image}
              alt={program.name}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Right: Content */}
        <div className="flex flex-col justify-center">
          <span className="text-emerald-600 font-bold uppercase tracking-[0.3em] text-[10px] mb-4 block">
            Programme / {program.sub_category}
          </span>
          <h1 className="text-5xl md:text-6xl font-serif text-stone-800 mb-8 leading-tight">{program.name}</h1>

          <div className="flex items-center space-x-8 mb-10">
            <p className="text-5xl font-bold text-emerald-800">{program.price} <span className="text-xl font-normal">DH/j</span></p>
            <div className="h-10 w-px bg-stone-200"></div>
            <div className="flex items-center space-x-2 text-emerald-600">
              <span className="text-2xl">📅</span>
              <span className="text-xs font-bold uppercase tracking-widest">{program.duration} Jours</span>
            </div>
          </div>

          <p className="text-stone-500 text-lg leading-relaxed mb-12 italic">
            &ldquo;{program.description}&rdquo;
            {program.full_description && <span className="block mt-4 not-italic text-base">{program.full_description}</span>}
          </p>

          {/* Nutrition Grid */}
          {(program.cal || program.protein) && (
            <div className="grid grid-cols-4 gap-4 mb-12">
              {[
                { label: 'Calories', value: program.cal },
                { label: 'Protéines', value: program.protein },
                { label: 'Fibres', value: program.fiber },
                { label: 'Glucides', value: program.carbs || '-' },
              ].map(({ label, value }) => (
                <div key={label} className="bg-white p-4 rounded-3xl text-center border border-stone-100 shadow-sm">
                  <p className="text-[10px] font-bold text-stone-400 uppercase tracking-tighter mb-1">{label}</p>
                  <p className="text-xl font-bold text-emerald-800">{value}</p>
                </div>
              ))}
            </div>
          )}

          <a
            href={`https://wa.me/212654352802?text=${encodeURIComponent(`Bonjour, je souhaite commander le programme : ${program.name}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-stone-900 text-white py-6 rounded-[2rem] font-bold text-xl hover:bg-emerald-600 transition-all shadow-2xl active:scale-95 flex items-center justify-center space-x-4 mb-10"
          >
            <span className="flex items-center gap-3">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
              Commander sur WhatsApp
            </span>
          </a>

          {/* Accordion: Ingredients */}
          {program.ingredients && program.ingredients.length > 0 && (
            <div className="border-t border-stone-200">
              <button
                onClick={() => toggleAccordion('ingredients')}
                className="w-full py-6 flex items-center justify-between text-left group"
              >
                <div className="flex items-center space-x-4">
                  <span className="bg-emerald-100 text-emerald-700 p-2 rounded-xl group-hover:bg-emerald-200 transition-colors">🌿</span>
                  <span className="font-bold text-stone-800 text-lg">Ingrédients clés</span>
                </div>
                <svg className={`w-5 h-5 text-stone-400 transition-transform ${activeAccordion === 'ingredients' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7"/></svg>
              </button>
              {activeAccordion === 'ingredients' && (
                <div className="pb-8 animate-in slide-in-from-top-2">
                  <div className="grid grid-cols-1 gap-3">
                    {program.ingredients.map((ing, i) => (
                      <div key={i} className="flex justify-between items-center bg-white p-3 rounded-xl border border-stone-100">
                        <span className="font-bold text-stone-700">{ing.name}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-emerald-600 font-bold bg-emerald-50 px-2 py-1 rounded-lg text-xs">{ing.amount}</span>
                          <span className="text-xs text-stone-400">{ing.benefit}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Full Width Schedule Section */}
      {program.schedule && program.schedule.length > 0 && (
        <div className="bg-white rounded-[3rem] p-10 lg:p-16 shadow-xl border border-stone-100">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-stone-800 mb-4">Planning des repas</h2>
            <p className="text-stone-500">Découvrez votre menu jour par jour</p>
          </div>

          {/* Day tabs */}
          <div className="flex gap-2 flex-wrap mb-10 justify-center">
            {program.schedule.map(d => (
              <button
                key={d.day}
                onClick={() => setActiveDay(d.day)}
                className={`px-6 py-3 rounded-2xl text-sm font-bold uppercase tracking-widest transition-all ${
                  activeDay === d.day
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30 scale-105'
                    : 'bg-stone-50 text-stone-400 border border-stone-100 hover:border-emerald-200 hover:text-emerald-600'
                }`}
              >
                J{d.day}
              </button>
            ))}
          </div>

          {/* Meals for active day */}
          {daySchedule ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {daySchedule.meals.map((meal, mi) => (
                <div key={mi} className="bg-stone-50/50 rounded-[2rem] border border-stone-100 p-6 hover:bg-white hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-3xl bg-white p-3 rounded-2xl shadow-sm">{MEAL_ICONS[meal.repas] ?? '🍽️'}</span>
                    <h3 className="font-bold text-stone-800 text-lg">{meal.repas}</h3>
                  </div>
                  <ul className="space-y-3">
                    {meal.items.map((item, ii) => (
                      <li key={ii} className="flex items-start gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0 mt-2" />
                        {item.product_id ? (
                          <Link
                            href={`/products/${item.product_id}`}
                            className="text-sm text-stone-700 font-medium hover:text-emerald-600 transition-colors leading-relaxed border-b border-dashed border-stone-300 hover:border-emerald-400 pb-0.5"
                          >
                            {item.label}
                          </Link>
                        ) : (
                          <span className="text-sm text-stone-600 leading-relaxed">{item.label}</span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-stone-400 text-center">Aucun repas planifié pour ce jour.</p>
          )}
        </div>
      )}
    </div>
  );
}
