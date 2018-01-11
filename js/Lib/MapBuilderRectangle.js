var MapBuilderRectangle = 
	function(args){
		MapBuilderInterface.call(this, args);
		this.addProperty(args, 'rectangleSize', false, 10, parseInt);
		this.addProperty(args, 'rows', false, 10, parseInt);
		this.addProperty(args, 'cols', false, 10, parseInt);
		this.addProperty(args, 'rounds', false, (this.rows + this.cols), parseInt);
	};

MapBuilderRectangle.prototype = Object.create(MapBuilderInterface.prototype);
MapBuilderRectangle.prototype.constructor = MapBuilderRectangle;

MapBuilderRectangle.prototype.build = 
	function(){
		var 
			rectangleSize = this.rectangleSize || 10,
			rows = this.rows,
			cols = this.cols,
			rounds = this.rounds
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
			w = Tools.randomInteger(3, rectangleSize, true),
			h = Tools.randomInteger(3, rectangleSize, true),
			x = Math.round(cols/2),
			y = Math.round(rows/2),
			rects = []
		;
		for(var i = 0; i < rounds; i++){
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
			w = Tools.randomInteger(3, rectangleSize, true);
			h = Tools.randomInteger(3, rectangleSize, true);
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