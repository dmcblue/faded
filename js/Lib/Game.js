var Game = 
	function(args){
		Base.call(this, args);
		OnKeyUpInterface.call(this, args);
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
		this.addProperty(args, 'onToMainMenu', false, function(){
			location.reload();//TODO
		}); //ms
		
		var self = this;
		this.frame.eventHandlers[MessageEvent.EVENT_SEND] = 
			function(item, data, event){
				self.handleMessage(item, data.message, event);
				event.stopPropagation(); //confine to this game
			};
			
		this.frame.eventHandlers[ThroneEvent.EVENT_SEND] = 
			function(item, data, event){
				self.handleScreenMessage(
					item, 
					[new Lib.Message({
						header : data.choice.header,
						text   : data.choice.text,
						buttons : 
							[{
								onClick : MessageBox.CLOSE(), 
								label : 'Back (q)', 
								classes : [MessageBox.CLASS_BUTTON_BACK],
								keyClick : Keys.KEY_Q
							},{
								onClick : MessageBox.NEXT(), 
								label : 'Accept (r)',
								keyClick : Keys.KEY_R
							}]
					}), new Lib.Message({
						header : data.consequence.header,
						text   : data.consequence.text,
						buttons : [MessageBox.BUTTON_NEXT]
					}), new Lib.Message({
						header : '',
						text   : 'The end.<br/><br/>Thank you for playing.',
						buttons : [{
							label : "New Game (r)",
							keyClick : Keys.KEY_R,
							onClick : function(){
								self.playerPause();
								self.musicPlayer.destroy();
								var event = 
									new CEvent({
										target : self.frame.element, 
										type : Game.EVENT_RESTART, 
										data : {}
									});
								
								event.trigger();
							}
						},{
							label : "Main Menu (q)",
							classes :[Lib.MessageBox.CLASS_BUTTON_BACK],
							keyClick : Keys.KEY_Q,
							onClick : function(){
								var event = 
									new CEvent({
										target : self.frame.element, 
										type : Game.EVENT_TO_MAIN_MENU, 
										data : {}
									});
								
								event.trigger();
							}
						}]
					})], 
					event
				);
				event.stopPropagation(); //confine to this game
			};
		
		this.frame.eventHandlers[Candle.EVENT_PICKUP] = 
			function(item, data, event){
				self.mask.staticsSet = false;
				event.stopPropagation(); //confine to this game
			};
		
		this.frame.eventHandlers[Player.EVENT_DEATH] = 
			function(item, data, event){
				self.handleScreenMessage(
					item, 
					[new Message({
						header : "Dun Dun Dun.", 
						text : "You died.",
						buttons :[{
							label : "Restart Level (e)",
							keyClick : Keys.KEY_E,
							onClick : function(){
								self.restartLevel();
								self.screenMessageBox.close();
							}
						},{
							label : "Restart Game (q)",
							classes :[Lib.MessageBox.CLASS_BUTTON_BACK],
							keyClick : Keys.KEY_Q,
							onClick : function(){
								self.restart();
								self.screenMessageBox.close();
							}
						}]
					})],
					event
				);
				event.stopPropagation(); //confine to this game
			};
		
		this.frame.eventHandlers[Throne.EVENT_END] = 
			function(item, data, event){
				self.handleScreenMessage(item, data.message, event);
				event.stopPropagation(); //confine to this game
			};
		
		this.frame.eventHandlers[Game.EVENT_RESTART] = 
			function(item, data, event){
				self.restart();
				event.stopPropagation(); //confine to this game
			};
		
		this.frame.eventHandlers[Game.EVENT_TO_MAIN_MENU] = 
			function(item, data, event){
				self.toMainMenu();
				event.stopPropagation(); //confine to this game
			};
		
		this.frame.eventHandlers[Game.EVENT_REQUEST_NEXT_LEVEL] = 
			function(item, data, event){
				if(self.readMesssages < self.papers.length){
					self.handleScreenMessage(
						item, 
						[new Message({
							header : "", 
							text : "There are still messages left on this level. Are you sure you want to go the next floor of the castle?",
							buttons :[{
								label : "Yes (r)",
								keyClick : Keys.KEY_R,
								onClick : function(){
									Pickup.prototype.pickup.call(data.exit, self.player);
									self.nextLevel();
								}
							},{
								label : "No, I'll stay here (q)",
								classes :[Lib.MessageBox.CLASS_BUTTON_BACK],
								keyClick : Keys.KEY_Q,
								onClick : function(){
									self.screenMessageBox.close();
								}
							}]
						})],
						event
					);
				}else{
					self.nextLevel();
				}
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
				onKeyUp : Lib.MessageBox.KEY_CLICK, //shouldn't use Lib
				onOpen : messageOnOpen(this),
				onClose : messageOnClose(this)
			});
		this.screenMessageBox  = 
			new ScreenMessageBox({
				selector : this.screenMessageSelector,
				onKeyUp : Lib.MessageBox.KEY_CLICK, //shouldn't use Lib
				onOpen : messageOnOpen(this),
				onClose : messageOnClose(this)
			});
		this.health = 
			new HealthBar({
				selector : this.healthSelector
			});
		this._uniqueKeyId = Keys.subscribe(Keys.EVENT_TYPE_UP, this);
		this.musicPlayer = new MusicPlayer();
	};

