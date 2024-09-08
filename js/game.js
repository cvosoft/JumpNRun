let canvas;
let world;
let keyboard = new Keyboard();
let gameRunning = 0;

function init() {
    canvas = document.getElementById('canvas');

    // intro music


    // startscreen reinzeichnen
    let ctx = canvas.getContext('2d');
    let startImage = new Image();
    startImage.src = './img/9_intro_outro_screens/start/startscreen_1.png';
    startImage.onload = function () {
        ctx.drawImage(startImage, 0, 0, canvas.width, canvas.height);

    }
}


document.addEventListener('keydown', (event) => {
    if (event.keyCode == 39) {
        keyboard.RIGHT = true;
    }
    if (event.keyCode == 37) {
        keyboard.LEFT = true;
    }
    if (event.keyCode == 38) {
        keyboard.UP = true;
    }
    if (event.keyCode == 40) {
        keyboard.DOWN = true;
    }
    if (event.keyCode == 32) {

        if (gameRunning == 0) {
            world = new World(canvas, keyboard);
            gameRunning = 1;
        } else {
            keyboard.SPACE = true;
        }
    }
    if (event.keyCode == 68) {
        keyboard.D = true;
    }
})


document.addEventListener('keyup', (event) => {
    if (event.keyCode == 39) {
        keyboard.RIGHT = false;
    }
    if (event.keyCode == 37) {
        keyboard.LEFT = false;
    }
    if (event.keyCode == 38) {
        keyboard.UP = false;
    }
    if (event.keyCode == 40) {
        keyboard.DOWN = false;
    }
    if (event.keyCode == 32) {
        keyboard.SPACE = false;
    }
    if (event.keyCode == 68) {
        keyboard.D = false;
    }
})