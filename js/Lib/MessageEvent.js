var MessageEvent = 
	function(args){
		args.type = args.type || MessageEvent.EVENT_SEND;
		CEvent.call(this, args);
		this.addProperty(args, 'message');
		this.data = {message : this.message};
	};

MessageEvent.prototype = Object.create(CEvent.prototype);
MessageEvent.prototype.constructor = MessageEvent;

MessageEvent.EVENT_SEND = 'faded_message_event_send';