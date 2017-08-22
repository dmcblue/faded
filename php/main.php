<?php

?>
<section>
	<h1>Main</h1>

	<div class="faded">
		<div id="view" style="display:inline-block;margin-right:1rem;vertical-align:top;">
			<div id="frame">
				<div id="map"></div>
				<div id="mask"></div>
			</div>
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
	var map_width   = 1000,
		map_height  = 1000,
		view_width  = 500,
		view_height = 500;
	
	var view = 
		new Lib.View({
			selector : 'view', 
			width : view_width, 
			height : view_height
		});
	var frame = 
		new Lib.Frame({
			selector : 'frame', 
			width : map_width, 
			height : map_height, 
			view : view
		});
	var game = new Lib.Game({
		mapSelector : 'map',
		maskSelector : 'mask',
		healthSelector : 'health',
		messageSelector : 'message-box',
		frame : frame,
		interval : 100,
		levels : [
			new Lib.Level({
				width : map_width,
				height : map_height,
				zombies : 1,
				ghosts : 1,
				nobles : 1,
				candles : 4
			}),
			new Lib.Level({
				width : map_width,
				height : map_height,
				zombies : 15,
				ghosts : 5,
				nobles : 5,
				candles : 10
			})
		]
	});
	game.load();
	game.play();
</script>