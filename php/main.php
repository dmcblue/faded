<?php

?>
<section>
	<h1>Main</h1>

	<div class="faded">
		<div id="view" style="display:inline-block;margin-right:1rem;vertical-align:top;">
			<div id="frame"></div>
			<div id="message-box"></div>
		</div>
		<div style="display:inline-block;height:4rem;vertical-align:top;">
			<div id="health"></div>
			
			<br/>
			
			<button onclick="game.toggle();this.innerHTML = game.isPlaying ? 'Pause' : 'Play';">Pause</button>
		</div>
	</div>
	<div class="section" style="line-height:3rem;">
		<button onclick="checkTouch();">Check Touch</button>
		<br/>
		<button onclick="player.health -= 5;">Hurt</button>
		<br/>
	</div>
</section>
<script>
	var map_width   = 50,
		map_height  = 50,
		view_width  = 500,
		view_height = 500,
		blockSize   = 40;
	
	var view = 
		new Lib.View({
			selector : 'view', 
			width : view_width, 
			height : view_height
		});
	var frame = 
		new Lib.Frame({
			selector : 'frame', 
			width : map_width*blockSize, 
			height : map_height*blockSize, 
			view : view
		});
	var game = new Lib.Game({
		healthSelector : 'health',
		messageSelector : 'message-box',
		frame : frame,
		interval : 100,
		blockSize : blockSize,
		levels : [
			new Lib.Level({
				width : map_width*blockSize,
				height : map_height*blockSize,
				zombies : 1,
				ghosts : 1,
				nobles : 1,
				candles : 10,
				papers : 
					[{
						'header' : 'This is a message',
						'text'   : 'Text for a message'
					}]
			}),
			new Lib.Level({
				width : map_width*blockSize,
				height : map_height*blockSize,
				zombies : 1,
				ghosts : 1,
				nobles : 1,
				candles : 10,
				papers : 
					[{
						'header' : 'This is a message',
						'text'   : 'Text for a message'
					}]
			})
		]
	});
	game.load();
	game.play();
</script>