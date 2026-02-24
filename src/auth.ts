// src/auth.ts
import NextAuth, { DefaultSession } from "next-auth"
import Resend from "next-auth/providers/resend"
import { client, writeClient } from "@/sanity/lib/client"
import { SanityAdapter } from "next-auth-sanity"

declare module "next-auth" {
	interface Session {
		user: {
			role?: string
		} & DefaultSession["user"]
	}
	interface User {
		role?: string
	}
}

export const { handlers, auth, signIn, signOut } = NextAuth({
	// Adaptér používá zápisový klient
	adapter: SanityAdapter(writeClient),
	providers: [
		Resend({
			from: "onboarding@resend.dev",
		}),
	],
	// Důležité pro localhost a Next.js 15/16
	trustHost: true,
	secret: process.env.AUTH_SECRET,
	session: {
		strategy: "jwt",
	},
	callbacks: {
		async signIn({ user }) {
			// Kontrola, zda je uživatel v Sanity (používáme běžný client bez CDN)
			const person = await client.fetch(
				`*[_type == "person" && email == $email][0]`,
				{ email: user.email }
			)
			return !!person
		},
		async session({ session }) {
			if (session.user?.email) {
				const person = await client.fetch(
					`*[_type == "person" && email == $email][0]{internalRole, name}`,
					{ email: session.user.email }
				)
				if (person) {
					session.user.role = person.internalRole || 'member'
					session.user.name = person.name
				}
			}
			return session
		},
	},
	pages: {
		signIn: '/prihlaseni',
		verifyRequest: '/prihlaseni/overeni',
		error: '/prihlaseni/chyba',
	},
})