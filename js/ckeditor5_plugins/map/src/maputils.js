/** 
 * @file defines helper functions for the map plugin.
 */

/**
 * @param {string} embedCode
 * @returns {string | null}
 *   The `src` of the embedded `<iframe>`, if applicable
 */
function embedCodeToURL(embedCode) {
	const iframeElement = new DOMParser().parseFromString(embedCode, 'text/html').querySelector('iframe');
	if (iframeElement)
		return iframeElement.getAttribute('src');
	return null;
}

/**
 * @param {string} url
 * @returns {string | null}
 *   Just the location part of the URL, or null if the URL isn't a valid campus map URL.
 *   For example, passing the URL `'https://www.colorado.edu/map/?id=336#!m/432490'` returns `'432490'`,
 *   while passing the URL `'https://www.colorado.edu/'` returns `null` as it doesn't link directly to a campus map.
 */
export function campusMapURLToLocation(url) {
	if (url[0] === '<') {
		url = embedCodeToURL(url); // Gets a URL from a likely embed code.
		if (!url) return null;
	}
	let urlified;
	try {
		urlified = new URL(url);
	} catch (e) { return null; }
	return (urlified.hostname === 'colorado.edu' || urlified.hostname === 'www.colorado.edu') && (urlified.pathname === '/map' || urlified.pathname === '/map/') ? urlified.hash.replace(/\D+/, '') : null;
}

/**
 * @param {string} location
 * @returns {string}
 *   The entire campus map URL when given just the location.
 *   For example, passing the location `'432490'` returns `'https://www.colorado.edu/map/?id=336#!m/432490'`.
 */
export function campusMapLocationToURL(location) {
	return 'https://www.colorado.edu/map/?id=336' + (location ? '#!m/' + location : '');
}
