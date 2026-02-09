// src/sanity/lib/queries.ts

import { fetchSanityLive } from './fetch'
import { groq } from 'next-sanity'
import errors from '@/lib/errors'
import { BLOG_DIR } from '@/lib/env'

// --- ZÁKLADNÍ FRAGMENTY ---
export const LINK_QUERY = groq`..., internal->{ _type, title, "slug": metadata.slug.current }`
export const IMAGE_QUERY = groq`..., 'lqip': @.asset->metadata.lqip`
export const CTA_QUERY = groq`..., link{ ${LINK_QUERY} }`
export const REPUTATION_QUERY = groq`_type == 'reputation-block' => { reputation-> }`

const NAVIGATION_QUERY = groq`
	title,
	items[]{
		${LINK_QUERY},
		link{ ${LINK_QUERY} },
		links[]{ ${LINK_QUERY} }
	}
`

const MUSIC_PIECE_FIELDS = groq`
  _id,
  title,
  "composer": coalesce(composer, author->name, author->title, author->fullName, "Anonym"),
  category,
  learnedAt
`

const CONCERT_CARD_FIELDS = groq`
  _id,
  title,
  "slug": slug.current,
  dateAndTime,
  location,
  description,
  "poster": posterImage.asset->url
`

// --- MODULY ---
export const MODULES_QUERY = groq`
	...,
	ctas[]{ ..., link{ ${LINK_QUERY} } },
	_type == 'hero-module' => {
		title, subtitle, "image": image.asset->url, cta { ${CTA_QUERY} }
	},
	_type == 'concert-list-module' => {
		title, intro, filterType,
		"concerts": *[_type == "concert" && isPublic == true && (
			(filterType == "upcoming" && dateAndTime >= now()) ||
			(filterType == "past" && dateAndTime < now()) ||
			(!defined(filterType) || filterType == "all")
		)] | order(dateAndTime asc) { ${CONCERT_CARD_FIELDS} }
	},
	_type == 'gallery-module' => {
		title,
		images[]{ _key, caption, alt, "url": asset->url, "metadata": asset->metadata { lqip, dimensions } }
	},
	_type == 'gallery-archive-module' => {
		title,
		"allGalleries": *[_type == "gallery"] | order(date desc) {
			_id, title, "slug": slug.current, date, "mainImage": mainImage.asset->url, "imageCount": count(images)
		}
	},
	_type == 'richtext-module' => {
		content[]{ ..., _type == 'image' => { ${IMAGE_QUERY} } }
	}
`

// --- STRÁNKY (ROUTER) ---
export const PAGE_OR_CONCERT_QUERY = groq`
  *[
    (metadata.slug.current == $slug || slug.current == $slug || (metadata.slug.current == "index" && $slug == "home") || (metadata.slug.current == "index" && $slug == "index")) 
    && _type in ["page", "concert", "news"]
  ][0] {
    _id, _type, title,
    _type == "page" => { modules[]{ ${MODULES_QUERY} }, metadata },
    _type == "concert" => { dateAndTime, location, description, isPublic, "poster": posterImage.asset->url, program[]->{ ${MUSIC_PIECE_FIELDS} } },
    _type == "news" => { publishDate, excerpt, content, "slug": slug.current }
  }
`

export const REPERTOIRE_QUERY = groq`*[_type == "musicPiece"] | order(title asc) { ${MUSIC_PIECE_FIELDS}, category }`

// OPRAVA: Pro Single Gallery nepoužijeme proměnnou v definici, pokud to zlobí, 
// ale tady ji necháme a v page.tsx zajistíme, že tam VŽDY pošleme objekt s klíčem slug.
export const SINGLE_GALLERY_QUERY = groq`
  *[_type == "gallery" && slug.current == $slug][0] {
    _id, title, date,
    "images": images[]{ _key, caption, alt, "url": asset->url, "metadata": asset->metadata { lqip, dimensions } }
  }
`

// --- API FUNKCE ---
export async function getSite() {
	return await fetchSanityLive<Sanity.Site>({
		query: groq`*[_type == 'site'][0]{ ..., headerMenu->{ ${NAVIGATION_QUERY} }, footerMenu->{ ${NAVIGATION_QUERY} } }`,
	})
}

export async function getTranslations() {
	return await fetchSanityLive<Sanity.Translation[]>({
		query: groq`*[_type in ['page', 'blog.post'] && defined(language)]{
			'slug': '/' + select(_type == 'blog.post' => '${BLOG_DIR}/' + metadata.slug.current, metadata.slug.current != 'index' => metadata.slug.current, ''),
			'translations': *[_type == 'translation.metadata' && references(^._id)].translations[].value->{
				'slug': '/' + select(_type == 'blog.post' => '${BLOG_DIR}/' + language + '/' + metadata.slug.current, metadata.slug.current != 'index' => language + '/' + metadata.slug.current, language),
				language
			}
		}`,
	})
}