<?php

?>
<style>
	.controls button{
		width:200px;
		color:#212121;
	}
</style>
<h1>Main</h1>

<div class="faded">
	<div id="view">
		<div id="frame" style="background:#000;">
			<div id="map">

			</div>
			<div id="player"></div>
		</div>
	</div>
</div>
<script>
	var map_width   = 60,
		map_height  = 60,
		view_width  = 60,
		view_height = 60;
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
	var map  = 
		new Lib.Map({
			selector : 'map', 
			width : map_width, 
			height : map_height, 
			blockSize : 20,
			position : new Lib.Point(0, 0),
			arr : [[0, 0, 0], [0, 1, 0], [0, 0, 0]]
		});
	
	var player = Lib.Player.create(frame, {width : 10, height : 10});
	//console.log(map.check(player, new Lib.Point(20,20), true));
	player.move(21, 21);
	map.checkAndMove([{movable : player, direction : Lib.Point.NORTH_WEST}], true);
	console.log(player.getPosition());
	
	var line = '----------------------------------';
	console.log(line);
	
	player.move(29, 29);
	map.checkAndMove([{movable : player, direction : Lib.Point.SOUTH_EAST}], true);
	console.log(player.getPosition());
	
	console.log(line);
	
	player.move(25, 29);
	map.checkAndMove([{movable : player, direction : Lib.Point.SOUTH_WEST}], true);
	console.log(player.getPosition());
	
	console.log(line);
	
	player.move(29, 25);
	map.checkAndMove([{movable : player, direction : Lib.Point.NORTH_EAST}], true);
	console.log(player.getPosition());
</script>