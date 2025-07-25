import { updateCharacter, updatePose, updatePosition, updateState } from "./state";

const expressionButtons = document.querySelectorAll("div.expression-buttons > button");
const poseButtons = document.querySelectorAll("div.pose-buttons > button");
const positionButtons = document.querySelectorAll("div.position-buttons > button");

const characterSelect = document.getElementById("character-select");

function handlePoseButton(e) {
  const pose = e.currentTarget.dataset.pose;
  console.log(pose);
  updatePose(pose);
  updateState();
}

function handlePositionButton(e) {
  const position = e.currentTarget.dataset.position;
  console.log(position);
  updatePosition(position);
  updateState();
}

function handleExpressionButton(e) {

}

function handleCharacterSelect(e) {
  const value = e.currentTarget.value;
  console.log(value);
  updateCharacter(value);
  updateState();
}

export function setupButtonEvents() {
  for (const button of poseButtons) {
    button.addEventListener("click", handlePoseButton);
  }

  for (const button of positionButtons) {
    button.addEventListener("click", handlePositionButton);
  }

  for (const button of expressionButtons) {
    button.addEventListener("click", handleExpressionButton);
  }

  characterSelect.addEventListener('change', handleCharacterSelect);
}