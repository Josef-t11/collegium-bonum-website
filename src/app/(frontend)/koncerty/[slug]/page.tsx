import { CONCERT_DETAIL_QUERY } from '@/sanity/lib/queries'
// ... ostatní importy
import { client } from '@/sanity/lib/client'
import { groq } from 'next-sanity'
import { notFound } from 'next/navigation'
import PortableTextComponent from '@/components/PortableTextComponent'



const ALL_CONCERTS_QUERY = groq`*[_type == "concert" && isPublic == true] | order(dateAndTime asc) {
  _id,
  _rev,      // <--- PŘIDEJTE TENTO ŘÁDEK
  _type,     // <--- PŘIDEJTE TENTO ŘÁDEK
  title,
  "slug": slug.current,
  "date": dateAndTime,
  location,
  description,
  "poster": posterImage.asset->url,
  "program": program[]->{ _id, title, composer }
}`

// Definice typu pro Next.js 15 async params
type Props = {
  params: Promise<{ slug: string }>
}

export default async function ConcertDetailPage({ params }: Props) {
  // KROK 1: Musíme počkat na params (Next.js 15 specifické)
  const { slug } = await params

  // KROK 2: Načtení dat ze Sanity
  const concert = await client.fetch(CONCERT_DETAIL_QUERY, { slug })

  // KROK 3: Ošetření neexistujícího záznamu
  if (!concert) {
    notFound()
  }

  const date = new Date(concert.date)

  return (
    <article className="max-w-4xl mx-auto py-12 px-6">
      <div className="flex flex-col md:flex-row gap-10 mb-12">
        {/* Plakát */}
        {concert.poster && (
          <div className="w-full md:w-1/3">
            <img
              src={concert.poster}
              alt={concert.title}
              className="rounded-2xl shadow-2xl w-full sticky top-8"
            />
          </div>
        )}

        <div className="flex-1">
          <nav className="mb-6">
            <a href="/koncerty" className="text-sm font-bold text-blue-600 hover:underline">← Zpět na seznam</a>
          </nav>

          <h1 className="text-5xl font-black text-gray-900 mb-6 leading-tight">
            {concert.title}
          </h1>

          <div className="space-y-3 text-lg text-gray-600 mb-8">
            <div className="flex items-center gap-3">
              <span className="font-bold text-gray-900">Kdy:</span>
              {date.toLocaleDateString('cs-CZ', { dateStyle: 'full' })} v {date.toLocaleTimeString('cs-CZ', { hour: '2-digit', minute: '2-digit' })}
            </div>
            <div className="flex items-center gap-3">
              <span className="font-bold text-gray-900">Kde:</span>
              {concert.location}
            </div>
          </div>
        </div>
      </div>

      {/* Popis koncertu */}
      <div className="prose prose-lg prose-blue max-w-none border-t pt-10">
        <h2 className="text-2xl font-bold mb-4">O koncertu</h2>
        {concert.description ? (
          <PortableTextComponent value={concert.description} />
        ) : (
          <p className="italic text-gray-500">Bližší informace připravujeme.</p>
        )}
      </div>

      {/* Program */}
      {concert.program && concert.program.length > 0 && (
        <section className="mt-16 bg-blue-50 p-8 md:p-12 rounded-[2rem]">
          <h2 className="text-3xl font-black mb-8 text-blue-900">Program</h2>
          <div className="grid gap-4">
            {concert.program.map((item: any, i: number) => (
              <div key={i} className="bg-white/50 p-4 rounded-xl flex justify-between items-center shadow-sm">
                <div>
                  <div className="font-bold text-gray-900">{item.title}</div>
                  <div className="text-sm text-gray-600">{item.composer}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </article>
  )
}