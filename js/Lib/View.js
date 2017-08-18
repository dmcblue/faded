var View = 
	function(args){
		if(args.classes === undefined){
			args.classes = [];
		}
		args.classes.push('view');
		Item.call(this, args);
		this.addProperty(args,'width', true, null, parseInt);    //in px
		this.addProperty(args,'height', true, null, parseInt);   //in px
		this.element.style.width = this.width + 'px';
		this.element.style.height = this.height + 'px';
	};

View.prototype = Object.create(Item.prototype);
View.prototype.constructor = View;