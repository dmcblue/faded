var SoundEffectManager = 
	function(args){
		if(args === undefined){args = {};}
		Base.call(this, args);
		this.effects = {};
		this._effects = []; // avoid older browser issues
		this.addProperty(args, 'volume', true, null, parseFloat);
	};

SoundEffectManager.prototype = Object.create(Base.prototype);
SoundEffectManager.prototype.constructor = SoundEffectManager;

SoundEffectManager.prototype.add =
	function(name, source){
		this.effects[name] = new Audio(source);
		this.effects[name].volume = this.volume;
		this._effects.push(name);
	};

SoundEffectManager.prototype.play =
	function(name){
		this.effects[name].play();
	};

SoundEffectManager.prototype.setVolume =
	function(volume){
		this.volume = volume;
		for(var i = 0, ilen = this._effects.length; i < ilen; i++){
			this.effects[this._effects[i]].volume = this.volume;
		}
	};