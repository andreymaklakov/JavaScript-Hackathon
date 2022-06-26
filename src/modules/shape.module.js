import { Module } from "../core/module";
import { random, getRandomXY, getRandomColor } from "../utils.js";
import { soundModule, clickModule } from "../app.js";

export class ShapeModule extends Module {
  #randomForm;
  #drawPlace;
  #ctx;
  #startPoint;

  constructor(type, text) {
    super(type, text);
  }

  #makeShape() {
    this.#randomForm = random(0, 3);
    this.#drawPlace = document.querySelector("canvas");
    if (this.#drawPlace.getContext) {
      this.#ctx = this.#drawPlace.getContext("2d");
      this.#startPoint = getRandomXY();
      this.#ctx.beginPath();
      this.#ctx.moveTo(this.#startPoint[0], this.#startPoint[1]);
      if (this.#randomForm === 0) {
        this.#ctx.lineTo(this.#startPoint[0] + 40, this.#startPoint[1] - 80);
        this.#ctx.lineTo(this.#startPoint[0] + 80, this.#startPoint[1]);
      }
      if (this.#randomForm === 1) {
        this.#ctx.arc(
          this.#startPoint[0],
          this.#startPoint[1],
          50,
          0,
          Math.PI * 2,
          true
        );
      }
      if (this.#randomForm === 2) {
        this.#ctx.lineTo(this.#startPoint[0] + 100, this.#startPoint[1]);
        this.#ctx.lineTo(this.#startPoint[0] + 100, this.#startPoint[1] + 100);
        this.#ctx.lineTo(this.#startPoint[0], this.#startPoint[1] + 100);
      }
      if (this.#randomForm === 3) {
        this.#ctx.lineTo(this.#startPoint[0] + 50, this.#startPoint[1] - 25);
        this.#ctx.lineTo(this.#startPoint[0] + 100, this.#startPoint[1]);
        this.#ctx.lineTo(this.#startPoint[0] + 100, this.#startPoint[1] + 75);
        this.#ctx.lineTo(this.#startPoint[0] + 50, this.#startPoint[1] + 100);
        this.#ctx.lineTo(this.#startPoint[0], this.#startPoint[1] + 75);
      }
      this.#ctx.fillStyle = getRandomColor();
      this.#ctx.fill();
    }
  }

  trigger() {
    soundModule.cleanBeforeStartOtherModule();
    clickModule.cleanBeforeStartOtherModule();

    this.#makeShape();
  }
}
