let canvas;
let world;
let keyboard;

/**
 * retrieves the canvas element from the document
 */
function init() {
  canvas = document.getElementById('canvas');
}

/**
 * starts the game, initializes world, keyboard, and HUD
 */
function startGame() {
  level();
  keyboard = new Keyboard();
  world = new World(canvas, keyboard);
  setTimeout(() => {
    menuButtons();
    document.getElementById('hud').classList.add('d-flex');
  }, 1000);
}

/**
 * hides an element and adds a CSS class
 */
function menuButtons() {
  hideElement('startContainer');
  document.getElementById('menuButtonLine').classList.add('gameMenuButtonLine');
}

/**
 *  hides one menu and shows another
 */
function settings() {
  hideElementAnimated('controlMenu');
  showElementAnimated('settingsMenu');
}

/**
 * reloads the current page
 */
function reloadPage() {
  document.location.reload();
}

/**
 * hides the settings menu and shows the controls menu
 */
function control() {
  hideElementAnimated('settingsMenu');
  showElementAnimated('controlMenu');
}

/**
 * hides both the settings and controls menu
 */
function closeMenu() {
  hideElementAnimated('settingsMenu');
  hideElementAnimated('controlMenu');
}

/** 
 * prevents event propagation
 */
function dontClosing(event) {
  event.stopPropagation();
}

/* 
 * makes an element visible by removing a class
 */
function showElement(element) {
  document.getElementById(`${element}`).classList.remove('d-none');
}

/**
 * shows an element with animation by removing two classes 
 */
function showElementAnimated(element) {
  document.getElementById(`${element}`).classList.remove('vis-hidden');
  setTimeout(() => {
    document.getElementById(`${element}`).classList.remove('d-none');
  }, 400)
}

/**
 * Hides an element by adding a class 
 */
function hideElement(element) {
  document.getElementById(`${element}`).classList.add('d-none');
}

/**
 * hides an element with animation by adding two classes
 */
function hideElementAnimated(element) {
  document.getElementById(`${element}`).classList.add('vis-hidden');
  setTimeout(() => {
    document.getElementById(`${element}`).classList.add('d-none');
  }, 400)
}

/**
 * returns whether the sound is enabled
 */
function sfxOn() {
  return document.getElementById('soundToggle').checked;
}

/**
 * returns whether the sound is enabled
 */
function musicOn() {
  return document.getElementById('musicToggle').checked;
}

/**
 * activates fullscreen mode and updates the view
 */
function fullscreen() {
  let container = document.getElementById('container');
  container.requestFullscreen();
  document.getElementById('container').classList.add('fullscreen');
  document.getElementById('canvas').classList.add('canvasFullscreen');
  document.getElementById('fullscreenButton').setAttribute('onclick', `javascript: closeFullscreen()`);
  closeMenu();
}

/**
 * exits fullscreen mode and restores the view
 */
function closeFullscreen() {
  document.exitFullscreen();
  document.getElementById('container').classList.remove('fullscreen');
  document.getElementById('fullscreenButton').setAttribute('onclick', `javascript: fullscreen()`);
}