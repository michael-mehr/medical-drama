import { io } from "socket.io-client";

const socket = io("http://localhost:3000");

const sideButtons = document.querySelectorAll("div.side-buttons > button");
const subButtons = document.querySelectorAll("div.sub-buttons > button");
const mainButtons = document.querySelectorAll("div.main-buttons > button");
const directionButtons = document.querySelectorAll("div.direction-buttons > button");

const mainFrame = document.querySelector("div.frame");
const currentGif = document.getElementById("mozie-gif");

let currentState = {
  "talking": false,
  "pose": "A",
  "character": "mozie",
  "position": "center"
}

function changeGif(path) {
  currentGif.src = path
}

function handleMainButton(e) {
  console.log(e.currentTarget.textContent);
}

function handleDirectionButton(e) {
  console.log(e.currentTarget.textContent);
}

function handleSubButton(e) {
  const target = e.currentTarget;
  console.log(e.currentTarget.textContent);

  switch (target.textContent) {
    case "A":
      changeGif("/mozie/mozie_idle_1.gif");
      break;
    case "B":
      changeGif("/mozie/mozie_talk_1.gif");
      break;
    case "C":
      changeGif("/mozie/mozie_idle_2.gif");
      break;
    case "D":
      changeGif("/mozie/mozie_talk_2.gif");
      break;
    case "E":
      changeGif("/forrest_mouth.jpg");
      break;
  }
  socket.emit("update-gif", currentGif.src);
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

