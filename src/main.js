import { updateState } from "./state";
import { startMicDetection } from "./microphone";
import { setupSocketEvents } from "./socket";
import { setupButtonEvents } from "./buttons";
import { startPhaser } from "./phaserCanvas";
import { CONFIG } from "./config";

let mic_threshold = 0.01;
let userData = null;

fetch(CONFIG.SOCKET_URL + `/api/me`, {
  credentials: 'include'
})
  .then(res => res.json())
  .then(data => {
    if (data) {
      userData = data;
      console.log('Authenticated as:', userData.login);
      setupSocketEvents(data);
      setupButtonEvents();
      startMicDetection(mic_threshold);
      updateState();
      const game = startPhaser();
    }
  })
  .catch(err => {
    console.error('Authentication failed:', err);
  });
  // .then(data => console.log(data));

// setupSocketEvents();
// setupButtonEvents();
// startMicDetection(mic_threshold);

// updateState();
// const game = startPhaser();

function main() {

}

window.onload = main;
