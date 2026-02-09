// src/components/NewsLayout.tsx
import PortableTextComponent from './PortableTextComponent';

interface NewsLayoutProps {
	data: Sanity.News;
}

export default function NewsLayout({ data }: NewsLayoutProps) {
	// Ensure we handle cases where publishDate might be missing
	const formattedDate = data.publishDate ? new Date(data.publishDate).toLocaleDateString('cs-CZ', { dateStyle: 'long' }) : 'Datum neznámé';

	return (
		<article className="max-w-4xl mx-auto px-6 py-12">
			<header className="mb-8">
				<h1 className="text-4xl md:text-5xl font-black mb-4">{data.title}</h1>
				<div className="text-sm text-slate-500">
					Publikováno: {formattedDate}
					{/* Add author display here if desired */}
				</div>
			</header>

			{/* Ensure you have content array to pass to the PortableTextComponent */}
			{data.content && data.content.length > 0 && (
				<div className="prose prose-lg max-w-none">
					<PortableTextComponent value={data.content} />
				</div>
			)}
		</article>
	);
}
