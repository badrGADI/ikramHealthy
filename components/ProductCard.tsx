'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/lib/types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <div className="group bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-stone-100 flex flex-col h-full">
      <Link 
        href={`/products/${product.slug || product.id}`}
        className="relative aspect-square overflow-hidden cursor-pointer"
      >
        <Image 
          src={product.image} 
          alt={product.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute top-5 right-5 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-2xl text-[10px] font-bold text-emerald-800 shadow-sm border border-white/20">
          {product.nutrition.calories} kcal
        </div>
      </Link>
      <div className="p-8 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-grow pr-2">
            <span className="text-[9px] uppercase tracking-[0.2em] text-emerald-600 font-bold mb-1.5 block">
              {product.subCategory}
            </span>
            <Link href={`/products/${product.slug || product.id}`}>
              <h3 className="text-xl font-serif font-bold text-stone-800 group-hover:text-emerald-700 transition-colors line-clamp-1 cursor-pointer">
                {product.name}
              </h3>
            </Link>
          </div>
          <p className="text-emerald-800 font-bold text-xl whitespace-nowrap">{product.price} DH</p>
        </div>
        <p className="text-sm text-stone-500 line-clamp-2 mb-8 h-10 italic font-medium leading-relaxed">
          "{product.description}"
        </p>
        <div className="mt-auto flex flex-col gap-3">
          <button 
            onClick={() => onAddToCart(product)}
            className="w-full bg-emerald-600 text-white py-4 rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-emerald-700 transition-all flex items-center justify-center space-x-3 group/btn active:scale-95 shadow-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
            </svg>
            <span>Ajouter au panier</span>
          </button>
          <Link 
            href={`/products/${product.slug || product.id}`}
            className="w-full bg-stone-50 text-stone-500 py-3 rounded-2xl font-bold text-[10px] uppercase tracking-widest hover:bg-stone-100 transition-all border border-stone-100 active:scale-95 text-center"
          >
            Détails & Ingrédients
          </Link>
        </div>
      </div>
    </div>
  );
}
