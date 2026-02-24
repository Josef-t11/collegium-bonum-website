// src/middleware.ts
export { default } from "./proxy"

export const config = {
	// Tento matcher zajistí, že middleware (proxy) poběží na všem kromě statiky
	matcher: ['/((?!api|_next/static|_next/image|favicon.ico|admin|editor).*)'],
}