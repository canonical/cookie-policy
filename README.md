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
import { cookiePolicy } from 'cookie-policy';
```

### Options

You can configure the cookie policy with the following options.

#### Content:

You can edit to cookie policy message by passing the `cookiePolicy` function an options
object with a `content` value. For example:

```javascript
var options = {
  content: 'We use cookies to improve your experience.',
};
```

#### Full example via direct link

```javascript
var options = {
  content:
    'We use cookies to improve your experience. By your continued use of this site you accept such use.<br /> This notice will disappear by itself.',
  duration: 3000,
};
cpNs.cookiePolicy(options);
```

#### Full example via ES6 import

```javascript
import { cookiePolicy } from 'cookie-policy';

var options = {
  content:
    'We use cookies to improve your experience. By your continued use of this site you accept such use.<br /> This notice will disappear by itself.',
  duration: 3000,
};
cookiePolicy(options);
```

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

You can view the build files in action by opening the `index.html` in the root
of this project.

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
