var Game = 
	function(args){
		Base.call(this, args);
		this.isPlaying = false;
		//this.addProperty(args, 'mapSelector');
		//this.addProperty(args, 'maskSelector');
		this.addProperty(args, 'healthSelector');
		this.addProperty(args, 'screenMessageSelector');
		this.addProperty(args, 'paperMessageSelector');
		this.addProperty(args, 'levels');
		this.addProperty(args, 'frame');
		this.addProperty(args, 'blockSize', false, Game.BLOCK_SIZE);
		this.addProperty(args, 'currentLevel', false, 0, parseInt);
		this.addProperty(args, 'interval', true, null, parseInt); //ms
		
		var self = this;
		this.frame.eventHandlers[MessageEvent.EVENT_SEND] = 
			function(item, data, event){
				self.handleMessage(item, data.message);
				event.stopPropagation(); //confine to this game
			};
		
		this.frame.eventHandlers[Candle.EVENT_PICKUP] = 
			function(item, data, event){
				self.mask.staticsSet = false;
				event.stopPropagation(); //confine to this game
			};
		
		this.frame.eventHandlers[Player.EVENT_DEATH] = 
			function(item, data, event){
				self.screenMessageBox.clearButtons();
				self.screenMessageBox.addButton({
					label : "Restart Level", 
					onClick : function(){
						self.restartLevel();
						self.screenMessageBox.close();
					}
				});
				self.screenMessageBox.setText("Dun Dun Dun.", "You died.");
				self.screenMessageBox.open();
				event.stopPropagation(); //confine to this game
			};
		
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
		this.paperMessageBox  = 
			new PaperMessageBox({
				selector : this.paperMessageSelector,
				onOpen : messageOnOpen(this),
				onClose : messageOnClose(this)
			});
		this.screenMessageBox  = 
			new ScreenMessageBox({
				selector : this.screenMessageSelector,
				onOpen : messageOnOpen(this),
				onClose : messageOnClose(this)
			});
		this.health = 
			new HealthBar({
				selector : this.healthSelector
			});
	};

Game.prototype = Object.create(Base.prototype);
Game.prototype.constructor = Game;

Game.BLOCK_SIZE = 20;

Game.prototype.handleMessage =
	function(item, message, event){
		this.paperMessageBox.setText(message.header, message.text);
		this.paperMessageBox.open();
	};

Game.prototype.handleScreenMessage =
	function(item, message, event){
		this.screenMessageBox.setText(message.header, message.text);
		this.screenMessageBox.open();
	};

Game.prototype.load =
	function(){
		var level = this.levels[this.currentLevel];
		this.frame.element.innerHTML = '';
		this.map = 
			Map.create(
				this.frame,
				{
					width : level.width, 
					height : level.width, 
					blockSize : this.blockSize,
					position : new Point(0, 0)
				}
			);
		
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
		
		this.papers = [];
		for(var i = 0; i < level.papers.length; i++){
			var paper = Paper.create(this.frame, level.papers[i]);
			paper.setPosition(this.map.findPosition(paper));
			this.papers.push(paper);
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
		
		this.exit = Exit.create(this.frame, {game : this});
		this.exit.setPosition(this.map.findPosition(this.exit));
		var minDistance = level.width/4;
		while(this.exit.getPosition().distanceTo(this.player.getPosition()) < minDistance){
			this.exit.setPosition(this.map.findPosition(this.exit));
		}

		this.frame.updatePosition(this.player);
		this.mobs = [];
		this.mobs = this.zombies.concat(this.ghosts).concat(this.nobles);
		this.pickups = [];
		this.pickups = this.papers;
		this.luminousPickups = this.candles;
		
		this.mask  = 
			Mask.create(
				this.frame,
				{
					width : level.width, 
					height : level.height, 
					blockSize : this.blockSize,
					position : new Point(0, 0)
				}
			);
		this.mask.set([this.player], this.luminousPickups);
		
		this.updateInterval = 
			setInterval(
				(function(self){return function(){self.update();};})(this), 
				this.interval
			);
	};

Game.prototype.nextLevel =
	function(){
		this.pause();
		clearInterval(this.updateInterval);
		this.currentLevel++;
		if(this.currentLevel < this.levels.length){
			this.load();
			this.play();
		}else{
			var self = this;
			self.screenMessageBox.clearButtons();
			self.screenMessageBox.addButton({
				label : "Restart Game", 
				onClick : function(){
					self.restart();
					self.screenMessageBox.close();
				}
			});
			this.screenMessageBox.setText("Congratulations!", "You finished.");
			this.screenMessageBox.open();
		}
	};

Game.prototype.pause =
	function(){
		this.isPlaying = false;
	};

Game.prototype.play =
	function(){
		this.isPlaying = true;
	};

Game.prototype.restart =
	function(){
		this.pause();
		clearInterval(this.updateInterval);
		this.currentLevel = 0;
		this.load();
		this.play();
	};

Game.prototype.restartLevel =
	function(){
		this.pause();
		clearInterval(this.updateInterval);
		this.load();
		this.play();
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
			
			if(direction.x && direction.y){
				direction.scale(Point.DIAGONAL);
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
				for(var i = 0; i < this.pickups.length; i++){
					var pickup = this.pickups[i];
					if(this.player.touches(pickup)){
						pickup.pickup(this.player);
						this.pickups.splice(i--, 1);
					}
				}
				for(var i = 0; i < this.luminousPickups.length; i++){
					var luminousPickup = this.luminousPickups[i];
					if(this.player.touches(luminousPickup)){
						luminousPickup.pickup(this.player);
						this.luminousPickups.splice(i--, 1);
					}
				}
				if(this.player.touches(this.exit)){
					this.exit.pickup(this.player);
				}
			}
			
			for(var i = 0; i < this.candles.length; i++){
				this.candles[i].update();
			}
			
			this.map.checkAndMove(characters);
			this.player.update();
			this.frame.updatePosition(this.player);
			this.health.set(this.player.health);
			this.mask.set([this.player], this.luminousPickups);
		}
	};