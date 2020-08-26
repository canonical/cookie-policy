import { deleteCookie, setCookie } from './utils.js';
import { controlsContent } from './content.js';

export class Notification {
  constructor(container, renderManager) {
    this.container = container;
    this.renderManager = renderManager;
    this.content = `
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
          tabindex="0">
          <h1 class="p-heading--four">Your tracker settings</h1>
          <hr />
          <p>We use cookies and similar methods to recognise visitors and remember preferences. We also use them to measure campaign effectiveness and analyse site traffic.</p>
          <p>By selecting ‘Accept,‘ you consent to the use of these methods by us and trusted third parties.</p>
          <p>For further details or to change your consent choices at any time see our <a href="https://ubuntu.com/legal/data-privacy#cookies">cookie policy</a>.</p>
          <p class="u-no-margin--bottom">
            <a href="" class="p-button--positive u-no-margin--bottom js-close">Accept all and visit site</a>
            <a href="" class="p-button--neutral u-no-margin--bottom js-manage">Manage your tracker settings</a>
          </p>
        </span>
      </dialog>`;
  }

  render() {
    this.container.innerHTML = this.content;
    this.initaliseListeners();
  }

  initaliseListeners() {
    var scope = this;
    this.container
      .querySelector('.js-close')
      .addEventListener('click', function (e) {
        e.preventDefault();
        scope.close();
      });
    this.container
      .querySelector('.js-manage')
      .addEventListener('click', function (e) {
        e.preventDefault();
        scope.renderManager();
      });
  }

  close() {
    setCookie('_cookies_accepted_all', true);
    controlsContent.forEach(function (controlDetails) {
      if (controlDetails.switcher) {
        deleteCookie(`_cookies_accepted_${controlDetails.switcher}`);
      }
    });
    const context = this.container.querySelector('dialog');
    if (context.getAttribute('open')) {
      context.removeAttribute('open');
    }
  }
}
