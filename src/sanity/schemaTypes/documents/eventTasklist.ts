import { ClipboardIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
	name: 'eventTasklist',
	title: 'Tasklist k akci',
	type: 'document',
	icon: ClipboardIcon,
	fields: [
		defineField({
			name: 'title',
			title: 'Název seznamu',
			type: 'string',
			description: 'Např: Příprava Vánočního koncertu 2026',
			validation: Rule => Rule.required()
		}),
		defineField({
			name: 'relatedEvent',
			title: 'Přiřazená akce',
			type: 'reference',
			to: [{ type: 'concert' }, { type: 'internalEvent' }],
			validation: Rule => Rule.required()
		}),
		defineField({
			name: 'items',
			title: 'Úkoly a Informace',
			type: 'array',
			of: [{
				type: 'object',
				name: 'taskItem',
				fields: [
					{
						name: 'type',
						title: 'Typ',
						type: 'string',
						options: { list: ['Úkol', 'INFO'], layout: 'radio' },
						initialValue: 'Úkol'
					},
					{ name: 'label', title: 'Zadání / Info text', type: 'string' },
					{
						name: 'assignedTo',
						title: 'Odpovídá',
						type: 'reference',
						to: [{ type: 'person' }],
						hidden: ({ parent }) => parent?.type === 'INFO'
					},
					{
						name: 'isCompleted',
						title: 'Splněno',
						type: 'boolean',
						initialValue: false,
						hidden: ({ parent }) => parent?.type === 'INFO'
					},
					{ name: 'notes', title: 'Poznámka', type: 'string' }
				],
				preview: {
					select: { title: 'label', type: 'type', isCompleted: 'isCompleted' },
					prepare({ title, type, isCompleted }) {
						const icon = type === 'INFO' ? 'ℹ️' : (isCompleted ? '✅' : '⏳')
						return { title: `${icon} ${title}` }
					}
				}
			}]
		})
	]
})