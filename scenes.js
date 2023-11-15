function characterCreation() {
  fill(255);
  text(lvl, 40, 50);
  fill(100);
  rect(20, windowHeight - 240, windowWidth - 40, 220, 10);

  fill(255);
  let question = questions["question" + lvl];
  let answers = question["answers"];

  text(question["content"], 40, windowHeight - 200);

  let i = 0;
  let answerButton;
  for (const answer in answers) {
    //text(`${answers[answer]}`, 200 * i, windowHeight - 140);
    answerButton = createButton(
      answers[answer],
      100 + 200 * i,
      windowHeight - 100 - buttonH
    );
    i += 1;
  }

  /*   createButton(
    "Next",
    windowWidth - buttonW - 40,
    windowHeight - 40 - buttonH,
    buttonW,
    buttonH
  ); */

  drawGui();

  if (skipButton.isPressed) {
    if (lvl < attributes) {
      lvl += 1;
      console.log("lvl: ", lvl);
      layerSlider.val = lvl;
    } else {
      // End character creation
      scene = 1;
      blob.x = windowWidth / 2;
      blob.y = windowHeight / 2;
      rSlider.val += 30;
    }
  }
}
