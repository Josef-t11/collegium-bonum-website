// src/ui/modules/Hero.tsx
import React from 'react'

interface HeroProps {
	title: string
	subtitle?: string
	image?: any
	cta?: {
		link?: {
			label?: string
			external?: string
			params?: string
		}
	}
}

export default function Hero({ title, subtitle, image, cta }: HeroProps) {
	// 1. Získání URL obrázku (podpora pro namapovaný string z GROQ i Sanity objekt)
	const imageUrl = typeof image === 'string' ? image : image?.asset?.url

	return (
		<section className="relative h-[70vh] min-h-[500px] w-full overflow-hidden bg-slate-900 flex items-center">
			{/* Obrázek na pozadí */}
			{imageUrl && (
				<div className="absolute inset-0 z-0">
					<img
						src={imageUrl}
						alt={title || 'Background'}
						loading="eager"
						className="h-full w-full object-cover opacity-60"
					/>
					{/* Gradient pro čitelnost textu */}
					<div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/40 to-transparent" />
				</div>
			)}

			{/* Obsah - Bílý text na tmavém podkladu */}
			<div className="container mx-auto px-6 relative z-10 text-white max-w-4xl">
				<h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6 leading-[1.1]">
					{title}
				</h1>

				{subtitle && (
					<p className="text-xl md:text-2xl text-slate-200 mb-8 max-w-2xl leading-relaxed">
						{subtitle}
					</p>
				)}

				{/* Tlačítko (CTA) */}
				{cta?.link?.label && (
					<a
						href={cta.link.external || cta.link.params || '#'}
						className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-bold text-lg transition-all shadow-lg hover:scale-105 active:scale-95"
					>
						{cta.link.label}
					</a>
				)}
			</div>
		</section>
	)
}