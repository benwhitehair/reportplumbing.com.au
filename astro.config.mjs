// @ts-check

import netlify from '@astrojs/netlify';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import { defineConfig } from 'astro/config';

import { siteConfig } from './src/lib/site-config';

// https://astro.build/config
export default defineConfig({
	adapter: netlify({
		edgeMiddleware: true,
		imageCDN: true,
	}),
	build: {
		format: 'file',
	},
	integrations: [sitemap(), tailwind()],
	output: 'static',
	server: {
		host: true,
	},
	site: siteConfig.baseUrl,
	trailingSlash: 'never',
});
