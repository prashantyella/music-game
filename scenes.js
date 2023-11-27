function startScreen() {
  background(backgroundImg);
  drawGui();
  if (startButton.isPressed) {
    if (scene === 0) {
      scene +=1;
      startButton.visible = false;
    }
  }
}


function characterCreation() {
  fill(255);
  text(currentLvl, 40, 50);
  push();
  fill(100);
  rect(20, windowHeight - 280, windowWidth - 40, 280, 10);
  pop();
  let question = questions["question" + currentLvl];
  let answers = question["answers"];

  text(question["content"], 60, windowHeight - 220);

  let i = 0;
  if (buttons.length < 5) {
    for (const answer in answers) {
      buttons.push(
        new SurveyOption(
          answers[answer],
          answer,
          60,
          windowHeight - 50 - buttonH * i,
          blob.player
        )
      );
      i += 1;
    }
  }
  drawGui();
}
