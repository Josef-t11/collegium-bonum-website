import { client } from '@/sanity/lib/client'
import { groq } from 'next-sanity'
import { ArrowRight } from 'lucide-react'

const ALL_NEWS_QUERY = groq`*[_type == "news"] | order(publishedAt desc) {
  _id,
  title,
  "slug": slug.current,
  publishedAt,
  excerpt
}`

export default async function NewsListPage() {
  const news = await client.fetch(ALL_NEWS_QUERY)

  return (
    <main className="max-w-4xl mx-auto py-16 px-6 text-left">
      <h1 className="text-5xl font-black text-slate-900 mb-12">Aktuality</h1>
      <div className="space-y-12">
        {news?.map((item: any) => (
          <article key={item._id} className="border-b pb-8 border-slate-100 flex flex-col items-start">
            <time className="text-sm text-slate-400 mb-2">
              {new Date(item.publishedAt).toLocaleDateString('cs-CZ')}
            </time>
            <h2 className="text-3xl font-bold mb-4 hover:text-blue-600 transition-colors text-left">
              <a href={`/aktuality/${item.slug}`}>{item.title}</a>
            </h2>
            <p className="text-slate-600 mb-6 text-left">{item.excerpt}</p>
            <a href={`/aktuality/${item.slug}`} className="font-bold text-blue-600 flex items-center gap-2">
              Celý článek <ArrowRight size={18} />
            </a>
          </article>
        ))}
      </div>
    </main>
  )
}