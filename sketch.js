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
let currentLvl = 1;
let ringsPerLvl = 5;
let attributes;
let scene = 0;
let questions;
let buttons = [];
let score = 0;
let goalNumber = 3;
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
  gui = createGui();
  //createGuiElements();

  blob = new Blob(width / 2, height / 2 - 60, 50);
  blob.addRings();
}

function draw() {
  background(0);
  textSize(34);

  blob.layers = currentLvl;

  if (scene == 0) {
    blob.draw();
    characterCreation();
  }

  if (scene == 1) {
    push();
    textSize(20);
    text("Current LvL: " + currentLvl, 40, 50);
    text("Humor: " + blob.player.attributes['humor'], 40, 80);
    text("Empathy: " + blob.player.attributes['empathy'], 40, 110);
    text("Optimism: " + blob.player.attributes['optimism'], 40, 140);
    text("Ambition: " + blob.player.attributes['ambition'], 40, 170);
    text("Creativity: " + blob.player.attributes['creativity'], 40, 200);

    if (blob.goals.length === 0) {
      blob.createGoals();
    }
    blob.draw();
    blob.goals[score].display();
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
  skipButton = createButton(
    "Next",
    windowWidth - buttonW - 40,
    windowHeight - 40 - buttonH,
    buttonW,
    buttonH
  );
}
