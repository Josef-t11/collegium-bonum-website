// src/sanity/schemaTypes/documents/sheetMusic.ts
import { defineField, defineType } from 'sanity'
import { Music } from 'lucide-react'

export default defineType({
	name: 'sheetMusic',
	title: 'Sborové noty',
	type: 'document',
	icon: Music,
	fields: [
		defineField({
			name: 'title',
			title: 'Název skladby',
			type: 'string',
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'composer',
			title: 'Skladatel',
			type: 'string',
		}),
		defineField({
			name: 'category',
			title: 'Kategorie',
			type: 'string',
			options: {
				list: [
					{ title: 'Sakrální', value: 'sacred' },
					{ title: 'Světská', value: 'secular' },
					{ title: 'Vánoční', value: 'christmas' },
					{ title: 'Ostatní', value: 'other' },
				],
			},
		}),
		defineField({
			name: 'file',
			title: 'Soubor s notami (PDF)',
			type: 'file',
			options: { accept: '.pdf,image/*' },
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'isPublic',
			title: 'Veřejně dostupné?',
			description: 'Pokud zaškrtnete, noty uvidí i nepřihlášení návštěvníci (pozor na autorská práva!).',
			type: 'boolean',
			initialValue: false,
		}),
	],
})