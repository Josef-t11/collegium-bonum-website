// src/components/ConcertCard.tsx
import Link from 'next/link'
import { Calendar, MapPin, Music, ChevronRight, User } from 'lucide-react'

export default function ConcertCard({ concert }: { concert: any }) {
  if (!concert) return null

  const dateStr = concert.dateAndTime
  const date = dateStr ? new Date(dateStr) : null
  const detailUrl = `/${concert.slug}`

  // Logika pro unikátní autory (aby se Mozart neopakoval)
  const uniqueComposers = concert.program?.reduce((acc: any[], current: any) => {
    const isDuplicate = acc.find(item => item.composer === current.composer);
    if (!isDuplicate) {
      return acc.concat([current]);
    }
    return acc;
  }, []) || [];

  return (
    <div className="group bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md hover:border-blue-300 transition-all flex flex-col md:flex-row">
      {/* Plakát */}
      <Link href={detailUrl} className="relative w-full md:w-56 h-48 md:h-auto bg-slate-100 flex-shrink-0 overflow-hidden block">
        {concert.poster ? (
          <img src={concert.poster} alt={concert.title} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <div className="flex items-center justify-center h-full text-slate-300 bg-slate-50">
            <Music size={40} strokeWidth={1.5} />
          </div>
        )}
      </Link>

      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          {date && (
            <div className="flex items-center gap-2 text-sm text-blue-600 font-bold mb-2 uppercase tracking-wide">
              <Calendar size={14} />
              {date.toLocaleDateString('cs-CZ', { day: 'numeric', month: 'long', year: 'numeric' })}
            </div>
          )}

          <Link href={detailUrl}>
            <h3 className="text-2xl font-extrabold text-slate-900 mb-2 group-hover:text-blue-700 transition-colors">
              {concert.title}
            </h3>
          </Link>

          {concert.location && (
            <div className="flex items-center gap-2 text-slate-600 mb-4 text-sm font-medium">
              <MapPin size={16} className="text-slate-400" />
              {concert.location}
            </div>
          )}

          {/* Program: Seznam autorů */}
          {uniqueComposers.length > 0 && (
            <div className="mt-4 pt-4 border-t border-slate-100">
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-blue-600 mr-1">Na programu:</span>
                {uniqueComposers.map((c: any, idx: number) => (
                  <span key={idx} className="text-sm text-slate-600 flex items-center gap-1.5">
                    <span className="font-medium">{c.composer}</span>
                    {c.hasBio && (
                      <Link href={`/lide/${c.composerSlug}`} className="px-1 py-0.5 bg-slate-100 text-slate-500 rounded text-[8px] font-bold uppercase hover:bg-blue-600 hover:text-white transition-colors">
                        Bio
                      </Link>
                    )}
                    {idx < uniqueComposers.length - 1 && <span className="text-slate-300">,</span>}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        <Link href={detailUrl} className="mt-6 inline-flex items-center text-sm font-bold text-blue-600 hover:translate-x-1 transition-transform">
          Více o koncertu <ChevronRight size={16} />
        </Link>
      </div>
    </div>
  )
}