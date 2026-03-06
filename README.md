# Canonical cookie policy component

This project contains the scripts and styles to display a cookie policy notification on a web page.

You can use it to display a custom cookies message of your choosing on your own web page.

## Usage

This project can be installed via an [NPM package](https://www.npmjs.com/package/cookie-policy).

```bash
yarn add @canonical/cookie-policy
```

...or...

```bash
npm install @canonical/cookie-policy
```

You can then install the library either by directly linking to it or via an ES6 import.

1. Via direct link

To consume the library directly, add a link to the JS file containing an [IIFE](https://developer.mozilla.org/en-US/docs/Glossary/IIFE) and call the lib:

```javascript
<script src="[ INSERT YOUR LOCAL PATH ]/js/cookie-policy.js"></script>
<script>
  cpNs.cookiePolicy();
</script>
```

2. Via ES6 import

```javascript
import { cookiePolicy } from '@canonical/cookie-policy';
```

### cookiePolicy parameters

The cookie policy function that sets up the cookie policy takes two possible parameters:

1. `callback` (default = null) - a callback function, which is called after a user selects there cookie preferences
2. `initWithCookieService` (default = false) - a bool, that dictates whether to try and intergrate with our share cookie service

### Revoking the cookie policy

If you would like users to change their preferences you can add `js-revoke-cookie-manager` class to any element that is present in the document to recall the policy manager.

```html
<button class="js-revoke-cookie-manager">Revoke cookie manager</button>
```

or

```html
<a href="" class="js-revoke-cookie-manager">Revoke cookie manager</a>
```

### Visiting a page with tracker disabled

If you add the query `?cp=hide` to any URL the cookie policy will not be rendered. The main use case is to visit the policy page without the modal blocking the content.

### Callback hook

You can set up the cookie policy with a callback when a preference is selected.

```javascript
function callbackFunction() {
  alert('Calling back');
}
cpNs.cookiePolicy(callbackFunction);
```

### Shared cookie service

If `initWithCookieService = true`, this triggers the calling of the function `initSharedCookieService()`, and means the cookie policy will attempt to retrieve the users cookie preferences from our cookie database. This requires the Flask extension [canonicalwebteam.cookie_service](https://github.com/canonical/canonicalwebteam.cookie_service) to be intergrated into the project.

If `initWithCookieService = false` or is not passed, the cookie policy will only use cookies set on that specific site.

The shared cookie service logic sets the following additional cookies:

- `_cookies_accepted: all|performance|functional|essential|unset`: The preference selected by the user.
- `_cookies_freshness_ts: <timestamp>`: This is used to ensure the cookie that has been set is fresh by 1 day. If it is not, it will query the central service for the most up to date cookie.
- `_cookies_set_offline: true | null`: This flag is set if a cookie preference was set while the cookie serivce was unavailable. Next time the service is up the cookie preferences will be synced and the flag removed.

An additional cookie is set by the Flask extension [canonicalwebteam.cookie_service](https://github.com/canonical/canonicalwebteam.cookie_service):

- `_cookies_auth_token: <encrypted_token>`: Used to identify the user between different sites. This is stored centrally as https://cookies.canonical.com, as a session cookie.
- `_cookies_redirect_attempted: 1 | null`: This is a flag to signal that the redirect to the central service, required for authentication and initial setting of `_cookies_auth_token`, was attempted (whether successful or not). It expires at the end of the session.


#### Full example via ES6 import

```javascript
import { cookiePolicy } from '@canonical/cookie-policy';

cookiePolicy();
```

### Cookie groups

Essential cookies are always allowed, unless the user turns them off in their browser. Otherwise, there will be a series of values the `_cookies_accepted` cookie can contain :
| Cookie value | Description | Note |
| --- | --- | --- |
| all | All cookies accepted by the user. Currently used by the existing widget | Previous value was `true`. Using the same cookie. |
| essential | Essential cookies accepted. | This is used to hide the notification instead of not setting the cookie |
| performance | Performance cookies accepted. | - |
| functionality | Functionality cookies accepted. | - |

### APIs - /_cookies/set-preferences

This package will attempt to POST users cookie preferences to our shared cookie service (cookies.canonical.com).
This is handled by a [Python package](https://github.com/canonical/canonicalwebteam.cookie_service), canonicalwebteam.cookies_service, that expose an internal endpoint '/_cookies/set-preferences',
The attempt to POST will only be made providing the cookie `_cookies_service_up=1` exists. Applications not using the aforementioned Python package will not attempt to POST the users preferences.

## Contributing

If you would like to help improve this project, here is a list of commands to
help you get started.

### Building the cookie policy

Install the requisite dependencies;

```
npm install
```

To build the JS and CSS into the build folder, run:

```
npm run build
```

You can view the build files in action by running:

```
npm run serve
```

And, visiting http://0.0.0.0:8301/

### Hacking

When developing this project you can run the following command to listen to
changes in the `src/js/*js` and `src/sass/*scss` folders and build them into the
`/build` folder.

```
npm run watch
```

Before submitting your pull request, run the linters, which checks both the JS
and Sass for errors.

```
npm run test
```

Code licensed LGPLv3 by Canonical Ltd.

With ♥ from Canonical
