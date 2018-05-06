var SoundEffectManager = 
	function(args){
		if(args === undefined){args = {};}
		Base.call(this, args);
		this.effects = {};
	};

SoundEffectManager.prototype = Object.create(Base.prototype);
SoundEffectManager.prototype.constructor = SoundEffectManager;

SoundEffectManager.DEFAULT_VOLUME = 0.05;

SoundEffectManager.prototype.add =
	function(name, source){
		this.effects[name] = new Audio(source);
		this.effects[name].volume = SoundEffectManager.DEFAULT_VOLUME;
	};

SoundEffectManager.prototype.play =
	function(name){
		this.effects[name].play();
	};
