// src/components/ConcertCard.tsx

import Link from 'next/link'
import { Calendar, MapPin, Music, ChevronRight, User } from 'lucide-react'

export default function ConcertCard({ concert }: { concert: any }) {
  if (!concert) return null

  const dateStr = concert.dateAndTime
  const date = dateStr ? new Date(dateStr) : null
  const detailUrl = `/${concert.slug}`

  return (
    <div className="group bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md hover:border-blue-300 transition-all flex flex-col md:flex-row">

      {/* Plakát / Obrázek (Klikatelný) */}
      <Link href={detailUrl} className="relative w-full md:w-56 h-48 md:h-auto bg-slate-100 flex-shrink-0 overflow-hidden block">
        {concert.poster ? (
          <img
            src={concert.poster}
            alt={concert.title}
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-slate-300 bg-slate-50">
            <Music size={40} strokeWidth={1.5} />
          </div>
        )}
      </Link>

      {/* Obsah karty */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          {date && (
            <div className="flex items-center gap-2 text-sm text-blue-600 font-bold mb-2 uppercase tracking-wide">
              <Calendar size={14} />
              {date.toLocaleDateString('cs-CZ', { day: 'numeric', month: 'long', year: 'numeric' })}
            </div>
          )}

          {/* Název (Klikatelný) */}
          <Link href={detailUrl}>
            <h3 className="text-2xl font-extrabold text-slate-900 mb-2 group-hover:text-blue-700 transition-colors">
              {concert.title}
            </h3>
          </Link>

          {concert.location && (
            <div className="flex items-center gap-2 text-slate-600 mb-4">
              <MapPin size={16} className="text-slate-400" />
              <span className="text-sm font-medium">{concert.location}</span>
            </div>
          )}

          {/* Program (zkrácený výpis na kartě) */}
          {concert.program && Array.isArray(concert.program) && concert.program.length > 0 && (
            <div className="mt-4 pt-4 border-t border-slate-100">
              <div className="text-[10px] font-bold uppercase tracking-[0.1em] text-slate-400 mb-2">
                Program koncertu:
              </div>
              <ul className="flex flex-col gap-y-1.5">
                {concert.program.slice(0, 3).map((piece: any) => (
                  <li key={piece._id} className="text-xs text-slate-500 flex items-center flex-wrap gap-x-2">
                    <span className="font-semibold text-slate-700">{piece.title}</span>
                    <span className="text-slate-400">— {piece.composer}</span>

                    {/* IMPLEMENTACE KROKU 3: Link na autora pokud má BIO */}
                    {piece.hasBio && piece.composerSlug && (
                      <Link
                        href={`/lide/${piece.composerSlug}`}
                        className="inline-flex items-center gap-0.5 px-1.5 py-0.5 bg-blue-50 text-blue-600 rounded text-[9px] font-bold uppercase hover:bg-blue-600 hover:text-white transition-colors"
                        title={`Více o autorovi: ${piece.composer}`}
                      >
                        <User size={10} />
                        Bio
                      </Link>
                    )}
                  </li>
                ))}
                {concert.program.length > 3 && (
                  <li className="text-xs text-slate-400 italic pt-1">...a další skladby</li>
                )}
              </ul>
            </div>
          )}
        </div>

        {/* Akce (Klikatelná) */}
        <Link
          href={detailUrl}
          className="mt-6 inline-flex items-center text-sm font-bold text-blue-600 hover:translate-x-1 transition-transform"
        >
          Více o koncertu <ChevronRight size={16} />
        </Link>
      </div>
    </div>
  )
}