var MapItemPositionerRandom = 
	function(args){
		MapItemPositionerInterface.call(this, args);
		this.reset();
	};

MapItemPositionerRandom.prototype = Object.create(MapItemPositionerInterface.prototype);
MapItemPositionerRandom.prototype.constructor = MapItemPositionerRandom;

MapItemPositionerRandom.prototype.findPosition =
	function(map, item, blockSize){
		if(this.cache === null){
			this.createCache(map);
		}
		
		var 
			x = 0,
			y = 0,
			width = map.getWidth(),
			height = map.getHeight()
		;
		var 
			tries = 0,
			maxTries = width * height * 2
		;
		for(
			var tries = 0; 
			tries < maxTries; 
			tries++
		){
			x = Tools.randomInteger(0, this.cache.length);
			y = Tools.randomInteger(0, this.cache[0].length);
			if(map.isValidPositionOnArray(this.cache, new Point(x, y), item, blockSize)){
				break;
			}
		}
		
		return new Point(x, y).scale(blockSize);
	};

MapItemPositionerRandom.prototype.createCache =
	function(map){
		this.cache = map.toArray();
	};

MapItemPositionerRandom.prototype.findAndSetPosition =
	function(map, item, blockSize){
		var position = this.findPosition(map, item, blockSize);
		this.setPosition(position, map, item, blockSize);
		return position;
	};

MapItemPositionerRandom.prototype.reset =
	function(){
		this.cache = null;
	};

MapItemPositionerRandom.prototype.setPosition =
	function(position, map, item, blockSize){
		if(this.cache === null){
			this.createCache(map);
		}
		
		var boundingBox = item.getBoundingBox();
		var 
			topLeft = boundingBox[0].add(position).scale(1/blockSize).floor(),
			bottomRight = boundingBox[1].add(position).scale(1/blockSize).ceil()
		;
		
		for(
			var i = topLeft.x, ilen = bottomRight.x + 1;
			i < ilen;
			i++
		){
			for(
				var j = topLeft.y, jlen = bottomRight.y + 1;
				j < jlen;
				j++
			){
				this.cache[i][j] = Map.STATE_UNWALKABLE;
			}
		}
	};