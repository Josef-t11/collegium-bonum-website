import { auth } from "@/auth"
import { client } from "@/sanity/lib/client"
import { UPCOMING_REHEARSALS_QUERY, DASHBOARD_TASKS_QUERY } from "@/sanity/lib/queries"
import { Calendar, Music, FileText, Clock, MapPin, AlertCircle, ClipboardCheck, ChevronRight, CheckCircle2, Circle } from "lucide-react"
import Link from "next/link"

export const dynamic = 'force-dynamic'

export default async function InterniDashboard() {
  const session = await auth()

  // Paralelní načítání dat (Ops: efektivnější než sekvenční await)
  const [rehearsals, tasks] = await Promise.all([
    client.fetch(UPCOMING_REHEARSALS_QUERY),
    client.fetch(DASHBOARD_TASKS_QUERY)
  ])

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <header className="mb-12">
        <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-2">
          Ahoj, {session?.user?.name?.split(' ')[0] || 'člene'}! 👋
        </h1>
        <p className="text-slate-500 text-lg">Sekce pro členy Collegium Bonum.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* LEVÝ SLOUPEC: KALENDÁŘ A ÚKOLY */}
        <div className="lg:col-span-2 space-y-8">

          {/* ZKOUŠKY */}
          <section className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
            <h2 className="text-xl font-bold flex items-center gap-2 mb-6">
              <Calendar className="text-blue-600" size={24} />
              Nejbližší zkoušky
            </h2>
            <div className="space-y-4">
              {rehearsals?.length > 0 ? (
                rehearsals.map((r: any) => {
                  const date = new Date(r.dateAndTime)
                  return (
                    <div key={r._id} className={`flex items-center justify-between p-4 rounded-2xl border ${r.isCancelled ? 'bg-red-50 border-red-100 opacity-60' : 'bg-slate-50 border-slate-100'}`}>
                      <div className="flex items-center gap-4">
                        <div className="text-center min-w-[50px]">
                          <span className="block text-xs uppercase font-black text-blue-600">{date.toLocaleDateString('cs-CZ', { weekday: 'short' })}</span>
                          <span className="text-xl font-black text-slate-900">{date.getDate()}.</span>
                        </div>
                        <div>
                          <p className="font-bold text-slate-900">{r.title || 'Zkouška sboru'}</p>
                          <p className="text-xs text-slate-500 flex items-center gap-1">
                            <Clock size={12} /> {date.toLocaleTimeString('cs-CZ', { hour: '2-digit', minute: '2-digit' })} • <MapPin size={12} /> {r.location}
                          </p>
                        </div>
                      </div>
                      {r.isCancelled && <span className="text-[10px] font-black bg-red-600 text-white px-2 py-1 rounded uppercase">Zrušeno</span>}
                    </div>
                  )
                })
              ) : <p className="text-slate-400 italic">Žádné plánované zkoušky.</p>}
            </div>
          </section>

          {/* ORGANIZACE / ÚKOLY (NOVINKA) */}
          <section className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <ClipboardCheck className="text-blue-600" size={24} />
                Organizace akcí
              </h2>
              <Link href="/interni/ukoly" className="text-sm font-bold text-blue-600 hover:underline flex items-center gap-1">
                Všechny úkoly <ChevronRight size={14} />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {tasks?.length > 0 ? (
                tasks.map((list: any) => (
                  <div key={list._id} className="border border-slate-100 rounded-2xl p-5 bg-slate-50/50 hover:bg-white hover:shadow-md transition-all">
                    <h3 className="font-bold text-slate-900 mb-1">{list.title}</h3>
                    <p className="text-[10px] uppercase font-black text-slate-400 mb-4">{list.eventName}</p>

                    <div className="space-y-2">
                      {list.items?.map((item: any) => (
                        <div key={item._key} className="flex items-start gap-2 text-sm">
                          {item.isCompleted ? <CheckCircle2 size={16} className="text-green-500 mt-0.5" /> : <Circle size={16} className="text-slate-300 mt-0.5" />}
                          <span className={item.isCompleted ? 'text-slate-400 line-through' : 'text-slate-700'}>{item.label}</span>
                        </div>
                      ))}
                      {list.totalItems > 3 && (
                        <p className="text-xs text-blue-600 font-bold pt-2">+ dalších {list.totalItems - 3} položek</p>
                      )}
                    </div>
                  </div>
                ))
              ) : <p className="text-slate-400 italic">Žádné aktivní úkoly k akcím.</p>}
            </div>
          </section>
        </div>

        {/* PRAVÝ SLOUPEC: RYCHLÉ ODKAZY */}
        <div className="space-y-6">
          <section className="bg-slate-900 text-white rounded-3xl p-8">
            <h2 className="text-xl font-bold mb-6">Materiály</h2>
            <nav className="flex flex-col gap-3">
              <Link href="/interni/noty" className="flex items-center justify-between p-4 bg-white/10 hover:bg-white/20 rounded-2xl transition-colors group">
                <div className="flex items-center gap-3">
                  <FileText size={20} className="text-blue-400" />
                  <span className="font-bold">Archiv not</span>
                </div>
                <ChevronRight size={18} className="text-slate-500 group-hover:text-white" />
              </Link>
              <Link href="/repertoar" className="flex items-center justify-between p-4 bg-white/10 hover:bg-white/20 rounded-2xl transition-colors group">
                <div className="flex items-center gap-3">
                  <Music size={20} className="text-blue-400" />
                  <span className="font-bold">Repertoár</span>
                </div>
                <ChevronRight size={18} className="text-slate-500 group-hover:text-white" />
              </Link>
            </nav>
          </section>

          <div className="bg-amber-50 border border-amber-100 rounded-3xl p-6">
            <h3 className="text-amber-900 font-bold mb-2 flex items-center gap-2">
              <AlertCircle size={18} /> Tip pro zkoušku
            </h3>
            <p className="text-amber-800 text-sm leading-relaxed">
              Dnes se zaměříme na detaily v Mozartově Requiem. Nezapomeňte si vzít tužky na poznámky!
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}