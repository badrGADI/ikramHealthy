'use client';

import { TESTIMONIALS } from '@/lib/constants';

export default function Testimonials() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-serif text-stone-800 mb-16">Vos retours, notre motivation</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map(t => (
            <div key={t.id} className="p-10 bg-stone-50 rounded-[2.5rem] border border-stone-100 text-left hover:shadow-xl transition-all duration-500">
              <div className="flex text-emerald-500 mb-6">
                {[...Array(t.stars)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                ))}
              </div>
              <p className="text-stone-600 italic mb-10 leading-relaxed">"{t.text}"</p>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-emerald-600 rounded-2xl flex items-center justify-center font-bold text-white shadow-md">{t.name.charAt(0)}</div>
                <div>
                  <p className="font-bold text-stone-800">{t.name}</p>
                  <p className="text-emerald-600 text-[10px] font-bold uppercase tracking-widest">{t.city}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
