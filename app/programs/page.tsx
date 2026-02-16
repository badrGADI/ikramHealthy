'use client';

import { useState } from 'react';
import Link from 'next/link';
import { PRODUCTS } from '@/lib/constants';
import { Category } from '@/lib/types';

export default function ProgramsPage() {
  const programProducts = PRODUCTS.filter(p => p.category === Category.PROGRAM);

  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      <div className="text-center mb-20 animate-in fade-in slide-in-from-top-4 duration-500">
        <h1 className="text-5xl md:text-6xl font-serif text-stone-800 mb-6">Programmes de Repas</h1>
        <p className="text-stone-500 max-w-2xl mx-auto text-lg">
          Cuisinés frais chaque matin à Rabat et livrés dans des contenants prêts à consommer.
        </p>
        <div className="h-1.5 w-24 bg-emerald-600 mx-auto mt-8 rounded-full shadow-sm shadow-emerald-600/20"></div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {programProducts.map(p => (
          <div key={p.id} className="bg-white rounded-[2.5rem] shadow-xl overflow-hidden border border-stone-50 group flex flex-col hover:shadow-2xl transition-all duration-500">
            <div className="relative h-72">
              <div className="w-full h-full bg-gradient-to-br from-emerald-600 to-green-700"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              <div className="absolute bottom-8 left-8 text-white">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-400 mb-2">{p.subCategory}</p>
                <h3 className="text-3xl font-serif">{p.name}</h3>
              </div>
            </div>
            <div className="p-10 flex-grow">
              <div className="flex justify-between items-center mb-8">
                <p className="text-stone-400 text-sm uppercase font-bold tracking-widest">Abonnement</p>
                <p className="text-4xl font-bold text-emerald-700">{p.price} <span className="text-sm font-normal text-stone-400">Dhs/j</span></p>
              </div>
              <p className="text-stone-600 text-sm leading-relaxed mb-10 italic">
                "{p.description} Menu complet avec petit-déjeuner, déjeuner, collation et dîner."
              </p>
              <div className="space-y-4 mb-10 border-t border-stone-50 pt-10">
                <div className="flex items-center text-sm font-bold text-stone-800">
                  <svg className="w-5 h-5 text-emerald-500 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/></svg>
                  Barquettes micro-ondables
                </div>
                <div className="flex items-center text-sm font-bold text-stone-800">
                  <svg className="w-5 h-5 text-emerald-500 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/></svg>
                  Zéro produit congelé
                </div>
                <div className="flex items-center text-sm font-bold text-stone-800">
                  <svg className="w-5 h-5 text-emerald-500 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/></svg>
                  Option végétarienne incluse
                </div>
              </div>
              <Link 
                href={`/products/${p.id}`}
                className="w-full bg-stone-900 text-white py-5 rounded-2xl font-bold hover:bg-emerald-600 transition-all shadow-lg shadow-stone-900/10 active:scale-95 block text-center"
              >
                Voir les Détails
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
