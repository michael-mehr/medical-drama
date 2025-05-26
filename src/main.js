const sideButtons = document.querySelectorAll("div.side-buttons > button");
const subButtons = document.querySelectorAll("div.sub-buttons > button");
const mainButtons = document.querySelectorAll("div.main-buttons > button");
const directionButtons = document.querySelectorAll("div.direction-buttons > button");

const mainFrame = document.querySelector("div.frame");

function handleMainButtons(e) {
  console.log(e.currentTarget.textContent);
}

for (const button of mainButtons) {
  button.addEventListener("click", handleMainButtons);
}

