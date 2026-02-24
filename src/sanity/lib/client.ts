// src/sanity/lib/client.ts
import { createClient } from 'next-sanity'
import { projectId, dataset, apiVersion } from '@/sanity/lib/env'
import { dev } from '@/lib/env'

// 1. STANDARDNÍ KLIENT (Čtení, Stega, CDN)
// Používá se pro celý veřejný web
export const client = createClient({
	projectId,
	dataset,
	apiVersion,
	useCdn: false, // NASTAV NA FALSE (aspoň pro teď, než to rozchodíme)
	stega: { studioUrl: '/admin' },
})

// 2. ZÁPISOVÝ KLIENT (Auth.js, Archivace)
// Používá se POUZE na serveru pro operace jako je přihlašování
export const writeClient = createClient({
	projectId,
	dataset,
	apiVersion,
	useCdn: false, // Pro zápis MUSÍ být false
	token: process.env.SANITY_WRITE_TOKEN, // Tento token vytvoříš v Sanity Manage
})