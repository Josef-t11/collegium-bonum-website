// src/sanity/lib/image.ts
import { createImageUrlBuilder } from '@sanity/image-url' // OPRAVA: Přidány složené závorky {}
import { client } from '@/sanity/lib/client'

// Inicializace builderu pomocí pojmenovaného importu
const imageBuilder = createImageUrlBuilder(client)

export function urlFor(image: any) {
	// Ochrana pro "operáka": pokud image nemá asset, nepadáme, vrátíme prázdný objekt
	if (!image || !image.asset) {
		// Vracíme mock objekt, aby následné volání .url() neshodilo web
		return { url: () => '' } as any
	}

	return imageBuilder.image(image)
}