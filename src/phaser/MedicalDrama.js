import Phaser from 'phaser';
// import User from "./User";
import { currentState } from '../state';
import { Assets } from './Assets';

export default class MedicalDrama extends Phaser.Scene {
  constructor() {
    super({ key: "MedicalDrama" });
    this.user = null;
  }

  preload() {
    // this.load.json('assets', './Assets.json');
    // const assets = this.cache.json.get('assets');
    // const assets = Assets.assets;
    // console.log(assets);
    // for (const asset in assets.characters) {
    //   if (asset.spritesheet !== undefined){
    //     console.log(asset);
    //     this.load.spritesheet(asset.key, asset.spritesheet, asset.frameConfig);
    //   } else if (asset.images) {
    //     for (const image in asset.images) {
    //       this.load.image(image.key, image.path);
    //     }
    //   }
    // }
    this.load.spritesheet('mozie', 'characters/mozie/A/mozie_strip5.png', {
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

  create() {
    this.createAnimations();
    this.user = this.physics.add.sprite(450, 150, 'inari');
    this.physics.add.existing(this.user);
  }

  update() {
    this.user.update();
    this.checkCharacter();
    this.checkPosition();
    this.checkTalking();
    this.checkExpression();
  }

  createAnimations() {
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
  }

  checkCharacter() {
    if (currentState.character === 'forrest') {
      this.user.setTexture('forrest');
    } else if (currentState.character === 'mozie' && this.user.texture.key !== 'mozie') {
      this.user.setTexture('mozie');
      this.user.play('mozie-talking', true);
    } else if (currentState.character === 'inari' && this.user.texture.key !== 'inari') {
      this.user.setTexture('inari');
      this.user.play('inari-talking', true);
    } else if (currentState.character === 'myers') {
      this.user.setTexture('myersA');
    }
  }

  checkPosition() {
    if (currentState.position === 'left') {
      this.physics.moveTo(this.user, 150, 150, 2000, 100);
    } else if (currentState.position === 'up') {
      this.physics.moveTo(this.user, 450, 150, 2000, 100);
    } else if (currentState.position === 'right') {
      this.physics.moveTo(this.user, 750, 150, 2000, 100);
    }
  }

  checkTalking() {
    if (currentState.talking === true && this.user.anims.isPaused) {
      if (currentState.character === 'mozie'){
        this.user.play('mozie-talking', true);
      } else if (currentState.character === 'inari') {
        this.user.play('inari-talking', true);
      }
      console.log(currentState);
    } else if (currentState.talking === false && !this.user.anims.isPaused) {
      this.user.anims.pause();
      this.user.setFrame(0);
    }
  }

  checkExpression() {
    if (currentState.character === 'inari') {
      switch (currentState.expression) {
        case 'A':
          this.user.play('inari-talking', true);
          break;
        case 'B':
          this.user.play('inari-shocked', true);
          break;
        case 'C':
          this.user.play('inari-angry', true);
          break;
        default:
          this.user.play('inari-talking', true);
          break;
      }
    }
  }
}