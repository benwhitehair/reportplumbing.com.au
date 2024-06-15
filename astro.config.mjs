import markdoc from '@astrojs/markdoc';
import netlify from '@astrojs/netlify';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import { defineConfig } from 'astro/config';

import { siteConfig } from './src/lib/site-config';

// https://astro.build/config
export default defineConfig({
	site: siteConfig.baseUrl,
	integrations: [markdoc(), sitemap(), tailwind()],
	output: 'hybrid',
	adapter: netlify({
		edgeMiddleware: true,
	}),
});
