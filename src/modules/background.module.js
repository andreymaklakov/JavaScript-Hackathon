import { Module } from "../core/module";
import { getRandomColor, getAudio } from "../utils.js";

export class BackgroundModule extends Module {
  #interval;
  #interval2;
  #audioURL;

  constructor(type, text) {
    super(type, text);

    this.#audioURL =
      "https://zvukipro.com/uploads/files/2020-08/1596600771_530a6783abafdfd.mp3";
  }

  #colorPlay() {
    this.#interval = setInterval(() => {
      document.body.style.background = getRandomColor();
      getRandomColor();
    }, 100);
    setTimeout(() => {
      clearInterval(this.#interval);
    }, 1000);
    setTimeout(() => {
      this.#interval2 = setInterval(() => {
        document.body.style.background = getRandomColor();
        getRandomColor();
      }, 300);
    });
    setTimeout(() => {
      clearInterval(this.#interval2);
    }, 2400);
  }

  trigger() {
    this.#colorPlay();

    getAudio(this.#audioURL);
  }
}
