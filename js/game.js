let canvas;
let world;
let keyboard = new Keyboard();

let lives = 3;
let collectedBottles = 0;
let collectedCoins = 0;
let energy = 1;

let level_no = 1;
let gameRunning = false;

let gameMusic = true;
let gameSoundFX = true;

let showInstructionScreen = false;



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
        ctx.font = '30px Zabars';
        ctx.fillStyle = "black";
        ctx.fillText('Press Space to start                              Press I for instructions', 100, 390);
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
    world.gameMusic.pause();
}

function showInstructions() {
    canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');
    let instructionsImage = new Image();
    instructionsImage.src = './img/5_background/first_half_background.png';

    instructionsImage.onload = function () {
        ctx.drawImage(instructionsImage, 0, 0, canvas.width, canvas.height);
        ctx.font = '30px Zabars';
        ctx.fillStyle = "black";
        ctx.fillText('arrow keys: move left and right', 40, 70);
        ctx.fillText('space: jump', 40, 110);
        ctx.fillText('D: throw bottle', 40, 150);

        ctx.fillText('M: toggle music', 490, 70);
        ctx.fillText('S: toggle sound FX', 490, 110);
        ctx.fillText('ESC: quit game', 490, 150);

        ctx.fillText('Press Space to start                              Press I for main screen', 100, 390);
    }


}


/* Alternative (quick and dirty), um alle Intervalle zu beenden. */
function clearAllIntervals() {
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
}



document.addEventListener('keydown', (event) => {
    if (event.keyCode == 70) {
        keyboard.F = true;
    }

    if (event.keyCode == 73) {
        keyboard.I = true;
        if (!showInstructionScreen && !gameRunning) {
            showInstructions();
            showInstructionScreen = true;
        } else if (!gameRunning) {
            showInstructionScreen = false;
            init();
        }

    }
    if (event.keyCode == 27) {
        keyboard.ESC = true;
    }
    if (event.keyCode == 77) {
        keyboard.M = true;
    }
    if (event.keyCode == 83) {
        keyboard.S = true;
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
    if (event.keyCode == 73) {
        keyboard.I = false;
    }
    if (event.keyCode == 27) {
        keyboard.ESC = false;
    }
    if (event.keyCode == 70) {
        keyboard.F = false;
    }
    if (event.keyCode == 77) {
        keyboard.M = false;
    }
    if (event.keyCode == 83) {
        keyboard.S = false;
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


function makeButtonsTouchable() {
    document.getElementById('btnLeft').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.LEFT = true;

    })
    document.getElementById('btnLeft').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.LEFT = false;

    })
    document.getElementById('btnRight').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.RIGHT = true;

    })
    document.getElementById('btnRight').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.RIGHT = false;

    })

    document.getElementById('playIcon').addEventListener('touchstart', (e) => {
        e.preventDefault();
        gameRunning = true;
        startGame(level_no, lives, energy, collectedBottles, collectedCoins);

    })
}


