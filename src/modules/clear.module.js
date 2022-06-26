import { Module } from "../core/module";
import { clearCanvas } from "../utils.js";

export class ClearModule extends Module {
  constructor(type, text) {
    super(type, text);
  }
  trigger() {
    clearCanvas();
  }
}
