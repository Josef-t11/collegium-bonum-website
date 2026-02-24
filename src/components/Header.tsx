'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Music, ChevronDown, Menu, X, ShieldCheck, User } from 'lucide-react' // Přidány ikony
import { client } from '@/sanity/lib/client'
import { groq } from 'next-sanity'
import { useSession } from 'next-auth/react' // Pro zjištění přihlášení

const HEADER_QUERY = groq`*[_type == "site"][0] {
  title,
  "nav": headerMenu-> {
    items[] {
      _type,
      label,
      params,
      external,
      _type == "link.list" => {
        links[] { label, params, external }
      }
    }
  }
}`

export default function Header() {
	const { data: session } = useSession() // Získáme info o uživateli
	const [isOpen, setIsOpen] = useState(false)
	const [data, setData] = useState<any>(null)
	const pathname = usePathname()

	useEffect(() => {
		client.fetch(HEADER_QUERY).then(setData)
	}, [])

	useEffect(() => { setIsOpen(false) }, [pathname])

	const navItems = data?.nav?.items

	return (
		<header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
			<div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
				{/* LOGO */}
				<Link href="/" className="flex items-center gap-3 group">
					<div className="bg-blue-600 p-2 rounded-xl text-white group-hover:bg-blue-700 transition-colors">
						<Music size={24} />
					</div>
					<div className="flex flex-col">
						<span className="text-xl font-black text-slate-900 tracking-tight leading-none">
							{data?.title || 'Collegium Bonum'}
						</span>
						<span className="text-[10px] text-blue-600 font-bold uppercase tracking-widest mt-1">Pěvecký sbor</span>
					</div>
				</Link>

				{/* DESKTOP NAVIGACE */}
				<nav className="hidden md:flex items-center gap-6">
					{navItems?.map((item: any, idx: number) => (
						<div key={idx} className="relative group py-2">
							{item._type === 'link.list' ? (
								<>
									<button className="flex items-center gap-1 text-sm font-bold text-slate-600 group-hover:text-blue-600 transition-colors cursor-default">
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

					{/* DYNAMICKÝ ODKAZ DO INTERNÍ SEKCE */}
					{session ? (
						<Link href="/interni" className="flex items-center gap-2 bg-slate-100 text-slate-900 px-4 py-2 rounded-full text-sm font-bold hover:bg-blue-600 hover:text-white transition-all ml-2">
							<ShieldCheck size={16} /> Zóna členů
						</Link>
					) : (
						<Link href="/prihlaseni" className="text-sm font-bold text-slate-400 hover:text-blue-600 transition-colors ml-2">
							Pro členy
						</Link>
					)}

					<Link href="/kontakt" className="bg-slate-900 text-white px-5 py-2.5 rounded-full text-sm font-bold hover:bg-blue-600 transition-all shadow-sm ml-2">
						Kontakt
					</Link>
				</nav>

				{/* MOBILE TOGGLE */}
				<button className="md:hidden p-2 text-slate-600" onClick={() => setIsOpen(!isOpen)}>
					{isOpen ? <X size={28} /> : <Menu size={28} />}
				</button>
			</div>

			{/* MOBILE MENU */}
			{isOpen && (
				<div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-slate-100 shadow-2xl p-6">
					<nav className="flex flex-col gap-4">
						{navItems?.map((item: any, idx: number) => (
							<div key={idx} className="flex flex-col gap-2">
								<span className="text-[10px] font-black uppercase text-slate-400">{item.label}</span>
								{item._type === 'link.list' ? (
									item.links?.map((sub: any, sIdx: number) => (
										<Link key={sIdx} href={sub.params || sub.external || "#"} className="text-lg font-bold text-slate-700">{sub.label}</Link>
									))
								) : (
									<Link href={item.params || item.external || "#"} className="text-lg font-bold text-slate-700">{item.label}</Link>
								)}
							</div>
						))}
						<div className="pt-4 border-t border-slate-100 flex flex-col gap-4">
							<Link href={session ? "/interni" : "/prihlaseni"} className="text-lg font-bold text-blue-600 flex items-center gap-2">
								{session ? <><ShieldCheck size={20} /> Členská sekce</> : "Přihlášení pro členy"}
							</Link>
							<Link href="/kontakt" className="bg-slate-900 text-white p-4 rounded-xl text-center font-bold">Kontakt</Link>
						</div>
					</nav>
				</div>
			)}
		</header>
	)
}