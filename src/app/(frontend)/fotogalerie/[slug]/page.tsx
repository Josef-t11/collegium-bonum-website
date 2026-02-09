// src/app/(frontend)/fotogalerie/[slug]/page.tsx
import { client } from '@/sanity/lib/client'
import { SINGLE_GALLERY_QUERY } from '@/sanity/lib/queries'
import { notFound } from 'next/navigation'
import GalleryModule from '@/ui/modules/GalleryModule'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'

export default async function GalleryDetailPage({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params

	// Načtení dat jedné galerie ze Sanity
	const gallery = await client.fetch(SINGLE_GALLERY_QUERY, { slug: slug || "" })

	if (!gallery) {
		return notFound()
	}

	return (
		<main className="min-h-screen bg-white">
			<div className="max-w-7xl mx-auto px-6 py-8">
				<Link href="/fotogalerie" className="text-blue-600 flex items-center gap-2 mb-8 hover:underline font-bold">
					<ChevronLeft size={16} /> Zpět do archivu fotogalerií
				</Link>
				<h1 className="text-4xl md:text-6xl font-black mb-12 text-slate-900">{gallery.title}</h1>

				{/* Zobrazení fotek */}
				<GalleryModule images={gallery.images} />
			</div>
		</main>
	)
}