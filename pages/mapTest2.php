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
			<div id="player"></div>
		</div>
	</div>
</div>
<script>
	var map_width   = 50,
		map_height  = 50,
		view_width  = 2000,
		view_height = 2000,
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
			width : view_width, 
			height : view_height, 
			view : view
		});
	var map  = 
		Lib.Map.create(frame,{ 
			width : map_width*blockSize, 
			height : map_height*blockSize, 
			blockSize : blockSize,
			position : new Lib.Point(0, 0),
			builder : 
				new Lib.MapBuilderRectangleV3({
					rectangleSize : 5,
					cols : map_width,
					rows : map_height,
					rounds: 50
				}),
			positioner : new Lib.MapItemPositionerRandomV2()
		});
	
	
</script>