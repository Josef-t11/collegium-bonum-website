// src/sanity/schemaTypes/objects/auth.ts
import { defineType, defineField } from 'sanity'

export const user = defineType({
	name: 'user',
	title: 'Uživatel (Auth)',
	type: 'document',
	fields: [
		defineField({ name: 'name', type: 'string' }),
		defineField({ name: 'email', type: 'string' }),
		defineField({ name: 'image', type: 'url' }),
		defineField({ name: 'emailVerified', type: 'datetime' }),
	],
})

export const account = defineType({
	name: 'account',
	title: 'Účet (Auth)',
	type: 'document',
	fields: [
		defineField({ name: 'provider', type: 'string' }),
		defineField({ name: 'providerAccountId', type: 'string' }),
		defineField({ name: 'type', type: 'string' }),
		defineField({ name: 'access_token', type: 'string' }),
		defineField({ name: 'token_type', type: 'string' }),
	],
})

export const verificationToken = defineType({
	name: 'verification-token',
	title: 'Ověřovací token (Auth)',
	type: 'document',
	fields: [
		defineField({ name: 'identifier', type: 'string' }),
		defineField({ name: 'token', type: 'string' }),
		defineField({ name: 'expires', type: 'datetime' }),
	],
})