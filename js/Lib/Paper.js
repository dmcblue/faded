var Paper = 
	function(args){
		if(args.classes === undefined){
			args.classes = [];
		}
		args.classes.push('paper');
		if(args.placementRadius === undefined){
			args.placementRadius = Paper.PLACEMENT_RADIUS;
		}
		Pickup.call(this, args);
		this.addProperty(args, 'header');
		this.addProperty(args, 'text');
	};

Paper.ID = 0;
Paper.PLACEMENT_RADIUS = 50;

Paper.prototype = Object.create(Pickup.prototype);
Paper.prototype.constructor = Paper;

Paper.create = 
	function(frame, args, id){
		if(args === undefined){args = {};}
		if(id === undefined){id = 'paper' + Paper.ID++;}
		args.selector = Item.createElement(frame, id);
		return new Paper(args);
	};

Paper.prototype.pickup = 
	function(actor){
		var message = 
			new MessageEvent({
				target : this.element.parentElement,
				message : new Message({
					header : this.header,
					text   : this.text
				})
			});
		message.trigger();
		Pickup.prototype.pickup.call(this, actor);
	};