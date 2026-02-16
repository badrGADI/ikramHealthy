'use client';

import { useState } from 'react';

export default function ContactPage() {
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
                <p className="text-xl font-bold text-stone-800">+212 6 76 74 31 43</p>
              </div>
            </div>

            <div className="flex items-center space-x-6 p-6 bg-white rounded-[2rem] border border-stone-100 shadow-sm group hover:shadow-md transition-all">
              <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-all">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              </div>
              <div>
                <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1">Localisation</p>
                <p className="text-xl font-bold text-stone-800">Rabat - Casablanca, Maroc</p>
              </div>
            </div>

            <div className="flex items-center space-x-6 p-6 bg-white rounded-[2rem] border border-stone-100 shadow-sm group hover:shadow-md transition-all">
              <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-all">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <div>
                <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1">Heures d'ouverture</p>
                <p className="text-xl font-bold text-stone-800">Lun - Sam : 09h - 20h</p>
              </div>
            </div>
          </div>
        </div>

        <form className="bg-white p-10 md:p-14 rounded-[3.5rem] shadow-2xl border border-stone-50 space-y-8 animate-in slide-in-from-bottom-8 duration-700">
          <div className="space-y-2">
            <label className="text-xs font-bold text-stone-400 uppercase tracking-widest ml-1">Comment vous appeler ?</label>
            <input type="text" className="w-full px-7 py-5 rounded-2xl bg-stone-50 border-none focus:ring-2 focus:ring-emerald-500 transition-all text-sm font-medium" placeholder="Ex: Karim Bensalah" />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-stone-400 uppercase tracking-widest ml-1">Email de contact</label>
            <input type="email" className="w-full px-7 py-5 rounded-2xl bg-stone-50 border-none focus:ring-2 focus:ring-emerald-500 transition-all text-sm font-medium" placeholder="Ex: contact@karim.ma" />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-stone-400 uppercase tracking-widest ml-1">Votre projet ou demande</label>
            <textarea className="w-full px-7 py-5 rounded-2xl bg-stone-50 border-none focus:ring-2 focus:ring-emerald-500 transition-all h-40 resize-none text-sm font-medium" placeholder="Décrivez votre besoin (rééquilibrage, cure detox...)"></textarea>
          </div>
          <button className="w-full bg-emerald-700 text-white py-6 rounded-[2rem] font-bold text-lg hover:bg-emerald-600 transition-all shadow-xl shadow-emerald-700/20 active:scale-95 transform hover:-translate-y-1">
            Lancer la discussion
          </button>
          <p className="text-[10px] text-center text-stone-400 font-bold uppercase tracking-widest">
            Nous répondons généralement en moins de 2 heures.
          </p>
        </form>
      </div>
    </div>
  );
}
