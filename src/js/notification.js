import { setCookie, getContent } from './utils.js';
import { content } from './content.js';

export class Notification {
  constructor(container, renderManager, destroyComponent) {
    this.container = container;
    this.renderManager = renderManager;
    this.destroyComponent = destroyComponent;
  }

  getNotificationMarkup(language) {
    const notificationContent = getContent(language);
    const notification = `
      <dialog
        tabindex="0"
        open="open"
        role="alertdialog"
        class="p-notification p-notification--cookie-policy"
        aria-labelledby="cookie-policy-title"
        aria-describedby="cookie-policy-content">
        <span class="p-notification__content"
          id="cookie-policy-content"
          role="document"
          tabindex="0">
          <h1 id="cookie-policy-title" class="p-heading--four">${notificationContent.notification.title}</h1>
          <hr />
          <p>${notificationContent.notification.body1}</p>
          <p>${notificationContent.notification.body2}</p>
          <p>${notificationContent.notification.body3}</p>
          <p class="u-no-margin--bottom">
            <button class="p-button--positive js-close">${notificationContent.notification.buttonAccept}</button>
            <button class="p-button--neutral u-no-margin--bottom js-manage">${notificationContent.notification.buttonManage}</button>
          </p>
        </span>
      </dialog>`;

    return notification;
  }

  render(language) {
    this.container.innerHTML = this.getNotificationMarkup(language);
    this.initaliseListeners();
  }

  initaliseListeners() {
    this.container.querySelector('.js-close').addEventListener('click', (e) => {
      setCookie('all');
      this.destroyComponent();
    });
    this.container
      .querySelector('.js-manage')
      .addEventListener('click', (e) => {
        this.renderManager();
      });
  }
}
