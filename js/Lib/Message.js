var Message = 
	function(args){
		Base.call(this, args);
		this.addProperty(args, 'header', false, '');
		this.addProperty(args, 'text');
	};

Message.prototype = Object.create(Base.prototype);
Message.prototype.constructor = Message;