import Image from 'next/image';

export default function WhyChooseUs() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2">
            <span className="text-emerald-600 font-bold uppercase tracking-widest text-xs mb-4 block">Notre engagement</span>
            <h2 className="text-4xl md:text-5xl font-serif text-stone-800 mb-8 leading-tight">Pourquoi nous choisir ?</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="space-y-3">
                <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-700">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <h4 className="font-bold text-stone-800">Équilibre Durable</h4>
                <p className="text-stone-500 text-sm leading-relaxed">Rééquilibrage alimentaire naturel, sans frustration ni régimes restrictifs.</p>
              </div>
              <div className="space-y-3">
                <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-700">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                </div>
                <h4 className="font-bold text-stone-800">Énergie & Vitalité</h4>
                <p className="text-stone-500 text-sm leading-relaxed">Des plats conçus pour nourrir votre corps et booster votre productivité.</p>
              </div>
              <div className="space-y-3">
                <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-700">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                </div>
                <h4 className="font-bold text-stone-800">Coaching Certifié</h4>
                <p className="text-stone-500 text-sm leading-relaxed">Suivi personnalisé par nos experts en nutrition sportive pour des résultats durables.</p>
              </div>
              <div className="space-y-3">
                <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-700">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                </div>
                <h4 className="font-bold text-stone-800">Livraison Flexible</h4>
                <p className="text-stone-500 text-sm leading-relaxed">À votre domicile ou bureau, emportez vos plats partout avec vous.</p>
              </div>
            </div>
          </div>
          <div className="lg:w-1/2 relative">
            <div className="absolute -inset-4 bg-emerald-100/50 rounded-[3rem] -z-10 blur-2xl"></div>
            <Image 
              src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=800"
              alt="Healthy Meal"
              fill
              className="rounded-[2.5rem] shadow-2xl w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
