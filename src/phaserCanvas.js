import Phaser from "phaser";
import MedicalDrama from "./phaser/MedicalDrama";
import { currentState } from "./state";

const leftX = 150;
const centerX = 450;
const rightX = 750;
const spriteY = 150;
const START_X = centerX;
let user;
let userVelocity = 2000;

const MAIN_CONFIG = {
  type: Phaser.AUTO,
  width: 900,
  height: 300,
  physics: {
    default: 'arcade',
  },
  parent: "phaser-div",
  scene: MedicalDrama,
  render: {
    pixelArt: true,
  },
};

const OBS_CONFIG = {
  type: Phaser.AUTO,
  width: 900,
  height: 300,
  physics: {
    default: 'arcade',
  },
  parent: "phaser-div",
  scene: MedicalDrama,
  render: {
    pixelArt: true,
  },
  transparent: true,
}

export function startPhaser() {
  return new Phaser.Game(MAIN_CONFIG);
}

export function startOBSPhaser() {
  return new Phaser.Game(OBS_CONFIG);
}