// src/sanity/schemaTypes/documents/gallery.ts
import { ImagesIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
	name: 'gallery',
	title: 'Fotogalerie (jednotlivé akce)',
	type: 'document',
	icon: ImagesIcon,
	fields: [
		defineField({
			name: 'isPublic',
			title: 'Veřejná galerie?',
			type: 'boolean',
			initialValue: false, // Bezpečnější výchozí stav
		}),
		defineField({
			name: 'title',
			title: 'Název akce',
			type: 'string',
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'slug',
			title: 'URL adresa',
			type: 'slug',
			options: { source: 'title' },
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'date',
			title: 'Datum akce',
			type: 'date',
			description: 'Důležité pro řazení v archivu',
		}),
		defineField({
			name: 'mainImage',
			title: 'Náhledový obrázek',
			type: 'image',
			options: { hotspot: true },
		}),
		defineField({
			name: 'images',
			title: 'Fotografie',
			type: 'array',
			of: [
				{
					type: 'image',
					options: { hotspot: true },
					fields: [
						{ name: 'caption', type: 'string', title: 'Popisek' }
					]
				}
			]
		}),
	],
})