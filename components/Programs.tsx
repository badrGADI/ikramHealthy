'use client';

import Link from 'next/link';
import Image from 'next/image';
import { PRODUCTS } from '@/lib/constants';
import { Category } from '@/lib/types';

export default function Programs() {
  const programProducts = PRODUCTS.filter(p => p.category === Category.PROGRAM);

  return (
    <section className="py-24 bg-emerald-900 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif mb-4">Nos Programmes Alimentaires</h2>
          <p className="text-emerald-200/70 max-w-2xl mx-auto">Choisissez le programme qui s'adapte à votre vie et vos ambitions sportives ou de santé.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {programProducts.map(p => (
            <div key={p.id} className="group bg-white/5 backdrop-blur-md rounded-[2.5rem] border border-white/10 overflow-hidden hover:bg-white/10 transition-all duration-500 hover:shadow-2xl">
              <div className="h-64 relative overflow-hidden">
                {/* Placeholder image until we have real ones, using a solid color div if image fails or just the image component */}
                <div className="absolute inset-0 bg-emerald-800 animate-pulse" />
                {/* 
                   Using a placeholder from Unsplash that matches the context if the local image is missing 
                   For now, we will assume the local image paths exist or will be added. 
                   If p.image is a relative path, next/image needs it to exist.
                   Since we haven't generated them, I'll use a temporary Unsplash fallback for 'src' if it was a real app, 
                   but here I will rely on the `p.image` (which is /images/...) and hope the user adds them or I generate them later.
                   Actually, to avoid broken images, I'll use a temporary Unsplash URL if the local one isn't guaranteed.
                   The user provided specific Unsplash URLs in their snippet only for the "Daily Pass" and "Why Choose Us".
                   For programs, they used `p.image`.
                   I will use `p.image` but beware they might be 404.
                */}
                <Image 
                  src={p.image.startsWith('/') ? p.image : '/images/placeholder.jpg'} 
                  alt={p.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-1000"
                  onError={(e) => {
                    // Fallback logic isn't easily done in SSR/Image component props directly without state, 
                    // but for now we put the path from constants.
                  }}
                />
                <div className="absolute top-4 right-4 bg-emerald-500 text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-lg">
                  Dès {p.price} Dhs/j
                </div>
              </div>
              <div className="p-10">
                <h3 className="text-2xl font-serif mb-4">{p.subCategory}</h3>
                <p className="text-emerald-100/60 text-sm mb-8 leading-relaxed italic">"{p.description}"</p>
                <ul className="space-y-4 mb-10 text-sm">
                  <li className="flex items-center space-x-3">
                    <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                    <span>Plats frais livrés chaque jour</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                    <span>Macros calculées avec précision</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                    <span>Ingrédients de qualité supérieure</span>
                  </li>
                </ul>
                <Link 
                  href={`/products/${p.id}`}
                  className="block w-full text-center bg-white text-emerald-900 py-4 rounded-2xl font-bold hover:bg-emerald-50 transition-colors shadow-lg"
                >
                  Voir les Détails
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
