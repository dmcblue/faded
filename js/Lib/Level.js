var Level = 
	function(args){
		Base.call(this, args);
		this.addProperty(args, 'width', true, null, parseInt);
		this.addProperty(args, 'height', true, null, parseInt);
		this.addProperty(args, 'mapBuilder', true);
		this.addProperty(args, 'zombies', false, 0, parseInt);
		this.addProperty(args, 'ghosts', false, 0, parseInt);
		this.addProperty(args, 'nobles', false, 0, parseInt);
		this.addProperty(args, 'stewards', false, 0, parseInt);
		this.addProperty(args, 'candles', false, 0, parseInt);
		this.addProperty(args, 'papers', false, []);
		this.addProperty(args, 'thrones', false, []);
		this.addProperty(args, 'damnedThrones', false, 0, parseInt);
	};

Level.prototype = Object.create(Base.prototype);
Level.prototype.constructor = Level;