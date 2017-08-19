var Target = 
	function(args){
		Base.call(this, args);
		this.addProperty(args,'point');    //in px
		this.addProperty(args,'radius', false, 0, parseFloat);   //in px
	};

Target.prototype = Object.create(Base.prototype);
Target.prototype.constructor = Target;

Target.prototype.getPosition =
	function(){
		return this.point;
	};