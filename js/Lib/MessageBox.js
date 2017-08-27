var MessageBox = 
	function(args){
		if(args.classes === undefined){
			args.classes = [];
		}
		args.classes.push('message-box');
		Item.call(this, args);
		this.addProperty(args,'onOpen', false, function(){});
		this.addProperty(args,'onClose', false, function(){});
		
		var header = document.createElement('h1');
		var text = document.createElement('p');
		var close = document.createElement('button');
		this.element.appendChild(header);
		this.element.appendChild(text);
		this.element.appendChild(close);
		this.close();
		this.header = header;
		this.text = text;
		this.button = close;
		var onclick =
			function(self){
				return function(){
					self.close();
				};
			};
		this.setButton('Close (E)', onclick(this));
	};

MessageBox.prototype = Object.create(Item.prototype);
MessageBox.prototype.constructor = MessageBox;

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

MessageBox.prototype.setButton = 
	function(label, callback){
		this.button.onclick = callback;
		this.button.innerHTML = label;
	};

MessageBox.prototype.setText = 
	function(header, text){
		this.header.innerHTML = header;
		this.text.innerHTML = text;
	};