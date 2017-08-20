var Level = 
	function(args){
		Base.call(this, args);
		this.addProperty(args, 'width', true, null, parseInt);
		this.addProperty(args, 'height', true, null, parseInt);
		this.addProperty(args, 'zombies', true, null, parseInt);
		this.addProperty(args, 'ghosts', true, null, parseInt);
		this.addProperty(args, 'nobles', true, null, parseInt);
		this.addProperty(args, 'candles', true, null, parseInt);
	};

Level.prototype = Object.create(Base.prototype);
Level.prototype.constructor = Level;