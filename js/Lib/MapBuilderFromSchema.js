var MapBuilderFromSchema = 
	function(args){
		MapBuilderInterface.call(this, args);
		this.addProperty(args, 'schema', true, null, MapSchema.stringToArray);
	};

MapBuilderFromSchema.prototype = Object.create(MapBuilderInterface.prototype);
MapBuilderFromSchema.prototype.constructor = MapBuilderFromSchema;

MapBuilderFromSchema.prototype.build = 
	function(){
		var arr = [];
		
		for(var i = 0, ilen = this.schema.length; i < ilen; i++){
			arr.push([]);
			for(var j = 0, jlen = this.schema[i].length; j < jlen; j++){
				arr[i][j] = this.schema[i][j]
					? Map.STATE_WALKABLE
					: Map.STATE_UNWALKABLE
				;
			}
		}
		
		return arr;
	};