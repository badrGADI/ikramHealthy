'use client';

import { useState } from 'react';

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [reason, setReason] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, reason, message }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || 'Une erreur est survenue.');
        setStatus('error');
        return;
      }

      setStatus('success');
      setName('');
      setEmail('');
      setPhone('');
      setReason('');
      setMessage('');
    } catch {
      setErrorMsg('Impossible de contacter le serveur. Réessayez plus tard.');
      setStatus('error');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-24 animate-in slide-in-from-right-4 duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-start">
        <div className="space-y-16">
          <div>
            <span className="text-emerald-600 font-bold uppercase tracking-[0.3em] text-[10px] mb-4 block">Entrez en contact</span>
            <h1 className="text-5xl md:text-6xl font-serif text-stone-800 leading-tight">
              Parlons de vos <br /><span className="text-emerald-600">Objectifs.</span>
            </h1>
          </div>
          
          <div className="space-y-10">
            <div className="flex items-center space-x-6 p-6 bg-white rounded-[2rem] border border-stone-100 shadow-sm group hover:shadow-md transition-all">
              <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-all">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1.01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              </div>
              <div>
                <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1">WhatsApp & Phone</p>
                <p className="text-xl font-bold text-stone-800">+212 654 352 802</p>
              </div>
            </div>

            <div className="flex items-center space-x-6 p-6 bg-white rounded-[2rem] border border-stone-100 shadow-sm group hover:shadow-md transition-all">
              <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-all">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              </div>
              <div>
                <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1">Localisation</p>
                <p className="text-xl font-bold text-stone-800">Agadir, Maroc</p>
              </div>
            </div>

            <div className="flex items-center space-x-6 p-6 bg-white rounded-[2rem] border border-stone-100 shadow-sm group hover:shadow-md transition-all">
              <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-all">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <div>
                <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1">Heures d&apos;ouverture</p>
                <p className="text-xl font-bold text-stone-800">Lun - Sam : 09h - 20h</p>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        {status === 'success' ? (
          <div className="bg-white p-10 md:p-14 rounded-[3.5rem] shadow-2xl border border-stone-50 flex flex-col items-center justify-center text-center space-y-6 min-h-[480px] animate-in fade-in zoom-in-95 duration-500">
            <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center">
              <svg className="w-10 h-10 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-3xl font-serif text-stone-800">Message envoyé !</h2>
            <p className="text-stone-500 leading-relaxed">
              Merci pour votre message. Nous vous répondrons dans les plus brefs délais, généralement en moins de 2 heures.
            </p>
            <button
              onClick={() => setStatus('idle')}
              className="mt-4 text-emerald-600 font-bold hover:text-emerald-800 transition-colors border-b-2 border-emerald-200 hover:border-emerald-600 pb-0.5"
            >
              Envoyer un autre message
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-white p-10 md:p-14 rounded-[3.5rem] shadow-2xl border border-stone-50 space-y-8 animate-in slide-in-from-bottom-8 duration-700"
          >
            <div className="space-y-2">
              <label className="text-xs font-bold text-stone-400 uppercase tracking-widest ml-1">
                Comment vous appeler ?
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-7 py-5 rounded-2xl bg-stone-50 border-none focus:ring-2 focus:ring-emerald-500 transition-all text-sm font-medium outline-none"
                placeholder="Ex: Karim Bensalah"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-stone-400 uppercase tracking-widest ml-1">
                Email de contact
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-7 py-5 rounded-2xl bg-stone-50 border-none focus:ring-2 focus:ring-emerald-500 transition-all text-sm font-medium outline-none"
                placeholder="Ex: contact@karim.ma"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-stone-400 uppercase tracking-widest ml-1">
                Numéro de téléphone
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
                  <span className="text-sm font-bold text-stone-400">🇲🇦</span>
                </div>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full pl-14 pr-7 py-5 rounded-2xl bg-stone-50 border-none focus:ring-2 focus:ring-emerald-500 transition-all text-sm font-medium outline-none"
                  placeholder="Ex: +212 6 54 35 28 02"
                />
              </div>
            </div>
            <div className="space-y-3">
              <label className="text-xs font-bold text-stone-400 uppercase tracking-widest ml-1 block">
                Raison du contact
              </label>
              <div className="grid grid-cols-2 gap-3">
                {([
                  { value: 'commande',    emoji: '🛒', label: 'Commander' },
                  { value: 'programme',   emoji: '🥗', label: 'Programme' },
                  { value: 'detox',       emoji: '🍃', label: 'Cure Détox' },
                  { value: 'livraison',   emoji: '🚚', label: 'Livraison' },
                  { value: 'partenariat', emoji: '🤝', label: 'Partenariat' },
                  { value: 'autre',       emoji: '💬', label: 'Autre' },
                ] as const).map(({ value, emoji, label }) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setReason(value)}
                    className={`flex items-center gap-3 px-4 py-4 rounded-2xl border-2 text-left transition-all duration-200 group ${
                      reason === value
                        ? 'border-emerald-500 bg-emerald-50 shadow-md shadow-emerald-100'
                        : 'border-stone-100 bg-stone-50 hover:border-emerald-200 hover:bg-emerald-50/40'
                    }`}
                  >
                    <span className={`text-2xl transition-transform duration-200 ${
                      reason === value ? 'scale-110' : 'group-hover:scale-105'
                    }`}>{emoji}</span>
                    <span className={`text-xs font-bold tracking-wide transition-colors ${
                      reason === value ? 'text-emerald-700' : 'text-stone-500 group-hover:text-stone-700'
                    }`}>{label}</span>
                    {reason === value && (
                      <span className="ml-auto w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0" />
                    )}
                  </button>
                ))}
              </div>
              {/* Hidden input to trigger HTML5 required validation */}
              <input type="text" required readOnly value={reason} className="sr-only" tabIndex={-1} />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-stone-400 uppercase tracking-widest ml-1">
                Votre message
              </label>
              <textarea
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-7 py-5 rounded-2xl bg-stone-50 border-none focus:ring-2 focus:ring-emerald-500 transition-all h-40 resize-none text-sm font-medium outline-none"
                placeholder="Parlez-nous de vos objectifs santé, vos préférences alimentaires ou toute autre question..."
              />
            </div>

            {/* Error message */}
            {status === 'error' && (
              <div className="flex items-center gap-3 bg-red-50 border border-red-100 text-red-700 text-sm font-medium px-5 py-4 rounded-2xl animate-in fade-in duration-300">
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {errorMsg}
              </div>
            )}

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full bg-emerald-700 text-white py-6 rounded-[2rem] font-bold text-lg hover:bg-emerald-600 transition-all shadow-xl shadow-emerald-700/20 active:scale-95 transform hover:-translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0 flex items-center justify-center gap-3"
            >
              {status === 'loading' ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Envoi en cours...
                </>
              ) : (
                'Lancer la discussion'
              )}
            </button>
            <p className="text-[10px] text-center text-stone-400 font-bold uppercase tracking-widest">
              Nous répondons généralement en moins de 2 heures.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
