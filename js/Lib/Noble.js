var Noble = 
	function(args){
		if(args.damage === undefined){args.damage = Noble.DAMAGE;}
		if(args.speedFactor === undefined){args.speedFactor = Noble.SPEED_FACTOR;}
		if(args.sightFactor === undefined){args.sightFactor = Noble.SIGHT_FACTOR;}
		if(args.placementRadius === undefined){args.placementRadius = Noble.PLACEMENT_RADIUS;}
		if(args.spriteCounter === undefined){args.spriteCounter = Noble.SPRITE_COUNTER;}
		if(args.spriteClasses === undefined){args.spriteClasses = Noble.SPRITE_CLASSES;}
		if(args.classes === undefined){
			args.classes = [];
		}
		args.classes.push('noble');
		Chaser.call(this, args);
		this.addProperty(args, 'map');
		this.counterMove = new Counter({turns : Noble.TURNS_MOVE});
		this.counterAttack = new Counter({turns : Noble.TURNS_ATTACK});
		//this.element.addEventListener(Noble.EVENT_RESET, this, false);
		this.eventHandlers[Noble.EVENT_RESET] = 
			function(self, data, event){
				self.setPosition(self.map.findPosition(self));
			};
	};

Noble.prototype = Object.create(Chaser.prototype);
Noble.prototype.constructor = Noble;

Noble.DAMAGE = 10;
Noble.EVENT_RESET = 'faded_noble_event_reset';
Noble.ID = 0;
Noble.PLACEMENT_RADIUS = 50;
Noble.SPEED_FACTOR = 0.5;
Noble.SIGHT_FACTOR = 15;
Noble.SPRITE_CLASSES = ['sprite1'];
Noble.SPRITE_COUNTER = 1000;
Noble.TURNS_MOVE = 1;
Noble.TURNS_ATTACK = 3;

Noble.prototype.attack =
	function(player){
		if(this.counterAttack.updateAndCheck()){
			Mob.prototype.attack.call(this, player);
			//var event = new CEvent(Noble.EVENT_RESET);
			var event = 
				new CEvent({
					target : this.element, 
					type : Noble.EVENT_RESET, 
					data : {}
				});
			event.trigger();
		}
	};

Noble.create = 
	function(frame, args, id){
		if(args === undefined){args = {};}
		if(id === undefined){id = 'noble' + Noble.ID++;}
		args.selector = Item.createElement(frame, id);
		return new Noble(args);
	};

Noble.prototype.getNextMove =
	function(player){
		return this.counterMove.updateAndCheck()
			? Chaser.prototype.getNextMove.call(this, player)
			: Point.HERE
		;
	};