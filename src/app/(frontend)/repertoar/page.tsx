import { client } from '@/sanity/lib/client'
import { REPERTOIRE_QUERY } from '@/sanity/lib/queries'
import RepertoireTable from '@/components/RepertoireTable'

export default async function RepertoirePage() {
  const items = await client.fetch(REPERTOIRE_QUERY)

  return (
    <main className="py-16 bg-white min-h-screen">
      <div className="max-w-6xl mx-auto px-6">
        <header className="mb-12 text-left">
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-4 tracking-tight">
            Repertoár
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl leading-relaxed">
            Kompletní přehled skladeb, které náš sbor zpívá nebo v minulosti nastudoval.
          </p>
        </header>

        <RepertoireTable items={items} />
      </div>
    </main>
  )
}