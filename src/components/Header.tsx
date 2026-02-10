'use client' // Nutné pro useState a interaktivitu menu

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Music, ChevronDown, Menu, X } from 'lucide-react'
import { client } from '@/sanity/lib/client'
import { groq } from 'next-sanity'

// Query zůstává stejná
const HEADER_QUERY = groq`*[_type == "site"][0] {
  title,
  "nav": headerMenu-> {
    items[] {
      _type,
      label,
      params,
      external,
      _type == "link.list" => {
        links[] {
          label,
          params,
          external
        }
      }
    }
  }
}`

export default function Header() {
	const [isOpen, setIsOpen] = useState(false)
	const [data, setData] = useState<any>(null)
	const pathname = usePathname()

	// Načtení dat (v Client Component používáme useEffect, nebo bychom mohli data předat jako props)
	useEffect(() => {
		client.fetch(HEADER_QUERY).then(setData)
	}, [])

	// Zavřít menu po změně stránky
	useEffect(() => {
		setIsOpen(false)
	}, [pathname])

	const navItems = data?.nav?.items

	return (
		<header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
			<a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:p-4 focus:bg-white focus:z-[100]">
				Přeskočit na obsah
			</a>

			<div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
				{/* LOGO */}
				<Link href="/" className="flex items-center gap-3 group text-left">
					<div className="bg-blue-600 p-2 rounded-xl text-white group-hover:bg-blue-700 transition-colors">
						<Music size={24} />
					</div>
					<div className="flex flex-col">
						<span className="text-xl font-black text-slate-900 tracking-tight leading-none">
							{data?.title || 'Collegium Bonum'}
						</span>
						<span className="text-[10px] text-blue-600 font-bold uppercase tracking-widest mt-1">
							Pěvecký sbor
						</span>
					</div>
				</Link>

				{/* DESKTOP NAVIGACE */}
				<nav className="hidden md:flex items-center gap-6">
					{navItems?.map((item: any, idx: number) => (
						<div key={idx} className="relative group py-2">
							{item._type === 'link.list' ? (
								<>
									<button className="flex items-center gap-1 text-sm font-bold text-slate-600 group-hover:text-blue-600 transition-colors">
										{item.label}
										<ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-200" />
									</button>
									<div className="absolute top-full left-0 w-56 bg-white border border-slate-100 shadow-xl rounded-xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 translate-y-2 group-hover:translate-y-0">
										{item.links?.map((sub: any, subIdx: number) => (
											<Link key={subIdx} href={sub.params || sub.external || "#"} className="block px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-blue-50 hover:text-blue-600 transition-colors">
												{sub.label}
											</Link>
										))}
									</div>
								</>
							) : (
								<Link href={item.params || item.external || "#"} className="text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors">
									{item.label}
								</Link>
							)}
						</div>
					))}
					<Link href="/kontakt" className="bg-slate-900 text-white px-5 py-2.5 rounded-full text-sm font-bold hover:bg-blue-600 transition-all shadow-sm ml-4">
						Kontakt
					</Link>
				</nav>

				{/* MOBILE TOGGLE BUTTON */}
				<button
					className="md:hidden p-2 text-slate-600 hover:text-blue-600 transition-colors"
					onClick={() => setIsOpen(!isOpen)}
				>
					{isOpen ? <X size={28} /> : <Menu size={28} />}
				</button>
			</div>

			{/* MOBILE MENU PANEL */}
			{isOpen && (
				<div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-slate-100 shadow-2xl animate-in slide-in-from-top duration-300">
					<nav className="flex flex-col p-6 gap-4">
						{navItems?.map((item: any, idx: number) => (
							<div key={idx} className="flex flex-col gap-2">
								{item._type === 'link.list' ? (
									<>
										<span className="text-xs font-black uppercase tracking-widest text-slate-400 mt-2">
											{item.label}
										</span>
										{item.links?.map((sub: any, subIdx: number) => (
											<Link key={subIdx} href={sub.params || sub.external || "#"} className="text-lg font-bold text-slate-700">
												{sub.label}
											</Link>
										))}
									</>
								) : (
									<Link href={item.params || item.external || "#"} className="text-lg font-bold text-slate-700">
										{item.label}
									</Link>
								)}
							</div>
						))}
						<Link href="/kontakt" className="mt-4 bg-blue-600 text-white p-4 rounded-xl text-center font-bold shadow-lg">
							Kontakt
						</Link>
					</nav>
				</div>
			)}
		</header>
	)
}