import { io } from "socket.io-client";
import { CONFIG } from "./config";

const socket = io(CONFIG.SOCKET_URL);

const sideButtons = document.querySelectorAll("div.side-buttons > button");
const subButtons = document.querySelectorAll("div.sub-buttons > button");
const mainButtons = document.querySelectorAll("div.main-buttons > button");
const directionButtons = document.querySelectorAll("div.direction-buttons > button");

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
      case "LEFT":
        x = 0;
        break;
      case "RIGHT":
        x = mainCanvas.width - drawWidth;
        break;
      case "UP":
      default:  
        x = (mainCanvas.width - drawWidth) / 2;
    }
    canvasCtx.drawImage(img, x, y, drawWidth, drawHeight);
  };
  img.src = path;
}

function handleMainButton(e) {
  const target = e.currentTarget;
  console.log(e.currentTarget.textContent);
  updateCharacter(target.textContent);
}

function handleDirectionButton(e) {
  updatePosition(e.currentTarget.textContent);
  console.log(e.currentTarget.textContent);
}

function handleSubButton(e) {
  const target = e.currentTarget;
  console.log(e.currentTarget.textContent);
  updatePose(target.textContent)
}

function handleSideButton(e) {
  console.log(e.currentTarget.textContent);
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

