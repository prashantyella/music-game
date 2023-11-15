class Player {
  constructor(playerSize) {
    this.playerSize = playerSize;
    this.humor = 0;
    this.empathy = 0;
    this.optimism = 0;
    this.ambition = 0;
    this.creativity = 0;
  }

  display(ring, keyIndex) {
    push();
    translate(this.x, this.y);
    noStroke();
    fill("HotPink");
    ellipse(
      ring.xCoordinates[keyIndex],
      ring.yCoordinates[keyIndex],
      this.playerSize
    );
    pop();
  }
}
