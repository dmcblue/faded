var Sprite = 
	function(args){
		Movable.call(this, args);
		this.addProperty(args,'spriteClasses');
		this.addProperty(args,'spriteCounter', true, null, parseInt);
		this.frame = 0;
		this.counter = new Counter({turns : this.spriteCounter});
		this.addClass(this.spriteClasses[this.frame]);
	};

Sprite.prototype = Object.create(Movable.prototype);
Sprite.prototype.constructor = Sprite;

Sprite.prototype.move =
	function(x, y){
		if(this.counter.updateAndCheck()){
			this.removeClass(this.spriteClasses[this.frame]);
			this.frame = (this.frame + 1)%this.spriteClasses.length;
			this.addClass(this.spriteClasses[this.frame]);
		}
		Movable.prototype.move.call(this, x, y);
	};