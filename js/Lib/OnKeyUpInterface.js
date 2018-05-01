var OnKeyUpInterface = 
	function(args){
		Base.call(this, args);
		this.ensure(Keys.INTERFACE_METHOD_UP,['keynum', 'event']);
	};

OnKeyUpInterface.prototype = Object.create(Base.prototype);
OnKeyUpInterface.prototype.constructor = OnKeyUpInterface;