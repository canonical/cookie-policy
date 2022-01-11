import { getControlsContent } from "./utils.js";

export class Control {
  constructor(details, container, language) {
    this.language = language;
    this.id = details.id;
    this.title = getControlsContent(details, language).title;
    this.description = getControlsContent(details, language).description;
    this.showSwitcher = details.showSwitcher;
    this.container = container;
    this.element;

    // Rendering off the bat here as this is a dumb component.
    // It saves creating a variable and calling .render() on it.
    this.render();
  }

  render() {
    const control = document.createElement("div");
    control.classList.add("u-sv3");
    control.innerHTML = `
      ${
        this.showSwitcher
          ? `<label class="u-float-right p-switch">
        <input type="checkbox" class="p-switch__input js-${this.id}-switch">
        <span class="p-switch__slider"></span>
      </label>`
          : ""
      }
      <h4>${this.title}</h4>
      <p>${this.description}</p>`;
    this.container.appendChild(control);
    this.element = control.querySelector(`.js-${this.id}-switch`);
  }

  isChecked() {
    return this.element ? this.element.checked : true;
  }

  getId() {
    return this.id;
  }
}
