import { Notification } from './notification.js';
import { Manager } from './manager.js';
import { preferenceNotSelected } from './utils.js';

export const cookiePolicy = (callback = null) => {
  let cookiePolicyContainer = null;

  const renderNotification = function () {
    if (cookiePolicyContainer === null) {
      cookiePolicyContainer = document.createElement('div');
      cookiePolicyContainer.classList.add('cookie-policy');
      document.body.appendChild(cookiePolicyContainer);
      const notifiation = new Notification(
        cookiePolicyContainer,
        renderManager,
        close
      );
      notifiation.render();
    }
  };

  const renderManager = function () {
    const manager = new Manager(cookiePolicyContainer, close);
    manager.render();
  };

  const close = function () {
    if (typeof callback === 'function') {
      callback();
    }
    document.body.removeChild(cookiePolicyContainer);
    cookiePolicyContainer = null;
  };

  const revokeButton = document.querySelector('.js-revoke-cookie-manager');
  if (revokeButton) {
    revokeButton.addEventListener('click', renderNotification);
  }

  if (preferenceNotSelected()) {
    renderNotification();
  }
};
