import { getCookie, setCookie } from "./utils.js";
import { isOfflineMode } from "./state.js";

/*
 * POSTs updated preferences to the shared cookie service endpoint
 * via the canonicalwebteam.cookie_service package 
 **/
export function postUpdatedPreferences() {
  if (isOfflineMode()) {
    return;
  }

  const cookieAcceptanceValue = getCookie("_cookies_accepted=");
  if (!cookieAcceptanceValue) {
    return;
  }
  // POST to the backend endpoint
  // Which then POSTs to cookies.canonical.com
  fetch("/cookies/set-preferences", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({"preferences": {"consent": cookieAcceptanceValue}})
  })
  .then(response => {
    if (!response.ok) {
      setCookie("_cookies_set_offline=", true);
    }
  })
  .catch(err => console.error("Error sending preferences:", err));
}

/*
 * GET request to initialize shared cookie service
 * Retrieves whether to redirect user or set preferences (or do nothing)
 **/
export async function getCookieStatus() {
  try {
    const response = await fetch("/cookies/init", {
      credentials: "include",
      cache: "no-store"
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }

    const data = await response.json();

    return data ?? false;
  } catch (err) {
    console.error("Error initializing shared cookie service:", err);
    return false;
  }
}
