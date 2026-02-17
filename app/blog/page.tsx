import Link from 'next/link';
import Image from 'next/image';
import { BLOG_POSTS } from '@/lib/constants';

export default function BlogPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20 animate-in fade-in duration-500">
      <h1 className="text-5xl font-serif text-stone-800 mb-20 text-center">Conseils & Lifestyle</h1>
      <div className="space-y-24">
        {BLOG_POSTS.map(post => (
          <Link href={`/blog/${post.id}`} key={post.id} className="group cursor-pointer block">
            <article>
              <div className="overflow-hidden rounded-[2.5rem] mb-10 aspect-video shadow-lg relative">
                <Image 
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-6 left-6 bg-white/90 backdrop-blur px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-emerald-700 shadow-sm">
                  {post.date}
                </div>
              </div>
              <div className="px-4">
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-800 mb-6 group-hover:text-emerald-700 transition-colors leading-tight">
                  {post.title}
                </h2>
                <p className="text-stone-500 leading-relaxed mb-8 text-lg">{post.excerpt}</p>
                <div className="flex items-center space-x-2 text-emerald-700 font-bold border-b-2 border-emerald-700 pb-1 hover:border-emerald-400 transition-all uppercase text-xs tracking-widest w-fit">
                  <span>Lire la suite</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
}
