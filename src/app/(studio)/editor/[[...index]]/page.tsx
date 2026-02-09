// src/app/(studio)/admin/[[...index]]/page.tsx 
// i v src/app/(studio)/editor/[[...index]]/page.tsx

'use client'

import { NextStudio } from 'next-sanity/studio'
import config from '../../../../../sanity.config' // Cesta vede k sanity.config.ts v kořenu

export default function StudioPage() {
	return <NextStudio config={config} />
}