import { Music } from 'lucide-react'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'musicPiece',
  title: 'Repertoár',
  type: 'document',
  icon: Music,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Název skladby',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'author',
      title: 'Autor / Skladatel',
      description: 'Vyberte autora ze seznamu Osob. Pokud tam není, nejdříve ho vytvořte v sekci Person.',
      type: 'reference',
      to: [{ type: 'person' }],
    }),
    defineField({
      name: 'category',
      type: 'string',
      title: 'Kategorie',
      options: {
        list: [
          { title: 'Duchovní hudba', value: 'sacred' },
          { title: 'Lidové písně', value: 'folk' },
          { title: 'Vánoční', value: 'christmas' },
          { title: 'Ostatní', value: 'other' }
        ]
      }
    }),
    // --- TERMÍNY (INTERNÍ A EXTERNÍ) ---
    defineField({
      name: 'startedPracticingAt',
      type: 'date',
      title: 'Začali jsme trénovat',
      description: 'Kdy se skladba poprvé objevila na zkoušce (pro interní přehled).',
      options: {
        dateFormat: 'MM-YYYY',
      }
    }),
    defineField({
      name: 'learnedAt',
      type: 'date',
      title: 'Kdy jsme se skladbu naučili',
      description: 'Měsíc a rok, kdy byla skladba "hotová" (MM/YYYY).',
      options: {
        dateFormat: 'MM-YYYY',
      }
    }),
    defineField({
      name: 'description',
      title: 'Poznámka',
      type: 'text',
      rows: 3,
      description: 'Interní poznámka ke skladbě (nepovinné).'
    }),
  ],
  orderings: [
    {
      title: 'Podle data naučení (Sestupně)',
      name: 'learnedAtDesc',
      by: [{ field: 'learnedAt', direction: 'desc' }]
    },
    {
      title: 'Podle začátku nácviku (Sestupně)',
      name: 'startedDesc',
      by: [{ field: 'startedPracticingAt', direction: 'desc' }]
    },
    {
      title: 'Podle názvu (A-Z)',
      name: 'titleAsc',
      by: [{ field: 'title', direction: 'asc' }]
    }
  ],
  preview: {
    select: {
      title: 'title',
      // TADY JE TA ZMĚNA: Použijeme cestu k jménu skrze referenci author
      authorName: 'author.name',
      learnedDate: 'learnedAt',
      startedDate: 'startedPracticingAt'
    },
    prepare({ title, authorName, learnedDate, startedDate }) {
      const learnedYear = learnedDate ? new Date(learnedDate).getFullYear() : null;
      const startedYear = startedDate ? new Date(startedDate).getFullYear() : null;

      let status = '';
      if (learnedDate) {
        status = `✅ ${learnedYear}`;
      } else if (startedDate) {
        status = `⏳ od ${startedYear}`;
      }

      return {
        title,
        // Pokud authorName existuje (protože je vybraný autor), použije se. 
        // Jinak tam zůstane "Anonym".
        subtitle: `${authorName || 'Anonym'} | ${status}`
      }
    }
  }
})