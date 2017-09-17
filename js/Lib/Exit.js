var Exit = 
	function(args){
		if(args.classes === undefined){
			args.classes = [];
		}
		args.classes.push('exit');
		if(args.placementRadius === undefined){args.placementRadius = Exit.PLACEMENT_RADIUS;}
		Pickup.call(this, args);
		this.addProperty(args,'game');
	};

Exit.ID = 0;
Exit.PLACEMENT_RADIUS = 250;

Exit.prototype = Object.create(Pickup.prototype);
Exit.prototype.constructor = Exit;

Exit.create = 
	function(frame, args, id){
		if(args === undefined){args = {};}
		if(id === undefined){id = 'exit' + Exit.ID++;}
		args.selector = Item.createElement(frame, id);
		return new Exit(args);
	};

Exit.prototype.pickup = 
	function(actor){
		Pickup.prototype.pickup.call(this, actor);
		this.game.nextLevel();
	};