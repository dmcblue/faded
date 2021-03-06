var Zombie = 
	function(args){
		if(args.damage === undefined){args.damage = Zombie.DAMAGE;}
		if(args.speedFactor === undefined){args.speedFactor = Zombie.SPEED_FACTOR;}
		if(args.sightFactor === undefined){args.sightFactor = Zombie.SIGHT_FACTOR;}
		if(args.placementRadius === undefined){args.placementRadius = Zombie.PLACEMENT_RADIUS;}
		if(args.radiusType === undefined){args.radiusType = Item.RADIUS_TYPE_CIRCLE;}
		if(args.spriteCounter === undefined){args.spriteCounter = Zombie.SPRITE_COUNTER;}
		if(args.spriteClasses === undefined){args.spriteClasses = Zombie.SPRITE_CLASSES;}
		if(args.classes === undefined){
			args.classes = [];
		}
		args.classes.push('zombie');
		Chaser.call(this, args);
		this.counterMove = new Counter({turns : Zombie.TURNS_MOVE});
		this.counterAttack = new Counter({turns : Zombie.TURNS_ATTACK});
	};

Zombie.prototype = Object.create(Chaser.prototype);
Zombie.prototype.constructor = Zombie;

Zombie.DAMAGE = 3;
Zombie.ID = 0;
Zombie.PLACEMENT_RADIUS = 30;
Zombie.SPEED_FACTOR = 0.5;
Zombie.SIGHT_FACTOR = 15;
Zombie.SPRITE_CLASSES = ['sprite1','sprite2'];
Zombie.SPRITE_COUNTER = 2;
Zombie.TURNS_MOVE = 3;
Zombie.TURNS_ATTACK = 3;

Zombie.prototype.attack =
	function(player){
		if(this.counterAttack.updateAndCheck()){
			Mob.prototype.attack.call(this, player);
		}
	};

Zombie.create = 
	function(frame, args, id){
		if(args === undefined){args = {};}
		if(id === undefined){id = 'zombie' + Zombie.ID++;}
		args.selector = Item.createElement(frame, id);
		return new Zombie(args);
	};

Zombie.prototype.getNextMove =
	function(player){
		return this.counterMove.updateAndCheck()
			? Chaser.prototype.getNextMove.call(this, player)
			: Point.HERE
		;
	};