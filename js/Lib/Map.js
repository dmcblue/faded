var Map = 
	function(args){
		if(args.classes === undefined){
			args.classes = [];
		}
		args.classes.push('map');
		Grid.call(this, args);
		if(args.arr === undefined){
			this.arr = this.makeArray(30, 10, 10);
		}else{
			this.arr = args.arr;
		}
		this.cache = null;
		var cnt = 0;
		for(var i = 0, ilen = this.arr.length; i < ilen; i++){
			var row = this.arr[i];
			for(var j = 0, jlen = row.length; j < jlen; j++){
				this.elementAt(i, j).className += this.arr[i][j] ? " walkable" : " unwalkable";
				cnt += this.arr[i][j];
			}
		}
		//console.log('count', cnt);
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
			if(direction == Point.HOME){
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

Map.prototype.cloneArray = 
	function(){
		var clonedArray = [];
		for(var i = 0, ilen = this.arr.length; i < ilen; i++){
			var clonedRow = [];
			for(var j = 0, jlen = this.arr[i].length; j < jlen; j++){
				clonedRow.push(this.arr[i][j]);
			}
			clonedArray.push(clonedRow);
		}
		
		return clonedArray;
	};

Map.prototype.findPosition =
	function(character, tries){
		if(tries === undefined){tries = Map.TRIES;}
		if(!this.cache){this.resetCache();}
		
		var radius = character.placementRadius;// Math.ceil(character.placementRadius/this.blockSize),
			count = 0,
			width = Math.ceil(this.width/this.blockSize),
			height = Math.ceil(this.height/this.blockSize);
		var position = null;
		while(count++ < tries){
			var position = this._findPosition(character);
			var valid = true;
			for(
				var i = Math.max(0, position.x - radius), 
				ilen = Math.min(width - 1, position.x + radius); 
				i < ilen; i += this.blockSize
			){
				for(
					var j = Math.max(0, position.y - radius), 
					jlen = Math.min(height - 1, position.y + radius); 
					j < jlen; j += this.blockSize
				){
					//valid = valid && this.cache[i][j] === Map.STATE_UNWALKABLE;
					valid = valid && this.check(character, new Point(i, j));
				}
			}
			
			if(valid){
				count = tries;
			}
		}
		
		return position;//.scale(this.blockSize);
	};

Map.prototype._findPosition =
	function(movable){
		var x = 0,
			y = 0;
		do{
			x = Tools.randomInteger(0, this.width);
			y = Tools.randomInteger(0, this.height);
		} while (!this.check(movable, new Point(x, y)));
		
		return new Point(x, y);
	};

Map.prototype.makeArray =
	function(rounds, width, height){
		var 
			rows = Math.round(this.height/this.blockSize),
			cols = Math.round(this.height/this.blockSize)
		;
		
		var arr = [];
		for(var i = 0; i < rows; i++){
			var row = [];
			for(var j = 0; j < cols; j++){
				row.push(Map.STATE_UNWALKABLE);
			}
			arr.push(row);
		}
		
		var 
			w = Tools.randomInteger(3, width, true),
			h = Tools.randomInteger(3, height, true),
			x = Math.round(cols/2),
			y = Math.round(rows/2),
			rects = []
		;
		for(var i = 0; i < rounds; i++){
			//console.log(w, h, x, y);
			rects.push({w:w, h:h, x:x, y:y});
			
			for(var j = 0; j < h; j++){
				for(var k = 0; k < w; k++){
					arr[x + k][y + j] = Map.STATE_WALKABLE;
				}
			}
			
			var rect = rects[Tools.randomInteger(0, rects.length)];
			
			if(Tools.randomBoolean()){
				x = Tools.randomBoolean() ? rect.x : rect.x + rect.w - 1;
				y = Tools.randomInteger(rect.y + 1, rect.y + rect.h - 1, true);
			}else{
				y = Tools.randomBoolean() ? rect.y : rect.y + rect.h - 1;
				x = Tools.randomInteger(rect.x + 1, rect.x + rect.w - 1, true);
			}
			w = Tools.randomInteger(3, width, true);
			h = Tools.randomInteger(3, height, true);
			if(Tools.randomBoolean()){
				x = Tools.inRange(0, x - w, cols);
			}else{
				w = Tools.inRange(0, w, cols - x);
			}
			
			if(Tools.randomBoolean()){
				y = Tools.inRange(0, y - h, rows);
			}else{
				h = Tools.inRange(0, h, rows - y);
			}
		}
		
		return arr;
	};

Map.prototype.resetCache =
	function(){
		this.cache = Tools.clonePlane(this.arr);//this.cloneArray();
	};