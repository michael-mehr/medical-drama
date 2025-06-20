import { currentState, updateCharacter, updatePose, updatePosition, updateTalking, stateToPath } from "./state";
import { startMicDetection } from "./microphone";
import { socket, handleSocketEvents } from "./socket";

const sideButtons = document.querySelectorAll("div.side-buttons > button");
const subButtons = document.querySelectorAll("div.sub-buttons > button");
const mainButtons = document.querySelectorAll("div.main-buttons > button");
const directionButtons = document.querySelectorAll("div.direction-buttons > button");

const characterSelect = document.getElementById("character-select");

const mainCanvas = document.getElementById("main-canvas");
const canvasCtx = mainCanvas.getContext("2d");

export function updateState() {
  socket.emit("update-gif", stateToPath());
}

export function changeGif(path) {
  const img = new window.Image();
  img.onload = function() {
    canvasCtx.clearRect(0, 0, mainCanvas.width, mainCanvas.height);
    // Scale image to fit canvas height, preserve aspect ratio, center horizontally
    const scale = mainCanvas.height / img.height;
    const drawHeight = mainCanvas.height;
    const drawWidth = img.width * scale;
    let x;
    const y = 0;
    switch (currentState.position) {
      case "left":
        x = 0;
        break;
      case "right":
        x = mainCanvas.width - drawWidth;
        break;
      case "up":
      default:  
        x = (mainCanvas.width - drawWidth) / 2;
    }
    canvasCtx.drawImage(img, x, y, drawWidth, drawHeight);
  };
  img.src = path;
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