let canvas;
let world;
let keyboard = new Keyboard();
let fps = 60 / 1000;

function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
}

window.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") {
    keyboard.LEFT = true;
  } else if (event.key === "ArrowRight") {
    keyboard.RIGHT = true;
  } else if (event.key === "ArrowUp") {
    keyboard.UP = true;
  } else if (event.key === "ArrowDown") {
    keyboard.DOWN = true;
  } else if (event.key === " ") {
    keyboard.SPACE = true;
  }
});

window.addEventListener("keyup", (event) => {
  if (event.key === "ArrowLeft") {
    keyboard.LEFT = false;
  } else if (event.key === "ArrowRight") {
    keyboard.RIGHT = false;
  } else if (event.key === "ArrowUp") {
    keyboard.UP = false;
  } else if (event.key === "ArrowDown") {
    keyboard.DOWN = false;
  } else if (event.key === " ") {
    keyboard.SPACE = false;
  }
});
