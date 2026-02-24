import { ClipboardIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
	name: 'eventTask',
	title: 'Úkoly a Info k akcím',
	type: 'document',
	icon: ClipboardIcon,
	fields: [
		defineField({
			name: 'title',
			title: 'Zadání / Informace',
			type: 'string',
			validation: Rule => Rule.required()
		}),
		defineField({
			name: 'type',
			title: 'Typ záznamu',
			type: 'string',
			options: {
				list: [
					{ title: 'Úkol (má zodpovědnou osobu)', value: 'task' },
					{ title: 'INFO (obecná informace bez řešitele)', value: 'info' }
				],
				layout: 'radio'
			},
			initialValue: 'task'
		}),
		defineField({
			name: 'isCompleted',
			title: 'Splněno?',
			type: 'boolean',
			initialValue: false,
			hidden: ({ document }) => document?.type === 'info'
		}),
		defineField({
			name: 'assignedTo',
			title: 'Zodpovědná osoba',
			type: 'reference',
			to: [{ type: 'person' }],
			hidden: ({ document }) => document?.type === 'info'
		}),
		defineField({
			name: 'relatedEvent',
			title: 'Ke které akci se to váže?',
			type: 'reference',
			to: [
				{ type: 'concert' },
				{ type: 'internalEvent' }
			],
			description: 'Zde vyberte koncert nebo soustředění'
		}),
		defineField({
			name: 'notes',
			title: 'Podrobnosti / Poznámky',
			type: 'text',
			rows: 3
		})
	],
	preview: {
		select: {
			title: 'title',
			type: 'type',
			isCompleted: 'isCompleted',
			eventTitle: 'relatedEvent.title'
		},
		prepare({ title, type, isCompleted, eventTitle }) {
			const status = type === 'info' ? 'ℹ️' : (isCompleted ? '✅' : '⏳')
			return {
				title: `${status} ${title}`,
				subtitle: eventTitle || 'Bez přiřazené akce'
			}
		}
	}
})
