var Point = 
	function(){
		if(arguments.length > 1){
			this.x = parseFloat(arguments[0]);
			this.y = parseFloat(arguments[1]);
			//Base.call(this, {});
		}else{
			var args = arguments[0];
			Base.call(this, args);
			this.addProperty(args,'x', true, null, parseFloat);
			this.addProperty(args,'y', true, null, parseFloat);
		}
	};

Point.prototype = Object.create(Base.prototype);
Point.prototype.constructor = Point;

Point.DIAGONAL = 0.707;//0.70710678 , sqrt(2)/2

Point.HERE  = Point.HOME = Point.CENTER = new Point({ x : 0,  y : 0 });
Point.UP    = Point.N = Point.NORTH = new Point({ x : 0,  y : -1 });
Point.DOWN  = Point.S = Point.SOUTH = new Point({ x : 0,  y : 1  });
Point.RIGHT = Point.E = Point.EAST  = new Point({ x : 1,  y : 0  });
Point.LEFT  = Point.W = Point.WEST  = new Point({ x : -1, y : 0  });
Point.UP_RIGHT    = Point.NE = Point.NORTH_EAST = new Point({ x : Point.DIAGONAL,       y : -1 * Point.DIAGONAL });
Point.DOWN_RIGHT  = Point.SE = Point.SOUTH_EAST = new Point({ x : Point.DIAGONAL,       y : Point.DIAGONAL });
Point.DOWN_LEFT   = Point.SW = Point.SOUTH_WEST = new Point({ x : -1 * Point.DIAGONAL,  y : Point.DIAGONAL });
Point.UP_LEFT     = Point.NW = Point.NORTH_WEST = new Point({ x : -1 * Point.DIAGONAL,  y : -1 * Point.DIAGONAL });

Point.prototype.absCeil =
	function(){
		return new Point(
			this.x > 0 ? Math.ceil(this.x) : Math.floor(this.x), 
			this.y > 0 ? Math.ceil(this.y) : Math.floor(this.y)
		);
	};

Point.prototype.add =
	function(point){
		return new Point(
			this.x + point.x,
			this.y + point.y
		);
	};

Point.prototype.ceil =
	function(){
		return new Point(Math.ceil(this.x), Math.ceil(this.y));
	};

Point.prototype.clone = 
	function(){
		return new Point(this.x, this.y);
	};

Point.prototype.directionOf =
	function(point){
		var direction = Point.HERE.clone();
		if(this.x !== point.x){
			direction.x = (this.x > point.x) ? -1 : 1;
		}
		
		if(this.y !== point.y){
			direction.y = (this.y > point.y) ? -1 : 1;
		}
		
		if(direction.x && direction.y){
			direction = direction.scale(Point.DIAGONAL);
		}
		
		return direction;
	};

Point.prototype.distanceTo =
	function(point){
		var 
			x = this.x - point.x,
			y = this.y - point.y
		;
		
		return Math.sqrt(x*x + y*y);
	};

Point.prototype.equals =
	function(point){
		return this.x === point.x && this.y === point.y;
	};

Point.prototype.floor =
	function(){
		return new Point(Math.floor(this.x), Math.floor(this.y));
	};

Point.prototype.mod =
	function(base){
		return new Point(this.x % base, this.y % base);
	};

Point.prototype.round =
	function(){
		return new Point(Math.round(this.x), Math.round(this.y));
	};

Point.prototype.scale =
	function(scalar){
		return new Point(
			this.x * scalar,
			this.y * scalar
		);
	};

Point.prototype.subtract =
	function(point){
		return new Point(
			this.x - point.x,
			this.y - point.y
		);
	};

Point.prototype.unit =
	function(){
		return new Point(
			(this.x === 0 ? 0 : (this.x > 0 ? 1 : -1)),
			(this.y === 0 ? 0 : (this.y > 0 ? 1 : -1))
		);
	};