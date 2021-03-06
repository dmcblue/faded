var Ghost = 
	function(args){
		if(args.damage === undefined){args.damage = Ghost.DAMAGE;}
		if(args.radius === undefined){args.radius = Ghost.RADIUS;}
		if(args.speedFactor === undefined){args.speedFactor = Ghost.SPEED_FACTOR;}
		if(args.sightFactor === undefined){args.sightFactor = Ghost.SIGHT_FACTOR;}
		if(args.spriteCounter === undefined){args.spriteCounter = Ghost.SPRITE_COUNTER;}
		if(args.spriteClasses === undefined){args.spriteClasses = Ghost.SPRITE_CLASSES;}
		if(args.placementRadius === undefined){args.placementRadius = Ghost.PLACEMENT_RADIUS;}
		if(args.classes === undefined){
			args.classes = [];
		}
		args.classes.push('ghost');
		Chaser.call(this, args);
		this.counterMove = new Counter({turns : Ghost.TURNS_MOVE});
		this.counterAttack = new Counter({turns : Ghost.TURNS_ATTACK});
		this.setTarget();
	};

Ghost.prototype = Object.create(Chaser.prototype);
Ghost.prototype.constructor = Ghost;

Ghost.DAMAGE = 10;
Ghost.ID = 0;
Ghost.PLACEMENT_RADIUS = 30;
Ghost.RADIUS = 100;
Ghost.SPEED_FACTOR = 0.1;
Ghost.SIGHT_FACTOR = 15;
Ghost.SPRITE_CLASSES = ['sprite1','sprite2'];
Ghost.SPRITE_COUNTER = 3;
Ghost.TARGET_RADIUS = 250;
Ghost.TURNS_MOVE = 50;
Ghost.TURNS_ATTACK = 6;

Ghost.prototype.attack =
	function(player){
		if(this.counterAttack.updateAndCheck()){
			Mob.prototype.attack.call(this, player);
		}
	};

Ghost.create = 
	function(frame, args, id){
		if(args === undefined){args = {};}
		if(id === undefined){id = 'ghost' + Ghost.ID++;}
		args.selector = Item.createElement(frame, id);
		return new Ghost(args);
	};

Ghost.prototype.getNextMove =
	function(player){
		if(this.counterMove.updateAndCheck()){
			this.setTarget();
		}
		
		return Chaser.prototype.getNextMove.call(this, this.target);
	};

Ghost.prototype.setTarget =
	function(){
		var move = this.getRandomMove();
		while(move.x === 0 && move.y === 0){
			move = this.getRandomMove();
		}
		
		this.target = 
			new Target({
				point : move.scale(Ghost.TARGET_RADIUS).add(this.getPosition()),
				radius : 35
			});
	};