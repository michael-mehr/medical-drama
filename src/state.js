import { CONFIG } from "./config";

export let currentState = { ...CONFIG.DEFAULT_STATE };

export function updateCharacter(character) {
  currentState.character = character;
}

export function updatePose(pose) {
  currentState.pose = pose;
}

export function updatePosition(position) {
  currentState.position = position;
}

export function updateTalking(talking) {
  currentState.talking = talking;
}

export function stateToPath() {
  const ext = currentState.character === "mozie" ? "gif" : "png";
  const talkingNum = currentState.talking ? 2 : 1;
  return `/characters/${currentState.character}/${currentState.pose}/${talkingNum}.${ext}`;
}