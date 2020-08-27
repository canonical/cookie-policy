import { deleteCookie, setCookie } from './utils.js';
import { controlsContent } from './content.js';

export class Notification {
  constructor(container, renderManager, destroyComponent) {
    this.container = container;
    this.renderManager = renderManager;
    this.destroyComponent = destroyComponent;
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
          <p>By selecting ‘Accept‘, you consent to the use of these methods by us and trusted third parties.</p>
          <p>For further details or to change your consent choices at any time see our <a href="https://ubuntu.com/legal/data-privacy#cookies">cookie policy</a>.</p>
          <p class="u-no-margin--bottom">
            <button class="p-button--positive js-close">Accept all and visit site</button>
            <button class="p-button--neutral u-no-margin--bottom js-manage">Manage your tracker settings</button>
          </p>
        </span>
      </dialog>`;
  }

  render() {
    this.container.innerHTML = this.content;
    this.initaliseListeners();
  }

  initaliseListeners() {
    this.container.querySelector('.js-close').addEventListener('click', (e) => {
      setCookie('_cookies_accepted_all', true);
      controlsContent.forEach((controlDetails) => {
        if (controlDetails.showSwitcher) {
          deleteCookie(`_cookies_accepted_${controlDetails.id}`);
        }
      });
      this.destroyComponent();
    });
    this.container
      .querySelector('.js-manage')
      .addEventListener('click', (e) => {
        this.renderManager();
      });
  }
}
