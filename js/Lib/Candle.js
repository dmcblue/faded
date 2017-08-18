var Candle = 
	function(args){
		if(args.classes === undefined){
			args.classes = [];
		}
		args.classes.push('candle');
		Pickup.call(this, args);
		//this.addProperty(args,'onpickup');
	};

Candle.HEALING_FACTOR = 10;
Candle.ID = 0;

Candle.prototype = Object.create(Pickup.prototype);
Candle.prototype.constructor = Candle;

Candle.create = 
	function(frame, args, id){
		if(args === undefined){args = {};}
		if(id === undefined){id = 'candle' + Candle.ID++;}
		args.selector = Item.createElement(frame, id);
		return new Candle(args);
	};

Candle.prototype.pickup = 
	function(actor){
		actor.heal(Candle.HEALING_FACTOR);
		Pickup.prototype.pickup.call(this, actor);
	};