import { Module } from "../core/module";
import moment from "moment";
import "moment-precise-range-plugin";
import { soundModule, clickModule } from "../app.js";
import { clearCanvas } from "../utils.js";

export class TimerModule extends Module {
  #form;
  #label;
  #input;
  #button;
  #timerDiv;
  #timerText;
  #timeFrom;
  #timeTo;
  #date;
  #year;
  #month;
  #day;
  #hrs;
  #mins;
  #secs;
  #interval;
  #stopButton;

  constructor(type, text) {
    super(type, text);
    this.#form = document.createElement("form");
    this.#label = document.createElement("label");
    this.#input = document.createElement("input");
    this.#button = document.createElement("button");

    this.#timerDiv = document.createElement("div");
    this.#timerText = document.createElement("h1");
    this.#timerText.className = "timer_text";

    this.#stopButton = document.createElement("button");
  }

  #render() {
    this.#label.setAttribute("for", "appt-time");
    this.#label.textContent = "Задайте время для таймера";
    this.#label.className = "label";

    this.#form.className = "form";

    this.#input.id = "appt-time";
    this.#input.name = "appt-time";
    this.#input.type = "time";
    this.#input.step = "2";
    this.#input.className = "input";

    this.#button.type = "submit";
    this.#button.textContent = "Старт";
    this.#button.className = "button";

    this.#form.append(this.#label, this.#input, this.#button);
    document.body.append(this.#form);
  }

  #getTime(time) {
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
        Number(this.#hrs) + Number(time[0]),
        Number(this.#mins) + Number(time[1]),
        Number(this.#secs) + Number(time[2])
      )
    );
  }

  #timer() {
    this.#date = new Date();
    this.#timeFrom = moment(this.#date);

    if (this.#timerText.textContent === "1 second") {
      setTimeout(() => {
        this.#timerText.textContent = "Отсчет окончен";
        clearInterval(this.#interval);
        this.#stopButton.remove();
      }, 1000);

      setTimeout(() => {
        this.#timerText.remove();
        this.#timerDiv.remove();
      }, 3000);
    }
    return moment.preciseDiff(this.#timeFrom, this.#timeTo);
  }

  #timerRender() {
    this.#timerDiv.className = "timer";
    this.#timerText.textContent = this.#timer();
    this.#timerDiv.append(this.#timerText);

    document.body.append(this.#timerDiv);
  }

  #dateUpdate() {
    this.#interval = setInterval(() => {
      this.#timerText.innerHTML = this.#timer();
    }, 1000);
  }

  #stopBtn() {
    this.#stopButton.textContent = "Закрыть таймер";
    this.#stopButton.className = "button";
    this.#timerDiv.append(this.#stopButton);

    this.#stopButton.addEventListener("click", (event) => {
      this.#timerText.remove();
      clearInterval(this.#interval);
      this.#stopButton.remove();
      this.#timerDiv.remove();
    });
  }

  #startButton() {
    this.#button.addEventListener("click", (event) => {
      event.preventDefault();

      const time = this.#input.value.split(":");

      if (this.#input.value) {
        this.#form.remove();

        this.#timerRender();
        this.#getTime(time);

        this.#dateUpdate();
        this.#stopBtn();
      } else {
        alert("Введите время");
      }
    });
  }

  cleanBeforeStartOtherModule() {
    clearInterval(this.#interval);
    if (this.#timerDiv) {
      this.#timerDiv.remove();
    }
    if (this.#form) {
      this.#form.remove();
    }
  }

  #clean() {
    this.#timerText.remove();
    clearInterval(this.#interval);
    this.#stopButton.remove();
    this.#timerDiv.remove();
  }

  trigger() {
    this.#clean();
    clearCanvas();

    soundModule.cleanBeforeStartOtherModule();
    clickModule.cleanBeforeStartOtherModule();

    this.#render();

    this.#startButton();
  }
}
