import { getCookie } from "./utils.js";
import { isOfflineMode } from "./state.js";

/*
 * POSTs updated preferences to the shared cookie service endpoint
 * via the canonicalwebteam.cookie_service package 
 **/
export async function postUpdatedPreferences() {
  if (isOfflineMode()) {
    throw new Error("Cannot update preferences while offline");
  }

  const cookieAcceptanceValue = getCookie("_cookies_accepted=");
  if (!cookieAcceptanceValue) {
    throw new Error("No cookie acceptance value found");
  }

  try {
    const response = await fetch("/_cookies/set-preferences", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({"preferences": {"consent": cookieAcceptanceValue}})
    });

    if (!response.ok) {
      throw new Error(`Failed to update preferences: ${response.statusText}`);
    }

    const data = await response.json();
    if (!data) {
      throw new Error("No data returned from preferences update");
    }

    return data;
  } catch (err) {
    console.error("Error sending preferences:", err);
  }
}

/*
 * GET request to initialize shared cookie service
 * Retrieves whether to redirect user or set preferences (or do nothing)
 **/
export async function getCookieStatus() {
  try {
    const response = await fetch("/_cookies/init", {
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
