var Exit = 
	function(args){
		if(args.classes === undefined){
			args.classes = [];
		}
		args.classes.push('exit');
		if(args.placementRadius === undefined){args.placementRadius = Exit.PLACEMENT_RADIUS;}
		Pickup.call(this, args);
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
		var event = 
			new CEvent({
				target : this.element.parentElement, 
				type : Game.EVENT_REQUEST_NEXT_LEVEL, 
				data : {exit:this}
			});
		
		//Pickup.prototype.pickup.call(this, actor);
		
		event.trigger();
	};