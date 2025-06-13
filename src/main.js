import { io } from "socket.io-client";
import { CONFIG } from "./config";

const socket = io(CONFIG.SOCKET_URL);

const sideButtons = document.querySelectorAll("div.side-buttons > button");
const subButtons = document.querySelectorAll("div.sub-buttons > button");
const mainButtons = document.querySelectorAll("div.main-buttons > button");
const directionButtons = document.querySelectorAll("div.direction-buttons > button");

const characterSelect = document.getElementById("character-select");

const frame = document.querySelector("div.frame");
const mainCanvas = document.getElementById("main-canvas");
const canvasCtx = mainCanvas.getContext("2d");


let currentState = {...CONFIG.DEFAULT_STATE}

function updateState() {
  socket.emit("update-gif", stateToPath());
}

function updateCharacter(character) {
  currentState.character = character;
  updateState();
}

function updatePose(pose) {
  currentState.pose = pose;
  updateState();
}

function updatePosition(position) {
  currentState.position = position;
  updateState();
}

function stateToPath() {
  const ext = currentState.character === "mozie" ? "gif" : "png";
  const talkingNum = currentState.talking ? 2 : 1;
  return `/characters/${currentState.character}/${currentState.pose}/${talkingNum}.${ext}`;
}

function changeGif(path) {
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
  const character = e.currentTarget.dataset.character;
  console.log(character);
  updateCharacter(character);
}

function handleDirectionButton(e) {
  const direction = e.currentTarget.dataset.direction;
  console.log(direction);
  updatePosition(direction);
}

function handleSubButton(e) {
  const pose = e.currentTarget.dataset.pose;
  console.log(pose);
  updatePose(pose);
}

function handleSideButton(e) {
  console.log(e.currentTarget.textContent);
}

function handleCharacterSelect(e) {
  const value = e.currentTarget.value;
  console.log(value);
  updateCharacter(value);
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

// WebSocket

socket.on("connect", () => {
  console.log("Connected to server");
});

socket.on("connect_error", (err) => {
  console.error("Connection failed:", err);
});

socket.on("update-gif", (gifPath) => {
  changeGif(gifPath);
});

