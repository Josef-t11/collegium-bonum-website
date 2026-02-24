// src/proxy.ts

import { NextResponse, type NextRequest, type ProxyConfig } from 'next/server'
import { getTranslations } from './sanity/lib/queries'
import { DEFAULT_LANG, langCookieName } from './lib/i18n'
import { auth } from "@/auth" // Importujeme naši auth funkci

export default async function proxy(request: NextRequest) {
	const { pathname } = request.nextUrl

	// --- 0. DIACRITICS DEFENSE (Pojistka pro Ops stabilitu) ---
	if (pathname.includes('%C3%AD')) { // URL kód pro 'í'
		const cleanPath = pathname.replace('intern%C3%AD', 'interni')
		return NextResponse.redirect(new URL(cleanPath, request.url))
	}

	if (pathname.startsWith('/interni')) {
		const session = await auth()

		// Pokud není přihlášen, přesměrujeme ho na přihlášení
		if (!session) {
			const loginUrl = new URL('/prihlaseni', request.url)
			// Volitelně můžeme přidat callbackUrl, aby se po přihlášení vrátil tam, kde byl
			loginUrl.searchParams.set('callbackUrl', pathname)
			return NextResponse.redirect(loginUrl)
		}
		// Pokud je přihlášen, pokračujeme dál k i18n logice nebo NextResponse.next()
	}

	// --- 2. EXISTUJÍCÍ I18N LOGIKA ---
	const lang = request.cookies.get(langCookieName)?.value

	// Optimalizace: getTranslations voláme jen pokud je to nutné
	const T = await getTranslations()

	const isPrefixed = !!T.find((t) =>
		t.translations?.some(({ slug }) => slug === pathname),
	)

	if (!request.cookies.has(langCookieName) && !isPrefixed)
		return NextResponse.next()

	const available = T?.find((t) =>
		[t.slug, ...(t.translations?.map(({ slug }) => slug) ?? [])].includes(
			pathname,
		),
	)
	if (!available) return NextResponse.next()

	const cookieMatchesCurrentPrefix =
		lang ===
		available.translations?.find((t) =>
			[t.slugBlogAlt, t.slug].includes(pathname),
		)?.language ||
		(lang === DEFAULT_LANG && pathname === available.slug)

	if (!cookieMatchesCurrentPrefix) {
		const target = available.translations?.find((t) => t.language === lang)
		const url =
			target?.language === DEFAULT_LANG
				? available.slug
				: (target?.slugBlogAlt ?? target?.slug)
		if (!url) return NextResponse.next()

		return NextResponse.redirect(new URL(url, request.url))
	}

	return NextResponse.next()
}

// Konfigurace zůstává, matcher pokryje i /interni
export const config: ProxyConfig = {
	matcher: ['/((?!favicon.ico|_next/static|_next/image|api|admin).*)'],
}