var Player = 
	function(args){
		if(args.placementRadius === undefined){
			args.placementRadius = Player.PLACEMENT_RADIUS;
		}
		if(args.speed === undefined){args.speed = Player.SPEED;}
		if(args.spriteCounter === undefined){args.spriteCounter = Player.SPRITE_COUNTER;}
		if(args.spriteClasses === undefined){args.spriteClasses = Player.SPRITE_CLASSES;}
		if(args.classes === undefined){
			args.classes = [];
		}
		args.classes.push('player');
		Character.call(this, args);
		this.addProperty(args, 'luminance', false, Player.LUMINANCE, parseInt);
		this.addProperty(args, 'luminosity', false, Player.LUMINOSITY, parseInt);
		this.health = Player.HEALTH_MAX;
		this.counterFade = new Counter({turns : Player.TURNS_FADE});
	};

Player.prototype = Object.create(Character.prototype);
Player.prototype.constructor = Player;

Player.ID = 0;
Player.HEALTH_MAX = 100;
Player.LUMINANCE = 4; //distance
Player.LUMINOSITY = 10; //strength
Player.PLACEMENT_RADIUS = 50;
Player.SPEED = 8;
Player.SPRITE_CLASSES = ['sprite1','sprite2'];
Player.SPRITE_COUNTER = 5;
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
		this.health = Math.min(this.health + healing, Player.HEALTH_MAX);
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
		this.luminosity = 5 + (this.health/100)*5;
	};