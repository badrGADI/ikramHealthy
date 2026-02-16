'use client';

import { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductCard from '@/components/ProductCard';
import { PRODUCTS } from '@/lib/constants';
import { Category, SubCategory } from '@/lib/types';
import { useCart } from '@/context/CartContext';

export default function ShopPage() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');
  
  const { addToCart } = useCart();
  const [activeCategory, setActiveCategory] = useState<Category | 'All'>(
    categoryParam as Category || 'All'
  );
  const [activeSubCategory, setActiveSubCategory] = useState<SubCategory | 'All'>('All');

  const handleAddToCart = (product: any) => {
    addToCart(product);
  };

  const filteredProducts = useMemo(() => {
    let result = PRODUCTS.filter(p => p.category !== Category.PROGRAM);
    if (activeCategory !== 'All') {
      result = result.filter(p => p.category === activeCategory);
    }
    if (activeSubCategory !== 'All') {
      result = result.filter(p => p.subCategory === activeSubCategory);
    }
    return result;
  }, [activeCategory, activeSubCategory]);

  const availableSubCategories = useMemo(() => {
    if (activeCategory === 'All') return [];
    const subs = PRODUCTS
      .filter(p => p.category === activeCategory)
      .map(p => p.subCategory);
    return Array.from(new Set(subs));
  }, [activeCategory]);

  // Reset sub-category when main category changes
  const handleCategoryChange = (cat: Category | 'All') => {
    setActiveCategory(cat);
    setActiveSubCategory('All');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h1 className="text-5xl font-serif text-stone-800 mb-12 text-center">Boutique Healthy</h1>
      
      {/* Tier 1: Main Categories */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {['All', Category.SNACKS, Category.BEVERAGES, Category.COMPLIMENTS].map((cat) => (
          <button 
            key={cat}
            onClick={() => handleCategoryChange(cat as any)}
            className={`px-8 py-3 rounded-full border-2 transition-all text-sm font-bold tracking-wide ${
              activeCategory === cat 
                ? 'bg-emerald-600 text-white border-emerald-600 shadow-lg shadow-emerald-600/20' 
                : 'bg-white text-stone-500 border-stone-100 hover:border-emerald-200'
            }`}
          >
            {cat === 'All' ? 'Tout voir' : cat}
          </button>
        ))}
      </div>

      {/* Tier 2: Sub Categories (Conditional) */}
      {activeCategory !== 'All' && availableSubCategories.length > 0 && (
        <div className="flex flex-wrap justify-center gap-3 mb-16 animate-in slide-in-from-top-2 fade-in duration-500">
          <button 
            onClick={() => setActiveSubCategory('All')}
            className={`px-5 py-2 rounded-full border text-xs font-bold transition-all ${
              activeSubCategory === 'All' 
                ? 'bg-emerald-100 text-emerald-800 border-emerald-200' 
                : 'bg-stone-50 text-stone-400 border-stone-100 hover:bg-stone-100'
            }`}
          >
            Tout {activeCategory}
          </button>
          {availableSubCategories.map((sub) => (
            <button 
              key={sub}
              onClick={() => setActiveSubCategory(sub)}
              className={`px-5 py-2 rounded-full border text-xs font-bold transition-all ${
                activeSubCategory === sub 
                  ? 'bg-emerald-100 text-emerald-800 border-emerald-200 shadow-sm' 
                  : 'bg-stone-50 text-stone-400 border-stone-100 hover:bg-stone-100'
              }`}
            >
              {sub}
            </button>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
        {filteredProducts.map(product => (
          <ProductCard 
            key={product.id} 
            product={product} 
            onAddToCart={handleAddToCart}
          />
        ))}
        {filteredProducts.length === 0 && (
          <div className="col-span-full py-20 text-center text-stone-400 italic">
            Aucun produit trouvé dans cette catégorie.
          </div>
        )}
      </div>
    </div>
  );
}
