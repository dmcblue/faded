var Item = 
	function(args){
		Base.call(this, args);
		this.addProperty(args,'selector');
		if(Type.is(this.selector, Type.STRING)){
			this.element = document.getElementById(this.selector);
		}else{
			//obj instanceof HTMLElement
			this.element = this.selector;
		}
		this.addProperty(args,'classes', false, []);
		for(var i = 0, ilen = this.classes.length; i < ilen; i++){
			this.addClass(this.classes[i]);
		}
		this.addProperty(args,'width', false, this.element.offsetWidth, parseInt);    //in px
		this.addProperty(args,'height', false, this.element.offsetHeight, parseInt);   //in px
		this.addProperty(args,'radius', false, (this.width + this.height)/4, parseFloat);   //in px
	};

Item.prototype = Object.create(Base.prototype);
Item.prototype.constructor = Item;

Item.ID = 0;

Item.create = 
	function(frame, args, id){
		if(args === undefined){args = {};}
		if(id === undefined){id = 'item' + Item.ID++;}
		args.selector = Item.createElement(frame, id);
		return new Item(args);
	};

Item.createElement =
	function(frame, id){
		if(id === undefined){id = 'item' + Item.ID++;}
		var element = document.createElement('div');
		element.id = id;
		frame.element.appendChild(element);
		
		return id;
	};

Item.prototype.addClass =
	function(className){
		var classes = this.element.className.split(' ');
		for(var i = 0, ilen = classes.length; i < ilen; i++){
			if(classes[i] === className){
				return;
			}
		}
		
		classes.push(className);
		this.element.className = classes.join(' ');
	};

Item.prototype.getPosition =
	function(){
		return new Point(
			this.element.style.left ? parseInt(this.element.style.left.replace('px', '')) : 0,
			this.element.style.top  ? parseInt(this.element.style.top.replace('px', ''))  : 0
		);
	};

Item.prototype.removeClass =
	function(className){
		var index = -1;
		var classes = 
			this.element.className.length 
				? this.element.className.split(' ') 
				: []
			;
		for(var i = 0, ilen = classes.length; i < ilen; i++){
			if(classes[i] === className){
				index = i;
				break;
			}
		}
		
		if(index !== -1){
			classes.splice(i, 1);
			this.element.className = classes.join(' ');
		}
	};

Item.prototype.setPosition =
	function(x, y){
		if(y === undefined){
			var point = x;
			x = point.x;
			y = point.y;
		}
		this.element.style.left = Math.round(x) + 'px';
		this.element.style.top  = Math.round(y) + 'px';
	};

Item.prototype.touches = 
	function(item){
		//maybe cache position
		return this.getPosition().distanceTo(item.getPosition()) < this.radius + item.radius;
	};