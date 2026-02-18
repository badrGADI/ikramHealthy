'use client';

import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push('/admin');
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfaf8] flex flex-col justify-center items-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-serif font-bold text-stone-800 mb-2">HealthyBite</h1>
          <p className="text-stone-400 uppercase tracking-[0.2em] text-[10px] font-bold">Administration — Accès Sécurisé</p>
        </div>

        <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-stone-200/50 p-10 border border-stone-100">
          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <div className="bg-red-50 text-red-500 p-4 rounded-2xl text-xs font-bold border border-red-100 animate-in fade-in slide-in-from-top-2">
                {error === 'Invalid login credentials' ? 'Identifiants invalides.' : error}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest ml-1">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-6 py-4 rounded-2xl bg-stone-50 border border-transparent focus:border-emerald-500 focus:bg-white outline-none transition-all text-sm font-medium"
                placeholder="admin@healthybite.ma"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest ml-1">Mot de passe</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-6 py-4 rounded-2xl bg-stone-50 border border-transparent focus:border-emerald-500 focus:bg-white outline-none transition-all text-sm font-medium"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-700 text-white py-4 rounded-2xl font-bold hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-700/20 active:scale-95 disabled:opacity-50 flex items-center justify-center gap-3 mt-4"
            >
              {loading ? (
                <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                </svg>
              ) : 'Se connecter'}
            </button>
          </form>
        </div>

        <div className="mt-10 text-center">
          <a href="/" className="text-stone-400 hover:text-emerald-600 text-xs font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-2">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7"/></svg>
            Retour au site
          </a>
        </div>
      </div>
    </div>
  );
}
