var Steward = 
	function(args){
		if(args.damage === undefined){args.damage = Steward.DAMAGE;}
		if(args.speedFactor === undefined){args.speedFactor = Steward.SPEED_FACTOR;}
		if(args.sightFactor === undefined){args.sightFactor = Steward.SIGHT_FACTOR;}
		if(args.placementRadius === undefined){args.placementRadius = Steward.PLACEMENT_RADIUS;}
		if(args.spriteCounter === undefined){args.spriteCounter = Steward.SPRITE_COUNTER;}
		if(args.spriteClasses === undefined){args.spriteClasses = Steward.SPRITE_CLASSES;}
		if(args.classes === undefined){
			args.classes = [];
		}
		args.classes.push('steward');
		Chaser.call(this, args);
		this.counterMove = new Counter({turns : Steward.TURNS_MOVE});
		this.counterAttack = new Counter({turns : Steward.TURNS_ATTACK});
	};

Steward.prototype = Object.create(Chaser.prototype);
Steward.prototype.constructor = Steward;

Steward.DAMAGE = 10;
Steward.ID = 0;
Steward.PLACEMENT_RADIUS = 50;
Steward.SPEED_FACTOR = 0.45;
Steward.SIGHT_FACTOR = 15;
Steward.SPRITE_CLASSES = ['sprite1','sprite2'];
Steward.SPRITE_COUNTER = 2;
Steward.TURNS_MOVE = 2;
Steward.TURNS_ATTACK = 3;

Steward.create = 
	function(frame, args, id){
		if(args === undefined){args = {};}
		if(id === undefined){id = 'steward' + Steward.ID++;}
		args.selector = Item.createElement(frame, id);
		return new Steward(args);
	};

Steward.prototype.getNextMove =
	function(player){
		return this.counterMove.updateAndCheck()
			? Chaser.prototype.getNextMove.call(this, player)
			: Point.HERE
		;
	};