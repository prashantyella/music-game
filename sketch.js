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
let lastLvl = 0;
let ringsPerLvl = 5;
let attributes;
let maxAttribute;
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
  introAmbiences = new Tone.ToneAudioBuffers({
    amb1 : "./assets/sounds/introAmbience/1.mp3", amb2 : "./assets/sounds/introAmbience/2.mp3",
    amb3 : "./assets/sounds/introAmbience/3.mp3", amb4 : "./assets/sounds/introAmbience/4.mp3",
    amb5: "./assets/sounds/introAmbience/5.mp3"
  },()=>{
    console.log("Ambience Buffer Loaded");
    currentAmbience = new Tone.Player().toDestination();
    currentAmbience.buffer = introAmbiences.get("amb1");
    currentAmbience.fadeOut = 1;
    currentAmbience.fadeIn = 1;
    
    currentAmbience.start();
  });
  
  //currentAmbience.autostart = true;

  //loading main soundtrack
  mainSoundtrack = new Tone.Player({url: "./assets/sounds/soundtracks/mainSoundtrack.mp3",loop: true}).toDestination();
  mainSoundtrack.fadeOut = 1;
  mainSoundtrack.fadeIn = 1;
  mainSoundtrack.autostart = true;

}

function setup() {
  
  createCanvas(windowWidth, windowHeight);
  gui = createGui();
  //createGuiElements();
  if(mainSoundtrack.loaded){
    console.log("loaded soundtrack")
    mainSoundtrack.start();
  }
  blob = new Blob(width / 2, height / 2 - 60, 50);
  blob.addRings();
  
}

function getCurrentAmbience(){
  console.log("Current Level:",currentLvl)
  let path = "amb"+str(currentLvl);
  console.log("path:",path)
  return path;
  
}

function draw() {
  background(0);
  textSize(34);

  blob.layers = currentLvl;

  if (scene == 0) {
    blob.draw();
    //playCurrentAmbience();
    characterCreation();
  }

  if (scene == 1) {
    if(mainSoundtrack.state=="started"){

      mainSoundtrack.stop();
    }
    if(currentAmbience.state=="started"){

      currentAmbience.stop();
    }
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

function keyPressed(){
 
}

function mousePressed(){
  if(scene==0&&currentLvl>lastLvl){
    lastLvl = currentLvl;
    let path = "amb"+str(currentLvl);
    currentAmbience.buffer = introAmbiences.get(path,currentAmbience.start());

    //currentAmbience.start();
  }
  else if(scene==1){
    //var tempAttributes = blob.player.attributes;
    //console.log(blob.player.attributes)
    //console.log(maxAttribute)
    //tempAttributes.sort();
    //maxAttribute = blob.player.attributes.maxKey();
    console.log(maxAttribute);
    switch(maxAttribute){
      case 'humor':

    }
  }
}


