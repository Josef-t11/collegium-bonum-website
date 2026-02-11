// src/app/(frontend)/koncerty/page.tsx

import { client } from '@/sanity/lib/client'
import { groq } from 'next-sanity'
import ConcertCard from '@/components/ConcertCard'

// Aktualizovaná Query s logikou pro autory
const ALL_CONCERTS_QUERY = groq`*[_type == "concert" && isPublic == true] | order(dateAndTime asc) {
  _id,
  _rev,
  _type,
  title,
  "slug": slug.current,
  "dateAndTime": dateAndTime, // Sjednotíme název pro ConcertCard
  location,
  description,
  "poster": posterImage.asset->url,
  // Tady je ta hlavní změna: detaily o autorech v programu
  "program": program[]->{ 
    _id, 
    title, 
    "composer": coalesce(author->name, composer, "Anonym"),
    "composerSlug": author->slug.current,
    "hasBio": defined(author->bio) 
  }
}`

export default async function ConcertsListPage() {
  const concerts = await client.fetch(ALL_CONCERTS_QUERY)

  // Debug log pro kontrolu dat v terminálu
  console.log("DEBUG CONCERTS WITH BIO INFO:", JSON.stringify(concerts, null, 2))

  return (
    <div className="max-w-5xl mx-auto py-12 px-6">
      <h1 className="text-4xl font-black mb-10 text-center text-slate-900 tracking-tight">
        Plánované koncerty
      </h1>

      <div className="grid gap-8">
        {concerts?.length > 0 ? (
          concerts.map((c: any) => (
            <div key={c._id} className="relative">
              {/* 
                SENIOR TIP: 
                V původním kódu byl ConcertCard obalený v <a>. 
                Pokud ale uvnitř karty budeme mít odkaz "O autorovi", 
                vznikne "Link inside Link", což je nevalidní HTML.
                
                Řešení: ConcertCard by měl mít odkaz na detail uvnitř sebe 
                (např. na titulku a tlačítku), nikoliv jako obal.
              */}
              <ConcertCard concert={c} />
            </div>
          ))
        ) : (
          <div className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
            <p className="text-xl text-slate-500 font-medium">Aktuálně nemáme naplánované žádné veřejné koncerty.</p>
          </div>
        )}
      </div>
    </div>
  )
}