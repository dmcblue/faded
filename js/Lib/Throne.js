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
		this.addProperty(args, 'choiceKey', false, Keys.KEY_R);
		this.addProperty(args, 'choiceLabel', false, 'Accept (r)');
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
		var parent = this.element.parentElement;
		var event = 
			new ThroneEvent({
				target : parent,
				choice : 
					new Lib.Message({
						header : this.choiceHeader,
						text   : this.choiceText,
						buttons : 
							[{
								onClick : MessageBox.CLOSE(), 
								label : 'Back (q)', 
								classes : [MessageBox.CLASS_BUTTON_BACK],
								keyClick : Keys.KEY_Q
							},{
								onClick : MessageBox.NEXT(), 
								label : this.choiceLabel,
								keyClick : this.choiceKey
							}]
					}),
				consequence : 
					new Lib.Message({
						header : this.consequenceHeader,
						text   : this.consequenceText,
						buttons : [{
							label : "New Game (e)",
							keyClick : Keys.KEY_E,
							onClick : function(){
								var event = 
									new CEvent({
										target : parent, 
										type : Game.EVENT_RESTART, 
										data : {}
									});
								
								event.trigger();
							}
						},{
							label : "Main Menu (q)",
							classes :[Lib.MessageBox.CLASS_BUTTON_BACK],
							keyClick : Keys.KEY_Q,
							onClick : function(){
								var event = 
									new CEvent({
										target : parent, 
										type : Game.EVENT_TO_MAIN_MENU, 
										data : {}
									});
								
								event.trigger();
							}
						}]
					})
			});
		event.trigger();
	};