var Message = 
	function(args){
		Base.call(this, args);
		this.addProperty(args, 'target');
		this.addProperty(args, 'header', false, '');
		this.addProperty(args, 'text');
	};

Message.prototype = Object.create(Base.prototype);
Message.prototype.constructor = Message;

Message.EVENT_SEND = 'faded_message_event_save';

Message.prototype.send = 
	function(){
		var event = 
			new CEvent({
				target : this.target, 
				type : Message.EVENT_SEND, 
				data : {message: this}
			});
		event.trigger();
	};