var Rectangle = 
	function(){
		if(arguments.length > 3){
			this.x = parseFloat(arguments[0]);
			this.y = parseFloat(arguments[1]);
			this.width = parseFloat(arguments[2]);
			this.height = parseFloat(arguments[3]);
		}else if(arguments.length > 2){
			this.x = parseFloat(arguments[0].x);
			this.y = parseFloat(arguments[0].y);
			this.width = parseFloat(arguments[1]);
			this.height = parseFloat(arguments[2]);
		}else{
			var args = arguments[0];
			Base.call(this, args);
			this.addProperty(args,'x', true, null, parseFloat);
			this.addProperty(args,'y', true, null, parseFloat);
			this.addProperty(args,'width', true, null, parseFloat);
			this.addProperty(args,'height', true, null, parseFloat);
		}
	};

Rectangle.prototype = Object.create(Base.prototype);
Rectangle.prototype.constructor = Rectangle;

Rectangle.prototype.getRandomPoint =
	function(){
		return new Point(
			Tools.randomInteger(this.x, this.x + this.width, false),
			Tools.randomInteger(this.y, this.y + this.height, false)
		);
	};

