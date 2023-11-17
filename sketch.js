let gui;
let blob;
let rSlider;
let blolbSlider;
let noiseSlider;
let layerSlider;
let skipButton;
let player;
let currentRing = 0;
let keyIndex = 0;
let sliderW = 200;
let sliderH = 32;
let buttonW = 100;
let buttonH = 40;
let lvl = 1;
let maxLvl = 5;
let attributes;
let scene = 0;
let mountain;
let questions;
let buttons = [];
let introAmbiences;
let currentAmbience;
let characterSoundtracks = [];
let mainSoundtrack;


function loadAttributes() {
  attributes = Object.keys(questions).length;
}

function preload() {
  questions = loadJSON("assets/questions.json", (callback = loadAttributes));
  //loading all the ambient sounds in this array
  introAmbiences = new Tone.Players({
    amb1 : "./assets/sounds/introAmbience/1.mp3", amb2 : "./assets/sounds/introAmbience/2.mp3",
    amb3 : "./assets/sounds/introAmbience/3.mp3", amb4 : "./assets/sounds/introAmbience/4.mp3",
    amb5: "./assets/sounds/introAmbience/5.mp3"
  }).toDestination();

  currentAmbience = new Tone.Player("./assets/sounds/introAmbience/1.mp3").toDestination();
  currentAmbience.autostart = true;

  //loading main soundtrack
  mainSoundtrack = new Tone.Player("./assets/sounds/soundtracks/mainSoundtrack.mp3").toDestination();
  mainSoundtrack.autostart = true;

}

function setup() {
  
  createCanvas(windowWidth, windowHeight);
  mountain = new Mountain(0);
  gui = createGui();
  createGuiElements();
  blob = new Blob(width / 2, height / 2 - 60, 50);
  blob.addRings();
}

function draw() {
  background(0);
  stroke(255);
  fill(255, 70);
  textSize(34);

  //blob.radius = rSlider.val;
  blob.layers = lvl;
  //console.log("key index: ", keyIndex, "xCount:",blob.xCount)
  blob.draw();

  if (scene == 0) {
    
    
    characterCreation();
  }

  // Main stage
  if(scene == 1){
    
    
  }
  // Isometric stage
  if (scene == 2) {
    
    blob.x = windowWidth / 4;
    blob.y = windowHeight / 2;
  }
}

function createGuiElements() {
  rSlider = createSlider(
    "Radius",
    windowWidth - sliderW - 20,
    20,
    sliderW,
    sliderH,
    10,
    80
  );
  rSlider.val = 20;
  layerSlider = createSlider(
    "Layers",
    windowWidth - sliderW - 20,
    20 + sliderH,
    sliderW,
    sliderH,
    1,
    30
  );
  layerSlider.val = 1;
  skipButton = createButton(
    "Next",
    windowWidth - buttonW - 40,
    windowHeight - 40 - buttonH,
    buttonW,
    buttonH
  );
}
