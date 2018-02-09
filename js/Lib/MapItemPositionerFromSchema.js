var MapItemPositionerFromSchema = 
	function(args){
		MapItemPositionerInterface.call(this, args);
		this.addProperty(args, 'schema');
		this.cache = '' + this.schema;
	};

MapItemPositionerFromSchema.prototype = Object.create(MapItemPositionerInterface.prototype);
MapItemPositionerFromSchema.prototype.constructor = MapItemPositionerFromSchema;

MapItemPositionerFromSchema.prototype.findPosition =
	function(map, item, blockSize){
		var symbol = MapSchema.getObjectSymbol(item);
		var index = this.cache.indexOf(symbol);
		var position = MapSchema.schemaIndexToArrayPosition(this.cache, index);
		
		return position.scale(blockSize);
	};

MapItemPositionerFromSchema.prototype.findAndSetPosition =
	function(map, item, blockSize){
		var position = this.findPosition(map, item, blockSize);
		this.setPosition(position, map, item, blockSize);
		return position;
	};

MapItemPositionerFromSchema.prototype.setPosition =
	function(position, map, item, blockSize){
		var index = MapSchema.arrayPositionToSchemaIndex(this.schema, position.scale(1/blockSize));
		this.cache = this.cache.slice(0, index) + 'x' + this.cache.slice(index + 1);
	};