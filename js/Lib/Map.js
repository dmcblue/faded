var Map = 
	function(args){
		if(args.classes === undefined){
			args.classes = [];
		}
		args.classes.push('map');
		Grid.call(this, args);
		this.addProperty(args, 'builder');
		this.arr = this.builder.build();
		this.addProperty(args, 'positioner');
		this.cache = null;
		
		//set classes in HTML
		var cnt = 0;
		for(var i = 0, ilen = this.arr.length; i < ilen; i++){
			var row = this.arr[i];
			for(var j = 0, jlen = row.length; j < jlen; j++){
				this.elementAt(i, j).className += this.arr[i][j] ? " walkable" : " unwalkable";
				cnt += this.arr[i][j];
			}
		}
	};

Map.prototype = Object.create(Grid.prototype);
Map.prototype.constructor = Map;

Map.ID = 0;
Map.STATE_UNWALKABLE = 0;
Map.STATE_WALKABLE   = 1;
Map.TRIES = 3;

Map.create = 
	function(frame, args, id){
		if(args === undefined){args = {};}
		if(id === undefined){id = 'map' + Map.ID++;}
		args.selector = Item.createElement(frame, id);
		return new Map(args);
	};

Map.prototype.checkAndMove =
	function(movables){
		for(var i = 0, ilen = movables.length; i < ilen; i++){
			var row = movables[i];
			var movable = row.movable,
				direction = row.direction;
			if(direction.equals(Point.HOME)){
				continue;
			}
			var position = movable.getPosition(),
				dir = direction.unit();
			var scaled = direction.scale(movable.speed).absCeil();
			var added = position.add(scaled);
			var mod_point = 
				new Point(
					dir.x > 0 ?  added.x : position.x,
					dir.y > 0 ?  added.y : position.y
				);
			var modded = mod_point.mod(this.blockSize);
			
			var the_mod = mod_point.subtract(modded);
			
			if(dir.x > 0){
				the_mod.x += (this.blockSize - movable.width);
			}
			if(dir.y > 0){
				the_mod.y += (this.blockSize - movable.height);
			}
			
			
			var needsMod = !(the_mod.equals(position) || the_mod.equals(added));
			var moves = [added];
			
			if(needsMod){
				moves.push(new Point(added.x, the_mod.y));
				moves.push(new Point(the_mod.x, added.y));
				moves.push(new Point(the_mod.x, the_mod.y));
			}
			moves.push(new Point(added.x, position.y));
			moves.push(new Point(position.x,        added.y));
			if(needsMod){
				moves.push(new Point(the_mod.x, position.y));
				moves.push(new Point(position.x,        the_mod.y));
			}
			
			for(var j = 0, jlen = moves.length; j < jlen; j++){
				if(this.check(movable, moves[j])){
					movable.move(moves[j]);
					break;
				}
			}
		}
	};

Map.prototype.check =
	function(movable, position){
		var factor = 1/this.blockSize;
		var nw = position.scale(factor).floor(),
			ne = position.add(new Point(movable.width - 1, 0)).scale(factor).floor(),
			se = position.add(new Point(movable.width - 1, movable.height - 1)).scale(factor).floor(),
			sw = position.add(new Point(0,             movable.height - 1)).scale(factor).floor();
		
		return nw.x > -1
			&& nw.x < this.arr.length
			&& nw.y > -1
			&& nw.y < this.arr[nw.x].length
			&& ne.x > -1
			&& ne.x < this.arr.length
			&& ne.y > -1
			&& ne.y < this.arr[ne.x].length
			&& se.x > -1
			&& se.x < this.arr.length
			&& se.y > -1
			&& se.y < this.arr[se.x].length
			&& sw.x > -1
			&& sw.x < this.arr.length
			&& sw.y > -1
			&& sw.y < this.arr[sw.x].length
			&& this.arr[nw.x][nw.y]
			&& this.arr[ne.x][ne.y]
			&& this.arr[se.x][se.y]
			&& this.arr[sw.x][sw.y];
	};

Map.prototype.isValidPositionOnArray =
	function(array, position, mapItem, blockSize){
		var boundingBox = mapItem.getBoundingBox();
		var 
			topLeft = boundingBox[0].scale(1/blockSize).floor().add(position),
			bottomRight = boundingBox[1].scale(1/blockSize).ceil().add(position),
			valid = topLeft.x >= 0 && topLeft.y >= 0
				&& bottomRight.x < array.length
				&& bottomRight.y < array[0].length
		;
		
		for(
			var i = topLeft.x, ilen = bottomRight.x + 1;
			i < ilen && valid;
			i++
		){
			for(
				var j = topLeft.y, jlen = bottomRight.y + 1;
				j < jlen && valid;
				j++
			){
				valid = valid && (array[i][j] !== Map.STATE_UNWALKABLE);
			}
		}
		
		return valid;
	};

Map.prototype.findPosition =
	function(character, tries){
		return this.positioner.findAndSetPosition(this, character, this.blockSize);
	};

Map.prototype.getHeight = 
	function(){
		return this.arr[0].length;
	};

Map.prototype.getWidth = 
	function(){
		return this.arr.length;
	};

Map.prototype.resetCache =
	function(){
		this.cache = Tools.clonePlane(this.arr);
	};

Map.prototype.toArray = 
	function(){
		return Tools.clonePlane(this.arr);
	};