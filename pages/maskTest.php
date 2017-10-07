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
			<div id="mask">

			</div>
			<div id="player"></div>
		</div>
	</div>
</div>
<script>
	var map_width   = 20,
		map_height  = 20,
		view_width  = 20,
		view_height = 20,
		block_size  = 20;
	var view = 
		new Lib.View({
			selector : 'view', 
			width : view_width*block_size, 
			height : view_height*block_size
		});
	var frame = 
		new Lib.Frame({
			selector : 'frame', 
			width : map_width*block_size, 
			height : map_height*block_size, 
			view : view
		});
	//*	
	var mask  = 
		new Lib.Mask({
			selector : 'mask', 
			width : map_width*block_size, 
			height : map_height*block_size, 
			blockSize : block_size,
			position : new Lib.Point(0, 0)
		});
	//*/
	
	var player = Lib.Player.create(frame, {width : 10, height : 10});
	console.log(map_width*block_size/2);
	player.move(map_width*block_size/2, map_height*block_size/2);
	
	mask.set([player],[]);
	//mask.propagate();
</script>