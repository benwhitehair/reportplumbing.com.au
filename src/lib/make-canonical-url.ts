type MakeCanonicalUrlParams = {
	/**
	 * The base URL of the site, e.g. "https://example.com"
	 */
	baseUrl: string;

	/**
	 * The pathname of the current page, e.g. "/blog/post-1"
	 */
	pathname: string;
};

export function makeCanonicalUrl(params: MakeCanonicalUrlParams): string {
	let canonicalUrl = new URL(params.pathname, params.baseUrl).toString();

	// Remove trailing slash and .html extension if they exist
	if (canonicalUrl.endsWith('/')) {
		canonicalUrl = canonicalUrl.slice(0, -1);
	}
	if (canonicalUrl.endsWith('.html')) {
		canonicalUrl = canonicalUrl.slice(0, -5);
	}

	return canonicalUrl;
}
