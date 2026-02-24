// src/app/(frontend)/prihlaseni/page.tsx
import { signIn } from "@/auth"

interface SignInPageProps {
	searchParams: Promise<{ callbackUrl?: string }>
}

export default async function SignInPage({ searchParams }: SignInPageProps) {
	// Získáme callbackUrl z URL adresy (např. /interni)
	const resolvedSearchParams = await searchParams
	const callbackUrl = resolvedSearchParams.callbackUrl || "/interni"

	return (
		<div className="min-h-[70vh] flex items-center justify-center px-6 bg-slate-50">
			<div className="max-w-md w-full bg-white border border-slate-200 p-12 rounded-[2rem] shadow-2xl shadow-slate-200/50">
				<div className="text-center mb-10">
					<h1 className="text-4xl font-black text-slate-900 mb-3 tracking-tight">Interní sekce</h1>
					<p className="text-slate-500 font-medium">Zadejte svůj sborový e-mail</p>
				</div>

				<form
					action={async (formData) => {
						"use server"
						// EXPLICITNĚ řekneme, kam má uživatel jít po úspěšném přihlášení
						await signIn("resend", {
							email: formData.get("email"),
							redirectTo: callbackUrl
						})
					}}
					className="space-y-4"
				>
					<input
						type="email"
						name="email"
						placeholder="jmeno@email.cz"
						required
						className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:border-blue-600 focus:ring-4 focus:ring-blue-50 outline-none transition-all text-lg font-medium"
					/>
					<button
						type="submit"
						className="w-full bg-slate-900 text-white font-bold py-4 rounded-2xl hover:bg-blue-600 transition-all shadow-lg active:scale-[0.98]"
					>
						Poslat přihlašovací odkaz
					</button>
				</form>

				<p className="mt-8 text-center text-xs text-slate-400 leading-relaxed">
					Přístup je povolen pouze členům sboru Collegium Bonum evidovaným v systému.
				</p>
			</div>
		</div>
	)
}