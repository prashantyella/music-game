// Inspired in Daniel Shiffman's code:
// https://www.youtube.com/watch?v=ZI1dmHv3MeM&ab_channel=TheCodingTrain


let blob;

function setup() {
  createCanvas(windowWidth, windowHeight);
  blob = new Blob(width/2, height/2, 60);
}

function draw() {
  background(95, 205, 217);
  blob.draw();
}
