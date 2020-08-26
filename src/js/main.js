import { Notification } from './notification.js';
import { Manager } from './manager.js';
import { preferenceNotSelected } from './utils.js';

export const cookiePolicy = () => {
  if (typeof cpNs === 'undefined') {
    var cpNs = {};
  }

  if (cpNs.hasOwnProperty('cookiePolicy')) {
    throw TypeError("Namespace 'cpNs' not available");
  }

  const cookiePolicyContainer = document.createElement('div');
  cookiePolicyContainer.classList.add('cookie-policy');

  const renderNotification = function () {
    const notifiation = new Notification(cookiePolicyContainer, renderManager);
    notifiation.render();
  };

  const renderManager = function () {
    const manager = new Manager(cookiePolicyContainer);
    manager.render();
  };

  if (preferenceNotSelected()) {
    document.body.appendChild(cookiePolicyContainer);
    renderNotification();
  }
};
