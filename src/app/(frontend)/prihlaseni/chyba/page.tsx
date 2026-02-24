// src/app/(frontend)/prihlaseni/chyba/page.tsx
export default async function AuthErrorPage({
	searchParams
}: {
	searchParams: Promise<{ error?: string }>
}) {
	// NEXT.JS 15/16 FIX: Musíme params awaitovat
	const { error } = await searchParams;

	return (
		<div className="min-h-screen flex items-center justify-center bg-slate-50">
			<div className="max-w-md w-full p-12 bg-white border border-red-100 rounded-[2rem] text-center shadow-xl">
				<h1 className="text-2xl font-black text-slate-900 mb-4">Chyba přihlášení</h1>
				<div className="bg-red-50 p-4 rounded-xl mb-6">
					<code className="text-red-600 font-bold">{error || 'Configuration'}</code>
				</div>
				<p className="text-slate-500 mb-8 text-sm">
					{error === 'Configuration'
						? 'Chyba v nastavení environment proměnných nebo Sanity tokenu.'
						: 'Odkaz v e-mailu již vypršel nebo byl použit.'}
				</p>
				<a href="/prihlaseni" className="inline-block bg-slate-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-600 transition-all">
					Zkusit znovu
				</a>
			</div>
		</div>
	)
}