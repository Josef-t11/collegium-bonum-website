// src/auth.ts
import NextAuth from "next-auth"
import { SanityAdapter } from "next-auth-sanity"
import { client, writeClient } from "@/sanity/lib/client"
import { authConfig } from "./auth.config"

export const { handlers, auth, signIn, signOut } = NextAuth({
	...authConfig,
	// Zde přidáváme adaptér, který vyžaduje Node.js (tady to nevadí)
	adapter: SanityAdapter(writeClient),
	callbacks: {
		...authConfig.callbacks,
		async signIn({ user }) {
			// Tvoje logika whitelist kontroly
			const person = await client.fetch(
				`*[_type == "person" && email == $email][0]`,
				{ email: user.email }
			)
			return !!person
		},
		async session({ session }) {
			// Tvoje logika obohacení session o roli ze Sanity
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
})