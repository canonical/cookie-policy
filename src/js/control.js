export class Control {
  constructor(details, container) {
    this.id = details.id;
    this.title = details.title;
    this.description = details.description;
    this.showSwitcher = details.showSwitcher;
    this.container = container;
    this.element;

    // Rendering off the bat here as this is a dumb component.
    // It saves creating a variable and calling .render() on it.
    this.render();
  }

  render() {
    let control = document.createElement('div');
    control.classList.add('u-sv3');
    control.innerHTML = `
      ${
        this.showSwitcher
          ? `<label class="u-float-right">
        <input type="checkbox" class="p-switch js-${this.id}-switch">
        <div class="p-switch__slider"></div>
      </label>`
          : ''
      }
      <h3 class="p-heading--four">${this.title}</h3>
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
