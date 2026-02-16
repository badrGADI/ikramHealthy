import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div>
          <h3 className="text-white text-xl font-serif font-bold mb-6 italic">HealthyBite</h3>
          <p className="text-sm leading-relaxed mb-6">
            Votre destination pour une alimentation saine et équilibrée au Maroc. 
            Snacks artisanaux, jus frais et conseils nutritionnels.
          </p>
          <div className="flex space-x-4">
            <button className="hover:text-emerald-500 transition-colors">Instagram</button>
            <button className="hover:text-emerald-500 transition-colors">TikTok</button>
            <button className="hover:text-emerald-500 transition-colors">Facebook</button>
          </div>
        </div>
        
        <div>
          <h4 className="text-white font-bold mb-6">Navigation</h4>
          <ul className="space-y-4 text-sm">
            <li><Link href="/" className="hover:text-white transition-colors">Accueil</Link></li>
            <li><Link href="/about" className="hover:text-white transition-colors">À Propos</Link></li>
            <li><Link href="/shop" className="hover:text-white transition-colors">Catalogue</Link></li>
            <li><Link href="/blog" className="hover:text-white transition-colors">Articles & Blogs</Link></li>
            <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6">Informations</h4>
          <ul className="space-y-4 text-sm">
            <li><span className="block italic">Livraison: 2 à 5 jours ouvrables</span></li>
            <li><span className="block italic">Sacs congelés pour les produits frais</span></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6">Newsletter</h4>
          <p className="text-sm mb-4">Recevez nos conseils santé et nos nouvelles recettes.</p>
          <div className="flex">
            <input 
              type="email" 
              placeholder="Votre email" 
              className="bg-stone-800 border-none px-4 py-2 w-full text-sm focus:ring-1 focus:ring-emerald-500"
            />
            <button className="bg-emerald-600 text-white px-4 py-2 text-sm hover:bg-emerald-700">OK</button>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 mt-16 pt-8 border-t border-stone-800 text-center text-xs opacity-50">
        <p>© 2026, HealthyBite Morocco. All rights reserved.</p>
      </div>
    </footer>
  );
}
