var Button = 
	function(args){
		if(args.classes === undefined){
			args.classes = [];
		}
		args.classes.push('button');
		Item.call(this, args);
		this.addProperty(args, 'onClick', false, function(){});
		this.addProperty(args, 'label', false, 'Close (E)');
		
		this.element.innerHTML = this.label;
		this.element.addEventListener('click', this.onClick, false);
	};

Button.prototype = Object.create(Item.prototype);
Button.prototype.constructor = Button;

Button.ID = 0;

Button.createElement =
	function(frame, id){
		if(id === undefined){id = 'item' + Item.ID++;}
		var element = document.createElement('button');
		element.id = id;
		frame.element.appendChild(element);
		
		return id;
	};