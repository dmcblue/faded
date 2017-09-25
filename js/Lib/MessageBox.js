var MessageBox = 
	function(args){
		if(args.classes === undefined){
			args.classes = [];
		}
		args.classes.push('message-box');
		Item.call(this, args);
		this.addProperty(args,'onOpen', false, function(){});
		this.addProperty(args,'onClose', false, function(){});
		var onclick =
			function(self){
				return function(){
					self.close();
				};
			};
		buttons = args.buttons || [{onClick : MessageBox.CLOSE(), label : 'Close (e)'}];
		
		var header = document.createElement('h1');
		var text = document.createElement('p');
		this.element.appendChild(header);
		this.element.appendChild(text);
		this.close();
		this.header = header;
		this.text = text;
		
		var self = this;
		this.eventHandlers[MessageBox.EVENT_CLOSE] = 
			function(item, data, event){
				self.close();
				event.stopPropagation(); //confine to this box
			};
		
		for(var i = 0, ilen = buttons.length; i < ilen; i++){
			this.addButton(buttons[i]);
		}
	};

MessageBox.prototype = Object.create(Item.prototype);
MessageBox.prototype.constructor = MessageBox;

MessageBox.CLOSE = 
	function(callback){
		callback = callback || function(){};
		return function(){
			var event = 
				new CEvent({
					target : this.parentElement, 
					type : MessageBox.EVENT_CLOSE, 
					data : {}
				});		
			event.trigger();
		};
	};
MessageBox.CLASS_BUTTON = 'message-box-button';
MessageBox.EVENT_CLOSE = 'faded_messagebox_event_close';


MessageBox.prototype.addButton = 
	function(args){
		args.selector = Button.createElement(this);
		args.classes = args.classes || [];
		args.classes.push(MessageBox.CLASS_BUTTON);
		new Button(args);
	};

MessageBox.prototype.clearButtons = 
	function(){
		var buttons = this.element.getElementsByClassName(MessageBox.CLASS_BUTTON);
		
		for(var i = buttons.length - 1; i > -1; i--){
			var element = buttons.item(i);
			element.parentNode.removeChild(element);
		}
	};

MessageBox.prototype.close = 
	function(){
		this.element.style.display = 'none';
		this.onClose();
	};

MessageBox.prototype.isOpen =
	function(){
		return this.element.style.display !== 'none';
	};

MessageBox.prototype.open = 
	function(){
		this.element.style.display = 'block';
		this.onOpen();
	};

MessageBox.prototype.setText = 
	function(header, text){
		this.header.innerHTML = header;
		this.text.innerHTML = text;
	};