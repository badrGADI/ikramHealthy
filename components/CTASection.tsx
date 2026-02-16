import Link from 'next/link';

export default function CTASection() {
  return (
    <section className="py-24 bg-stone-900 text-white text-center relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-600/10 rounded-full blur-[100px] -mr-48 -mt-48"></div>
      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <h2 className="text-4xl md:text-6xl font-serif mb-8 leading-tight">
          Prêt à commencer <br />votre transformation ?
        </h2>
        <div className="flex flex-wrap justify-center gap-6">
          <Link 
            href="/programs" 
            className="bg-emerald-600 px-12 py-5 rounded-full font-bold shadow-2xl hover:bg-emerald-500 transition-all transform hover:scale-105 active:scale-95"
          >
            Voir les Programmes
          </Link>
          <Link 
            href="/shop" 
            className="bg-white text-stone-900 px-12 py-5 rounded-full font-bold hover:bg-stone-100 transition-all shadow-xl active:scale-95"
          >
            Catalogue Boutique
          </Link>
        </div>
      </div>
    </section>
  );
}
