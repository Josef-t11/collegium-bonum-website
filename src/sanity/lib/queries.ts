// src/sanity/lib/queries.ts
import { fetchSanityLive } from './fetch'
import { groq } from 'next-sanity'
import errors from '@/lib/errors'
import { BLOG_DIR } from '@/lib/env'

// --- ZÁKLADNÍ FRAGMENTY ---

export const LINK_QUERY = groq`
	...,
	internal->{
		_type,
		title,
		"slug": metadata.slug.current
	}
`

export const IMAGE_QUERY = groq`
	...,
	'lqip': @.asset->metadata.lqip
`

export const CTA_QUERY = groq`
	...,
	link{ ${LINK_QUERY} }
`

export const REPUTATION_QUERY = groq`
	_type == 'reputation-block' => { reputation-> }
`

// TATO QUERY CHYBĚLA A ZPŮSOBILA CHYBU BUILDU:
export const TRANSLATIONS_QUERY = groq`
	'translations': *[_type == 'translation.metadata' && references(^._id)].translations[].value->{
		'slug': metadata.slug.current,
		language
	}
`

export const NAVIGATION_QUERY = groq`
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
  "composer": coalesce(
    composer,
    author->name,
    author->title,
    author->fullName,
    "Anonym"
  ),
	  // Přidáme kontrolu na biografii
  "composerSlug": author->slug.current,
  "hasBio": defined(author->bio),
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
  "poster": posterImage.asset->url,
  "program": program[]->{
    _id,
    title,
    "composer": coalesce(author->name, composer, "Anonym"),
    "composerSlug": author->slug.current,
    "hasBio": defined(author->bio)
  }
`

// --- DEFINICE MODULŮ (Page Builder) ---

export const MODULES_QUERY = groq`
	...,
	ctas[]{
		...,
		link{ ${LINK_QUERY} }
	},
	_type == 'hero-module' => {
		title,
		subtitle,
		"image": image.asset->url,
		cta { ${CTA_QUERY} }
	},
	_type == 'concert-list-module' => {
		title,
		intro,
		filterType,
		"concerts": *[_type == "concert" && isPublic == true && (
			(filterType == "upcoming" && dateAndTime >= now()) ||
			(filterType == "past" && dateAndTime < now()) ||
			(!defined(filterType) || filterType == "all")
		)] | order(dateAndTime asc) {
			${CONCERT_CARD_FIELDS}
		}
	},
	_type == 'gallery-module' => {
		title,
		images[]{
			_key,
			caption,
			alt,
			"url": asset->url,
			"metadata": asset->metadata {
				lqip,
				dimensions
			}
		}
	},
	_type == 'gallery-archive-module' => {
		title,
		"allGalleries": *[_type == "gallery"] | order(date desc) {
			_id,
			title,
			"slug": slug.current,
			date,
			"mainImage": mainImage.asset->url,
			"imageCount": count(images)
		}
	},
	_type == 'blog-list' => { filteredCategory-> },
	_type == 'breadcrumbs' => { crumbs[]{ ${LINK_QUERY} } },
	_type == 'callout' => {
		content[]{ ..., ${REPUTATION_QUERY} }
	},
	_type == 'card-list' => {
		cards[]{ ..., ctas[]{ ${CTA_QUERY} } }
	},
	_type == 'richtext-module' => {
		content[]{
			...,
			_type == 'image' => { ${IMAGE_QUERY} }
		},
		'headings': select(
			tableOfContents => content[style in ['h2', 'h3', 'h4', 'h5', 'h6']]{
				style,
				'text': pt::text(@)
			}
		),
	},
	_type == 'logo-list' => { logos[]-> },
	_type == 'person-list' => { people[]-> },
`

// --- HLAVNÍ STRÁNKOVÉ QUERIES ---

export const PAGE_OR_CONCERT_QUERY = groq`
  *[
    (metadata.slug.current == $slug || slug.current == $slug || (metadata.slug.current == "index" && $slug == "home")) 
    && _type in ["page", "concert", "news"]
  ][0] {
    _id,
    _type,
    title,
    metadata, // <--- EXTRÉMNĚ DŮLEŽITÉ: Metadata pro procesor
    _type == "page" => {
      modules[]{ ${MODULES_QUERY} }
    },
    _type == "concert" => {
      dateAndTime,
      location,
      description,
      isPublic,
      "poster": posterImage.asset->url,
      "program": program[]->{ 
        _id, 
        title, 
        "composer": coalesce(author->name, composer, "Anonym"),
        "composerSlug": author->slug.current,
        "hasBio": defined(author->bio)
      }
    },
    _type == "news" => {
      publishDate,
      excerpt,
      content,
      "slug": slug.current
    }
  }
`

