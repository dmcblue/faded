var Ghost = 
	function(args){
		if(args.damage === undefined){args.damage = Ghost.DAMAGE;}
		if(args.radius === undefined){args.radius = Ghost.RADIUS;}
		if(args.speed === undefined){args.speed = Ghost.SPEED;}
		if(args.sight === undefined){args.sight = Ghost.SIGHT;}
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
Ghost.RADIUS = 15;
Ghost.SPEED = 3;
Ghost.SIGHT = 150;
Ghost.TARGET_RADIUS = 100;
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