'use client';

import { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductCard from '@/components/ProductCard';
import { PRODUCTS } from '@/lib/constants';
import { Category, SubCategory, Product } from '@/lib/types';
import { useCart } from '@/context/CartContext';

// Map a DB row to the Product type used by ProductCard
function dbRowToProduct(row: any): Product {
  return {
    id: row.id,
    slug: row.slug || row.id,
    name: row.name,
    category: row.category as Category,
    subCategory: row.sub_category as SubCategory,
    price: row.price,
    description: row.description,
    fullDescription: row.full_description || '',
    image: row.image,
    ingredients: row.ingredients || [],
    nutrition: {
      calories: row.cal || 0,
      protein: row.protein || '0g',
      fiber: row.fiber || '0g',
      carbs: row.carbs || '0g',
      fats: row.fats || '0g',
    },
  };
}

function ShopContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');

  const { addToCart } = useCart();
  const [activeCategory, setActiveCategory] = useState<Category | 'All'>(
    categoryParam as Category || 'All'
  );
  const [activeSubCategory, setActiveSubCategory] = useState<SubCategory | 'All'>('All');
  const [dbProducts, setDbProducts] = useState<Product[]>([]);
  const [dbLoading, setDbLoading] = useState(true);

  // Fetch dynamic products from Supabase via API
  useEffect(() => {
    fetch('/api/products')
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data)) {
          setDbProducts(data.map(dbRowToProduct));
        }
      })
      .catch(() => {})
      .finally(() => setDbLoading(false));
  }, []);

  // Merge: dynamic first (newest), then static
  const allProducts = useMemo(() => {
    const staticProducts = PRODUCTS.filter(p => p.category !== Category.PROGRAM);
    return [...dbProducts.filter(p => p.category !== Category.PROGRAM), ...staticProducts];
  }, [dbProducts]);

  const filteredProducts = useMemo(() => {
    let result = allProducts;
    if (activeCategory !== 'All') {
      result = result.filter(p => p.category === activeCategory);
    }
    if (activeSubCategory !== 'All') {
      result = result.filter(p => p.subCategory === activeSubCategory);
    }
    return result;
  }, [allProducts, activeCategory, activeSubCategory]);

  const availableSubCategories = useMemo(() => {
    if (activeCategory === 'All') return [];
    const subs = allProducts
      .filter(p => p.category === activeCategory)
      .map(p => p.subCategory);
    return Array.from(new Set(subs));
  }, [allProducts, activeCategory]);

  const handleCategoryChange = (cat: Category | 'All') => {
    setActiveCategory(cat);
    setActiveSubCategory('All');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h1 className="text-5xl font-serif text-stone-800 mb-12 text-center">Boutique Healthy</h1>

      {/* Tier 1: Main Categories */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {(['All', Category.SNACKS, Category.BEVERAGES, Category.COMPLIMENTS] as const).map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategoryChange(cat as Category | 'All')}
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

      {/* Tier 2: Sub Categories */}
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

      {dbLoading && (
        <div className="flex justify-center mb-8">
          <span className="text-xs font-bold text-stone-400 uppercase tracking-widest flex items-center gap-2">
            <svg className="animate-spin h-3 w-3" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
            Chargement des nouveaux produits...
          </span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
        {filteredProducts.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={addToCart}
          />
        ))}
        {filteredProducts.length === 0 && !dbLoading && (
          <div className="col-span-full py-20 text-center text-stone-400 italic">
            Aucun produit trouvé dans cette catégorie.
          </div>
        )}
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Chargement...</div>}>
      <ShopContent />
    </Suspense>
  );
}
