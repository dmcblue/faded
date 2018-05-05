var MapBuilderRectangleV4 = 
	function(args){
		MapBuilderInterface.call(this, args);
		this.addProperty(args, 'rectangleSize', false, 10, parseInt);
		this.addProperty(args, 'rows', false, 10, parseInt);
		this.addProperty(args, 'cols', false, 10, parseInt);
		this.addProperty(args, 'rounds', false, Math.round((this.rows + this.cols)/5), parseInt);
	};

MapBuilderRectangleV4.prototype = Object.create(MapBuilderInterface.prototype);
MapBuilderRectangleV4.prototype.constructor = MapBuilderRectangleV4;

MapBuilderRectangleV4.DIRECTIONS = [
	Point.N,
	Point.E,
	Point.S,
	Point.W,
	Point.NE,
	Point.SE,
	Point.SW,
	Point.NW,
	Point.NE,
	Point.SE,
	Point.SW,
	Point.NW
];
	
MapBuilderRectangleV4.prototype.build = 
	function(){
		var arr = Tools.initPlane(this.cols, this.rows, Map.STATE_UNWALKABLE);
		//SE
		arr = this.drawLine(arr, new Point(5, 5), new Point(10, 10), 1);
		//SW
		arr = this.drawLine(arr, new Point(20, 5), new Point(15, 10), 2);
		//NW
		arr = this.drawLine(arr, new Point(10, 15), new Point(5, 10), 3);
		//NE
		arr = this.drawLine(arr, new Point(15, 15), new Point(20, 10), 3);
		//S
		arr = this.drawLine(arr, new Point(25, 5), new Point(25, 10), 3);
		
		arr = this.drawLine(arr, new Point(5, 20), new Point(10, 20), 3);
		
		arr = this.drawLine(arr, new Point(15, 20), new Point(16, 25), 3);
		
		arr = this.drawLine(arr, new Point(5, 25), new Point(10, 26), 3);
		
		arr = this.drawLine(arr, new Point(5, 26), new Point(10, 25), 3);
		
		arr = this.drawLine(arr, new Point(25, 31), new Point(25, 30), 3);
		
		return arr;
	};

MapBuilderRectangleV4.prototype.drawLine =
	function(map, start, end, width){
		var
			slope = (end.y - start.y)/(end.x - start.x),
			drawn = 0,
			x = start.x,
			y = start.y,
			halfWidthLower = Math.floor((width - 1)/2),
			halfWidthUpper = Math.ceil((width - 1)/2)
		;
		
		var 
			offset = end.y - slope*end.x
		;
		
		if(!isFinite(slope)){
			//vertical line
			for(var i = Math.min(start.y, end.y), ilen = Math.max(start.y, end.y); i <= ilen; i++){
				//map[start.x][i] = Map.STATE_WALKABLE;
				this.drawRectangle(
					map,
					new Rectangle(
						start.x - halfWidthLower, 
						i - halfWidthLower,
						width, 
						width
					)
				);
			}
		}else if(Math.abs(slope) <= 1){
			//0 to 45 degrees
			var 
				xDistance = Math.abs(start.x - end.x) || 1,
				increment = start.x < end.x ? 1 : -1		
			;
			while(drawn <= xDistance){
				y = Math.round(slope*x + offset);

				//map[x][y] = Map.STATE_WALKABLE;	
				this.drawRectangle(
					map,
					new Rectangle(
						x - halfWidthLower, 
						y - halfWidthLower,
						width, 
						width
					)
				);

				drawn++;
				x += increment;
			}
		}else{
			//45 to 90
			var 
				yDistance = Math.abs(start.y - end.y) || 1,
				increment = start.y < end.y ? 1 : -1		
			;
			
			while(drawn <= yDistance){
				x = Math.round((y - offset)/slope);
				//map[x][y] = Map.STATE_WALKABLE;	
				this.drawRectangle(
					map,
					new Rectangle(
						x - halfWidthLower, 
						y - halfWidthLower,
						width, 
						width
					)
				);

				drawn++;
				y += increment;
			}
		}
		
		return map;
	};

MapBuilderRectangleV4.prototype.drawRectangle =
	function(map, rectangle){
		var
			width = map.length,
			height = map[0].length
		;
		
		for(var i = rectangle.x, ilen = rectangle.x + rectangle.width; i < ilen; i++){
			for(var j = rectangle.y, jlen = rectangle.y + rectangle.height; j < jlen; j++){
				if(
					Tools.isInRange(0, i, width) && Tools.isInRange(0, j, height)
				){
					map[i][j] = Map.STATE_WALKABLE;
				}
			}
		}		
	};