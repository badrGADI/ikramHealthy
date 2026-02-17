'use client';

import { use } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { BLOG_POSTS } from '@/lib/constants';

export default function BlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const post = BLOG_POSTS.find(p => p.id === id);

  if (!post) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-20 animate-in fade-in duration-700">
      <Link 
        href="/blog"
        className="mb-12 flex items-center space-x-2 text-stone-400 hover:text-emerald-600 transition-colors font-bold uppercase tracking-widest text-[10px]"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7"/></svg>
        <span>Retour aux articles</span>
      </Link>

      <article>
        <div className="mb-12 relative h-96 w-full rounded-[3rem] overflow-hidden shadow-2xl">
          <Image 
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div className="absolute bottom-8 left-8 text-white">
             <div className="flex items-center space-x-4 mb-4 text-sm font-bold uppercase tracking-widest opacity-90">
                <span>{post.date}</span>
                <span className="w-1 h-1 bg-white rounded-full"></span>
                <span>{post.author}</span>
             </div>
          </div>
        </div>

        <h1 className="text-4xl md:text-6xl font-serif text-stone-800 mb-12 leading-tight">
          {post.title}
        </h1>

        <div className="prose prose-stone prose-lg max-w-none">
           <p className="text-xl text-stone-600 leading-relaxed mb-8 font-medium border-l-4 border-emerald-500 pl-6 italic">
             {post.excerpt}
           </p>
           <div className="text-stone-500 leading-loose space-y-6">
             {post.content.split('\n').map((paragraph, idx) => (
               <p key={idx}>{paragraph}</p>
             ))}
           </div>
        </div>
      </article>
    </div>
  );
}
