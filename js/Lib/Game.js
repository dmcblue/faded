var Game = 
	function(args){
		Base.call(this, args);
		this.isPlaying = false;
	};

Game.prototype = Object.create(Base.prototype);
Game.prototype.constructor = Game;

Game.prototype.pause =
	function(){
		this.isPlaying = false;
	};

Game.prototype.play =
	function(){
		this.isPlaying = true;
	};

Game.prototype.toggle =
	function(){
		this.isPlaying = !this.isPlaying;
	};