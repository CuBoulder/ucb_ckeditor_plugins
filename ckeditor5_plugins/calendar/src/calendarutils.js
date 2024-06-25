/** 
 * @file defines helper functions for the calendar plugin.
 */

/**
 * @param {string} embedCode
 * @returns {string | null}
 *   The `src` of the embedded `<iframe>`, or `null` if there isn't one.
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
 *   Just the query string part of the URL, or null if the URL isn't a valid Google Calendar URL.
 */
export function googleCalendarURLToQueryString(url) {
  if (url[0] === '<') {
    url = embedCodeToURL(url); // Gets a URL from a likely embed code.
    if (!url) return null;
  }
  let urlified;
  try {
    urlified = new URL(url);
  } catch (e) { return null; }
  return urlified.hostname.match(/(www|calendar)\.google\.com/) && urlified.pathname.match(/\/calendar\/embed\/?/) ? urlified.searchParams.toString() : null;
}

/**
 * @param {string} queryString
 * @returns {string}
 *   The entire Google Calendar URL when given just the query string.
 */
export function googleCalendarQueryStringToURL(queryString) {
  return 'https://calendar.google.com/calendar/embed?' + queryString;
}
