import { currentState, updateTalking, updateState } from "./state";

export async function startMicDetection(threshold = 0.1) {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true }); // Request microphone access
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const source = audioContext.createMediaStreamSource(stream);
    const analyser = audioContext.createAnalyser();
    const dataArray = new Uint8Array(analyser.fftSize);

    source.connect(analyser);

    function checkVolume() {
      analyser.getByteTimeDomainData(dataArray);

      let sum = 0;
      for (let i = 0; i < dataArray.length; i++) {
        const normalized = (dataArray[i] - 128) / 128; // Normalize from 0-255 to -1 to 1
        sum += normalized * normalized;
      }

      const volume = Math.sqrt(sum / dataArray.length); // RMS value

      if (volume > threshold) {
        if (!currentState.talking) {
          updateTalking(true);
          updateState();
        }
      } else {
        if (currentState.talking) {
          updateTalking(false);
          updateState();
          console.log(currentState.talking);
        }
      }

      requestAnimationFrame(checkVolume);
    }

    checkVolume();

  } catch (err) {
    console.error(err);
  }
}