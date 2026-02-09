import { client } from '@/sanity/lib/client'
import { groq } from 'next-sanity'
import ConcertCard from '@/components/ConcertCard'

// Definice Query
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

export default async function ConcertsListPage() {
  const concerts = await client.fetch(ALL_CONCERTS_QUERY)
   // LOGOVÁNÍ - uvidíte v terminálu (ne v prohlížeči)
  console.log("DEBUG CONCERTS:", JSON.stringify(concerts, null, 2))

    return (
    <div className="max-w-5xl mx-auto py-12 px-6">
      <h1 className="text-4xl font-bold mb-10 text-center">Plánované koncerty</h1>
      
      <div className="grid gap-6">
        {/* Kontrola, zda koncerty existují, než začneme mapovat */}
        {concerts?.length > 0 ? (
          concerts.map((c: any) => (
            // Kontrola, že slug existuje, jinak odkaz nefunguje
            c.slug ? (
              <a href={`/koncerty/${c.slug}`} key={c._id} className="block group">
                <ConcertCard concert={c} />
              </a>
            ) : (
              <div key={c._id} className="opacity-50">
                <ConcertCard concert={c} />
                <p className="text-xs text-red-500">Chybí URL identifikátor (slug)!</p>
              </div>
            )
          ))
        ) : (
          <p className="text-center text-gray-500">Žádné koncerty k zobrazení.</p>
        )}
      </div>
    </div>
  )
}