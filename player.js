class Player {
  constructor(playerSize) {
    this.playerSize = playerSize;
    this.attributes = {
      'humor': 0,
      'empathy': 0,
      'optimism': 0,
      'ambition': 0,
      'creativity': 0
    }
    this.hp = 100;
    console.log('created player');
  }

  display(ring, keyIndex) {
    push();
    noStroke();
    fill(255);
    ellipse(
      ring.xCoordinates[keyIndex],
      ring.yCoordinates[keyIndex],
      this.playerSize
    );
    fill(255, 220, 200, 6);
    for (let i = 0; i < 70; i++) {
      ellipse(ring.xCoordinates[keyIndex], ring.yCoordinates[keyIndex], i * 3);
    }
    pop();
  }
}
