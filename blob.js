function getSample(n, range) {
  let arr = [];
  while (arr.length < n) {
    var r = Math.floor(Math.random() * range);
    if (arr.indexOf(r) === -1) arr.push(r);
  }
  return arr;
}

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
    this.ringDistance = 10;
    this.rings = [];
    this.paths = [];
    this.player = new Player(9);
    this.xCount = 0;
    this.yCount = 0;
    this.keyIndex = 0;
    this.currentRing = 0;
  }

  addPaths(n) {
    console.log("Creating " + n + " new paths...\n");
    let newPath;

    // For each path, get a pair of start and end rings.
    // They have to be different.

    let ringIndexes;
    // Generate n pairs of numbers
    for (let i = 0; i < n; i++) {
      ringIndexes = getSample(2, this.layers);
      newPath = new Path(
        this.rings[ringIndexes[0]],
        this.rings[ringIndexes[1]],
        floor(random(this.rings[ringIndexes[0]].xCoordinates.length))
      );
      this.paths.push(newPath);
    }
  }

  addLayer(radius) {
    let newLayer;
    newLayer = new Ring(this.layers, radius, this.phase, this.zoff);
    newLayer.display();
    this.rings.push(newLayer);

    if (this.layers > 1) {
      this.addPaths(floor(random(1, this.layers)));
    }
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

    this.phase += this.phaseRate;
    this.zoff += this.zoffRate;

    if (this.layers > this.rings.length) {
      this.addLayer(
        this.radius +
          random(this.ringDistance - 2, this.ringDistance) * (this.layers - 1)
      );
    }

    // Update shape of each ring
    for (let i = 0; i < this.rings.length; i++) {
      this.rings[i].phase = this.phase;
      this.rings[i].zoff = this.zoff;
      this.rings[i].display();
    }

    // Update shape of each path
    for (let i = 0; i < this.paths.length; i++) {
      this.paths[i].display();
    }

    this.xCount = this.rings[this.currentRing].xCoordinates.length;
    this.yCount = this.rings[this.currentRing].yCoordinates.length;

    if (keyIsDown(LEFT_ARROW)) {
      if (this.keyIndex > 0) {
        this.keyIndex--;
      } else {
        this.keyIndex = this.xCount - 1;
      }
    }
    if (keyIsDown(RIGHT_ARROW)) {
      if (this.keyIndex < this.xCount - 1) {
        this.keyIndex++;
      } else {
        this.keyIndex = 0;
      }
    }

    if (scene > 0) {
      this.player.display(this.rings[currentRing], this.keyIndex);
    }
    pop();
  }
}

class Path {
  // idea: add offset +/- x and y coordinates to add wiggle to the crack
  // todo: make it move consistently around the center
  constructor(startRing, endRing, index = 0) {
    this.startRing = startRing;
    this.endRing = endRing;
    this.thickness = 3; // Add as input later
    this.index = index;
  }

  display() {
    let startX = this.startRing.xCoordinates[this.index];
    let startY = this.startRing.yCoordinates[this.index];
    let endX = this.endRing.xCoordinates[this.index];
    let endY = this.endRing.yCoordinates[this.index];

    stroke(255);
    strokeWeight(2);
    beginShape(LINES);
    vertex(startX, startY);
    vertex(endX, endY);
    endShape();
  }
}

class Ring {
  constructor(id, radius, phase, zoff) {
    this.id = id;
    this.radius = radius;
    this.xCoordinates = [];
    this.yCoordinates = [];
    this.angryLevel = 0;
    this.maxNoise = 2 + this.angryLevel * 9;
    this.phase = phase;
    this.phaseRate = 0.001;
    this.offset = 0.01;
    this.zoff = zoff;
    this.zoffRate = 0.01;
    this.blobiness = 20;
  }

  display() {
    let xoff;
    let yoff;

    // Remove previous ring's coordinates
    this.xCoordinates = [];
    this.yCoordinates = [];
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
