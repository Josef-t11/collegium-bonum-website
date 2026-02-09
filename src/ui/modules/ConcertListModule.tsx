// src/ui/modules/ConcertListModule.tsx

import React from 'react'
import ConcertCard from '@/components/ConcertCard'

interface ConcertListModuleProps {
	title?: string
	intro?: string
	concerts?: any[] // Data ze Sanity query
}

export default function ConcertListModule({ title, intro, concerts }: ConcertListModuleProps) {
	return (
		<section className="py-20 bg-white">
			<div className="max-w-6xl mx-auto px-6">
				{(title || intro) && (
					<div className="mb-12 max-w-2xl">
						{title && <h2 className="text-4xl font-black mb-4 text-slate-900">{title}</h2>}
						{intro && <p className="text-xl text-slate-600 leading-relaxed">{intro}</p>}
					</div>
				)}

				{concerts && concerts.length > 0 ? (
					<div className="grid grid-cols-1 gap-6">
						{concerts.map((concert) => (
							<ConcertCard key={concert._id} concert={concert} />
						))}
					</div>
				) : (
					<div className="bg-slate-50 rounded-xl p-12 text-center border-2 border-dashed border-slate-200">
						<p className="text-slate-500">Aktuálně neplánujeme žádné veřejné koncerty, ale brzy zveřejníme nové termíny.</p>
					</div>
				)}
			</div>
		</section>
	)
}