// src/components/ConcertCard.tsx

import Link from 'next/link'
import { Calendar, MapPin, Music, ChevronRight } from 'lucide-react'

export default function ConcertCard({ concert }: { concert: any }) {
  if (!concert) return null

  const dateStr = concert.dateAndTime
  const date = dateStr ? new Date(dateStr) : null

  // URL detailu koncertu - jelikož používáme catch-all [[...slug]], 
  // odkazujeme prostě na slug koncertu.
  const detailUrl = `/${concert.slug}`

  return (
    <Link
      href={detailUrl}
      className="group bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md hover:border-blue-300 transition-all flex flex-col md:flex-row"
    >
      {/* Plakát / Obrázek */}
      <div className="relative w-full md:w-56 h-48 md:h-auto bg-slate-100 flex-shrink-0 overflow-hidden">
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
      </div>

      {/* Obsah karty */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          {date && (
            <div className="flex items-center gap-2 text-sm text-blue-600 font-bold mb-2 uppercase tracking-wide">
              <Calendar size={14} />
              {date.toLocaleDateString('cs-CZ', { day: 'numeric', month: 'long', year: 'numeric' })}
            </div>
          )}

          <h3 className="text-2xl font-extrabold text-slate-900 mb-2 group-hover:text-blue-700 transition-colors">
            {concert.title}
          </h3>

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
              <ul className="flex flex-wrap gap-x-4 gap-y-1">
                {concert.program.slice(0, 3).map((piece: any) => (
                  <li key={piece._id} className="text-xs text-slate-500">
                    <span className="font-semibold text-slate-700">{piece.title}</span>
                    {piece.composer && <span className="text-slate-400"> — {piece.composer}</span>}
                  </li>
                ))}
                {concert.program.length > 3 && (
                  <li className="text-xs text-slate-400 italic">...a další</li>
                )}
              </ul>
            </div>
          )}
        </div>

        {/* Akce */}
        <div className="mt-6 flex items-center text-sm font-bold text-blue-600 group-hover:translate-x-1 transition-transform">
          Více o koncertu <ChevronRight size={16} />
        </div>
      </div>
    </Link>
  )
}