var Pickup = 
	function(args){
		if(args.classes === undefined){
			args.classes = [];
		}
		args.classes.push('pickup');
		MapItem.call(this, args);
		//this.addProperty(args,'onpickup');
	};

Pickup.prototype = Object.create(MapItem.prototype);
Pickup.prototype.constructor = Pickup;

Pickup.prototype.pickup = 
	function(actor){
		if(this.element.parentNode){
			this.element.parentNode.removeChild(this.element);
		}
	};