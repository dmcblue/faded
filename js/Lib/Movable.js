var Movable = 
	function(args){
		if(args.classes === undefined){
			args.classes = [];
		}
		args.classes.push('movable');
		Item.call(this, args);
		this.addProperty(args,'speedFactor', false, 1, parseFloat);
		this.addProperty(args,'speed', false, Math.round(this.width*this.speedFactor), parseInt);
		if(args.position !== undefined){
			this.move(args.position);
		}
		
		this.eventHandlers[Movable.EVENT_MOVE] = 
			function(self, data, event){
				//var position = self.getPosition().add(data.direction.scale(data.speed));

				self.element.style.left = Math.round(data.position.x) + 'px';
				self.element.style.top  = Math.round(data.position.y) + 'px';
			};
	};

Movable.prototype = Object.create(Item.prototype);
Movable.prototype.constructor = Movable;

Movable.EVENT_MOVE = 'faded_movable_event_move';

Movable.prototype.getProposal =
	function(direction){
		return this.getPosition().add(direction.scale(this.speed));
	};

Movable.prototype.move = Item.prototype.setPosition;

Movable.prototype.moveToward =
	function(direction, speed){
		/*
		if(speed === undefined){speed = this.speed;}
		var position = this.getPosition().add(direction.scale(speed));
		
		this.element.style.left = Math.round(position.x) + 'px';
		this.element.style.top  = Math.round(position.y) + 'px';
		//*/
		if(speed === undefined){speed = this.speed;}
		var event = new CEvent({type : Movable.EVENT_MOVE, data : { direction: direction, speed: speed}});
		this.element.dispatchEvent(event);
	};