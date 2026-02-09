// src/sanity/schemaTypes/index.ts
import { type SchemaTypeDefinition } from 'sanity'

// --- 1. DOKUMENTY (Hlavní sekce v menu) ---
import site from './documents/site'
import page from './documents/page'
import globalModule from './documents/global-module'
import blogPost from './documents/blog.post'
import blogCategory from './documents/blog.category'
import navigation from './documents/navigation'
import redirect from './documents/redirect'
import concert from './documents/concert'
import musicPiece from './documents/musicPiece'
import news from './documents/news'
import gallery from './documents/gallery' // <-- DŮLEŽITÉ: Náš nový dokument pro fotky

// --- 2. MISCELLANEOUS (Doplňky) ---
import announcement from './misc/announcement'
import logo from './misc/logo'
import person from './misc/person'
import pricing from './misc/pricing'
import reputation from './misc/reputation'
import testimonial from './misc/testimonial'

// --- 3. OBJEKTY (Stavební kameny) ---
import cta from './objects/cta'
import icon from './objects/icon'
import img from './objects/img'
import link from './objects/link'
import linkList from './objects/link.list'
import metadata from './objects/metadata'
import moduleOptions from './objects/module-options'

// --- 4. MODULY (Sekce do stránek / Page Builder) ---
import concertListModule from './modules/concert-list-module'
import heroModule from './modules/hero-module'
import accordionList from './modules/accordion-list'
import blogFrontpage from './modules/blog-frontpage'
import blogList from './modules/blog-list'
import blogPostContent from './modules/blog-post-content'
import breadcrumbs from './modules/breadcrumbs'
import callout from './modules/callout'
import cardList from './modules/card-list'
import creativeModule from './modules/creative'
import customHtml from './modules/custom-html'
import flagList from './modules/flag-list'
import hero from './modules/hero'
import heroSaas from './modules/hero.saas'
import heroSplit from './modules/hero.split'
import logoList from './modules/logo-list'
import personList from './modules/person-list'
import pricingList from './modules/pricing-list'
import richtextModule from './modules/richtext-module'
import scheduleModule from './modules/schedule-module'
import searchModule from './modules/search-module'
import statList from './modules/stat-list'
import stepList from './modules/step-list'
import tabbedContent from './modules/tabbed-content'
import testimonialFeatured from './modules/testimonial.featured'
import testimonialList from './modules/testimonial-list'
import galleryModule from './modules/gallery-module'
import galleryArchiveModule from './modules/gallery-archive-module'

// --- FINÁLNÍ EXPORT ---
export const schemaTypes: SchemaTypeDefinition[] = [
	// Hlavní dokumenty
	site,
	page,
	globalModule,
	blogPost,
	blogCategory,
	navigation,
	redirect,
	concert,
	musicPiece,
	news,
	gallery, // <-- ZDE: Registrace dokumentu Galerie

	// Ostatní
	announcement,
	logo,
	person,
	pricing,
	reputation,
	testimonial,

	// Objekty
	cta,
	icon,
	img,
	link,
	linkList,
	metadata,
	moduleOptions,

	// Všechny moduly pro Page Builder
	concertListModule,
	heroModule,
	accordionList,
	blogFrontpage,
	blogList,
	blogPostContent,
	breadcrumbs,
	callout,
	cardList,
	creativeModule,
	customHtml,
	flagList,
	hero,
	heroSaas,
	heroSplit,
	logoList,
	personList,
	pricingList,
	richtextModule,
	scheduleModule,
	searchModule,
	statList,
	stepList,
	tabbedContent,
	testimonialFeatured,
	testimonialList,
	galleryModule,
	galleryArchiveModule,
]