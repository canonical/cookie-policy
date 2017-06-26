'use strict';

/**
 * Setup namespace
 */
if (typeof ubuntu === 'undefined') {
  var ubuntu = {};
}

if (ubuntu.hasOwnProperty('cookiePolicy')) {
  throw TypeError("Namespace 'ubuntu' not available");
}

// The cookie policy injection and interaction
ubuntu.cookiePolicy = function () {
  var context = null;
  var options = {
    'content': 'We use cookies to improve your experience. By your continued\n      use of this site you accept such use. To change your settings\n      please\n      <a href="https://www.ubuntu.com/legal/terms-and-policies/privacy-policy#cookies">\n        see our policy\n      </a>.'
  };

  return {
    setup: function setup(options) {
      var content = options.content;
      var duration = options.duration;
      var start = '\n        <div class="p-notification--cookie-policy">\n          <p class="p-notification__content">';
      var end = '\n            <a href="" class="p-notification__close js-close">Close</a>\n          </p>\n        </div>';
      if (!content) {
        content = 'We use cookies to improve your experience. By your continued\n          use of this site you accept such use. To change your settings\n          please\n          <a href="https://www.ubuntu.com/legal/terms-and-policies/privacy-policy#cookies">\n            see our policy\n          </a>.';
      }

      if (this.getCookie('_cookies_accepted') !== 'true') {
        var range = document.createRange();
        var fullNotice = start + ' ' + content + ' ' + end;
        var cookieNode = range.createContextualFragment(fullNotice);
        document.body.insertBefore(cookieNode, document.body.lastChild);
        this.context = document.querySelector('.p-notification--cookie-policy');
        this.context.querySelector('.js-close').addEventListener('click', function (e) {
          e.preventDefault();
          this.closeCookie();
        }.bind(this));

        if (duration) {
          window.setTimeout(function () {
            this.closeCookie();
          }.bind(this), duration);
        }
      }
    },

    closeCookie: function closeCookie() {
      this.context.style.display = 'none';
      this.setCookie('_cookies_accepted', 'true', 3000);
    },

    setCookie: function setCookie(name, value, exdays) {
      var d = new Date();
      d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
      var expires = 'expires=' + d.toUTCString();
      document.cookie = name + '=' + value + '; ' + expires;
    },

    getCookie: function getCookie(name) {
      var name = name + '=';
      var ca = document.cookie.split(';');
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
          c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
          return c.substring(name.length, c.length);
        }
      }
      return '';
    }
  };
}();