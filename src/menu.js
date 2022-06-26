import { Menu } from "./core/menu";

export class ContextMenu extends Menu {
  #typeOfModule;
  modules = [];

  constructor(selector) {
    super(selector);

    this.el.addEventListener("click", (event) => {
      this.#typeOfModule = event.target.dataset.type;

      this.modules
        .find((module) => {
          return module.type === this.#typeOfModule;
        })
        .trigger();

      this.close();
    });
  }

  #render(event) {
    this.el.classList.add("open");
    this.el.style.position = "absolute";

    if (event.x > event.view.outerWidth - 150) {
      this.el.style.left = `${event.x - 150}px`;
      this.el.style.top = `${event.y}px`;
    } else if (event.y > event.view.outerHeight - 300) {
      this.el.style.top = `${event.y - 200}px`;
      this.el.style.left = `${event.x}px`;
    } else {
      this.el.style.left = `${event.x}px`;
      this.el.style.top = `${event.y}px`;
    }
  }

  add(module) {
    this.modules.push(module);
    this.el.insertAdjacentHTML("afterbegin", module.toHTML());
  }

  open() {
    document.body.addEventListener("contextmenu", (event) => {
      event.preventDefault();
      this.#render(event);
    });
  }

  close() {
    document.body.addEventListener("click", (event) => {
      this.el.classList.remove("open");
    });
  }
}