Game.prototype = Object.create(Base.prototype);
Game.prototype.constructor = Game;

Game.BLOCK_SIZE = 20;
Game.EVENT_REQUEST_NEXT_LEVEL = 'faded_game_event_request_next_level';
Game.EVENT_RESTART = 'faded_game_event_restart';
Game.EVENT_TO_MAIN_MENU = 'faded_game_event_to_main_menu';

Game.prototype.handleMessage =
	function(item, message, event){
		this.paperMessageBox.messages[0] = message;
		this.paperMessageBox.loadMessage(message);
		this.paperMessageBox.open();
		this.readMesssages++;
	};

Game.prototype.handleScreenMessage =
	function(item, messages, event){
		this.screenMessageBox.messages = messages;
		this.screenMessageBox.loadMessage(messages[0]);
		this.screenMessageBox.open();
	};

Game.prototype.layerSprites =
	function(items){
		var sprites = [];
		for(var i = 0, ilen = items.length; i < ilen; i++){
			var y = (parseInt(items[i].element.style.top.replace('px','')) || 0);
			sprites.push({
				top : y,
				index : i
			});
		}
		sprites.sort(function(a, b){
			if(a.top > b.top){
				return 1;
			}else if(a.top < b.top){
				return -1;
			}
			return 0;
		});
		var index = 0;
		for(var i = 0, ilen = sprites.length; i < ilen; i++){
			items[sprites[i].index].element.style['z-index'] = index++;
		}
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
					position : new Point(0, 0),
					builder : level.mapBuilder,
					positioner : level.mapPositioner
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
			var paper = Paper.create(this.frame, {message : level.papers[i]});
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
		
		this.stewards = [];
		for(var i = 0; i < level.stewards; i++){
			var steward = Steward.create(this.frame);
			steward.setPosition(this.map.findPosition(steward));
			this.stewards.push(steward);
		}
		
		this.thrones = [];
		for(var i = 0; i < level.thrones.length; i++){
			var throne = Throne.create(this.frame, level.thrones[i]);
			throne.setPosition(this.map.findPosition(throne));
			this.thrones.push(throne);
		}
		
		this.damnedThrones = [];
		for(var i = 0; i < level.damnedThrones; i++){
			var damnedThrone = DamnedThrone.create(this.frame);
			damnedThrone.setPosition(this.map.findPosition(damnedThrone));
			this.damnedThrones.push(damnedThrone);
		}
		
		this.exits = [];
		if(this.currentLevel < this.levels.length - 1){
			this.exit = Exit.create(this.frame);
			this.exit.setPosition(this.map.findPosition(this.exit));
			var minDistance = level.width/4;
			while(this.exit.getPosition().distanceTo(this.player.getPosition()) < minDistance){
				this.exit.setPosition(this.map.findPosition(this.exit));
			}
			this.exits.push(this.exit);
		}

		this.frame.updatePosition(this.player);
		this.mobs = [];
		this.mobs = 
			this.zombies.concat(this.ghosts)
						.concat(this.nobles)
						.concat(this.stewards);
		this.pickups = [];
		this.pickups = this.papers;
		this.luminousPickups = this.candles;
		this.luminousItems = this.damnedThrones;
		this.interactables = this.damnedThrones.concat(this.thrones);
		
		this.readMesssages = 0;
		
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
		var luminants = this.luminousPickups.concat(this.luminousItems);
		this.mask.set([this.player], luminants);
		
		if(level.music){
			this.musicPlayer.setSource(level.music);
		}
		
		this.updateInterval = 
			setInterval(
				(function(self){return function(){self.update();};})(this), 
				this.interval
			);
	};

