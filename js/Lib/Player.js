var Player = 
	function(args){
		if(args.placementRadius === undefined){
			args.placementRadius = Player.PLACEMENT_RADIUS;
		}
		if(args.speed === undefined){args.speed = Player.SPEED;}
		if(args.classes === undefined){
			args.classes = [];
		}
		args.classes.push('player');
		Character.call(this, args);
		this.health = 90;
		this.counterFade = new Counter({turns : Player.TURNS_FADE});
	};

Player.prototype = Object.create(Character.prototype);
Player.prototype.constructor = Player;

Player.ID = 0;
Player.PLACEMENT_RADIUS = 50;
Player.SPEED = 10;
Player.TURNS_FADE = 5;

Player.create = 
	function(frame, args, id){
		if(args === undefined){args = {};}
		if(id === undefined){id = 'player' + Player.ID++;}
		args.selector = Item.createElement(frame, id);
		return new Player(args);
	};

Player.prototype.heal =
	function(healing){
		this.health = Math.min(this.health + healing, 100);
	};

Player.prototype.hurt =
	function(damage){
		this.health = Math.max(this.health - damage, 0);
	};

Player.prototype.update =
	function(){
		if(this.counterFade.updateAndCheck()){
			this.hurt(1);
		}
		this.element.style.opacity = (this.health/100);
	};