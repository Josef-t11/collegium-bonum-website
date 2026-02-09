// src/sanity/lib/image.ts
// Měníme 'import imageUrlBuilder from' na 'import createImageUrlBuilder from'
import createImageUrlBuilder from '@sanity/image-url'
import { client } from '@/sanity/lib/client'

// Měníme název proměnné na 'imageBuilder' pro konzistenci
const imageBuilder = createImageUrlBuilder(client)

export function urlFor(image: any) {
	// Ochrana pro "operáka": pokud image nemá asset, nepadáme, vrátíme prázdný objekt
	if (!image || !image.asset) {
		return { url: () => '' }
	}
	return imageBuilder.image(image)
}
