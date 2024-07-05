let canvas;
let world;
let keyboard = new Keyboard();
let fps = 60/1000;

function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
}

document.addEventListener("keydown", (event) => {
  console.log(event.key);
  if (event.key === "ArrowLeft") {
    keyboard.LEFT == true;
  }
});



document.addEventListener("keyup", (event) => {
  console.log(event.key);
  if (event.key === "ArrowLeft") {
    keyboard.LEFT == false;
  }
});