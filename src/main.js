const sideButtons = document.querySelectorAll("div.side-buttons > button");
const subButtons = document.querySelectorAll("div.sub-buttons > button");
const mainButtons = document.querySelectorAll("div.main-buttons > button");
const directionButtons = document.querySelectorAll("div.direction-buttons > button");

const mainFrame = document.querySelector("div.frame");

function handleMainButton(e) {
  console.log(e.currentTarget.textContent);
}

function handleDirectionButton(e) {
  console.log(e.currentTarget.textContent);
}

function handleSubButton(e) {
  console.log(e.currentTarget.textContent);
}

function handleSideButton(e) {
  console.log(e.currentTarget.textContent);
}

for (const button of mainButtons) {
  button.addEventListener("click", handleMainButton);
}

for (const button of directionButtons) {
  button.addEventListener("click", handleDirectionButton)
}

for (const button of subButtons) {
  button.addEventListener("click", handleSubButton)
}

for (const button of sideButtons) {
  button.addEventListener("click", handleSideButton)
}

