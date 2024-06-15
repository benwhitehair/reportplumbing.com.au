import typographyPlugin from '@tailwindcss/typography';
import defaultTheme from 'tailwindcss/defaultTheme';

export const fontStackDisplayArray = [
	'Zilla Slab',
	...defaultTheme.fontFamily.sans,
];

export const fontStackSansArray = [
	'Nunito Variable',
	...defaultTheme.fontFamily.sans,
];

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				ice: '#eff8ff',
				seafoam: '#64d5ca',
				mist: '#adccd4',
				deep_ocean: '#06839e',
			},
			fontFamily: {
				display: fontStackDisplayArray,
				sans: fontStackSansArray,
			},
			typography: ({ theme }) => ({
				DEFAULT: {
					css: {
						'--tw-prose-headings': theme('colors.deep_ocean'),
						'--tw-prose-links': theme('colors.deep_ocean'),
						'--tw-prose-bullets': theme('colors.deep_ocean'),
						fontFamily: fontStackSansArray.join(', '),
						h1: {
							fontFamily: fontStackSansArray.join(', '),
							textWrap: 'balance',
						},
						h2: {
							fontFamily: fontStackSansArray.join(', '),
							textWrap: 'balance',
						},
						a: {
							fontWeight: '700',
							textDecoration: 'none',
							'&:hover': {
								textDecoration: 'underline',
							},
						},
						strong: {
							fontWeight: '700',
						},
					},
				},
			}),
		},
	},
	plugins: [typographyPlugin],
};
