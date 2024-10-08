let gameMusicAndSound = true;
let gameVolume = 0.2;

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
 * function to set the game music
 */
function setGameMusic(world) {
    world.gameMusic.loop = true;
    world.gameMusic.volume = gameVolume;
    if (!gameMusicAndSound) {
        world.gameMusic.volume = 0;
    }
    world.gameMusic.play();
}

/**
 * function to play a sound effect in the game
 * @param {} sound 
 */
function playSoundFX(sound) {
    if (gameMusicAndSound) {
        sound.volume = gameVolume;
    } else {
        sound.volume = 0;
    }
    sound.play();
}

/**
* function to check if sound/music is toggled
*/
function checkToggleSoundAndMusic() {
    if (world.keyboard.M) {
        toggleSoundAndMusic();
    }
}

/**
 * function to toggle sound/music in the game
 */
function toggleSoundAndMusic() {
    if (gameMusicAndSound) {
        gameMusicAndSound = false;
        world.gameMusic.volume = 0;
        document.getElementById('muteIcon').classList.remove("d-none");
        document.getElementById('audioIcon').classList.add("d-none");
    } else {
        gameMusicAndSound = true;
        world.gameMusic.volume = gameVolume;
        document.getElementById('muteIcon').classList.add("d-none");
        document.getElementById('audioIcon').classList.remove("d-none");
    }
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