<?php

?>
<section>
	<h1>Main</h1>

	<div class="faded">
		<div id="view" style="display:inline-block;margin-right:1rem;vertical-align:top;">
			<div id="frame"></div>
			<div id="paper-message-box"></div>
			<div id="screen-message-box"></div>
		</div>
		<div style="display:inline-block;height:4rem;vertical-align:top;">
			<div id="health"></div>
			
			<br/>
			
			<button onclick="game.toggle();this.innerHTML = game.isPlaying ? 'Pause' : 'Play';">Pause</button>
		</div>
		<div id="full-screen-message-box"></div>
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
		paperMessageSelector  : 'paper-message-box',
		screenMessageSelector : 'screen-message-box',
		frame : frame,
		interval : 100,
		blockSize : blockSize,
		levels : [
			new Lib.Level({
				width : map_width*blockSize,
				height : map_height*blockSize,
				zombies : 0,
				ghosts : 1,
				nobles : 0,
				candles : 5,
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
				nobles : 0,
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
	
	var fullScreenMessageBox  = 
		new Lib.FullScreenMessageBox({
			selector : 'full-screen-message-box',
			onOpen : function(){},
			onClose : function(){
				console.log(this);
				this.setText(
					'What you will find:',
					'<?php echo Tools::getJavascriptMultiline(__DIR__.'/../templates/explainer.php'); ?>'
				);
				this.clearButtons();
				this.addButton({onClick : Lib.MessageBox.CLOSE(), label : 'Close (e)'});
				this.onOpen =
					function(){
						this.onClose = function(){};
					};
				this.open();
			},
			buttons : [{onClick : Lib.MessageBox.CLOSE(), label : 'Next (e)'}]
		});
	fullScreenMessageBox.setText(
		'Welcome to Faded', //header
		'Be cautious.  Everything that moves will hurt you.'  //text
	);
	fullScreenMessageBox.open();
	
	//game.play();
	
	function checkTouch(){
		var pos = game.player.getPosition();
		console.log('Player', pos);
		console.log('Pickups', game.pickups);
		for(var i = 0; i < game.pickups.length; i++){
			var pickup = game.pickups[i];
			var pos = pickup.getPosition();
			console.log('--', pickup.selector, pos);
			if(game.player.touches(pickup)){
				console.log('-- Player touches ' + pickup.selector);
			}
		}
	}
</script>