var MapBuilderInterface = 
	function(args){
		Base.call(this, args);
		this.ensure('build');
	};

MapBuilderInterface.prototype = Object.create(Base.prototype);
MapBuilderInterface.prototype.constructor = MapBuilderInterface;