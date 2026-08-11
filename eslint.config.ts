import js from '@eslint/js';
import * as astroParser from 'astro-eslint-parser';
import { type Linter } from 'eslint';
import { defineConfig } from 'eslint/config';
import eslintPluginAstro from 'eslint-plugin-astro';
import globals from 'globals';
import tseslint from 'typescript-eslint';

const ERROR = 'error';
const WARN = 'warn';
const OFF = 'off';

const typescriptEslintRules: Linter.RulesRecord = {
	'no-undef': OFF,
	'@typescript-eslint/no-unused-vars': [
		WARN,
		{
			args: 'after-used',
			argsIgnorePattern: '^(_|ignored)',
			ignoreRestSiblings: true,
			varsIgnorePattern: '^(_|ignored)',
		},
	],
	'import/consistent-type-specifier-style': [WARN, 'prefer-inline'],
	'@typescript-eslint/consistent-type-imports': [
		WARN,
		{
			prefer: 'type-imports',
			disallowTypeAnnotations: true,
			fixStyle: 'inline-type-imports',
		},
	],

	'@typescript-eslint/no-misused-promises': [
		'error',
		{ checksVoidReturn: false },
	],

	'@typescript-eslint/no-floating-promises': 'error',

	// here are rules we've decided to not enable. Commented out rather
	// than setting them to disabled to avoid them being referenced at all
	// when config resolution happens.

	// @typescript-eslint/require-await - sometimes you really do want
	// async without await to make a function async. TypeScript will ensure
	// it's treated as an async function by consumers and that's enough for me.

	// @typescript-eslint/prefer-promise-reject-errors - sometimes you
	// aren't the one creating the error, and you just want to propagate an
	// error object with an unknown type.

	// @typescript-eslint/only-throw-error - same reason as above.
	// However, this rule supports options to allow you to throw `any` and
	// `unknown`. Unfortunately, in Remix you can throw Response objects,
	// and we don't want to enable this rule for those cases.

	// @typescript-eslint/no-unsafe-declaration-merging - this is a rare
	// enough problem (especially if you focus on types over interfaces)
	// that it's not worth enabling.

	// @typescript-eslint/no-unsafe-enum-comparison - enums are not
	// recommended or used in epic projects, so it's not worth enabling.

	// @typescript-eslint/no-unsafe-unary-minus - this is a rare enough
	// problem that it's not worth enabling.

	// @typescript-eslint/no-base-to-string - this doesn't handle when
	// your object actually does implement toString unless you do so with
	// a class which is not 100% of the time. For example, the timings
	// object in the epic stack uses defineProperty to implement toString.
	// It's not high enough risk/impact to enable.

	// @typescript-eslint/no-non-null-assertion - normally you should not
	// use ! to tell TS to ignore the null case, but you're a responsible
	// adult and if you're going to do that, the linter shouldn't yell at
	// you about it.

	// @typescript-eslint/restrict-template-expressions - toString is a
	// feature of many built-in objects and custom ones. It's not worth
	// enabling.

	// @typescript-eslint/no-confusing-void-expression - what's confusing
	// to one person isn't necessarily confusing to others. Arrow
	// functions that call something that returns void is not confusing
	// and the types will make sure you don't mess something up.

	// these each protect you from `any` and while it's best to avoid
	// using `any`, it's not worth having a lint rule yell at you when you
	// do:
	// - @typescript-eslint/no-unsafe-argument
	// - @typescript-eslint/no-unsafe-call
	// - @typescript-eslint/no-unsafe-member-access
	// - @typescript-eslint/no-unsafe-return
	// - @typescript-eslint/no-unsafe-assignment
};

export default defineConfig([
	{
		ignores: [
			'**/.astro/**',
			'**/.netlify/**',
			'**/dist/**',
			'**/node_modules/**',
			'**/*.json',
			'**/*.tsbuildinfo',
		],
	},
	...eslintPluginAstro.configs.recommended,
	{
		plugins: {
			import: (await import('eslint-plugin-import-x')).default,
		},
		settings: {
			'import/core-modules': [
				'astro:content',
				'astro:transitions',
				'astro:assets',
			],
			'import/parsers': {
				'astro-eslint-parser': ['.astro'],
				'@typescript-eslint/parser': ['.ts', '.tsx'],
			},
		},
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node,
			},
		},
		rules: {
			'no-unexpected-multiline': ERROR,
			'no-warning-comments': [
				ERROR,
				{ terms: ['FIXME'], location: 'anywhere' },
			],
			'import/no-duplicates': [WARN, { 'prefer-inline': true }],
			'import/order': [
				WARN,
				{
					alphabetize: { order: 'asc', caseInsensitive: true },
					pathGroups: [{ pattern: '#*/**', group: 'internal' }],
					groups: [
						'builtin',
						'external',
						'internal',
						'parent',
						'sibling',
						'index',
					],
				},
			],
		},
	},
	{
		files: ['**/*.ts?(x)'],
		extends: [js.configs.recommended, tseslint.configs.recommended],
		languageOptions: {
			parser: tseslint.parser,
			parserOptions: {
				projectService: true,
			},
		},
		plugins: {
			'@typescript-eslint': tseslint.plugin,
		},
		rules: typescriptEslintRules,
	},
	{
		files: ['**/*.astro'],
		extends: [js.configs.recommended, tseslint.configs.recommended],
		languageOptions: {
			parser: astroParser,
			parserOptions: {
				parser: tseslint.parser,
				extraFileExtensions: ['.astro'],
				projectService: true,
			},
		},
		plugins: {
			'@typescript-eslint': tseslint.plugin,
		},
		rules: typescriptEslintRules,
	},
]);
