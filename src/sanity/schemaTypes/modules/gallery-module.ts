// src/sanity/schemaTypes/modules/gallery-module.ts
import { ImagesIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
	name: 'gallery-module',
	title: 'Fotogalerie',
	type: 'object',
	icon: ImagesIcon,
	fields: [
		defineField({
			name: 'title',
			title: 'Nadpis sekce',
			type: 'string',
			description: 'Např. "Fotogalerie z vánočního koncertu"',
		}),
		defineField({
			name: 'images',
			title: 'Fotografie',
			type: 'array',
			of: [
				{
					type: 'image',
					options: {
						hotspot: true, // Umožňuje sboristům vybrat střed zájmu
					},
					fields: [
						{
							name: 'caption',
							type: 'string',
							title: 'Popisek (volitelný)',
						},
						{
							name: 'alt',
							type: 'string',
							title: 'Alternativní text (pro nevidomé)',
							description: 'Popište stručně, co je na fotce.',
						},
					],
				},
			],
			options: {
				layout: 'grid', // V editoru se to bude zobrazovat jako mřížka, ne pod sebou
			},
		}),
	],
	preview: {
		select: {
			title: 'title',
			media: 'images.0', // Jako náhled v seznamu modulů se použije první fotka
		},
		prepare({ title, media }) {
			return {
				title: title || 'Fotogalerie (bez nadpisu)',
				subtitle: 'Modul fotogalerie',
				media,
			}
		},
	},
})