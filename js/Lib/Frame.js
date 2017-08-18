var Frame = 
	function(args){
		if(args.speed === undefined){args.speed = 0;}
		if(args.classes === undefined){
			args.classes = [];
		}
		args.classes.push('frame');
		Movable.call(this, args);
		this.addProperty(args,'view', false, null);
	};

Frame.prototype = Object.create(Movable.prototype);
Frame.prototype.constructor = Frame;

Frame.prototype.getOffset =
	function(){
		return new Point(
			this.element.style.left ? parseFloat(this.element.style.left.replace('px', '')) : 0, //x
			this.element.style.top  ? parseFloat(this.element.style.top.replace('px', ''))  : 0  //y
		);
	};

Frame.prototype.internalToExternal =
	function(point){
		var offset = this.getOffset();
		return point.subtract(offset);
	};

Frame.prototype.externalToInternal =
	function(point){
		var offset = this.getOffset();
		return offset.add(point);
	};

Frame.prototype.updatePosition =
	function(player){
		if(!this.view){return;}
		var position = player.getPosition();
		var center = 
			new Point(
				Math.round(this.view.width/2), 
				Math.round(this.view.height/2)
			);
		var offset = position.subtract(center).scale(-1);
		this.move(offset.x, offset.y);
	};