import { Notification } from "./notification.js";
import { Manager } from "./manager.js";
import {
  preferenceNotSelected,
  hideSpecified,
  addGoogleConsentMode,
  loadConsentFromCookie,
  setCookie,
  setGoogleConsentPreferences
} from "./utils.js";
import { getCookieStatus } from "./api.js";
import { setOfflineMode } from "./state.js";

// Add Google Consent Mode as soon as the script is loaded
addGoogleConsentMode();

const initSharedCookieService = async () => {
  const data = await getCookieStatus();
  if (!data) {
    setOfflineMode(true)
    return;
  }

  switch (data.action) {
    case "redirect":
      const currentUrl = window.location.href  ? window.location.href : "/";
      window.location.replace(data.redirect_url + currentUrl);
      break;

    case "set_preferences":
      setCookie("_cookies_accepted=", data.consent);
      setCookie("_cookies_freshness_ts=", data.cookies_freshness_ts);
      setGoogleConsentPreferences(data.consent);
      break;

    case "none":
    default:
      break;
  }
}

export const cookiePolicy = (callback = null, initWithCookieService = false) => {
  let cookiePolicyContainer = null;
  let language = document.documentElement.lang;
  let initialised = false;
  let sharedCookiePromise = null;

  // Initialize and wait for the shared cookie service
  if (initWithCookieService && !sharedCookiePromise) {
    sharedCookiePromise = initSharedCookieService();
  }

  const renderNotification = function (e) {
    if (e) {
      e.preventDefault();
    }

    if (cookiePolicyContainer === null) {
      cookiePolicyContainer = document.createElement("dialog");
      cookiePolicyContainer.classList.add("cookie-policy");
      cookiePolicyContainer.style.pointerEvents = "none";
      cookiePolicyContainer.setAttribute("open", true);
      cookiePolicyContainer.style.borderStyle = "none";
      document.body.appendChild(cookiePolicyContainer);
      const notification = new Notification(
        cookiePolicyContainer,
        renderManager,
        close
      );
      notification.render(language);
      document.getElementById("cookie-policy-button-accept-all").focus();
    }
  };

  const renderManager = function () {
    const manager = new Manager(cookiePolicyContainer, close);
    manager.render(language);
  };

  const close = function () {
    if (typeof callback === "function") {
      callback();
    }
    document.body.removeChild(cookiePolicyContainer);
    cookiePolicyContainer = null;
  };

  const init = async function () {
    if (initialised) return;
    initialised = true;

    if (sharedCookiePromise) {
      await sharedCookiePromise;
    }

    // Load the consent from the cookie, if available
    loadConsentFromCookie();

    const revokeButton = document.querySelector(".js-revoke-cookie-manager");
    if (revokeButton) {
      revokeButton.addEventListener("click", renderNotification);
    }

    if (preferenceNotSelected() && !hideSpecified()) {
      renderNotification();
    }
  };

  if (document.readyState === "loading") {
    // If the document is still loading, listen for DOMContentLoaded
    document.addEventListener("DOMContentLoaded", init, false);
  } else {
    // Otherwise the script was triggered after the document was loaded, so we can run it immediately
    init();
  }
};
