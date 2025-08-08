import Phaser from "phaser";
import { currentState } from "./state";

const leftX = 150;
const centerX = 450;
const rightX = 750;
const spriteY = 150;
const START_X = centerX;
let user;
let userVelocity = 2000;

export function startPhaser() {
  const config = {
    type: Phaser.AUTO,
    width: 900,
    height: 300,
    physics: {
      default: 'arcade',
    },
    parent: "phaser-div",
    scene: {
      preload,
      create,
      update
    },
    render: {
      pixelArt: true,
    },
    transparent: true,
  };
  return new Phaser.Game(config);
}

function preload() {
  // this.load.image('mozie', 'characters/mozie/A/1.gif')
  this.load.spritesheet('mozie', 'characters/mozie/A/2.png', {
    frameWidth: 300,
    frameHeight: 300
  });
  this.load.spritesheet('inari', 'characters/inari/Inari-sheet-final.png', {
    frameWidth: 192,
    frameHeight: 205
  });
  this.load.image('forrest', 'characters/forrest/A/1.png');
  this.load.image('myersA', 'characters/myers/A/1.png');
  this.load.image('myersB', 'characters/myers/B/1.png');
  this.load.image('myersC', 'characters/myers/C/1.png');
}

function create() {
  this.anims.create({
    key: 'mozie-talking',
    frames: this.anims.generateFrameNumbers('mozie', { start: 0, end: 4 }),
    frameRate: 8,
    repeat: -1
  });
  this.anims.create({
    key: 'inari-talking',
    frames: this.anims.generateFrameNumbers('inari', { start: 0, end: 3 }),
    frameRate: 8,
    repeat: -1
  });
  this.anims.create({
    key: 'inari-shocked',
    frames: this.anims.generateFrameNumbers('inari', { start: 4, end: 7 }),
    frameRate: 8,
    repeat: -1
  });
  this.anims.create({
    key: 'inari-angry',
    frames: this.anims.generateFrameNumbers('inari', { start: 8, end: 11 }),
    frameRate: 8,
    repeat: -1
  });

  user = this.physics.add.sprite(START_X, spriteY, 'inari');
  // user.play("talking");
  // user.setCollideWorldBounds(true);
}

function update() {
  if (currentState.character === 'forrest') {
    user.setTexture('forrest');
  } else if (currentState.character === 'mozie' && user.texture.key !== 'mozie') {
    user.setTexture('mozie');
    user.play('mozie-talking', true);
  } else if (currentState.character === 'inari' && user.texture.key !== 'inari') {
    user.setTexture('inari');
    user.play('inari-talking', true);
  } else if (currentState.character === 'myers') {
    user.setTexture('myersA');
  }

  if (currentState.position === 'left') {
    this.physics.moveTo(user, leftX, spriteY, 2000, 100);
  } else if (currentState.position === 'up') {
    this.physics.moveTo(user, centerX, spriteY, 2000, 100);
  } else if (currentState.position === 'right') {
    this.physics.moveTo(user, rightX, spriteY, 2000, 100);
  }

  if (currentState.talking === true && user.anims.isPaused) {
    if (currentState.character === 'mozie'){
      user.play('mozie-talking', true);
    } else if (currentState.character === 'inari') {
      user.play('inari-talking', true);
    }
    console.log(currentState);
  } else if (currentState.talking === false && !user.anims.isPaused) {
    user.anims.pause();
    user.setFrame(0);
  }

  checkExpression();

}

function checkExpression() {
  if (currentState.character === 'inari') {
    switch (currentState.expression) {
      case 'A':
        user.play('inari-talking', true);
        break;
      case 'B':
        user.play('inari-shocked', true);
        break;
      case 'C':
        user.play('inari-angry', true);
        break;
      default:
        user.play('inari-talking', true);
        break;
    }
  }
}