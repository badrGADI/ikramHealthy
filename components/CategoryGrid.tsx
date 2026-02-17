'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Category } from '@/lib/types';

export default function CategoryGrid() {
  return (
    <section className="py-24 bg-stone-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Link 
            href="/shop?category=Healthy Snacks"
            className="group relative h-96 rounded-[3rem] overflow-hidden cursor-pointer shadow-md hover:shadow-2xl transition-all duration-700"
          >
            <Image 
              src="/images/product-keto-cake.jpg"
              alt="Healthy Snacks"
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-10">
              <h3 className="text-white text-3xl font-serif mb-2">Healthy Snacks</h3>
              <p className="text-emerald-400 text-sm font-semibold tracking-wide">Muffins, Cookies & Energetic Balls</p>
            </div>
          </Link>
          <Link 
            href="/shop?category=Juice & Smoothies"
            className="group relative h-96 rounded-[3rem] overflow-hidden cursor-pointer shadow-md hover:shadow-2xl transition-all duration-700"
          >
            <Image 
              src="/images/blog-smoothie.jpg"
              alt="Juices & Smoothies"
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-10">
              <h3 className="text-white text-3xl font-serif mb-2">Jus & Smoothies</h3>
              <p className="text-emerald-400 text-sm font-semibold tracking-wide">100% Frais & Sans Sucre Ajouté</p>
            </div>
          </Link>
          <Link 
            href="/shop?category=Healthy Compliments"
            className="group relative h-96 rounded-[3rem] overflow-hidden cursor-pointer shadow-md hover:shadow-2xl transition-all duration-700"
          >
            <Image 
              src="/images/category-complements-v2.jpg"
              alt="Healthy Complements"
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-10">
              <h3 className="text-white text-3xl font-serif mb-2">Compléments</h3>
              <p className="text-emerald-400 text-sm font-semibold tracking-wide">Miels Purs & Superaliments</p>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
