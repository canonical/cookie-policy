# Canonical cookie policy component

By default, this project contains the scripts and styles to display the a cookie policy notification linking to the Ubuntu cookie policy on a web page.

You can use it to display a custom cookies message of your choosing on your own web page.

## Usage

This project can be installed from an [NPM package](https://www.npmjs.com/package/cookie-policy).

### Options

You can configure the cookie policy with the following options.

#### Message:

You can edit to cookie policy message by passing the setup function an options
object with a content value. For example:

```javascript
var options = {
  content: 'We use cookies to improve your experience.',
};
```

#### Timed destruction

You can make the cookie policy self-destruct in time by passing a duration value as
an option. Duration is measured in milliseconds.

```javascript
var options = {
  duration: 3000,
};
```

Note: It is recommended you add a link to your cookie policy in the footer of
your website when using this option.

#### Full example

```javascript
var options = {
  content:
    'We use cookies to improve your experience. By your continued use of this site you accept such use.<br /> This notice will disappear by itself. To change your settings please <a href="https://www.ubuntu.com/legal/terms-and-policies/privacy-policy#cookies">see our policy</a>.',
  duration: 3000,
};
cpNs.cookiePolicy.setup(options);
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
