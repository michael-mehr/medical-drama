import { updateState } from "./state";
import { setupSocketEvents } from "./socket";
import { startPhaser } from "./phaserCanvas";
import { CONFIG } from "./config";

setupSocketEvents();
const game = startPhaser();