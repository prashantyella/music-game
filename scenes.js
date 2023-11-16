function characterCreation() {
  fill(255);
  text(lvl, 40, 50);
  push();
  fill(100);
  rect(20, windowHeight - 280, windowWidth - 40, 280, 10);
  pop();
  let question = questions["question" + lvl];
  let answers = question["answers"];

  text(question["content"], 40, windowHeight - 240);

  let i = 0;
  let answerButton;
  for (const answer in answers) {
    //text(`${answers[answer]}`, 200 * i, windowHeight - 140);
    answerButton = createButton(
      answers[answer],
      40,
      windowHeight - 60 - buttonH * i
    );
    i += 1;
  }

  drawGui();

  if (skipButton.isPressed) {
    if (lvl < attributes) {
      lvl += 1;
      console.log("lvl: ", lvl);
      fill(100);
      rect(20, windowHeight - 280, windowWidth - 40, 280, 10);
      pop();
    } else {
      // End character creation
      scene = 1;
      blob.x = windowWidth / 2;
      blob.y = windowHeight / 2;
      //rSlider.val += 30;
    }
  }
}
