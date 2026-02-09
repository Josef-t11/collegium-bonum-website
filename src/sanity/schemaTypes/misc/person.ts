import { defineField, defineType } from 'sanity'
import { GoPerson } from 'react-icons/go'

export default defineType({
	name: 'person',
	title: 'Lidé a autoři',
	type: 'document',
	icon: GoPerson,
	fields: [
		defineField({
			name: 'name',
			title: 'Jméno a příjmení',
			type: 'string',
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'role',
			title: 'Hlavní role',
			description: 'Zobrazí se pod jménem (např. Sbormistr, Skladatel, Klavírní doprovod)',
			type: 'string',
		}),
		defineField({
			name: 'slug',
			type: 'slug',
			options: { source: 'name' },
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'image',
			title: 'Portrét / Fotka',
			type: 'image',
			options: { hotspot: true },
		}),
		defineField({
			name: 'website',
			title: 'Osobní web / Odkaz',
			description: 'Např. odkaz na Wikipedii nebo oficiální stránky umělce',
			type: 'url',
		}),
		defineField({
			name: 'bio',
			title: 'Životopis / Biografie',
			type: 'array',
			of: [
				{
					type: 'block',
					// Zde definujeme, co uživatel může v textu dělat
					marks: {
						annotations: [
							{
								name: 'link',
								type: 'object',
								title: 'Externí odkaz',
								fields: [
									{
										name: 'href',
										type: 'url',
										title: 'URL',
										validation: Rule => Rule.uri({
											scheme: ['http', 'https', 'mailto', 'tel']
										})
									},
									{
										title: 'Otevřít v novém okně',
										name: 'blank',
										type: 'boolean',
										initialValue: true
									}
								]
							}
						]
					}
				},
				{ type: 'image' }
			],
		}),
	],
	preview: {
		select: {
			title: 'name',
			subtitle: 'role',
			media: 'image',
		},
	},
})