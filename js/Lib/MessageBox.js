var MessageBox = 
	function(args){
		if(args.classes === undefined){
			args.classes = [];
		}
		args.classes.push(MessageBox.CLASS);
		Item.call(this, args);
		this.addProperty(args,'onOpen', false, function(){});
		this.addProperty(args,'onClose', false, function(){});
		var onclick =
			function(self){
				return function(){
					self.close();
				};
			};
		this.messages = args.messages || [];
		this.currentMessage = 0;
		
		var header = document.createElement('h1');
		var text = document.createElement('div');
		Tools.addClass(text, MessageBox.CLASS_TEXT);
		this.element.appendChild(header);
		this.element.appendChild(text);
		this.close(true);
		this.header = header;
		this.text = text;
		
		var self = this;
		this.eventHandlers[MessageBox.EVENT_BACK] = 
			function(item, data, event){
				self.back();
				event.stopPropagation(); //confine to this box
			};
		this.eventHandlers[MessageBox.EVENT_CLOSE] = 
			function(item, data, event){
				self.close();
				event.stopPropagation(); //confine to this box
			};
		this.eventHandlers[MessageBox.EVENT_NEXT] = 
			function(item, data, event){
				self.next();
				event.stopPropagation(); //confine to this box
			};
			
		if(this.messages.length){
			this.loadCurrentMessage();
		}
	};

MessageBox.prototype = Object.create(Item.prototype);
MessageBox.prototype.constructor = MessageBox;

MessageBox.BACK = 
	function(callback){
		callback = callback || function(){};
		return function(){
			var event = 
				new CEvent({
					target : this.parentElement, 
					type : MessageBox.EVENT_BACK, 
					data : {}
				});		
			event.trigger();
		};
	};
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
MessageBox.NEXT = 
	function(callback){
		callback = callback || function(){};
		return function(){
			var event = 
				new CEvent({
					target : this.parentElement, 
					type : MessageBox.EVENT_NEXT, 
					data : {}
				});		
			event.trigger();
		};
	};
MessageBox.BUTTON_BACK = {onClick : MessageBox.BACK(), label : 'Back (e)', classes : ['reverse']};
MessageBox.BUTTON_CLOSE = {onClick : MessageBox.CLOSE(), label : 'Close (e)'};
MessageBox.BUTTON_NEXT = {onClick : MessageBox.NEXT(), label : 'Next (e)'};
MessageBox.CLASS = 'message-box';
MessageBox.CLASS_BUTTON = 'message-box-button';
MessageBox.CLASS_TEXT = 'message-box-text';
MessageBox.EVENT_BACK = 'faded_messagebox_event_back';
MessageBox.EVENT_CLOSE = 'faded_messagebox_event_close';
MessageBox.EVENT_NEXT = 'faded_messagebox_event_next';


MessageBox.prototype.addButton = 
	function(args){
		args.selector = Button.createElement(this);
		args.classes = args.classes || [];
		args.classes.push(MessageBox.CLASS_BUTTON);
		new Button(args);
	};

MessageBox.prototype.back = 
	function(){
		if(this.isOpen()){
			this.onMessageClose();
		}
		this.currentMessage = Math.max(0, this.currentMessage - 1);
		this.loadCurrentMessage();
		if(this.isOpen()){
			this.onMessageOpen();
		}
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
	function(init){
		this.element.style.display = 'none';
		if(!init){
			this.onMessageClose();
			if(this.currentMessage === this.messages.length - 1){
				this.onClose();
			}
		}
	};

MessageBox.prototype.isOpen =
	function(){
		return this.element.style.display !== 'none';
	};

MessageBox.prototype.loadCurrentMessage = 
	function(){
		this.loadMessage(this.messages[this.currentMessage]);
	};

MessageBox.prototype.loadMessage = 
	function(message){
		this.header.innerHTML = message.header;
		this.text.innerHTML = message.text;
		this.clearButtons();
		for(var i = 0, ilen = message.buttons.length; i < ilen; i++){
			this.addButton(message.buttons[i]);
		}
		this.onMessageOpen = message.onOpen;
		this.onMessageClose = message.onClose;
	};

MessageBox.prototype.open = 
	function(){
		this.element.style.display = 'block';
		if(!this.currentMessage){
			this.onOpen();
		}
		this.onMessageOpen();
	};

MessageBox.prototype.next = 
	function(){
		if(this.isOpen()){
			this.onMessageClose();
		}
		this.currentMessage++;
		this.loadCurrentMessage();
		if(this.isOpen()){
			this.onMessageOpen();
		}
	};