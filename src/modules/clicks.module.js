import { Module } from "../core/module";
import { random, getRandomColor, clearCanvas } from "../utils.js";
import moment from "moment";
import "moment-precise-range-plugin";
import { soundModule, timerModule } from "../app.js";

export class ClicksModule extends Module {
  #circle;
  #size;
  #x;
  #y;
  #color;

  #width;
  #heigth;
  #canvas;
  #button;
  #counterHTML;
  #timeFrom;
  #timeTo;
  #date;
  #year;
  #month;
  #day;
  #hrs;
  #mins;
  #secs;
  #timerText;
  #timerDiv;
  #interval;
  #score;

  constructor(type, text) {
    super(type, text);

    this.#score = 0;
  }

  #startGame() {
    this.#createRandomCircle();

    this.#renderTimer();
    this.#renderScoreCounter();
    this.#getTime();
    this.#dateUpdate();
    this.#circleClick();
  }

  #createRandomCircle() {
    this.#canvas = document.querySelector("canvas");
    this.#circle = document.createElement("div");
    this.#button = document.createElement("button");

    this.#size = random(10, 60);

    this.#width = this.#canvas.width;
    this.#heigth = this.#canvas.height;

    this.#x = random(0, this.#width - 100);
    this.#y = random(0, this.#heigth - 100);

    this.#color = getRandomColor();

    this.#circle.classList.add("circle");

    this.#circle.style.width = `${this.#size}px`;
    this.#circle.style.height = `${this.#size}px`;

    this.#circle.style.top = `${this.#y}px`;
    this.#circle.style.left = `${this.#x}px`;

    this.#circle.style.backgroundColor = this.#color;

    this.#button.append(this.#circle);
    document.body.append(this.#button);
  }

  #circleClick() {
    this.#button.addEventListener("click", (event) => {
      this.#circleClean();
      this.#score += 1;
      this.#counterHTML.textContent = this.#score;

      this.#createRandomCircle();

      this.#circleClick();
    });
  }

  #renderScoreCounter() {
    this.#counterHTML = document.createElement("h1");
    this.#counterHTML.className = "score_counter";

    this.#timerDiv.append(this.#counterHTML);
  }

  #getTime() {
    this.#year = this.#date.getFullYear();
    this.#month = this.#date.getMonth();
    this.#day = this.#date.getDate();
    this.#hrs = this.#date.getHours();
    this.#mins = this.#date.getMinutes();
    this.#secs = this.#date.getSeconds();

    this.#timeTo = moment(
      new Date(
        this.#year,
        this.#month,
        this.#day,
        this.#hrs,
        this.#mins,
        Number(this.#secs) + 15
      )
    );
  }

  #timer() {
    this.#date = new Date();
    this.#timeFrom = moment(this.#date);

    if (this.#timerText.textContent === "1 second") {
      setTimeout(() => {
        this.#counterHTML.remove();
        this.#timerText.textContent = `Вы набрали ${this.#score} очков`;
        clearInterval(this.#interval);
        this.#circleClean();
      }, 1000);

      setTimeout(() => {
        this.#timerText.remove();
        this.#timerDiv.remove();
      }, 3000);
    }

    return moment.preciseDiff(this.#timeFrom, this.#timeTo);
  }

  #dateUpdate() {
    this.#interval = setInterval(() => {
      this.#timerText.innerHTML = this.#timer();
    }, 1000);
  }

  #renderTimer() {
    this.#timerDiv = document.createElement("div");
    this.#timerText = document.createElement("h2");
    this.#timerText.className = "score_counter";

    this.#timerDiv.className = "timer";
    this.#timerText.textContent = this.#timer();
    this.#timerDiv.append(this.#timerText);

    document.body.append(this.#timerDiv);
  }

  #circleClean() {
    this.#button.remove();
  }

  #clean() {
    if (this.#timerDiv) {
      this.#timerText.remove();
      clearInterval(this.#interval);
      this.#timerDiv.remove();
      this.#circleClean();
    }
  }

  cleanBeforeStartOtherModule() {
    if (this.#timerDiv) {
      this.#counterHTML.remove();
      clearInterval(this.#interval);
      this.#circleClean();
      this.#timerText.remove();
      this.#timerDiv.remove();
    }
  }

  trigger() {
    document.body.style.background = "white";
    this.#score = 0;

    soundModule.cleanBeforeStartOtherModule();
    timerModule.cleanBeforeStartOtherModule();
    clearCanvas();

    this.#clean();

    this.#startGame();
  }
}
