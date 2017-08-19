var Noble = 
	function(args){
		if(args.damage === undefined){args.damage = Noble.DAMAGE;}
		if(args.radius === undefined){args.radius = Noble.RADIUS;}
		if(args.speed === undefined){args.speed = Noble.SPEED;}
		if(args.sight === undefined){args.sight = Noble.SIGHT;}
		if(args.placementRadius === undefined){args.placementRadius = Noble.PLACEMENT_RADIUS;}
		if(args.classes === undefined){
			args.classes = [];
		}
		args.classes.push('noble');
		Chaser.call(this, args);
		this.counterMove = new Counter({turns : Noble.TURNS_MOVE});
		this.counterAttack = new Counter({turns : Noble.TURNS_ATTACK});
		this.setTarget();
	};

Noble.prototype = Object.create(Chaser.prototype);
Noble.prototype.constructor = Noble;

Noble.DAMAGE = 10;
Noble.ID = 0;
Noble.PLACEMENT_RADIUS = 30;
Noble.RADIUS = 15;
Noble.SPEED = 1;
Noble.SIGHT = 150;
Noble.TARGET_RADIUS = 100;
Noble.TURNS_MOVE = 3;
Noble.TURNS_ATTACK = 6;

Noble.prototype.attack =
	function(player){
		if(this.counterAttack.updateAndCheck()){
			Mob.prototype.attack.call(this, player);
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
		if(this.counterMove.updateAndCheck()){
			this.setTarget();
		}
		
		return Chaser.prototype.getNextMove.call(this, this.target);
	};

Noble.prototype.setTarget =
	function(){
		this.target = 
			new Target({
				point : this.getRandomMove().scale(Noble.TARGET_RADIUS),
				radius : 0
			});
	};