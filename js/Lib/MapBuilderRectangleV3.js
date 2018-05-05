var MapBuilderRectangleV3 = 
	function(args){
		MapBuilderInterface.call(this, args);
		this.addProperty(args, 'rectangleSize', false, 10, parseInt);
		this.addProperty(args, 'rows', false, 10, parseInt);
		this.addProperty(args, 'cols', false, 10, parseInt);
		this.addProperty(args, 'rounds', false, Math.round((this.rows + this.cols)/5), parseInt);
	};

MapBuilderRectangleV3.prototype = Object.create(MapBuilderInterface.prototype);
MapBuilderRectangleV3.prototype.constructor = MapBuilderRectangleV3;

MapBuilderRectangleV3.DIRECTIONS = [
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

MapBuilderRectangleV3.prototype.adjustDimensions =
	function(direction, width, height){
		var w = width, h = height, temp = 0;
		switch(direction){
			case Point.N:
			case Point.S:
				if(w > h){
					temp = w;
					w = h;
					h = temp;
				}
				break;
			case Point.E:
			case Point.W: 
				if(w < h){
					temp = w;
					w = h;
					h = temp;
				}
				break;
			default:;
		}
		
		return {width : w, height : h};
	};

MapBuilderRectangleV3.prototype.calculateCoverage = 
	function(arr){
		var covered = 0;
		for(var i = 0, ilen = arr.length; i < ilen; i++){
			for(var j = 0, jlen = arr[i].length; j < jlen; j++){
				if(arr[i][j] !== Map.STATE_UNWALKABLE){
					covered++;
				}
			}
		}
		
		return covered / (arr.length * arr[0].length);
	};

MapBuilderRectangleV3.prototype.getAddPoint =
	function(rectangle, direction){
		var 
			x = rectangle.x, 
			y = rectangle.y, 
			halfWidth = Math.floor(rectangle.width/2),
			halfHeight = Math.floor(rectangle.height/2)
		;
		var
			offsetX = Tools.randomInteger(1, Math.min(4, halfWidth), true),
			offsetY = Tools.randomInteger(1, Math.min(4, halfHeight), true)
		;
		
		switch(direction){
			case Point.N: 
				y = rectangle.y + offsetY;
				x = rectangle.x + halfWidth;
				break;
			case Point.NE: 
				y = rectangle.y + offsetY;
				x = rectangle.x + rectangle.width - offsetX;
				break;
			case Point.E: 
				y = rectangle.y + halfHeight;
				x = rectangle.x + rectangle.width - offsetX;
				break;
			case Point.SE: 
				y = rectangle.y + rectangle.height - offsetY;
				x = rectangle.x + rectangle.width - offsetX;
				break;
			case Point.S: 
				y = rectangle.y + rectangle.height - offsetY;
				x = rectangle.x + halfWidth;
				break;
			case Point.SW: 
				y = rectangle.y + rectangle.height - offsetY;
				x = rectangle.x + offsetX;
				break;
			case Point.W: 
				y = rectangle.y + halfHeight;
				x = rectangle.x + offsetX;
				break;
			case Point.NW: 
				y = rectangle.y + offsetY;
				x = rectangle.x + offsetX;
				break;
			default:;
		}
		
		return new Point(x, y);
	};

MapBuilderRectangleV3.prototype.getDirection = 
	function(){
		return Tools.randomItem(MapBuilderRectangleV3.DIRECTIONS);
	};

MapBuilderRectangleV3.prototype.getNewOrigin = 
	function(addPoint, direction, width, height){
		var 
			x = 0, 
			y = 0, 
			halfWidth = Math.floor(width/2),
			halfHeight = Math.floor(height/2)
		;
		
		switch(direction){
			case Point.N: 
				y = addPoint.y - height;
				x = addPoint.x - halfWidth;
				break;
			case Point.NE: 
				y = addPoint.y - height;
				x = addPoint.x// + width;
				break;
			case Point.E: 
				y = addPoint.y - halfHeight;
				x = addPoint.x //+ width;
				break;
			case Point.SE: 
				y = addPoint.y;
				x = addPoint.x;
				break;
			case Point.S: 
				y = addPoint.y;
				x = addPoint.x - halfWidth;
				break;
			case Point.SW: 
				y = addPoint.y;
				x = addPoint.x - width;
				break;
			case Point.W: 
				y = addPoint.y - halfHeight;
				x = addPoint.x - width;
				break;
			case Point.NW: 
				y = addPoint.y - height;
				x = addPoint.x - width;
				break;
			default:;
		}
		
		return new Point(x, y);
	};

/**
 * Create a rectangle and make sure it is within the bounds of the map
 * @param {number[][]} map
 * @param {Point} origin
 * @param {number} width
 * @param {number} height
 */
MapBuilderRectangleV3.prototype.createRectangle =
	function(map, origin, width, height){
		if(origin.x < 0){
			width += -origin.x;
			origin.x = 0;
		}
		if(origin.y < 0){
			height += -origin.y;
			origin.y = 0;
		}
		if(origin.x + width >= map.length){
			width -= origin.x + width - map.length + 1;
		}
		if(origin.y + height >= map[0].length){
			height -= origin.y + height - map[0].length + 1;
		}
		
		return new Rectangle(origin, width, height);
	};
	
MapBuilderRectangleV3.prototype.build = 
	function(){
		var arr = Tools.initPlane(this.cols, this.rows, Map.STATE_UNWALKABLE);
		
		//create list of seeds
		var quarterWidth = Math.round(this.cols/4);
		var quarterHeight = Math.round(this.rows/4);
		var seedPositions = [];
		seedPositions.push(new Point(quarterWidth, quarterHeight));
		seedPositions.push(new Point(quarterWidth*3, quarterHeight));
		seedPositions.push(new Point(quarterWidth*3, quarterHeight*3));
		seedPositions.push(new Point(quarterWidth, quarterHeight*3));
		seedPositions.push(new Point(quarterWidth*2, quarterHeight*2));
		//build small cluster for each seed
		var rectangles = [];
		for(var i = 0, ilen = seedPositions.length; i < ilen; i++){
			rectangles.push(this.buildCluster(seedPositions[i], arr, this.rounds));
		}
		//connect seeds
		for(var i = 0, ilen = rectangles.length; i < ilen; i++){
			var nextIndex = (i + 1)%rectangles.length;
			//select random rectangle from each in pair
			var start = Tools.randomItem(rectangles[i]).getRandomPoint();
			var end = Tools.randomItem(rectangles[nextIndex]).getRandomPoint();
			arr = this.drawLine(arr, start, end, 3);
		}
		
		return arr;
	};

MapBuilderRectangleV3.prototype.isNew =
	function(map, rect){
		var totsNew = true;
		for(var i = rect.x, ilen = rect.x + rect.width; i < ilen; i++){
			for(var j = rect.y, jlen = rect.y + rect.height; j < jlen; j++){
				totsNew = totsNew && map[i][j] === Map.STATE_UNWALKABLE;
			}
		}
		
		return totsNew;
	};

MapBuilderRectangleV3.prototype.buildCluster = 
	function(seedPosition, arr, rounds){
		//Create rectangle
		//one tenth of the average dimension
		var 
			startOffset = Math.round((this.rows + this.cols)/(2 * 10)),
			center = new Point(Math.round(this.cols/2), Math.round(this.rows/2)),
			sizeOffset = Math.round(this.rectangleSize/2)
		;
		var sizeOffset2 = Math.round(sizeOffset/2);
		
		
		var rectangles = [];
		rectangles.push(new Rectangle({
			x : 
				Tools.randomInteger(
					seedPosition.x - startOffset, 
					seedPosition.x + startOffset, 
					true
				),
			y : 
				Tools.randomInteger(
					seedPosition.y - startOffset, 
					seedPosition.y + startOffset, 
					true
				),
			width : 
				Tools.randomInteger(
					this.rectangleSize - sizeOffset, 
					this.rectangleSize + sizeOffset, 
					true
				),
			height : 
				Tools.randomInteger(
					sizeOffset - sizeOffset2, 
					sizeOffset + sizeOffset2, 
					true
				)
		}));
		
		//while (rounds and map coverage < max coverage)
		var count = 0;var tots = 0;
		while(count < rounds && this.calculateCoverage(arr) < .75){
			//Select Rectangle from Rectangles
			var 
				rectangle = Tools.randomItem(rectangles),
				//Select add points from Rectangle
				direction = this.getDirection(),
				width = 
					Tools.randomInteger(
						this.rectangleSize - sizeOffset, 
						this.rectangleSize + sizeOffset, 
						true
					),
				height = 
					Tools.randomInteger(
						sizeOffset - sizeOffset2, 
						sizeOffset + sizeOffset2, 
						true
					)
			;
			var dimensions = this.adjustDimensions(direction, width, height);
			
			//Select one add point at random
			var addPoint = this.getAddPoint(rectangle, direction);
		
			var origin = 
				this.getNewOrigin(
					addPoint, 
					direction, 
					dimensions.width, 
					dimensions.height
				);
			//Add new Rectangle at add point
			var newRectangle = 
				this.createRectangle(
					arr, 
					origin, 
					dimensions.width, 
					dimensions.height
				);
			var isNew = this.isNew(arr, newRectangle);
			for(var i = newRectangle.x, ilen = newRectangle.x + newRectangle.width; i < ilen; i++){
				for(var j = newRectangle.y, jlen = newRectangle.y + newRectangle.height; j < jlen; j++){
					arr[i][j] = Map.STATE_WALKABLE;
				}
			}
			//Add rectangle to Rectangles
			rectangles.push(newRectangle);
			count++;
		}
		
		return rectangles;
	};

MapBuilderRectangleV3.prototype.drawLine =
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

MapBuilderRectangleV3.prototype.drawRectangle =
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