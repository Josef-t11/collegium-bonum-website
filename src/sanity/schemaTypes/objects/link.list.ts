import { defineField, defineType } from 'sanity'
import { VscLayers } from 'react-icons/vsc'
import { count } from '@/lib/utils'

export default defineType({
	name: 'link.list',
	title: 'Seznam odkazů (Podmenu)',
	icon: VscLayers,
	type: 'object',
	fields: [
		defineField({
			name: 'label',
			title: 'Název v menu',
			type: 'string',
			description: 'Např. "O sboru"',
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'link',
			title: 'Hlavní odkaz (volitelný)',
			type: 'link',
			description: 'Pokud chcete, aby i samotný název byl klikací.',
		}),
		defineField({
			name: 'links',
			title: 'Položky podmenu',
			type: 'array',
			of: [{ type: 'link' }],
			validation: (Rule) => Rule.required().min(1),
		}),
	],
	preview: {
		select: {
			title: 'label',
			link: 'link',
			links: 'links',
		},
		prepare: ({ title, link, links }) => {
			// Bezpečné určení titulku pro zobrazení v Sanity Studiu
			const displayTitle = title || link?.label || link?.internal?.title || 'Nové podmenu';

			return {
				title: displayTitle,
				// Použijeme vaši funkci count pro konzistentní vzhled v adminu
				subtitle: count(links, 'link'),
				media: VscLayers,
			}
		},
	},
})