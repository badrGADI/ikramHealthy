import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getPostById } from '@/lib/blog';
import { MDXRemote } from 'next-mdx-remote/rsc';
import React from 'react';
import remarkGfm from 'remark-gfm';

// --- Custom Premium MDX Components ---

const PremiumTable = ({ children }: { children: React.ReactNode }) => (
  <div className="my-10 overflow-hidden rounded-[2rem] border border-stone-100 shadow-xl shadow-stone-200/50 bg-white">
    <table className="w-full text-left border-collapse">
      {children}
    </table>
  </div>
);

const TableHeader = ({ children }: { children: React.ReactNode }) => (
  <thead className="bg-stone-50 border-b border-stone-100 text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400">
    {children}
  </thead>
);

const TableCell = ({ children, isHeader }: { children: React.ReactNode, isHeader?: boolean }) => {
  const Tag = isHeader ? 'th' : 'td';
  return (
    <Tag className={`px-8 py-6 text-sm ${isHeader ? 'font-bold text-stone-800' : 'text-stone-600 font-medium border-b border-stone-50 group-odd/row:bg-stone-50/30'}`}>
      {children}
    </Tag>
  );
};

const ImageGallery = ({ images }: { images: string[] }) => {
  if (!images || !Array.isArray(images)) return null;
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-12 h-auto">
      {images.map((src, i) => (
        <div key={i} className={`relative overflow-hidden rounded-[2.5rem] shadow-2xl group ${i === 2 ? 'md:col-span-2 aspect-[21/9]' : 'aspect-square'}`}>
          <Image 
            src={src} 
            alt={`Gallery image ${i}`} 
            fill 
            className="object-cover transition-transform duration-700 group-hover:scale-110" 
          />
          <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-all duration-500" />
        </div>
      ))}
    </div>
  );
};

const Accordion = ({ title, children }: { title: string, children: React.ReactNode }) => {
  return (
    <details className="group mb-4 bg-white rounded-[1.5rem] border border-stone-100 shadow-sm transition-all hover:shadow-md">
      <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
        <h3 className="text-base font-bold text-stone-800 pr-4">{title}</h3>
        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center transition-transform group-open:rotate-180">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7"/></svg>
        </span>
      </summary>
      <div className="px-6 pb-6 text-stone-500 text-sm leading-relaxed border-t border-stone-50 pt-4 animate-in fade-in slide-in-from-top-2">
        {children}
      </div>
    </details>
  );
};

const components = {
  h2: (props: any) => <h2 className="text-3xl md:text-5xl font-serif text-stone-800 mt-20 mb-8 font-bold leading-tight" {...props} />,
  h3: (props: any) => <h3 className="text-xl md:text-2xl font-bold text-stone-800 mt-12 mb-6" {...props} />,
  p: (props: any) => <p className="leading-[2] mb-8 text-stone-500 text-lg" {...props} />,
  ul: (props: any) => <ul className="space-y-4 mb-10 ml-4" {...props} />,
  li: (props: any) => (
    <li className="flex items-start gap-4 text-stone-500 text-lg">
      <span className="w-2 h-2 rounded-full bg-emerald-500 mt-3 flex-shrink-0" />
      <span>{props.children}</span>
    </li>
  ),
  hr: () => <hr className="my-20 border-stone-100" />,
  table: PremiumTable,
  thead: TableHeader,
  tr: (props: any) => <tr className="group/row" {...props} />,
  th: (props: any) => <TableCell isHeader {...props} />,
  td: TableCell,
  ImageGallery,
  Accordion,
  blockquote: (props: any) => (
    <blockquote className="my-16 pl-10 border-l-[6px] border-emerald-500 italic text-2xl text-stone-600 font-medium leading-relaxed bg-stone-50/50 py-10 rounded-r-[3rem]" {...props} />
  ),
};

export default async function BlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = getPostById(id);

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

        <h1 className="text-5xl md:text-7xl font-serif text-stone-800 mb-12 leading-[1.1]">
          {post.title}
        </h1>

        <div className="prose prose-stone prose-lg max-w-none">
            <p className="text-2xl text-stone-600 leading-relaxed mb-12 font-medium border-l-[6px] border-emerald-500 pl-8 italic bg-emerald-50/30 py-8 rounded-r-3xl">
              {post.excerpt}
            </p>
            <div className="text-stone-500 leading-loose">
              <MDXRemote 
                source={post.content} 
                components={components} 
                options={{
                  mdxOptions: {
                    remarkPlugins: [remarkGfm],
                  },
                }}
              />
            </div>
        </div>
      </article>
    </div>
  );
}
