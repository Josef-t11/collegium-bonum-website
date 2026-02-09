// src/components/ConcertLayout.tsx

import PortableTextComponent from './PortableTextComponent'
import Link from 'next/link'
import { Calendar, MapPin, ChevronLeft, Music } from 'lucide-react'

interface ConcertLayoutProps {
	data: Sanity.Concert
}

export default function ConcertLayout({ data }: ConcertLayoutProps) {
	// Bezpečné formátování data a času
	const date = data.dateAndTime ? new Date(data.dateAndTime) : null
	const formattedDate = date
		? date.toLocaleString('cs-CZ', { dateStyle: 'long', timeStyle: 'short' })
		: 'Termín bude upřesněn'

	return (
		<article className="min-h-screen bg-white">
			{/* Horní navigace / Zpět */}
			<div className="max-w-4xl mx-auto px-6 pt-8">
				<Link
					href="/koncerty"
					className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors group"
				>
					<ChevronLeft size={16} className="mr-1 group-hover:-translate-x-1 transition-transform" />
					Zpět na přehled koncertů
				</Link>
			</div>

			<div className="max-w-4xl mx-auto px-6 py-12">
				<header className="mb-12">
					<h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight">
						{data.title}
					</h1>

					<div className="flex flex-wrap gap-y-4 gap-x-8 text-lg">
						{date && (
							<div className="flex items-center gap-2 text-blue-600 font-bold">
								<Calendar size={20} />
								<time dateTime={data.dateAndTime}>{formattedDate}</time>
							</div>
						)}
						{data.location && (
							<div className="flex items-center gap-2 text-slate-600">
								<MapPin size={20} className="text-slate-400" />
								<span>{data.location}</span>
							</div>
						)}
					</div>
				</header>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-12">
					{/* Levý sloupec: Text a Program */}
					<div className="md:col-span-2">
						{data.description ? (
							<div className="prose prose-lg prose-slate max-w-none mb-12">
								<PortableTextComponent value={data.description} />
							</div>
						) : (
							<p className="text-slate-500 italic mb-12">K tomuto koncertu zatím nemáme podrobnější popis.</p>
						)}

						{data.program && data.program.length > 0 && (
							<section className="bg-slate-50 border border-slate-100 p-8 rounded-2xl">
								<div className="flex items-center gap-2 mb-6">
									<Music className="text-blue-600" size={24} />
									<h2 className="text-2xl font-bold text-slate-900">Program koncertu</h2>
								</div>
								<ul className="divide-y divide-slate-200">
									{data.program.map((item: any) => (
										<li key={item._id} className="py-4 first:pt-0 last:pb-0">
											<p className="font-bold text-slate-900 text-lg">{item.title}</p>
											{/* Teď už víme, že composer je text, protože jsme ho v query ošetřili */}
											<p className="text-slate-500 font-medium">{item.composer}</p>
										</li>
									))}

								</ul>
							</section>
						)}
					</div>

					{/* Pravý sloupec: Plakát / Boční info */}
					<aside className="md:col-span-1">
						{data.poster ? (
							<div className="sticky top-8">
								<div className="rounded-2xl overflow-hidden shadow-2xl rotate-1 hover:rotate-0 transition-transform duration-500">
									<img
										src={data.poster}
										alt={`Plakát k akci: ${data.title}`}
										className="w-full h-auto"
									/>
								</div>
								{/* Zde by v budoucnu mohlo být tlačítko "Koupit vstupenky" nebo "Přidat do kalendáře" */}
							</div>
						) : (
							<div className="bg-slate-100 aspect-[3/4] rounded-2xl flex items-center justify-center text-slate-400">
								<Music size={48} strokeWidth={1} />
							</div>
						)}
					</aside>
				</div>
			</div>
		</article>
	)
}