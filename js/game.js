let canvas;
let world;
let keyboard = new Keyboard();

let lives = 3;
let collectedBottles = 0;
let collectedCoins = 0;
let energy = 1;

let level_no = 1;
let gameRunning = false;



function init() {
    canvas = document.getElementById('canvas');

    // startscreen reinzeichnen
    let ctx = canvas.getContext('2d');
    let startImage = new Image();
    if (Math.random() > 0.5) {
        startImage.src = './img/9_intro_outro_screens/start/startscreen_1.png';
    } else { startImage.src = './img/9_intro_outro_screens/start/startscreen_2.png'; }

    startImage.onload = function () {
        ctx.drawImage(startImage, 0, 0, canvas.width, canvas.height);

    }
}


function startGame(level_no, lives, energy, collectedBottles, collectedCoins) {
    clearAllIntervals();

    //initLevel1();
    world = new World(canvas, keyboard, level_no, lives, energy, collectedBottles, collectedCoins);
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
    delete (world.character.walking_sound);
    world.gameMusic.pause();
}


/* Alternative (quick and dirty), um alle Intervalle zu beenden. */
function clearAllIntervals() {
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
}

document.addEventListener('keydown', (event) => {
    console.log(event);
    if (event.keyCode == 70) {
        keyboard.F = true;
    }
    if (event.keyCode == 77) {
        keyboard.M = true;
    }

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

        if (!gameRunning) {
            gameRunning = true;
            startGame(level_no, lives, energy, collectedBottles, collectedCoins);



        } else {
            keyboard.SPACE = true;
        }
    }
    if (event.keyCode == 68) {
        keyboard.D = true;
    }
})


document.addEventListener('keyup', (event) => {
    if (event.keyCode == 70) {
        keyboard.F = false;
    }
    if (event.keyCode == 77) {
        keyboard.M = false;
    }
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