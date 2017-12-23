var ThroneEvent = 
	function(args){
		args.type = args.type || ThroneEvent.EVENT_SEND;
		CEvent.call(this, args);
		this.addProperty(args, 'choice');
		this.addProperty(args, 'consequence');
		this.data = 
			{
				choice : this.choice,
				consequence : this.consequence
			};
	};

ThroneEvent.prototype = Object.create(CEvent.prototype);
ThroneEvent.prototype.constructor = ThroneEvent;

ThroneEvent.EVENT_SEND = 'faded_throne_event_send';