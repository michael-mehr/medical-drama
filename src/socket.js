import { io } from "socket.io-client";
import { CONFIG } from "./config";
// import { changeGif } from "./canvas";
import { updateCharacter, updatePose, updatePosition, updateState, updateTalking, updateExpression, currentState} from "./state";

export const socket = io(CONFIG.SOCKET_URL);

export function setupSocketEvents(userData) {
  socket.on("connect", () => {
    console.log(`Connected as ${userData.login}`);
    socket.emit('authenticate', {
      userId: userData.id,
      username: userData.login
    });
  });

  socket.on('auth-success', () => {
    console.log('Authentication successful');
  });

  socket.on('auth-failed', () => {
    console.log('Authentication failed - not whitelisted');
  });

  socket.on("connect_error", (err) => {
    console.error("Connection failed:", err);
  });

  socket.on("update-state", (state) => {
    if (state != currentState) {
      console.log(state);
      updateCharacter(state.character);
      updatePose(state.pose);
      updatePosition(state.position);
      updateTalking(state.talking);
      updateExpression(state.expression);
    }
  })
}