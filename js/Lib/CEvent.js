var CEvent = 
	function(args){
		this.addProperty(args,'target');
		this.addProperty(args,'type');
		this.addProperty(args,'data', false, {});
	};

CEvent.prototype = Object.create(Base.prototype);
CEvent.prototype.constructor = CEvent;

CEvent.EVENT_TYPE = 'faded';
CEvent.CUSTOM_TYPE_FIELD = 'fadedType';
CEvent.CUSTOM_DATA_FIELD = 'fadedData';

CEvent.prototype.trigger =
	function(){
		var eventData = {};
		eventData[CEvent.CUSTOM_TYPE_FIELD] = this.type;
		eventData[CEvent.CUSTOM_DATA_FIELD] = this.data;
		var event = new CustomEvent(CEvent.EVENT_TYPE, {detail : eventData});
		this.target.dispatchEvent(event);
	};