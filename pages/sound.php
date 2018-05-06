<?php

?>
<button onclick="toggle()">Click</button>

<script>
	var audioCtx = new AudioContext();
	var oscillator = audioCtx.createOscillator();
	var gainNode = audioCtx.createGain();
	oscillator.connect(gainNode);
	oscillator.type = 'sine'; // sine wave — other values are 'square', 'sawtooth', 'triangle' and 'custom'
	oscillator.frequency.value = 250; // value in hertz
	
	var distortion = audioCtx.createWaveShaper();
	
	oscillator.start();
	gainNode.gain.value = 0.1;
	
	var isPlaying = false;
	function toggle(){
		if(isPlaying){
			gainNode.disconnect(audioCtx.destination);
		}else{
			gainNode.connect(audioCtx.destination);
		}
		isPlaying = !isPlaying;
	};
	
	
</script>