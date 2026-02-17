import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-700">
      {/* Header Section */}
      <section className="relative py-32 bg-stone-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
          <span className="text-emerald-600 font-bold uppercase tracking-[0.3em] text-[10px] mb-4 block">Notre Histoire</span>
          <h1 className="text-5xl md:text-7xl font-serif text-stone-800 mb-8">
            Plus qu'une marque, <br /><span className="italic text-emerald-600">un mode de vie.</span>
          </h1>
          <p className="text-stone-500 max-w-2xl mx-auto text-lg leading-relaxed">
            Né d'une passion pour la santé et la gastronomie marocaine, HealthyBite accompagne des milliers de personnes vers un équilibre durable sans sacrifier le goût.
          </p>
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-100 rounded-full blur-[120px] -mr-48 -mt-48 opacity-40"></div>
      </section>

      {/* Our Mission */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center gap-20">
          <div className="w-full md:w-1/2">
            <div className="relative w-full h-[500px]">
              <Image 
                src="/images/about-mission.jpg"
                alt="Healthy Food Mission"
                fill
                className="rounded-[3rem] shadow-2xl object-cover"
              />
            </div>
          </div>
          <div className="w-full md:w-1/2 space-y-8">
            <h2 className="text-4xl font-serif text-stone-800">Notre Mission</h2>
            <p className="text-stone-600 leading-relaxed text-lg italic">
              "Nous croyons que la nourriture est le premier médicament. Notre mission est de rendre l'alimentation saine accessible, gourmande et simple au quotidien."
            </p>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <p className="text-3xl font-bold text-emerald-600 mb-1">100%</p>
                <p className="text-xs font-bold uppercase text-stone-400 tracking-widest">Naturel</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-emerald-600 mb-1">0%</p>
                <p className="text-xs font-bold uppercase text-stone-400 tracking-widest">Sucre ajouté</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Services Section */}
      <section className="py-24 bg-stone-900 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-20">
            <span className="text-emerald-400 font-bold uppercase tracking-[0.3em] text-[10px] mb-4 block">Services Premium</span>
            <h2 className="text-4xl md:text-5xl font-serif">Comment nous vous aidons</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="p-10 bg-white/5 rounded-[2.5rem] border border-white/10 hover:bg-white/10 transition-all group">
              <div className="w-16 h-16 bg-emerald-600 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 16v2a2 2 0 002 2h2a2 2 0 002-2v-2M9 9h.01M15 9h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <h3 className="text-2xl font-serif mb-4">Plans de Repas</h3>
              <p className="text-emerald-100/60 leading-relaxed text-sm">Des repas personnalisés livrés chaque jour, conçus par des chefs et validés par des nutritionnistes.</p>
            </div>
            <div className="p-10 bg-white/5 rounded-[2.5rem] border border-white/10 hover:bg-white/10 transition-all group">
              <div className="w-16 h-16 bg-emerald-600 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.341A8.001 8.001 0 0012 21a8.001 8.001 0 00-7.428-5.659" /></svg>
              </div>
              <h3 className="text-2xl font-serif mb-4">Jus & Detox</h3>
              <p className="text-emerald-100/60 leading-relaxed text-sm">Cures de jus pressés à froid (cold-pressed) pour purifier votre corps et booster votre vitalité.</p>
            </div>
            <div className="p-10 bg-white/5 rounded-[2.5rem] border border-white/10 hover:bg-white/10 transition-all group">
              <div className="w-16 h-16 bg-emerald-600 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
              </div>
              <h3 className="text-2xl font-serif mb-4">Corporate & Event</h3>
              <p className="text-emerald-100/60 leading-relaxed text-sm">Services traiteur healthy pour vos événements professionnels et tea-breaks d'entreprise.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-serif text-stone-800 mb-16">Nos Valeurs Fondamentales</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <h4 className="font-bold text-stone-800 text-lg uppercase tracking-widest">Intégrité</h4>
              <p className="text-sm text-stone-500">Transparence totale sur nos ingrédients et macros.</p>
            </div>
            <div className="space-y-4">
              <h4 className="font-bold text-stone-800 text-lg uppercase tracking-widest">Qualité</h4>
              <p className="text-sm text-stone-500">Produits frais du terroir marocain sélectionnés à la main.</p>
            </div>
            <div className="space-y-4">
              <h4 className="font-bold text-stone-800 text-lg uppercase tracking-widest">Innovation</h4>
              <p className="text-sm text-stone-500">Réinventer le plaisir sucré sans les méfaits.</p>
            </div>
            <div className="space-y-4">
              <h4 className="font-bold text-stone-800 text-lg uppercase tracking-widest">Passion</h4>
              <p className="text-sm text-stone-500">Un amour profond pour l'art de bien manger.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
