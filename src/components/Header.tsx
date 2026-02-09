// src/components/Header.tsx

import { client } from '@/sanity/lib/client'
import { groq } from 'next-sanity'
import Link from 'next/link'
import { Music, ChevronDown } from 'lucide-react'

const HEADER_QUERY = groq`*[_type == "site"][0] {
  title,
  "logo": logo.asset->url,
  "nav": headerMenu-> {
    items[] {
      _type,
      label,
      params,
      external,
      // Pokud je to link.list, vytáhneme i jeho vnitřní odkazy
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

export default async function Header() {
	const data = await client.fetch(HEADER_QUERY)
	const settings = data
	const navItems = data?.nav?.items

	return (
		<header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
			{/* Skip to content link - důležité pro přístupnost (A11y) */}
			<a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:p-4 focus:bg-white focus:z-[100]">
				Přeskočit na obsah
			</a>

			<div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">

				{/* LOGO SEKCÍ */}
				<Link href="/" className="flex items-center gap-3 group text-left">
					<div className="bg-blue-600 p-2 rounded-xl text-white group-hover:bg-blue-700 transition-colors">
						<Music size={24} />
					</div>
					<div className="flex flex-col">
						<span className="text-xl font-black text-slate-900 tracking-tight leading-none">
							{settings?.title || 'Collegium Bonum'}
						</span>
						<span className="text-[10px] text-blue-600 font-bold uppercase tracking-widest mt-1">
							Pěvecký sbor
						</span>
					</div>
				</Link>

				{/* NAVIGACE */}
				<nav className="hidden md:flex items-center gap-6">
					{navItems?.map((item: any, idx: number) => {
						const isDropdown = item._type === 'link.list'
						const path = item.params || item.external || "#"

						if (isDropdown) {
							return (
								<div key={idx} className="relative group py-2">
									{/* Nadpis podmenu */}
									<button className="flex items-center gap-1 text-sm font-bold text-slate-600 group-hover:text-blue-600 transition-colors cursor-default">
										{item.label}
										<ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-200" />
									</button>

									{/* Vlastní dropdown menu */}
									<div className="absolute top-full left-0 w-56 bg-white border border-slate-100 shadow-xl rounded-xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 translate-y-2 group-hover:translate-y-0">
										{item.links?.map((sub: any, subIdx: number) => (
											<Link
												key={subIdx}
												href={sub.params || sub.external || "#"}
												className="block px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-blue-50 hover:text-blue-600 transition-colors"
											>
												{sub.label}
											</Link>
										))}
									</div>
								</div>
							)
						}

						{/* Klasický jednoduchý odkaz */ }
						return (
							<Link
								key={idx}
								href={path}
								className="text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors"
							>
								{item.label}
							</Link>
						)
					})}

					{/* Fixní tlačítko Kontakt (volitelné, ale doporučené pro konverze) */}
					<Link
						href="/kontakt"
						className="bg-slate-900 text-white px-5 py-2.5 rounded-full text-sm font-bold hover:bg-blue-600 transition-all shadow-sm ml-4"
					>
						Kontakt
					</Link>
				</nav>
			</div>
		</header>
	)
}