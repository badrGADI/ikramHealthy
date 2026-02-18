'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PRODUCTS } from '@/lib/constants';
import { Category } from '@/lib/types';

interface DbProgram {
  id: string;
  slug: string;
  name: string;
  sub_category: string;
  price: number;
  description: string;
  image: string;
  duration: number;
}

export default function ProgramsPage() {
  // 1. Define unified interface
  interface ProgramDisplay {
    id: string;
    slug: string;
    name: string;
    subCategory: string; // Unified key
    price: number;
    description: string;
    image: string;
    duration: number;
    isDynamic: boolean;
    features: string[]; // [NEW]
  }

  const [dbPrograms, setDbPrograms] = useState<DbProgram[]>([]);

  useEffect(() => {
    fetch('/api/programs')
      .then(r => r.json())
      .then(data => { if (Array.isArray(data)) setDbPrograms(data); })
      .catch(() => {});
  }, []);

  const defaultFeatures = [
    'Barquettes micro-ondables',
    'Zéro produit congelé',
    'Option végétarienne incluse',
  ];

  // 2. Normalize and merge
  const allPrograms: ProgramDisplay[] = [
    // Dynamic Programs
    ...dbPrograms.map(p => ({
      id: p.id,
      slug: p.slug || p.id,
      name: p.name,
      subCategory: p.sub_category,
      price: p.price,
      description: p.description,
      image: p.image,
      duration: p.duration,
      isDynamic: true,
      features: (p as any).features && (p as any).features.length > 0 ? (p as any).features : defaultFeatures,
    })),
    // Static Programs
    ...PRODUCTS.filter(p => p.category === Category.PROGRAM).map(p => ({
      id: p.id,
      slug: p.slug || p.id,
      name: p.name,
      subCategory: p.subCategory,
      price: p.price,
      description: p.description + " Menu complet avec petit-déjeuner, déjeuner, collation et dîner.",
      image: p.image,
      duration: 7,
      isDynamic: false,
      features: defaultFeatures,
    }))
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      <div className="text-center mb-20 animate-in fade-in slide-in-from-top-4 duration-500">
        <h1 className="text-5xl md:text-6xl font-serif text-stone-800 mb-6">Programmes de Repas</h1>
        <p className="text-stone-500 max-w-2xl mx-auto text-lg">
          Cuisinés frais chaque matin à Agadir et livrés dans des contenants prêts à consommer.
        </p>
        <div className="h-1.5 w-24 bg-emerald-600 mx-auto mt-8 rounded-full shadow-sm shadow-emerald-600/20" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {allPrograms.map(p => (
          <div key={p.id} className="bg-white rounded-[2.5rem] shadow-xl overflow-hidden border border-stone-50 group flex flex-col hover:shadow-2xl transition-all duration-500">
            {/* Image Section */}
            <div className="relative h-72">
              <Image src={p.image} alt={p.name} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-8 left-8 text-white">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-400 mb-2">{p.subCategory}</p>
                <h3 className="text-3xl font-serif">{p.name}</h3>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-10 flex-grow flex flex-col">
              <div className="flex justify-between items-center mb-8">
                <p className="text-stone-400 text-sm uppercase font-bold tracking-widest">Abonnement</p>
                <p className="text-4xl font-bold text-emerald-700">{p.price} <span className="text-sm font-normal text-stone-400">DH/j</span></p>
              </div>
              
              <p className="text-stone-600 text-sm leading-relaxed mb-8 italic flex-grow">
                &ldquo;{p.description}&rdquo;
              </p>
              
              <div className="flex items-center gap-2 text-stone-400 text-xs mb-10">
                <span>📅</span>
                <span>{p.duration} jours de programme</span>
              </div>

              <ul className="space-y-4 mb-10 border-t border-stone-50 pt-8">
                {p.features.map((f, i) => (
                  <li key={i} className="flex items-center text-sm font-bold text-stone-800">
                    <svg className="w-5 h-5 text-emerald-500 mr-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/>
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>

              <Link
                href={`/programs/${p.slug}`}
                className="w-full bg-stone-900 text-white py-5 rounded-2xl font-bold hover:bg-emerald-600 transition-all shadow-lg shadow-stone-900/10 active:scale-95 block text-center"
              >
                {p.isDynamic ? 'Voir le Programme' : 'Voir les Détails'}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
