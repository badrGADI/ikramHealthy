import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { CartProvider } from '@/context/CartContext';
import CartDrawer from '@/components/CartDrawer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'HealthyBite Morocco - Premium Healthy Snacks & Juices',
  description: 'Snacks artisanaux, jus frais pressés à froid et programmes nutritionnels sur-mesure livrés à Rabat et partout au Maroc.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <CartProvider>
          <div className="min-h-screen flex flex-col selection:bg-emerald-100 selection:text-emerald-900">
            <Navbar />
            <main className="flex-grow">
              {children}
            </main>
            <CartDrawer />
            <Footer />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
