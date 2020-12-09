import { content } from './content.js';

export const setCookie = (value) => {
  const d = new Date();
  d.setTime(d.getTime() + 365 * 24 * 60 * 60 * 1000);
  const expires = 'expires=' + d.toUTCString();
  const samesite = 'samesite=lax;';
  const path = 'path=/;';
  document.cookie =
    '_cookies_accepted=' + value + '; ' + expires + '; ' + samesite + path;
  if (enabledTracking(value)) {
    pushPageview();
  }
};

export const getCookie = () => {
  const toMatch = '_cookies_accepted=';
  const splitArray = document.cookie.split(';');
  let cookieValue = '';
  let currentCookieValue = '';
  for (let i = 0; i < splitArray.length; i++) {
    let cookie = splitArray[i];
    while (cookie.charAt(0) == ' ') {
      cookie = cookie.substring(1);
    }
    currentCookieValue = cookie.substring(toMatch.length, cookie.length);
    if (cookie.indexOf(toMatch) === 0 && currentCookieValue !== 'true') {
      cookieValue = currentCookieValue;
    }
  }
  return cookieValue;
};

export const preferenceNotSelected = () => {
  const cookieValue = getCookie('_cookies_accepted');
  // Skip a value of "true" to override old existing cookies
  if (cookieValue && cookieValue != 'true') {
    return false;
  } else {
    return true;
  }
};

export const hideSpecified = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const cpQuery = urlParams.get('cp');

  if (cpQuery === 'hide') {
    return true;
  } else {
    return false;
  }
};

export const getContent = (language) => {
  if (content[language]) {
    return content[language];
  } else {
    return content['default'];
  }
};

export const getControlsContent = (details, language) => {
  if (details.content[language]) {
    return details.content[language];
  } else {
    return details.content['default'];
  }
};

const pushPageview = () => {
  if (typeof dataLayer === 'object') {
    dataLayer.push({ event: 'pageview' });
  }
};

const enabledTracking = (selectedPreference) => {
  if (selectedPreference == 'all' || selectedPreference == 'performance') {
    return true;
  } else {
    return false;
  }
};
