<?php

?>
<section>
	<div class="faded">
		<div id="view" style="display:inline-block;margin-right:1rem;vertical-align:top;">
			<div id="frame"></div>
			<div id="paper-message-box"></div>
			<div id="screen-message-box"></div>
		</div>
		<div style="display:inline-block;vertical-align:top;padding-top:150px;padding-left:4rem;">
			<div id="health"></div>
		</div>
		<div id="full-screen-message-box"></div>
		<div id="full-screen-message-box-about"></div>
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
		paperMessageSelector  : 'paper-message-box',
		screenMessageSelector : 'screen-message-box',
		frame : frame,
		interval : 100,
		blockSize : blockSize,
		levels : [
			new Lib.Level(<?php echo Tools::getLevel('test'); ?>)
		]
	});
	game.load();
	
	var fullScreenMessageBox  = 
		new Lib.FullScreenMessageBox({
			selector : 'full-screen-message-box',
			onKeyUp : Lib.MessageBox.KEY_CLICK,
			messages : [
				new Lib.Message({
					alias : 'ready',
					header : '',
					text : '<h2 class="single-text">Ready?</h2>',
					buttons : [
						Lib.MessageBox.BUTTON_BACK, {
							onClick : Lib.MessageBox.CLOSE(), 
							label : "I\'m Ready! (e)",
							keyClick : Lib.Keys.KEY_E
						}],
					onOpen : function(){},
					onClose : function(){
						game.startLevel();
					}
				})
			]
		});
	fullScreenMessageBox.open();
</script>