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

function enterFullscreen(element) {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.msRequestFullscreen) {
    // for IE11 (remove June 15, 2022)
    element.msRequestFullscreen();
  } else if (element.webkitRequestFullscreen) {
    // iOS Safari
    element.webkitRequestFullscreen();
  }
}

function exitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
}

function toggleFullscreen() {
  let element = document.getElementById("canvas");
  enterFullscreen(element);
}


function toggle720() {
  document.getElementById("canvas").setAttribute("width", 720);
  document.getElementById("canvas").setAttribute("height", 405);
}

function toggle1440() {
  document.getElementById("canvas").setAttribute("width", 1440);
  document.getElementById("canvas").setAttribute("height", 810);
}

function toggle1920() {
  document.getElementById("canvas").setAttribute("width", 1920);
  document.getElementById("canvas").setAttribute("height", 1080);
}