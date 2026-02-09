'use client'

import React, { useState, useMemo } from 'react'
import { ArrowUpDown, Search, Filter } from 'lucide-react'

export default function RepertoireTable({ items }: { items: any[] }) {
	const [search, setSearch] = useState('')
	const [sortKey, setSortKey] = useState('title')
	const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc')
	const [filterCategory, setFilterCategory] = useState('all')

	// 1. Získání unikátních kategorií pro filtr
	const categories = useMemo(() => {
		const cats = new Set(items.map(i => i.category).filter(Boolean))
		return ['all', ...Array.from(cats)]
	}, [items])

	// 2. Logika filtrování a řazení
	const filteredItems = useMemo(() => {
		return items
			.filter(item => {
				const matchesSearch =
					item.title?.toLowerCase().includes(search.toLowerCase()) ||
					item.composer?.toLowerCase().includes(search.toLowerCase())
				const matchesCategory = filterCategory === 'all' || item.category === filterCategory
				return matchesSearch && matchesCategory
			})
			.sort((a, b) => {
				const valA = (a[sortKey] || '').toString().toLowerCase()
				const valB = (b[sortKey] || '').toString().toLowerCase()
				if (valA < valB) return sortDir === 'asc' ? -1 : 1
				if (valA > valB) return sortDir === 'asc' ? 1 : -1
				return 0
			})
	}, [items, search, sortKey, sortDir, filterCategory])

	const toggleSort = (key: string) => {
		if (sortKey === key) {
			setSortDir(sortDir === 'asc' ? 'desc' : 'asc')
		} else {
			setSortKey(key)
			setSortDir('asc')
		}
	}

	return (
		<div className="space-y-6">
			{/* Ovládací prvky */}
			<div className="flex flex-col md:flex-row gap-4 items-end">
				<div className="flex-1 w-full">
					<label className="text-xs font-bold uppercase text-slate-400 mb-2 block">Hledat skladbu nebo autora</label>
					<div className="relative">
						<Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
						<input
							type="text"
							value={search}
							onChange={(e) => setSearch(e.target.value)}
							className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
							placeholder="Např. Ave Maria..."
						/>
					</div>
				</div>
				<div className="w-full md:w-48">
					<label className="text-xs font-bold uppercase text-slate-400 mb-2 block">Kategorie</label>
					<select
						value={filterCategory}
						onChange={(e) => setFilterCategory(e.target.value)}
						className="w-full px-4 py-2 border border-slate-200 rounded-lg outline-none"
					>
						{categories.map(cat => (
							<option key={cat} value={cat}>{cat === 'all' ? 'Všechny' : cat}</option>
						))}
					</select>
				</div>
			</div>

			{/* Tabulka */}
			<div className="overflow-x-auto border border-slate-200 rounded-xl shadow-sm">
				<table className="w-full text-left border-collapse">
					<thead>
						<tr className="bg-slate-50 border-b border-slate-200">
							<th onClick={() => toggleSort('title')} className="px-6 py-4 cursor-pointer hover:bg-slate-100 transition-colors">
								<div className="flex items-center gap-2 text-sm font-bold text-slate-700">
									Název skladby <ArrowUpDown size={14} />
								</div>
							</th>
							<th onClick={() => toggleSort('composer')} className="px-6 py-4 cursor-pointer hover:bg-slate-100 transition-colors">
								<div className="flex items-center gap-2 text-sm font-bold text-slate-700">
									Autor <ArrowUpDown size={14} />
								</div>
							</th>
							<th className="px-6 py-4 text-sm font-bold text-slate-700">Kategorie</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-slate-100">
						{filteredItems.map((item) => (
							<tr key={item._id} className="hover:bg-blue-50/30 transition-colors">
								<td className="px-6 py-4 font-semibold text-slate-900">{item.title}</td>
								<td className="px-6 py-4 text-slate-600">{item.composer}</td>
								<td className="px-6 py-4 text-sm">
									<span className="bg-slate-100 text-slate-600 px-2 py-1 rounded-md">
										{item.category || '—'}
									</span>
								</td>
							</tr>
						))}
					</tbody>
				</table>
				{filteredItems.length === 0 && (
					<div className="p-12 text-center text-slate-400">
						Nebyly nalezeny žádné skladby odpovídající zadání.
					</div>
				)}
			</div>
			<div className="text-xs text-slate-400">
				Celkem nalezeno skladeb: {filteredItems.length}
			</div>
		</div>
	)
}