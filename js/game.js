let canvas;
let world;
let keyboard = new Keyboard();
let lives = 3;
let energy = 1;
let collectedBottles = 0;
let collectedCoins = 0;
let level_no = 1;
let gameRunning = false;
let gameMusicAndSound = true;
let gameVolume = 0.2;
let showInstructionScreen = false;

/**
 * function to toggle audio before the game is running
 */
function preGameToggleAudio() {
    if (gameMusicAndSound) {
        gameMusicAndSound = false;
        document.getElementById('muteIcon').classList.remove("d-none");
        document.getElementById('audioIcon').classList.add("d-none");
    } else {
        gameMusicAndSound = true;
        document.getElementById('muteIcon').classList.add("d-none");
        document.getElementById('audioIcon').classList.remove("d-none");
    }
}

/**
 * function to show the correct clickable icons on top of the start screen
 */
function showInitScreenIcons() {
    document.getElementById("playIcon").classList.remove("d-none");
    document.getElementById('instructionsIcon').classList.remove("d-none");
    document.getElementById('homeIcon').classList.add("d-none");
    document.getElementById('mobileButtonContainer').classList.add("d-none");
}

/**
 * function to generate a random start screen image
 * @returns image
 */
function randomStartScreenImage() {
    let image;
    if (Math.random() > 0.5) {
        image = './img/9_intro_outro_screens/start/startscreen_1.png';
    } else {
        image = './img/9_intro_outro_screens/start/startscreen_2.png';
    }
    return image;
}

/**
 * init function which shows the start screen in the canvas
 */
function init() {
    showInitScreenIcons();
    canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');
    let startImage = new Image();
    startImage.src = randomStartScreenImage();
    startImage.onload = function () {
        ctx.drawImage(startImage, 0, 0, canvas.width, canvas.height);
        ctx.font = '30px Zabars';
        ctx.fillStyle = "black";
        ctx.fillText('Press Space to start                              Press I for instructions', 100, 390);
    }
}

/**
 * function to hide the start screen icons
 */
function hideInitScreenIcons() {
    document.getElementById("playIcon").classList.add("d-none");
    document.getElementById("instructionsIcon").classList.add("d-none");
    document.getElementById("homeIcon").classList.remove("d-none");
}

/**
 * function to update the onclick actions behind the icons for the game running
 */
function setFunctionsForIcons() {
    document.getElementById('audioIcon').setAttribute("onclick", "world.toggleSoundAndMusic()");
    document.getElementById('muteIcon').setAttribute("onclick", "world.toggleSoundAndMusic()");
    document.getElementById('homeIcon').setAttribute("onclick", "world.quitGame()");
}

/**
 * function to start the game
 * @param {*} level_no 
 * @param {*} lives 
 * @param {*} energy 
 * @param {*} collectedBottles 
 * @param {*} collectedCoins 
 */
function startGame(level_no, lives, energy, collectedBottles, collectedCoins) {
    hideInitScreenIcons();
    setFunctionsForIcons();
    document.getElementById('mobileButtonContainer').classList.remove("d-none");
    clearAllIntervals();
    world = new World(canvas, keyboard, level_no, lives, energy, collectedBottles, collectedCoins);
}

/**
 * function to clear some possibly running sounds
 */
function clearAllSounds() {
    world.character.walking_sound.pause();
    world.gameMusic.pause();
    world.gameWonMusic.pause();
    world.gameOverSound.pause();
}

/**
 * function to add the instructions text to the canvas
 * @param {*} ctx 
 */
function addInstructionText(ctx) {
    ctx.font = '30px Zabars';
    ctx.fillStyle = "black";
    ctx.fillText('arrow keys: move left and right', 40, 70);
    ctx.fillText('space: jump', 40, 110);
    ctx.fillText('D: throw bottle', 40, 150);
    ctx.fillText('M: toggle music/sound FX', 430, 70);
    ctx.fillText('F: toggle fullscreen (in game)', 430, 110);
    ctx.fillText('ESC: quit game', 430, 150);
    ctx.fillText('Press Space to start                              Press I for main screen', 100, 390);
}

/**
 * function to show the instructions
 */
function showInstructions() {
    document.getElementById('instructionsIcon').classList.add("d-none");
    document.getElementById('homeIcon').classList.remove("d-none");
    canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');
    let instructionsImage = new Image();
    instructionsImage.src = './img/5_background/first_half_background.png';
    instructionsImage.onload = function () {
        ctx.drawImage(instructionsImage, 0, 0, canvas.width, canvas.height);
        addInstructionText(ctx);
    }
}

/**
 * function to clear all running intervals (quick & dirty version)
 */
function clearAllIntervals() {
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
}

/**
 * function to add eventlisteners for the keyboard (keydown)
 */
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

/**
 * function to add eventlisteners for the keyboard (keyup)
 */
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

/**
 * function to make the play buttons (mobile mode) touchable
 */
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
    document.getElementById('btnJump').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.SPACE = true;
    })
    document.getElementById('btnJump').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.SPACE = false;
    })
    document.getElementById('btnThrow').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.D = true;
    })
    document.getElementById('btnThrow').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.D = false;
    })
}


