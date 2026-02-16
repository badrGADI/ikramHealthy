'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useCart } from '@/context/CartContext';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartCount, openDrawer } = useCart();

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-stone-100 transition-all">
      <div className="bg-emerald-600 text-white text-center py-2.5 text-[11px] font-bold uppercase tracking-[0.15em] px-4 shadow-inner">
        <span>Livraison gratuite à partir de 200 DH partout au Maroc</span>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="flex-shrink-0 flex items-center cursor-pointer group">
            <span className="text-2xl font-serif font-bold text-emerald-800 tracking-tighter group-hover:text-emerald-600 transition-colors">
              HealthyBite
            </span>
            <div className="ml-1 w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 group-hover:scale-125 transition-transform"></div>
          </Link>
          
          <div className="hidden md:flex space-x-10">
            <Link href="/" className="relative transition-all uppercase text-[10px] font-bold tracking-widest pb-1 text-stone-500 hover:text-emerald-400">
              Accueil
            </Link>
            <Link href="/about" className="relative transition-all uppercase text-[10px] font-bold tracking-widest pb-1 text-stone-500 hover:text-emerald-400">
              À Propos
            </Link>
            <Link href="/programs" className="relative transition-all uppercase text-[10px] font-bold tracking-widest pb-1 text-stone-500 hover:text-emerald-400">
              Programmes
            </Link>
            <Link href="/shop" className="relative transition-all uppercase text-[10px] font-bold tracking-widest pb-1 text-stone-500 hover:text-emerald-400">
              Catalogue
            </Link>
            <Link href="/blog" className="relative transition-all uppercase text-[10px] font-bold tracking-widest pb-1 text-stone-500 hover:text-emerald-400">
              Blog
            </Link>
            <Link href="/contact" className="relative transition-all uppercase text-[10px] font-bold tracking-widest pb-1 text-stone-500 hover:text-emerald-400">
              Contact
            </Link>
          </div>

          <div className="flex items-center space-x-5">
            <a href="tel:+212676743143" className="hidden lg:flex items-center space-x-3 text-emerald-800 font-bold text-xs bg-stone-50 px-5 py-2.5 rounded-2xl border border-stone-100 hover:bg-emerald-50 transition-all shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1.01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span>+212 6 76 74 31 43</span>
            </a>
            <button 
              onClick={openDrawer}
              className="relative cursor-pointer hover:scale-110 transition-transform active:scale-95 p-2 bg-stone-50 rounded-xl"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-stone-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-emerald-600 text-white text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-md animate-in zoom-in-50 duration-300">
                  {cartCount}
                </span>
              )}
            </button>
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-stone-700 hover:bg-stone-50 rounded-xl"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-stone-100 py-4 px-4 space-y-2">
          <Link href="/" className="block py-2 text-stone-700 hover:text-emerald-600 font-bold text-sm">Accueil</Link>
          <Link href="/about" className="block py-2 text-stone-700 hover:text-emerald-600 font-bold text-sm">À Propos</Link>
          <Link href="/programs" className="block py-2 text-stone-700 hover:text-emerald-600 font-bold text-sm">Programmes</Link>
          <Link href="/shop" className="block py-2 text-stone-700 hover:text-emerald-600 font-bold text-sm">Catalogue</Link>
          <Link href="/blog" className="block py-2 text-stone-700 hover:text-emerald-600 font-bold text-sm">Blog</Link>
          <Link href="/contact" className="block py-2 text-stone-700 hover:text-emerald-600 font-bold text-sm">Contact</Link>
        </div>
      )}
    </nav>
  );
}
