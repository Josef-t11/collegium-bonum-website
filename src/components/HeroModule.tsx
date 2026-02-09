// src/components/HeroModule.tsx

// Měníme import na vaši existující funkci 'urlFor'
import { urlFor } from '@/sanity/lib/image';
import Link from 'next/link';

interface HeroModuleProps {
	// Používáme globální typ, který jsme definovali
	data: Sanity.HeroModule;
}

export default function HeroModule({ data }: HeroModuleProps) {
	// Používáme vaši funkci 'urlFor'
	const imageUrl = data.image ? urlFor(data.image).url() : '';
	const ctaPath = data.cta?.link?.internal?.metadata?.slug.current || data.cta?.link?.external || '#';

	return (
		<div className="relative bg-gray-900 overflow-hidden">
			{/* Obrázek na pozadí */}
			{imageUrl && (
				<img
					src={imageUrl}
					alt={data.title}
					className="absolute inset-0 h-full w-full object-cover opacity-50"
				/>
			)}

			{/* Obsah modulu */}
			<div className="relative max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:py-32 lg:px-8">
				<h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
					{data.title}
				</h1>
				{data.subtitle && (
					<p className="mt-6 max-w-lg text-xl text-gray-300">
						{data.subtitle}
					</p>
				)}
				{data.cta?.link?.label && (
					<div className="mt-10">
						<Link
							href={ctaPath}
							className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
						>
							{data.cta.link.label}
						</Link>
					</div>
				)}
			</div>
		</div>
	);
}
