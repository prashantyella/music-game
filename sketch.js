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
let lastLvl = -1;
let currentLvl = 0;
let ringsPerLvl = 5;
let attributes;
let maxAttribute = null;
let scene = 0;
let questions;
let lessons;
let startButton;
let buttons = [];
let score = 0;
let goalNumber = 3;
let introAmbiences;
let humorSoundtracks;
let empathySoundtracks;
let optimismSoundtracks;
let ambitionSoundtracks;
let creativitySoundtracks;
const currentAmbience = new Tone.Player({loop: true}).toDestination();
const mainSoundtrack = new Tone.Player({url: "./assets/sounds/soundtracks/mainSoundtrack.mp3",loop: true}).toDestination();
const characterSoundtrack = new Tone.Player({loop:true, autostart : true}).toDestination();

function loadAttributes() {
  attributes = Object.keys(questions).length;
}

function preload() {
  questions = loadJSON("assets/questions.json", (callback = loadAttributes));
  lessons = loadJSON("assets/lessons.json");
  mainSoundtrack.fadeOut = 3;
  mainSoundtrack.fadeIn = 1;
  mainSoundtrack.autostart = false;

  characterSoundtrack.fadeIn = 0.5;
  characterSoundtrack.fadeOut = 0.5;
  characterSoundtrack.autostart = false;

  //loading all the ambient sounds in this buffer
  introAmbiences = new Tone.ToneAudioBuffers({
    amb1 : "./assets/sounds/introAmbience/1.mp3", amb2 : "./assets/sounds/introAmbience/2.mp3",
    amb3 : "./assets/sounds/introAmbience/3.mp3", amb4 : "./assets/sounds/introAmbience/4.mp3",
    amb5: "./assets/sounds/introAmbience/5.mp3"
  },()=>{
    console.log("Ambience Buffer Loaded");
    //currentAmbience = new Tone.Player().toDestination();
    currentAmbience.buffer = introAmbiences.get("amb1");
    currentAmbience.fadeOut = 3;
    currentAmbience.fadeIn = 2;
    currentAmbience.autostart = true;

    
    setup(); //calling setup once the buffer is loaded
  });

  //loading all character soundtracks to this buffer
  characterSoundtracks = new Tone.ToneAudioBuffers({
    humor1 : "./assets/sounds/soundtracks/humor1.mp3", humor2 : "./assets/sounds/soundtracks/humor2.mp3",
    humor3 : "./assets/sounds/soundtracks/humor3.mp3", humor4 : "./assets/sounds/soundtracks/humor4.mp3",
    humor5 : "./assets/sounds/soundtracks/humor5.mp3",  empathy1 : "./assets/sounds/soundtracks/empathy1.mp3",
    empathy2 : "./assets/sounds/soundtracks/empathy2.mp3", empathy3 : "./assets/sounds/soundtracks/empathy3.mp3",
    empathy4 : "./assets/sounds/soundtracks/empathy4.mp3", empathy5 : "./assets/sounds/soundtracks/empathy5.mp3", 
    optimism1 : "./assets/sounds/soundtracks/optimism1.mp3", optimism2 : "./assets/sounds/soundtracks/optimism2.mp3",
    optimism3 : "./assets/sounds/soundtracks/optimism3.mp3", optimism4 : "./assets/sounds/soundtracks/optimism4.mp3",
    optimism5 : "./assets/sounds/soundtracks/optimism5.mp3",  ambition1 : "./assets/sounds/soundtracks/ambition1.mp3",
    ambition2 : "./assets/sounds/soundtracks/ambition2.mp3", ambition3 : "./assets/sounds/soundtracks/ambition3.mp3",
    ambition4 : "./assets/sounds/soundtracks/ambition4.mp3", ambition5 : "./assets/sounds/soundtracks/ambition5.mp3",
    creativity1 : "./assets/sounds/soundtracks/creativity1.mp3", creativity2 : "./assets/sounds/soundtracks/creativity2.mp3",
    creativity3 : "./assets/sounds/soundtracks/creativity3.mp3", creativity4 : "./assets/sounds/soundtracks/creativity4.mp3",
    creativity5 : "./assets/sounds/soundtracks/creativity5.mp3"
  }, () => {
      console.log("Character soundtracks loaded");
  });

}

function setup() {
  
  createCanvas(windowWidth, windowHeight);
  textSize(34);
  gui = createGui();

  //createGuiElements();
  
  if(currentAmbience.loaded){
    currentAmbience.start();
  }
  blob = new Blob(width / 2, height / 2 - 60, 50);
  blob.addRings();
  background(0);
  startButton = createToggle('Start', windowWidth/2, windowHeight/2, 200, 100);
  
}

function draw() {
  if (scene === 0) {
    startScreen();
    
    
  }

  if (scene > 0) {
    background(0);
    blob.layers = currentLvl;
  }

  if (scene == 1) {
    blob.draw();
    
    characterCreation();
  }
  
  // Main stage
  if (scene == 2) {

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
      
      if(maxAttribute == null){
        maxAttribute = getMaxAttribute(blob.player.attributes); //get trait with highest score
        var path = str(maxAttribute) + str(currentLvl-4)
        characterSoundtrack.buffer = characterSoundtracks.get(path); 
        console.log("path:", path);
   
        if(characterSoundtrack.loaded){
          characterSoundtrack.start();
          console.log("Now Playing:", path);
        }

        blob.createGoals();

      }
    }
    blob.draw();

    

    
    
  }

  //blob.goals[score].display();

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
    let path = "amb"+str(currentLvl+1);
    currentAmbience.buffer = introAmbiences.get(path);
    if(currentAmbience.loaded){
      console.log("loaded ambience")
      currentAmbience.start();
    }
    if(mainSoundtrack.loaded){
      console.log("loaded soundtrack")
      mainSoundtrack.start();
    }


  }
  else if(scene==1&&currentLvl>lastLvl){
    
    lastLvl = currentLvl;
    if(currentAmbience.state == "started"){
      currentAmbience.stop();
    }
    let path = "amb"+str(currentLvl+1);
    currentAmbience.buffer = introAmbiences.get(path);
    if(currentAmbience.loaded){
      console.log("currentLvl",currentLvl)
      console.log("loaded ambience:",path)
      currentAmbience.start();
    }
  }
  else if(scene==2 && currentLvl>lastLvl){
    console.log("last level:",lastLvl);
    console.log("current level",currentLvl);
    lastLvl = currentLvl; 
  }
}

function getMaxAttribute(attributes){
  let obj = attributes;
  max = Object.keys(obj).reduce((a,b) => obj[a]>obj[b] ? a : b);
  console.log('max value:',max)
  return max;
}


