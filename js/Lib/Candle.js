var Candle = 
	function(args){
		if(args.classes === undefined){
			args.classes = [];
		}
		args.classes.push('candle');
		if(args.placementRadius === undefined){args.placementRadius = Candle.PLACEMENT_RADIUS;}
		Pickup.call(this, args);
		this.addProperty(args, 'luminance', false, Candle.LUMINANCE, parseInt);
		this.addProperty(args, 'luminosity', false, Candle.LUMINOSITY, parseInt);
		//this.addProperty(args,'onpickup');
	};

Candle.HEALING_FACTOR = 10;
Candle.ID = 0;
Candle.LUMINANCE  = 2; //distance
Candle.LUMINOSITY = 5; //strength
Candle.PLACEMENT_RADIUS = 30;

Candle.prototype = Object.create(Pickup.prototype);
Candle.prototype.constructor = Candle;

Candle.EVENT_PICKUP = 'faded_candle_event_pickup';

Candle.create = 
	function(frame, args, id){
		if(args === undefined){args = {};}
		if(id === undefined){id = 'candle' + Candle.ID++;}
		args.selector = Item.createElement(frame, id);
		return new Candle(args);
	};

Candle.prototype.pickup = 
	function(actor){
		var event = 
			new CEvent({
				target : this.element.parentElement, 
				type : Candle.EVENT_PICKUP, 
				data : {}
			});
		
		actor.heal(Candle.HEALING_FACTOR);
		Pickup.prototype.pickup.call(this, actor);
		
		event.trigger();
	};