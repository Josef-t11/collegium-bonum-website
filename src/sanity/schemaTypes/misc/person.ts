// src/sanity/schemaTypes/misc/person.ts
import { defineField, defineType } from 'sanity'
import { User, ShieldCheck, PenTool } from 'lucide-react'

export default defineType({
	name: 'person',
	title: 'Lidé a autoři',
	type: 'document',
	icon: User,
	groups: [
		{ name: 'public', title: 'Veřejný profil', icon: PenTool, default: true },
		{ name: 'internal', title: 'Interní přístup', icon: ShieldCheck },
	],
	fields: [
		// --- VEŘEJNÉ ÚDAJE ---
		defineField({
			name: 'name',
			title: 'Jméno a příjmení',
			type: 'string',
			group: 'public',
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'slug',
			type: 'slug',
			group: 'public',
			options: { source: 'name' },
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'role',
			title: 'Hlavní role (veřejná)',
			description: 'Např. Sbormistr, Skladatel, Klavírní doprovod',
			type: 'string',
			group: 'public',
		}),
		defineField({
			name: 'image',
			title: 'Portrét / Fotka',
			type: 'image',
			group: 'public',
			options: { hotspot: true },
		}),
		defineField({
			name: 'bio',
			title: 'Životopis / Biografie',
			description: 'Pokud je vyplněno, vytvoří se profilová stránka a link v programu.',
			type: 'array',
			group: 'public',
			of: [
				{
					type: 'block',
					marks: {
						annotations: [
							{
								name: 'link',
								type: 'object',
								title: 'Odkaz',
								fields: [
									{ name: 'href', type: 'url', title: 'URL' },
									{ name: 'blank', type: 'boolean', title: 'Nové okno', initialValue: true }
								]
							}
						]
					}
				},
				{ type: 'image' }
			],
		}),
		defineField({
			name: 'website',
			title: 'Externí odkaz (např. Wikipedie)',
			type: 'url',
			group: 'public',
		}),

		// --- INTERNÍ ÚDAJE (AUTH) ---
		defineField({
			name: 'email',
			title: 'Přihlašovací e-mail',
			description: 'Slouží pro Magic Link přihlášení do interní sekce.',
			type: 'string',
			group: 'internal',
			validation: (Rule) => Rule.email(),
		}),
		defineField({
			name: 'internalRole',
			title: 'Interní oprávnění',
			type: 'string',
			group: 'internal',
			options: {
				list: [
					{ title: 'Člen sboru (noty, termíny)', value: 'member' },
					{ title: 'Administrátor (správa uživatelů)', value: 'admin' },
				],
				layout: 'radio',
			},
			initialValue: 'member',
		}),
	],
	preview: {
		select: { title: 'name', subtitle: 'role', media: 'image' },
	},
})