/** 
 * @file defines helper functions for the map plugin.
 */

/**
 * Extracts the URL from an `<iframe>` embed code.
 *
 * @param {string} embedCode
 *   The embed code.
 * @returns {string | null}
 *   The `src` of the embedded `<iframe>`, or `null` if there isn't one.
 */
function embedCodeToURL(embedCode) {
  const iframeElement = new DOMParser().parseFromString(embedCode, 'text/html').querySelector('iframe');
  if (iframeElement) {
    return iframeElement.getAttribute('src');
  }
  return null;
}

/**
 * Converts a Campus Map URL to a map location value.
 *
 * @param {string} url
 *   The full URL.
 * @returns {string | null}
 *   Just the location part of the URL, or `undefined` if the URL isn't a valid
 *   Campus Map URL. For example, passing the URL
 *   `'https://www.colorado.edu/map/?id=336#!m/432490'` returns `'432490'`,
 *   while passing the URL `'https://www.colorado.edu/'` returns `null` as it
 *   doesn't link directly to a Campus Map.
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
  if (urlified.hostname.match(/^(www\.)?colorado\.edu$/) && urlified.pathname.match(/^\/map/) && urlified.hash) {
    const match = urlified.hash.match(/m\/(\d+)/);
    if (match)
      return match[1];
  }
  return null;
}

/**
 * Converts a Google Map URL to a map location value.
 *
 * @param {string} url
 *   The full URL.
 * @returns {string | null}
 *   Just the location part of the URL, or null if the URL isn't a valid Google
 *   Maps URL.
 */
export function googleMapURLToLocation(url) {
  if (url[0] === '<') {
    url = embedCodeToURL(url); // Gets a URL from a likely embed code.
    if (!url) return null;
  }
  let urlified;
  try {
    urlified = new URL(url);
  } catch (e) { return null; }
  if (urlified.hostname.match(/^(www\.)?google\.com$/)) {
    if (urlified.pathname.match(/^\/maps\/embed/)) {
      // Returns a Google Maps `pb` location.
      return decodeURIComponent(urlified.searchParams.get('pb') || '');
    } else if (urlified.pathname.match(/^\/maps\/d/)) {
      // Returns the Google My Maps query parameters.
      return '?' + urlified.searchParams;
    }
  }
  return null;
}

/**
 * Converts a map location value to a full Campus Map URL.
 *
 * @param {string} location
 *   The map location value.
 * @returns {string}
 *   The entire Campus Map URL when given just the location. For example,
 *   passing the location `'432490'` returns
 *   `'https://www.colorado.edu/map/?id=336#!m/432490'`.
 */
export function campusMapLocationToURL(location) {
  return 'https://www.colorado.edu/map/?id=336' + (location ? '#!m/' + location : '');
}

/**
 * Converts a map location value to a full Google Maps URL.
 *
 * @param {string} location
 *   The map location value.
 * @returns {string}
 *   The entire Google Maps URL when given just the location.
 */
export function googleMapLocationToURL(location) {
  return location[0] === '?' ?
    'https://www.google.com/maps/d/embed' + location :
    'https://www.google.com/maps/embed?pb=' + location;
}
