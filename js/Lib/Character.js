var Character = 
	function(args){
		if(args.classes === undefined){
			args.classes = [];
		}
		args.classes.push('character');
		Sprite.call(this, args);
		this.directionClass = Character.DIRECTION.HERE;
		this.addClass(this.directionClass);
	};

Character.prototype = Object.create(Sprite.prototype);
Character.prototype.constructor = Character;

Character.MOVES = 
	[
		'HERE',
		'N',
		'NE',
		'E',
		'SE',
		'S',
		'SW',
		'W',
		'NW'
	];
Character.DIRECTION = 
	{
		HERE : 'here',
		N    : 'north',
		NE   : 'northeast',
		E    : 'east',
		SE   : 'southeast',
		S    : 'south',
		SW   : 'southwest',
		W    : 'west',
		NW   : 'northwest'
	};


Character.pointToDirection =
	function(point){
		var direction = Character.DIRECTION.HERE;
		
		if(point.x > 0){
			if(point.y > 0){
				direction = Character.DIRECTION.SE;
			}else if(point.y < 0){
				direction = Character.DIRECTION.NE;
			}else{
				direction = Character.DIRECTION.E;
			}
		}else if(point.x < 0){
			if(point.y > 0){
				direction = Character.DIRECTION.SW;
			}else if(point.y < 0){
				direction = Character.DIRECTION.NW;
			}else{
				direction = Character.DIRECTION.W;
			}
		}else{
			if(point.y > 0){
				direction = Character.DIRECTION.S;
			}else if(point.y < 0){
				direction = Character.DIRECTION.N;
			}
		}
		
		return direction;
	};


Character.prototype.getNextMove =
	function(player){
		return Point.HERE;
	};

Character.prototype.getRandomMove =
	function(){
		return Point[Character.MOVES[Tools.randomInteger(0, Character.MOVES.length)]];
	};

Character.prototype.move = 
	function(x, y){
		var tx = x, ty = 0;
		if(y === undefined){
			ty = x.y;
			tx = x.x;
		}else{
			ty = y;
		}
		var position = this.getPosition();
		var newDirection = Character.pointToDirection(new Point(tx - position.x, ty - position.y));
		//console.log(tx, ty, this.directionClass, newDirection);
		if(this.directionClass !== newDirection){
			this.removeClass(this.directionClass);
			this.directionClass = newDirection;
			this.addClass(this.directionClass);
		}
		
		Sprite.prototype.setPosition.call(this, x, y);
	};