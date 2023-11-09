let gui;
let blob;
let rSlider;
let blolbSlider;
let noiseSlider;
let layerSlider;
let skipButton;
let sliderW = 200;
let sliderH = 32;
let buttonW = 100;
let buttonH = 40;
let lvl = 1;
let attributes = 15;
let scene = 0;
let mountain;

function setup() {
  createCanvas(windowWidth, windowHeight);
  mountain = new Mountain(0);
  gui = createGui();
  createGuiElements();
  blob = new Blob(width/2, height/2 - 60, 20);
  blob.addRings();
}

function draw() {
  background(0);
  mountain.display();
  stroke(255);
  fill(255, 70);
  textSize(34);

  blob.radius = rSlider.val;
  blob.layers = layerSlider.val;
  blob.draw();


  if (scene == 0) {
    rect(20, windowHeight - 240, windowWidth - 40, 220, 10);
    fill(255);
    text('How many legs does a spider have?', 40, windowHeight - 200)
    drawGui();
  }

  // End character creation
  if (skipButton.isPressed) {
    if (lvl <= attributes) {
      lvl += 1;
      console.log('lvl: ', lvl);
      layerSlider.val = lvl;
    } else {
      scene = 1;
      blob.x = windowWidth/2;
      blob.y = windowHeight/2;
      rSlider.val += 30;
    }
  }

  // Main stage

  // Isometric stage
  if (scene == 2) {
    blob.x = windowWidth/4;
    blob.y = windowHeight/2;
    rSlider.val = 30;    
  }

}

class Player{
  constructor(blob){
    this.blob = new Blob();
    this.blob = blob;
    this.keyIndex = 0;
    this.currentLayer;
  }

}

function createGuiElements(){
  rSlider = createSlider('Radius', windowWidth - sliderW - 20, 20, sliderW, sliderH, 10, 80);
  rSlider.val = 20;
  layerSlider = createSlider('Layers', windowWidth - sliderW - 20, 20 + sliderH, sliderW, sliderH, 1, 30);
  layerSlider.val = 1;
  skipButton = createButton('Next', windowWidth - buttonW - 40, windowHeight - 40 - buttonH, buttonW, buttonH);
}
