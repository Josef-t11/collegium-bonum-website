// src/sanity/schemas/documents/concert.ts
import { CalendarDays } from 'lucide-react'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'concert',
  title: 'Koncerty',
  type: 'document',
  icon: CalendarDays,
  fields: [
    defineField({
      name: 'title',
      title: 'Název koncertu',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL Identifikátor',
      type: 'slug',
      options: { source: 'title' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'dateAndTime', // Změněno z 'date' na 'dateAndTime'
      title: 'Datum a čas',
      type: 'datetime',
      options: {
        dateFormat: 'YYYY-MM-DD',
        timeFormat: 'HH:mm',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Místo konání',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Popis koncertu',
      type: 'array',
      of: [{ type: 'block' }], // Standard Sanity Rich Text
    }),
    defineField({
      name: 'posterImage',
      title: 'Plakát / Obrázek',
      type: 'image',
      options: { hotspot: true },
    }),
    // V souboru concert.ts upravte pole program takto:
    defineField({
      name: 'program',
      title: 'Program koncertu',
      description: 'Vyberte skladby z Repertoáru',
      type: 'array',
      // TADY JE TA ZMĚNA: místo {type: 'string'} dejte toto:
      of: [{
        type: 'reference',
        to: [{ type: 'musicPiece' }]
      }],
    }),
    defineField({
      name: 'isPublic',
      title: 'Zveřejnit?',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      date: 'dateAndTime', // Změněno z 'date' na 'dateAndTime'
      media: 'posterImage',
    },
    prepare({ title, date, media }) {
      return {
        title,
        subtitle: date
          ? new Date(date).toLocaleDateString('cs-CZ')
          : 'Bez data',
        media,
      }
    },
  },
})