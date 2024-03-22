import { content } from "./content.js";

const DEFAULT_CONSENT = {
  ad_storage: "denied",
  ad_user_data: "denied",
  ad_personalization: "denied",
  analytics_storage: "denied",
  functionality_storage: "denied",
  personalization_storage: "denied",
  security_storage: "denied",
};

const ESSENTIAL_PREFERENCES = ["security_storage"];

const PERFORMANCE_PREFERENCES = [
  "ad_storage",
  "ad_user_data",
  "ad_personalization",
  "analytics_storage",
];

const FUNCTIONALITY_PREFERENCES = [
  "functionality_storage",
  "personalization_storage",
];

const ALL_PREFERENCES = [
  "ad_storage",
  "ad_user_data",
  "ad_personalization",
  "analytics_storage",
  "functionality_storage",
  "personalization_storage",
];

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

export const addGoogleConsentMode = () => {
  let consentAlreadySetup = false;

  // Check for existing gtag, consentSetup before adding the default script
  for (let item of document.scripts) {
    if (item.innerHTML.includes("gtag") || item.innerHTML.includes("consent")) {
      consentAlreadySetup = true;
    }
  }

  if (!consentAlreadySetup) {
    // Delete existing script
    let oldScript = document.getElementById("google-consent-mode");
    oldScript && oldScript.remove();

    // Add to head section
    const consentSetup = `
    <script id="google-consent-mode">
      // Define dataLayer and the gtag function.
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      // Set default consent to 'denied' as a placeholder
      gtag('consent', 'default', ${JSON.stringify(DEFAULT_CONSENT)});
    </script>`;

    if (document.head.innerHTML) {
      // Add to the top of the head section to ensure it's before the tag manager script
      document.head.innerHTML = consentSetup + document.head.innerHTML;
    } else {
      document.head.innerHTML = consentSetup;
    }
  }
};

export const loadConsentFromCookie = () => {
  const cookieValue = getCookie("_cookies_accepted");
  cookieValue && setGoogleConsentPreferences(cookieValue);
};

export const setGoogleConsentFromControls = (controls) => {
  const checkedControls = controls.filter((control) => control.isChecked());

  let updatedConsent = { ...DEFAULT_CONSENT };

  // We combine the preferences into a single object
  checkedControls.forEach((item) => {
    updatedConsent = updateConsentPreferences(updatedConsent, item.id);
  });

  // Insert the script at the bottom of the head section
  insertConsentScript(updatedConsent);
};

export const setGoogleConsentPreferences = (selectedPreference) => {
  let updatedConsent = updateConsentPreferences(
    DEFAULT_CONSENT,
    selectedPreference
  );

  // Insert the script at the bottom of the head section
  insertConsentScript(updatedConsent);
};

const updateConsentPreferences = (consentObject, selectedPreference) => {
  let updatedConsent = { ...consentObject };

  ESSENTIAL_PREFERENCES.forEach((item) => {
    updatedConsent[item] = "granted";
  });

  if (selectedPreference === "performance") {
    PERFORMANCE_PREFERENCES.forEach((item) => {
      updatedConsent[item] = "granted";
    });
  } else if (selectedPreference === "functionality") {
    FUNCTIONALITY_PREFERENCES.forEach((item) => {
      updatedConsent[item] = "granted";
    });
  } else if (selectedPreference === "all") {
    ALL_PREFERENCES.forEach((item) => {
      updatedConsent[item] = "granted";
    });
  }

  return updatedConsent;
};

const insertConsentScript = (consentObject) => {
  // Delete existing script
  let oldScript = document.getElementById("consent-mode-preferences");
  oldScript && oldScript.remove();

  let consentScript = `
    <script id="consent-mode-preferences">
      gtag("consent", "update", ${JSON.stringify(consentObject)})
    </script>
  `;

  if (document.head.innerHTML) {
    // Add to the bottom of the head section to ensure it's after the tag manager script
    document.head.innerHTML = document.head.innerHTML + consentScript;
  } else {
    document.head.innerHTML = consentScript;
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
