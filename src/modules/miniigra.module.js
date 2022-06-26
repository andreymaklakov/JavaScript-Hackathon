import { Module } from "../core/module";
import Frog from "../img/frog.png";

import { timerModule, clickModule, soundModule } from "../app.js";

import { random, clearCanvas } from "../utils.js";

export class GameModule extends Module {
  constructor(type, text) {
    super(type, text);
  }

  #makeGame() {
    let audio = document.createElement("audio");
    audio.className = "birds";
    audio.src =
      "https://zvukipro.com/uploads/files/2022-01/1643388330_nature_forest.mp3";
    audio.setAttribute("autoplay", "autoplay");

    let drawPlace = document.querySelector("canvas");
    let ctx = drawPlace.getContext("2d");
    let frog = new Image();
    frog.src = Frog;
    let xPos = 750;
    let yPos = 250;
    let startPO = random(550, 850);
    ctx.font = "48px serif";
    let score = 0;
    let grav = 2.5;

    function draw() {
      document.addEventListener("contextmenu", (event) => {
        event.preventDefault();

        if (yPos) {
          clearCanvas();
        }

        audio.pause();
        yPos = 0;
      });

      if (yPos === 250) grav = 2.5;

      ctx.beginPath();
      ctx.moveTo(500, 0);
      ctx.lineTo(1000, 0);
      ctx.lineTo(1000, 750);
      ctx.lineTo(500, 750);
      ctx.fillStyle = "lightblue";
      ctx.fill();

      drawOblaka();

      ctx.fillStyle = "black";
      ctx.fillText(`Score: ${score}`, 510, 50);
      ctx.font = "24px serif";
      ctx.fillText(`Управление A/D Не дайте вертолетику упасть!`, 510, 100);
      ctx.fillText(`Прыгайте по облокам!`, 510, 150);
      ctx.font = "48px serif";
      ctx.drawImage(frog, xPos, yPos, 100, 50);

      if (yPos < 700 && yPos != 0) {
        yPos += grav;

        setTimeout(() => {
          draw();
        }, 20);
      } else if (yPos != 0) {
        audio.pause();

        clearCanvas();

        let lose = document.querySelector("canvas");
        let los = lose.getContext("2d");
        los.fillStyle = "black";
        los.font = "48px serif";
        los.fillText("Попробуйте еще :(", 510, 50);

        setTimeout(() => {
          clearCanvas();
        }, 1700);
      }

      if (yPos === 600 && xPos + 50 > startPO && xPos + 50 < startPO + 100) {
        grav = -10;
        score++;
        startPO = random(550, 850);

        if (score === 5) {
          yPos = 0;

          let win = document.createElement("audio");
          win.volume = 0.3;
          win.src =
            "https://zvukipro.com/uploads/files/2022-05/1651577277_potomu-chto-ja-umnyjdelaju-vse-pravilno.mp3";
          win.setAttribute("autoplay", "autoplay");
          audio.pause();

          clearCanvas();

          let pobeda = document.querySelector("canvas");
          let pob = pobeda.getContext("2d");
          pob.fillStyle = "black";
          pob.font = "48px serif";
          pob.fillText("Вы победили, поздравляю!", 510, 50);

          setTimeout(() => {
            clearCanvas();
          }, 1700);
        }
      }
    }

    function drawOblaka() {
      ctx.beginPath();
      ctx.moveTo(startPO, 680);
      ctx.lineTo(startPO + 100, 680);
      ctx.lineTo(startPO + 100, 730);
      ctx.lineTo(startPO, 730);
      ctx.arc(startPO + 50, 680, 50, Math.PI, Math.PI * 2, false);
      ctx.arc(startPO + 100, 705, 25, Math.PI / 2, (Math.PI * 3) / 2, true);
      ctx.arc(startPO, 705, 25, Math.PI / 2, (Math.PI * 3) / 2, false);
      ctx.fillStyle = "white";
      ctx.fill();
    }

    draw();

    document.addEventListener("keydown", (event) => {
      if (
        event.key === "a" ||
        event.key === "A" ||
        event.key === "ф" ||
        event.key === "Ф"
      ) {
        if (xPos > 500) xPos -= 2.5;
      }
      if (
        event.key === "в" ||
        event.key === "В" ||
        event.key === "D" ||
        event.key === "d"
      ) {
        if (xPos < 900) xPos += 2.5;
      }
    });
  }

  trigger() {
    soundModule.cleanBeforeStartOtherModule();
    timerModule.cleanBeforeStartOtherModule();
    clickModule.cleanBeforeStartOtherModule();
    clearCanvas();

    this.#makeGame();
  }
}
