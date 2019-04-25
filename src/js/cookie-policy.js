export const cookiePolicy = options => {
  if (typeof cpNs === 'undefined') {
    var cpNs = {};
  }

  if (cpNs.hasOwnProperty('cookiePolicy')) {
    throw TypeError("Namespace 'cpNs' not available");
  }

  let context = null;

  const closeCookie = () => {
    if (context.getAttribute('open')) {
      context.removeAttribute('open');
      setCookie('_cookies_accepted', 'true', 3000);
    }
  };

  const setCookie = (name, value, exdays) => {
    const d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    const expires = 'expires=' + d.toUTCString();
    document.cookie = name + '=' + value + '; ' + expires;
  };

  const getCookie = nameParam => {
    const name = nameParam + '=';
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return '';
  };

  let content = options.content;
  let duration = options.duration;

  if (!content) {
    content = `We use cookies to improve your experience. By your continued
      use of this site you accept such use.`;
  }

  let start = `
    <div class="cookie-policy">
      <dialog
        tabindex="0"
        open="open"
        role="alertdialog"
        class="p-notification p-notification--cookie-policy"
        aria-labelledby="cookie-policy-title"
        aria-describedby="cookie-policy-content">
        <h1 id="cookie-policy-title" class="u-off-screen">
          Cookie policy notification
        </h1>
        <span class="p-notification__content"
          id="cookie-policy-content"
          role="document"
          tabindex="0">`;

  let end = `
        <button class="p-notification__close js-close"
          aria-label="Close this cookie policy notification">Close</button>
      </span>
    </dialog>
  </div>`;

  if (getCookie('_cookies_accepted') !== 'true') {
    const range = document.createRange();
    const fullNotice = `${start} ${content} ${end}`;
    const cookieNode = range.createContextualFragment(fullNotice);
    document.body.insertBefore(cookieNode, document.body.lastChild);
    context = document.querySelector('.p-notification--cookie-policy');
    context.querySelector('.js-close').addEventListener('click', function(e) {
      e.preventDefault();
      closeCookie();
    });

    if (duration) {
      window.setTimeout(function() {
        closeCookie();
      }, duration);
      window.addEventListener('unload', function() {
        closeCookie();
      });
    }
  }
};
