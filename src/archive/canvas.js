// import { currentState } from "./state";

// const mainCanvas = document.getElementById("main-canvas");
// const canvasCtx = mainCanvas.getContext("2d");

// // const canvasAspectRatio = 

// export function changeGif(path) {
//   const img = new window.Image();
//   img.onload = function() {
//     canvasCtx.clearRect(0, 0, mainCanvas.width, mainCanvas.height);
//     const scale = mainCanvas.height / img.height;
//     const drawHeight = mainCanvas.height;
//     const drawWidth = img.width * scale;
//     let x;
//     const y = 0;
//     switch (currentState.position) {
//       case "left":
//         x = 0;
//         break;
//       case "right":
//         x = mainCanvas.width - drawWidth;
//         break;
//       case "up":
//       default:  
//         x = (mainCanvas.width - drawWidth) / 2;
//     }
//     canvasCtx.drawImage(img, x, y, drawWidth, drawHeight);
//   };
//   img.src = path;
// }

// function drawModel(model) {

// }

// function canvasLoop(timeStamp){
//   window.requestAnimationFrame(canvasLoop);
// }
