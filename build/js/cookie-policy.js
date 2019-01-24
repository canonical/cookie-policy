/**
 * Setup namespace
 */ if ('undefined' == typeof cpNs) var cpNs = {};
if (cpNs.hasOwnProperty('cookiePolicy'))
  throw TypeError("Namespace 'cpNs' not available"); // The cookie policy injection and interaction
cpNs.cookiePolicy = (function() {
  return {
    setup: function(a) {
      let b = a.content,
        c = a.duration;
      if (
        (b ||
          (b = `We use cookies to improve your experience. By your continued
          use of this site you accept such use. To change your settings
          please
          <a href="https://www.ubuntu.com/legal/terms-and-policies/privacy-policy#cookies">
            see our policy
          </a>.`),
        'true' !== this.getCookie('_cookies_accepted'))
      ) {
        const a = document.createRange(),
          d = `${`
        <dialog
          tabindex="0"
          open="open"
          role="alertdialog"
          class="p-notification--cookie-policy"
          aria-labelledby="cookie-policy-title"
          aria-describedby="cookie-policy-content">
          <h1 id="cookie-policy-title" class="u-off-screen">
            Cookie policy notification
          </h1>
          <span class="p-notification__content"
            id="cookie-policy-content"
            role="document"
            tabindex="0">`} ${b} ${`
            <button class="p-notification__close js-close"
               aria-label="Close this cookie policy notification">Close</button>
          </span>
        </dialog>`}`,
          e = a.createContextualFragment(d);
        document.body.insertBefore(e, document.body.lastChild),
          (this.context = document.querySelector(
            '.p-notification--cookie-policy'
          )),
          this.context.querySelector('.js-close').addEventListener(
            'click',
            function(a) {
              a.preventDefault(), this.closeCookie();
            }.bind(this)
          ),
          c &&
            (window.setTimeout(
              function() {
                this.closeCookie();
              }.bind(this),
              c
            ),
            window.addEventListener(
              'unload',
              function() {
                this.closeCookie();
              }.bind(this)
            ));
      }
    },
    closeCookie: function() {
      this.context.getAttribute('open') &&
        (this.context.removeAttribute('open'),
        this.setCookie('_cookies_accepted', 'true', 3e3));
    },
    setCookie: function(a, b, c) {
      const e = new Date();
      e.setTime(e.getTime() + 1e3 * (60 * (60 * (24 * c))));
      const d = 'expires=' + e.toUTCString();
      document.cookie = a + '=' + b + '; ' + d;
    },
    getCookie: function(a) {
      const b = a + '=',
        d = document.cookie.split(';');
      for (let e, c = 0; c < d.length; c++) {
        for (e = d[c]; ' ' == e.charAt(0); ) e = e.substring(1);
        if (0 === e.indexOf(b)) return e.substring(b.length, e.length);
      }
      return '';
    },
  };
})();
