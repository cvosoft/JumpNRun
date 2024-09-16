let canvas;
let world;
let keyboard = new Keyboard();
let lives = 3;
let level = 1;
let gameRunning = 0;



function init() {
    canvas = document.getElementById('canvas');

    // startscreen reinzeichnen
    let ctx = canvas.getContext('2d');
    let startImage = new Image();
    startImage.src = './img/9_intro_outro_screens/start/startscreen_1.png';
    startImage.onload = function () {
        ctx.drawImage(startImage, 0, 0, canvas.width, canvas.height);

    }
}


function startGame(level, lives) {
    clearAllIntervals();
    initLevel1();
    world = new World(canvas, keyboard, level1, lives);
}

var wait = (ms) => {
    const start = Date.now();
    let now = start;
    while (now - start < ms) {
        now = Date.now();
    }
}

function clearAllSounds() {
    world.character.walking_sound.pause();
    world.character.jumping_sound.pause();
    world.character.longidle_sound.pause();
    world.character.isHurt_sound.pause();
    world.character.isDead_sound.pause();
}


/* Alternative (quick and dirty), um alle Intervalle zu beenden. */
function clearAllIntervals() {
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
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
            gameRunning = 1;
            startGame(level, lives)



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