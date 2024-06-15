import { defineCollection, z } from 'astro:content';

const pageCollection = defineCollection({
	schema: z.object({
		title: z.string(),
	}),
});

export const collections = {
	page: pageCollection,
};