Game.prototype.nextLevel =
	function(){
		this.playerPause();
		this.musicPlayer.destroy();
		clearInterval(this.updateInterval);
		this.currentLevel++;
		if(this.currentLevel < this.levels.length){
			this.load();
			this.startLevel();
		}else{
			var self = this;
			this.screenMessageBox.loadMessage(new Message({
				header : "Congratulations!", 
				text : "You finished.",
				buttons :[{
					label : "Restart Game",
					onClick : function(){
						self.restart();
						self.screenMessageBox.close();
					}
				}]
			}));
			this.screenMessageBox.open();
		}
	};

Game.prototype[Keys.INTERFACE_METHOD_UP] = //onKeyUp
	function(keynum, event){
		if(keynum === Keys.KEY_P){
			this.playerToggle();
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

Game.prototype.playerPause =
	function(){
		this.musicPlayer.pause();
		this.pause();
	};

Game.prototype.playerPlay =
	function(){
		this.musicPlayer.play();
		this.play();
	};

Game.prototype.playerToggle =
	function(){
		this.musicPlayer.toggle();
		this.toggle();
	};

Game.prototype.restart =
	function(){
		this.pause();
		clearInterval(this.updateInterval);
		this.currentLevel = 0;
		this.load();
		this.screenMessageBox.close();
		this.startLevel();
	};

Game.prototype.restartLevel =
	function(){
		this.pause();
		clearInterval(this.updateInterval);
		this.load();
		this.startLevel();
	};

Game.prototype.startLevel =
	function(){
		var self = this;
		this.musicPlayer.reset();
		this.screenMessageBox.loadMessage(new Message({
			header : "", 
			text : "",
			buttons :[]
		}));
		this.screenMessageBox.open();
		this.screenMessageBox.fadeOut(function(){
			self.play();
		});
		this.musicPlayer.play();
	};

Game.prototype.toggle =
	function(){
		this.isPlaying = !this.isPlaying;
	};

Game.prototype.toMainMenu =
	function(){
		this.playerPause();
		this.musicPlayer.destroy();
		this.onToMainMenu();
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
				for(var i = 0; i < this.interactables.length; i++){
					var interactable = this.interactables[i];
					if(this.player.touches(interactable)){
						interactable.interact(this.player);
					}
				}
				
				for(var i = 0; i < this.exits.length; i++){
					var exit = this.exits[i];
					if(this.player.touches(exit)){
						exit.pickup(this.player);
					}
				}
			}
			
			for(var i = 0; i < this.candles.length; i++){
				this.candles[i].update();
			}
			
			this.map.checkAndMove(characters);
			this.player.update();
			this.frame.updatePosition(this.player);
			this.health.set(this.player.health);
			this.health.update();
			var luminants = this.luminousPickups.concat(this.luminousItems);
			this.mask.set([this.player], luminants);
			
			this.layerSprites(
				this.interactables
					.concat([this.player])
					.concat(this.pickups)
					.concat(this.luminousPickups)
					.concat(this.interactables)
					.concat(this.exits)
				);
		}
	};