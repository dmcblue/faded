var HealthBar = 
	function(args){
		if(args.classes === undefined){
			args.classes = [];
		}
		args.classes.push('healthbar');
		Item.call(this, args);
		
		var div = document.createElement('div');
		div.className = 'health';
		this.element.appendChild(div);
		this.div = div;
	};

HealthBar.prototype = Object.create(Item.prototype);
HealthBar.prototype.constructor = HealthBar;

HealthBar.prototype.set =
	function(health){
		var height = (health/100)*this.height;
		this.div.style.height = Math.round(height > 0 ? height : 0) + 'px';
	};