var Movable = 
	function(args){
		if(args.classes === undefined){
			args.classes = [];
		}
		args.classes.push('movable');
		Item.call(this, args);
		this.addProperty(args,'speed');
		if(args.position !== undefined){
			this.move(args.position);
		}
		this.element.addEventListener("move", this, false);
	};

Movable.prototype = Object.create(Item.prototype);
Movable.prototype.constructor = Movable;

Movable.prototype.getProposal =
	function(direction){
		return this.getPosition().add(direction.scale(this.speed));
	};

Movable.prototype.handleEvent =
	function(event){
		switch(event.type){
			case 'move' : 
				var position = 
					this.getPosition().add(event.direction.scale(event.speed));

				this.element.style.left = Math.round(position.x) + 'px';
				this.element.style.top  = Math.round(position.y) + 'px';
				
				break;
		}
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
		var event = new CustomEvent('move', { direction: direction, speed: speed});
		this.element.dispatchEvent(event);
	};
