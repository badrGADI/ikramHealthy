'use client';

import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef } from 'react';

export default function CartDrawer() {
  const { items, isDrawerOpen, closeDrawer, removeFromCart, cartTotal } = useCart();
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (drawerRef.current && !drawerRef.current.contains(event.target as Node)) {
        closeDrawer();
      }
    };

    if (isDrawerOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isDrawerOpen, closeDrawer]);

  const whatsappMessage = `Bonjour, je souhaite commander:%0A%0A${items.map(item => `- ${item.quantity}x ${item.product.name} (${item.product.price * item.quantity} DH)`).join('%0A')}%0A%0A*Total: ${cartTotal} DH*`;

  return (
    <>
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity duration-300 ${
          isDrawerOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* Drawer */}
      <div 
        ref={drawerRef}
        className={`fixed inset-y-0 right-0 w-full max-w-md bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-out flex flex-col ${
          isDrawerOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="p-6 border-b border-stone-100 flex justify-between items-center bg-stone-50">
          <h2 className="text-2xl font-serif text-stone-800">Mon Panier ({items.length})</h2>
          <button 
            onClick={closeDrawer}
            className="p-2 hover:bg-stone-200 rounded-full transition-colors"
          >
            <svg className="w-6 h-6 text-stone-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Items List */}
        <div className="flex-grow overflow-y-auto p-6 space-y-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 bg-stone-50 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <p className="text-stone-500 font-medium">Votre panier est vide</p>
              <button 
                onClick={closeDrawer}
                className="mt-4 text-emerald-600 font-bold hover:underline"
              >
                Continuer mes achats
              </button>
            </div>
          ) : (
            items.map(({ product, quantity }) => (
              <div key={product.id} className="flex gap-4">
                <div className="relative w-20 h-20 bg-stone-50 rounded-xl overflow-hidden flex-shrink-0">
                  <Image 
                    src={product.image} 
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-grow">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-stone-800 text-sm line-clamp-1">{product.name}</h3>
                    <button 
                      onClick={() => removeFromCart(product.id)}
                      className="text-stone-400 hover:text-red-500 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                  <p className="text-xs text-stone-500 mb-2">{product.subCategory}</p>
                  <div className="flex justify-between items-center">
                    <span className="bg-stone-100 text-stone-600 text-xs py-1 px-2 rounded-lg font-bold">
                      Qty: {quantity}
                    </span>
                    <span className="font-bold text-emerald-800">{product.price * quantity} DH</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-6 border-t border-stone-100 bg-stone-50">
            <div className="flex justify-between items-center mb-4">
              <span className="text-stone-600 font-medium">Total</span>
              <span className="text-2xl font-bold text-emerald-800">{cartTotal} DH</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Link
                href="/cart"
                onClick={closeDrawer}
                className="flex items-center justify-center bg-white border border-stone-200 text-stone-800 py-3 rounded-xl font-bold hover:bg-stone-100 transition-colors"
              >
                Voir Panier
              </Link>
              <button 
                onClick={() => {
                  window.open(`https://wa.me/212654352802?text=${whatsappMessage}`, '_blank');
                }}
                className="flex items-center justify-center bg-emerald-600 text-white py-3 rounded-xl font-bold hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-600/20"
              >
                Commander
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
