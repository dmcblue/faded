var Counter = 
	function(args){
		this.addProperty(args,'turns', true, null, parseFloat);
		this.addProperty(args,'setRandom', false, false);
		this.current = this.setRandom ? Tools.randomInteger(0, this.turns) : 0;
	};

Counter.prototype = Object.create(Base.prototype);
Counter.prototype.constructor = Counter;

Counter.prototype.check =
	function(){
		return !(this.current%this.turns);
	};

Counter.prototype.update =
	function(){
		this.current = ((++this.current)%this.turns);
	};

Counter.prototype.updateAndCheck =
	function(){
		this.update();
		return this.check();
	};