var Message = 
	function(args){
		Base.call(this, args);
		this.addProperty(args, 'header', false, '');
		this.addProperty(args, 'text');
		this.addProperty(args, 'buttons', false, []);
		this.addProperty(args, 'onOpen', false, function(){});
		this.addProperty(args, 'onClose', false, function(){});
	};

Message.prototype = Object.create(Base.prototype);
Message.prototype.constructor = Message;