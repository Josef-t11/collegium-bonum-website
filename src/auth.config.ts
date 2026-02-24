// src/auth.config.ts
import type { NextAuthConfig } from "next-auth"
import Resend from "next-auth/providers/resend"

// Rozšíření typů pro TypeScript
declare module "next-auth" {
	interface Session {
		user: {
			role?: string
		} & import("next-auth").DefaultSession["user"]
	}
	interface User {
		role?: string
	}
}

export const authConfig = {
	providers: [
		Resend({
			from: "onboarding@resend.dev",
		}),
	],
	trustHost: true,
	secret: process.env.AUTH_SECRET,
	session: {
		strategy: "jwt",
	},
	pages: {
		signIn: '/prihlaseni',
		verifyRequest: '/prihlaseni/overeni',
		error: '/prihlaseni/chyba',
	},
	callbacks: {
		// Základní autorizace pro Middleware/Proxy
		authorized({ auth, request: { nextUrl } }) {
			const isLoggedIn = !!auth?.user
			const isInternal = nextUrl.pathname.startsWith('/interni')
			if (isInternal && !isLoggedIn) return false
			return true
		},
	},
} satisfies NextAuthConfig