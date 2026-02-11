// src/app/(frontend)/lide/[slug]/page.tsx

import { client } from '@/sanity/lib/client'
import { groq } from 'next-sanity'
import { notFound } from 'next/navigation'
import { Img } from '@/ui/Img' // Import vaší existující komponenty pro obrázky
import PortableTextComponent from '@/components/PortableTextComponent' // Import vaší komponenty pro text

// Definice typů pro Next.js 15
interface PersonPageProps {
	params: Promise<{ slug: string }>
}

export default async function PersonProfile({ params }: PersonPageProps) {
	// 1. V Next.js 15 musíme params "awaitovat"
	const { slug } = await params;

	// 2. Fetch dat ze Sanity
	const person = await client.fetch(
		groq`*[_type == "person" && slug.current == $slug][0]{
      name,
      role,
      image,
      bio,
      website
    }`,
		{ slug }
	);

	// 3. Ochrana: Pokud člověk neexistuje nebo nemá biografii, hodíme 404
	if (!person || !person.bio) {
		return notFound();
	}

	return (
		<article className="min-h-screen bg-white">
			<div className="max-w-4xl mx-auto px-6 py-20">
				<div className="flex flex-col md:flex-row gap-12 items-start">

					{/* Portrét autora */}
					<div className="w-full md:w-1/3 sticky top-24">
						{person.image ? (
							<div className="rounded-2xl overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500 aspect-square md:aspect-[4/5]">
								<Img
									image={person.image}
									className="w-full h-full object-cover"
									alt={person.name}
								/>
							</div>
						) : (
							<div className="w-full aspect-square bg-slate-100 rounded-2xl flex items-center justify-center text-slate-300">
								<span className="text-sm font-bold uppercase tracking-widest">Bez fotky</span>
							</div>
						)}

						{/* Odkaz na web, pokud existuje */}
						{person.website && (
							<a
								href={person.website}
								target="_blank"
								rel="noopener noreferrer"
								className="mt-6 inline-block text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors"
							>
								Oficiální stránky →
							</a>
						)}
					</div>

					{/* Text biografie */}
					<div className="w-full md:w-2/3">
						<header className="mb-8">
							<h1 className="text-5xl font-black text-slate-900 mb-2 tracking-tight">
								{person.name}
							</h1>
							{person.role && (
								<p className="text-xl text-blue-600 font-bold uppercase tracking-widest">
									{person.role}
								</p>
							)}
						</header>

						<div className="prose prose-lg prose-slate max-w-none">
							<PortableTextComponent value={person.bio} />
						</div>
					</div>

				</div>
			</div>
		</article>
	);
}

// Metadata pro SEO (Senior bonus)
export async function generateMetadata({ params }: PersonPageProps) {
	const { slug } = await params;
	const person = await client.fetch(groq`*[_type == "person" && slug.current == $slug][0]{name, role}`, { slug });

	if (!person) return { title: 'Osoba nenalezena' };

	return {
		title: `${person.name} | Collegium Bonum`,
		description: `Biografie a profil autora: ${person.name} (${person.role})`
	};
}