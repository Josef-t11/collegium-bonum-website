import { client } from '@/sanity/lib/client';
import { groq } from 'next-sanity';
import ConcertCard from './ConcertCard'; // Using your existing component file
// ❌ REMOVE THIS INCORRECT IMPORT LINE:
// import { Concert } from '@/types/sanity'; 

// Use the existing query logic structure, but modify the query to use dateAndTime
const UPCOMING_CONCERTS_QUERY = groq`
  *[_type == "concert" && isPublic == true && dateAndTime >= now()] 
  | order(dateAndTime asc) {
    _id,
    title,
    "slug": slug.current,
    dateAndTime,
    location,
    "poster": posterImage.asset->url,
    // KLÍČOVÁ ČÁST:
    program[]->{
      _id,
      title,
      "authorName": author->name // Vytáhne jméno z propojené osoby
    }
  }
`;

// Update the fetch function to use the global type -> Sanity.Concert[]
export default async function ConcertList() {
	// Implement revalidation for caching (e.g., revalidate every hour for Ops)
	const concerts = await client.fetch<Sanity.Concert[]>(
		UPCOMING_CONCERTS_QUERY,
		{},
		{ next: { revalidate: 0 } }
	);
	if (concerts.length === 0) {
		return (
			<div className="max-w-6xl mx-auto px-6 py-12 text-center">
				<p className="text-xl text-slate-500">Momentálně nemáme naplánované žádné koncerty.</p>
			</div>
		);
	}

	return (
		<section className="max-w-6xl mx-auto px-6 py-12">
			<div className="grid md:grid-cols-1 gap-6">
				{/* We map the fetched data to your existing Card component */}
				{/* The ConcertCard component must also be updated to expect Sanity.Concert */}
				{concerts.map((concert) => (
					<ConcertCard key={concert._id} concert={concert} />
				))}
			</div>
		</section>
	);
}
