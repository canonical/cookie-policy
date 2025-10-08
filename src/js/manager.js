import {
  getContent,
  setGoogleConsentPreferences,
  setGoogleConsentFromControls,
  setCookiesAcceptedCookie,
} from "./utils.js";
import { Control } from "./control.js";
import { controlsContent } from "./content.js";
import { postConsentPreferences } from "./api.js";

export class Manager {
  constructor(container, destroyComponent, sessionParams = null) {
    this.container = container;
    this.controlsStore = [];
    this.destroyComponent = destroyComponent;
    this.sessionParams = sessionParams;
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
      <button class="p-button js-save-preferences">${managerContent.handleSavePreferences}</button>
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
    this.container
      .querySelector(".js-close")
      .addEventListener("click", async () => {
        await this.handleAcceptAll();
      });

    this.container
      .querySelector(".js-save-preferences")
      .addEventListener("click", async () => {
        await this.handleSavePreferences();
        this.destroyComponent();
      });
  }

  async handleAcceptAll() {
    // And if we don't have a session??
    const preference = "all";

    if (
      this.sessionParams &&
      this.sessionParams.code &&
      this.sessionParams.user_uuid
    ) {
      const result = await postConsentPreferences(
        this.sessionParams.code,
        this.sessionParams.user_uuid,
        { consent: preference }
      );

      if (result.success) {
        setCookiesAcceptedCookie(preference);
        setGoogleConsentPreferences(preference);
      }
    }

    this.destroyComponent();
  }

  async handleSavePreferences() {
    const checkedControls = this.controlsStore.filter((control) =>
      control.isChecked()
    );

    let preference;
    if (this.controlsStore.length === checkedControls.length) {
      preference = "all";
    } else {
      // Get the last checked control's preference
      const lastCheckedControl = checkedControls[checkedControls.length - 1];
      preference = lastCheckedControl
        ? lastCheckedControl.getId()
        : "essential";
    }

    // If we have session parameters, save to server
    if (
      this.sessionParams &&
      this.sessionParams.code &&
      this.sessionParams.user_uuid
    ) {
      const result = await postConsentPreferences(
        this.sessionParams.code,
        this.sessionParams.user_uuid,
        { consent: preference }
      );

      if (result.success) {
        setCookiesAcceptedCookie(preference);
        setGoogleConsentFromControls(this.controlsStore); // what is this.controlsStore?
      }
    }

    this.destroyComponent();
  }
}
