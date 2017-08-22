var Mask = 
	function(args){
		if(args.classes === undefined){
			args.classes = [];
		}
		args.classes.push('mask');
		Grid.call(this, args);
		this.statics = [];
		this.movables  = [];
		this.template = [];
		for(var i = 0, ilen = this.width; i < ilen; i++){
			this.statics[i] = [];
			this.movables[i]  = [];
			this.template[i]  = [];
			for(var j = 0, jlen = this.height; j < jlen; j++){
				this.statics[i][j]   = 1;
				this.movables[i][j]  = 1;
				this.template[i][j]  = 1;
			}
		}
		this.staticsSet = false;
		
		var self = this;
		this.eventHandlers[Mask.EVENT_PROPAGATE] = 
			function(item, data, event){
				self.propagate();
				event.stopPropagation(); //confine to this game
			};
	};

Mask.prototype = Object.create(Grid.prototype);
Mask.prototype.constructor = Mask;

Mask.EVENT_PROPAGATE = 'faded_mask_event_propagate';
Mask.ID = 0;

Mask.create = 
	function(frame, args, id){
		if(args === undefined){args = {};}
		if(id === undefined){id = 'mask' + Mask.ID++;}
		args.selector = Item.createElement(frame, id);
		return new Mask(args);
	};

Mask.prototype.propagate =
	function(){
		var table = this.element.childNodes[0];
		for(var i = 0, ilen = table.rows.length; i < ilen; i++){
			var row = table.rows[i];
			for(var j = 0, jlen = row.cells.length; j < jlen; j++){
				var cell = row.cells[j];
				cell.style.opacity = Tools.inRange(0, Math.min(this.statics[i][j], this.movables[i][j]), 1);
			}
		}
	};

Mask.prototype.set =
	function(movables, statics){
		this.__set('movables', movables);
		if(!this.staticsSet){
			this.__set('statics', statics);
			this.staticsSet = true;
		}
		
		var event = 
			new CEvent({
				target : this.element, 
				type : Mask.EVENT_PROPAGATE, 
				data : {}
			});
		event.trigger();
	};

Mask.prototype.__set =
	function(which, items){
		this[which] = Tools.clonePlane(this.template);
		
		for(var i = 0, ilen = items.length; i < ilen; i++){
			var item = items[i];
			var position = this.pixelToIndex(item.getPosition());
			
			var x_start = Math.max(position.x - item.luminance - 1, 0),
				x_end   = Math.min(position.x + item.luminance + 1, this[which].length),
				y_start = Math.max(position.y - item.luminance - 1, 0),
				y_end   = Math.min(position.y + item.luminance + 1, this[which][0].length),
				luminosity = item.luminosity/10,
				total_distance = item.luminance + item.luminance - 2;
			
			for(var j = x_start; j < x_end; j++){
				for(var k = y_start; k < y_end; k++){
					var x = Math.abs(position.x - j),
						y = Math.abs(position.y - k);
					var distance = 1 - Math.sqrt(x*x + y*y)/total_distance;	
					this[which][k][j] = 1 - luminosity*distance;
				}
			}
		}
	};