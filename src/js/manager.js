import { deleteCookie, setCookie, setAllPreference } from './utils.js';
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
            <h2 class="p-modal__title" id="modal-title">Tracking preferences</h2>
          </header>
          <p id="modal-description">We use technologies such as cookies on our site to recognise visitors and remember their preferences, enhance user experience, personalise content and ads, provide social media features, and to measure campaign effectiveness and analyse site traffic. Please review and select which types of trackers you consent to the use of by us and third parties on our site. </p>
          <p>For further details or to change your consent choices at any time see our cookie policy.</p>
          <p><button class="p-button--positive u-no-margin--bottom js-close">Accept recommended settings</button></p>
          <p>This will automatically switch all toggles below to "ON".</p>
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
      let control = new Control(controlDetails, controlsContainer);
      if (control.element) {
        this.controlsStore.push({
          id: [controlDetails.id],
          element: control.element,
        });
      }
    });
    this.initaliseListeners();
  }

  initaliseListeners() {
    this.container.querySelector('.js-close').addEventListener('click', (e) => {
      setAllPreference();
      this.destroyComponent();
    });

    this.container
      .querySelector('.js-save-preferences')
      .addEventListener('click', (e) => {
        this.savePreferences();
        this.destroyComponent();
      });
  }

  savePreferences() {
    const checkedControls = this.controlsStore.filter(
      (control) => control.element.checked
    );

    if (this.controlsStore.length === checkedControls.length) {
      setAllPreference();
    } else {
      this.controlsStore.forEach((control) => {
        control.element.checked
          ? setCookie(`_cookies_accepted_${control.id}`, true)
          : deleteCookie(`_cookies_accepted_${control.id}`);
      });
    }
  }
}
