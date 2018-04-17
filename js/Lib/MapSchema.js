var MapSchema = {
	STATE_UNWALKABLE : Map.STATE_UNWALKABLE, //0
	STATE_WALKABLE   : Map.STATE_WALKABLE    //1
};
var iterator = Map.STATE_UNWALKABLE + Map.STATE_WALKABLE + 1;
MapSchema.STATE_ZOMBIE  = iterator++;
MapSchema.STATE_GHOST   = iterator++;
MapSchema.STATE_NOBLE   = iterator++;
MapSchema.STATE_STEWARD = iterator++;
MapSchema.STATE_THRONE  = iterator++;
MapSchema.STATE_DAMNED_THRONE = iterator++;
MapSchema.STATE_PLAYER = iterator++;
MapSchema.STATE_EXIT = iterator++;
MapSchema.STATE_PAPER = iterator++;
MapSchema.STATE_CANDLE = iterator++;

var mapping = 
	[
		{ index : MapSchema.STATE_UNWALKABLE,    symbol : 'x' },
		{ index : MapSchema.STATE_WALKABLE,      symbol : ' ' },
		{ index : MapSchema.STATE_ZOMBIE,        symbol : 'z', constructor : Zombie },
		{ index : MapSchema.STATE_GHOST,         symbol : 'g', constructor : Ghost },
		{ index : MapSchema.STATE_NOBLE,         symbol : 'n', constructor : Noble },
		{ index : MapSchema.STATE_STEWARD,       symbol : 's', constructor : Steward },
		{ index : MapSchema.STATE_THRONE,        symbol : 't', constructor : Throne },
		{ index : MapSchema.STATE_DAMNED_THRONE, symbol : 'd', constructor : DamnedThrone },		
		{ index : MapSchema.STATE_PLAYER,        symbol : 'p', constructor : Player },
		{ index : MapSchema.STATE_EXIT,          symbol : 'e', constructor : Exit },
		{ index : MapSchema.STATE_PAPER,         symbol : 'm', constructor : Paper },
		{ index : MapSchema.STATE_CANDLE,        symbol : 'c', constructor : Candle }
	];

MapSchema.CLASS_SYMBOL_LIST = [];
MapSchema.DICTIONARY = 
	{
		symbolToIndex  : {},
		indexToSymbol : {}
	};

for(var i = 0, ilen = mapping.length; i < ilen; i++){
	var m = mapping[i];
	MapSchema.DICTIONARY.symbolToIndex[m.symbol] = m.index;
	MapSchema.DICTIONARY.indexToSymbol[m.index] = m.symbol;
	if(m.hasOwnProperty('constructor')){
		MapSchema.CLASS_SYMBOL_LIST.push({symbol : m.symbol, constructor : m.constructor});
	}
}

MapSchema.getObjectSymbol =
	function(item){
		for(var i = 0, ilen = MapSchema.CLASS_SYMBOL_LIST.length; i < ilen; i++){
			if(item instanceof MapSchema.CLASS_SYMBOL_LIST[i].constructor){
				return MapSchema.CLASS_SYMBOL_LIST[i].symbol;
			}
		}
		
		return false;
	};

MapSchema.schemaIndexToArrayPosition =
	function(schema, index){
		var lineLength = schema.indexOf('\n') + 1;
		var x = Math.floor(index/lineLength);
		var y = index - (x * lineLength);
		
		return new Point(x, y);
	};

MapSchema.arrayPositionToSchemaIndex =
	function(schema, position){
		var lineLength = schema.indexOf('\n') + 1;
		var index = 
			(position.x * lineLength)
			+ position.y
		;
		
		return index;
	};

MapSchema.stringToArray = 
	function(schemaString){
		//schemaString = schemaString.replace(' ', '');
		var arr = [];
		var lines = schemaString.split('\n');
		for(var i = 0, ilen = lines.length; i < ilen; i++){
			arr.push([]);
			var elements = lines[i].split('');
			for(var j = 0, jlen = elements.length; j < jlen; j++){
				arr[i][j] = MapSchema.DICTIONARY.symbolToIndex[elements[j]];
			}
		}
		
		return Tools.transposePlane(arr);
	};