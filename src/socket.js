import { io } from "socket.io-client";
import { CONFIG } from "./config";
// import { changeGif } from "./canvas";
import { updateState } from "./state";

export const socket = io(CONFIG.SOCKET_URL);

export function setupSocketEvents() {
  socket.on("connect", () => {
    console.log("Connected to server");
  });

  socket.on("connect_error", (err) => {
    console.error("Connection failed:", err);
  });

  socket.on("update-gif", (gifPath) => {
    updateState(gifPath);
  });
}