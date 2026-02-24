// src/proxy.ts
import NextAuth from "next-auth"
import { authConfig } from "./auth.config"
import { NextResponse, type NextRequest } from 'next/server'
import { getTranslations } from './sanity/lib/queries'
import { DEFAULT_LANG, langCookieName } from './lib/i18n'

// Vytvoříme Edge-safe verzi auth funkce
const { auth: edgeAuth } = NextAuth(authConfig)

export default async function proxy(request: NextRequest) {
	const { pathname } = request.nextUrl

	// --- 0. OCHRANA PROTI DIAKRITICE ---
	if (pathname.includes('%C3%AD')) {
		const cleanPath = pathname.replace('intern%C3%AD', 'interni')
		return NextResponse.redirect(new URL(cleanPath, request.url))
	}

	// --- 1. AUTH PROTECTION ---
	if (pathname.startsWith('/interni')) {
		const session = await edgeAuth() // Tady voláme tu lehkou verzi bez SanityAdaptéru
		if (!session) {
			const loginUrl = new URL('/prihlaseni', request.url)
			loginUrl.searchParams.set('callbackUrl', pathname)
			return NextResponse.redirect(loginUrl)
		}
	}

	// --- 2. I18N LOGIKA (tvoje původní) ---
	const lang = request.cookies.get(langCookieName)?.value
	const T = await getTranslations()
	const isPrefixed = !!T.find((t) => t.translations?.some(({ slug }) => slug === pathname))

	if (!request.cookies.has(langCookieName) && !isPrefixed) return NextResponse.next()

	const available = T?.find((t) =>
		[t.slug, ...(t.translations?.map(({ slug }) => slug) ?? [])].includes(pathname),
	)
	if (!available) return NextResponse.next()

	const cookieMatchesCurrentPrefix =
		lang === available.translations?.find((t) => [t.slugBlogAlt, t.slug].includes(pathname))?.language ||
		(lang === DEFAULT_LANG && pathname === available.slug)

	if (!cookieMatchesCurrentPrefix) {
		const target = available.translations?.find((t) => t.language === lang)
		const url = target?.language === DEFAULT_LANG ? available.slug : (target?.slugBlogAlt ?? target?.slug)
		if (!url) return NextResponse.next()
		return NextResponse.redirect(new URL(url, request.url))
	}

	return NextResponse.next()
}