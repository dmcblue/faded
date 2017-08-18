var Character = 
	function(args){
		if(args.classes === undefined){
			args.classes = [];
		}
		args.classes.push('character');
		Movable.call(this, args);
		this.addProperty(args, 'placementRadius', true, null, parseInt);    //in px
	};

Character.prototype = Object.create(Movable.prototype);
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

Character.prototype.getNextMove =
	function(player){
		return Point.HERE;
	};

Character.prototype.getRandomMove =
	function(){
		return Point[Character.MOVES[Tools.randomInteger(0, Character.MOVES.length)]];
	};