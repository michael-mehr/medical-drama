import { updateState } from "./state";
import { startMicDetection } from "./microphone";
import { setupSocketEvents } from "./socket";
import { setupButtonEvents } from "./buttons";
import { startPhaser } from "./phaserCanvas";
// import { config } from "dotenv";
// config();

let mic_threshold = 0.01;

setupSocketEvents();
setupButtonEvents();
startMicDetection(mic_threshold);

updateState();
const game = startPhaser();

function main() {

}

window.onload = main;

fetch(`https://socket.minecraft.lgbt/api/me`, {
  credentials: 'include'
})
  .then(res => res.json())
  .then(data => console.log(data));