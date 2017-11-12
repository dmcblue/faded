var Message = 
	function(args){
		Base.call(this, args);
		this.addProperty(args, 'alias', false, '');
		if(!this.alias){
			this.alias = Message.ALIAS_PREFIX + Message.ALIAS_ID++;
		}
		this.addProperty(args, 'header', false, '');
		this.addProperty(args, 'text');
		this.addProperty(args, 'buttons', false, []);
		this.addProperty(args, 'onOpen', false, function(){});
		this.addProperty(args, 'onClose', false, function(){});
	};

Message.prototype = Object.create(Base.prototype);
Message.prototype.constructor = Message;

Message.ALIAS_ID = 0;
Message.ALIAS_PREFIX = 'message_alias';