'use client';

import { useState } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { PRODUCTS } from '@/lib/constants';

import { useCart } from '@/context/CartContext';
import RecommendedProductCard from '@/components/RecommendedProductCard';

import { use } from 'react';

export default function ProductDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { addToCart } = useCart();
  const product = PRODUCTS.find(p => p.id === id);

  if (!product) {
    notFound();
  }

  // Filter for recommended products: same category, different ID, limit to 2
  const recommendedProducts = PRODUCTS
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 2);

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <div className="animate-in fade-in duration-700 py-20 max-w-7xl mx-auto px-4">
      <Link 
        href="/shop"
        className="mb-12 flex items-center space-x-2 text-stone-400 hover:text-emerald-600 transition-colors font-bold uppercase tracking-widest text-[10px]"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7"/></svg>
        <span>Retour au catalogue</span>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 mb-32">
        <div className="relative group">
          <div className="absolute -inset-4 bg-emerald-50 rounded-[4rem] -z-10 group-hover:scale-105 transition-transform duration-700"></div>
          <div className="relative w-full aspect-square rounded-[3.5rem] shadow-2xl overflow-hidden">
             <Image 
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
        
        <div className="flex flex-col justify-center">
          <span className="text-emerald-600 font-bold uppercase tracking-[0.3em] text-[10px] mb-4 block">
            {product.category} / {product.subCategory}
          </span>
          <h1 className="text-5xl md:text-6xl font-serif text-stone-800 mb-8 leading-tight">{product.name}</h1>
          
          <div className="flex items-center space-x-8 mb-10">
            <p className="text-5xl font-bold text-emerald-800">{product.price} <span className="text-xl font-normal">DH</span></p>
            <div className="h-10 w-px bg-stone-200"></div>
            <div className="flex items-center space-x-2 text-emerald-600">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
              <span className="text-xs font-bold uppercase tracking-widest">En Stock - Livraison 48h</span>
            </div>
          </div>

          <p className="text-stone-500 text-lg leading-relaxed mb-12 italic">
            "{product.fullDescription}"
          </p>

          <div className="grid grid-cols-4 gap-4 mb-12">
            <div className="bg-stone-50 p-4 rounded-3xl text-center border border-stone-100">
              <p className="text-[10px] font-bold text-stone-400 uppercase tracking-tighter mb-1">Calories</p>
              <p className="text-xl font-bold text-emerald-800">{product.nutrition.calories}</p>
            </div>
            <div className="bg-stone-50 p-4 rounded-3xl text-center border border-stone-100">
              <p className="text-[10px] font-bold text-stone-400 uppercase tracking-tighter mb-1">Protéines</p>
              <p className="text-xl font-bold text-emerald-800">{product.nutrition.protein}</p>
            </div>
            <div className="bg-stone-50 p-4 rounded-3xl text-center border border-stone-100">
              <p className="text-[10px] font-bold text-stone-400 uppercase tracking-tighter mb-1">Fibres</p>
              <p className="text-xl font-bold text-emerald-800">{product.nutrition.fiber}</p>
            </div>
            <div className="bg-stone-50 p-4 rounded-3xl text-center border border-stone-100">
              <p className="text-[10px] font-bold text-stone-400 uppercase tracking-tighter mb-1">Glucides</p>
              <p className="text-xl font-bold text-emerald-800">{product.nutrition.carbs || '-'}</p>
            </div>
          </div>

          <button 
            onClick={handleAddToCart}
            className="w-full bg-stone-900 text-white py-6 rounded-[2rem] font-bold text-xl hover:bg-emerald-600 transition-all shadow-2xl active:scale-95 flex items-center justify-center space-x-4"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
            <span>Ajouter au panier</span>
          </button>
        </div>
      </div>

      {/* Ingredients Details Table */}
      <div className="animate-in slide-in-from-bottom-8 duration-1000 delay-300">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif text-stone-800 mb-4">Zoom sur les ingrédients</h2>
          <p className="text-stone-400 text-sm italic">Parce que votre corps mérite la meilleure des qualités.</p>
        </div>

        <div className="overflow-hidden rounded-[3rem] shadow-2xl border border-stone-100 bg-white">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-emerald-600 text-white">
                <th className="px-10 py-6 font-serif text-lg">Ingrédient Principal</th>
                <th className="px-10 py-6 font-serif text-lg">Quantité Approx.</th>
                <th className="px-10 py-6 font-serif text-lg">Bénéfice Santé</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {product.ingredients.map((ing, idx) => (
                <tr key={idx} className="hover:bg-stone-50 transition-colors group">
                  <td className="px-10 py-8">
                    <div className="flex items-center space-x-4">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full group-hover:scale-150 transition-transform"></div>
                      <span className="font-bold text-stone-800 text-lg">{ing.name}</span>
                    </div>
                  </td>
                  <td className="px-10 py-8 text-stone-600 font-medium">{ing.amount}</td>
                  <td className="px-10 py-8">
                    <span className="bg-emerald-50 text-emerald-700 px-6 py-2 rounded-full text-sm font-bold border border-emerald-100">
                      {ing.benefit}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recommended Products Section */}
      {recommendedProducts.length > 0 && (
        <div className="mt-32 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-emerald-600 font-bold uppercase tracking-widest text-xs mb-4 block">Vous aimerez aussi</span>
            <h2 className="text-4xl font-serif text-stone-800">Nos Recommandations</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {recommendedProducts.map(recommendedProduct => (
              <RecommendedProductCard key={recommendedProduct.id} product={recommendedProduct} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
