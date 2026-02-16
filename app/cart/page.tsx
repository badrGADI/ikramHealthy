'use client';

import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
  const [mounted, setMounted] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-4">
        <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mb-6">
          <svg className="w-10 h-10 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
        </div>
        <h1 className="text-3xl font-serif text-stone-800 mb-4">Votre panier est vide</h1>
        <p className="text-stone-500 mb-8">Découvrez nos produits sains et gourmands.</p>
        <Link 
          href="/shop"
          className="bg-emerald-600 text-white px-8 py-3 rounded-full font-bold hover:bg-emerald-700 transition-colors"
        >
          Voir le catalogue
        </Link>
      </div>
    );
  }

  if (showSuccess) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-4 animate-in fade-in duration-500">
        <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mb-6">
          <svg className="w-12 h-12 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-4xl font-serif text-stone-800 mb-4 text-center">Commande Reçue !</h1>
        <p className="text-stone-500 mb-8 text-center max-w-md">
          Merci pour votre commande. Nous avons bien reçu votre demande sur WhatsApp et nous la traiterons dans les plus brefs délais.
        </p>
        <Link 
          href="/shop"
          className="bg-stone-900 text-white px-8 py-3 rounded-full font-bold hover:bg-emerald-600 transition-colors"
        >
          Retour à la boutique
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-serif text-stone-800 mb-12">Mon Panier</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          {items.map(({ product, quantity }) => (
            <div key={product.id} className="flex gap-6 p-6 bg-white rounded-[2rem] border border-stone-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="relative w-24 h-24 flex-shrink-0 bg-stone-50 rounded-2xl overflow-hidden">
                <Image 
                  src={product.image} 
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
              
              <div className="flex-grow flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-stone-800 text-lg mb-1">{product.name}</h3>
                    <p className="text-sm text-emerald-600 font-bold uppercase tracking-wider">{product.subCategory}</p>
                  </div>
                  <button 
                    onClick={() => removeFromCart(product.id)}
                    className="text-stone-400 hover:text-red-500 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>

                <div className="flex justify-between items-center mt-4">
                  <div className="flex items-center space-x-3 bg-stone-50 rounded-xl p-1">
                    <button 
                      onClick={() => updateQuantity(product.id, quantity - 1)}
                      className="w-8 h-8 flex items-center justify-center bg-white rounded-lg text-stone-600 hover:bg-emerald-50 hover:text-emerald-600 shadow-sm transition-colors"
                    >
                      -
                    </button>
                    <span className="font-bold text-stone-800 w-4 text-center">{quantity}</span>
                    <button 
                      onClick={() => updateQuantity(product.id, quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center bg-white rounded-lg text-stone-600 hover:bg-emerald-50 hover:text-emerald-600 shadow-sm transition-colors"
                    >
                      +
                    </button>
                  </div>
                  <p className="font-bold text-xl text-emerald-800">{product.price * quantity} <span className="text-sm font-normal">DH</span></p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="bg-stone-50 p-8 rounded-[2.5rem] border border-stone-100 sticky top-24">
            <h2 className="text-2xl font-serif text-stone-800 mb-6">Résumé</h2>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-stone-600">
                <span>Sous-total</span>
                <span className="font-bold">{cartTotal} DH</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Livraison</span>
                <span className="text-emerald-600 font-bold">Gratuite</span>
              </div>
              <div className="h-px bg-stone-200 my-4"></div>
              <div className="flex justify-between text-xl font-bold text-stone-800">
                <span>Total</span>
                <span>{cartTotal} DH</span>
              </div>
            </div>

            <button 
              onClick={() => {
                const message = `Bonjour, je souhaite commander les articles suivants:%0A%0A${items.map(item => `- ${item.quantity}x ${item.product.name} (${item.product.price * item.quantity} DH)`).join('%0A')}%0A%0A*Total: ${cartTotal} DH*`;
                window.open(`https://wa.me/212654352802?text=${message}`, '_blank');
                clearCart();
                setShowSuccess(true);
              }}
              className="w-full bg-emerald-600 text-white py-4 rounded-xl font-bold hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-600/20 active:scale-95 flex items-center justify-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.592 2.654-.696c1.001.572 2.135.882 3.322.882 3.183 0 5.768-2.586 5.769-5.766.001-3.18-2.585-5.765-5.766-5.765zm9.924 5.766C21.95 5.251 17.502.802 12.032.802 6.561.802 2.113 5.251 2.113 10.721c0 1.83.486 3.593 1.396 5.148l-1.478 5.393 5.517-1.448c1.517.828 3.245 1.266 5.011 1.266 5.469 0 9.918-4.448 9.918-9.918 0-2.651-1.03-5.143-2.903-7.017zM12.032 19.198c-1.637 0-3.238-.432-4.636-1.261l-.332-.196-3.279.86 1.708-3.085-.383-.604c-1.325-2.091-1.458-4.707-.367-6.958 1.488-3.076 4.962-4.364 8.037-2.875 3.076 1.488 4.365 4.962 2.876 8.037-1.077 2.224-3.327 3.666-5.786 3.666z"/></svg>
              Commander sur WhatsApp
            </button>
            
            <p className="text-xs text-center text-stone-400 mt-4">
              Paiement sécurisé à la livraison ou par carte bancaire.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
