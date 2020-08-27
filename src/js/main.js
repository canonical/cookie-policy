import { Notification } from './notification.js';
import { Manager } from './manager.js';
import { preferenceNotSelected } from './utils.js';

export const cookiePolicy = (callback = null) => {
  const cookiePolicyContainer = document.createElement('div');
  cookiePolicyContainer.classList.add('cookie-policy');

  const renderNotification = function () {
    const notifiation = new Notification(
      cookiePolicyContainer,
      renderManager,
      close
    );
    notifiation.render();
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
  };

  if (preferenceNotSelected()) {
    document.body.appendChild(cookiePolicyContainer);
    renderNotification();
  }
};
