// sanity.config.ts

'use client'

import pkg from './package.json'
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { projectId, dataset, apiVersion } from '@/sanity/lib/env'

// Importy našich struktur
import { structure } from '@/sanity/structure'
import editorStructure from '@/sanity/editorStructure'

import { presentation } from '@/sanity/presentation'
import { icon } from '@/sanity/ui/Icon'
import { InfoWidget } from '@/sanity/ui/InfoWidget'
import {
	dashboardTool,
	projectInfoWidget,
	projectUsersWidget,
} from '@sanity/dashboard'
import { vercelWidget } from 'sanity-plugin-dashboard-widget-vercel'
import { visionTool } from '@sanity/vision'
import { codeInput } from '@sanity/code-input' // <-- TENTO IMPORT JE DŮLEŽITÝ
import { supportedLanguages } from '@/lib/i18n'
import { documentInternationalization } from '@sanity/document-internationalization'
import { schemaTypes } from '@/sanity/schemaTypes'
import resolveUrl from '@/lib/resolveUrl'
import { DuplicateWithWeekAction } from './src/sanity/actions/DuplicateWithWeekAction'


const singletonTypes = ['site']


const sharedDocumentConfig = {
	actions: (input: any[], { schemaType }: { schemaType: string }) => {
		// 1. Logika pro Singletons (zachováváme tvůj původní kód)
		let actions = input;

		if (singletonTypes.includes(schemaType)) {
			actions = input.filter(
				({ action }) =>
					action && ['publish', 'discardChanges', 'restore'].includes(action),
			)
		}

		// 2. Rozšíření pro zkoušky (naše nová sborová logika)
		// Pokud je to rehearsal, přidáme naše speciální tlačítko na konec seznamu
		if (schemaType === 'rehearsal') {
			return [...actions, DuplicateWithWeekAction]
		}

		return actions
	},
}

export default defineConfig([
	// --- WORKSPACE 1: ADMIN ---
	{
		name: 'admin',
		title: 'CB Admin (Full)',
		icon,
		projectId,
		dataset,
		basePath: '/admin',
		plugins: [
			structure, // Toto už v sobě structureTool má
			presentation,
			dashboardTool({
				name: 'deployment',
				title: 'Deployment',
				widgets: [vercelWidget()],
			}),
			dashboardTool({
				name: 'info',
				title: 'Info',
				widgets: [
					projectInfoWidget(),
					projectUsersWidget(),
					InfoWidget({ version: pkg.version }),
				],
			}),
			visionTool({ defaultApiVersion: apiVersion }),
			codeInput(), // <--- PŘIDÁNO SEM
			documentInternationalization({
				supportedLanguages,
				schemaTypes: ['page', 'blog.post'],
			}),
		],
		schema: {
			types: schemaTypes,
			templates: (templates) =>
				templates.filter(({ schemaType }) => !singletonTypes.includes(schemaType)),
		},
		document: sharedDocumentConfig,
	},



	// --- WORKSPACE 2: EDITOR ---
	{
		name: 'editor',
		title: 'Sborista Editor',
		icon, // Vaše ikona
		projectId,
		dataset,
		basePath: '/editor',
		plugins: [
			structureTool({ structure: editorStructure }),
			presentation,
			codeInput(),
			documentInternationalization({
				supportedLanguages,
				schemaTypes: ['page', 'blog.post'],
			}),
		],
		schema: {
			types: schemaTypes,
			templates: (templates) =>
				templates.filter(({ schemaType }) => !singletonTypes.includes(schemaType)),
		},
		// Tady je ta změna!
		document: sharedDocumentConfig,
	}
])