var Player = 
	function(args){
		if(args.placementRadius === undefined){
			args.placementRadius = Player.PLACEMENT_RADIUS;
		}
		if(args.speedFactor === undefined){args.speedFactor = Player.SPEED_FACTOR;}
		if(args.spriteCounter === undefined){args.spriteCounter = Player.SPRITE_COUNTER;}
		if(args.spriteClasses === undefined){args.spriteClasses = Player.SPRITE_CLASSES;}
		//if(args.radius === undefined){args.radius = Player.RADIUS;}
		if(args.radiusType === undefined){args.radiusType = Item.RADIUS_TYPE_CIRCLE;}
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

Player.EVENT_DEATH = 'faded_player_event_death';
Player.EVENT_HURT = 'faded_player_event_hurt';
Player.ID = 0;
Player.HEALTH_MAX = 100;
Player.LUMINANCE = 4; //distance
Player.LUMINOSITY = 10; //strength
Player.PLACEMENT_RADIUS = 50;
Player.RADIUS = 20;//circular
Player.SPEED_FACTOR = 0.8;
Player.SPRITE_CLASSES = ['sprite1','sprite2'];
Player.SPRITE_COUNTER = 2;
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
	function(damage, fromEnemy){
		this.health = Math.max(this.health - damage, 0);
		if(fromEnemy){
			var event = 
				new CEvent({
					target : this.element.parentElement, 
					type : Player.EVENT_HURT, 
					data : {}
				});
			event.trigger();
		}
	};

Player.prototype.update =
	function(){
		if(this.counterFade.updateAndCheck()){
			this.hurt(1, false);
		}
		this.element.style.opacity = (this.health/100);
		this.luminosity = 5 + (this.health/100)*5;
		
		if(!this.health){
			var event = 
				new CEvent({
					target : this.element.parentElement, 
					type : Player.EVENT_DEATH, 
					data : {}
				});
			event.trigger();
		}
	};