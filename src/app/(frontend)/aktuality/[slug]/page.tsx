import { client } from '@/sanity/lib/client'
import { groq } from 'next-sanity'
import { notFound } from 'next/navigation'
import PortableTextComponent from '@/components/PortableTextComponent'

const NEWS_DETAIL_QUERY = groq`*[_type == "news" && slug.current == $slug][0] {
  title,
  publishedAt,
  content
}`

type Props = {
  params: Promise<{ slug: string }>
}

export default async function NewsDetailPage({ params }: Props) {
  const { slug } = await params
  const item = await client.fetch(NEWS_DETAIL_QUERY, { slug })

  if (!item) notFound()

  return (
    <article className="max-w-3xl mx-auto py-20 px-6 text-left">
      <header className="mb-12">
        <time className="text-slate-400 font-bold uppercase tracking-widest text-sm">
          {new Date(item.publishedAt).toLocaleDateString('cs-CZ', { dateStyle: 'full' })}
        </time>
        <h1 className="text-5xl font-black text-slate-900 mt-4 leading-tight">
          {item.title}
        </h1>
      </header>
      
      {/* Náš zabezpečený PortableText pro dlouhé texty */}
      <div className="prose prose-lg prose-slate max-w-none">
        <PortableTextComponent value={item.content} />
      </div>

      <div className="mt-16 pt-8 border-t border-slate-100">
        <a href="/aktuality" className="font-bold text-blue-600 hover:underline">
          ← Zpět na všechny aktuality
        </a>
      </div>
    </article>
  )
}