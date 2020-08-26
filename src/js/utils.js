import { controlsContent } from './content.js';

/**
 * clear a cookie util
 * @param {string} name - Name of the cookie
 */
export const deleteCookie = (name) => {
  const expires = 'expires=' + new Date().toUTCString();
  document.cookie = name + '= ; ' + expires;
};

/**
 * Set a cookie util
 * @param {string} name - Name of the cookie
 * @param {string} value - Value of the cookie
 * @param {integrer} exdays - When cookie should expire
 */
export const setCookie = (name, value, exdays) => {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  const expires = 'expires=' + d.toUTCString();
  document.cookie = name + '=' + value + '; ' + expires;
};

/**
 * Get value of specific cookie
 * @param {string} name - Name of the cookie
 */
export const getCookie = (name) => {
  const toMatch = name + '=';
  const splitArray = document.cookie.split(';');
  for (let i = 0; i < splitArray.length; i++) {
    let cookie = splitArray[i];
    while (cookie.charAt(0) == ' ') {
      cookie = cookie.substring(1);
    }
    if (cookie.indexOf(toMatch) === 0) {
      return cookie.substring(toMatch.length, cookie.length);
    }
  }
  return '';
};

export const preferenceNotSelected = () => {
  return getCookie('_cookies_accepted_all') ||
    getCookie('_cookies_accepted_performance') ||
    getCookie('_cookies_accepted_functionality')
    ? false
    : true;
};

export const setAllPreference = () => {
  setCookie('_cookies_accepted_all', true);
  controlsContent.forEach((control) => {
    deleteCookie(`_cookies_accepted_${control.id}`);
  });
};
