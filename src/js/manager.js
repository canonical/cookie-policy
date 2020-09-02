import { setCookie } from './utils.js';
import { Control } from './control.js';
import { controlsContent } from './content.js';

export class Manager {
  constructor(container, destroyComponent) {
    this.container = container;
    this.controlsStore = [];
    this.destroyComponent = destroyComponent;
    this.content = `
      <div class="p-modal" id="modal">
        <div class="p-modal__dialog" role="dialog" aria-labelledby="modal-title" aria-describedby="modal-description">
          <header class="p-modal__header">
            <h2 class="p-modal__title" id="modal-title">Tracking choices</h2>
          </header>
          <p id="modal-description">We use cookies to recognise visitors and remember your preferences.</p>
          <p>They enhance user experience, personalise content and ads, provide social media features, measure campaign effectiveness, and analyse site traffic.</p>
          <p>Select the types of trackers you consent to, both by us, and third parties.</p>
          <p>Visit <a href="https://ubuntu.com/legal/data-privacy#cookies">cookie policy</a> to learn more.</p>
          <p><button class="p-button--positive u-no-margin--bottom js-close">Accept all</button></p>
          <p>This will switch all toggles "ON".</p>
          <hr />
          <div class="controls"></div>
          <button class="p-button--neutral js-save-preferences">Save preferences</button>
        </div>
      </div>`;
  }

  render() {
    this.container.innerHTML = this.content;
    const controlsContainer = this.container.querySelector('.controls');
    controlsContent.forEach((controlDetails) => {
      const control = new Control(controlDetails, controlsContainer);
      this.controlsStore.push(control);
    });
    this.initaliseListeners();
  }

  initaliseListeners() {
    this.container.querySelector('.js-close').addEventListener('click', () => {
      setCookie('all');
      this.destroyComponent();
    });

    this.container
      .querySelector('.js-save-preferences')
      .addEventListener('click', () => {
        this.savePreferences();
        this.destroyComponent();
      });
  }

  savePreferences() {
    const checkedControls = this.controlsStore.filter((control) =>
      control.isChecked()
    );

    if (this.controlsStore.length === checkedControls.length) {
      setCookie('all');
    } else {
      this.controlsStore.forEach((control) => {
        if (control.isChecked()) {
          setCookie(control.getId());
        }
      });
    }
  }
}
