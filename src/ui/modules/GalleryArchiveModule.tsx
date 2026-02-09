// src/ui/modules/GalleryArchiveModule.tsx
import Link from 'next/link'
import Image from 'next/image'
import { Calendar, Camera } from 'lucide-react'

export default function GalleryArchiveModule({ title, allGalleries }: any) {
	return (
		<section className="py-20 bg-white">
			<div className="max-w-6xl mx-auto px-6">
				{title && (
					<h2 className="text-3xl md:text-5xl font-black mb-12 text-slate-900">{title}</h2>
				)}

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{allGalleries?.map((gallery: any) => (
						<Link
							key={gallery._id}
							href={`/fotogalerie/${gallery.slug}`}
							className="group block"
						>
							<div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 mb-4 shadow-sm group-hover:shadow-xl transition-all duration-500">
								{gallery.mainImage ? (
									<Image
										src={gallery.mainImage}
										alt={gallery.title}
										fill
										className="object-cover transition-transform duration-700 group-hover:scale-110"
									/>
								) : (
									<div className="flex items-center justify-center h-full text-slate-300">
										<Camera size={48} strokeWidth={1} />
									</div>
								)}
								{/* Počet fotek v rohu */}
								<div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5">
									<Camera size={12} />
									{gallery.imageCount || 0}
								</div>
							</div>

							<h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
								{gallery.title}
							</h3>

							{gallery.date && (
								<div className="flex items-center gap-1.5 text-slate-500 text-sm mt-1">
									<Calendar size={14} />
									{new Date(gallery.date).toLocaleDateString('cs-CZ', { year: 'numeric', month: 'long' })}
								</div>
							)}
						</Link>
					))}
				</div>
			</div>
		</section>
	)
}