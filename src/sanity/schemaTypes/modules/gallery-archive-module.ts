// src/sanity/schemaTypes/modules/gallery-archive-module.ts
import { ProjectsIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
	name: 'gallery-archive-module',
	title: 'Rozcestník fotogalerií (Archiv)',
	type: 'object',
	icon: ProjectsIcon,
	fields: [
		defineField({
			name: 'title',
			title: 'Nadpis sekce',
			type: 'string',
			initialValue: 'Naše fotogalerie',
		}),
		defineField({
			name: 'intro',
			title: 'Úvodní text',
			type: 'text',
			rows: 3,
			description: 'Krátký popis archivu (volitelné).',
		}),
	],
	preview: {
		select: {
			title: 'title',
		},
		prepare({ title }) {
			return {
				title: title || 'Archiv fotogalerií',
				subtitle: 'Zobrazí seznam všech vytvořených galerií',
				media: ProjectsIcon,
			}
		},
	},
})