// src/app/(frontend)/interni/noty/page.tsx
import { client } from '@/sanity/lib/client'
import { SHEET_MUSIC_QUERY } from '@/sanity/lib/queries'
import { FileText, Download, Tag } from 'lucide-react'

export default async function NotyPage() {
	const music = await client.fetch(SHEET_MUSIC_QUERY)

	return (
		<div className="max-w-6xl mx-auto py-12 px-6">
			<h1 className="text-4xl font-black text-slate-900 mb-10 tracking-tight">Notový archiv</h1>

			<div className="bg-white rounded-[2rem] border border-slate-200 overflow-hidden shadow-sm">
				<table className="w-full text-left">
					<thead>
						<tr className="bg-slate-50 border-b border-slate-200 text-slate-400 text-[10px] uppercase tracking-widest font-black">
							<th className="px-8 py-5">Skladba</th>
							<th className="px-6 py-5 hidden sm:table-cell">Kategorie</th>
							<th className="px-8 py-5 text-right">Ke stažení</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-slate-100">
						{music.map((item: any) => (
							<tr key={item._id} className="hover:bg-blue-50/30 transition-colors">
								<td className="px-8 py-6">
									<div className="flex items-center gap-4">
										<FileText className="text-slate-300" />
										<div>
											<p className="font-bold text-slate-900 leading-tight">{item.title}</p>
											<p className="text-sm text-slate-500">{item.composer}</p>
										</div>
									</div>
								</td>
								<td className="px-6 py-6 hidden sm:table-cell">
									<span className="text-xs font-bold uppercase text-slate-400 bg-slate-100 px-2 py-1 rounded-md">{item.category}</span>
								</td>
								<td className="px-8 py-6 text-right">
									<a
										href={`${item.fileUrl}?dl=`}
										target="_blank"
										className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-blue-600 transition-all shadow-lg"
									>
										<Download size={16} />
										{/* DYNAMICKÝ TEXT: Pokud URL končí na .pdf, napiš PDF, jinak SOUBOR */}
										{item.fileUrl?.toLowerCase().endsWith('.pdf') ? 'PDF' : 'FOTO / OBR'}
									</a>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	)
}