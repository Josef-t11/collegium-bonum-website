// src/sanity/actions/DuplicateWithWeekAction.ts
import { DocumentActionComponent, useClient } from 'sanity'
import { useRouter } from 'sanity/router'
import { CalendarDays } from 'lucide-react'
import { uuid } from '@sanity/uuid'

export const DuplicateWithWeekAction: DocumentActionComponent = (props) => {
	const client = useClient({ apiVersion: '2024-01-01' })
	const router = useRouter()

	if (!props.published && !props.draft) return null

	return {
		label: 'Duplikovat o týden později',
		icon: CalendarDays,
		onHandle: async () => {
			// Vezmeme data z rozpracovaného nebo publikovaného dokumentu
			const source = props.draft || props.published
			if (!source) return

			// 1. Logika výpočtu data (POZOR na správný název pole: dateAndTime)
			const currentDate = new Date(source.dateAndTime as string)
			const nextWeek = new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000)

			// 2. Vyčištění dat (odstranění systémových polí)
			const { _id, _rev, _updatedAt, _createdAt, ...rest } = source as any

			// 3. Vytvoření unikátního ID s prefixem drafts. 
			// Tím zajistíme, že se nová zkouška otevře jako neuložený draft
			const newId = `drafts.${uuid()}`

			const newDoc = {
				...rest,
				_id: newId,
				_type: props.type,
				dateAndTime: nextWeek.toISOString(),
				isCancelled: false, // Resetujeme zrušení
				title: source.title // Ponecháme název
			}

			try {
				// Vytvoříme dokument
				await client.create(newDoc)

				// 4. Přesměrujeme editora na ten nový dokument
				// Odřízneme "drafts." z ID pro navigaci, Sanity si to přebere
				router.navigateIntent('edit', { id: newId.replace('drafts.', ''), type: props.type })

				if (props.onComplete) props.onComplete()
			} catch (err) {
				console.error('Chyba duplikace:', err)
				alert('Nepodařilo se vytvořit kopii o týden později.')
			}
		},
	}
}