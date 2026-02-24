// src/app/(frontend)/prihlaseni/overeni/page.tsx
export default function VerifyRequestPage() {
	return (
		<div className="min-h-[60vh] flex items-center justify-center px-6">
			<div className="max-w-md w-full text-center">
				<div className="mb-6 inline-flex items-center justify-center w-20 h-20 bg-blue-50 text-blue-600 rounded-full">
					<svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
					</svg>
				</div>
				<h1 className="text-3xl font-black text-slate-900 mb-4">Zkontrolujte si e-mail</h1>
				<p className="text-slate-600 leading-relaxed">
					Právě jsme vám poslali přihlašovací odkaz. Klikněte na něj a budete automaticky přihlášeni do interní sekce.
				</p>
				<p className="mt-8 text-sm text-slate-400">
					Nepřišel e-mail? Podívejte se do složky SPAM.
				</p>
			</div>
		</div>
	)
}