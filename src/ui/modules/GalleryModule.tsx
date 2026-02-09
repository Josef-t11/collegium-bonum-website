// src/ui/modules/GalleryModule.tsx
'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Lightbox from "yet-another-react-lightbox"
import "yet-another-react-lightbox/styles.css"

export default function GalleryModule({ title, images }: any) {
	const [index, setIndex] = useState(-1); // -1 znamená, že lightbox je zavřený

	if (!images || images.length === 0) return null

	// Příprava fotek pro Lightbox
	const slides = images.map((img: any) => ({
		src: img.url,
		alt: img.alt || img.caption || "",
		width: img.metadata?.dimensions?.width || 1200,
		height: img.metadata?.dimensions?.height || 800,
	}))

	return (
		<section className="py-20 bg-slate-50 block w-full clear-both">
			<div className="max-w-7xl mx-auto px-6">

				{title && (
					<h2 className="text-3xl md:text-5xl font-black mb-12 text-slate-900 tracking-tight block w-full">
						{title}
					</h2>
				)}

				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
					{images.map((image: any, idx: number) => {
						if (!image.url) return null;

						return (
							<div
								key={image._key || idx}
								className="group relative aspect-square overflow-hidden rounded-2xl bg-white shadow-sm hover:shadow-xl transition-all duration-500 border border-slate-100 cursor-zoom-in"
								onClick={() => setIndex(idx)} // Po kliknutí otevřeme Lightbox na daném indexu
							>
								<Image
									src={image.url}
									alt={image.alt || image.caption || `Fotografie ${idx + 1}`}
									fill
									sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
									className="object-cover transition-transform duration-700 group-hover:scale-110"
									placeholder={image.metadata?.lqip ? "blur" : "empty"}
									blurDataURL={image.metadata?.lqip}
								/>

								{image.caption && (
									<div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
										<p className="text-white text-sm font-medium">{image.caption}</p>
									</div>
								)}
							</div>
						)
					})}
				</div>

				{/* Komponenta Lightboxu */}
				<Lightbox
					index={index}
					open={index >= 0}
					close={() => setIndex(-1)}
					slides={slides}
				/>
			</div>
		</section>
	)
}