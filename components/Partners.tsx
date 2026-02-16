'use client';

import { PARTNERS } from '@/lib/constants';

export default function Partners() {
  return (
    <section className="py-12 bg-stone-50 border-y border-stone-100 overflow-hidden">
       <div className="flex space-x-20 animate-marquee whitespace-nowrap opacity-50 grayscale hover:grayscale-0 transition-all duration-700 items-center">
          {/* Duplicating the array to create an infinite loop effect if needed, though simple map here */}
          {[...PARTNERS, ...PARTNERS].map((p, i) => (
            <span key={i} className="text-xl font-serif font-bold text-stone-800 uppercase tracking-[0.3em] mx-10 shrink-0">
              {p}
            </span>
          ))}
       </div>
    </section>
  );
}
