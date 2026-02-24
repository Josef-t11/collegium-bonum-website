// src/app/(frontend)/interni/layout.tsx
import { auth, signOut } from "@/auth"
import { redirect } from "next/navigation"
import Link from "next/link"
import { Music, LayoutDashboard, LogOut } from 'lucide-react'

export default async function InterniLayout({ children }: { children: React.ReactNode }) {
	const session = await auth()

	if (!session) redirect("/prihlaseni")

	return (
		<div className="min-h-screen bg-slate-50 flex flex-col">
			<header className="bg-white border-b border-slate-200 sticky top-0 z-40">
				<div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
					<div className="flex items-center gap-6">
						<Link href="/interni" className="font-black text-slate-900 tracking-tight flex items-center gap-2">
							<div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
								<Music size={18} />
							</div>
							<span>CB Interní</span>
						</Link>
						<nav className="flex items-center gap-1">
							<Link href="/interni" className="px-3 py-2 text-sm font-bold text-slate-600 hover:text-blue-600">Nástěnka</Link>
							<Link href="/interni/noty" className="px-3 py-2 text-sm font-bold text-slate-600 hover:text-blue-600">Noty</Link>
						</nav>
					</div>
					<form action={async () => { "use server"; await signOut(); }}>
						<button className="p-2 text-slate-400 hover:text-red-600 transition-colors"><LogOut size={20} /></button>
					</form>
				</div>
			</header>
			<main className="flex-grow">{children}</main>
		</div>
	)
}