class Blob {
  constructor(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.angryLevel = 0;
    this.maxNoise = 2 + this.angryLevel * 9;
    this.phase = 0;
    this.phaseRate = 0.001;
    this.offset = 0.01;
    this.zoff = 0;
    this.zoffRate = 0.01;
    this.blobiness = 20;
    this.layers = 1;
    this.rings = [];
    this.player = new Player(20)
    this.xCount = 0
    this.yCount = 0
    this.keyIndex = 0
    this.currentRing = 0;
  }

  addLayer(radius) {
    let newLayer;
    newLayer = new Ring(radius);
    newLayer.display();
    this.rings.push(newLayer);
  }

  addRings() {
    for (let l = 1; l <= this.layers; l++) {
      this.addLayer(this.radius * l);
    }
  }

  draw() {
    
    push();
    translate(this.x, this.y);
    fill(222, 239, 231, 15);
    stroke(255);
    strokeWeight(1);

    this.maxNoise = 2 + this.angryLevel * 6;
    this.phaseRate = 0.007 + this.angryLevel * 0.007;
    this.zoffRate = 0.01 + this.angryLevel * 0.01;
    this.blobiness = 20 + this.angryLevel * 20;
    this.offset = 0.01 + this.angryLevel * 10;

    if (this.layers > this.rings.length) {
      this.addLayer(this.radius * this.layers);
    }
    
    for (let i = 0; i < this.rings.length; i++) {
      this.rings[i].phase += this.phaseRate;
      this.rings[i].zoff += this.zoffRate;
      this.rings[i].display();
      
    }
    this.xCount = this.rings[this.currentRing].xCoordinates.length
    this.yCount = this.rings[this.currentRing].yCoordinates.length
    
  if(keyIsDown(LEFT_ARROW)){
      if(this.keyIndex>0){
        this.keyIndex--
        
      }
      else{
        this.keyIndex = this.xCount-1
      }
      
    }
    if(keyIsDown(RIGHT_ARROW)){
      if(this.keyIndex<this.xCount-1){
        this.keyIndex++;
      }
      else{
        this.keyIndex = 0
      }
      
    }
    this.player.display(this.rings[currentRing],this.keyIndex)
    pop();
  }
}

class Ring {
  constructor(radius) {
    this.radius = radius;
    this.xCoordinates = [];
    this.yCoordinates = [];
    this.angryLevel = 0;
    this.maxNoise = 2 + this.angryLevel * 9;
    this.phase = 0;
    this.phaseRate = 0.001;
    this.offset = 0.01;
    this.zoff = 0;
    this.zoffRate = 0.01;
    this.blobiness = 20;
    
  }

  display() {
    let xoff;
    let yoff;

    push();
    translate(this.x, this.y);
    beginShape();
    for (var a = 0; a < TWO_PI; a += 0.1) {
      xoff = map(cos(a + this.phase), -1, 1, 0, this.maxNoise);
      yoff = map(sin(a + this.phase), -1, 1, 0, this.maxNoise);
      this.offset = map(
        noise(xoff, yoff, this.zoff),
        0,
        1,
        -this.blobiness,
        this.blobiness
      );

      let x = (this.radius + this.offset) * cos(a);
      let y = (this.radius + this.offset) * sin(a);
      vertex(x, y);
      this.xCoordinates.push(x);
      this.yCoordinates.push(y);
    }
    endShape(CLOSE);
    pop();
    
    
  }
    
}

class Player{
  constructor(playerSize){
   this.playerSize = playerSize;
  }

  display(ring,keyIndex){
    push()
    translate(this.x,this.y)
    fill(255)
    ellipse(ring.xCoordinates[keyIndex],ring.yCoordinates[keyIndex],this.playerSize);
    pop()
  }

}