export const SINGLE_GALLERY_QUERY = groq`
  *[_type == "gallery" && slug.current == coalesce($slug, "")][0] {
    _id,
    title,
    date,
    "images": images[]{
      _key,
      caption,
      alt,
      "url": asset->url,
      "metadata": asset->metadata {
        lqip,
        dimensions
      }
    }
  }
`
export const SHEET_MUSIC_QUERY = groq`
  *[_type == "sheetMusic"] | order(title asc) {
    _id,
    title,
    composer,
    category,
    "fileUrl": file.asset->url
  }
`
// Tato query vytáhne 5 nejbližších zkoušek, které ještě nenastaly
export const UPCOMING_REHEARSALS_QUERY = groq`
  *[_type == "rehearsal" && dateAndTime >= now()] | order(dateAndTime asc)[0...5] {
    _id,
    title,
    dateAndTime,
    location,
    notes,
    isCancelled // PŘIDAT TENTO ŘÁDEK - 2
  }
`
// --- QUERY PRO DETAIL KONCERTU (Chybělo pro build) ---
export const CONCERT_DETAIL_QUERY = groq`
  *[_type == "concert" && slug.current == $slug][0] {
    _id,
    _type,
    title,
    dateAndTime,
    location,
    description,
    isPublic,
    "poster": posterImage.asset->url,
    program[]->{ ${MUSIC_PIECE_FIELDS} }
  }
`
export const REPERTOIRE_QUERY = groq`
  *[_type == "musicPiece"] | order(title asc) {
    ${MUSIC_PIECE_FIELDS}
  }
`

export const INTERNAL_TASKS_QUERY = groq`
  *[_type == "eventTasklist"] | order(_createdAt desc) {
    _id,
    title,
    "eventName": relatedEvent->title,
    "eventDate": relatedEvent->dateAndTime,
    "internalEventDate": relatedEvent->date,
    items[] {
      _key,
      type,
      label,
      isCompleted,
      notes,
      "assignee": assignedTo->name
    }
  }
`

export const DASHBOARD_TASKS_QUERY = groq`
  *[_type == "eventTasklist"] | order(_createdAt desc)[0..1] {
    _id,
    title,
    "eventName": relatedEvent->title,
    items[0..2] { // Na dashboardu stačí první 3 úkoly jako náhled
      _key,
      type,
      label,
      isCompleted,
      "assignee": assignedTo->name
    },
    "totalItems": count(items)
  }
`
// --- API FUNKCE ---

export async function getSite() {
	return await fetchSanityLive<Sanity.Site>({
		query: groq`
			*[_type == 'site'][0]{
				...,
				ctas[]{ ${CTA_QUERY} },
				headerMenu->{ ${NAVIGATION_QUERY} },
				footerMenu->{ ${NAVIGATION_QUERY} },
				social->{ ${NAVIGATION_QUERY} },
				'ogimage': ogimage.asset->url
			}
		`,
	})
}

export async function getTranslations() {
	return await fetchSanityLive<Sanity.Translation[]>({
		query: groq`*[_type in ['page', 'blog.post'] && defined(language)]{
			'slug': '/' + select(
				_type == 'blog.post' => '${BLOG_DIR}/' + metadata.slug.current,
				metadata.slug.current != 'index' => metadata.slug.current,
				''
			),
			'translations': *[_type == 'translation.metadata' && references(^._id)].translations[].value->{
				'slug': '/' + select(
					_type == 'blog.post' => '${BLOG_DIR}/' + language + '/' + metadata.slug.current,
					metadata.slug.current != 'index' => language + '/' + metadata.slug.current,
					language
				),
				_type == 'blog.post' => {
					'slugBlogAlt': '/' + language + '/${BLOG_DIR}/' + metadata.slug.current
				},
				language
			}
		}`,
	})
}