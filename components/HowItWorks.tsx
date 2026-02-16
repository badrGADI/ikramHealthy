export default function HowItWorks() {
  return (
    <section className="py-32 bg-emerald-900 text-white relative overflow-hidden">
      <div className="absolute top-1/4 -left-20 w-64 h-64 bg-emerald-600/20 rounded-full blur-3xl opacity-60"></div>
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl opacity-60"></div>
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-24">
          <span className="text-emerald-400 font-bold uppercase tracking-[0.3em] text-[10px] mb-4 block">Votre Parcours Bien-être</span>
          <h2 className="text-4xl md:text-5xl font-serif text-white mb-6">Comment ça marche ?</h2>
          <div className="h-1 w-16 bg-emerald-500 mx-auto rounded-full shadow-lg shadow-emerald-500/20"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative">
          <div className="hidden md:block absolute top-1/3 left-[15%] right-[15%] h-px border-t-2 border-dashed border-emerald-800 -z-10"></div>
          
          <div className="group text-center space-y-8">
            <div className="relative mx-auto w-32 h-32 flex items-center justify-center bg-white/5 backdrop-blur-sm rounded-[2.5rem] shadow-xl border border-white/10 group-hover:bg-white/10 group-hover:border-emerald-400/50 transition-all duration-500 group-hover:-translate-y-2">
              <div className="absolute -top-3 -right-3 w-10 h-10 bg-emerald-500 text-white rounded-full flex items-center justify-center font-bold text-sm shadow-lg border-4 border-emerald-900">1</div>
              <svg className="w-14 h-14 text-emerald-400 group-hover:scale-110 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                <circle cx="12" cy="14" r="1.5" strokeWidth="2" />
              </svg>
            </div>
            <div className="px-4">
              <h4 className="text-xl font-serif font-bold text-white mb-3">Choisissez</h4>
              <p className="text-emerald-100/70 text-sm leading-relaxed">Explorez notre shop ou sélectionnez un programme adapté à vos besoins.</p>
            </div>
          </div>

          <div className="group text-center space-y-8">
            <div className="relative mx-auto w-32 h-32 flex items-center justify-center bg-white/5 backdrop-blur-sm rounded-[2.5rem] shadow-xl border border-white/10 group-hover:bg-white/10 group-hover:border-emerald-400/50 transition-all duration-500 group-hover:-translate-y-2">
              <div className="absolute -top-3 -right-3 w-10 h-10 bg-emerald-500 text-white rounded-full flex items-center justify-center font-bold text-sm shadow-lg border-4 border-emerald-900">2</div>
              <svg className="w-14 h-14 text-emerald-400 group-hover:scale-110 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div className="px-4">
              <h4 className="text-xl font-serif font-bold text-white mb-3">Cuisiné Frais</h4>
              <p className="text-emerald-100/70 text-sm leading-relaxed">Nos chefs préparent vos plats chaque matin avec passion et fraîcheur.</p>
            </div>
          </div>

          <div className="group text-center space-y-8">
            <div className="relative mx-auto w-32 h-32 flex items-center justify-center bg-white/5 backdrop-blur-sm rounded-[2.5rem] shadow-xl border border-white/10 group-hover:bg-white/10 group-hover:border-emerald-400/50 transition-all duration-500 group-hover:-translate-y-2">
              <div className="absolute -top-3 -right-3 w-10 h-10 bg-emerald-500 text-white rounded-full flex items-center justify-center font-bold text-sm shadow-lg border-4 border-emerald-900">3</div>
              <svg className="w-14 h-14 text-emerald-400 group-hover:scale-110 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div className="px-4">
              <h4 className="text-xl font-serif font-bold text-white mb-3">Livré Express</h4>
              <p className="text-emerald-100/70 text-sm leading-relaxed">Recevez vos produits rapidement dans des emballages sécurisés.</p>
            </div>
          </div>

          <div className="group text-center space-y-8">
            <div className="relative mx-auto w-32 h-32 flex items-center justify-center bg-white/5 backdrop-blur-sm rounded-[2.5rem] shadow-xl border border-white/10 group-hover:bg-white/10 group-hover:border-emerald-400/50 transition-all duration-500 group-hover:-translate-y-2">
              <div className="absolute -top-3 -right-3 w-10 h-10 bg-emerald-500 text-white rounded-full flex items-center justify-center font-bold text-sm shadow-lg border-4 border-emerald-900">4</div>
              <svg className="w-14 h-14 text-emerald-400 group-hover:scale-110 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="px-4">
              <h4 className="text-xl font-serif font-bold text-white mb-3">Dégustez</h4>
              <p className="text-emerald-100/70 text-sm leading-relaxed">Savourez des repas sains et savoureux, sans aucun compromis.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
