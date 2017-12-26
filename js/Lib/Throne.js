var Throne = 
	function(args){
		if(args.classes === undefined){
			args.classes = [];
		}
		args.classes.push('throne');
		if(args.placementRadius === undefined){
			args.placementRadius = Throne.PLACEMENT_RADIUS;
		}
		MapItem.call(this, args);
		this.addProperty(args, 'choiceHeader');
		this.addProperty(args, 'choiceText');
		this.addProperty(args, 'consequenceHeader');
		this.addProperty(args, 'consequenceText');
	};

Throne.ID = 0;
Throne.PLACEMENT_RADIUS = 50;
Throne.EVENT_END = 'faded_throne_event_end';

Throne.prototype = Object.create(MapItem.prototype);
Throne.prototype.constructor = Throne;

Throne.create = 
	function(frame, args, id){
		if(args === undefined){args = {};}
		if(id === undefined){id = 'throne' + Throne.ID++;}
		args.selector = Item.createElement(frame, id);
		return new Throne(args);
	};

Throne.prototype.interact = 
	function(actor){
		var event = 
			new ThroneEvent({
				target : this.element.parentElement,
				choice : {
						header : this.choiceHeader,
						text   : this.choiceText
					},
				consequence : 
					{
						header : this.consequenceHeader,
						text   : this.consequenceText
					}
			});
		event.trigger();
	};