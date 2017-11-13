<?php

?>
<section>
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
		<div id="full-screen-message-box-about"></div>
	</div>
	<div class="section" style="line-height:3rem;">
		<!-- Side Stuff -->
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
				zombies : 5,
				ghosts : 5,
				nobles : 0,
				candles : 5,
				papers : 
					[new Lib.Message({
						header : 'This is a header',
						text : 'Text for a message',
						buttons : [Lib.MessageBox.BUTTON_CLOSE]
					})]
			}),
			new Lib.Level({
				width : map_width*blockSize,
				height : map_height*blockSize,
				zombies : 1,
				ghosts : 1,
				nobles : 0,
				candles : 10,
				papers : 
					[new Lib.Message({
						header : 'This is a header',
						text : 'Text for a message',
						buttons : [Lib.MessageBox.BUTTON_CLOSE]
					})]
			})
		]
	});
	game.load();
	
	var fullScreenMessageBox  = 
		new Lib.FullScreenMessageBox({
			selector : 'full-screen-message-box',
			onKeyUp : Lib.MessageBox.KEY_CLICK,
			messages : [
				new Lib.Message({
					alias : 'intro',
					header : '',
					text : '<h1 class="faded-intro single-text">Faded</h1>',
					buttons : [Lib.MessageBox.BUTTON_NEXT],
					onOpen : function(){},
					onClose : function(){}
				}),
				new Lib.Message({
					alias : 'mainMenu',
					header : '',
					text : '<?php 
						echo Tools::getJavascriptMultiline(
							__DIR__.'/../templates/menus.php'
						); 
					?>',
					buttons : []
				}),
				new Lib.Message({
					alias : 'about',
					header : 'About',
					text : '<?php 
						echo Tools::getJavascriptMultiline(
							__DIR__.'/../templates/about.php'
						); 
					?>',
					buttons : [Lib.MessageBox.BUTTON_BACK]
				}),
				new Lib.Message({
					alias : 'warning',
					header : '',
					text : '<h2 class="single-text">Be cautious.  Everything that moves will hurt you.</h2>',
					buttons : [{
						onClick : Lib.MessageBox.GOTO('mainMenu'), 
						label : 'Back (q)', 
						classes :[Lib.MessageBox.CLASS_BUTTON_BACK],
						keyClick : Lib.Keys.KEY_Q
					},
						Lib.MessageBox.BUTTON_NEXT
					],
					onOpen : function(){},
					onClose : function(){}
				}),
				new Lib.Message({
					alias : 'explainer',
					header : 'What you will find:',
					text : '<?php echo Tools::getJavascriptMultiline(__DIR__.'/../templates/explainer.php'); ?>',
					buttons : [Lib.MessageBox.BUTTON_BACK, Lib.MessageBox.BUTTON_NEXT],
					onOpen : function(){
						var self = this;
						var which = false;
						self.___interval = 
							setInterval(function(){
								var icons = self.element.querySelectorAll('.icon');
								var classesToAdd = which ? ['sprite1'] : ['sprite2','flicker'];
								var classesToRemove = which ? ['sprite2','flicker'] : ['sprite1'];
								for(var i = 0, ilen = icons.length; i < ilen; i++){
									var icon = icons.item(i);
									for(var j = 0, jlen = classesToRemove.length; j < jlen; j++){
										Lib.Tools.removeClass(icon, classesToRemove[j]);
									}
									for(var j = 0, jlen = classesToAdd.length; j < jlen; j++){
										Lib.Tools.addClass(icon, classesToAdd[j]);
									}
								}
								which = !which;
							}, 500);
					},
					onClose : function(){
						clearInterval(self.___interval);
						game.play();
					}
				}),
				//ready set go, controls
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
					onClose : function(){}
				})
			]
		});
	fullScreenMessageBox.open();
</script>