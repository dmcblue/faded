var Noble = 
	function(args){
		if(args.damage === undefined){args.damage = Noble.DAMAGE;}
		if(args.speed === undefined){args.speed = Noble.SPEED;}
		if(args.sight === undefined){args.sight = Noble.SIGHT;}
		if(args.placementRadius === undefined){args.placementRadius = Noble.PLACEMENT_RADIUS;}
		if(args.classes === undefined){
			args.classes = [];
		}
		args.classes.push('noble');
		Chaser.call(this, args);
		this.addProperty(args, 'map');
		this.counterMove = new Counter({turns : Noble.TURNS_MOVE});
		this.counterAttack = new Counter({turns : Noble.TURNS_ATTACK});
		this.element.addEventListener(Noble.EVENT_RESET, this, false);
		this.eventHandlers[Noble.EVENT_RESET] = 
			function(self, event){
				self.setPosition(self.map.findPosition(self));
			};
	};

Noble.prototype = Object.create(Chaser.prototype);
Noble.prototype.constructor = Noble;

Noble.DAMAGE = 10;
Noble.EVENT_RESET = 'faded_noble_event_reset';
Noble.ID = 0;
Noble.PLACEMENT_RADIUS = 50;
Noble.SPEED = 5;
Noble.SIGHT = 250;
Noble.TURNS_MOVE = 1;
Noble.TURNS_ATTACK = 3;

Noble.prototype.attack =
	function(player){
		if(this.counterAttack.updateAndCheck()){
			Mob.prototype.attack.call(this, player);
			var event = new CustomEvent(Noble.EVENT_RESET);
			this.element.dispatchEvent(event);
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