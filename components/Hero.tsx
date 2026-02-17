'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Hero() {
  return (
    <div className="relative h-[85vh] flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image 
          src="/images/hero-bg.jpg"
          alt="Healthy Food Hero"
          fill
          className="object-cover brightness-[0.45]"
          priority
        />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 text-white">
        <div className="max-w-2xl">
          <span className="bg-emerald-600/90 backdrop-blur-sm text-[10px] font-bold uppercase tracking-[0.2em] px-4 py-1.5 rounded-full mb-8 inline-block shadow-lg">
            Premium Healthy Lifestyle Maroc
          </span>
          <h1 className="text-5xl md:text-8xl font-serif mb-8 leading-[1.1]">
            Vivre mieux <br /><span className="text-emerald-400 italic">commence ici.</span>
          </h1>
          <p className="text-lg md:text-xl mb-12 text-stone-200 leading-relaxed font-light">
            Snacks artisanaux, jus frais pressés à froid et programmes nutritionnels sur-mesure livrés à Rabat et partout au Maroc.
          </p>
          <div className="flex flex-wrap gap-5">
            <Link 
              href="/programs"
              className="bg-emerald-600 hover:bg-emerald-500 text-white px-10 py-5 rounded-full font-bold transition-all shadow-xl transform hover:-translate-y-1 active:scale-95"
            >
              Nos Programmes
            </Link>
            <Link 
              href="/shop"
              className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/40 px-10 py-5 rounded-full font-bold transition-all active:scale-95"
            >
              Catalogue Boutique
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
