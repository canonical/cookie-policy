import { content } from "./content.js";

export const setCookie = (value) => {
  const d = new Date();
  d.setTime(d.getTime() + 365 * 24 * 60 * 60 * 1000);
  const expires = "expires=" + d.toUTCString();
  const samesite = "samesite=lax;";
  const path = "path=/;";
  document.cookie =
    "_cookies_accepted=" + value + "; " + expires + "; " + samesite + path;
  if (enabledTracking(value)) {
    pushPageview();
  }
};

export const getCookie = () => {
  const toMatch = "_cookies_accepted=";
  const splitArray = document.cookie.split(";");
  let cookieValue = "";
  let currentCookieValue = "";
  for (let i = 0; i < splitArray.length; i++) {
    let cookie = splitArray[i];
    while (cookie.charAt(0) == " ") {
      cookie = cookie.substring(1);
    }
    currentCookieValue = cookie.substring(toMatch.length, cookie.length);
    if (cookie.indexOf(toMatch) === 0 && currentCookieValue !== "true") {
      cookieValue = currentCookieValue;
    }
  }
  return cookieValue;
};

export const preferenceNotSelected = () => {
  const cookieValue = getCookie("_cookies_accepted");
  // Skip a value of "true" to override old existing cookies
  if (cookieValue && cookieValue != "true") {
    return false;
  } else {
    return true;
  }
};

export const hideSpecified = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const cpQuery = urlParams.get("cp");

  if (cpQuery === "hide") {
    return true;
  } else {
    return false;
  }
};

export const getContent = (language) => {
  if (content[language]) {
    return content[language];
  } else {
    return content["default"];
  }
};

export const getControlsContent = (details, language) => {
  if (details.content[language]) {
    return details.content[language];
  } else {
    return details.content["default"];
  }
};

export const addGoogleConsentMode = (mode) => {
  // Add to head section
  const consentSetup = `
  <script>
    // Define dataLayer and the gtag function.
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    // Set default consent to 'denied' as a placeholder
    gtag('consent', 'default', {
      'ad_storage': 'denied',
      'ad_user_data': 'denied',
      'ad_personalization': 'denied',
      'analytics_storage': 'denied',
      'functionality_storage': 'denied',
      'personalization_storage': 'denied',
      'security_storage': 'denied'
    });
  </script>`;

  if (document.head.innerHTML) {
    // Add to the top of the head section to ensure it's before the tag manager script
    // TODO: Check for existing gtag and only add if it's there
    // TODO: Check for existing consentSetup and only add if it's not there
    // TODO: Minify the JS before adding it to the head
    document.head.innerHTML = consentSetup + document.head.innerHTML;
  } else {
    document.head.innerHTML = consentSetup;
  }
};

export const setGoogleConsentPreferences = (selectedPreference) => {
  // 'all' is the default
  let consentObject = `
    <script>
      gtag("consent", "update", {
        ad_storage: "granted",
        ad_user_data: "granted",
        ad_personalization: "granted",
        analytics_storage: "granted",
        functionality_storage: "granted",
        personalization_storage: "granted",
        security_storage: "granted",
      })
    </script>
  `;
  if (selectedPreference === "performance") {
    // 'performance'
    consentObject = `
      <script>
        function consentUpdate() {
          gtag("consent", "update", {
            ad_storage: "granted",
            ad_user_data: "granted",
            ad_personalization: "granted",
            analytics_storage: "granted",
            security_storage: "granted",
          });
        };
      </script>
    `;
  } else if (selectedPreference === "functionality") {
    // 'functionality'
    consentObject = `
      <script>
        function consentUpdate() {
          gtag('consent', 'update', {
            'functionality_storage': 'granted',
            'personalization_storage': 'granted',
            'security_storage': 'granted'
          });
        }
      </script>
    `;
  }

  if (document.head.innerHTML) {
    // Add to the bottom of the head section to ensure it's after the tag manager script
    document.head.innerHTML = document.head.innerHTML + consentObject;
  } else {
    document.head.innerHTML = consentObject;
  }
};

const pushPageview = () => {
  if (typeof dataLayer === "object") {
    dataLayer.push({ event: "pageview" });
  }
};

const enabledTracking = (selectedPreference) => {
  if (selectedPreference == "all" || selectedPreference == "performance") {
    return true;
  } else {
    return false;
  }
};
