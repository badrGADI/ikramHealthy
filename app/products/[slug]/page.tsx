'use client';

import { useState, useEffect, use } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { PRODUCTS } from '@/lib/constants';
import { Product, Category, SubCategory } from '@/lib/types';
import { useCart } from '@/context/CartContext';
import RecommendedProductCard from '@/components/RecommendedProductCard';

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

export default function ProductDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const { addToCart } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFoundState, setNotFoundState] = useState(false);

  useEffect(() => {
    // First check static products by slug
    const staticProduct = PRODUCTS.find(p => p.slug === slug);
    if (staticProduct) {
      setProduct(staticProduct);
      setLoading(false);
      return;
    }

    // Otherwise fetch from DB
    fetch(`/api/product-slug/${slug}`)
      .then(res => {
        if (!res.ok) {
          setNotFoundState(true);
          return null;
        }
        return res.json();
      })
      .then(data => {
        if (data) setProduct(dbRowToProduct(data));
      })
      .catch(() => setNotFoundState(true))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <svg className="animate-spin h-8 w-8 text-emerald-600" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      </div>
    );
  }

  if (notFoundState || !product) {
    notFound();
  }

  const recommendedProducts = PRODUCTS
    .filter(p => p.category === product!.category && p.id !== product!.id)
    .slice(0, 2);

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
              src={product!.image}
              alt={product!.name}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <span className="text-emerald-600 font-bold uppercase tracking-[0.3em] text-[10px] mb-4 block">
            {product!.category} / {product!.subCategory}
          </span>
          <h1 className="text-5xl md:text-6xl font-serif text-stone-800 mb-8 leading-tight">{product!.name}</h1>

          <div className="flex items-center space-x-8 mb-10">
            <p className="text-5xl font-bold text-emerald-800">{product!.price} <span className="text-xl font-normal">DH</span></p>
            <div className="h-10 w-px bg-stone-200"></div>
            <div className="flex items-center space-x-2 text-emerald-600">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
              <span className="text-xs font-bold uppercase tracking-widest">En Stock - Livraison 48h</span>
            </div>
          </div>

          <p className="text-stone-500 text-lg leading-relaxed mb-12 italic">
            &ldquo;{product!.fullDescription || product!.description}&rdquo;
          </p>

          <div className="grid grid-cols-4 gap-4 mb-12">
            {[
              { label: 'Calories', value: product!.nutrition.calories },
              { label: 'Protéines', value: product!.nutrition.protein },
              { label: 'Fibres', value: product!.nutrition.fiber },
              { label: 'Glucides', value: product!.nutrition.carbs || '-' },
            ].map(({ label, value }) => (
              <div key={label} className="bg-stone-50 p-4 rounded-3xl text-center border border-stone-100">
                <p className="text-[10px] font-bold text-stone-400 uppercase tracking-tighter mb-1">{label}</p>
                <p className="text-xl font-bold text-emerald-800">{value}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-4">
            <button
              onClick={() => addToCart(product!)}
              className="w-full bg-stone-900 text-white py-6 rounded-[2rem] font-bold text-xl hover:bg-stone-800 transition-all shadow-xl active:scale-95 flex items-center justify-center space-x-4"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
              <span>Ajouter au panier</span>
            </button>

            <a
              href={`https://wa.me/212654352802?text=${encodeURIComponent(`Bonjour, je souhaite commander le produit : ${product!.name}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-emerald-600 text-white py-6 rounded-[2rem] font-bold text-xl hover:bg-emerald-700 transition-all shadow-xl active:scale-95 flex items-center justify-center space-x-4"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
              <span>Commander via WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      {/* Ingredients */}
      {product!.ingredients && product!.ingredients.length > 0 && (
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
                {product!.ingredients.map((ing, idx) => (
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
      )}

      {/* Recommended */}
      {recommendedProducts.length > 0 && (
        <div className="mt-32 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-emerald-600 font-bold uppercase tracking-widest text-xs mb-4 block">Vous aimerez aussi</span>
            <h2 className="text-4xl font-serif text-stone-800">Nos Recommandations</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {recommendedProducts.map(p => (
              <RecommendedProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
