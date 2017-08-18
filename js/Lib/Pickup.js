var Pickup = 
	function(args){
		if(args.classes === undefined){
			args.classes = [];
		}
		args.classes.push('pickup');
		Item.call(this, args);
		//this.addProperty(args,'onpickup');
	};

Pickup.prototype = Object.create(Item.prototype);
Pickup.prototype.constructor = Pickup;

Pickup.prototype.pickup = 
	function(actor){
		this.element.parentNode.removeChild(this.element);
	};