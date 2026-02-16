'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/lib/types';

import { useCart } from '@/context/CartContext';

interface RecommendedProductCardProps {
  product: Product;
}

export default function RecommendedProductCard({ product }: RecommendedProductCardProps) {
  const { addToCart } = useCart();

  return (
    <div className="group relative bg-white rounded-[2.5rem] overflow-hidden shadow-md hover:shadow-2xl transition-all duration-700 border border-stone-100 flex flex-col lg:flex-row h-full lg:h-72">
      {/* Visual Side */}
      <Link 
        href={`/products/${product.id}`}
        className="relative w-full lg:w-2/5 overflow-hidden cursor-pointer"
      >
        <Image 
          src={product.image} 
          alt={product.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/20 to-transparent"></div>
        <div className="absolute top-4 left-4">
          <span className="bg-emerald-600 text-white text-[9px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-lg">
            Coup de Cœur
          </span>
        </div>
      </Link>

      {/* Content Side */}
      <div className="w-full lg:w-3/5 p-8 lg:p-10 flex flex-col justify-between bg-white relative">
        <Link href={`/products/${product.id}`} className="cursor-pointer">
          <div className="flex justify-between items-center mb-4">
            <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">
              {product.subCategory}
            </span>
            <div className="flex items-center space-x-1">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
              <span className="text-[9px] font-bold text-stone-400 uppercase tracking-tighter">En stock</span>
            </div>
          </div>
          
          <h3 className="text-2xl md:text-3xl font-serif font-bold text-stone-800 mb-3 group-hover:text-emerald-700 transition-colors leading-tight">
            {product.name}
          </h3>
          
          <p className="text-stone-500 text-sm italic line-clamp-2 mb-6">
            "{product.description}"
          </p>
        </Link>

        <div className="flex items-center justify-between mt-4">
          <div>
            <p className="text-2xl font-bold text-emerald-800">{product.price} <span className="text-xs font-normal">DH</span></p>
            <p className="text-[10px] text-stone-400 font-bold uppercase tracking-widest">{product.nutrition.calories} Calories</p>
          </div>
          
          <div className="flex space-x-3">
            <Link 
              href={`/products/${product.id}`}
              className="bg-stone-50 text-stone-500 p-4 rounded-2xl hover:bg-stone-100 transition-all border border-stone-100 shadow-sm"
              title="Détails"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </Link>
            <button 
              onClick={() => addToCart(product)}
              className="bg-emerald-600 text-white p-4 rounded-2xl hover:bg-stone-900 transition-all shadow-lg shadow-emerald-600/20 active:scale-90 group/btn"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>
        </div>

        {/* Decorative corner element */}
        <div className="absolute bottom-0 right-0 w-16 h-16 bg-emerald-50 rounded-tl-[3rem] -z-10 group-hover:scale-150 transition-transform duration-700 opacity-50"></div>
      </div>
    </div>
  );
}
