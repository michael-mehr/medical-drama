import { currentState, updateCharacter, updatePose, updatePosition, updateTalking, stateToPath } from "./state";
import { startMicDetection } from "./microphone";
import { socket, handleSocketEvents } from "./socket";

const sideButtons = document.querySelectorAll("div.side-buttons > button");
const subButtons = document.querySelectorAll("div.sub-buttons > button");
const mainButtons = document.querySelectorAll("div.main-buttons > button");
const directionButtons = document.querySelectorAll("div.direction-buttons > button");

const characterSelect = document.getElementById("character-select");

export function updateState() {
  socket.emit("update-gif", stateToPath());
}

function handleMainButton(e) {
  
}

function handleDirectionButton(e) {
  const direction = e.currentTarget.dataset.direction;
  console.log(direction);
  updatePosition(direction);
  updateState();
}

function handleSubButton(e) {
  const pose = e.currentTarget.dataset.pose;
  console.log(pose);
  updatePose(pose);
  updateState();
}

function handleSideButton(e) {
  console.log(e.currentTarget.textContent);
}

function handleCharacterSelect(e) {
  const value = e.currentTarget.value;
  console.log(value);
  updateCharacter(value);
  updateState();
}

for (const button of mainButtons) {
  button.addEventListener("click", handleMainButton);
}

for (const button of directionButtons) {
  button.addEventListener("click", handleDirectionButton);
}

for (const button of subButtons) {
  button.addEventListener("click", handleSubButton);
}

for (const button of sideButtons) {
  button.addEventListener("click", handleSideButton);
}

characterSelect.addEventListener('change', handleCharacterSelect);

handleSocketEvents();
startMicDetection(0.1);

updateState();