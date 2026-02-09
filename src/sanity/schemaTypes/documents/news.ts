import { Newspaper } from 'lucide-react'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'news',
  title: 'Aktuality',
  type: 'document',
  icon: Newspaper,
  fields: [
    defineField({
      name: 'title',
      title: 'Titulek',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL identifikátor',
      type: 'slug',
      options: { source: 'title' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'publishDate', // Změněno z publishedAt na publishDate
      title: 'Datum zveřejnění',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Stručný výtah',
      type: 'text',
      rows: 2,
      description: 'Zobrazí se v seznamu novinek.',
    }),
    defineField({
      name: 'content',
      title: 'Obsah',
      type: 'array',
      of: [{ type: 'block' }, { type: 'image' }],
    }),
  ],
})