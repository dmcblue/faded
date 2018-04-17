var MapBuilderRectangleV2 = 
	function(args){
		MapBuilderInterface.call(this, args);
		this.addProperty(args, 'rectangleSize', false, 10, parseInt);
		this.addProperty(args, 'rows', false, 10, parseInt);
		this.addProperty(args, 'cols', false, 10, parseInt);
		this.addProperty(args, 'rounds', false, (this.rows + this.cols), parseInt);
	};

MapBuilderRectangleV2.prototype = Object.create(MapBuilderInterface.prototype);
MapBuilderRectangleV2.prototype.constructor = MapBuilderRectangleV2;

MapBuilderRectangleV2.DIRECTIONS = [
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

MapBuilderRectangleV2.prototype.adjustDimensions =
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

MapBuilderRectangleV2.prototype.calculateCoverage = 
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

MapBuilderRectangleV2.prototype.getAddPoint =
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
				y = rectangle.y - rectangle.height + offsetY;
				x = rectangle.x + offsetX;
				break;
			case Point.NE: 
				y = rectangle.y - rectangle.height + offsetY;
				x = rectangle.x + rectangle.width - offsetX;
				break;
			case Point.E: 
				y = rectangle.y + offsetY;
				x = rectangle.x + rectangle.width - offsetX;
				break;
			case Point.SE: 
				y = rectangle.y + rectangle.height - offsetY;
				x = rectangle.x + rectangle.width - offsetX;
				break;
			case Point.S: 
				y = rectangle.y + rectangle.height - offsetY;
				x = rectangle.x + offsetX;
				break;
			case Point.SW: 
				y = rectangle.y + rectangle.height - offsetY;
				x = rectangle.x - rectangle.width + offsetX;
				break;
			case Point.W: 
				y = rectangle.y + offsetY;
				x = rectangle.x - rectangle.width + offsetX;
				break;
			case Point.NW: 
				y = rectangle.y - rectangle.height + offsetY;
				x = rectangle.x - rectangle.width + offsetX;
				break;
			default:;
		}
		
		return new Point(x, y);
	};

MapBuilderRectangleV2.prototype.getDirection = 
	function(){
		return Tools.randomItem(MapBuilderRectangleV2.DIRECTIONS);
	};

MapBuilderRectangleV2.prototype.getNewOrigin = 
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
				x = addPoint.x + width;
				break;
			case Point.E: 
				y = addPoint.y - halfHeight;
				x = addPoint.x + width;
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
MapBuilderRectangleV2.prototype.createRectangle =
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
	
MapBuilderRectangleV2.prototype.build = 
	function(){
		var arr = Tools.initPlane(this.cols, this.rows, Map.STATE_UNWALKABLE);
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
					center.x - startOffset, 
					center.x + startOffset, 
					true
				),
			y : 
				Tools.randomInteger(
					center.y - startOffset, 
					center.y + startOffset, 
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
		var count = 0;
		while(count < this.rounds && this.calculateCoverage(arr) < .75){
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
			
			for(var i = newRectangle.x, ilen = newRectangle.x + newRectangle.width; i < ilen; i++){
				for(var j = newRectangle.y, jlen = newRectangle.y + newRectangle.height; j < jlen; j++){
					arr[i][j] = Map.STATE_WALKABLE;
				}
			}
			//Add rectangle to Rectangles
			rectangles.push(newRectangle);
			count++;
		}
		
		return arr;
	};