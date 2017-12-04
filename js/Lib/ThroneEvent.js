var ThroneEvent = 
	function(args){
		args.type = args.type || ThroneEvent.EVENT_SEND;
		CEvent.call(this, args);
		this.addProperty(args, 'message');
		this.data = {message : this.message};
	};

ThroneEvent.prototype = Object.create(CEvent.prototype);
ThroneEvent.prototype.constructor = ThroneEvent;

ThroneEvent.EVENT_SEND = 'faded_throne_event_send';