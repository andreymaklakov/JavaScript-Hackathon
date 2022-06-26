import { Module } from "../core/module";
import { random, clearCanvas, getAudio } from "../utils.js";
import { timerModule, clickModule } from "../app.js";

export class SoundModule extends Module {
  #randomNumber;
  #pictureContainer;
  #pictureDiv;
  #picturebtn;
  #picture;
  #header;
  #pictures;
  #buttons;

  URL = "https://www.google.com/logos/fnbx/animal_sounds/";
  animals = [
    {
      animal: "bee.png",
      sound: "bee.mp3",
    },
    {
      animal: "otter.png",
      sound: "otter.mp3",
    },
    {
      animal: "rooster.png",
      sound: "rooster.mp3",
    },
    {
      animal: "rattlesnake.png",
      sound: "rattlesnake.mp3",
    },
    {
      animal: "pig.png",
      sound: "pig.mp3",
    },
    {
      animal: "owl.png",
      sound: "owl.mp3",
    },
    {
      animal: "falcon.png",
      sound: "falcon.mp3",
    },
    {
      animal: "cat.png",
      sound: "cat.mp3",
    },
    {
      animal: "ferret.png",
      sound: "ferret.mp3",
    },
    {
      animal: "camel.png",
      sound: "camel.mp3",
    },
    {
      animal: "buffalo.png",
      sound: "buffalo.mp3",
    },
    {
      animal: "chicken.png",
      sound: "chicken.mp3",
    },
  ];

  constructor(type, text) {
    super(type, text);

    this.#pictureContainer = document.createElement("div");
  }

  #randomSound() {
    this.#randomNumber = random(0, 11);

    return `${this.URL}${this.animals[this.#randomNumber].sound}`;
  }

  #renderPictures() {
    for (let i = 0; i < 12; i++) {
      this.#pictureDiv = document.createElement("div");
      this.#pictureDiv.className = "picture";
      this.#pictureContainer.append(this.#pictureDiv);
      this.#picturebtn = document.createElement("button");
      this.#picturebtn.className = "pcbtn";
      this.#picture = document.createElement("img");
      this.#picture.src = `${this.URL}${this.animals[i].animal}`;
      this.#picture.alt = this.animals[i].animal;
      this.#picturebtn.append(this.#picture);
      this.#pictureDiv.append(this.#picturebtn);
    }

    this.#pictureContainer.className = "container";

    this.#header = document.createElement("h1");
    this.#header.className = "sound_header";
    this.#header.textContent = "Угадайте чей это голос";

    this.#pictureContainer.append(this.#header);
    document.body.append(this.#pictureContainer);
  }

  #cleaning() {
    this.#pictures = document.querySelectorAll(".picture");

    this.#pictures.forEach((picture) => picture.remove());

    if (this.#header) {
      this.#header.remove();
    }

    this.#pictureContainer.remove();
  }

  #button() {
    this.#buttons = document.querySelectorAll(".pcbtn");

    this.#buttons.forEach((btn) =>
      btn.addEventListener("click", (event) => {
        if (event.target.alt === this.animals[this.#randomNumber].animal) {
          this.#pictures = document.querySelectorAll(".picture");
          this.#pictures.forEach((picture) => picture.remove());

          this.#header.textContent = "Вы угадали!";
          this.#header.style.color = "green";
          this.#pictureContainer.style.width = "100%";

          setTimeout(() => {
            this.#header.remove();
            this.#pictureContainer.remove();
          }, 1000);
        } else {
          this.#pictures = document.querySelectorAll(".picture");
          this.#pictures.forEach((picture) => picture.remove());

          this.#header.textContent = "Вы Не угадали!";
          this.#header.style.color = "red";
          this.#pictureContainer.style.width = "100%";

          setTimeout(() => {
            this.#header.remove();
            this.#pictureContainer.remove();
          }, 1000);
        }
      })
    );
  }

  cleanBeforeStartOtherModule() {
    if (this.#pictureContainer) {
      this.#cleaning();
      this.#pictureContainer.remove();
    }
  }

  trigger() {
    timerModule.cleanBeforeStartOtherModule();
    clickModule.cleanBeforeStartOtherModule();
    this.cleanBeforeStartOtherModule();
    clearCanvas();

    if (this.#header) {
      this.#header.remove();
    }

    getAudio(this.#randomSound());
    this.#renderPictures();
    this.#button();
  }
}
