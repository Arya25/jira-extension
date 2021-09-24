const newCardDiv = document.querySelector("#btn-div");
var shuffleButton = document.createElement("button");


  shuffleButton.id = "shuffle-btn";
  shuffleButton.textContent = "SHUFFLE";
  newCardDiv.append(shuffleButton);

  let shuffleBtnEl = document.getElementById("shuffle-btn");

  shuffleBtnEl.addEventListener("click", function setPageBackgroundColor() {
    chrome.storage.sync.get("color", ({ color }) => {
      document.body.style.backgroundColor = color;
    });
  });