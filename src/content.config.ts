import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { defineCollection } from 'astro:content';

const page = defineCollection({
	loader: glob({
		pattern: '**/*.{md,mdx}',
		base: './src/content/page',
	}),
	schema: z.object({
		title: z.string(),
	}),
});

export const collections = {
	page,
};
