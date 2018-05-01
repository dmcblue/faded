var MapItemPositionerInterface = 
	function(args){
		Base.call(this, args);
		this.ensure('findPosition', ['map', 'item', 'blockSize']);
		this.ensure('findAndSetPosition', ['map', 'item', 'blockSize']);
		this.ensure('reset');
		this.ensure('setPosition', ['position', 'map', 'item', 'blockSize']);
	};

MapItemPositionerInterface.prototype = Object.create(Base.prototype);
MapItemPositionerInterface.prototype.constructor = MapItemPositionerInterface;