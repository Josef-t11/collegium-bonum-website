import { CalendarIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
	name: 'internalEvent',
	title: 'Interní akce',
	type: 'document',
	icon: CalendarIcon,
	fields: [
		defineField({ name: 'title', title: 'Název akce', type: 'string', validation: Rule => Rule.required() }),
		defineField({ name: 'date', title: 'Datum konání', type: 'datetime' }),
		defineField({ name: 'location', title: 'Místo', type: 'string' }),
	],
})