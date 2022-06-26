import "./styles.css";
import { ContextMenu } from "../src/menu.js";
import { BackgroundModule } from "./modules/background.module.js";
import { TimerModule } from "./modules/timer.module.js";
import { ShapeModule } from "./modules/shape.module";
import { makeCanvas } from "./utils";
import { SoundModule } from "./modules/sound.module.js";
import { ClicksModule } from "./modules/clicks.module.js";
import { ClearModule } from "./modules/clear.module";
import { GameModule } from "./modules/miniigra.module";

const contextMenu = new ContextMenu(".menu");
const backgroundModule = new BackgroundModule(
  "background_module",
  "Поменять цвет"
);
export const timerModule = new TimerModule("timer_module", "Таймер");
const shapeModule = new ShapeModule("shape_module", "Создать фигуру");
export const soundModule = new SoundModule(
  "sound_module",
  "Воспроизвести звук"
);
export const clickModule = new ClicksModule("click_module", "Игра с кликами");
const clearModule = new ClearModule("clear_module", "Удалить все фигуры");
export const gameModule = new GameModule("game_module", "Запустить игру");

makeCanvas();

contextMenu.add(gameModule);
contextMenu.add(clearModule);
contextMenu.add(clickModule);
contextMenu.add(soundModule);
contextMenu.add(backgroundModule);
contextMenu.add(timerModule);
contextMenu.add(shapeModule);

contextMenu.open();
