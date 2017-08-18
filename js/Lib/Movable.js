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
	};

Movable.prototype = Object.create(Item.prototype);
Movable.prototype.constructor = Movable;

Movable.prototype.getProposal =
	function(direction){
		return this.getPosition().add(direction.scale(this.speed));
	};

Movable.prototype.move = Item.prototype.setPosition;

Movable.prototype.moveToward =
	function(direction, speed){
		if(speed === undefined){speed = this.speed;}
		var position = this.getPosition().add(direction.scale(speed));
		
		this.element.style.left = Math.round(position.x) + 'px';
		this.element.style.top  = Math.round(position.y) + 'px';
	};
