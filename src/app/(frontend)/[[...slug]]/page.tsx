// src/app/(frontend)/[[...slug]]/page.tsx

import { client } from '@/sanity/lib/client'
import { notFound } from 'next/navigation'
import { PAGE_OR_CONCERT_QUERY } from '@/sanity/lib/queries'

import ConcertLayout from '@/components/ConcertLayout'
import NewsLayout from '@/components/NewsLayout'
import Modules from '@/ui/modules'

export const dynamic = 'force-dynamic';

type PageData =
	| (Sanity.Page & { _type: 'page' })
	| (Sanity.Concert & { _type: 'concert' })
	| (Sanity.News & { _type: 'news' });

interface DynamicPageProps {
	params: Promise<{ slug?: string[] }>
}

export default async function DynamicPage({ params }: DynamicPageProps) {
	const resolvedParams = await params;
	// Pokud slug chybí (jsme na homepage), Next.js pošle 'index'
	const slug = resolvedParams.slug?.join('/') || 'index'

	// --- DIAGNOSTIKA (Uvidíte v terminálu, kde běží npm run dev) ---
	console.log("-----------------------------------------");
	console.log("🔍 Hledám v Sanity slug:", slug);

	const data = await client.fetch<PageData | null>(
		PAGE_OR_CONCERT_QUERY,
		{ slug }
	);

	if (!data) {
		console.log("❌ Data pro tento slug nebyla nalezena (null)");
		console.log("-----------------------------------------");
		return notFound()
	}

	console.log("✅ Data nalezena, typ dokumentu:", data._type);
	console.log("-----------------------------------------");
	// ---------------------------------------------------------------

	if (data._type === 'concert' && data.isPublic === false) {
		return notFound()
	}

	switch (data._type) {
		case 'page':
			return (
				<main id="main-content">
					<Modules modules={data.modules} page={data} />
				</main>
			)

		case 'concert':
			return <ConcertLayout data={data} />

		case 'news':
			return <NewsLayout data={data} />

		default:
			return notFound()
	}
}