import { updateState } from "./state";
import { startMicDetection } from "./microphone";
import { setupSocketEvents } from "./socket";
import { setupButtonEvents } from "./buttons";

setupSocketEvents();
setupButtonEvents();
startMicDetection(0.1);

updateState();

function main() {

}

window.onload = main;