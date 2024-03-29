import {
  setCookie,
  getContent,
  setGoogleConsentPreferences,
  setGoogleConsentFromControls,
} from "./utils.js";
import { Control } from "./control.js";
import { controlsContent } from "./content.js";

export class Manager {
  constructor(container, destroyComponent) {
    this.container = container;
    this.controlsStore = [];
    this.destroyComponent = destroyComponent;
  }

  getManagerMarkup(language) {
    const managerContent = getContent(language).manager;
    const manager = `
    <div class="p-modal" id="modal">
    <div class="p-modal__dialog" role="dialog" aria-labelledby="modal-title" aria-describedby="modal-description">
      <header class="p-modal__header">
        <h2 class="p-modal__title" id="modal-title">${managerContent.title}</h2>
      </header>
      <p id="modal-description">${managerContent.body1}</p>
      <p>${managerContent.body2}</p>
      <p>${managerContent.body3}</p>
      <p>${managerContent.body4}</p>
      <p><button class="p-button--positive u-no-margin--bottom js-close">${managerContent.acceptAll}</button></p>
      <p>${managerContent.acceptAllHelp}</p>
      <hr />
      <div class="controls"></div>
      <button class="p-button js-save-preferences">${managerContent.SavePreferences}</button>
    </div>
  </div>`;

    return manager;
  }

  render(language) {
    this.container.innerHTML = this.getManagerMarkup(language);
    const controlsContainer = this.container.querySelector(".controls");
    controlsContent.forEach((controlDetails) => {
      const control = new Control(controlDetails, controlsContainer, language);
      this.controlsStore.push(control);
    });
    this.initaliseListeners();
  }

  initaliseListeners() {
    this.container.querySelector(".js-close").addEventListener("click", () => {
      setCookie("all");
      setGoogleConsentPreferences("all");
      this.destroyComponent();
    });

    this.container
      .querySelector(".js-save-preferences")
      .addEventListener("click", () => {
        this.savePreferences();
        this.destroyComponent();
      });
  }

  savePreferences() {
    const checkedControls = this.controlsStore.filter((control) =>
      control.isChecked()
    );

    if (this.controlsStore.length === checkedControls.length) {
      setCookie("all");
    } else {
      this.controlsStore.forEach((control) => {
        if (control.isChecked()) {
          // Note: this overwrites the previous cookie
          setCookie(control.getId());
        }
      });
    }

    setGoogleConsentFromControls(this.controlsStore);
  }
}
