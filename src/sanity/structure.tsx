// src/sanity/structure.tsx
import { Music, Users, Calendar, ShieldCheck, Calendar1Icon, CalendarCheck } from 'lucide-react'
import { StructureBuilder, structureTool } from 'sanity/structure'
import { singleton, group, directory } from './lib/builders'
// Přidali jsme VscFolderLibrary pro galerii
import { VscFiles, VscServerProcess, VscMegaphone, VscEdit, VscLibrary, VscFolderLibrary } from 'react-icons/vsc'
import { GoPerson } from 'react-icons/go'

export const structure = structureTool({
	structure: (S: StructureBuilder) =>
		S.list()
			.title('Content')
			.items([
				singleton(S, 'site', 'Site settings').icon(VscServerProcess),
				S.divider(),

				S.documentTypeListItem('page').title('All pages').icon(VscFiles),
				S.documentTypeListItem('concert').title('Koncerty').icon(VscMegaphone),
				S.documentTypeListItem('news').title('Aktuality').icon(VscEdit),

				// --- NOVÁ POLOŽKA: Fotogalerie ---
				S.documentTypeListItem('gallery').title('Fotogalerie').icon(VscFolderLibrary),
				// ---------------------------------

				S.documentTypeListItem('musicPiece').title('Repertoár').icon(VscLibrary),
				S.documentTypeListItem('person').title('Lidé a autoři').icon(GoPerson),
				S.divider(), // Hezký oddělovač

				S.listItem()
					.title('Sborové noty (Interní)')
					.icon(Music)
					.child(
						S.documentTypeList('sheetMusic') // Musí odpovídat jménu v schématu
							.title('Seznam not v archivu')
					),
				S.listItem()
					.title('Plán zkoušek')
					.icon(Calendar)
					.child(
						S.documentTypeList('rehearsal').title('Termíny zkoušek')
					),
				S.documentTypeListItem('internalEvent')
					.title('Interní akce')
					.icon(CalendarCheck),
				S.documentTypeListItem('eventTasklist')
					.title('Organizace a úkoly')
					.icon(Calendar1Icon),
				// ... (v seznamu S.list().items([...]))
				S.divider(),
				S.listItem()
					.title('Systém: Uživatelé')
					.child(S.documentTypeList('user')),
				S.listItem()
					.title('Systém: Přihlašovací tokeny')
					.child(S.documentTypeList('verification-token')),

				S.divider(),

				group(S, 'Directories', [
					directory(S, 'docs', { maxLevel: 1 }).title('Docs'),
					directory(S, 'docs/modules').title('Docs › Modules'),
				]),

				S.documentTypeListItem('global-module').title('Global modules'),
				S.divider(),

				S.documentTypeListItem('blog.post').title('Blog posts'),
				S.documentTypeListItem('blog.category').title('Blog categories'),
				S.divider(),

				S.documentTypeListItem('navigation'),
				S.documentTypeListItem('redirect').title('Redirects'),

				group(S, 'Miscellaneous', [
					S.documentTypeListItem('announcement').title('Announcements'),
					S.documentTypeListItem('logo').title('Logos'),
					S.documentTypeListItem('pricing').title('Pricing tiers'),
					S.documentTypeListItem('reputation'),
					S.documentTypeListItem('testimonial').title('Testimonials'),
				]),
			]),
})