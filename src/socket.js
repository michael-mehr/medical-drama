import { io } from "socket.io-client";
import { CONFIG } from "./config";
import { changeGif } from "./canvas";

export const socket = io(CONFIG.SOCKET_URL);

export function handleSocketEvents() {
  socket.on("connect", () => {
    console.log("Connected to server");
  });

  socket.on("connect_error", (err) => {
    console.error("Connection failed:", err);
  });

  socket.on("update-gif", (gifPath) => {
    changeGif(gifPath);
  });
}