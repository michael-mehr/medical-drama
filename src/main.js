import { updateState } from "./state";
import { startMicDetection } from "./microphone";
import { setupSocketEvents } from "./socket";
import { setupButtonEvents } from "./buttons";
import { startPhaser } from "./phaserCanvas";

setupSocketEvents();
setupButtonEvents();
startMicDetection(0.1);

updateState();
const game = startPhaser();

function main() {

}

window.onload = main;

fetch('http://localhost:5892/api/me', {
  credentials: 'include'
})
  .then(res => res.json())
  .then(data => console.log(data));