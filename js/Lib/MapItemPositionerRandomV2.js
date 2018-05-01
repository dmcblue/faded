var MapItemPositionerRandomV2 = 
	function(args){
		MapItemPositionerInterface.call(this, args);
		this.reset();
	};

MapItemPositionerRandomV2.prototype = Object.create(MapItemPositionerInterface.prototype);
MapItemPositionerRandomV2.prototype.constructor = MapItemPositionerRandomV2;

MapItemPositionerRandomV2.DELIMITER = "x";

MapItemPositionerRandomV2.prototype.findPosition =
	function(map, item, blockSize){
		if(!this.cache.list.length){
			this.createCache(map);
		}
		
		var 
			posStr = "0x0",
			pos = [],
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
			posStr = Tools.randomItem(this.cache.list);
			pos = posStr.split(MapItemPositionerRandomV2.DELIMITER);
			x = pos[0];
			y = pos[1];
			if(map.isValidPositionOnArray(this.cache.map, new Point(x, y), item, blockSize)){
				break;
			}
		}
		
		return new Point(x, y).scale(blockSize);
	};

MapItemPositionerRandomV2.prototype.createCache =
	function(map){
		this.cache.dictionary = {};
		this.cache.list = [];
		var arr = map.toArray();
		for(var i = 0, ilen = arr.length; i < ilen; i++){
			for(var j = 0, jlen = arr[i].length; j < jlen; j++){
				if(arr[i][j] === Map.STATE_WALKABLE){
					var key = i + MapItemPositionerRandomV2.DELIMITER + j; 
					this.cache.dictionary[key] = this.cache.list.length;
					this.cache.list.push(key);
				}
			}
		}
		this.cache.map = map.toArray();
	};

MapItemPositionerRandomV2.prototype.findAndSetPosition =
	function(map, item, blockSize){
		var position = this.findPosition(map, item, blockSize);
		this.setPosition(position, map, item, blockSize);
		return position;
	};

MapItemPositionerRandomV2.prototype.reset =
	function(){
		this.cache = {
			dictionary : {},
			list : [],
			map : []
		};
	};

MapItemPositionerRandomV2.prototype.setPosition =
	function(position, map, item, blockSize){
		if(!this.cache.list.length){
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
				this.cache.map[i][j] = Map.STATE_UNWALKABLE;
				var posStr = i + MapItemPositionerRandomV2.DELIMITER + j; 
				var posIndex = this.cache.dictionary[posStr];
				delete this.cache.dictionary[posStr];
				this.cache.list.splice(posIndex, 1);
			}
		}
	};