var MapItem = 
	function(args){
		if(args.classes === undefined){
			args.classes = [];
		}
		args.classes.push('mapItem');
		Item.call(this, args);
		this.addProperty(args, 'placementRadius', true, null, parseInt);    //in px
	};

MapItem.prototype = Object.create(Item.prototype);
MapItem.prototype.constructor = MapItem;