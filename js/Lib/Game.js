var Game = 
	function(args){
		Base.call(this, args);
		this.isPlaying = false;
		this.addProperty(args, 'mapSelector');
		this.addProperty(args, 'healthSelector');
		this.addProperty(args, 'messageSelector');
		this.addProperty(args, 'levels');
		this.addProperty(args, 'frame');
		this.addProperty(args, 'currentLevel', false, 0, parseInt);
		this.addProperty(args, 'interval', true, null, parseInt); //ms
	};

Game.prototype = Object.create(Base.prototype);
Game.prototype.constructor = Game;

Game.BLOCK_SIZE = 20;

Game.prototype.load =
	function(){
		var level = this.levels[this.currentLevel];
		this.map  = 
			new Map({
				selector : this.mapSelector, 
				width : level.width, 
				height : level.width, 
				blockSize : Game.BLOCK_SIZE,
				position : new Point(0, 0)
			});
		var messageOnOpen =
			function(self){
				return function(){
					self.pause();
				};
			};
		var messageOnClose =
			function(self){
				return function(){
					self.play();
				};
			};
		this.messageBox  = 
			new MessageBox({
				selector : this.messageSelector,
				onOpen : messageOnOpen(this),
				onClose : messageOnClose(this)
			});
		this.health = 
			new HealthBar({
				selector : this.healthSelector
			});
		this.player = Player.create(this.frame);
		this.player.move(this.map.findPosition(this.player));

		this.zombies = [];
		for(var i = 0; i < level.zombies; i++){
			var zombie = Zombie.create(this.frame);
			zombie.move(this.map.findPosition(zombie));
			this.zombies.push(zombie);
		}

		this.candles = [];
		for(var i = 0; i < level.candles; i++){
			var candle = Candle.create(this.frame);
			candle.setPosition(this.map.findPosition(candle));
			this.candles.push(candle);
		}

		this.ghosts = [];
		for(var i = 0; i < level.ghosts; i++){
			var ghost = Ghost.create(this.frame);
			ghost.setPosition(this.map.findPosition(ghost));
			this.ghosts.push(ghost);
		}

		this.nobles = [];
		for(var i = 0; i < level.nobles; i++){
			var noble = Noble.create(this.frame, {map:this.map});
			noble.setPosition(this.map.findPosition(noble));
			this.nobles.push(noble);
		}

		this.frame.updatePosition(this.player);
		this.mobs = this.zombies.concat(this.ghosts).concat(this.nobles);
		this.pickups = this.candles;
		this.updateInterval = 
			setInterval(
				(function(self){return function(){self.update();};})(this), 
				this.interval
			);
	};

Game.prototype.pause =
	function(){
		this.isPlaying = false;
	};

Game.prototype.play =
	function(){
		this.isPlaying = true;
	};

Game.prototype.toggle =
	function(){
		this.isPlaying = !this.isPlaying;
	};

Game.prototype.update =
	function(){
		if(this.isPlaying){
				
			var direction = Point.HERE;
			if(Keys.isPressed(Keys.KEY_W) || Keys.isPressed(Keys.KEY_UP)){
				direction = direction.add(Point.NORTH);
			}
			if(Keys.isPressed(Keys.KEY_D) || Keys.isPressed(Keys.KEY_RIGHT)){
				direction = direction.add(Point.EAST);
			}
			if(Keys.isPressed(Keys.KEY_S) || Keys.isPressed(Keys.KEY_DOWN)){
				direction = direction.add(Point.SOUTH);
			}
			if(Keys.isPressed(Keys.KEY_A) || Keys.isPressed(Keys.KEY_LEFT)){
				direction = direction.add(Point.WEST);
			}

			var characters = [{movable : this.player, direction : direction}];
			for(var i = 0; i < this.mobs.length; i++){
				var mob = this.mobs[i];
				if(this.player.touches(mob)){
					mob.attack(this.player);
				}
				characters.push({
					movable : mob, 
					direction : mob.getNextMove(this.player)
				});
			}

			if(Keys.isPressed(Keys.KEY_E) || Keys.isPressed(Keys.KEY_SPACE)){
				for(var i = 0; i < this.candles.length; i++){
					var pickup = this.pickups[i];
					if(this.player.touches(pickup)){
						pickup.pickup(this.player);
						this.pickups.splice(i--, 1);
					}
				}
			}
			this.map.checkAndMove(characters);
			this.player.update();
			this.frame.updatePosition(this.player);
			this.health.set(this.player.health);
		}
	};