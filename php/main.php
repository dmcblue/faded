<?php

?>
<section>
	<h1>Main</h1>

	<div class="faded">
		<div id="view" style="display:inline-block;margin-right:1rem;vertical-align:top;">
			<div id="frame">
				<div id="map">

				</div>
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
		view_height = 500,
		num_zombies = 15,
		num_ghosts  = 5,
		num_nobles  = 5,
		num_candles = 10;
	var game = new Lib.Game();
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
			position : new Lib.Point(0, 0)
		});
	var messageBox  = 
		new Lib.MessageBox({
			selector : 'message-box',
			onOpen : function(){game.pause();},
			onClose : function(){game.play();}
		});
		
	var health = 
		new Lib.HealthBar({
			selector : 'health'
		});
	
	var player = Lib.Player.create(frame);
	player.move(map.findPosition(player));
	
	var zombies = [];
	for(var i = 0; i < num_zombies; i++){
		var zombie = Lib.Zombie.create(frame);
		zombie.move(map.findPosition(zombie));
		zombies.push(zombie);
	}
	
	var candles = [];
	for(var i = 0; i < num_candles; i++){
		var candle = Lib.Candle.create(frame);
		candle.setPosition(map.findPosition(candle));
		candles.push(candle);
	}
	
	var ghosts = [];
	for(var i = 0; i < num_ghosts; i++){
		var ghost = Lib.Ghost.create(frame);
		ghost.setPosition(map.findPosition(ghost));
		ghosts.push(ghost);
	}
	
	var nobles = [];
	for(var i = 0; i < num_nobles; i++){
		var noble = Lib.Noble.create(frame, {map:map});
		noble.setPosition(map.findPosition(noble));
		nobles.push(noble);
	}
	
	frame.updatePosition(player);
	var mobs = zombies.concat(ghosts).concat(nobles);
	game.play();
	var left = 0;
	var interval = 
		setInterval(
			function(){
				if(game.isPlaying){
				
					var direction = Lib.Point.HERE;
					if(Lib.Keys.isPressed(Lib.Keys.KEY_W) || Lib.Keys.isPressed(Lib.Keys.KEY_UP)){
						direction = direction.add(Lib.Point.NORTH);
					}
					if(Lib.Keys.isPressed(Lib.Keys.KEY_D) || Lib.Keys.isPressed(Lib.Keys.KEY_RIGHT)){
						direction = direction.add(Lib.Point.EAST);
					}
					if(Lib.Keys.isPressed(Lib.Keys.KEY_S) || Lib.Keys.isPressed(Lib.Keys.KEY_DOWN)){
						direction = direction.add(Lib.Point.SOUTH);
					}
					if(Lib.Keys.isPressed(Lib.Keys.KEY_A) || Lib.Keys.isPressed(Lib.Keys.KEY_LEFT)){
						direction = direction.add(Lib.Point.WEST);
					}

					var characters = [{movable : player, direction : direction}];
					for(var i = 0; i < mobs.length; i++){
						var mob = mobs[i];
						if(player.touches(mob)){
							mob.attack(player);
						}
						characters.push({
							movable : mob, 
							direction : mob.getNextMove(player)
						});
					}
					
					if(Lib.Keys.isPressed(Lib.Keys.KEY_E) || Lib.Keys.isPressed(Lib.Keys.KEY_SPACE)){
						for(var i = 0; i < candles.length; i++){
							var candle = candles[i];
							if(player.touches(candle)){
								candle.pickup(player);
								candles.splice(i--, 1);
							}
						}
					}
					map.checkAndMove(characters);
					player.update();
					frame.updatePosition(player);
					health.set(player.health);
				}
			},
			100
		);
	//clearInterval(interval);
</script>