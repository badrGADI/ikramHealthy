'use client';

import { useState } from 'react';
import Hero from '@/components/Hero';
import CategoryGrid from '@/components/CategoryGrid';
import HowItWorks from '@/components/HowItWorks';
import WhyChooseUs from '@/components/WhyChooseUs';
import CTASection from '@/components/CTASection';
import RecommendedProductCard from '@/components/RecommendedProductCard';
import Programs from '@/components/Programs';
import Testimonials from '@/components/Testimonials';
import Partners from '@/components/Partners';
import { PRODUCTS } from '@/lib/constants';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function HomePage() {
  const recommendedProducts = PRODUCTS.filter(p => p.id === 's1' || p.id === 'b1');

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-700">
      <Hero />
      
      {/* Recommended Products */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 space-y-6 md:space-y-0">
            <div className="text-left">
              <span className="text-emerald-600 font-bold uppercase tracking-widest text-xs mb-3 block">Recommandations</span>
              <h2 className="text-4xl md:text-5xl font-serif text-stone-800">Nos Incontournables</h2>
            </div>
            <Link 
              href="/shop"
              className="group flex items-center space-x-3 text-emerald-700 font-bold hover:text-stone-900 transition-colors"
            >
              <span className="border-b-2 border-emerald-200 group-hover:border-stone-900 transition-all">Explorer tout le shop</span>
              <svg className="w-5 h-5 transform group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
            {recommendedProducts.map(product => (
              <RecommendedProductCard 
                key={product.id} 
                product={product} 
              />
            ))}
          </div>
        </div>
      </section>

      <CategoryGrid />
      <Programs />
      <WhyChooseUs />
      <Partners />
      <HowItWorks />
      
      
      <Testimonials />
      <CTASection />
    </div>
  );
}
