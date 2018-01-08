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
		
		if(args.radius !== undefined){
			this.radius = args.radius;
		}else{
			this.setRadius(args.radiusType);
		}
		if(!this.hasOwnProperty('eventHandlers')){
			this.addProperty(args,'eventHandlers', false, {});
		}
		this.element.addEventListener(CEvent.EVENT_TYPE, this, false);
	};

Item.prototype = Object.create(Base.prototype);
Item.prototype.constructor = Item;

Item.ID = 0;
Item.RADIUS_TYPE_CIRCLE = 'item_radius_type_circle';
Item.RADIUS_TYPE_RECTANGLE = 'item_radius_type_rectangle';

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
		Tools.addClass(this.element, className);
	};

Item.prototype.getCenterPosition = 
	function(){
		var position = this.getPosition();
		return this.getPosition().add(new Point(
			this.width/2,
			this.height/2
		));
	};

Item.prototype.getPosition =
	function(){
		return new Point(
			this.element.style.left ? parseInt(this.element.style.left.replace('px', '')) : 0,
			this.element.style.top  ? parseInt(this.element.style.top.replace('px', ''))  : 0
		);
	};

Item.prototype.handleEvent =
	function(event){
		if(this.eventHandlers.hasOwnProperty(event.detail[CEvent.CUSTOM_TYPE_FIELD])){
			this.eventHandlers[event.detail[CEvent.CUSTOM_TYPE_FIELD]](
				this, 
				event.detail[CEvent.CUSTOM_DATA_FIELD],
				event
			);
		}
	};

Item.prototype.removeClass =
	function(className){
		Tools.removeClass(this.element, className);
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

Item.prototype.setRadius = 
	function(type){
		if(type === undefined){
			type = Item.RADIUS_TYPE_RECTANGLE;
		}
		var r = 0;
		if(type === Item.RADIUS_TYPE_CIRCLE){
			r = (this.width + this.height)/4;
		}else/* if(type === Item.RADIUS_TYPE_RECTANGLE)*/{
			r = Math.sqrt((this.width*this.width + this.height*this.height))/2;
		}
		
		this.radius = parseFloat(r);
	};

Item.prototype.touches = 
	function(item){
		//maybe cache position
		return this.getCenterPosition().distanceTo(item.getCenterPosition()) < this.radius + item.radius;
	};