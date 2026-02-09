// src/sanity/schemaTypes/modules/concert-list-module.ts
import { defineField, defineType } from 'sanity'
import { CalendarDays } from 'lucide-react'

export default defineType({
	name: 'concert-list-module',
	title: 'Seznam koncertů',
	type: 'object', // Moduly jsou objekty
	icon: CalendarDays,
	fields: [
		defineField({
			name: 'title',
			title: 'Titulek sekce (Interní/nepovinný)',
			type: 'string',
			description: 'Např. "Naše nadcházející vystoupení" – zobrazí se nad seznamem.',
		}),
		defineField({
			name: 'filterType',
			title: 'Zobrazit koncerty',
			type: 'string',
			initialValue: 'upcoming',
			options: {
				list: [
					{ title: 'Nadcházející', value: 'upcoming' },
					{ title: 'Minulé', value: 'past' },
					{ title: 'Všechny', value: 'all' },
				],
			},
		}),
	],
	preview: {
		select: {
			title: 'title',
			filter: 'filterType'
		},
		prepare({ title, filter }) {
			const filterText = filter === 'upcoming' ? 'Nadcházející' : filter === 'past' ? 'Minulé' : 'Všechny';
			return {
				title: title || 'Seznam koncertů',
				subtitle: `Typ: ${filterText}`
			}
		}
	}
})
