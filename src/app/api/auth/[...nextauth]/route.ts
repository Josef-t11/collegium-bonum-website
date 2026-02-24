import { handlers } from "@/auth" // DŮLEŽITÉ: Import z plného auth.ts
export const { GET, POST } = handlers

// Vynutíme Node.js runtime pro tuto routu (aby fungovaly knihovny jako Argon2/Sanity)
export const runtime = 'nodejs'