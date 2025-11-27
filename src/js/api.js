import { getCookie } from "./utils.js";

/*
 * POSTs updated preferences to the shared cookie service endpoint
 * via the canonicalwebteam.cookie_service package 
 **/
export function postUpdatedPreferences() {
  // Check if cookie service is enabled
  const cookieServiceUp = getCookie("_cookies_service_up=");
  if (!cookieServiceUp || cookieServiceUp !== "1") {
    return;
  }
  // Check if preferences cookie exists
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
  .catch(err => console.error("Error sending preferences:", err));
}