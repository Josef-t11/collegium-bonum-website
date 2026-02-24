// src/app/(frontend)/[[...slug]]/page.tsx

import { Metadata } from 'next'
import { client } from '@/sanity/lib/client'
import { notFound } from 'next/navigation'
import { PAGE_OR_CONCERT_QUERY } from '@/sanity/lib/queries'
import processMetadata from '@/lib/processMetadata' // Import tvé existující funkce

import ConcertLayout from '@/components/ConcertLayout'
import NewsLayout from '@/components/NewsLayout'
import Modules from '@/ui/modules'

export const dynamic = 'force-dynamic';

type PageData =
	| (Sanity.Page & { _type: 'page' })
	| (Sanity.Concert & { _type: 'concert' })
	| (Sanity.News & { _type: 'news' });

interface Props {
	params: Promise<{ slug?: string[] }>
}

interface DynamicPageProps {
	params: Promise<{ slug?: string[] }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const resolvedParams = await params
	const slug = resolvedParams.slug?.join('/') || 'index'

	const data = await client.fetch<any>(PAGE_OR_CONCERT_QUERY, { slug })

	// Pokud data nemáme, Next.js použije výchozí metadata z root layoutu
	if (!data || !data.metadata) return {}

	// Voláme tvůj existující procesor
	return processMetadata(data)
}


// --- RENDER STRÁNKY ---
export default async function DynamicPage({ params }: Props) {
	const resolvedParams = await params
	const slug = resolvedParams.slug?.join('/') || 'index'

	const data = await client.fetch<any>(PAGE_OR_CONCERT_QUERY, { slug })

	if (!data) return notFound()

	// Ochrana soukromých koncertů (Ops: raději 404 než leak dat)
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