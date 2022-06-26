export function random(min, max) {
  return Math.round(min - 0.5 + Math.random() * (max - min + 1));
}

export function getRandomColor() {
  const random1 = random(0, 255);
  const random2 = random(0, 255);
  const random3 = random(0, 255);

  return `rgb(${random1}, ${random2}, ${random3})`;
}

export function getAudio(audioURL) {
  const audio = document.createElement("audio");
  audio.src = audioURL;
  audio.setAttribute("autoplay", "autoplay");
}

export function makeCanvas() {
  const pageWidth = window.screen.width;
  const pageHeight = window.screen.height;
  const canvas = document.createElement("canvas");
  canvas.id = "tutorial";
  canvas.width = `${pageWidth}`;
  canvas.height = `${pageHeight}`;
  document.body.prepend(canvas);
}

export function clearCanvas() {
  const canvas = document.querySelector("canvas");
  canvas.remove();

  makeCanvas();
}

export function getRandomXY(
  minX = 0,
  minY = 0,
  pageWidth = window.screen.width,
  pageHeight = window.screen.height
) {
  let randX = random(minX, pageWidth - 100);
  let randY = random(minY, pageHeight - 50);
  return [randX, randY];
}
