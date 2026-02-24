// src/sanity/editorStructure.tsx
import { StructureBuilder } from 'sanity/structure'
import { VscCalendar, VscMegaphone, VscEdit, VscLibrary, VscFolderLibrary } from 'react-icons/vsc'
import { GoPerson } from 'react-icons/go'

// Exportujeme pouze funkci s logikou menu
// Změněno na export default:
const editorStructure = (S: StructureBuilder) =>
	S.list()
		.title('Sborista - Editor obsahu')
		.items([
			S.documentTypeListItem('concert').title('Koncerty').icon(VscMegaphone),
			S.documentTypeListItem('news').title('Aktuality').icon(VscEdit),
			S.documentTypeListItem('gallery').title('Fotogalerie').icon(VscFolderLibrary),

			S.divider(),

			S.documentTypeListItem('musicPiece').title('Repertoár').icon(VscLibrary),
			S.documentTypeListItem('person').title('Lidé a autoři').icon(GoPerson),
			S.listItem()
				.title('Plán zkoušek')
				.icon(VscCalendar)
				.child(
					S.documentTypeList('rehearsal').title('Termíny zkoušek')
				),

		])

export default editorStructure