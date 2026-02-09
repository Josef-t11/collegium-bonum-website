import { BoltIcon } from '@sanity/icons' // Změna z ZapIcon
import { defineField, defineType } from 'sanity'

export default defineType({
	name: 'hero-module',
	title: 'Úvodní Hero Banner',
	type: 'object',
	icon: BoltIcon,
	fields: [
		defineField({
			name: 'title',
			title: 'Hlavní nadpis',
			type: 'string',
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'subtitle',
			title: 'Podnadpis',
			type: 'text',
			rows: 2,
		}),
		defineField({
			name: 'image',
			title: 'Obrázek na pozadí',
			type: 'image',
			options: { hotspot: true },
			fields: [
				{
					name: 'alt',
					type: 'string',
					title: 'Alternativní text',
				},
			],
		}),
		defineField({
			name: 'cta',
			title: 'Tlačítko (Akce)',
			type: 'cta', // Předpokládám, že máte definovaný objekt 'cta'
		}),
	],
	preview: {
		select: {
			title: 'title',
			media: 'image',
		},
		prepare({ title, media }) {
			return {
				title: title || 'Bez nadpisu',
				subtitle: 'Hero Modul',
				media,
			}
		},
	},
})