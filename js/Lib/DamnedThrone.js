var DamnedThrone = 
	function(args){
		if(args.classes === undefined){
			args.classes = [];
		}
		args.classes.push('throne');
		args.classes.push('damned');
		if(args.placementRadius === undefined){args.placementRadius = DamnedThrone.PLACEMENT_RADIUS;}
		MapItem.call(this, args);
		this.addProperty(args, 'luminance', false, DamnedThrone.LUMINANCE, parseInt);
		this.addProperty(args, 'luminosity', false, DamnedThrone.LUMINOSITY, parseInt);
	};

DamnedThrone.HEALING_FACTOR = 25;
DamnedThrone.ID = 0;
DamnedThrone.LUMINANCE  = 3; //distance
DamnedThrone.LUMINOSITY = 6; //strength
DamnedThrone.PLACEMENT_RADIUS = 30;

DamnedThrone.prototype = Object.create(MapItem.prototype);
DamnedThrone.prototype.constructor = DamnedThrone;

DamnedThrone.create = 
	function(frame, args, id){
		if(args === undefined){args = {};}
		if(id === undefined){id = 'damnedThrone' + DamnedThrone.ID++;}
		args.selector = Item.createElement(frame, id);
		return new DamnedThrone(args);
	};

DamnedThrone.prototype.interact = 
	function(actor){
		actor.heal(DamnedThrone.HEALING_FACTOR);
	};