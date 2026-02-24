import { defineField, defineType } from 'sanity'
import { Calendar } from 'lucide-react'

export default defineType({
	name: 'rehearsal',
	title: 'Termíny zkoušek a akcí',
	type: 'document',
	icon: Calendar,
	fields: [
		defineField({
			name: 'title',
			title: 'Název akce',
			type: 'string',
			initialValue: 'Pravidelná zkouška',
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'dateAndTime',
			title: 'Datum a čas začátku',
			type: 'datetime',
			options: {
				dateFormat: 'YYYY-MM-DD',
				timeFormat: 'HH:mm',
				timeStep: 15,
			},
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'location',
			title: 'Místo konání',
			type: 'string',
			initialValue: 'Zkušebna sboru',
		}),
		defineField({
			name: 'notes',
			title: 'Poznámka / Co vzít s sebou',
			type: 'text',
			rows: 2,
		}),
		defineField({
			name: 'isCancelled',
			title: 'ZRUŠENO?',
			description: 'Zaškrtněte, pokud zkouška odpadá. V kalendáři se zobrazí výrazné varování.',
			type: 'boolean',
			initialValue: false,
		}),
	],
	preview: {
		select: { title: 'title', subtitle: 'dateAndTime' },
		prepare({ title, subtitle }) {
			return {
				title,
				subtitle: subtitle ? new Date(subtitle).toLocaleString('cs-CZ') : 'Termín neurčen'
			}
		}
	}
})