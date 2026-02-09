import { defineField, defineType } from 'sanity'

export default defineType({
	name: 'site',
	title: 'Nastavení webu',
	type: 'document',
	groups: [
		{ name: 'branding', title: 'Vzhled', default: true },
		{ name: 'choir', title: 'Sborové údaje' }, // Nová skupina pro sbor
		{ name: 'navigation', title: 'Navigace' },
		{ name: 'info', title: 'Ostatní' },
	],
	fields: [
		// --- VZHLED (BRANDING) ---
		defineField({
			name: 'title',
			title: 'Název sboru',
			type: 'string',
			validation: (Rule) => Rule.required(),
			group: 'branding',
		}),
		defineField({
			name: 'logo',
			title: 'Logo sboru',
			type: 'image', // Použijeme standardní image pro jednoduchost
			options: { hotspot: true },
			group: 'branding',
		}),
		defineField({
			name: 'description',
			title: 'Krátké představení sboru',
			description: 'Tento text se zobrazí v patičce webu pod názvem.',
			type: 'text',
			rows: 2,
			group: 'branding',
		}),

		// --- SBOROVÉ ÚDAJE (CHOIR) ---
		defineField({
			name: 'address',
			title: 'Adresa / Sídlo',
			type: 'text',
			rows: 3,
			group: 'choir',
		}),
		defineField({
			name: 'email',
			title: 'Kontaktní e-mail',
			type: 'string',
			group: 'choir',
		}),
		defineField({
			name: 'phone',
			title: 'Telefon',
			type: 'string',
			group: 'choir',
		}),
		defineField({
			name: 'ico',
			title: 'IČO',
			type: 'string',
			group: 'choir',
		}),
		defineField({
			name: 'facebook',
			title: 'URL Facebooku',
			type: 'url',
			group: 'choir',
		}),

		// --- NAVIGACE ---
		defineField({
			name: 'headerMenu',
			title: 'Hlavní menu (Header)',
			type: 'reference',
			to: [{ type: 'navigation' }],
			group: 'navigation',
		}),
		defineField({
			name: 'footerMenu',
			title: 'Menu v patičce (Footer)',
			type: 'reference',
			to: [{ type: 'navigation' }],
			group: 'navigation',
		}),

		// --- OSTATNÍ (SYSTÉMOVÉ) ---
		defineField({
			name: 'copyright',
			title: 'Copyright text',
			type: 'array',
			of: [{ type: 'block', styles: [{ title: 'Normal', value: 'normal' }], lists: [] }],
			group: 'info',
		}),
	],
	preview: {
		prepare: () => ({
			title: 'Nastavení webu',
		}),
	},
})